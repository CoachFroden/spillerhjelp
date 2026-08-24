"use strict";

(function () {
  const DEFAULT_LEVELS = {
    pain: ["NIVÅ 1", "Rolig oppstart"],
    better: ["NIVÅ 2", "Bygg kapasitet"],
    almost: ["NIVÅ 3", "Tilbake mot fotball"],
    ready: ["TESTØKT", "Kontrollert fotballbelastning"],
    prevent: ["FOREBYGGING", "Vedlikehold og robusthet"]
  };

  window.initRehabApp = function initRehabApp(config) {
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
    const levelHeader = document.getElementById("levelHeader");
    const progressWrap = document.querySelector(".progressWrap");
    const testHeader = document.getElementById("testHeader");
    const testTitle = document.getElementById("testTitle");
    const testProgress = document.getElementById("testProgress");
    const hint = document.getElementById("hint");
    const tipEl = document.getElementById("tip");

    if (!startScreen || !workoutScreen || !title || !desc || !nextBtn || !exerciseBox) {
      console.error("Rehab: mangler nødvendige DOM-elementer.");
      return;
    }

    desc.style.whiteSpace = "pre-line";
    if (modalText) modalText.style.whiteSpace = "pre-line";

    const state = {
      mode: "menu",
      level: null,
      items: [],
      index: 0,
      safetyIndex: 0,
      testIndex: 0,
      returnIndex: 0,
      returnFailed: false,
      safetyCleared: false,
      pendingLevel: null
    };

    const levels = Object.assign({}, DEFAULT_LEVELS, config.levels || {});

    function setButtons({ next = false, yes = false, no = false, nextText = "NESTE" } = {}) {
      nextBtn.style.display = next ? "block" : "none";
      yesBtn.style.display = yes ? "block" : "none";
      noBtn.style.display = no ? "block" : "none";
      if (next) nextBtn.innerText = nextText;
    }

    function showWorkout() {
      startScreen.classList.remove("active");
      workoutScreen.classList.add("active");
      window.scrollTo(0, 0);
    }

    function showMenu() {
      state.mode = "menu";
      state.level = null;
      startScreen.classList.add("active");
      workoutScreen.classList.remove("active");
      if (modal) modal.classList.remove("show");
      setButtons({ next: false, yes: false, no: false });
      window.scrollTo(0, 0);
    }

    function cleanCardClasses() {
      exerciseBox.classList.remove("resultCard", "ready", "pain");
      title.className = "";
    }

    function setHeader(level) {
      const info = levels[level] || ["", ""];
      if (levelHeader) levelHeader.style.display = "block";
      if (levelBig) levelBig.innerText = info[0];
      if (levelSmall) levelSmall.innerText = info[1];
      if (progressWrap) progressWrap.style.display = "block";
      if (testHeader) testHeader.style.display = "none";
    }

    function setTestHeader(label, current, total) {
      if (levelHeader) levelHeader.style.display = "none";
      if (progressWrap) progressWrap.style.display = "none";
      if (testHeader) testHeader.style.display = "block";
      if (testTitle) testTitle.innerText = label;
      if (testProgress) testProgress.innerText = `${current} / ${total}`;
      if (step) step.innerText = "";
    }

    function scopeCard() {
      return {
        t: "Før du starter",
        d: config.scopeShort,
        i: `${config.scope}\n\nDette er en veileder for gradert trening – ikke en diagnose eller medisinsk klarering. Ved usikkerhet, tydelig skade eller vedvarende plager bør du få vurdering av fysioterapeut eller lege.`,
        tip: "Bruk riktig modul. Feil type skade bør ikke trenes etter dette opplegget."
      };
    }

    function loadRuleCard() {
      return {
        t: "Belastningsregel",
        d: config.painRuleShort || "Rolig belastning – følg reaksjonen",
        i: config.painRule,
        tip: "Viktigere enn én økt: hvordan det kjennes senere samme dag og neste morgen."
      };
    }

    function renderExercise() {
      cleanCardClasses();
      const item = state.items[state.index];
      if (!item) return finishPhase();

      setHeader(state.level);
      title.innerText = item.t;
      desc.innerText = item.d;
      if (step) step.innerText = `${state.index + 1} / ${state.items.length}`;
      if (hint) hint.style.display = item.i ? "block" : "none";
      tipEl.innerText = item.tip || config.defaultTip || "";
      setButtons({
        next: true,
        nextText: state.index === state.items.length - 1 ? "FULLFØR" : "NESTE"
      });
      nextBtn.onclick = nextExercise;
    }

    function nextExercise() {
      if (state.index < state.items.length - 1) {
        state.index += 1;
        renderExercise();
        return;
      }

      if (state.level === "ready") {
        startReturnCheck();
      } else {
        finishPhase();
      }
    }

    function finishPhase() {
      cleanCardClasses();
      if (levelHeader) levelHeader.style.display = "none";
      if (progressWrap) progressWrap.style.display = "none";
      if (testHeader) testHeader.style.display = "none";
      if (hint) hint.style.display = "none";

      const nextText = {
        pain: "Gjenta dette nivået til vanlige bevegelser er tydelig bedre. Gå først videre når belastningen ikke gir økende smerte eller mer plager neste morgen.",
        better: "Fortsett på dette nivået til øvelsene kjennes kontrollerte og du tåler planlagt løpsprogresjon uten forverring samme dag eller neste morgen.",
        almost: "Når dette er stabilt og høyere fart/fotballbevegelser kan gjøres uten tydelig smerte eller beskyttelse, kan du gjøre testøkta.",
        prevent: "Forebygging virker best når den gjøres jevnlig gjennom sesongen og tilpasses total trenings- og kampbelastning."
      };

      title.innerText = "FULLFØRT";
      desc.innerText = nextText[state.level] || "Økta er fullført.";
      tipEl.innerText = "Hvis symptomene er tydelig verre neste morgen: reduser belastningen eller gå tilbake ett nivå.";
      setButtons({ next: true, nextText: "TILBAKE TIL MENY" });
      nextBtn.onclick = showMenu;
    }

    function startPhaseInternal(level) {
      if (!config.phases[level]) return;
      state.mode = "workout";
      state.level = level;
      state.index = 0;
      state.items = [scopeCard(), loadRuleCard(), ...config.phases[level]];
      showWorkout();
      renderExercise();
    }

    function startPhase(level) {
      if (!config.phases[level]) return;

      // Forebygging er for spillere uten pågående skade og kan åpnes direkte.
      // Alle rehab-/testnivåer må først passere sikkerhetssjekken i denne økten.
      if (level !== "prevent" && !state.safetyCleared) {
        state.pendingLevel = level;
        state.safetyIndex = 0;
        return showSafetyQuestion();
      }

      startPhaseInternal(level);
    }

    function showSafetyQuestion() {
      state.mode = "safety";
      showWorkout();
      cleanCardClasses();
      const q = config.safetyQuestions[state.safetyIndex];
      setTestHeader("SIKKERHETSSJEKK", state.safetyIndex + 1, config.safetyQuestions.length);
      title.innerText = q.t || "Før du tester";
      desc.innerText = q.d;
      tipEl.innerText = q.i || "Svar JA hvis ett av punktene passer.";
      if (hint) hint.style.display = "none";
      setButtons({ yes: true, no: true });
    }

    function stopForAssessment(question) {
      state.mode = "result";
      cleanCardClasses();
      exerciseBox.classList.add("resultCard", "pain");
      if (testHeader) testHeader.style.display = "none";
      title.innerText = "IKKE BRUK SELVTESTEN NÅ";
      title.className = "resultBad";
      desc.innerText = question.stop || config.defaultStopText || "Dette bør vurderes av helsepersonell før du bruker rehabopplegget.";
      tipEl.innerText = "Ved alvorlige eller raskt økende symptomer: søk rask medisinsk hjelp.";
      setButtons({ next: true, nextText: "TILBAKE TIL MENY" });
      nextBtn.onclick = showMenu;
    }

    function answerSafety(answerYes) {
      const q = config.safetyQuestions[state.safetyIndex];
      if (answerYes) return stopForAssessment(q);
      state.safetyIndex += 1;
      if (state.safetyIndex >= config.safetyQuestions.length) {
        state.safetyCleared = true;

        if (state.pendingLevel) {
          const level = state.pendingLevel;
          state.pendingLevel = null;
          startPhaseInternal(level);
          return;
        }

        state.testIndex = 0;
        showFunctionalTest();
      } else {
        showSafetyQuestion();
      }
    }

    function showFunctionalTest() {
      state.mode = "test";
      const q = config.tests[state.testIndex];
      setTestHeader("FINN RIKTIG NIVÅ", state.testIndex + 1, config.tests.length);
      cleanCardClasses();
      title.innerText = q.t;
      desc.innerText = q.d;
      tipEl.innerText = q.i || "Test kontrollert. Ikke press for å få et JA.";
      if (hint) hint.style.display = "none";
      setButtons({ yes: true, no: true });
    }

    function answerTest(answerYes) {
      const q = config.tests[state.testIndex];
      if (!answerYes) {
        return showLevelRecommendation(q.failLevel || "pain", q.failText);
      }
      state.testIndex += 1;
      if (state.testIndex >= config.tests.length) {
        return showLevelRecommendation("ready", "Du bestod selvtesten. Neste steg er en kontrollert testøkt – ikke full kamp eller automatisk 100 % trening.");
      }
      showFunctionalTest();
    }

    function showLevelRecommendation(level, text) {
      state.mode = "result";
      cleanCardClasses();
      if (testHeader) testHeader.style.display = "none";
      if (levelHeader) levelHeader.style.display = "none";
      const label = levels[level] || ["", ""];
      title.innerText = level === "ready" ? "KLAR FOR TESTØKT" : `START PÅ ${label[0]}`;
      desc.innerText = text || `Testen tyder på at ${label[1].toLowerCase()} passer best nå.`;
      tipEl.innerText = "Selvtesten kan ikke utelukke skade. Ved tvil eller tydelig forverring bør du få en faglig vurdering.";
      setButtons({ next: true, nextText: level === "ready" ? "START TESTØKT" : "START ANBEFALT NIVÅ" });
      nextBtn.onclick = () => startPhase(level);
    }

    function startTest() {
      state.pendingLevel = null;
      state.testIndex = 0;

      if (state.safetyCleared) {
        showFunctionalTest();
        return;
      }

      state.safetyIndex = 0;
      showSafetyQuestion();
    }

    function startReturnCheck() {
      state.mode = "returnCheck";
      state.returnIndex = 0;
      state.returnFailed = false;
      showReturnQuestion();
    }

    function showReturnQuestion() {
      const questions = config.returnQuestions || [
        "Kjente du tydelig smerte under testøkta?",
        "Holdt du igjen eller endret bevegelsen fordi området føltes utrygt?",
        "Ble symptomene tydelig verre mot slutten av økta?"
      ];
      setTestHeader("ETTER TESTØKTA", state.returnIndex + 1, questions.length);
      cleanCardClasses();
      title.innerText = "Klar for neste steg?";
      desc.innerText = questions[state.returnIndex];
      tipEl.innerText = "Her betyr JA at du ikke bør gå videre ennå.";
      if (hint) hint.style.display = "none";
      setButtons({ yes: true, no: true });
    }

    function answerReturn(answerYes) {
      const questions = config.returnQuestions || ["", "", ""];
      if (answerYes) state.returnFailed = true;
      state.returnIndex += 1;
      if (state.returnIndex < questions.length) return showReturnQuestion();
      return showReturnResult();
    }

    function showReturnResult() {
      state.mode = "result";
      cleanCardClasses();
      if (testHeader) testHeader.style.display = "none";
      if (levelHeader) levelHeader.style.display = "none";

      if (state.returnFailed) {
        exerciseBox.classList.add("resultCard", "pain");
        title.innerText = "IKKE KLAR FOR NESTE STEG";
        title.className = "resultBad";
        desc.innerText = "Gå tilbake til nivået «Tilbake mot fotball» og bygg litt mer kapasitet. Ikke bruk én vellykket bevegelse som bevis på at du tåler full trening.";
        tipEl.innerText = "Ved ny skarp smerte eller tydelig tilbakefall: stopp og få skaden vurdert.";
        setButtons({ next: true, nextText: "GÅ TIL NIVÅ 3" });
        nextBtn.onclick = () => startPhase("almost");
        return;
      }

      exerciseBox.classList.add("resultCard", "ready");
      title.innerText = "KLAR FOR GRADERT LAGTRENING";
      title.className = "resultGood";
      desc.innerText = config.returnSuccessText ||
        "Testøkta gikk bra. Det betyr at du kan begynne gradert retur til lagtrening – ikke at appen har klarert deg for full kamp. Start med kontrollert deltakelse, øk belastningen trinnvis og sjekk reaksjonen senere samme dag og neste morgen. Full trening bør tåles før kamp vurderes.";
      tipEl.innerText = "Hvis du er verre neste morgen, var belastningen for høy. Reduser ett trinn.";
      setButtons({ next: true, nextText: "TILBAKE TIL MENY" });
      nextBtn.onclick = showMenu;
    }

    function handleYes() {
      if (state.mode === "safety") return answerSafety(true);
      if (state.mode === "test") return answerTest(true);
      if (state.mode === "returnCheck") return answerReturn(true);
    }

    function handleNo() {
      if (state.mode === "safety") return answerSafety(false);
      if (state.mode === "test") return answerTest(false);
      if (state.mode === "returnCheck") return answerReturn(false);
    }

    exerciseBox.addEventListener("click", () => {
      if (state.mode !== "workout") return;
      const item = state.items[state.index];
      if (!item || !item.i || !modal || !modalText) return;
      modalText.innerText = item.i;
      modal.classList.add("show");
    });

    if (modal) {
      modal.addEventListener("click", () => modal.classList.remove("show"));
    }

    if (yesBtn) yesBtn.onclick = handleYes;
    if (noBtn) noBtn.onclick = handleNo;
    if (backBtn) backBtn.onclick = showMenu;
    if (homeBack) homeBack.onclick = () => { window.location.href = "skade.html"; };

    window.startTest = startTest;
    window.startPhase = startPhase;
  };
})();
