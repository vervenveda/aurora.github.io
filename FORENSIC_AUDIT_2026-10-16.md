# Aurora forensic audit — 2026-10-16

## Executive result

Aurora now has a complete, enforceable inventory of **44 original rooms**. Every room is registered on the landing page and represented in the mentor manifest. The repository contains 46 HTML documents in total: one landing page, 44 rooms, and one contribution utility.

The production architecture remains a static GitHub Pages application. Node.js is not a runtime dependency. Wix is not present. Browser-local entries remain local unless a visitor explicitly follows an external link or uses the separately identified Stripe contribution doorway.

The follow-up 2026-10-17 room isolation audit verified the presentation and representative execution path of all 44 tools. See `FORENSIC_ROOM_AUDIT_2026-10-17.md` for the app-by-app matrix and repairs.

The 2026-10-18 evidence and presentation pass added a searchable library of **24 official public-health references across eight topics**. It also removed the remaining room-level control collision caused by fixed Beta badges and replaced mid-word breaking with centered, whole-word responsive flow.

## Material findings and remediation

| Severity | Finding | Resolution |
|---|---|---|
| High | Twelve working rooms existed in `apps/` but were absent from the public registry and mentor manifest. | Registered all 44 rooms and made exact inventory parity a CI invariant. |
| High | Three saved-music interfaces could interpolate untrusted stored URLs into HTML. | Added `http`/`https` protocol and credential checks; render links, audio, and embeds through DOM properties. |
| High | Journal, writing, mosaic, dream, and Soulbook paths could restore user-controlled markup. | Restore plain text where formatting is unnecessary; use a narrow formatting allowlist where rich text is intentional; escape templated content. |
| Medium | Morning Sanctum referenced a missing breathing control and threw at runtime. | Restored the control and associated markup; DOM reference audit now prevents recurrence. |
| Medium | Grounding Suite requested a nonexistent manifest and service worker. | Removed both stale requests and prohibited unaudited service-worker registration in CI. |
| Medium | Sacred Geometry contained an unresolved game URL instead of a working room. | Replaced it with a complete local SVG mandala studio and save flow. |
| Medium | Daily Rhythm and the contribution utility were incomplete HTML fragments. | Rebuilt both as valid, titled, responsive documents. |
| Medium | Two affirmation rooms shared the same local-storage key. | Assigned independent, versioned keys and guarded corrupted stored data. |
| Medium | Audio tools made unsupported frequency-healing claims and assumed recording/speech APIs existed. | Reframed as listening experiments, added comfort guidance, and added feature detection. |
| Medium | Corrupted local JSON could prevent Daily Journal or Inspiration Mosaic from loading. | Added guarded parsing, type validation, and safe defaults. |
| Low | Remote font, PDF, and audio CDNs weakened predictable rendering and privacy boundaries. | Removed them; PDF output now uses the browser's print/save flow and the letter chime is generated locally. |
| Low | The hero artwork used a blurred SVG glow and the previous layout felt visually busy. | Rebuilt the entrance around system fonts, restrained 7 px geometry, calm CSS color fields, and reduced motion. Temporary illustrations were removed on 2026-10-17 so the landing remains art-free until original artwork is ready. |
| Medium | Fixed Beta badges could overlap bottom-right controls or page content, including in Spire and The Village. | Room badges now participate in normal document flow when opened directly, duplicates are hidden inside Aurora's iframe, and the sanctuary doorway now rests in the footer instead of floating over content. |
| Medium | The shared room stylesheet used `overflow-wrap:anywhere`, which could split titles and control labels mid-word. | Restored whole-word wrapping, normal word breaks, flexible controls, and centered responsive flow across all 44 rooms. |
| Medium | The public-reference area offered only eight static wellness links and did not deeply cover natural or integrative health. | Added 24 noncommercial references from NIH, NCCIH, ODS, NLM, FDA, CDC, USDA, HHS, NIMH, and WHO with local search, topic filtering, source standards, and explicit safety boundaries. |

## Verification coverage

`scripts/audit_aurora.py` fails the build for:

- missing or duplicate room IDs and filenames;
- unregistered or stale room files;
- mentor manifest drift;
- missing doctype, title, viewport, local asset, or referenced DOM element;
- JavaScript parse failures in the landing bundle or any inline room script;
- unresolved production placeholders;
- broken local links and assets;
- reintroduced remote font/general-purpose CDN dependencies;
- unaudited service-worker registration;
- missing reduced-motion or wellness-boundary text;
- references to the retired temporary landing-page illustrations.
- trusted-reference count, topic balance, approved public-institution hosts, and required search/filter controls;
- room word-flow and non-overlapping Beta-doorway contracts.

## Residual boundaries

- Stripe is an intentional third-party boundary used only for optional contributions.
- The official public-resource links and visitor-saved music links navigate outside Aurora when chosen.
- Browser speech synthesis, audio generation, file export, media recording, and local storage depend on browser support; repaired rooms now fail gracefully when an optional capability is unavailable.
- Static analysis verifies structure and JavaScript syntax. Live-browser smoke testing remains part of the release procedure because browser APIs and GitHub Pages headers cannot be fully modeled by a repository-only audit.
