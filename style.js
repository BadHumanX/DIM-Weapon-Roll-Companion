// style.js: applies the visual styling to the injected armory rectangle element
function applyArmoryRectStyles(rect) {
  rect.className = ARMORY_RECT_CLASS;
  rect.style.position = 'absolute';
  rect.style.right = '16px';
  rect.style.top = '46%';
  rect.style.width = '500px';
  rect.style.height = '300px';
  rect.style.backgroundColor = '#3b333369';
  rect.style.borderRadius = '6px';
  rect.style.opacity = '0.85';
  rect.style.zIndex = '10';
  rect.style.padding = '12px';
  rect.style.color = 'white';
  rect.style.fontSize = '12px';
  rect.style.fontWeight = 'bold';
  rect.style.userSelect = 'text';

  const inverseWeaponIconUrl = chrome.runtime.getURL('Asset/broken-heart.png');
  const style = document.createElement('style');
  style.textContent = `
    .${ARMORY_RECT_CLASS} .armory-copy-button {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid #eee;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      padding: 6px 10px;
      font-size: 11px;
      margin-top: 10px;
    }

    .${ARMORY_RECT_CLASS} .armory-copy-button:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .inverse-weapon {
      background-color: green;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .${ARMORY_RECT_CLASS} .armory-copy-row {
      display: flex;
      justify-content: flex-end;
    }

    .${ARMORY_RECT_CLASS} .armory-child-click {
      white-space: pre-wrap;
      user-select: text;
      margin-top: 8px;
    }
  `;
  document.head.appendChild(style);
}

window.applyArmoryRectStyles = applyArmoryRectStyles;
