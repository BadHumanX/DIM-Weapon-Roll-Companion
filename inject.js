// inject.js: creates the overlay rectangle and injects it into weapon cards
function createArmoryRectElement(weaponName) {
  const rect = document.createElement('div');
  applyArmoryRectStyles(rect);
  rect.innerHTML = `
    <div class="armory-weapon-name">exactname: "${weaponName}"</div>
    <div class="armory-child-click"></div>
    <div class="armory-copy-row">
      <button class="armory-copy-button" type="button">Copy</button>
    </div>
  `;
  return rect;
}

function ensureCardPosition(card) {
  const computed = window.getComputedStyle(card);
  if (computed.position === 'static') {
    card.style.position = 'relative';
  }
}

function copyArmoryText(state, rect) {
  const weaponLine = rect.querySelector('.armory-weapon-name')?.textContent || '';
  const normalizedWeaponLine = weaponLine.replace(/\s*:\s*/g, ':');
  const groups = {};

  state.selectedItems.forEach(item => {
    if (!groups[item.column]) {
      groups[item.column] = [];
    }
    groups[item.column].push(item.label);
  });

  const columnOrder = Object.keys(groups)
    .map(key => Number(key))
    .sort((a, b) => a - b);

  const outputParts = [normalizedWeaponLine];
  columnOrder.forEach(columnIndex => {
    const labels = groups[columnIndex];
    if (!labels || labels.length === 0) return;

    const formatted = labels
      .map(label => `exactperk:"${label.replace(/\s*:\s*/g, ':')}"`)
      .join(labels.length > 1 ? ' or ' : ' ');

    outputParts.push(`(${formatted})`);
  });

  const output = outputParts.join(' ');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(output).catch(() => fallbackCopyText(output));
  } else {
    fallbackCopyText(output);
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function attachCopyButton(card, rect) {
  const button = rect.querySelector('.armory-copy-button');
  if (!button || button.dataset.armoryCopyAttached) return;
  button.dataset.armoryCopyAttached = 'true';

  button.addEventListener('click', () => {
    const state = card.__armoryChildState;
    if (!state) return;
    copyArmoryText(state, rect);
    button.textContent = 'Copied';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 1200);
  });
}

function attachChildClickListeners(card, rect) {
  const childContainer = getArmoryChildContainer(card);
  if (!childContainer) return;

  const columns = Array.from(childContainer.children);
  const selectedItems = [];
  const state = {
    selectedItems,
    updatePerkName(perkEl, name) {
      const item = selectedItems.find(i => i.id === perkEl.dataset.armoryChildId);
      if (!item) return;
      item.label = cleanPerkName(name);
      renderChildLines();
    },
  };
  card.__armoryChildState = state;

  function getColumnIndex(perkEl) {
    const column = columns.find(col => col.contains(perkEl));
    return column ? columns.indexOf(column) + 1 : null;
  }

  function columnLimit(index) {
    if ([3, 4].includes(index)) return 3;
    if ([1, 2, 5].includes(index)) return 1;
    return 1;
  }

  function renderChildLines() {
    const childDisplay = rect.querySelector('.armory-child-click');
    if (!childDisplay) return;
    if (selectedItems.length === 0) {
      childDisplay.textContent = '';
      return;
    }

    const groups = {};
    selectedItems.forEach(item => {
      if (!groups[item.column]) {
        groups[item.column] = [];
      }
      groups[item.column].push(item);
    });

    const columnOrder = columns.map((_, index) => index + 1).filter((columnIndex) => groups[columnIndex]);
    const blocks = columnOrder.map((columnIndex) => {
      const items = groups[columnIndex];
      const line = items.map(item => `exactperk: "${item.label}"`).join(items.length > 1 ? ' or ' : ' ');
      return `<div>${line}</div>`;
    });

    childDisplay.innerHTML = blocks.map((block, idx) => idx > 0 ? `<div style="margin-top:8px;"></div>${block}` : block).join('');
  }

  function createItem(perkEl) {
    if (!perkEl.dataset.armoryChildId) {
      perkEl.dataset.armoryChildId = `armory-child-${Math.random().toString(36).slice(2, 10)}`;
    }
    const placeholder = getChildLabel(perkEl, 0);
    return {
      id: perkEl.dataset.armoryChildId,
      column: getColumnIndex(perkEl),
      label: placeholder,
      el: perkEl,
    };
  }

  function selectPerk(perkEl) {
    const columnIndex = getColumnIndex(perkEl);
    if (!columnIndex) return;

    const existing = selectedItems.find(item => item.id === perkEl.dataset.armoryChildId);
    if (existing) {
      selectedItems.splice(selectedItems.indexOf(existing), 1);
      perkEl.style.border = '';
      renderChildLines();
      return;
    }

    const sameColumn = selectedItems.filter(item => item.column === columnIndex);
    if (sameColumn.length >= columnLimit(columnIndex)) {
      if (columnIndex === 3) {
        return;
      }
      const old = sameColumn[0];
      old.el.style.border = '';
      selectedItems.splice(selectedItems.indexOf(old), 1);
    }

    const item = createItem(perkEl);
    selectedItems.push(item);
    perkEl.style.border = '1px solid green';
    renderChildLines();
  }

  function updatePerkName(perkEl, name) {
    const item = selectedItems.find(i => i.id === perkEl.dataset.armoryChildId);
    if (!item) return;
    item.label = cleanPerkName(name);
    renderChildLines();
  }

  childContainer.addEventListener('click', (event) => {
    const perkEl = event.target.closest('.VLJqBKva.oHZXmQjY');
    if (!perkEl || !childContainer.contains(perkEl)) return;

    selectPerk(perkEl);

    const tryUpdate = (name) => {
      if (!name) return;
      updatePerkName(perkEl, name);
    };

    const name = getTooltipPerkName();
    if (!name) {
      setTimeout(() => {
        tryUpdate(getTooltipPerkName());
      }, 120);
      return;
    }
    tryUpdate(name);
  });
}

function injectIntoArmoryCard() {
  const armoryCards = getArmoryCards();

  armoryCards.forEach(card => {
    if (card.querySelector(`.${ARMORY_RECT_CLASS}`)) return;

    const weaponName = getWeaponName(card);
    const rect = createArmoryRectElement(weaponName);

    ensureCardPosition(card);
    card.appendChild(rect);
    attachChildClickListeners(card, rect);
    attachPerkClickListeners(card, rect);
    attachCopyButton(card, rect);
  });
}

function getTooltipPerkName() {
  // Try to find the tooltip container inserted by the page
  const tooltip = document.querySelector('div.SHtI4cRc.GHf_yP6m');
  if (!tooltip) return null;

  // Look for the first non-empty text node inside common text elements
  const candidates = tooltip.querySelectorAll('div, p, span, h1, h2, h3');
  for (const el of candidates) {
    const txt = el.textContent && el.textContent.trim();
    if (txt) return txt;
  }
  return null;
}

function attachPerkClickListeners(card, rect) {
  if (card.dataset.armoryPerkListener) return;
  card.dataset.armoryPerkListener = 'true';

  card.addEventListener('click', (ev) => {
    const perkEl = ev.target.closest('.VLJqBKva.oHZXmQjY');
    if (!perkEl) return;

    const child = perkEl.closest('[data-armory-child-id]');
    if (!child) return;

    const state = card.__armoryChildState;
    if (!state) return;

    const nameUpdate = (name) => {
      if (!name) return;
      state.updatePerkName(child, name);
    };

    let name = getTooltipPerkName();
    if (!name) {
      setTimeout(() => {
        const n = getTooltipPerkName();
        nameUpdate(n);
      }, 120);
      return;
    }

    nameUpdate(name);
  });
}

function cleanPerkName(name) {
  return name.replace(/Trait$/i, '').trim();
}

function attachParentClickListeners(card, rect) {
  const parentContainer = getArmoryParentContainer(card);
  if (!parentContainer) return;

  const parentDisplay = rect.querySelector('.armory-parent-click');
  if (!parentDisplay) return;

  const parents = Array.from(parentContainer.children);
  const activeParents = [];
  const activeParentsSet = new Set();

  function updateParentDisplay() {
    if (activeParents.length === 0) {
      parentDisplay.textContent = '';
      return;
    }
    const lines = activeParents.map(p => {
      const idx = parents.indexOf(p);
      const label = getParentLabel(p, idx);
      return `clicked child: "${label}"`;
    });
    parentDisplay.innerHTML = '<div>(</div>' + lines.map(l => `<div>${l}</div>`).join('') + '<div>)</div>';
  }

  function selectParent(p) {
    if (activeParentsSet.has(p)) return;
    if (activeParents.length >= 3) {
      parentDisplay.textContent = 'Max 3 parents selected — deselect one first';
      setTimeout(updateParentDisplay, 900);
      return;
    }
    activeParents.push(p);
    activeParentsSet.add(p);
    p.style.border = '1px solid green';
    updateParentDisplay();
  }

  function deselectParent(p) {
    if (!activeParentsSet.has(p)) return;
    activeParentsSet.delete(p);
    const idx = activeParents.indexOf(p);
    if (idx !== -1) activeParents.splice(idx, 1);
    p.style.border = '';
    updateParentDisplay();
  }

  parents.forEach(p => {
    if (p.dataset.armoryParentListener) return;
    p.dataset.armoryParentListener = 'true';
    p.addEventListener('click', () => {
      if (activeParentsSet.has(p)) {
        deselectParent(p);
      } else {
        selectParent(p);
      }
    });
  });
}
