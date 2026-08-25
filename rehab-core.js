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
    [/adduktor squeeze/gi, "klem ball mellom knærne"],
    [/bent-knee fallout/gi, "før kneet rolig ut til siden"],
    [/side-liggende adduksjon/gi, "løft nederste bein"],
    [/copenhagen adduction/gi, "sideplanke med bein på stol"],
    [/kort copenhagen/gi, "sideplanke med kne på stol"],
    [/\bcopenhagen\b/gi, "sideplanke med bein på stol"],
    [/lateral shuffle/gi, "raske sidesteg"],
    [/isometrisk tåhev/gi, "hold deg på tå"],
    [/bøyd-kne leggpress/gi, "press foten ned med bøyd kne"],
    [/\bsoleus\b/gi, "leggen"],
    [/ankelpump/gi, "beveg foten opp og ned"],
    [/kne-over-tå mobilitet/gi, "kne frem over tærne"],
    [/wall sit – grunn/gi, "sitt mot veggen"],
    [/\bwall sit\b/gi, "sitt mot veggen"],
    [/step-up/gi, "gå opp på et trinn"],
    [/step-down/gi, "senk deg fra et trinn"],
    [/split squat – kort/gi, "utfall på stedet"],
    [/\bsplit squat\b/gi, "utfall på stedet"],
    [/pogohopp/gi, "små raske hopp"],
    [/\bpogos?\b/gi, "små raske hopp"],
    [/tåhev-kapasitet/gi, "tåhev"],
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
    [/ettbeins kontroll/gi, "øvelser på ett bein"]
  ];

  function friendlyText(value) {
    let text = String(value || "");
    NAME_RULES.forEach(([pattern, replacement]) => { text = text.replace(pattern, replacement); });
    return text;
  }

  function firstInstruction(text) {
    const clean = friendlyText(text).replace(/\s+/g, " ").trim();
    if (!clean) return "";
    const match = clean.match(/^.*?[.!?](?:\s|$)/);
    return (match ? match[0] : clean).trim();
  }

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

    desc.style.whiteSpace = "pre-line";
    if (modalText) modalText.style.whiteSpace = "pre-line";

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
      const friendlyTitle = friendlyText(item.t);
      const how = firstInstruction(item.i);
      title.innerText = friendlyTitle;
      desc.innerText = `${friendlyText(item.d)}${how ? `\n\n${how}` : ""}`;
      if (step) step.innerText = `${state.index + 1} av ${state.items.length}`;
      if (hint) {
        hint.style.display = item.i ? "block" : "none";
        hint.innerText = "Mer forklaring";
      }
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
      if (hint) hint.style.display = "none";

      if (state.level === "ready") return showReadyCheck();

      title.innerText = "FERDIG ✓";
      desc.innerText = state.level === "prevent"
        ? "Bra. Du er ferdig."
        : "Er det likt eller bedre i morgen? Gjør samme økt igjen. Er det verre? Velg en roligere økt.";
      if (tipEl) tipEl.innerText = "";
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    function showReadyCheck() {
      state.mode = "readyCheck";
      title.innerText = "GIKK DET BRA?";
      desc.innerText = "Ingen tydelig smerte og du holdt ikke igjen?";
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
      desc.innerText = "Start rolig på lagtrening. Ikke gå rett til full kamp. Er du like bra i morgen, kan du øke litt.";
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    exerciseBox.addEventListener("click", () => {
      if (state.mode !== "workout") return;
      const item = state.items[state.index];
      if (!item?.i || !modal || !modalText) return;
      modalText.innerText = friendlyText(item.i);
      modal.classList.add("show");
    });

    modal?.addEventListener("click", () => modal.classList.remove("show"));
    backBtn?.addEventListener("click", showMenu);
    homeBack?.addEventListener("click", () => { window.location.href = "skade.html"; });

    window.startTest = () => startPhase("pain");
    window.startPhase = startPhase;
  };
})();