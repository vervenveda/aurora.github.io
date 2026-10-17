#!/usr/bin/env python3
"""Fail-closed static audit for the Aurora GitHub Pages application."""

from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
APPS = ROOT / "apps"
UTILITY_PAGES = {"contribute_index.html"}
EXPECTED_ROOMS = 44
PLACEHOLDERS = ("YOUR_GAME_URL_HERE", "YOUR_API_KEY", "CHANGEME", "TODO_URL")
FORBIDDEN_REMOTE = ("fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com", "cdn.pixabay.com")


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.references: list[tuple[str, str]] = []
        self.inline_scripts: list[str] = []
        self._in_script = False
        self._script_external = False
        self._script_type = ""
        self._script_chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        if values.get("id"):
            self.ids.add(values["id"])
        for attribute in ("src", "href", "poster"):
            if values.get(attribute):
                self.references.append((attribute, values[attribute]))
        if tag.lower() == "script":
            self._in_script = True
            self._script_external = bool(values.get("src"))
            self._script_type = values.get("type", "").lower()
            self._script_chunks = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._in_script:
            if not self._script_external and self._script_type in ("", "text/javascript", "module"):
                self.inline_scripts.append("".join(self._script_chunks))
            self._in_script = False

    def handle_data(self, data: str) -> None:
        if self._in_script and not self._script_external:
            self._script_chunks.append(data)


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def check_javascript(source: str, label: str, errors: list[str]) -> None:
    if not source.strip():
        return
    with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as handle:
        handle.write(source)
        handle.flush()
        result = subprocess.run(
            ["node", "--check", handle.name],
            text=True,
            capture_output=True,
            check=False,
        )
    if result.returncode:
        detail = (result.stderr or result.stdout).strip().splitlines()[-1]
        fail(f"{label}: JavaScript syntax check failed ({detail})", errors)


def resolve_local(page: Path, value: str) -> Path | None:
    clean = value.strip()
    if not clean or clean.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlsplit(clean)
    if parsed.scheme or parsed.netloc:
        return None
    local_path = unquote(parsed.path)
    if not local_path:
        return None
    return (ROOT / local_path.lstrip("/")) if local_path.startswith("/") else (page.parent / local_path)


def audit_html(page: Path, errors: list[str]) -> None:
    text = page.read_text(encoding="utf-8")
    rel = page.relative_to(ROOT)
    parser = PageParser()
    try:
        parser.feed(text)
    except Exception as exc:
        fail(f"{rel}: HTML parsing failed ({exc})", errors)
        return

    if not re.match(r"\s*<!doctype html>", text, re.I):
        fail(f"{rel}: missing HTML5 doctype", errors)
    if not re.search(r"<title>\s*[^<]+\s*</title>", text, re.I):
        fail(f"{rel}: missing non-empty title", errors)
    if not re.search(r'<meta\s+[^>]*name=["\']viewport["\']', text, re.I):
        fail(f"{rel}: missing viewport metadata", errors)

    for token in PLACEHOLDERS:
        if token in text:
            fail(f"{rel}: unresolved placeholder {token}", errors)
    for host in FORBIDDEN_REMOTE:
        if host in text:
            fail(f"{rel}: forbidden runtime dependency on {host}", errors)
    if "serviceWorker.register" in text:
        fail(f"{rel}: service worker registration is not allowed without an audited worker", errors)
    if "document.write" in text:
        fail(f"{rel}: document.write is prohibited", errors)

    for attribute, value in parser.references:
        target = resolve_local(page, value)
        if target is not None and not target.exists():
            fail(f"{rel}: broken local {attribute} reference {value}", errors)

    requested_ids = set(re.findall(r'getElementById\(["\']([^"\']+)', text))
    declared_ids = parser.ids | set(re.findall(r'\bid=["\']([^"\']+)', text, re.I))
    for missing_id in sorted(requested_ids - declared_ids):
        fail(f"{rel}: script requests missing element #{missing_id}", errors)

    for index, script in enumerate(parser.inline_scripts, start=1):
        check_javascript(script, f"{rel} inline script {index}", errors)


def main() -> int:
    errors: list[str] = []
    required = [
        ROOT / "index.html",
        ROOT / "assets" / "aurora-sanctuary.css",
        ROOT / "assets" / "aurora-sanctuary.js",
        ROOT / "mentor-manifest.json",
        ROOT / "README.md",
    ]
    for path in required:
        if not path.is_file():
            fail(f"Missing required file: {path.relative_to(ROOT)}", errors)

    pages = sorted([ROOT / "index.html", *APPS.glob("*.html")])
    for page in pages:
        audit_html(page, errors)

    js_path = ROOT / "assets" / "aurora-sanctuary.js"
    js = js_path.read_text(encoding="utf-8")
    check_javascript(js, "assets/aurora-sanctuary.js", errors)
    registered_files = re.findall(r'file:"([^"]+_index\.html)"', js)
    registered_ids = re.findall(r'\{id:"([^"]+)",title:', js)
    actual_rooms = {path.name for path in APPS.glob("*_index.html")} - UTILITY_PAGES
    if len(registered_files) != EXPECTED_ROOMS:
        fail(f"Expected {EXPECTED_ROOMS} registered rooms, found {len(registered_files)}", errors)
    if len(registered_files) != len(set(registered_files)):
        fail("Duplicate registered room filenames", errors)
    if len(registered_ids) != len(set(registered_ids)):
        fail("Duplicate registered room IDs", errors)
    if set(registered_files) != actual_rooms:
        missing = sorted(actual_rooms - set(registered_files))
        stale = sorted(set(registered_files) - actual_rooms)
        fail(f"Room registry mismatch; unregistered={missing}, stale={stale}", errors)

    try:
        manifest = json.loads((ROOT / "mentor-manifest.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"mentor-manifest.json is invalid ({exc})", errors)
        manifest = {}
    resources = manifest.get("resources", [])
    manifest_files = {
        Path(urlsplit(item.get("url", "")).path).name
        for item in resources
        if "/apps/" in item.get("url", "")
    }
    if manifest_files != actual_rooms:
        fail("Mentor manifest does not enumerate the same 44 rooms as the landing registry", errors)
    if "not medical" not in manifest.get("mentorNotes", "").lower():
        fail("Mentor manifest is missing the wellness boundary", errors)

    index = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "assets" / "aurora-sanctuary.css").read_text(encoding="utf-8")
    for requirement, message in [
        ('href="https://vervenveda.com/aurora.github.io/"', "canonical public URL"),
        ("Skip to main content", "skip link"),
        ("not medical, psychological, psychiatric, or therapeutic treatment", "wellness boundary"),
    ]:
        if requirement not in index:
            fail(f"Landing page is missing {message}", errors)
    if "prefers-reduced-motion:reduce" not in css:
        fail("Stylesheet is missing reduced-motion support", errors)
    for temporary_art in ("aurora-meadow.svg", "aurora-evening.svg"):
        if temporary_art in index or temporary_art in css:
            fail(f"Landing page reintroduced temporary artwork: {temporary_art}", errors)

    if errors:
        print("Aurora audit failed:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    print(
        f"Aurora audit passed: {EXPECTED_ROOMS} rooms, {len(pages)} HTML pages, "
        "complete registry/manifest coverage, local references, DOM IDs, and JavaScript syntax."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
