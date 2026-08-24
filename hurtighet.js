const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start");
const workoutScreen = document.getElementById("workout");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const next = document.getElementById("next");
const reaction = document.getElementById("reaction");
const tip = document.getElementById("tip");
const step = document.getElementById("step");
const exerciseBox = document.getElementById("exerciseBox");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const hint = document.getElementById("hint");

let index = 0;
let reactionBusy = false;
let reactionTimer = null;
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  return audioContext;
}

async function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return false;
  if (ctx.state === "suspended") {
    try { await ctx.resume(); } catch (_) { return false; }
  }
  return ctx.state === "running";
}

function playReactionBeep() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1050, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.75, now + 0.01);
  gain.gain.setValueAtTime(0.75, now + 0.16);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.25);
}

const exercises = [
  { t: "Før du starter", d: "Ca. 15 min · friske bein · god plass", i: "Hurtighet skal trenes med kvalitet. Ikke gjør maks sprint hvis du har smerter, halter eller er tydelig sliten etter annen hard trening." },
  { t: "Dynamisk oppvarming", d: "Kneløft + spark bak · 2 x 15 m", i: "Rolig første runde, litt raskere andre runde. Bruk armene aktivt og finn rytmen." },
  { t: "Bevegelse", d: "Utfall + sideutfall · 6 per side", i: "Kontroller bevegelsen. Dette er oppvarming, ikke en styrketest." },
  { t: "Progressive løp", d: "3 x 20 m · ca. 60 → 70 → 80 %", i: "Øk farten gradvis. Gå rolig tilbake mellom dragene." },
  { t: "Fallstart", d: "3 x 10 m", i: "Len kroppen frem til du må ta et steg og akselerer. Tenk kraftige første steg og lav kroppsvinkel." },
  { t: "Akselerasjon", d: "4 x 10 m · høy kvalitet", i: "Start stående. Sprint hardt, men ta god pause mellom dragene. Når farten faller, er økta ferdig nok." },
  { t: "Reaksjon", d: "4 starter på tilfeldig pip", r: true, i: "Trykk START REAKSJON, stå klar og vent på signalet. Sprint 5–10 meter. Hvil før neste repetisjon." },
  { t: "Lengre akselerasjon", d: "3 x 15–20 m · opp mot 90–95 %", i: "Bygg farten gjennom draget. Ikke jag toppfart hvis teknikken eller steget blir dårlig." },
  { t: "Side → sprint", d: "3 per side", i: "Ta 2–3 raske sidesteg og akselerer 8–10 meter frem. Hold kontroll på fot og kne i retningsskiftet." },
  { t: "Brems", d: "4 drag · 10 m sprint + kontrollert stopp", i: "Akselerer og brems ned over flere korte steg. Ikke plant ett stivt bein langt foran kroppen." },
  { t: "Pogo", d: "2 x 12 små raske hopp", i: "Små elastiske hopp med kort bakkekontakt. Stopp hvis legg, hæl eller Akilles blir irritert." },
  { t: "Lengdehopp", d: "3 gode hopp", i: "Hopp eksplosivt frem og land stabilt. Full kontroll er viktigere enn maksimal lengde." },
  { t: "Hopp + sprint", d: "3 repetisjoner", i: "Ett kontrollert hopp, stabil landing og direkte akselerasjon 8–10 meter. Ta god pause." },
  { t: "Ferdig", d: "Stopp mens kvaliteten fortsatt er god", i: "Hurtighet utvikles av raske, gode repetisjoner med nok hvile – ikke ved å gjøre flest mulig drag på slitne bein." }
];

const tips = [
  "Kvalitet før mengde",
  "Ta god pause mellom raske drag",
  "Første steg: kraftig og bestemt",
  "Stopp hvis farten tydelig faller"
];

function clearReactionTimer() {
  if (reactionTimer) clearTimeout(reactionTimer);
  reactionTimer = null;
  reactionBusy = false;
  if (reaction) {
    reaction.disabled = false;
    reaction.innerText = "START REAKSJON";
  }
}

function show() {
  const ex = exercises[index];
  if (title) title.innerText = ex.t;
  if (desc) desc.innerText = ex.d;
  if (step) step.innerText = `Øvelse ${index + 1} av ${exercises.length}`;
  if (tip) tip.innerText = tips[index % tips.length];

  if (reaction) {
    reaction.classList.toggle("hidden", !ex.r);
    if (!ex.r) clearReactionTimer();
  }

  if (next) {
    next.innerText = index === exercises.length - 1 ? "AVSLUTT ØKT" : "NESTE";
  }
}

startBtn.onclick = async () => {
  index = 0;
  clearReactionTimer();
  startScreen.classList.remove("active");
  workoutScreen.classList.add("active");
  await unlockAudio();
  exerciseBox?.classList.remove("hidden");
  hint?.classList.remove("hidden");
  show();
};

next.onclick = () => {
  if (index >= exercises.length - 1) {
    clearReactionTimer();
    workoutScreen.classList.remove("active");
    startScreen.classList.add("active");
    index = 0;
    return;
  }
  index++;
  show();
};

if (reaction) {
  reaction.onclick = async () => {
    if (reactionBusy) return;

    const audioReady = await unlockAudio();
    if (!audioReady) {
      reaction.innerText = "LYD BLOKKERT – PRØV IGJEN";
      setTimeout(() => { reaction.innerText = "START REAKSJON"; }, 1600);
      return;
    }

    reactionBusy = true;
    reaction.disabled = true;
    reaction.innerText = "VENT …";

    const delay = Math.random() * 2500 + 1500;
    reactionTimer = setTimeout(() => {
      playReactionBeep();
      reaction.innerText = "SPRINT!";

      setTimeout(() => {
        reactionBusy = false;
        reaction.disabled = false;
        reaction.innerText = "START REAKSJON";
      }, 1200);
    }, delay);
  };
}

const backBtn = document.getElementById("backBtn");
backBtn?.addEventListener("click", () => {
  clearReactionTimer();
  workoutScreen.classList.remove("active");
  startScreen.classList.add("active");
});

exerciseBox?.addEventListener("click", () => {
  const ex = exercises[index];
  if (!ex.i || !modal || !modalText) return;
  modalText.innerText = ex.i;
  modal.classList.remove("hidden");
});

modal?.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

const resetBtn = document.getElementById("resetBtn");
resetBtn?.addEventListener("click", () => {
  index = 0;
  clearReactionTimer();
  modal?.classList.add("hidden");
  show();
});

const homeBack = document.getElementById("homeBack");
homeBack?.addEventListener("click", () => {
  clearReactionTimer();
  window.location.href = "index.html";
});