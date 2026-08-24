const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start");
const checklistScreen = document.getElementById("checklist");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const time = document.getElementById("time");
const doneBtn = document.getElementById("doneBtn");
const progress = document.getElementById("progress");
const backBtn = document.getElementById("backBtn");
const tip = document.getElementById("tip");
const visualBox = document.getElementById("visualBox");
const visualScreen = document.getElementById("visual");
const vTitle = document.getElementById("vTitle");
const vText = document.getElementById("vText");
const vNext = document.getElementById("vNext");
const vProgress = document.getElementById("vProgress");
const backFromVisual = document.getElementById("backFromVisual");

let index = 0;
let vIndex = 0;
visualBox.style.display = "none";

const tasks = [
  { time: "Når du våkner", title: "Start dagen normalt", desc: "Stå opp i god tid. Spis og drikk som på en vanlig dag – kampdag trenger ikke være komplisert." },
  { time: "Gjennom dagen", title: "Drikk jevnlig", desc: "Ta vann til måltider og små slurker gjennom dagen. Unngå å prøve å ta igjen all væske rett før kamp." },
  { time: "Ca. 2–4 timer før", title: "Spis et kjent måltid", desc: "Velg mat du vet magen tåler, med godt med karbohydrat og et normalt måltid. Ikke eksperimenter på kampdag." },
  { time: "Ca. 60–90 min før", title: "Liten påfylling ved behov", desc: "Er du sulten, ta noe lett og kjent. Du skal møte til oppvarming med energi – ikke med tung mage." },
  { time: "Før du drar", title: "Sjekk utstyret", desc: "Sko, leggskinn, drakt, vannflaske og annet du trenger. Gjør det ferdig før du må skynde deg." },
  { time: "Når du kommer", title: "Vær til stede", desc: "Finn garderoben, hør på beskjeder og gå inn i oppvarmingen med fokus. La mobilen ligge når laget starter forberedelsene." },
  { time: "Rett før avspark", title: "Velg ett fokus", desc: "Tenk på én enkel oppgave i starten av kampen: orienter deg, vinn første duell, spill enkelt eller vær aggressiv i presset." }
];

const visualSteps = [
  { title: "Visualisering", text: "Bruk rundt ett minutt. Se for deg noen få situasjoner du sannsynligvis møter i kampen." },
  { title: "Ro", text: "Ta tre rolige pust og senk skuldrene." },
  { title: "Orientering", text: "Se for deg at du sjekker rundt deg før ballen kommer." },
  { title: "Første touch", text: "Se en enkel, kontrollert førsteberøring og et godt neste valg." },
  { title: "Uten ball", text: "Se deg selv bevege deg tidlig, presse med fart og komme raskt på plass igjen." },
  { title: "Motgang", text: "Se for deg at du gjør en feil – og er rett på neste aksjon uten å henge med hodet." },
  { title: "Klar", text: "Velg ett fokus for de første fem minuttene. Nå er du ferdig." }
];

startBtn.onclick = () => {
  index = 0;
  vIndex = 0;
  visualBox.style.display = "none";
  doneBtn.style.display = "block";
  doneBtn.innerText = "FERDIG · NESTE";
  vNext.style.display = "block";
  vNext.innerText = "NESTE";
  startScreen.classList.remove("active");
  checklistScreen.classList.add("active");
  showTask();
};

backBtn.onclick = () => {
  window.location.href = "index.html";
};

doneBtn.onclick = () => {
  index++;
  if (index < tasks.length) {
    showTask();
    return;
  }

  taskTitle.innerText = "RUTINEN ER FERDIG";
  taskDesc.innerText = "Du har gjort det viktigste. Nå trenger du ikke fylle hodet med mer.";
  time.innerText = "KAMPKLAR";
  doneBtn.style.display = "none";
  tip.innerText = "Valgfritt: bruk ett minutt på visualisering.";
  progress.innerText = `${tasks.length} / ${tasks.length}`;
  visualBox.style.display = "block";
};

visualBox.onclick = () => {
  checklistScreen.classList.remove("active");
  visualScreen.classList.add("active");
  vIndex = 0;
  vNext.innerText = "NESTE";
  showVisual();
};

function showTask() {
  const task = tasks[index];
  time.innerText = task.time;
  taskTitle.innerText = task.title;
  taskDesc.innerText = task.desc;
  progress.innerText = `${index + 1} / ${tasks.length}`;
  tip.innerText = index === tasks.length - 1
    ? "Hold fokuset enkelt. Du trenger ikke spille kampen i hodet før den starter."
    : "Trykk ferdig når dette punktet er under kontroll.";
}

function showVisual() {
  const step = visualSteps[vIndex];
  vTitle.innerText = step.title;
  vText.innerText = step.text;
  vProgress.innerText = `${vIndex + 1} / ${visualSteps.length}`;
}

vNext.onclick = () => {
  vIndex++;
  if (vIndex < visualSteps.length) {
    showVisual();
  } else if (vIndex === visualSteps.length) {
    vTitle.innerText = "FERDIG";
    vText.innerText = "Ta med deg det ene fokuset ditt ut på banen.";
    vNext.innerText = "TIL FORSIDEN";
    vProgress.innerText = `${visualSteps.length} / ${visualSteps.length}`;
  } else {
    window.location.href = "index.html";
  }
};

backFromVisual.onclick = () => {
  visualScreen.classList.remove("active");
  checklistScreen.classList.add("active");
  vIndex = 0;
  vNext.innerText = "NESTE";
};
