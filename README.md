# Aurora

Aurora is a quiet public Verve N Veda studio for breath, rest, reflection, creativity, sound, and humane daily rhythm.

Live site: <https://vervenveda.com/aurora.github.io/>

## The collection

The landing page presents 44 original, self-contained rooms across six paths:

- Breath & Grounding
- Morning & Daily Rhythm
- Evening, Sleep & Rest
- Creative Renewal
- Reflection & Growth
- Sound & Atmosphere

It also includes a searchable, static-only public research library with 24 references across eight natural, complementary, integrative, and whole-person health topics. The library uses only approved public-institution destinations and does not sell or recommend products.

The complete room registry is in `assets/aurora-sanctuary.js`. The corresponding discovery metadata is in `mentor-manifest.json`. The audit requires those inventories to match every non-utility `apps/*_index.html` file exactly.

## Design system

The entrance uses a parchment, sage, and antique-gold visual system with restrained 7 px corners. The landing page is intentionally art-free while original artwork is being prepared: its atmosphere comes from typography, spacing, borders, and quiet CSS color fields rather than stock or generated imagery.

System fonts and locally stored code keep rendering calm and predictable.

## Runtime architecture

Aurora is a static application built with plain HTML, CSS, and browser JavaScript. It has:

- no Node.js production runtime or hosting dependency;
- no Wix dependency, embeds, signatures, or error routes;
- no front-end framework;
- no required account;
- no backend for journals or room activity;
- no remote font or general-purpose CDN dependency.

The optional contribution doorway loads Stripe's official browser component. User-selected music links and explicitly opened public resources can leave Aurora; those boundaries are visible to the visitor.

## Privacy and local preferences

Favorites, saved reflections, room entries, and the optional voice setting stay in the visitor's browser when local storage is available. The landing page does not send those values to Aurora.

Each room uses a path-derived storage namespace, so similarly named keys in different tools cannot overwrite one another. Existing pre-isolation values are imported once for continuity.

Saved user text is restored as text or through narrow allowlist sanitization. Saved media addresses are limited to credential-free `http` or `https` URLs before they can become links, audio sources, or YouTube embeds.

## Wellness boundary

Aurora is a reflection, creativity, and wellness-support environment. It is **not** medical, psychological, psychiatric, or therapeutic treatment, and it does not provide diagnosis or emergency care. Tone tools are presented as listening experiments without claims of medical efficacy.

## Accessibility

The sanctuary entrance includes keyboard-visible focus states, a skip link, responsive layouts, reduced-motion support, keyboard dismissal and focus containment for room dialogs, text labels alongside decorative symbols, whole-word wrapping, and an opt-in browser speech feature.

## Forensic audit

Run the repository-wide check with:

```bash
python scripts/audit_aurora.py
```

The audit verifies all 46 HTML documents (the landing page, 44 rooms, and the contribution utility), every local file reference, required metadata, unique and referenced DOM IDs, inline JavaScript syntax, room isolation assets, registry/manifest parity, the 24-source official reference library, unresolved placeholders, forbidden remote dependencies, sandbox policy, and the wellness boundary. GitHub Actions runs the same command on pushes and pull requests to `main`.

The repository-wide findings are in `FORENSIC_AUDIT_2026-10-16.md`. The room-by-room isolation and execution record is in `FORENSIC_ROOM_AUDIT_2026-10-17.md`.

## Repository map

```text
index.html                         public studio entrance
assets/                            local design system and landing logic
apps/                              44 rooms plus contribution utility
mentor-manifest.json               discovery and safety metadata
scripts/audit_aurora.py            fail-closed repository audit
.github/workflows/aurora-audit.yml continuous verification
```
