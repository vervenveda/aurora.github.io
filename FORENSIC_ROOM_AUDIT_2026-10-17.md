# Aurora room isolation audit — 2026-10-17

## Release result

Aurora contains **44 registered, independent rooms**. Each room is now covered by the same static presentation and isolation contract while retaining its own design and purpose.

The production site remains plain HTML, CSS, and browser JavaScript. **Node.js is not a production or hosting dependency.** There is no Wix dependency. GitHub Pages serves the files directly.

## Shared room contract

Every room now receives:

- a path-derived local-storage namespace, preventing one room's data from overwriting another's;
- a one-way compatibility import for data saved before namespacing;
- responsive media and narrow-screen containment;
- visible keyboard focus and reduced-motion behavior;
- automatic hardening for unlabeled controls, non-submit buttons, and new-window links;
- runtime error containment and a visible, accessible failure message;
- same-origin error reporting to the Aurora viewer;
- an iframe sandbox, no-referrer policy, and explicit capability allowlist in the landing page.
- whole-word responsive text flow without mid-word splitting;
- a non-overlapping app-level Beta doorway that is suppressed inside Aurora's viewer, where the shared sanctuary doorway remains available.

## Material repairs

| Severity | Room | Finding | Repair |
|---|---|---|---|
| High | Daily Writing Spark | The production prompt catalog was an empty placeholder, so **New Prompt** threw a runtime exception. | Restored complete English, Spanish, French, and Arabic prompt sets for every writing style and mood. |
| High | Vintage Spinet | Every note depended on a remote soundfont host and Ambient injected a YouTube player. | Replaced both with local Web Audio synthesis, including 20 timbres, sustain, note recording, playback, export, and a locally generated ambient bed. |
| Medium | AuraInk | Template images came from a third-party image CDN, could taint canvas export, and pointer coordinates were incorrect when the canvas was responsive. | Replaced templates with local glyph tools, made palette/template controls keyboard accessible, and scaled pointer coordinates to the canvas bitmap. |
| Medium | Inspiration Mosaic | The viewport blocked zoom, the preview began as a broken image, and adding after the final tile could read an undefined record. | Restored visitor zoom, made image state explicit, and added a safe completed-mosaic path. |
| Medium | Family Photo Album | Two empty image sources produced broken initial resources. | Images now begin hidden with no source and are revealed only after validated local content is available. |
| Medium | Aurora Inspiration | A `100vw` body created scrollbar-width overflow and sharing still named a retired art domain. | Switched to contained width, updated the title, and routed sharing to Aurora. |
| Medium | Multiple creative rooms | Share/credit URLs referenced the retired `myartgallery.online` domain. | Reconnected creative pathways to Aurora and Bazaar Art. |
| Medium | All rooms | Local-storage keys shared one origin across the Verve N Veda network. | Added per-room namespacing without discarding existing browser data. |
| Medium | Spire Mindful Breathing and The Village | Fixed app-level Beta links occupied the same bottom-right interaction plane as app controls. | Moved direct-page links into document flow and suppress duplicates inside Aurora's isolated viewer. |
| Medium | All rooms | The shared emergency wrapping rule could divide labels and titles inside words. | Replaced it with normal, centered whole-word wrapping and flexible control widths. |

## Room-by-room release matrix

The core-action column identifies the representative live-browser interaction exercised in addition to load, title, visible-content, image, overflow, shared-runtime, and JavaScript checks.

| # | Room | Core action | Release status |
|---:|---|---|---|
| 1 | AuraInk | Change language and render local canvas controls | Pass |
| 2 | Auraen Tune | Select a frequency preset | Pass |
| 3 | Aurora Inspiration | Generate an Aurora reflection | Pass |
| 4 | Good Night · Gentle Wake | Generate a new suggestion | Pass |
| 5 | Sacred Geometry Studio | Add a geometry layer | Pass |
| 6 | SpinSpire | Spin a new prompt | Pass |
| 7 | Affirmation Garden · Steady Growth | Generate an affirmation | Pass |
| 8 | Affirmation Garden · Nurturing Strength | Generate an affirmation | Pass |
| 9 | Brain Maze | Enter the maze | Pass |
| 10 | Breath & Reset | Start the timer | Pass |
| 11 | Breathe & Ground | Begin the practice | Pass |
| 12 | The Color Alchemist | Advance to the next round | Pass |
| 13 | Creative Mind Odyssey | Generate the next prompt | Pass |
| 14 | Creative Wheel | Spin the wheel | Pass |
| 15 | Daily Journal | Toggle night mode | Pass |
| 16 | Daily Rhythm Portal | Open centering practice | Pass |
| 17 | Daily Spark | Reroll a spark | Pass |
| 18 | Daily Writing Spark | Generate a multilingual prompt | Pass |
| 19 | DreamScript | Add a dream symbol | Pass |
| 20 | Dual Frequency Tuner | Select a tone preset | Pass |
| 21 | Emotional Weather | Generate new weather | Pass |
| 22 | Evening Ember | Generate a new question | Pass |
| 23 | Night Prayer | Refresh the reading | Pass |
| 24 | The First Hour | Begin a session | Pass |
| 25 | Grounding Suite | Select a random practice | Pass |
| 26 | Inspiration Mosaic | Open the add-tile flow | Pass |
| 27 | Letter to My Inner Self | Fill the writing template | Pass |
| 28 | The Loom of Dawn | Weave the next thread | Pass |
| 29 | Morning Muse | Generate a new prompt | Pass |
| 30 | Morning Reflections | Generate a reflection | Pass |
| 31 | Morning Sanctum | Open a scripture reflection | Pass |
| 32 | Creative Niché Venn | Enter a purpose dimension | Pass |
| 33 | One Creation at a Time | Generate a new idea | Pass |
| 34 | Family Photo Album | Filter the local album | Pass |
| 35 | Quantum Task Handler | Run the decision helper | Pass |
| 36 | Quiet Wins | Begin a reflection | Pass |
| 37 | Eiren Song Embedder | Validate editable song fields | Pass |
| 38 | Soulbook | Refresh the inspiration prompt | Pass |
| 39 | Spire Mindful Breathing | Start the breathing session | Pass |
| 40 | Starlight Jar | Generate a new question | Pass |
| 41 | Aurora Story Spark | Generate a story spark | Pass |
| 42 | The Village | Shuffle the village | Pass |
| 43 | Tiny Triumphs | Advance the reflection | Pass |
| 44 | Vintage Spinet | Play a locally synthesized key | Pass |

## Enforced verification

`scripts/audit_aurora.py` now fails closed for:

- missing room presentation or isolation assets;
- duplicate element IDs;
- zoom-blocking viewport metadata;
- empty resource URLs;
- unregistered or duplicated rooms;
- registry/mentor-manifest drift;
- broken local references or requested DOM IDs;
- JavaScript syntax failures;
- forbidden remote font, image, soundfont, or retired-domain dependencies;
- missing sandbox, no-referrer, and reduced-motion protections;
- unresolved placeholders, unaudited service workers, or temporary landing artwork.

## Intentional boundaries

- Stripe remains isolated to the optional contribution utility.
- Official public-resource links, social-share destinations, and visitor-entered music links leave Aurora only after a visitor chooses them.
- Browser file export, print, speech, Web Audio, MediaRecorder, and local storage remain subject to browser support. The rooms detect or contain unsupported optional capabilities without taking down the rest of Aurora.
