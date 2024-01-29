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

var counter = 0;
var intv = setInterval(function () {
  if (counter == 150) clearInterval(intv);
  counter++;
  var elem = document.getElementsByClassName("ReactModal__Content");
  if (elem.length < 1) return false;
  var elem2 = document.querySelector('[class*="' + "Loading__Container" + '"]');
  if (elem2) return false;
  clearInterval(intv);
  elem[0].firstChild.click();
  elem[0].firstChild.firstChild.firstChild.click();
  document.querySelector(
    '[class*="' + "NoAccessDisclaimer" + '"]'
  ).style.display = "none";
}, 200);
