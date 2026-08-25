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
    [/bøyd-kne leggpress/gi, "press foten ned med bøyd kne"],
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
    [/star reach/gi, "balanse med foten i tre retninger"],
    [/lateral hoppserie/gi, "hopp side til side"],
    [/adduktorrelatert/gi, "på innsiden av låret"],
    [/adduktorene/gi, "innsiden av låret"],
    [/adduktor/gi, "innsiden av låret"],
    [/gastrocnemius/gi, "leggen"],
    [/soleus/gi, "leggen"],
    [/belastningsjustering/gi, "ta det roligere"],
    [/løpsprogresjon/gi, "løp litt raskere for hvert drag"],
    [/spark-progresjon/gi, "spark litt hardere for hvert spark"],
    [/progressiv sprint/gi, "løp litt raskere for hvert drag"],
    [/progressiv løping/gi, "løp litt raskere for hvert drag"],
    [/progressiv oppvarming/gi, "rolig oppvarming"],
    [/fotballsekvens/gi, "øvelser med ball"],
    [/ettbeins kontroll/gi, "øvelser på ett bein"],
    [/hoppserie/gi, "hopp"],
    [/retningsendring/gi, "vending"],
    [/bekkenet/gi, "hofta"],
    [/bekken/gi, "hofta"],
    [/kapasitet/gi, "styrke"]
  ];

  function friendlyText(value) {
    let text = String(value || "");
    NAME_RULES.forEach(([pattern, replacement]) => { text = text.replace(pattern, replacement); });
    return text;
  }

  function rawTitle(item) {
    return String(item?.t || "").toLowerCase();
  }

  function guideFor(item) {
    const t = rawTitle(item);
    const stop = "Stopp hvis det blir tydelig mer vondt.";

    if (/kald flaske|tennisball/.test(t)) return [
      "Sitt på en stol.",
      "Legg en kald vannflaske eller tennisball under foten.",
      "Rull foten rolig frem og tilbake over flasken eller ballen.",
      "Ikke press hardt på det vondeste punktet.",
      "Stopp hvis det gjør mer vondt."
    ];

    if (/ettbeins tåhev|tåhev-kapasitet/.test(t)) return [
      "Stå ved en vegg eller stol.",
      "Stå på ett bein. Hold lett med hånden hvis du trenger balanse.",
      "Løft hælen opp så du står høyt på tå.",
      "Senk hælen rolig ned til gulvet.",
      stop
    ];

    if (/bøyd-kne.*tåhev|tåhev.*bøyd kne|bøyd-kne leggpress/.test(t)) return [
      "Stå ved en vegg eller stol.",
      "Bøy knærne litt og hold dem bøyd.",
      "Løft hælene opp fra gulvet.",
      "Senk rolig ned igjen uten å rette ut knærne.",
      stop
    ];

    if (/sittende tåhev/.test(t)) return [
      "Sitt på en stol med begge føttene flatt i gulvet.",
      "Hold tærne og fremre del av foten i gulvet.",
      "Løft begge hælene så høyt du kan.",
      "Senk hælene rolig ned igjen.",
      stop
    ];

    if (/isometrisk tåhev/.test(t)) return [
      "Stå ved en vegg eller stol.",
      "Løft begge hælene litt opp fra gulvet.",
      "Hold deg helt stille på tå så lenge det står på skjermen.",
      "Senk hælene rolig ned og hvil før neste runde.",
      stop
    ];

    if (/tåhev/.test(t)) return [
      "Stå ved en vegg eller stol.",
      "Ha begge føttene i gulvet.",
      "Løft hælene opp så du står på tå.",
      "Senk hælene rolig ned igjen.",
      stop
    ];

    if (/long-lever bridge/.test(t)) return [
      "Ligg på ryggen med knærne bøyd.",
      "Flytt føttene litt lenger bort fra rumpa enn ved vanlig hofteløft.",
      "Press hælene i gulvet og løft rumpa opp.",
      "Senk rolig ned igjen.",
      stop
    ];

    if (/ettbeins bridge/.test(t)) return [
      "Ligg på ryggen med begge knærne bøyd.",
      "Løft det ene beinet fra gulvet.",
      "Press hælen på beinet som står i gulvet ned og løft rumpa opp.",
      "Senk rolig ned igjen. Bytt bein når du er ferdig.",
      stop
    ];

    if (/glute bridge|\bbridge\b/.test(t)) return [
      "Ligg på ryggen med knærne bøyd og føttene i gulvet.",
      "Ha føttene omtrent i hoftebredde.",
      "Press hælene ned og løft rumpa opp fra gulvet.",
      "Senk rumpa rolig ned igjen.",
      stop
    ];

    if (/heel press/.test(t)) return [
      "Ligg på ryggen med det vonde kneet bøyd.",
      "Sett hælen i gulvet.",
      "Press hælen hardt ned i gulvet.",
      "Tenk at du prøver å dra hælen mot rumpa uten at foten flytter seg.",
      "Hold så lenge det står på skjermen, og slipp rolig."
    ];

    if (/slider/.test(t)) return [
      "Ligg på ryggen med knærne bøyd.",
      "Ha hælene på et håndkle eller i sokker på et glatt gulv.",
      "Løft rumpa litt opp.",
      "Skyv hælene rolig bort fra deg.",
      "Trekk hælene rolig inn igjen. Start med kort bevegelse."
    ];

    if (/nordic/.test(t)) return [
      "Stå på knærne på noe mykt.",
      "Få en annen person til å holde anklene dine nede.",
      "Hold kroppen rett fra knærne og opp.",
      "Len hele kroppen sakte fremover.",
      "Ta imot med hendene før du mister kontrollen."
    ];

    if (/rdl/.test(t)) return [
      "Stå på ett bein ved en vegg hvis du trenger støtte.",
      "Bøy kneet litt.",
      "Skyv rumpa bakover mens overkroppen går frem.",
      "La det andre beinet gå bak deg.",
      "Reis deg rolig opp igjen. Hold ryggen rett."
    ];

    if (/aktiv knebøy/.test(t)) return [
      "Sitt eller ligg slik at beinet kan bevege seg fritt.",
      "Bøy kneet rolig så langt det føles greit.",
      "Strekk kneet rolig ut igjen.",
      "Beveg bare innenfor et område som ikke gjør tydelig mer vondt."
    ];

    if (/adduktor squeeze/.test(t)) return [
      "Ligg på ryggen med knærne bøyd.",
      "Legg en ball, pute eller sammenrullet håndkle mellom knærne.",
      "Klem knærne rolig sammen mot ballen eller puten.",
      "Hold så lenge det står på skjermen.",
      "Slipp rolig opp og hvil før neste gang."
    ];

    if (/bent-knee fallout/.test(t)) return [
      "Ligg på ryggen med begge knærne bøyd og føttene i gulvet.",
      "Hold den ene foten i ro.",
      "La det andre kneet falle rolig ut til siden.",
      "Før kneet rolig tilbake igjen.",
      "Bytt side."
    ];

    if (/side-liggende adduksjon/.test(t)) return [
      "Ligg på siden.",
      "Bøy det øverste beinet og sett foten i gulvet foran deg.",
      "Hold det nederste beinet rett.",
      "Løft det nederste beinet noen centimeter opp fra gulvet.",
      "Senk rolig ned igjen."
    ];

    if (/copenhagen/.test(t)) return [
      "Ligg på siden ved en stol eller benk.",
      "Legg kneet eller beinet som er øverst på stolen.",
      "Støtt overkroppen på albuen.",
      "Løft hofta opp fra gulvet.",
      "Hold kroppen rett og senk rolig ned igjen."
    ];

    if (/sideutfall/.test(t)) return [
      "Stå med litt avstand mellom føttene.",
      "Ta et godt steg ut til siden.",
      "Bøy kneet på beinet du går mot og skyv rumpa litt bak.",
      "Hold den andre foten i gulvet.",
      "Skyv deg tilbake til start og bytt side."
    ];

    if (/sideveis gange|sidegang/.test(t)) return [
      "Bøy knærne litt og hold overkroppen rolig.",
      "Ta små steg til siden.",
      "Hold føttene omtrent like langt fra hverandre hele tiden.",
      "Gå hele strekningen én vei og deretter tilbake."
    ];

    if (/lateral shuffle/.test(t)) return [
      "Stå med knærne litt bøyd.",
      "Flytt deg raskt sidelengs med korte steg.",
      "Ikke kryss beina.",
      "Hold kroppen vendt fremover.",
      "Start rolig og øk farten etter hvert."
    ];

    if (/sitt-til-stå/.test(t)) return [
      "Sitt på en stol med begge føttene i gulvet.",
      "Len overkroppen litt frem.",
      "Reis deg helt opp uten å bruke hendene hvis du klarer.",
      "Sett deg rolig ned igjen.",
      stop
    ];

    if (/wall sit/.test(t)) return [
      "Stå med ryggen mot en vegg.",
      "Flytt føttene litt frem fra veggen.",
      "Gli rolig ned til knærne er litt bøyd.",
      "Hold stillingen så lenge det står på skjermen.",
      "Gå litt høyere hvis kneet gjør mer vondt."
    ];

    if (/knebøy til benk/.test(t)) return [
      "Stå foran en stol eller benk.",
      "Ha føttene omtrent i skulderbredde.",
      "Skyv rumpa bakover og bøy knærne.",
      "Berør stolen lett med rumpa.",
      "Reis deg opp igjen."
    ];

    if (/ettbeins knebøy/.test(t)) return [
      "Stå foran en stol eller benk på ett bein.",
      "Hold det andre beinet litt foran deg.",
      "Bøy kneet rolig og senk rumpa mot stolen.",
      "Berør stolen lett og reis deg opp igjen.",
      "Hold kneet i samme retning som tærne."
    ];

    if (/\bknebøy\b/.test(t)) return [
      "Stå med føttene omtrent i skulderbredde.",
      "Skyv rumpa litt bakover.",
      "Bøy knærne og senk deg rolig ned.",
      "Press føttene i gulvet og reis deg opp igjen.",
      "Hold knærne i samme retning som tærne."
    ];

    if (/step-up/.test(t)) return [
      "Stå foran et lavt trinn.",
      "Sett hele den ene foten opp på trinnet.",
      "Press gjennom foten og gå opp.",
      "Gå rolig ned igjen.",
      "Gjør ferdig én side før du bytter."
    ];

    if (/step-down/.test(t)) return [
      "Stå på et lavt trinn på ett bein.",
      "La det andre beinet henge utenfor kanten.",
      "Bøy kneet på beinet som står på trinnet.",
      "Senk den andre hælen rolig mot gulvet.",
      "Press deg opp igjen."
    ];

    if (/split squat/.test(t)) return [
      "Stå med én fot foran og én fot bak.",
      "Hold føttene på samme sted.",
      "Bøy begge knær og senk kroppen rett ned.",
      "Press deg opp igjen gjennom fremre fot.",
      "Bytt bein når du har gjort alle repetisjonene."
    ];

    if (/ankelpump/.test(t)) return [
      "Sitt eller ligg med beinet avslappet.",
      "Trekk tærne og foten opp mot deg.",
      "Pek deretter foten rolig ned.",
      "Fortsett rolig frem og tilbake.",
      stop
    ];

    if (/rolig bevegelighet/.test(t)) return [
      "Sitt med foten fri fra gulvet.",
      "Lag små rolige sirkler med foten.",
      "Bytt retning.",
      "Du kan også skrive bokstaver i lufta med tærne.",
      stop
    ];

    if (/vektflytting/.test(t)) return [
      "Stå med begge føttene i gulvet og hold i en stol eller vegg.",
      "Flytt kroppen rolig mot det vonde beinet.",
      "Legg så mye vekt på beinet som føles greit.",
      "Flytt kroppen tilbake igjen.",
      "Prøv litt mer vekt etter hvert hvis det går fint."
    ];

    if (/kne-over-tå/.test(t)) return [
      "Stå med hele foten i gulvet.",
      "Hold hælen nede.",
      "Før kneet rolig frem over tærne.",
      "Gå bare så langt det føles greit.",
      "Før kneet tilbake igjen."
    ];

    if (/ettbeins balanse/.test(t)) return [
      "Stå ved en vegg eller stol.",
      "Løft den ene foten fra gulvet.",
      "Stå så rolig du kan på det andre beinet.",
      "Bruk hånden på veggen hvis du mister balansen.",
      "Bytt bein når tiden er ferdig."
    ];

    if (/star reach/.test(t)) return [
      "Stå på ett bein.",
      "Hold det beinet du står på litt bøyd.",
      "Strekk den andre foten frem og berør gulvet lett.",
      "Kom tilbake og strekk foten ut til siden.",
      "Kom tilbake og strekk foten skrått bakover."
    ];

    if (/dynamisk balanse/.test(t)) return [
      "Stå på ett bein.",
      "Bøy kneet litt og hold balansen.",
      "Beveg armene, ta en liten knebøy eller ta imot en ball.",
      "Sett foten ned hvis du mister kontrollen, og start igjen."
    ];

    if (/pogohopp|pogo og spenst/.test(t)) return [
      "Stå med føttene omtrent i hoftebredde.",
      "Hold kroppen ganske høy og knærne bare litt bøyd.",
      "Gjør små raske hopp rett opp.",
      "Tenk at du skal raskt opp fra gulvet igjen hver gang.",
      "Stopp hvis rytmen forsvinner eller det gjør vondt."
    ];

    if (/ettbeinshopp/.test(t)) return [
      "Stå på ett bein.",
      "Gjør et lite hopp.",
      "Land på samme bein med kneet litt bøyd.",
      "Finn balansen før neste hopp.",
      "Start med små hopp."
    ];

    if (/lateral hoppserie/.test(t)) return [
      "Tenk deg en strek på gulvet.",
      "Stå med begge føttene på den ene siden av streken.",
      "Hopp sidelengs over streken.",
      "Hopp tilbake igjen.",
      "Start rolig og øk farten bare hvis landingene er gode."
    ];

    if (/hopp og landing|hoppserie/.test(t)) return [
      "Stå stødig med litt bøy i knærne.",
      "Hopp kontrollert frem eller til siden.",
      "Land mykt med knærne litt bøyd.",
      "Hold landingen et øyeblikk før neste hopp.",
      "Start med små hopp."
    ];

    if (/jogg\/gå/.test(t)) return [
      "Finn et flatt område.",
      "Jogg rolig i den tiden som står på skjermen.",
      "Gå når det står at du skal gå, eller hvis du trenger en pause.",
      "Hold et vanlig løpesteg.",
      "Stopp hvis smerten øker eller du begynner å halte."
    ];

    if (/rolig gange/.test(t)) return [
      "Gå i rolig, vanlig tempo.",
      "Prøv å gå med samme steg på begge bein.",
      "Ikke fortsett hvis du begynner å halte mer.",
      stop
    ];

    if (/løpsprogresjon|progressiv løping|progressiv sprint|høyfartsløp|høy fart/.test(t)) return [
      "Finn en rett strekning med god plass.",
      "Start første drag rolig.",
      "Løp litt raskere på hvert nye drag.",
      "Gå rolig tilbake og hvil mellom dragene.",
      "Stopp hvis du kjenner smerte eller begynner å holde igjen."
    ];

    if (/akselerasjon og brems/.test(t)) return [
      "Start rolig og løp fremover.",
      "Øk farten de første meterne.",
      "Brems med flere korte steg.",
      "Kom helt under kontroll før du snur.",
      "Gå tilbake og hvil før neste gang."
    ];

    if (/akselerasjon/.test(t)) return [
      "Stå klar med god plass foran deg.",
      "Start og øk farten raskt de første meterne.",
      "Løp bare så fort som det står på skjermen.",
      "Brems rolig etter målstreken.",
      "Gå tilbake og hvil før neste drag."
    ];

    if (/vending|retning|planlagte vendinger/.test(t)) return [
      "Sett ut to kjegler eller velg to punkter.",
      "Løp rolig mot punktet.",
      "Ta korte steg når du skal bremse.",
      "Sett foten i bakken og vend til den nye retningen.",
      "Start rolig og øk farten når det føles trygt."
    ];

    if (/spark-progresjon/.test(t)) return [
      "Bruk en ball og god plass.",
      "Start med korte, rolige pasninger.",
      "Spark litt hardere eller litt lengre for hvert par spark.",
      "Ikke gå rett til harde skudd.",
      "Stopp hvis du kjenner napp eller smerte."
    ];

    if (/oppvarming|fotballoppvarming/.test(t)) return [
      "Start med rolig jogg.",
      "Gjør noen enkle bevegelser med hofter, knær og ankler.",
      "Ta noen rolige pasninger med ball hvis du har ball.",
      "Avslutt med noen korte løp der du øker farten litt hver gang.",
      "Du skal bli varm, ikke sliten."
    ];

    if (/fotballsekvens|fotballbevegelse/.test(t)) return [
      "Bruk en ball og litt plass.",
      "Før ballen rolig og spill noen korte pasninger.",
      "Legg inn korte løp og enkle vendinger.",
      "Øk farten litt etter hvert.",
      "Stopp hvis du begynner å beskytte det vonde området."
    ];

    if (/belastningsjustering|løpsbelastning|belastningsstyring/.test(t)) return [
      "Dropp eller reduser det som gjør tydelig mer vondt akkurat nå.",
      "Behold rolig aktivitet som går fint.",
      "Ikke legg inn ekstra sprint, hopp eller lange harde økter samme dag.",
      "Prøv litt mer igjen når området kjennes bedre."
    ];

    if (/sykkel/.test(t)) return [
      "Sett sykkelen på lett motstand.",
      "Trå rolig og jevnt.",
      "Hold foten og beinet i en vanlig stilling.",
      "Stopp hvis smerten bygger seg opp."
    ];

    const fallback = friendlyText(item?.i || "")
      .replace(/senkefase/gi, "veien ned")
      .replace(/repetisjonstall/gi, "antall")
      .replace(/provoser\w*/gi, "gjør mer vondt")
      .replace(/symptom\w*/gi, "smerte")
      .replace(/kapasitet/gi, "styrke")
      .replace(/bevegelsesutslag/gi, "bevegelse");

    const sentences = (fallback.match(/[^.!?]+[.!?]?/g) || [])
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 5);

    return sentences.length ? sentences : ["Gjør øvelsen rolig og kontrollert.", stop];
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

    const state = { mode: "menu", level: null, items: [], index: 0 };
    const levels = Object.assign({}, LEVELS, config.levels || {});

    menu.innerHTML = `
      <button class="pain-choice pain-high" data-level="pain"><strong>MYE VONDT</strong><small>Vondt, men du kan gå</small></button>
      <button class="pain-choice pain-mid" data-level="better"><strong>LITT VONDT</strong><small>Du kan gå, men jogging eller hopp gjør vondt</small></button>
      <button class="pain-choice pain-low" data-level="almost"><strong>NESTEN BRA</strong><small>Du kan jogge, men ikke løpe fullt</small></button>
      <button class="pain-choice pain-ready" data-level="ready"><strong>NESTEN TILBAKE</strong><small>Du kan løpe nesten normalt</small></button>
      <button class="pain-choice pain-prevent" data-level="prevent"><strong>IKKE VONDT</strong><small>Forebygging</small></button>
      <div class="quick-warning"><strong>STOPP:</strong> Smell/knepp, stor hevelse, nummenhet eller klarer du ikke å gå normalt? Si fra til en voksen og få det vurdert.</div>
    `;

    menu.querySelectorAll("[data-level]").forEach(btn => btn.addEventListener("click", () => startPhase(btn.dataset.level)));
    exerciseBox.setAttribute("role", "button");
    exerciseBox.setAttribute("tabindex", "0");

    function setButtons({ next = false, yes = false, no = false, nextText = "NESTE" } = {}) {
      nextBtn.style.display = next ? "block" : "none";
      if (yesBtn) yesBtn.style.display = yes ? "block" : "none";
      if (noBtn) noBtn.style.display = no ? "block" : "none";
      if (next) nextBtn.innerText = nextText;
    }

    function showWorkout() { startScreen.classList.remove("active"); workoutScreen.classList.add("active"); window.scrollTo(0, 0); }
    function showMenu() {
      state.mode = "menu"; state.level = null; state.items = []; state.index = 0;
      startScreen.classList.add("active"); workoutScreen.classList.remove("active");
      modal?.classList.remove("show"); setButtons(); window.scrollTo(0, 0);
    }
    function cleanCard() { exerciseBox.classList.remove("resultCard", "ready", "pain"); title.className = ""; }
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
      state.mode = "workout"; state.level = level; state.items = config.phases[level]; state.index = 0;
      showWorkout(); renderExercise();
    }

    function renderExercise() {
      const item = state.items[state.index];
      if (!item) return finishPhase();
      cleanCard(); setHeader(state.level);
      title.innerText = friendlyText(item.t);
      desc.replaceChildren();

      const doseLabel = document.createElement("span");
      doseLabel.className = "dose-label";
      doseLabel.textContent = "ANTALL / TID";
      const dose = document.createElement("span");
      dose.className = "exercise-dose";
      dose.textContent = friendlyText(item.d);
      desc.append(doseLabel, dose);

      if (step) step.innerText = `${state.index + 1} av ${state.items.length}`;
      if (hint) { hint.style.display = "block"; hint.innerText = "TRYKK PÅ KORTET FOR FORKLARING"; }
      if (tipEl) tipEl.innerText = "";
      setButtons({ next: true, nextText: state.index === state.items.length - 1 ? "FERDIG" : "NESTE" });
      nextBtn.onclick = nextExercise;
    }

    function showGuide() {
      if (state.mode !== "workout" || !modal || !modalText) return;
      const item = state.items[state.index];
      if (!item) return;
      const steps = guideFor(item);
      modalText.innerText = [
        friendlyText(item.t).toUpperCase(),
        friendlyText(item.d),
        "",
        "SLIK GJØR DU",
        ...steps.map((text, i) => `${i + 1}. ${text}`)
      ].join("\n\n");
      modal.classList.add("show");
    }

    function nextExercise() {
      modal?.classList.remove("show");
      if (state.index < state.items.length - 1) { state.index += 1; renderExercise(); window.scrollTo(0, 0); return; }
      finishPhase();
    }

    function finishPhase() {
      cleanCard(); hideHeaders(); desc.replaceChildren(); if (hint) hint.style.display = "none";
      if (state.level === "ready") return showReadyCheck();
      title.innerText = "FERDIG ✓";
      const text = document.createElement("span");
      text.textContent = state.level === "prevent" ? "Bra. Du er ferdig." : "Er det likt eller bedre i morgen? Gjør samme økt igjen. Er det verre? Velg en roligere økt.";
      desc.append(text); if (tipEl) tipEl.innerText = "";
      setButtons({ next: true, nextText: "TILBAKE" }); nextBtn.onclick = showMenu;
    }

    function showReadyCheck() {
      state.mode = "readyCheck"; title.innerText = "GIKK DET BRA?"; desc.replaceChildren();
      const text = document.createElement("span"); text.textContent = "Ingen tydelig smerte og du holdt ikke igjen?"; desc.append(text);
      if (tipEl) tipEl.innerText = "";
      if (yesBtn) { yesBtn.innerText = "JA"; yesBtn.style.background = "linear-gradient(90deg,#22c55e,#16a34a)"; yesBtn.style.color = "#000"; yesBtn.onclick = showReadyResult; }
      if (noBtn) { noBtn.innerText = "NEI"; noBtn.style.background = "linear-gradient(90deg,#ef4444,#b91c1c)"; noBtn.style.color = "#fff"; noBtn.onclick = () => startPhase("almost"); }
      setButtons({ yes: true, no: true });
    }

    function showReadyResult() {
      cleanCard(); exerciseBox.classList.add("resultCard", "ready"); title.innerText = "PRØV LITT TRENING"; title.className = "resultGood"; desc.replaceChildren();
      const text = document.createElement("span"); text.textContent = "Start rolig på lagtrening. Ikke gå rett til full kamp. Er du like bra i morgen, kan du øke litt."; desc.append(text);
      setButtons({ next: true, nextText: "TILBAKE" }); nextBtn.onclick = showMenu;
    }

    exerciseBox.addEventListener("click", showGuide);
    exerciseBox.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showGuide(); } });
    modal?.addEventListener("click", () => modal.classList.remove("show"));
    backBtn?.addEventListener("click", showMenu);
    homeBack?.addEventListener("click", () => { window.location.href = "skade.html"; });
    window.startTest = () => startPhase("pain");
    window.startPhase = startPhase;
  };
})();