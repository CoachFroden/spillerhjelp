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
visualBox.style.display = "none";

const visualScreen = document.getElementById("visual");
const vTitle = document.getElementById("vTitle");
const vText = document.getElementById("vText");
const vNext = document.getElementById("vNext");
const vProgress = document.getElementById("vProgress");
const backFromVisual = document.getElementById("backFromVisual");

let vIndex = 0;

let index = 0;

const tasks = [
  {
    time: "Når du våkner",
    title: "Start rolig",
    desc: "Stå opp i god tid. Ikke stress fra start."
  },
  {
    time: "Fra morgenen",
    title: "Drikk vann jevnlig",
    desc: "Start tidlig og ta små slurker gjennom dagen. Ikke vent til du er tørst."
  },
  {
    time: "2–3 timer før",
    title: "Spis måltid",
    desc: "Mat som gir energi: pasta, ris eller brød."
  },
  {
    time: "Før du drar",
    title: "Pakk bag",
    desc: "Sko, leggskinn, drakt, vannflaske."
  },
  {
    time: "På vei",
    title: "Hold hodet rolig",
    desc: "Ikke overtenk. Du er klar."
  },
  {
    time: "Når du kommer",
    title: "Vær på",
    desc: "Følg med og gjør deg klar til oppvarming."
  },
  {
    time: "Rett før",
    title: "Gi alt",
    desc: "Full innsats. Det er det som teller."
  }
];

const visualSteps = [
  {
    title: "Visualisering",
    text: "Dette hjelper deg å bli klar før kamp. Følg stegene – tar ca 1 minutt."
  },
  {
    title: "Rolig",
    text: "Lukk øynene. Ta 3 rolige pust."
  },
  {
    title: "Se banen",
    text: "Se for deg banen og kampen."
  },
  {
    title: "Første touch",
    text: "Se første balltouch – rolig og kontrollert."
  },
  {
    title: "Bevegelse",
    text: "Se deg selv bevege deg riktig og raskt."
  },
  {
    title: "Lykkes",
    text: "Se deg selv lykkes i en situasjon."
  },
  {
    title: "Klar",
    text: "Kjenn at du er klar. Du tør."
  }
];

startBtn.onclick = () => {
  index = 0;
  vIndex = 0;

  visualBox.style.display = "none";
  doneBtn.style.display = "block";

  vNext.style.display = "block";
  vNext.innerText = "NESTE";

  startScreen.classList.remove("active");
  checklistScreen.classList.add("active");

  showTask();
};

backBtn.onclick = () => {
  window.location.href = "kampmeny.html";
};

doneBtn.onclick = () => {
  index++;

  if (index < tasks.length) {
    showTask();
  } else {
    // ✅ IKKE åpne visual automatisk
    taskTitle.innerText = "KAMPKLAR";
    taskDesc.innerText = "Du er klar 💪";
    time.innerText = "";

    doneBtn.style.display = "none";

    tip.innerText = "Valgfritt: ta 1 min visualisering 🎯";
    progress.innerText = tasks.length + " / " + tasks.length;

    // 👉 vis visual-knapp
    visualBox.style.display = "block";
  }
};

visualBox.onclick = () => {
  checklistScreen.classList.remove("active");
  visualScreen.classList.add("active");
  showVisual();
};

function showTask() {
  const task = tasks[index];

  time.innerText = task.time;
  taskTitle.innerText = task.title;
  taskDesc.innerText = task.desc;

  progress.innerText = (index + 1) + " / " + tasks.length;

  tip.innerText = "Husk: drikk litt vann jevnlig 💧";

  if (index === 1) {
    tip.innerText = "Start nå → ta noen slurker 💧";
  }

  if (index === tasks.length - 1) {
    tip.innerText = "Neste: gjør deg klar i hodet 🎯";
  }
}

function showVisual() {
  const step = visualSteps[vIndex];

  vTitle.innerText = step.title;
  vText.innerText = step.text;
  vProgress.innerText = (vIndex + 1) + " / " + visualSteps.length;
}

vNext.onclick = () => {
  vIndex++;

  if (vIndex < visualSteps.length) {
    showVisual();
  } else if (vIndex === visualSteps.length) {
    vTitle.innerText = "KAMPKLAR";
    vText.innerText = "Du er klar 💪";

    vNext.innerText = "FERDIG";
    vProgress.innerText = visualSteps.length + " / " + visualSteps.length;
  } else {
    // ferdig → tilbake til start
    window.location.href = "kampklar.html";
  }
};

backFromVisual.onclick = () => {
  visualScreen.classList.remove("active");
  checklistScreen.classList.add("active");

  vIndex = 0;

  vNext.style.display = "block";
  vNext.innerText = "NESTE";

  showVisual(); // reset første steg visuelt
};