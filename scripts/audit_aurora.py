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
EXPECTED_PUBLIC_RESOURCES = 24
EXPECTED_RESOURCE_CATEGORIES = 8
PLACEHOLDERS = ("YOUR_GAME_URL_HERE", "YOUR_API_KEY", "CHANGEME", "TODO_URL")
FORBIDDEN_REMOTE = (
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "cdnjs.cloudflare.com",
    "cdn.pixabay.com",
    "cdn-icons-png.flaticon.com",
    "gleitz.github.io/midi-js-soundfonts",
    "myartgallery.online",
)
ROOM_STYLE = "../assets/aurora-room.css?v=20261018"
ROOM_RUNTIME = "../assets/aurora-room-runtime.js?v=20261018"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.id_counts: dict[str, int] = {}
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
            self.id_counts[values["id"]] = self.id_counts.get(values["id"], 0) + 1
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
    if re.search(r'user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\.0)?', text, re.I):
        fail(f"{rel}: viewport prevents visitor zoom", errors)
    for duplicate_id, count in sorted(parser.id_counts.items()):
        if count > 1:
            fail(f"{rel}: duplicate element ID #{duplicate_id}", errors)

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
    if re.search(r'\b(?:src|href)\s*=\s*["\']\s*["\']', text, re.I):
        fail(f"{rel}: empty src/href attribute creates an invalid initial resource", errors)

    if page.parent == APPS and page.name not in UTILITY_PAGES:
        if f'href="{ROOM_STYLE}"' not in text:
            fail(f"{rel}: missing shared room presentation guardrails", errors)
        if f'src="{ROOM_RUNTIME}"' not in text:
            fail(f"{rel}: missing shared room isolation runtime", errors)

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
        ROOT / "assets" / "aurora-room.css",
        ROOT / "assets" / "aurora-room-runtime.js",
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
    check_javascript(
        (ROOT / "assets" / "aurora-room-runtime.js").read_text(encoding="utf-8"),
        "assets/aurora-room-runtime.js",
        errors,
    )
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

    resource_match = re.search(r"const RESOURCES=\[(.*?)\n  \];", js, re.S)
    resource_rows = (
        re.findall(
            r'\{title:"[^"]+",provider:"[^"]+",category:"([^"]+)",url:"([^"]+)"',
            resource_match.group(1),
        )
        if resource_match
        else []
    )
    if len(resource_rows) != EXPECTED_PUBLIC_RESOURCES:
        fail(
            f"Expected {EXPECTED_PUBLIC_RESOURCES} trusted public references, "
            f"found {len(resource_rows)}",
            errors,
        )
    resource_categories = {category for category, _ in resource_rows}
    if len(resource_categories) != EXPECTED_RESOURCE_CATEGORIES:
        fail(
            f"Expected {EXPECTED_RESOURCE_CATEGORIES} resource topics, "
            f"found {len(resource_categories)}",
            errors,
        )
    for category in resource_categories:
        count = sum(1 for value, _ in resource_rows if value == category)
        if count != 3:
            fail(f"Resource topic {category!r} must contain exactly 3 references, found {count}", errors)
    approved_resource_hosts = {
        "www.nccih.nih.gov",
        "www.who.int",
        "www.cdc.gov",
        "www.nimh.nih.gov",
        "www.myplate.gov",
        "medlineplus.gov",
        "ods.od.nih.gov",
        "www.fda.gov",
        "odphp.health.gov",
    }
    for _, resource_url in resource_rows:
        parsed = urlsplit(resource_url)
        if parsed.scheme != "https" or parsed.hostname not in approved_resource_hosts:
            fail(f"Unapproved trusted-resource destination: {resource_url}", errors)

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
        ('id="resourceSearch"', "trusted-resource search"),
        ('id="resourceCategory"', "trusted-resource topic filter"),
        ('id="resourceResult"', "trusted-resource result status"),
    ]:
        if requirement not in index:
            fail(f"Landing page is missing {message}", errors)
    if "prefers-reduced-motion:reduce" not in css:
        fail("Stylesheet is missing reduced-motion support", errors)
    room_css = (ROOT / "assets" / "aurora-room.css").read_text(encoding="utf-8")
    if "prefers-reduced-motion:reduce" not in room_css:
        fail("Room stylesheet is missing reduced-motion support", errors)
    if "overflow-wrap:anywhere" in room_css:
        fail("Room stylesheet can still split words mid-word", errors)
    room_runtime = (ROOT / "assets" / "aurora-room-runtime.js").read_text(encoding="utf-8")
    if "aurora-room-beta" not in room_css or "aurora-room-beta" not in room_runtime:
        fail("Room beta doorway is missing its non-overlapping presentation contract", errors)
    if 'sandbox="allow-scripts allow-same-origin' not in index:
        fail("Room viewer is missing its sandbox policy", errors)
    if 'referrerpolicy="no-referrer"' not in index:
        fail("Room viewer is missing its referrer policy", errors)
    for temporary_art in ("aurora-meadow.svg", "aurora-evening.svg"):
        if temporary_art in index or temporary_art in css:
            fail(f"Landing page reintroduced temporary artwork: {temporary_art}", errors)

    if errors:
        print("Aurora audit failed:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    print(
        f"Aurora audit passed: {EXPECTED_ROOMS} rooms, {EXPECTED_PUBLIC_RESOURCES} trusted references, "
        f"{len(pages)} HTML pages, "
        "complete registry/manifest coverage, isolated storage, sandboxed viewing, "
        "local references, unique DOM IDs, responsive guardrails, and JavaScript syntax."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
