// ==UserScript==
// @name         DIM Weapon Inverse Query
// @namespace    https://github.com/BadHumanX/DIM-Weapon-Roll-Companion
// @version      0.1.0
// @description  Injects an Inverse Query helper button under weapon detail view in DIM for quick search query copying.
// @author       BadHumanX
// @match        https://app.destinyitemmanager.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const SKULL_ICON_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAOw4AADsOAFxK8o4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzs3XecVNX5+PHPtJ1tLFvYXVikSO9NQFDBQlVAxJ5gAGONhSgao/kRjcbEWKKJJSGRJBobJrGBDb8oShQbghQRlmUB6bvLNna2zE75/TEsQaXNuWfm3jvzvF+vfcnr+8058+yy3PPcU54DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhIU4zA5ACHHcnEAOkHuE/+YAmYDnwH85yp9TgIwDf/YB/gN/rgOaD/Pn/UDgwP+tCqg88F9D/9zy35CG71UIEWOSAAhhPjdQBHQ88HXCga9OQDugDZFBvrVJAUapmkgiUA7sAbYB24EdwDcH/ryLSEIhhDCJJABCxEdboA/QC+jKtwf5toDLvNBMEeR/ycEOIknBZmADsB7Ya15oQiQHSQCE0KuIyEDfBeh74M/9gUIzg7KhaiIJwXrgK6D0wJ+/RpYYhNBCEgAh1KQDg4GhB75a3u7TzQwqCdTzv1mCFcDnwCqgwcyghLAjSQCEODY30BM46ZCvoYDXzKDEQUFgI/DFIV+fA01mBiWE1UkCIMT3nQCcAQw78DUISDMzIBG1BiIzA58f+Hof2GlmQEJYjSQAQkABcDpwGnAqkTd8kXhKgY+AD4E3iWw+FCJSQIgklEr4GRg7IGvIci/hWRUCiw58PUesM/ccISIL3Ni0ejgwGzgAFEiuoI0SIErCaSCLxOZJZA6hSIhCYJgEhUGUQG+8nAeUSm+YU4XlVEZgZeBxYSOZYoREKRBEAkkk7ABGAKMJ5IuVshjAoCnwCLgFeAYnPDEUIPSQCE3Z0ETCMy6A8wORaRHFYTSQZeJnLSQAhbkgRA2FFX4IcHvnqZHIvlpKamkpqa+r0/e71e0tLSvvfnhoYGmpqavvfnxsZGGhsbv/dn8S1fA88f+Co1ORYhoiIJgLCLAuASIoP+CJNjiQuPx0NhYSHt27enTZs25OTkkJ2dffC/3/1q+b87HLH5Zx0Oh6mqqqK6uprq6mqqqqooLy+noqKCqqoqamtrqampobq6msrKSnbv3s3evXsJBoMxicdiwkSWCZ4HXiRyEZIQliYJgLCyTCIb+H4IjCOymz8hOBwOCgoK6NChA0VFRRQVFR38c/v27enQoQP5+fm4XNa/IygcDh+cIQiHw9/6/wWDQSoqKti1axe7d+9mz5497Ny5kz179rBnzx527dpFeXn599rZXAB4h0gy8CqR65aFsBxJAITVOIAzgSuIDP62rq3v8Xjo0qULPXv2pHv37vTq1Yvu3bvTo0ePg1PwiSIcDtPQ0BD1UkF9fT1br161i7di2bN2+20zJCE5HaAn8lUmtACFNIAiDMkEVkwL8GGxzdKywsZNiwYQwePPjglwz2xy8QCFBfXx/T6fzq6mrWrl3LmjVrWLt2LV9++SXl5bbYh7camAc8B+w3ORaRZCQBEPHUD5gN/IDIBj9Lys/P57TTTuO0005j1KhRdO/e3eyQEkJzczM+ny9u0/clJSV88sknfPrpp3zyySdUVlp61n0/kU2DjwLrTY5FJAlJAEQ8nAb8HJiEBX/nMjMzGTp0KKeffjpnnHEGAwcOjNlROsHBjYLxnrLfvn07H330ER999BHLly+nutqS1X3DwLtEEoFFJsciEpw85USsOIlU6LsNGG5yLN/idrs55ZRTGD9+PKNHj6Zv3744nXI3UDyFQiHq6+vx+/2mff6GDRtYvnw5S5cu5fPPP7divYJPgAeA14hcViSEVpIACN28RAr23IGFqvSlp6czatQozjvvPCZOnChr+BYRCATw+XymD7719fV8/PHHvPXWW7z33nvU1NSYGs93lBKZEfgr0GByLCKBSAIgdMkCLifyxl9kciwAdOrUiTPPPJMJEyZw1llnkZIidwNZUTgcpqmpifr6erNDASLFi1atWsV7773Hu+++S0lJidkhtSgD/kwkGbD0hgZhD5IACKNyiQz612OBjX39+/fn/PPP55xzzqFHjx5mhyOiEAwGqa+vp7m52exQvqWkpIR3332X119/nfXrLbE/bz/wOPAgkWuLhVAiCYBQlUlk0L8dMHU+/YQTTmDSpEn88Ic/ZMAAy58qFMfg9/upr6+3ZLGfkpIS3njjDRYuXMjWrVvNDqcOeAK4D7DUmoWwB0kARLTSgauIrPEXmhVETk4OU6dO5ZJLLuHkk0+WXfsJxuxNgsdj06ZNvPLKK7z88stm1xzYR2Q24DHAGusowhbkqSmOVwowC/gV0M6MAFJTU5k4cSKXXHIJY8aMSboSu8ko3rUDVIRCIVauXMkrr7zC66+/Tl1dnVmhlAO/B/4IyN3N4pgkARDH4iFSuOcuoIsZAQwaNIiZM2dy0UUXkZGRYUYIwkR2mA1o0dTUxLvvvsuCBQv46KOPzApjO5FEYB6RssNCHJYkAOJoziMytdgt3h+cmZnJhRdeyKxZsxg4cGC8P15YkJX3BhzOV199xfPPP8/ChQvNOuFQDNyKFBQSRyAJgDicXsDDwNnx/uCePXty6aWXMmvWLDmrL74nFArh8/ksd1LgaHw+H4sWLeK5554z6xTBe8BNwFozPlxYlyQA4lB5wD1Ebudzx+tD09LSuOCCC5g1axYnnXRSvD5W2FhjY6Nl6gZE48svv2TBggUsWrRI+y2JxxAgUkPgV0gNAXGAJAACIoP9j4F7gfx4fWibNm247LLLuPbaayksNO1AgbCpYDBIXV2d6VUEVVRVVfGvf/2Lp556irKysrh+NHA/8Ahg/U0VIqYkARBjiDwM+sfrAzt37sw111zDzJkzSUtLi9fHaudwOHC5XLhcLhwOB+FwmGAwGNNrb8W3hcNh6uvraWqy5143v9/PG2+8wZ///Gc2b94cz4/eCMwB3oznhwprkQQgeZ1I5LjQlHh94NChQ7nxxhuZPHmyLS/fcTgcuN3ug18ul+uw/7tQKERDQ4Ot1qntzu/34/5ofstyle.textContent = `
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
  `;
  document.head.appendChild(style);

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

  function ensureInverseQueryButton() {
    const container = document.querySelector('#temp-container > div > div:nth-child(1) > div > div.WDlrbzPo > div');
    if (!container) return;

    let button = container.querySelector('button.inverse-weapon');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'RMJmuSye o3oKAnUN riJK1dNz inverse-weapon';
      button.title = 'Inverse Query';
      button.setAttribute('aria-keyshortcuts', 'i');

      const img = document.createElement('img');
      img.src = SKULL_ICON_BASE64;
      img.alt = 'Inverse Query';
      img.style.width = '18px';
      img.style.height = '18px';
      button.appendChild(img);

      button.dataset.inverseQueryListenerAttached = 'true';
      button.addEventListener('click', () => {
        const label = document.querySelector('#temp-container > div > div:nth-child(1) > div > div.gi12X5mX.wB8P8rVg > div.DJShGPgK > button > h1 > span');
        if (!label) return;

        const text = label.textContent.trim().toLowerCase();
        const clipboardText = `exactname:"${text}" -(tag:keep or tag:favorite)`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(clipboardText).catch(() => fallbackCopyText(clipboardText));
        } else {
          fallbackCopyText(clipboardText);
        }
      });

      container.appendChild(button);
    } else if (!button.dataset.inverseQueryListenerAttached) {
      button.dataset.inverseQueryListenerAttached = 'true';
      button.addEventListener('click', () => {
        const label = document.querySelector('#temp-container > div > div:nth-child(1) > div > div.gi12X5mX.wB8P8rVg > div.DJShGPgK > button > h1 > span');
        if (!label) return;

        const text = label.textContent.trim().toLowerCase();
        const clipboardText = `exactname:"${text}" -(tag:keep or tag:favorite)`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(clipboardText).catch(() => fallbackCopyText(clipboardText));
        } else {
          fallbackCopyText(clipboardText);
        }
      });
    }

    const isOnlyUl = container.classList.length === 1 && container.classList.contains('Ul_ZE389');
    const hasBothUlAndLc = container.classList.contains('Ul_ZE389') && container.classList.contains('Lc2WXhl2');
    const span = button.querySelector('span.US8Iulse');

    if (isOnlyUl && !span) {
      const tag = document.createElement('span');
      tag.className = 'US8Iulse';
      tag.textContent = 'Not Tagged';
      button.appendChild(tag);
    }

    if (!isOnlyUl && span) {
      span.remove();
    }

    if (hasBothUlAndLc && span) {
      span.remove();
    }
  }

  function setupInverseObserver() {
    ensureInverseQueryButton();

    const observer = new MutationObserver(() => ensureInverseQueryButton());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupInverseObserver();
  } else {
    window.addEventListener('load', setupInverseObserver);
  }

})();
