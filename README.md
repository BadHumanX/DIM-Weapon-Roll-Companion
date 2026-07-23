# DIM Weapon Roll Companion

A userscript for Destiny Item Manager (DIM) that adds quick DIM search query copy to clipboard.

1. Weapon Inverse (this copies a query for the selected weapon + -(tag:keep or tag:favorite))
   <img width="556" height="770" alt="image" src="https://github.com/user-attachments/assets/4b5d8817-62b3-4b79-9e43-ac1ebec35f5d" />

2. Weapon Rolls (click weapon rolls for your chosen columns; limited to 1 roll for columns 1, 2 & 5 and 3 selections per column for columns 3 & 4).
   <img width="1113" height="951" alt="2026-07-17_2004707" src="https://github.com/user-attachments/assets/a07f6dfa-4cd6-434a-a6b1-6b968422186a" />

## Installation

1. Install a userscript manager like **Tampermonkey** in your browser (Chrome, Edge, Firefox, Safari, etc.).
2. Click the Tampermonkey extension icon and select **Create a new script...**
3. Copy and paste the entire contents of the `dim-weapon-roll-companion.user.js` file from this project into the editor.
4. Save the script (Ctrl+S or File -> Save).
5. Open or refresh `https://app.destinyitemmanager.com/` to use the companion.

## How to use

1. Open `https://app.destinyitemmanager.com/` and select a weapon card.
2. The script injects a green overlay panel into the weapon card view.
3. Click perks in the DIM roll UI to select them.
4. The overlay displays selected perks per column.
5. Click `Copy` to copy the generated output to your clipboard.

## Output format

- The overlay displays a readable output for debugging.
- The `Copy` button generates a search-friendly string that preserves bracket grouping and `or` operators for multi-perk columns.

## Files

- `dim-weapon-roll-companion.user.js` - consolidated Tampermonkey userscript containing the full functionality.
- `manifest.json` - extension metadata and content script configuration (for browser extension mode).
- `constants.js` - selectors and class names used across the script.
- `selectors.js` - DOM query helpers for DIM card elements.
- `style.js` - injected overlay styling.
- `inject.js` - main logic for creating the overlay, handling perk selection, and copying output.
- `observer.js` - observes DOM changes and injects the overlay when new cards appear.
- `content.js` - unused or placeholder content script file.

## Dependencies

- No external npm packages or external asset networks are required.
- The userscript embeds the skull icon asset directly as a Base64 data URL.
- It requires a userscript manager and access to `https://app.destinyitemmanager.com/*`.

## Notes

- The companion is intended for personal use and development/testing in DIM.
- There is no backend or external dependency besides the browser and DIM site.

## Attribution

- Thanks to RIkas Dzihab for the skull icon on <a href="https://www.flaticon.com/free-icons/skull" title="skull icons">Flaticon</a>.
