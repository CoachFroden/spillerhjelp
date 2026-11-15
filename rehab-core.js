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
    [/copenhagen adduction/gi, "Copenhagen-planke"],
    [/kort copenhagen/gi, "Copenhagen-planke (lett variant)"],
    [/\bcopenhagen\b/gi, "Copenhagen-planke"],
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
    [/split squat – kort/gi, "splittknebøy (kort bevegelse)"],
    [/\bsplit squat\b/gi, "splittknebøy"],
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
    const stop = "Stopp hvis det blir tydelig mer vondt. Si fra til en voksen.";

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
      "Ved lett variant legger du det øverste kneet på en stødig benk. Ved tyngre variant støtter du med leggen.",
      "Støtt overkroppen på albuen.",
      "Press det øverste beinet ned mot benken og løft hoften og det nederste beinet fra gulvet.",
      "Hold kroppen mest mulig rett. Senk kontrollert ned igjen."
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


  window.initRehabApp = function(config) {
    const root=document.getElementById("app");
    if(!root)return;
    const area=config.name==="Hamstring"?"Bakside lår":(config.name||"Skadeområde");
    const phases=config.phases||{};
    const choices=[
      {key:"pain",name:"Mye vondt",hint:"Det gjør vondt å gå"},
      {key:"better",name:"Litt vondt",hint:"Løping eller hopp gjør vondt"},
      {key:"almost",name:"På bedringens vei",hint:"Jeg kan jogge rolig"},
      {key:"ready",name:"Nesten tilbake",hint:"Jeg kan løpe nesten som før"}
    ].filter(x=>Array.isArray(phases[x.key])&&phases[x.key].length);
    let current=null,confirmed=false;
    const el=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=content;return e};
    const header=el("header","r-header");
    const back=el("a","r-back","←  Alle områder");back.href="skade.html";
    const brand=el("span","r-brand","SPILLERHJELPEN");
    header.append(back,brand);
    const hero=el("section","r-hero");
    const kicker=el("span","r-kicker","HAR DU VONDT?");
    const heading=el("h1","",area);
    const sub=el("p","","Velg det som passer best. Du trenger ikke presse deg gjennom smerte.");
    hero.append(kicker,heading,sub);
    const section=el("main","r-main");
    root.replaceChildren(header,hero,section);
    function clear(){section.replaceChildren();}
    function btn(label,cls,click){const b=el("button",cls,label);b.type="button";b.addEventListener("click",click);return b;}
    function alertBox(){
      const n=el("aside","r-warning");
      const title=el("strong","","Når skal du stoppe?");
      const body=el("p","","Snakk med en voksen om smerter som varer eller blir verre. Ved sterke smerter, stor hevelse, nummenhet eller problemer med å gå bør dere få medisinsk råd. Øvelsene er generelle råd, ikke en diagnose.");
      n.append(title,body);return n;
    }
    function choose(){
      current=null;confirmed=false;clear();
      section.append(el("h2","r-section-title","Hvordan kjennes det?"),el("p","r-muted","Velg det som passer best."));
      const grid=el("div","r-levels");
      choices.forEach((x,i)=>{
        const b=btn("","r-level r-level-"+x.key,()=>safety(x));
        const num=el("span","r-level-number",String(i+1).padStart(2,"0"));
        const copy=el("span","r-level-copy");
        copy.append(el("strong","",x.name),el("small","",x.hint));
        const arrow=el("span","r-chevron","›");b.append(num,copy,arrow);grid.append(b);
      });
      section.append(grid);
      const prevent=el("a","r-prevent");prevent.href="forebygging.html";
      prevent.append(el("span","r-prevent-icon","↗"),el("span","","Ingen smerter? Se skadeforebyggende øvelser"),el("span","","›"));
      section.append(prevent,alertBox());
    }
    function safety(x){
      current=x;confirmed=false;clear();
      section.append(btn("← Endre nivå","r-text-button",choose));
      const messages={
        pain:{title:"Det høres vondt ut ❤️",text:"Ikke press deg gjennom smerte. Ta pause fra fotballen og fortell en voksen hvordan du har det.",questions:["Kan du gå og støtte på beinet?","Kom smerten etter et fall, en vridning eller et sammenstøt?","Har du mye hevelse eller veldig vondt?"],yes:"Snakk med en voksen før du prøver øvelser.",allow:false},
        better:{title:"Litt vondt? Vi tar det rolig ⚽",text:"Du trenger ikke teste hvor mye du tåler. Sjekk først at det er greit å bevege seg rolig.",questions:["Kan du gå vanlig uten å halte?","Er det lite eller ingen hevelse?","Blir smerten ikke verre ved rolig bevegelse?"],yes:"Hvis du svarte nei eller er usikker på noe, snakk med en voksen før øvelser.",allow:true},
        almost:{title:"På vei tilbake 💪",text:"Fint at det kjennes bedre. Det viktigste er at aktiviteten ikke gjør vondt verre.",questions:["Kan du gå og jogge rolig uten å halte?","Kjennes det like bra eller bedre etter rolig aktivitet?","Er det ingen tydelig hevelse eller økende smerte?"],yes:"Hvis du svarte nei eller er usikker på noe, snakk med en voksen før øvelser.",allow:true},
        ready:{title:"Snart kampklar? ⚽",text:"Ta det gradvis. Å føle seg bedre er ikke det samme som å være klar for full kamp.",questions:["Kan du løpe og bremse uten smerte?","Kan du vende og bevege deg normalt uten å halte?","Kjennes det fortsatt bra senere samme dag og dagen etter?"],yes:"Hvis du svarte nei eller er usikker på noe, snakk med en voksen og trener før du øker.",allow:true}
      };
      const m=messages[x.key]||messages.better;
      const intro=el("div","r-calm-intro");
      intro.append(el("h2","r-section-title",m.title),el("p","r-muted",m.text));
      section.append(intro);
      if(x.key==="pain"){
        const note=el("aside","r-simple-check");
        note.append(el("strong","","Før du gjør noe mer"),el("p","","Fortell en voksen hvor vondt du har og hva som skjedde. Ved sterke smerter, stor hevelse, feilstilling, nummenhet eller hvis du ikke kan støtte på beinet, bør en voksen hjelpe deg å få medisinsk vurdering."));
        section.append(note,btn("← Tilbake til nivåene","r-secondary",choose));
        return;
      }
      const note=el("p","r-muted","Svar på tre korte spørsmål. Er du usikker, velg «Nei / usikker».");
      section.append(note);
      const answers=[];
      const questionBox=el("div","r-simple-check");
      m.questions.forEach((q,i)=>{
        const row=el("div","r-check-row");
        row.append(el("strong","",q));
        const actions=el("div","r-check-actions");
        const yes=btn("Ja","r-check-choice",()=>setAnswer(i,true));
        const no=btn("Nei / usikker","r-check-choice",()=>setAnswer(i,false));
        actions.append(yes,no);row.append(actions);questionBox.append(row);answers.push(null);
        function setAnswer(index,value){
          answers[index]=value;
          yes.classList.toggle("chosen",value===true);
          no.classList.toggle("chosen",value===false);
          update();
        }
      });
      section.append(questionBox);
      const result=el("div","r-check-result");section.append(result);
      const proceed=btn("Se rolige øvelser →","r-primary",()=>{if(answers.every(v=>v===true)){confirmed=true;showExercises();}});
      proceed.disabled=true;section.append(proceed);
      function update(){
        const failed=answers.some(v=>v===false);
        proceed.disabled=failed||!answers.every(v=>v===true);
        result.textContent=failed?m.yes:answers.every(v=>v===true)?"Fint. Start forsiktig, og stopp hvis smerten øker.":"Velg et svar på hvert spørsmål.";
      }
      update();
      section.append(btn("Jeg vil heller spørre en voksen","r-secondary",choose));
      const warning=el("p","r-muted","Sterke smerter, stor hevelse, feilstilling, nummenhet eller problemer med å støtte på beinet? Si fra til en voksen og få medisinsk råd før øvelser.");
      section.append(warning);
    }
    function purpose(item){
      const t=String(item.t||"").toLowerCase();
      if(/copenhagen|adduktor|lyske|squeeze/.test(t))return "Innsiden av lårene (lysken)";
      if(/tåhev|leggpress|soleus/.test(t))return "Legger og styrke rundt ankelen";
      if(/bridge|slider|nordic|hamstring|heel press/.test(t))return "Baksiden av lårene og rumpa";
      if(/balanse|star reach/.test(t))return "Balanse og kontroll på ett bein";
      if(/knebøy|utfall|step-up|step-down|wall sit/.test(t))return "Lår, rumpe og kontroll rundt kneet";
      if(/hopp|pogo/.test(t))return "Spenst og kontroll når du lander";
      if(/løp|sprint|jogg|akselerasjon/.test(t))return "Løping";
      if(/spark|fotball|vending|retningsendring/.test(t))return "Kontroll i fotballbevegelser";
      return "Bevegelse og styrke";
    }
    function showExercises(){
      if(!current||!confirmed){choose();return;}
      clear();
      section.append(btn("← Velg annet nivå","r-text-button",choose));
      const top=el("div","r-plan-heading");
      top.append(el("div","",current.name),el("span","",phases[current.key].length+" øvelser"));
      section.append(top,el("p","r-muted","Trykk på en øvelse for forklaring."));
      const list=el("div","r-exercise-list");
      phases[current.key].forEach((item,i)=>{
        const card=el("article","r-exercise");
        const topRow=el("div","r-exercise-top");
        const number=el("span","r-exercise-number",String(i+1));
        const content=el("div","r-exercise-content");
        content.append(el("h3","",friendlyText(item.t)),el("p","r-dose",friendlyText(item.d)),el("p","r-purpose","Trener: "+purpose(item)));
        topRow.append(number,content);
        const details=el("details","r-details");
        const summary=el("summary","","Slik gjør du");
        const ol=el("ol","");
        guideFor(item).forEach(line=>ol.append(el("li","",line)));
        details.append(summary,ol);
        card.append(topRow,details);list.append(card);
      });
      section.append(list);
      const reminder=el("aside","r-reminder");
      reminder.append(el("strong","","Viktig"),el("p","","Stopp hvis smerten blir skarp eller øker, eller du begynner å halte. Ikke bruk dette som klarsignal for kamp. Snakk med en voksen og trener før du øker belastningen."));
      section.append(reminder,btn("Tilbake til nivåvalg","r-secondary",choose));
    }
    choose();
  };
})();
