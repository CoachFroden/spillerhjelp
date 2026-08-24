"use strict";

const menuScreen = document.getElementById("menuScreen");
const workoutScreen = document.getElementById("workoutScreen");
const programName = document.getElementById("programName");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const exerciseCard = document.getElementById("exerciseCard");
const exerciseTag = document.getElementById("exerciseTag");
const exerciseTitle = document.getElementById("exerciseTitle");
const exerciseDose = document.getElementById("exerciseDose");
const exerciseCue = document.getElementById("exerciseCue");
const qualityTip = document.getElementById("qualityTip");
const nextExercise = document.getElementById("nextExercise");
const closeWorkout = document.getElementById("closeWorkout");
const resetWorkout = document.getElementById("resetWorkout");
const infoModal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const commonWarmup = {
  tag: "Oppvarming",
  title: "Gjør kroppen klar",
  dose: "3–4 minutter",
  cue: "Rolig jogg på stedet, kneløft, utfall og noen lette hopp.",
  info: "Målet er å bli varm, ikke sliten.\n\nGjør 20–30 sekunder av hver: rolig jogg, kneløft, spark bak, utfall og små lette hopp. Beveg deg kontrollert og øk tempoet gradvis.",
  tip: "Du skal føle deg lettere og mer klar etter oppvarmingen."
};

const programs = {
  strength: {
    name: "Fotballstyrke",
    items: [
      commonWarmup,
      {
        tag: "Beinstyrke",
        title: "Split squat",
        dose: "3 × 8 per bein",
        cue: "Rolig ned. Press kraftig opp. Hold kne og fot i samme retning.",
        info: "Stå i splittstilling. Senk kroppen kontrollert rett ned til bakre kne nærmer seg bakken. Press opp gjennom fremre fot.\n\nHold overkroppen stabil og unngå at kneet faller innover. Når kroppsvekt blir lett kan du bruke en ryggsekk med litt belastning.",
        tip: "Velg en belastning som lar deg beholde god teknikk i alle repetisjonene."
      },
      {
        tag: "Bakside / balanse",
        title: "Ettbeins RDL",
        dose: "3 × 8 per bein",
        cue: "Mykt kne. Skyv hofta bak og hold ryggen lang.",
        info: "Stå på ett bein med lett bøy i kneet. Før hofta bakover mens overkroppen lener seg frem og det frie beinet går bak. Kom opp ved å presse hofta frem igjen.\n\nBevegelsen skal kjennes i bakside lår og sete, ikke i korsryggen.",
        tip: "Bruk vegg eller stol for balanse hvis teknikken blir bedre av det."
      },
      {
        tag: "Legg",
        title: "Ettbeins tåhev",
        dose: "3 × 12 per bein",
        cue: "Helt opp på tå. Senk rolig og kontrollert.",
        info: "Stå på ett bein og bruk lett støtte med fingertuppene. Løft hælen så høyt du kan uten å miste kontrollen. Senk rolig ned igjen.\n\nNår 12 repetisjoner er lette med god høyde, kan du bruke en ryggsekk som ekstra belastning.",
        tip: "Jevn høyde er viktigere enn mange raske repetisjoner."
      },
      {
        tag: "Overkropp",
        title: "Push-ups",
        dose: "3 × 8–15",
        cue: "Kroppen som en rett linje. Brystet rolig ned og press opp.",
        info: "Plasser hendene litt bredere enn skuldrene. Hold mage og sete aktive så kroppen holder seg samlet. Senk kontrollert og press opp igjen.\n\nBruk knærne i bakken eller hendene på en benk hvis vanlige push-ups blir for tunge.",
        tip: "Stopp settet når teknikken begynner å falle."
      },
      {
        tag: "Lyske",
        title: "Kort Copenhagen",
        dose: "2 × 6–8 per side",
        cue: "Kneet på stol eller benk. Løft hofta kontrollert.",
        info: "Ligg på siden med øverste kne støttet på en lav stol eller benk. Løft hofta slik at kroppen blir forholdsvis rett. Senk kontrollert.\n\nStart med kort arm – kneet støttes, ikke foten. Det er en lettere og mer passende startvariant.",
        tip: "Dette skal kjennes som styrkearbeid i lysken, ikke skarp smerte."
      },
      {
        tag: "Kjerne",
        title: "Sideplanke",
        dose: "2 × 25–35 sek per side",
        cue: "Hold kroppen lang og hofta oppe.",
        info: "Støtt på albuen og utsiden av foten. Løft hofta og hold kroppen i en rett linje.\n\nHvis det er for tungt, bøy knærne og støtt på kneet. Hold pusten rolig hele tiden.",
        tip: "God posisjon i 25 sekunder er bedre enn dårlig posisjon i 60."
      }
    ]
  },
  jump: {
    name: "Spenst",
    items: [
      commonWarmup,
      {
        tag: "Elastisitet",
        title: "Pogohopp",
        dose: "3 × 15",
        cue: "Små raske hopp. Kort kontakt med bakken.",
        info: "Stå relativt høyt og gjør små raske hopp fra ankelen. Tenk at bakken er varm.\n\nIkke jag høyde her. Målet er rytme, stiv ankel og kort bakkekontakt.",
        tip: "Pause 45–60 sekunder mellom settene."
      },
      {
        tag: "Maks kraft",
        title: "Hopp rett opp",
        dose: "3 × 3",
        cue: "Rolig sats. Hopp så høyt du kan og land mykt.",
        info: "Start stående. Bøy raskt i hofte og kne og hopp eksplosivt rett opp. Bruk armene.\n\nLand kontrollert med knær over tærne. Nullstill mellom hvert hopp – dette er ikke en kondisjonsøvelse.",
        tip: "Ta 45–75 sekunder pause mellom settene for maksimal kvalitet."
      },
      {
        tag: "Horisontal kraft",
        title: "Lengdehopp",
        dose: "3 × 3",
        cue: "Eksploder frem. Land stille og stabilt.",
        info: "Bruk begge bein og armene aktivt. Hopp frem så langt du kan uten å ofre landingen.\n\nHold landingen i omtrent to sekunder. Hvis du må ta mange steg for å hente deg inn, reduser kraften litt og finn kontrollen.",
        tip: "Lengde + kontroll er målet."
      },
      {
        tag: "Ett bein",
        title: "Ettbeinshopp frem",
        dose: "2 × 4 per bein",
        cue: "Kraftig fraspark. Stabil landing på samme bein.",
        info: "Hopp frem på ett bein og land på samme bein. Hold landingen kort før neste repetisjon.\n\nStart med moderate hopp og øk lengden når kne, fot og balanse er stabile.",
        tip: "Avslutt settet hvis landingen blir ustabil."
      },
      {
        tag: "Sideveis kraft",
        title: "Sidehopp",
        dose: "2 × 5 per side",
        cue: "Skyv kraftig sideveis. Land kontrollert.",
        info: "Stå på ett bein og hopp kontrollert sideveis til motsatt bein. Stabiliser før du hopper tilbake.\n\nHold kneet over foten og unngå at overkroppen kollapser sidelengs.",
        tip: "Start kortere og bygg bredde når kontrollen er god."
      },
      {
        tag: "Eksplosiv overgang",
        title: "Hopp + akselerasjon",
        dose: "4 repetisjoner",
        cue: "Ett kraftig hopp – land – 5–8 meter rask akselerasjon.",
        info: "Gjør ett eksplosivt hopp rett opp. Land kontrollert og gå direkte over i en kort akselerasjon.\n\nBruk god plass og sklisikkert underlag. Ta minst 60–90 sekunder pause mellom repetisjonene.",
        tip: "Hver repetisjon skal være rask. Stopp før du blir seig."
      }
    ]
  },
  combo: {
    name: "Kombi",
    items: [
      commonWarmup,
      {
        tag: "Styrke",
        title: "Split squat",
        dose: "2 × 6 per bein",
        cue: "Rolig ned. Kraftig opp med full kontroll.",
        info: "Samme teknikk som i styrkeøkta: stabil fot, kne over tær og kontrollert dybde.\n\nIkke tren til utmattelse. Du skal ha overskudd til den eksplosive øvelsen som kommer etterpå.",
        tip: "La 2–3 gode repetisjoner være igjen på lager."
      },
      {
        tag: "Spenst",
        title: "Hopp rett opp",
        dose: "3 × 3",
        cue: "Maks høyde. Myk og stabil landing.",
        info: "Gjør tre eksplosive enkelthopp. Nullstill mellom hvert hopp og bruk armene aktivt.\n\nTa god pause etter settet før du går videre.",
        tip: "Høy kvalitet, lavt volum."
      },
      {
        tag: "Bakside",
        title: "Ettbeins RDL",
        dose: "2 × 8 per bein",
        cue: "Hofta bak. Stabil rygg og bekken.",
        info: "Balanser på ett bein og heng frem fra hofta. Kjenn bakside lår og sete jobbe.\n\nBruk støtte ved behov, og legg eventuelt på lett belastning hvis kroppsvekt er enkelt.",
        tip: "Kontrollert styrke først – fart senere."
      },
      {
        tag: "Elastisitet",
        title: "Pogohopp",
        dose: "3 × 12",
        cue: "Små raske hopp fra ankelen.",
        info: "Hold kroppen høy og jobb raskt mot bakken. Små hopp og kort kontakttid.\n\nStopp hvis rytmen eller spretten forsvinner.",
        tip: "Ta 45–60 sekunder pause."
      },
      {
        tag: "Legg",
        title: "Ettbeins tåhev",
        dose: "2 × 12 per bein",
        cue: "Full høyde og rolig senkefase.",
        info: "Bruk støtte for balanse og jobb gjennom et kontrollert bevegelsesutslag.\n\nØk belastning gradvis når repetisjonene blir lette.",
        tip: "Ikke hast gjennom tåhevene."
      },
      {
        tag: "Avslutning",
        title: "Hopp + akselerasjon",
        dose: "3 repetisjoner",
        cue: "Eksplosivt hopp og 5–8 meter rask akselerasjon.",
        info: "Ett godt hopp etterfulgt av en kort eksplosiv akselerasjon. Ta full pause mellom hver repetisjon.\n\nHvis beina føles tunge, dropp denne siste delen – kvalitet er viktigere enn å fullføre alt.",
        tip: "Fullfør med overskudd, ikke med syre."
      }
    ]
  }
};

let activeProgram = null;
let index = 0;
let finished = false;

function showMenu() {
  activeProgram = null;
  index = 0;
  finished = false;
  workoutScreen.classList.remove("active");
  menuScreen.classList.add("active");
  infoModal.classList.remove("show");
  infoModal.setAttribute("aria-hidden", "true");
  window.scrollTo(0, 0);
}

function startProgram(key) {
  activeProgram = programs[key];
  if (!activeProgram) return;
  index = 0;
  finished = false;
  menuScreen.classList.remove("active");
  workoutScreen.classList.add("active");
  exerciseCard.classList.remove("finished");
  render();
  window.scrollTo(0, 0);
}

function render() {
  if (!activeProgram) return;

  if (finished) {
    programName.textContent = activeProgram.name;
    progress.textContent = "Ferdig";
    progressBar.style.width = "100%";
    exerciseTag.textContent = "Økt fullført";
    exerciseTitle.textContent = "Bra. Stopp mens kvaliteten er god.";
    exerciseDose.textContent = "Neste harde økt bør gjøres med friske bein.";
    exerciseCue.textContent = "Du trenger ikke gjøre ekstraarbeid hver dag. Lagtrening, kamp, søvn og restitusjon teller også.";
    qualityTip.textContent = "Ved tydelig muskel- eller leddsmerte: bruk rehabdelen i stedet for å presse gjennom.";
    nextExercise.textContent = "TILBAKE TIL MENY";
    exerciseCard.classList.add("finished");
    return;
  }

  const item = activeProgram.items[index];
  exerciseCard.classList.remove("finished");
  programName.textContent = activeProgram.name;
  progress.textContent = `${index + 1} / ${activeProgram.items.length}`;
  progressBar.style.width = `${((index + 1) / activeProgram.items.length) * 100}%`;
  exerciseTag.textContent = item.tag;
  exerciseTitle.textContent = item.title;
  exerciseDose.textContent = item.dose;
  exerciseCue.textContent = item.cue;
  qualityTip.textContent = item.tip || "";
  nextExercise.textContent = index === activeProgram.items.length - 1 ? "FULLFØR" : "NESTE";
}

function next() {
  if (!activeProgram) return;
  if (finished) return showMenu();
  if (index < activeProgram.items.length - 1) {
    index += 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  finished = true;
  render();
}

function showInfo() {
  if (!activeProgram || finished) return;
  const item = activeProgram.items[index];
  modalTitle.textContent = item.title;
  modalText.textContent = item.info;
  infoModal.classList.add("show");
  infoModal.setAttribute("aria-hidden", "false");
}

function closeInfo() {
  infoModal.classList.remove("show");
  infoModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-program]").forEach(btn => {
  btn.addEventListener("click", () => startProgram(btn.dataset.program));
});

nextExercise.addEventListener("click", next);
closeWorkout.addEventListener("click", showMenu);
resetWorkout.addEventListener("click", () => {
  if (!activeProgram) return;
  index = 0;
  finished = false;
  render();
});
exerciseCard.addEventListener("click", showInfo);
exerciseCard.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    showInfo();
  }
});
closeModal.addEventListener("click", closeInfo);
infoModal.addEventListener("click", e => {
  if (e.target === infoModal) closeInfo();
});