"use strict";

(function () {
  const LEVELS = {
    pain: ["MYE VONDT", "Rolig økt"],
    better: ["LITT VONDT", "Bygg opp"],
    almost: ["NESTEN BRA", "Tilbake mot fotball"],
    ready: ["NESTEN TILBAKE", "Test før trening"],
    prevent: ["FOREBYGGING", "Når du er bra"]
  };

  const NAME_RULES = [
    [/glute bridge/gi, "hofteløft"],
    [/long-lever bridge/gi, "hofteløft med føttene lenger frem"],
    [/ettbeins bridge/gi, "hofteløft på ett bein"],
    [/\bbridge\b/gi, "hofteløft"],
    [/heel press/gi, "press hælen ned"],
    [/hamstring slider/gi, "hælglidning"],
    [/slider – langsom ut/gi, "hælglidning – rolig ut"],
    [/\bslider\b/gi, "hælglidning"],
    [/assistert nordic/gi, "len deg rolig frem"],
    [/nordic hamstring/gi, "len deg rolig frem"],
    [/\bnordic\b/gi, "len deg rolig frem"],
    [/ettbeins rdl/gi, "ettbeins hoftebøy"],
    [/\brdl\b/gi, "hoftebøy"],
    [/aktiv knebøy/gi, "bøy og strekk kneet"],
    [/adduktor squeeze/gi, "klem ball mellom knærne"],
    [/bent-knee fallout/gi, "før kneet rolig ut til siden"],
    [/side-liggende adduksjon/gi, "løft nederste bein"],
    [/copenhagen adduction/gi, "sideplanke med bein på stol"],
    [/kort copenhagen/gi, "sideplanke med kne på stol"],
    [/\bcopenhagen\b/gi, "sideplanke med bein på stol"],
    [/lateral shuffle/gi, "raske sidesteg"],
    [/isometrisk tåhev/gi, "hold deg på tå"],
    [/bøyd-kne ettbeins tåhev/gi, "stå på tå på ett bein med bøyd kne"],
    [/ettbeins tåhev/gi, "stå på tå på ett bein"],
    [/tåhev – begge bein/gi, "stå på tå – begge bein"],
    [/tåhev – strakt kne/gi, "stå på tå med strake knær"],
    [/tåhev – bøyd kne/gi, "stå på tå med bøyde knær"],
    [/bøyd-kne tåhev/gi, "stå på tå med bøyde knær"],
    [/sittende tåhev/gi, "løft hælene sittende"],
    [/rolige tåhev – begge bein/gi, "rolige løft på tå – begge bein"],
    [/langsomme tåhev/gi, "rolige løft på tå"],
    [/tyngre ettbeins tåhev/gi, "stå på tå på ett bein med ekstra vekt"],
    [/tyngre bøyd-kne tåhev/gi, "stå på tå med bøyde knær og ekstra vekt"],
    [/tung tåhev – strakt kne/gi, "stå på tå med ekstra vekt"],
    [/tung tåhev – bøyd kne/gi, "stå på tå med bøyde knær og ekstra vekt"],
    [/tåhev-kapasitet/gi, "stå på tå"],
    [/\btåhev\b/gi, "løft på tå"],
    [/bøyd-kne leggpress/gi, "press foten ned med bøyd kne"],
    [/\bsoleus\b/gi, "leggen"],
    [/ankelpump/gi, "beveg foten opp og ned"],
    [/kne-over-tå mobilitet/gi, "kne frem over tærne"],
    [/kne-over-tå/gi, "kne frem over tærne"],
    [/wall sit – grunn/gi, "sitt mot veggen"],
    [/\bwall sit\b/gi, "sitt mot veggen"],
    [/step-up/gi, "gå opp på et trinn"],
    [/step-down/gi, "senk deg fra et trinn"],
    [/split squat – kort/gi, "utfall på stedet"],
    [/\bsplit squat\b/gi, "utfall på stedet"],
    [/pogohopp/gi, "små raske hopp"],
    [/\bpogos?\b/gi, "små raske hopp"],
    [/adduktorrelatert/gi, "på innsiden av låret"],
    [/adduktorene/gi, "innsiden av låret"],
    [/adduktor/gi, "innsiden av låret"],
    [/plantarflexor-kapasiteten/gi, "styrken i legg og ankel"],
    [/gastrocnemius/gi, "leggen"],
    [/belastningsjustering/gi, "ta det roligere"],
    [/løpsprogresjon/gi, "løp litt raskere for hvert drag"],
    [/spark-progresjon/gi, "spark litt hardere for hvert spark"],
    [/progressiv sprint/gi, "løp litt raskere for hvert drag"],
    [/progressiv løping/gi, "løp litt raskere for hvert drag"],
    [/progressiv oppvarming/gi, "rolig oppvarming"],
    [/retning og fotballsekvens/gi, "vendinger med ball"],
    [/fotballsekvens/gi, "øvelser med ball"],
    [/ettbeins kontroll/gi, "øvelser på ett bein"],
    [/hoppserie/gi, "hopp"],
    [/retningendring/gi, "vending"],
    [/retningsendring/gi, "vending"],
    [/bekkenet/gi, "hofta"],
    [/bekken/gi, "hofta"],
    [/bevegelsesutslag/gi, "bevegelsen"],
    [/provoserer/gi, "gjør mer vondt"],
    [/provosere/gi, "gjøre mer vondt"],
    [/symptomfri/gi, "uten smerte"],
    [/eksponering/gi, "trening"],
    [/kapasitet/gi, "styrke"],
    [/reaktivt/gi, "på signal"],
    [/reaktive/gi, "på signal"],
    [/spaklengde/gi, "vanskelighetsgrad"],
    [/kort spak/gi, "lett variant"],
    [/lengre spak/gi, "tyngre variant"]
  ];

  function friendlyText(value) {
    let text = String(value || "");
    NAME_RULES.forEach(([pattern, replacement]) => { text = text.replace(pattern, replacement); });
    return text;
  }

  function instructionSteps(text) {
    const clean = friendlyText(text)
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return [];

    return (clean.match(/[^.!?]+[.!?]?/g) || [clean])
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 6);
  }

  window.initRehabApp = function initRehabApp(config) {
    const startScreen = document.getElementById("start");
    const workoutScreen = document.getElementById("workout");
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    const step = document.getElementById("step");
    const modal = document.getElementById("modal");
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
    const hint = document.getElementById("hint");
    const tipEl = document.getElementById("tip");
    const menu = startScreen?.querySelector(".menu");
    const intro = startScreen?.querySelector(".intro");
    const introSmall = startScreen?.querySelector(".intro.small");
    const heroTitle = startScreen?.querySelector(".hero h1");

    if (!startScreen || !workoutScreen || !title || !desc || !nextBtn || !exerciseBox || !menu) return;

    const simpleNames = { Hamstring: "Bakside lår" };
    if (heroTitle && simpleNames[heroTitle.textContent.trim()]) heroTitle.textContent = simpleNames[heroTitle.textContent.trim()];
    if (intro) intro.textContent = "Hvor vondt er det nå?";
    if (introSmall) introSmall.style.display = "none";

    const state = { mode: "menu", level: null, items: [], index: 0 };
    const levels = Object.assign({}, LEVELS, config.levels || {});

    menu.innerHTML = `
      <button class="pain-choice pain-high" data-level="pain">
        <span class="choice-dot">●</span><strong>MYE VONDT</strong><small>Vondt, men du kan gå</small>
      </button>
      <button class="pain-choice pain-mid" data-level="better">
        <span class="choice-dot">●</span><strong>LITT VONDT</strong><small>Du kan gå, men jogging eller hopp gjør vondt</small>
      </button>
      <button class="pain-choice pain-low" data-level="almost">
        <span class="choice-dot">●</span><strong>NESTEN BRA</strong><small>Du kan jogge, men ikke løpe fullt</small>
      </button>
      <button class="pain-choice pain-ready" data-level="ready">
        <span class="choice-dot">●</span><strong>NESTEN TILBAKE</strong><small>Du kan løpe nesten normalt</small>
      </button>
      <button class="pain-choice pain-prevent" data-level="prevent">
        <span class="choice-dot">●</span><strong>IKKE VONDT</strong><small>Forebygging</small>
      </button>
      <div class="quick-warning"><strong>STOPP:</strong> Smell/knepp, stor hevelse, nummenhet eller klarer du ikke å gå normalt? Si fra til en voksen og få det vurdert.</div>
    `;

    menu.querySelectorAll("[data-level]").forEach(btn => {
      btn.addEventListener("click", () => startPhase(btn.dataset.level));
    });

    function setButtons({ next = false, yes = false, no = false, nextText = "NESTE" } = {}) {
      nextBtn.style.display = next ? "block" : "none";
      if (yesBtn) yesBtn.style.display = yes ? "block" : "none";
      if (noBtn) noBtn.style.display = no ? "block" : "none";
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
      state.items = [];
      state.index = 0;
      startScreen.classList.add("active");
      workoutScreen.classList.remove("active");
      modal?.classList.remove("show");
      setButtons();
      window.scrollTo(0, 0);
    }

    function cleanCard() {
      exerciseBox.classList.remove("resultCard", "ready", "pain");
      title.className = "";
    }

    function setHeader(level) {
      if (testHeader) testHeader.style.display = "none";
      if (progressWrap) progressWrap.style.display = "block";
      if (levelHeader) levelHeader.style.display = "block";
      const info = levels[level] || ["", ""];
      if (levelBig) levelBig.innerText = info[0];
      if (levelSmall) levelSmall.innerText = info[1];
    }

    function hideHeaders() {
      if (levelHeader) levelHeader.style.display = "none";
      if (progressWrap) progressWrap.style.display = "none";
      if (testHeader) testHeader.style.display = "none";
    }

    function startPhase(level) {
      if (!config.phases?.[level]) return;
      state.mode = "workout";
      state.level = level;
      state.items = config.phases[level];
      state.index = 0;
      showWorkout();
      renderExercise();
    }

    function renderExercise() {
      const item = state.items[state.index];
      if (!item) return finishPhase();

      cleanCard();
      setHeader(state.level);
      title.innerText = friendlyText(item.t);
      desc.replaceChildren();

      const doseLabel = document.createElement("span");
      doseLabel.className = "dose-label";
      doseLabel.textContent = "ANTALL / TID";

      const dose = document.createElement("span");
      dose.className = "exercise-dose";
      dose.textContent = friendlyText(item.d);

      desc.append(doseLabel, dose);

      const steps = instructionSteps(item.i);
      if (steps.length) {
        const howLabel = document.createElement("span");
        howLabel.className = "how-label";
        howLabel.textContent = "SLIK GJØR DU";
        desc.append(howLabel);

        steps.forEach((text, i) => {
          const row = document.createElement("span");
          row.className = "how-step";

          const number = document.createElement("b");
          number.textContent = String(i + 1);

          const instruction = document.createElement("span");
          instruction.textContent = text;

          row.append(number, instruction);
          desc.append(row);
        });
      }

      if (step) step.innerText = `${state.index + 1} av ${state.items.length}`;
      if (hint) hint.style.display = "none";
      if (tipEl) tipEl.innerText = "";
      setButtons({ next: true, nextText: state.index === state.items.length - 1 ? "FERDIG" : "NESTE" });
      nextBtn.onclick = nextExercise;
    }

    function nextExercise() {
      if (state.index < state.items.length - 1) {
        state.index += 1;
        renderExercise();
        window.scrollTo(0, 0);
        return;
      }
      finishPhase();
    }

    function finishPhase() {
      cleanCard();
      hideHeaders();
      desc.replaceChildren();
      if (hint) hint.style.display = "none";

      if (state.level === "ready") return showReadyCheck();

      title.innerText = "FERDIG ✓";
      const finishText = document.createElement("span");
      finishText.textContent = state.level === "prevent"
        ? "Bra. Du er ferdig."
        : "Er det likt eller bedre i morgen? Gjør samme økt igjen. Er det verre? Velg en roligere økt.";
      desc.append(finishText);
      if (tipEl) tipEl.innerText = "";
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    function showReadyCheck() {
      state.mode = "readyCheck";
      title.innerText = "GIKK DET BRA?";
      desc.replaceChildren();
      const text = document.createElement("span");
      text.textContent = "Ingen tydelig smerte og du holdt ikke igjen?";
      desc.append(text);
      if (tipEl) tipEl.innerText = "";
      if (yesBtn) {
        yesBtn.innerText = "JA";
        yesBtn.style.background = "linear-gradient(90deg,#22c55e,#16a34a)";
        yesBtn.style.color = "#000";
        yesBtn.onclick = showReadyResult;
      }
      if (noBtn) {
        noBtn.innerText = "NEI";
        noBtn.style.background = "linear-gradient(90deg,#ef4444,#b91c1c)";
        noBtn.style.color = "#fff";
        noBtn.onclick = () => startPhase("almost");
      }
      setButtons({ yes: true, no: true });
    }

    function showReadyResult() {
      cleanCard();
      exerciseBox.classList.add("resultCard", "ready");
      title.innerText = "PRØV LITT TRENING";
      title.className = "resultGood";
      desc.replaceChildren();
      const text = document.createElement("span");
      text.textContent = "Start rolig på lagtrening. Ikke gå rett til full kamp. Er du like bra i morgen, kan du øke litt.";
      desc.append(text);
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    backBtn?.addEventListener("click", showMenu);
    homeBack?.addEventListener("click", () => { window.location.href = "skade.html"; });

    window.startTest = () => startPhase("pain");
    window.startPhase = startPhase;
  };
})();