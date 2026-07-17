// selectors.js: DOM query helpers for finding weapon cards and extracting names
function getArmoryCards() {
  return document.querySelectorAll(ARMORY_CARD_SELECTOR);
}

function getArmoryChildContainer(card) {
  return card.querySelector(ARMORY_CHILD_CONTAINER_SELECTOR);
}

function getArmoryParentContainer(card) {
  return card.querySelector(ARMORY_PARENT_CONTAINER_SELECTOR);
}

function getWeaponName(card) {
  const nameContainer = card.querySelector(WEAPON_NAME_SELECTOR);
  if (nameContainer) {
    return nameContainer.textContent.trim();
  }

  const h1 = card.querySelector('h1');
  return h1 ? h1.textContent.trim() : '';
}

function getChildLabel(child, index) {
  const text = child.textContent.trim();
  return text || `child ${index + 1}`;
}

function getParentLabel(parent, index) {
  const text = parent.textContent.trim();
  return text || `parent ${index + 1}`;
}
