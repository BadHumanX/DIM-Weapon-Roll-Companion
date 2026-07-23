// ==UserScript==
// @name         DIM Weapon Wrapper
// @namespace    https://github.com/BadHumanX/DIM-Weapon-Roll-Companion
// @version      0.1.0
// @description  Modifies the DOM structure of specific weapon containers in Destiny Item Manager (DIM).
// @author       BadHumanX / HumphreyMakere
// @match        https://app.destinyitemmanager.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function modifyWeaponDOM() {
    const selector = '#content-_r_19_ > div:nth-child(1) > div.store-cell.eurO6kuz > div > div:nth-child(2), ' +
      '#content-_r_19_ > div:nth-child(2) > div.store-cell.eurO6kuz > div > div:nth-child(2), ' +
      '#content-_r_19_ > div:nth-child(3) > div.store-cell.eurO6kuz > div > div:nth-child(2)';
    const containers = document.querySelectorAll(selector);

    containers.forEach(container => {
      // Set background color to red
      container.style.backgroundColor = 'red';

      const children = Array.from(container.children);

      children.forEach(child => {
        // Skip elements with class 'yzI7ZtLL' or already wrapped in 'xx-weapon-wrapper'
        if (child.classList.contains('yzI7ZtLL') || child.classList.contains('xx-weapon-wrapper')) {
          return;
        }

        // Create a new wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'xx-weapon-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';

        // Create a new flyover div
        const flyover = document.createElement('div');
        flyover.className = 'xx-weapon-flyover';
        flyover.style.width = '15px';
        flyover.style.height = '15px';
        flyover.style.backgroundColor = 'green';
        flyover.style.flexShrink = '0';
        flyover.textContent = ''; // Clear text content

        // Restructure hierarchy: place flyover, then child inside wrapper
        child.parentNode.insertBefore(wrapper, child);
        wrapper.appendChild(flyover);
        wrapper.appendChild(child);
      });
    });
  }

  function setupObserver() {
    modifyWeaponDOM();
    const observer = new MutationObserver(() => modifyWeaponDOM());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupObserver();
  } else {
    window.addEventListener('load', setupObserver);
  }
})();
