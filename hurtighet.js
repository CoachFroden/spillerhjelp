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

function ex(t, d, guide, r = false) { return { t, d, guide, r }; }

const exercises = [
  ex("Før du starter", "Ca. 15 min · friske bein · god plass", [
    "Finn et flatt område med god plass foran deg.",
    "Bruk sko som sitter godt og et underlag som ikke er glatt.",
    "Ikke gjør raske sprinter hvis du har smerter eller halter.",
    "Hvil godt mellom de raske dragene."
  ]),
  ex("Kneløft + spark bak", "2 × 15 m", [
    "Start med rolig jogg fremover.",
    "Løft knærne annenhver gang mens armene jobber som i løping.",
    "På vei tilbake: før hælene rolig opp mot rumpa.",
    "Første runde rolig, andre runde litt raskere."
  ]),
  ex("Utfall + sideutfall", "6 per side", [
    "Ta et steg frem og bøy begge knær.",
    "Press deg tilbake til start.",
    "Ta så et steg ut til siden og bøy kneet på den siden.",
    "Skyv deg tilbake til start og bytt side.",
    "Gjør alt rolig. Dette er oppvarming."
  ]),
  ex("Løp litt raskere", "3 × 20 m · ca. 60 → 70 → 80 %", [
    "Start første drag i rolig fart.",
    "Løp hele 20 meter uten å spurte maks.",
    "Gå rolig tilbake og hvil.",
    "Løp litt raskere på drag to og tre."
  ]),
  ex("Fallstart", "3 × 10 m", [
    "Stå rett opp med føttene omtrent i hoftebredde.",
    "Len hele kroppen rolig fremover uten å bøye deg i hofta.",
    "Når du kjenner at du må ta et steg for ikke å falle, starter du.",
    "Sprint 10 meter med raske, kraftige første steg.",
    "Gå tilbake og hvil før neste start."
  ]),
  ex("Kort akselerasjon", "4 × 10 m", [
    "Stå klar med én fot litt foran den andre.",
    "Skyv hardt fra bakken når du starter.",
    "Ta raske og kraftige første steg.",
    "Løp 10 meter og brems rolig etter mål.",
    "Gå tilbake og hvil godt før neste drag."
  ]),
  ex("Reaksjonsstart", "4 starter på tilfeldig pip", [
    "Trykk på START REAKSJON.",
    "Stå klar og se fremover.",
    "Vent helt til du hører pipet.",
    "Når det piper: sprint 5–10 meter så raskt du kan.",
    "Gå tilbake og hvil før du prøver igjen."
  ], true),
  ex("Lengre akselerasjon", "3 × 15–20 m · opp mot 90–95 %", [
    "Stå klar med god plass foran deg.",
    "Start kontrollert og øk farten gjennom de første meterne.",
    "Fortsett å øke til du er nær toppfart.",
    "Brems rolig etter mål.",
    "Ta god pause mellom dragene."
  ]),
  ex("Sidesteg + sprint", "3 per side", [
    "Stå med knærne litt bøyd.",
    "Ta 2–3 raske sidesteg.",
    "Snu kroppen fremover.",
    "Sprint 8–10 meter rett frem.",
    "Gjør like mange starter begge veier."
  ]),
  ex("Sprint + brems", "4 drag · 10 m sprint + stopp", [
    "Sprint omtrent 10 meter frem.",
    "Begynn å bremse før du skal stoppe.",
    "Ta flere korte steg mens du senker farten.",
    "Stopp med god balanse.",
    "Ikke prøv å stoppe alt på ett langt steg."
  ]),
  ex("Små raske hopp", "2 × 12", [
    "Stå med føttene omtrent i hoftebredde.",
    "Hold kroppen ganske høy og knærne bare litt bøyd.",
    "Gjør små raske hopp rett opp.",
    "Prøv å være kort tid i bakken mellom hvert hopp.",
    "Stopp hvis legg, hæl eller Akilles begynner å gjøre vondt."
  ]),
  ex("Lengdehopp", "3 gode hopp", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knærne og før armene bakover.",
    "Sving armene frem og hopp så langt frem du klarer.",
    "Land på begge beina med myke knær.",
    "Finn balansen før neste hopp."
  ]),
  ex("Hopp + sprint", "3 repetisjoner", [
    "Stå klar med god plass foran deg.",
    "Gjør ett kraftig hopp rett opp.",
    "Land på begge beina med myke knær.",
    "Sprint direkte 8–10 meter frem.",
    "Gå tilbake og hvil godt før neste repetisjon."
  ]),
  ex("Ferdig", "Bra. Økta er ferdig.", [])
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
  const current = exercises[index];
  if (title) title.innerText = current.t;
  if (desc) desc.innerText = current.d;
  if (step) step.innerText = `${index + 1} av ${exercises.length}`;
  if (tip) tip.innerText = "";

  if (reaction) {
    reaction.classList.toggle("hidden", !current.r);
    if (!current.r) clearReactionTimer();
  }

  if (hint) {
    if (current.guide?.length) {
      hint.classList.remove("hidden");
      hint.innerText = "TRYKK PÅ KORTET FOR FORKLARING";
    } else {
      hint.classList.add("hidden");
    }
  }

  if (next) next.innerText = index === exercises.length - 1 ? "TILBAKE" : "NESTE";
}

startBtn.onclick = async () => {
  index = 0;
  clearReactionTimer();
  startScreen.classList.remove("active");
  workoutScreen.classList.add("active");
  await unlockAudio();
  exerciseBox?.classList.remove("hidden");
  show();
};

next.onclick = () => {
  modal?.classList.add("hidden");
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
  modal?.classList.add("hidden");
  workoutScreen.classList.remove("active");
  startScreen.classList.add("active");
});

function showGuide() {
  const current = exercises[index];
  if (!current?.guide?.length || !modal || !modalText) return;
  modalText.style.whiteSpace = "pre-line";
  modalText.innerText = `${current.t.toUpperCase()}\n\n${current.d}\n\nSLIK GJØR DU\n\n${current.guide.map((text, i) => `${i + 1}. ${text}`).join("\n\n")}`;
  modal.classList.remove("hidden");
}

exerciseBox?.addEventListener("click", showGuide);
exerciseBox?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showGuide();
  }
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