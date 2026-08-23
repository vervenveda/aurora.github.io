# Aurora

**Aurora** is a quiet public Verve N Veda sanctuary for breath, rest, reflection, creativity, sound, and humane daily rhythm.

Live site: https://vervenveda.com/aurora.github.io/

## Purpose

Aurora gathers small original rooms that can be used independently: breathing timers, grounding prompts, morning and evening rituals, journals, creative prompts, listening tools, gratitude spaces, prayer/reflection rooms, and gentle creative experiments.

The public entrance is intentionally calm. It is designed to feel more like entering a quiet studio or garden than opening a productivity dashboard.

## Watercolor Sanctuary design

The landing page uses two local watercolor-inspired landscape assets:

- `assets/aurora-meadow.svg` — the pale green and gold entrance landscape.
- `assets/aurora-evening.svg` — the warm amber Evening & Rest landscape.

They are stored locally with the site. Aurora does not load stock photography or third-party background imagery.

The visual direction emphasizes breathing room, low contrast, soft paper tones, restrained motion, simple typography, and quiet navigation.

## Privacy and local preferences

Aurora does not require an account to browse its original rooms.

Small interface preferences such as favorites and the optional Aurora Voice setting are stored in the visitor's own browser when local storage is available. The landing page does not send journal entries, reflection text, favorites, or room activity to Aurora.

External public resources are clearly separated from Aurora originals and open on their own official websites.

## Wellness boundary

Aurora is a reflection, creativity, and wellness-support environment. It is **not** medical, psychological, psychiatric, or therapeutic treatment, and it does not provide diagnosis or emergency care.

Where health information is useful, the public page links directly to established resources including NIH/NCCIH, CDC, NIMH, MedlinePlus, USDA, and WHO.

## Accessibility

The sanctuary entrance includes:

- keyboard-visible focus states;
- a skip-to-content link;
- responsive layouts;
- reduced-motion support;
- keyboard dismissal and focus containment for room dialogs;
- an optional browser speech-synthesis reading feature;
- plain-text labels in addition to decorative symbols.

Aurora Voice is opt-in and remains off until the visitor enables it.

## Structure

```text
index.html
assets/
  aurora-meadow.svg
  aurora-evening.svg
  aurora-sanctuary.css
  aurora-sanctuary.js
apps/
  ...Aurora original rooms...
mentor-manifest.json
README.md
```

The original rooms remain separate, self-contained pages under `apps/`. The landing page acts as a calm directory and opens same-origin rooms without requiring visitors to leave the sanctuary.

## Public contribution doorway

Aurora may display an optional Stripe contribution button. Stripe is an external payment provider and is isolated from Aurora's local favorites and reflection features. Public support for Aurora / Verve N Veda development is separate from political campaign contributions, and no charitable or tax-deductible status is implied.

## Development principles

Aurora favors:

- local-first behavior where practical;
- no unnecessary accounts;
- no hidden claims of medical efficacy;
- transparent external links;
- accessible interaction;
- calm rather than attention-maximizing design;
- original lightweight HTML, CSS, JavaScript, and local visual assets.

## Status

Aurora is an evolving public collection. Individual rooms may be revised as accessibility, usability, content, and safety audits continue.
