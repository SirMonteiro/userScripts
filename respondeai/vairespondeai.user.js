// ==UserScript==
// @name vairespondeai
// @namespace https://github.com/sirmonteiro
// @version 1.0
// @description Unblurs Responde Aí answers and remove some annoying stuff
// @author SirMonteiro
// @icon https://www.respondeai.com.br/apple-touch-icon.png
// @match https://*.respondeai.com.br/*
// @run-at document-body
// @grant GM.addStyle
// ==/UserScript==

(function () {
  "use strict";
  GM.addStyle(`
    .paywall *, .blur-content *, .blurs *, .paywall::before, .blur-content::before {
        filter: none !important;
        -webkit-filter: none !important;
        backdrop-filter: none !important;
    }

    [class*="Paywall"], [class*="BannerContainer"] {
        display: none !important;
    }
    `);

  const elementsToRemove = ["[class*='NoAccessDisclaimer']"];
  const elementsToClick = [".ReactModal__Content"];
  const config = { attributes: true, childList: true, subtree: true };
  let timeoutID = 0;
  let mutationObserver;
  const mutationCallback = () => {
    mutationObserver.disconnect();
    for (let query of elementsToRemove) {
      let nodes = document.querySelectorAll(query);
      for (let node of nodes) node.remove();
    }
    for (let query of elementsToClick) {
      let nodes = document.querySelectorAll(query);
      for (let node of nodes)
        if (timeoutID === 0)
          timeoutID = setTimeout(() => {
            timeoutID = 0;
            node.click();
            node.firstChild.click();
            node.firstChild.firstChild.firstChild.click();
          }, 500);
    }
    mutationObserver.observe(document.body, config);
  };

  document.addEventListener("DOMContentLoaded", () => {
    mutationObserver = new MutationObserver(mutationCallback);
    mutationCallback();
  });
})();
