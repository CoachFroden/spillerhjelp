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
const tapHint = exerciseCard?.querySelector(".tap-hint");

if (modalText) modalText.style.whiteSpace = "pre-line";

function item(tag, title, dose, guide) {
  return { tag, title, dose, guide };
}

const commonWarmup = item("Oppvarming", "Gjør kroppen klar", "3–4 minutter", [
  "Start med rolig jogg på stedet i 30–45 sekunder.",
  "Gjør kneløft i 20–30 sekunder.",
  "Gjør spark bak i 20–30 sekunder.",
  "Ta noen rolige utfall fremover.",
  "Avslutt med noen små lette hopp. Du skal bli varm, ikke sliten."
]);

const strengthItems = {
  split: item("Bein", "Utfall på stedet", "3 × 8 per bein", [
    "Stå med én fot foran og én fot bak.",
    "Hold føttene på samme sted hele tiden.",
    "Bøy begge knær og senk kroppen rett ned.",
    "Press deg opp igjen gjennom den fremste foten.",
    "Gjør alle repetisjonene og bytt deretter bein."
  ]),
  hip: item("Bakside", "Ettbeins hoftebøy", "3 × 8 per bein", [
    "Stå på ett bein. Hold i en vegg eller stol hvis du trenger balanse.",
    "Bøy kneet du står på litt.",
    "Skyv rumpa bakover mens overkroppen går frem.",
    "La det andre beinet gå bak deg.",
    "Reis deg rolig opp igjen. Hold ryggen rett."
  ]),
  calf: item("Legg", "Stå på tå på ett bein", "3 × 12 per bein", [
    "Stå ved en vegg eller stol.",
    "Stå på ett bein og hold lett med hånden hvis du trenger balanse.",
    "Løft hælen så høyt du kan.",
    "Senk hælen rolig ned til gulvet.",
    "Gjør alle repetisjonene og bytt bein."
  ]),
  push: item("Overkropp", "Armhevinger", "3 × 8–15", [
    "Sett hendene i gulvet litt bredere enn skuldrene.",
    "Strekk beina bak deg og hold kroppen rett.",
    "Bøy albuene og senk brystet rolig mot gulvet.",
    "Press deg opp igjen uten at hofta synker.",
    "Blir det for tungt, sett hendene på en benk eller stol i stedet."
  ]),
  groin: item("Lyske", "Sideplanke med kne på stol", "2 × 6–8 per side", [
    "Ligg på siden ved en lav stol eller benk.",
    "Legg kneet på det øverste beinet oppå stolen.",
    "Støtt overkroppen på albuen.",
    "Løft hofta opp fra gulvet.",
    "Senk rolig ned igjen. Bytt side når du er ferdig."
  ]),
  sideplank: item("Mage / side", "Sideplanke", "2 × 25–35 sek per side", [
    "Ligg på siden og støtt deg på albuen.",
    "Ha beina strake og føttene oppå hverandre.",
    "Løft hofta opp fra gulvet.",
    "Hold kroppen så rett som mulig mens tiden går.",
    "Blir det for tungt, bøy knærne og støtt på kneet."
  ]),
  pogo: item("Spenst", "Små raske hopp", "3 × 15", [
    "Stå med føttene omtrent i hoftebredde.",
    "Hold kroppen ganske høy og knærne bare litt bøyd.",
    "Gjør små raske hopp rett opp.",
    "Prøv å være kort tid i gulvet mellom hvert hopp.",
    "Stopp hvis hoppene blir tunge eller du får smerte."
  ]),
  up: item("Spenst", "Hopp rett opp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knær og hofter og før armene bakover.",
    "Sving armene frem og hopp så høyt du kan.",
    "Land på begge beina med myke knær.",
    "Finn balansen og ta en kort pause før neste hopp."
  ]),
  broad: item("Spenst", "Lengdehopp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knærne og før armene bakover.",
    "Sving armene frem og hopp så langt frem du klarer.",
    "Land på begge beina med myke knær.",
    "Stå stille et øyeblikk før neste hopp."
  ]),
  onelegjump: item("Spenst", "Hopp frem på ett bein", "2 × 4 per bein", [
    "Stå på ett bein.",
    "Bøy kneet litt.",
    "Hopp kontrollert fremover.",
    "Land på samme bein med kneet litt bøyd.",
    "Finn balansen før neste hopp. Start med korte hopp."
  ]),
  sidejump: item("Spenst", "Hopp side til side", "2 × 5 per side", [
    "Stå på ett bein.",
    "Hopp kontrollert sidelengs og land på det andre beinet.",
    "Bøy kneet litt når du lander.",
    "Finn balansen før du hopper tilbake.",
    "Start med korte hopp og øk bare når du har kontroll."
  ]),
  jumpsprint: item("Spenst + fart", "Hopp + kort sprint", "4 repetisjoner", [
    "Stå klar med god plass foran deg.",
    "Gjør ett kraftig hopp rett opp.",
    "Land på begge beina med myke knær.",
    "Sprint direkte 5–8 meter frem.",
    "Gå rolig tilbake og hvil 60–90 sekunder før neste gang."
  ])
};

const programs = {
  strength: {
    name: "Fotballstyrke",
    items: [commonWarmup, strengthItems.split, strengthItems.hip, strengthItems.calf, strengthItems.push, strengthItems.groin, strengthItems.sideplank]
  },
  jump: {
    name: "Spenst",
    items: [commonWarmup, strengthItems.pogo, strengthItems.up, strengthItems.broad, strengthItems.onelegjump, strengthItems.sidejump, strengthItems.jumpsprint]
  },
  combo: {
    name: "Kombi",
    items: [
      commonWarmup,
      item("Styrke", "Utfall på stedet", "2 × 6 per bein", strengthItems.split.guide),
      item("Spenst", "Hopp rett opp", "3 × 3", strengthItems.up.guide),
      item("Bakside", "Ettbeins hoftebøy", "2 × 8 per bein", strengthItems.hip.guide),
      item("Spenst", "Små raske hopp", "3 × 12", strengthItems.pogo.guide),
      item("Legg", "Stå på tå på ett bein", "2 × 12 per bein", strengthItems.calf.guide),
      item("Spenst + fart", "Hopp + kort sprint", "3 repetisjoner", strengthItems.jumpsprint.guide)
    ]
  }
};

let activeProgram = null;
let index = 0;
let finished = false;

function closeInfo() {
  infoModal.classList.remove("show");
  infoModal.setAttribute("aria-hidden", "true");
}

function showMenu() {
  activeProgram = null;
  index = 0;
  finished = false;
  closeInfo();
  workoutScreen.classList.remove("active");
  menuScreen.classList.add("active");
  window.scrollTo(0, 0);
}

function startProgram(key) {
  activeProgram = programs[key];
  if (!activeProgram) return;
  index = 0;
  finished = false;
  closeInfo();
  menuScreen.classList.remove("active");
  workoutScreen.classList.add("active");
  render();
  window.scrollTo(0, 0);
}

function render() {
  if (!activeProgram) return;
  closeInfo();

  if (finished) {
    programName.textContent = activeProgram.name;
    progress.textContent = "Ferdig";
    progressBar.style.width = "100%";
    exerciseTag.textContent = "ØKT FULLFØRT";
    exerciseTitle.textContent = "FERDIG ✓";
    exerciseDose.textContent = "Bra. Du er ferdig.";
    exerciseCue.textContent = "";
    qualityTip.textContent = "";
    if (tapHint) tapHint.style.display = "none";
    nextExercise.textContent = "TILBAKE TIL MENY";
    exerciseCard.classList.add("finished");
    return;
  }

  const current = activeProgram.items[index];
  exerciseCard.classList.remove("finished");
  programName.textContent = activeProgram.name;
  progress.textContent = `${index + 1} / ${activeProgram.items.length}`;
  progressBar.style.width = `${((index + 1) / activeProgram.items.length) * 100}%`;
  exerciseTag.textContent = current.tag;
  exerciseTitle.textContent = current.title;
  exerciseDose.textContent = current.dose;
  exerciseCue.textContent = "";
  qualityTip.textContent = "";
  if (tapHint) {
    tapHint.style.display = "block";
    tapHint.textContent = "Trykk på kortet for forklaring";
  }
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
  const current = activeProgram.items[index];
  if (!current?.guide?.length) return;
  modalTitle.textContent = current.title;
  modalText.textContent = `${current.dose}\n\nSLIK GJØR DU\n\n${current.guide.map((text, i) => `${i + 1}. ${text}`).join("\n\n")}`;
  infoModal.classList.add("show");
  infoModal.setAttribute("aria-hidden", "false");
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