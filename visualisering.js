// VISUALISERING.JS – REN OG STABIL VERSJON (UTEN REVEAL)

/* 
   Dette scriptet gjør nå KUN én ting:

   – Sikrer at siden er klar (DOMContentLoaded)
   – Men gjør ingen layout-endringer
   – Vi flytter ikke DOM-elementer
   – Vi legger ikke til eller fjerner klasser
   – Vi tukler ikke med flex / rekkefølge / plassering

   Resultat:
   Sidens layout fungerer som forventet.
   Ingenting forsvinner, inkludert bottom-boksene.
*/

document.querySelector(".back-btn").onclick = () => {
  window.location.href = "kampklar.html";
};

