# DIM Weapon Roll Companion

A small browser extension for Destiny Item Manager (DIM) that adds quick DIM search query copy to clipboard.

1. Weapon Inverse (this copies a query for the selected weapon + -(tag:keep or tag:favorite))
   <img width="556" height="770" alt="image" src="https://github.com/user-attachments/assets/4b5d8817-62b3-4b79-9e43-ac1ebec35f5d" />

2. Weapon Rolls (click weapon rolls for your chosen columns; limited to 1 roll for columns 1, 2 & 5 and 3 selections per column for columns 3 & 4).
   <img width="1113" height="951" alt="2026-07-17_2004707" src="https://github.com/user-attachments/assets/a07f6dfa-4cd6-434a-a6b1-6b968422186a" />

## Installation

1. Open Chrome or Edge and go to `chrome://extensions` or `edge://extensions`.
2. Enable `Developer mode` in the top right.
3. Click `Load unpacked`.
4. Select the `Dim Enhance` folder containing this project.
5. The extension should appear as `DIM Weapon Roll Companion`.

<img width="1292" height="832" alt="2026-07-17_2001707" src="https://github.com/user-attachments/assets/f0eaf173-5bb4-431c-9000-03ca3347d9a0" />


## How to use

1. Open `https://app.destinyitemmanager.com/` and select a weapon card.
2. The extension injects a green overlay panel into the weapon card view.
3. Click perks in the DIM roll UI to select them.
4. The overlay displays selected perks per column.
5. Click `Copy` to copy the generated output to your clipboard.


## Output format

- The overlay displays a readable output for debugging.
- The `Copy` button generates a search-friendly string that preserves bracket grouping and `or` operators for multi-perk columns.

## Files

- `manifest.json` - extension metadata and content script configuration.
- `constants.js` - selectors and class names used across the extension.
- `selectors.js` - DOM query helpers for DIM card elements.
- `style.js` - injected overlay styling.
- `inject.js` - main logic for creating the overlay, handling perk selection, and copying output.
- `observer.js` - observes DOM changes and injects the overlay when new cards appear.
- `content.js` - unused or placeholder content script file.

## Dependencies

- No external npm packages are required.
- This is a Manifest V3 browser extension, so it works in Chrome and Edge.
- It requires access to `https://app.destinyitemmanager.com/*`.

## Notes

- The extension is intended for personal use and development/testing in DIM.
- There is no backend or external dependency besides the browser and DIM site.

## Attribution

- Thanks to RIkas Dzihab for the skull icon on <a href="https://www.flaticon.com/free-icons/skull" title="skull icons">Flaticon</a>.
