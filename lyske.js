"use strict";

/* ELEMENTER */
const startScreen = document.getElementById("start");
const workoutScreen = document.getElementById("workout");

const title = document.getElementById("title");
const desc = document.getElementById("desc");
const step = document.getElementById("step");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");

const nextBtn = document.getElementById("next");
const exerciseBox = document.getElementById("exerciseBox");
const backBtn = document.getElementById("backBtn");
const homeBack = document.getElementById("homeBack");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const levelBig = document.getElementById("levelBig");
const levelSmall = document.getElementById("levelSmall");
const progressWrap = document.querySelector(".progressWrap");
const levelHeader = document.getElementById("levelHeader");

const tipEl = document.getElementById("tip");

/* STATE */
let exercises = [];
let i = 0;
let currentLevel = "";

/* TEST STATE */
let mode = "menu";
let testStep = 0;
let answers = [];
let recommendedLevel = "pain";
let inGameTest = false;
let gameAnswers = [];
let isTestWorkout = false;

/* TEST FLOW */
const testFlow = [
  {
    t: "Smerte",
    d: "Kan du gå og stå uten smerte i lysken?",
    i: "Dette tester om lysken fortsatt er irritert i vanlige situasjoner. Før du går videre til øvelser og løping, må du kjenne etter om du har vondt når du står, går rolig eller løfter beinet litt. Reis deg opp, gå noen rolige steg og kjenn etter. Hvis du kjenner smerte, stikking, murring eller at du beskytter området, er du ikke klar for å gå videre."
  },
  {
    t: "Aktivering",
    d: "Kan du klemme en ball eller pute mellom knærne 10 ganger uten smerte?",
    i: "Ligg på ryggen med bøyde knær og sett en ball, pute eller sammenrullet genser mellom knærne. Klem rolig sammen i 3–4 sekunder og slapp av. Gjør dette 10 ganger. Dette tester om lyskemusklene tåler lett aktivering. Du skal kjenne arbeid på innsiden av lårene, men ikke skarp smerte eller utrygghet."
  },
  {
    t: "Kontroll",
    d: "Kan du gjøre 20 sideforflytninger rolig uten smerte?",
    i: "Stå i lett bøy i knærne og ta små steg sideveis, først én vei og så tilbake. Hold kroppen stabil og rolig. Dette tester om lysken tåler kontrollert sidebevegelse. Du skal ikke kjenne smerte, drag eller at du holder igjen."
  },
  {
    t: "Jogging",
    d: "Kan du jogge 2–3 minutter uten smerte eller halting?",
    i: "Jogge rolig i jevnt tempo. Dette skal være lett jogging, ikke sprint. Målet er å sjekke om lysken tåler jevn bevegelse over litt tid. Hvis du kjenner smerte, halter, eller blir usikker når du løper, er du ikke klar for neste steg."
  },
  {
    t: "Retning",
    d: "Kan du gjøre 5 rolige vendinger uten smerte?",
    i: "Løp noen meter frem, brems rolig, snu kroppen og løp tilbake. Dette tester om lysken tåler bremsing, vending og nytt fraspark. Lysken blir ofte utfordret når du skifter retning. Du skal kunne vende uten smerte eller frykt."
  },
  {
    t: "Sprint",
    d: "Kan du løpe 2–3 raske drag uten smerte eller frykt?",
    i: "Løp to til tre korte drag der du bygger opp til høy fart. Ikke gå rett på maks i første drag. Du skal kunne løpe naturlig uten å beskytte lysken, uten smerte og uten at steget føles låst."
  },
  {
    t: "Spark",
    d: "Kan du slå 5 kontrollerte spark uten smerte i lysken?",
    i: "Bruk en ball hvis du har, eller gjør en kontrollert sparkebevegelse uten ball. Dette tester om lysken tåler den typen bevegelse som ofte provoserer området i fotball. Du skal ikke kjenne smerte, napp eller frykt når du fører beinet frem."
  }
];

const data = {
  pain: [
    {
      t: "Klar?",
      d: "Start rolig",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- fortsatt har vondt i lysken
- kjenner det når du går, vender eller løfter beinet
- ikke er klar for fart, spark eller sidebevegelser

MÅLET HER ER:
- å få i gang muskulaturen igjen
- å unngå at skaden blir verre
- å bygge kontroll før du gjør mer

VIKTIG:
- dette skal være rolig
- du skal ikke presse gjennom smerte
- hvis du er usikker, velg heller dette nivået enn et for tungt nivå`
    },

    {
      t: "Klem pute",
      d: "3 x 10 sek",
      i: `SLIK GJØR DU:
- Ligg på ryggen med knærne bøyd
- Sett en pute, ball eller sammenrullet genser mellom knærne
- Klem rolig sammen
- Hold i 10 sekunder
- Slapp helt av
- Gjenta 3 ganger

DETTE ER EN STATISK ØVELSE:
- musklene på innsiden av låret jobber uten mye bevegelse
- målet er å vekke lysken, ikke irritere den

DU SKAL KJENNE:
- et tydelig, men rolig arbeid på innsiden av lårene
- kontroll og trygghet

DU SKAL IKKE KJENNE:
- skarp smerte
- stikking
- at du spenner hele kroppen

STOPP HVIS:
- smerten øker
- du kjenner napp eller stikk
- du blir mer anspent for hver repetisjon`
    },

    {
      t: "Bent knee fallout",
      d: "3 x 8 per side",
      i: `SLIK GJØR DU:
- Ligg på ryggen med bøyde knær og føttene i gulvet
- La ett kne falle rolig litt ut til siden
- Gå bare så langt det føles trygt
- Før kneet rolig tilbake
- Bytt side

MÅLET MED ØVELSEN:
- å gi lysken rolig bevegelse
- å bygge kontroll i hofte og innside lår

DU SKAL KJENNE:
- rolig bevegelse
- lett arbeid, ikke smerte

DU SKAL IKKE KJENNE:
- skarp smerte
- at kneet faller ukontrollert ut
- at du må hjelpe til med overkroppen

TIPS:
- liten bevegelse er helt ok
- rolig tempo er viktigere enn å gå langt`
    },

    {
      t: "Stå på ett bein",
      d: "3 x 20 sek per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold kroppen høy og rolig
- Se på et punkt foran deg
- Hold 20 sekunder
- Bytt bein

MÅLET MED ØVELSEN:
- å bygge rolig kontroll rundt hofte og lyske
- å venne kroppen til belastning igjen

DU SKAL KJENNE:
- balansearbeid
- kontroll, ikke stress

DU SKAL IKKE KJENNE:
- smerte i lysken
- at hofta faller helt ut
- at du må hoppe rundt`
    },

    {
      t: "Rolig gange",
      d: "5 min",
      i: `SLIK GJØR DU:
- Gå i vanlig, rolig tempo
- Ta korte og naturlige steg
- Hold kroppen avslappet
- Gå i 5 minutter uten å teste mer

MÅLET:
- å få i gang sirkulasjonen
- å gjøre området mindre stivt
- å venne lysken til vanlig bevegelse igjen

STOPP HVIS:
- du begynner å halte
- smerten øker
- du kjenner at du beskytter området mer og mer`
    }
  ],

  better: [
    {
      t: "Klar?",
      d: "Føles litt bedre",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har mindre vondt enn før
- kan gå ganske normalt
- kan bevege deg uten mye smerte
- fortsatt ikke er klar for sprint, spark eller harde vendinger

MÅLET HER ER:
- å bygge mer kontroll
- å tåle litt mer bevegelse
- å gjøre lysken sterkere uten å provosere den`
    },

    {
      t: "Adductor squeeze",
      d: "3 x 8",
      i: `SLIK GJØR DU:
- Ligg på ryggen med knærne bøyd
- Ha en ball eller pute mellom knærne
- Klem sammen i 3 sekunder
- Slapp rolig av
- Gjør 8 repetisjoner

DU SKAL KJENNE:
- arbeid på innsiden av lårene
- kontrollert kraft uten smerte

VANLIGE FEIL:
- klemmer altfor hardt
- holder pusten
- blir stresset i hele kroppen`
    },

    {
      t: "Sideutfall kort",
      d: "3 x 6 per side",
      i: `SLIK GJØR DU:
- Stå med litt bred avstand mellom beina
- Flytt vekten rolig ut til én side
- Bøy kneet litt på den siden du går mot
- Hold det andre beinet mer strakt
- Skyv rolig tilbake til midten
- Bytt side

MÅLET:
- å gi lysken kontrollert strekk og belastning
- å forberede deg på sidebevegelser igjen

DU SKAL IKKE:
- gå for dypt
- skynde deg
- presse hvis det gjør vondt`
    },

    {
      t: "Marching",
      d: "3 x 20 steg",
      i: `SLIK GJØR DU:
- Stå oppreist
- Løft ett kne rolig opp
- Sett ned igjen
- Bytt side
- Fortsett annenhver side

MÅLET:
- å bygge kontroll i hofte og lyske
- å trene rytme og stabilitet

TIPS:
- kroppen skal være høy
- dette er kontroll, ikke fart`
    }
  ],

  almost: [
    {
      t: "Klar?",
      d: "Nesten klar",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- kan gå normalt
- tåler en del belastning
- føler deg bedre, men ikke er klar for full fart
- kan gjøre rolige øvelser uten smerte

MÅLET HER ER:
- å bygge styrke
- å forberede lysken på løping, vending og fotballbevegelse
- å komme nærmere vanlig trening igjen`
    },

    {
      t: "Copenhagen kort",
      d: "3 x 15 sek per side",
      i: `SLIK GJØR DU:
- Støtt deg på underarmen i sideplanke
- Ha øverste kne eller legg på en benk, sofa eller stol
- Løft hofta opp så kroppen blir stabil
- Hold i 15 sekunder
- Bytt side

MÅLET:
- å gjøre lysken sterkere
- å bygge styrke i den muskulaturen som ofte svikter ved lyskeplager

DU SKAL KJENNE:
- tydelig arbeid på innsiden av låret
- stabilitet i kroppen

STOPP HVIS:
- du kjenner skarp smerte
- du mister kontroll helt`
    },

    {
      t: "Side shuffle",
      d: "3 x 15 sek",
      i: `SLIK GJØR DU:
- Stå i lett knebøy
- Beveg deg sideveis med små, raske steg
- Hold brystet oppe og kroppen stabil
- Jobb 15 sekunder
- Hvil og gjenta

MÅLET:
- å forberede lysken på sidebevegelse
- å bygge trygghet før raskere retningsforandringer`
    },

    {
      t: "Lett løp",
      d: "5 x 10m",
      i: `SLIK GJØR DU:
- Løp 10 meter i kontrollert fart
- Start rolig og bygg litt fart
- Gå tilbake som pause
- Gjenta 5 ganger

MÅLET:
- å kjenne om lysken tåler løp
- å bygge trygghet før raskere drag`
    }
  ],

  ready: [
    {
      t: "Klar?",
      d: "Siste steg før trening",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har veldig lite eller ingen smerte
- tåler løping ganske bra
- er nærmere normal trening igjen
- trenger å teste fart, vending og spark før full retur

MÅLET HER ER:
- å gå fra kontrollert trening til kampnære bevegelser
- å sjekke at kroppen tåler sprint, vending og spark
- å bli trygg før du er helt tilbake`
    },

    {
      t: "Sprint",
      d: "3 x 20m",
      i: `SLIK GJØR DU:
- Start rolig
- Løp 20 meter
- Øk farten litt for hvert drag
- Gå tilbake og ta god pause

MÅLET:
- å teste om lysken tåler høyere fart
- å gjøre overgangen mot vanlig sprint trygg`
    },

    {
      t: "Retning",
      d: "5 runder",
      i: `SLIK GJØR DU:
- Løp noen meter frem
- Brems kontrollert
- Snu kroppen
- Løp tilbake
- Gjenta 5 runder

MÅLET:
- å teste lysken i bremsing og vending
- å kjenne om kroppen føles stabil i mer fotballnære bevegelser`
    },

    {
      t: "Spark",
      d: "10 kontrollerte spark",
      i: `SLIK GJØR DU:
- Slå 10 kontrollerte pasninger eller lette spark
- Start rolig
- Øk bare hvis alt kjennes trygt
- Ikke gå rett på harde skudd

MÅLET:
- å teste om lysken tåler sparkebevegelsen
- å kjenne om du kan føre beinet frem naturlig uten smerte`
    }
  ],

  prevent: [
    {
      t: "Klar?",
      d: "Forebygging",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- ikke nødvendigvis er skadet nå
- vil unngå lyskeskade
- vil være bedre rustet for sprint, vending og spark

MÅLET HER ER:
- å gjøre lysken sterkere
- å tåle fotballbelastning bedre
- å redusere sjansen for at problemet kommer tilbake`
    },

    {
      t: "Copenhagen",
      d: "3 x 20 sek per side",
      i: `SLIK GJØR DU:
- Gå i sideplanke
- Legg øverste bein på en benk eller stol
- Løft kroppen opp og hold
- Bytt side

MÅLET:
- å bygge sterk lyske
- å trene en av de viktigste forebyggende øvelsene for innside lår`
    },

    {
      t: "Sideutfall",
      d: "3 x 8 per side",
      i: `SLIK GJØR DU:
- Stå bredt
- Flytt vekten rolig ut til én side
- Hold kontroll gjennom hele bevegelsen
- Skyv tilbake til midten
- Bytt side

MÅLET:
- å gjøre lysken sterk gjennom sidebevegelse
- å tåle strekk og kontroll bedre`
    },

    {
      t: "Oppvarming",
      d: "Alltid",
      i: `SLIK GJØR DU:
- Start med rolig bevegelse
- Gjør dynamiske bevegelser for hofte og lyske
- Øk tempo gradvis
- Gjør korte akselerasjoner og sidebevegelser før du går fullt

MÅLET:
- å gjøre kroppen varm før fart
- å forberede lysken på belastning
- å redusere risikoen for skade`
    }
  ]
};

/* TIPS */
const tips = [
  "Ikke tren gjennom smerte",
  "Kontroll først",
  "Bygg opp gradvis",
  "Stopp hvis du kjenner napp",
  "Kvalitet er viktigere enn å skynde seg"
];

/* START */
function startPhase(type){
  mode = "workout";
  inGameTest = false;

  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  nextBtn.style.display = "block";

  if(progressWrap){
    progressWrap.style.display = "block";
  }

  step.innerText = "";

  exercises = data[type].map(e => ({ ...e }));
  i = 0;
  currentLevel = type;

  startScreen.classList.remove("active");
  workoutScreen.classList.add("active");
  document.getElementById("levelHeader").style.display = "block";

  document.getElementById("hint").style.display = "block";
  tipEl.style.display = "block";

  exerciseBox.classList.remove("resultCard", "ready", "pain");
  title.classList.remove("resultGood", "resultBad");

  nextBtn.style.display = "block";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  nextBtn.innerText = "NESTE";
  nextBtn.onclick = nextExercise;

  const levelMap = {
    pain: ["NIVÅ 1", "Har vondt"],
    better: ["NIVÅ 2", "Føles litt bedre"],
    almost: ["NIVÅ 3", "Nesten klar"],
    ready: ["TESTØKT", "Siste sjekk før trening"],
    prevent: ["NIVÅ 5", "Forebygging"]
  };

  const levelInfo = {
    pain: "2–3 ganger i uka. Fokus på rolig kontroll.",
    better: "2–3 ganger i uka. Bygg styrke uten smerte.",
    almost: "2–3 ganger i uka. Forbered deg på løp og sidebevegelse.",
    ready: "",
    prevent: "1–2 ganger i uka for å holde deg skadefri."
  };

  levelBig.innerText = levelMap[type][0];
  levelSmall.innerHTML = levelMap[type][1] + " - <br>" + levelInfo[type];

  if(type === "ready" && isTestWorkout){
    exercises[0].t = "TESTØKT";
    exercises[0].d = "Fullfør uten smerte eller usikkerhet";
  }

  show();
}

/* VIS ØVELSE */
function show(){
  const ex = exercises[i];

  title.innerText = ex.t;
  desc.innerText = ex.d;
  step.innerText = "Øvelse " + (i + 1) + " av " + exercises.length;

  if(tipEl){
    tipEl.innerText = tips[Math.floor(Math.random() * tips.length)];
  }
}

/* NEXT */
function nextExercise(){
  i++;

  if(i >= exercises.length){
    if(currentLevel === "ready"){
      startGameTest();
      return;
    }

    showFinished();
    return;
  }

  show();
}

function showFinished(){
  const finishText = {
    pain: "Bra. Hold det rolig og bygg opp kroppen.",
    better: "Bra. Du er på vei – fortsett med kontroll.",
    almost: "Bra. Du nærmer deg – men ikke gå for fort frem.",
    prevent: "Bra. Dette holder deg skadefri over tid."
  };

  const nextStep = {
    pain: "Gjør dette nivået 2–3 ganger før du går videre.",
    better: "Fortsett her til alt kjennes stabilt.",
    almost: "Når dette føles lett → gå til test.",
    prevent: "Fortsett 1–2 ganger i uka."
  };

  title.innerText = "FULLFØRT";
  desc.innerText = finishText[currentLevel] + "\n\n" + nextStep[currentLevel];

  nextBtn.innerText = "TILBAKE";

  nextBtn.onclick = () => {
    resetUI();
    workoutScreen.classList.remove("active");
    startScreen.classList.add("active");

    document.body.classList.remove("testMode");
    document.getElementById("hint").style.display = "block";
    tipEl.style.display = "block";
    nextBtn.onclick = nextExercise;
  };
}

if(nextBtn){
  nextBtn.onclick = nextExercise;
}

/* MODAL */
exerciseBox.onclick = () => {
  if(mode === "test"){
    if(!testFlow[testStep]) return;
    modalText.innerText = testFlow[testStep].i || "Ingen forklaring tilgjengelig";
    modal.classList.add("show");
    return;
  }

  if(mode === "workout"){
    if(!exercises[i]) return;
    modalText.innerText = exercises[i].i;
    modal.classList.add("show");
  }
};

if(modal){
  modal.onclick = (e) => {
    if(e.target === modal){
      modal.classList.remove("show");
    }
  };
}

/* BACK */
if(backBtn){
  backBtn.onclick = () => {
    resetUI();
    workoutScreen.classList.remove("active");
    startScreen.classList.add("active");
  };
}

if(homeBack){
  homeBack.onclick = () => {
    window.location.href = "skade.html";
  };
}

/* START TEST */
function startTest(){
  mode = "test";
  testStep = -1;
  answers = [];

  startScreen.classList.remove("active");
  workoutScreen.classList.add("active");

  title.innerText = "FØR DU STARTER";
  desc.innerText = `REGLER:

- JA = helt uten smerte og full kontroll
- NEI = hvis du kjenner noe, er usikker eller holder igjen

- Hvis du kjenner smerte → stopp med en gang
- Gå tilbake til nivået under
- Ikke press deg gjennom noe
- Ikke test hvor mye du tåler

- Sprint og spark er siste steg – ikke rush det`;

  step.innerText = "";

  nextBtn.style.display = "block";
  nextBtn.innerText = "START TEST";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  document.getElementById("levelHeader").style.display = "none";
  document.getElementById("hint").style.display = "block";
  document.getElementById("hint").innerText = "Trykk på kortet for forklaring";

  nextBtn.onclick = () => {
    testStep = 0;
    nextBtn.style.display = "none";
    yesBtn.style.display = "block";
    noBtn.style.display = "block";
    showTest();
  };
}

function showTest(){
  const q = testFlow[testStep];

  title.innerText = q.t;
  desc.innerText = q.d;
  step.innerText = "Test " + (testStep + 1) + " av " + testFlow.length;

  document.getElementById("hint").innerText = "Trykk på kortet for forklaring";

  yesBtn.disabled = true;
  noBtn.disabled = true;

  setTimeout(() => {
    yesBtn.disabled = false;
    noBtn.disabled = false;
  }, 1200);
}

if(yesBtn && noBtn){
  yesBtn.onclick = () => {
    if(mode === "test"){
      nextTest(true);
    } else if(inGameTest){
      nextGameTest(true);
    }
  };

  noBtn.onclick = () => {
    if(mode === "test"){
      nextTest(false);
    } else if(inGameTest){
      nextGameTest(false);
    }
  };
}

function nextTest(answer){
  answers.push(answer);

  const failMap = [
    "pain",
    "better",
    "better",
    "almost",
    "almost",
    "almost",
    "ready"
  ];

  if(answer === false){
    recommendedLevel = failMap[testStep];
    showResult();
    return;
  }

  testStep++;

  if(testStep >= testFlow.length){
    recommendedLevel = "ready";
    showResult();
  } else {
    showTest();
  }
}

/* RESULT */
function showResult(){
  mode = "menu";

  title.innerText = "DIN STATUS";
  step.innerText = "";
  document.getElementById("hint").style.display = "none";
  tipEl.style.display = "none";
  exerciseBox.classList.add("resultCard");
  exerciseBox.classList.remove("ready","pain");
  exerciseBox.classList.add(recommendedLevel === "ready" ? "ready" : "pain");

  const resultMap = {
    pain: "Du må starte rolig og bygge opp lysken igjen",
    better: "Du er på vei tilbake – bygg videre med kontroll",
    almost: "Du er nær – men ikke klar for høy fart eller harde vendinger ennå",
    ready: "Du kan gjøre testøkta",
    prevent: "Du er skadefri – jobb med forebygging"
  };

  desc.innerText = resultMap[recommendedLevel];

  nextBtn.style.display = "block";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  nextBtn.innerText = recommendedLevel === "ready" ? "START TESTØKT" : "START NIVÅ";

  nextBtn.onclick = () => {
    isTestWorkout = (recommendedLevel === "ready");
    startPhase(recommendedLevel);
    nextBtn.onclick = nextExercise;
  };
}

function startGameTest(){
  document.getElementById("levelHeader").style.display = "none";
  inGameTest = true;
  gameAnswers = [];

  document.getElementById("hint").style.display = "none";
  tipEl.style.display = "none";
  document.body.classList.add("testMode");

  title.innerText = "KLAR FOR TRENING?";
  desc.innerText = "Spørsmål 1 av 3\n\nKjente du smerte under økta?";

  nextBtn.style.display = "none";
  yesBtn.style.display = "block";
  noBtn.style.display = "block";

  tipEl.innerText = "";
}

const questions = [
  "Kjente du smerte under økta?",
  "Holdt du igjen i sprint, vending eller sidebevegelse?",
  "Følte du deg utrygg i spark eller raske bevegelser?"
];

function nextGameTest(answer){
  gameAnswers.push(answer);

  if(gameAnswers.length < questions.length){
    desc.innerText =
      "Spørsmål " + (gameAnswers.length + 1) + " av 3\n\n" +
      questions[gameAnswers.length];

    step.innerText = "";
    document.getElementById("testProgress").innerText =
      (gameAnswers.length + 1) + " / 3";

    return;
  }

  evaluateGameTest();
  isTestWorkout = false;
}

function evaluateGameTest(){
  document.getElementById("levelHeader").style.display = "none";
  step.innerText = "";
  document.getElementById("testProgress").innerText = "";

  if(gameAnswers.includes(true)){
    recommendedLevel = "almost";

    title.innerText = "IKKE KLAR";
    title.className = "resultBad";
    desc.innerText = "Gå tilbake til nivå: Nesten klar";
  } else {
    title.innerText = "KLAR FOR TRENING";
    title.className = "resultGood";
    exerciseBox.classList.add("resultCard");

    desc.innerText =
      "Du kan delta på trening med 100% innsats.\n\n" +
      "Hvis du trener uten smerte eller utrygghet,\n" +
      "er du klar for kamp.";
  }

  nextBtn.style.display = "block";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  nextBtn.innerText = "FERDIG";

  nextBtn.onclick = () => {
    workoutScreen.classList.remove("active");
    startScreen.classList.add("active");

    document.getElementById("hint").style.display = "block";
    tipEl.style.display = "block";

    nextBtn.onclick = nextExercise;
    inGameTest = false;
    isTestWorkout = false;
    currentLevel = "";
    title.classList.remove("resultGood", "resultBad");
    exerciseBox.classList.remove("resultCard", "ready", "pain");
  };
}

function resetUI(){
  mode = "menu";
  currentLevel = "";
  inGameTest = false;
  isTestWorkout = false;

  i = 0;
  exercises = [];

  if(progressWrap){
    progressWrap.style.display = "block";
  }

  levelBig.innerText = "";
  levelSmall.innerText = "";

  nextBtn.style.display = "block";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  levelHeader.style.display = "none";
  nextBtn.onclick = nextExercise;

  title.classList.remove("resultGood", "resultBad");
  exerciseBox.classList.remove("resultCard", "ready", "pain");

  document.getElementById("hint").style.display = "block";
  tipEl.style.display = "block";

  testStep = 0;
  answers = [];
  step.innerText = "";
}