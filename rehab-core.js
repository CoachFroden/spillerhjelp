"use strict";

(function () {
  const LEVELS = {
    pain: ["ROLIG ØKT", "Når vanlig bevegelse gjør vondt"],
    better: ["BYGG OPP", "Når hverdagen går greit"],
    almost: ["TILBAKE MOT FOTBALL", "Når du kan jogge"],
    ready: ["TEST FØR TRENING", "Når du nesten er tilbake"],
    prevent: ["FOREBYGGING", "Når du ikke har vondt"]
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
    [/\bsoleus\b/gi, "tåhev med bøyd kne"],
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
    [/tåhev-kapasitet/gi, "tåhev-test"],
    [/adduktorrelatert/gi, "på innsiden av låret"],
    [/adduktorene/gi, "musklene på innsiden av låret"],
    [/adduktor/gi, "innsiden av låret"],
    [/plantarflexor-kapasiteten/gi, "styrken i legg og ankel"],
    [/gastrocnemius/gi, "leggmuskelen"]
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

  function simpleSafetyLabel(text) {
    const t = friendlyText(text).replace(/\?$/, "");
    if (/akutt|kraftig|smell|knepp|vrid/i.test(t)) return "Kraftig skade, smell eller vridning";
    if (/rød|varm|hoven|hevelse/i.test(t)) return "Mye hevelse, rødme eller varme";
    if (/hvile|natt/i.test(t)) return "Sterke smerter i ro eller om natten";
    if (/nummen|prikk|svikt/i.test(t)) return "Nummenhet, prikking eller tydelig svakhet";
    return t;
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
    const testTitle = document.getElementById("testTitle");
    const testProgress = document.getElementById("testProgress");
    const hint = document.getElementById("hint");
    const tipEl = document.getElementById("tip");
    const menu = startScreen?.querySelector(".menu");

    if (!startScreen || !workoutScreen || !title || !desc || !nextBtn || !exerciseBox || !menu) return;

    desc.style.whiteSpace = "pre-line";
    if (modalText) modalText.style.whiteSpace = "pre-line";

    const state = { mode: "menu", level: null, items: [], index: 0, safetyCleared: false };
    const levels = Object.assign({}, LEVELS, config.levels || {});

    const choiceWrap = document.createElement("div");
    choiceWrap.className = "simpleChoices";
    choiceWrap.style.display = "none";
    nextBtn.parentNode.insertBefore(choiceWrap, nextBtn);

    menu.innerHTML = `
      <button class="primary" id="simpleStart"><strong>START HER</strong><br><span>Finn riktig økt på få sekunder</span></button>
      <button id="preventStart"><strong>FOREBYGGING</strong><br><span>For deg som ikke har vondt nå</span></button>
    `;

    document.getElementById("simpleStart")?.addEventListener("click", startSimpleFlow);
    document.getElementById("preventStart")?.addEventListener("click", () => startPhase("prevent", true));

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
      choiceWrap.style.display = "none";
      startScreen.classList.add("active");
      workoutScreen.classList.remove("active");
      modal?.classList.remove("show");
      document.body.classList.remove("testMode");
      setButtons();
      window.scrollTo(0, 0);
    }

    function cleanCard() {
      exerciseBox.classList.remove("resultCard", "ready", "pain");
      title.className = "";
    }

    function setHeader(level) {
      document.body.classList.remove("testMode");
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

    function startSimpleFlow() {
      state.mode = "safety";
      showWorkout();
      cleanCard();
      hideHeaders();
      choiceWrap.style.display = "none";
      if (hint) hint.style.display = "none";
      title.innerText = "Før vi starter";

      const labels = (config.safetyQuestions || []).map(q => simpleSafetyLabel(q.t));
      const unique = [...new Set(labels)].slice(0, 5);
      desc.innerText = `Har du noe av dette?\n\n${unique.map(x => `• ${x}`).join("\n")}`;
      if (tipEl) tipEl.innerText = "Er du usikker, svar JA og vis dette til en voksen.";

      if (yesBtn) {
        yesBtn.innerText = "JA – NOE AV DETTE";
        yesBtn.style.background = "linear-gradient(90deg,#ef4444,#b91c1c)";
        yesBtn.style.color = "#fff";
        yesBtn.onclick = stopForAssessment;
      }
      if (noBtn) {
        noBtn.innerText = "NEI";
        noBtn.style.background = "linear-gradient(90deg,#22c55e,#16a34a)";
        noBtn.style.color = "#000";
        noBtn.onclick = showSimpleChooser;
      }
      setButtons({ yes: true, no: true });
    }

    function stopForAssessment() {
      state.mode = "result";
      cleanCard();
      exerciseBox.classList.add("resultCard", "pain");
      title.innerText = "STOPP HER";
      title.className = "resultBad";
      desc.innerText = "Ikke bruk rehabøkta nå. Vis dette til en voksen og få skaden vurdert av lege eller fysioterapeut.";
      if (tipEl) tipEl.innerText = "Ved tung pust, brystsmerter, alvorlig sykdomsfølelse eller rask forverring: få akutt hjelp.";
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    function showSimpleChooser() {
      state.safetyCleared = true;
      state.mode = "choose";
      cleanCard();
      hideHeaders();
      setButtons();
      if (hint) hint.style.display = "none";
      if (tipEl) tipEl.innerText = "Velg den som passer best akkurat nå.";
      title.innerText = "Hva klarer du nå?";
      desc.innerText = "Ikke tenk for mye. Trykk på det som ligner mest.";

      choiceWrap.innerHTML = `
        <button data-level="pain"><strong>Det gjør vondt å gå normalt</strong></button>
        <button data-level="better"><strong>Jeg går greit, men jogging eller hopp gjør vondt</strong></button>
        <button data-level="almost"><strong>Jeg kan jogge, men ikke løpe fort eller vende normalt</strong></button>
        <button data-level="ready"><strong>Jeg kan løpe nesten normalt</strong></button>
      `;
      choiceWrap.style.display = "grid";
      choiceWrap.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => startPhase(btn.dataset.level, true));
      });
    }

    function startPhase(level, skipSafety = false) {
      if (!config.phases?.[level]) return;
      if (!skipSafety && level !== "prevent" && !state.safetyCleared) return startSimpleFlow();
      state.mode = "workout";
      state.level = level;
      state.items = config.phases[level];
      state.index = 0;
      choiceWrap.style.display = "none";
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
      desc.innerText = `${friendlyText(item.d)}${how ? `\n\nSlik: ${how}` : ""}`;
      if (step) step.innerText = `${state.index + 1} / ${state.items.length}`;
      if (hint) {
        hint.style.display = item.i ? "block" : "none";
        hint.innerText = "Trykk på kortet hvis du vil ha mer forklaring";
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
      choiceWrap.style.display = "none";
      if (hint) hint.style.display = "none";

      if (state.level === "ready") return showReadyCheck();

      title.innerText = "FERDIG ✓";
      desc.innerText = state.level === "prevent"
        ? "Bra. Denne økta kan brukes jevnlig når du er frisk."
        : "Kjennes området likt eller bedre senere i dag og i morgen? Da kan du gjøre samme økt igjen. Blir det tydelig verre, gå roligere neste gang.";
      if (tipEl) tipEl.innerText = "Du trenger ikke gjøre mer i dag.";
      setButtons({ next: true, nextText: "TILBAKE" });
      nextBtn.onclick = showMenu;
    }

    function showReadyCheck() {
      state.mode = "readyCheck";
      title.innerText = "Gikk det greit?";
      desc.innerText = "Klarte du hele økta uten tydelig smerte og uten at du måtte holde igjen?";
      if (tipEl) tipEl.innerText = "Svar ut fra hele økta, ikke bare én god repetisjon.";
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
        noBtn.onclick = () => startPhase("almost", true);
      }
      setButtons({ yes: true, no: true });
    }

    function showReadyResult() {
      cleanCard();
      exerciseBox.classList.add("resultCard", "ready");
      title.innerText = "PRØV LITT LAGTRENING";
      title.className = "resultGood";
      desc.innerText = "Start med en kontrollert del av treningen. Ikke gå rett til full kamp. Hvis området er like bra eller bedre neste morgen, kan du øke gradvis.";
      if (tipEl) tipEl.innerText = "Blir det verre, gå tilbake til en roligere økt.";
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

    window.startTest = startSimpleFlow;
    window.startPhase = level => startPhase(level);
  };
})();