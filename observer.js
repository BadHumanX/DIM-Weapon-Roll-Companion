// observer.js: bootstraps the injection on load and watches DOM changes for new cards
function setupArmoryObserver() {
  injectIntoArmoryCard();

  const observer = new MutationObserver(() => injectIntoArmoryCard());
  observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener('load', setupArmoryObserver);
