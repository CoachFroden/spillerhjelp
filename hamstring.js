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
let mode = "menu"; // "menu" | "test" | "workout"
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
    d: "Kan du gå og være i ro uten smerte?",
    i: "Dette tester om bakside lår fortsatt er irritert i helt vanlige situasjoner. Før du går videre til øvelser og løping, må du kjenne etter om du har vondt når du står stille, går rolig eller beveger deg vanlig. Reis deg opp og gå rolig noen steg. Stopp opp igjen og kjenn etter. Hvis du kjenner smerte, stikking, murring eller at du beskytter beinet, er du ikke klar for å gå videre i testen."
  },
  {
    t: "Aktivering",
    d: "Kan du gjøre 10 glute bridge rolig uten smerte?",
    i: "Ligg på ryggen med knærne bøyd og føttene flatt i gulvet. Ha armene rolig ned langs siden. Press hælene ned i gulvet og løft hofta rolig opp til kroppen blir lang fra skuldre til knær. Senk deg rolig ned igjen. Gjør dette 10 ganger med kontroll. Du skal kjenne at rumpa og bakside lår jobber, men du skal ikke kjenne smerte, napp eller skarp irritasjon i det skadde området. Hvis du ikke klarer å gjøre alle repetisjonene rolig og kontrollert, er du ikke klar for neste steg."
  },
  {
    t: "Kontroll",
    d: "Kan du gjøre 20 marching steg med kontroll uten smerte?",
    i: "Stå oppreist med kroppen høy og rolig. Løft ett kne opp i kontrollert fart, sett foten ned igjen, og løft så det andre kneet. Fortsett annenhver side til du har gjort 20 steg totalt. Dette tester om du har kontroll på hofte og lår uten smerte eller uro. Du skal ikke måtte kaste beinet opp, miste balansen eller kompensere med overkroppen. Hvis du kjenner smerte eller mister kontroll, er du ikke klar for å gå videre."
  },
  {
    t: "Jogging",
    d: "Kan du jogge 2–3 minutter uten smerte eller halting?",
    i: "Jogge rolig i to til tre minutter i jevnt tempo. Dette skal være lett jogging, ikke sprint og ikke testing av maks fart. Poenget er å se om bakside lår tåler jevn bevegelse over litt tid. Du skal kunne jogge uten smerte, uten halting og uten at du holder igjen fordi det føles utrygt. Hvis du kjenner at du beskytter beinet, at steget blir rart, eller at det gjør vondt, er du ikke klar for neste steg."
  },
  {
    t: "Akselerasjon",
    d: "Kan du løpe 5 korte drag med økende fart uten smerte?",
    i: "Løp fem korte drag på omtrent ti til tjue meter. Start rolig på første drag, og øk farten litt for hvert drag. Du trenger ikke gå rett til maks fart, men du skal kjenne om kroppen tåler å bygge fart. Gå rolig tilbake mellom hvert drag. Dette tester om bakside lår tåler fraspark og overgang fra rolig løp til raskere løp. Du skal ikke kjenne smerte, napp, utrygghet eller føle at du må holde igjen."
  },
  {
    t: "Sprint",
    d: "Kan du løpe 2–3 sprint på høy fart uten smerte eller frykt?",
    i: "Løp to til tre sprint der du kommer opp i høy fart. Du skal bygge kontrollert opp mot nesten maks fart eller maks fart hvis det kjennes naturlig og trygt. Ta god pause mellom hvert drag. Dette er et viktig steg, fordi hamstringskader ofte merkes når farten blir høy. Du skal kunne løpe naturlig, uten smerte, uten å forkorte steget og uten å bli redd når du trykker til. Hvis du holder igjen eller kjenner smerte, er du ikke klar for neste steg."
  },
  {
    t: "Retning",
    d: "Kan du stoppe, vende og løpe igjen uten å holde igjen?",
    i: "Løp noen meter frem, brems kontrollert ned, snu kroppen og løp tilbake igjen. Gjenta dette noen ganger. Målet er å teste om bakside lår tåler bremsing, vending og nytt fraspark. Dette ligner mer på fotball enn bare rett frem sprint. Du skal kunne stoppe og vende uten smerte, uten utrygghet og uten å holde igjen på det skadde beinet. Hvis det gjør vondt når du bremser, når du snur, eller når du setter fart igjen, er du ikke klar for full belastning."
  }
];

const data = {

  pain: [

    {
      t: "Klar?",
      d: "Start rolig",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- fortsatt har vondt i bakside lår
- kjenner det når du går, bøyer deg eller prøver å løpe
- ikke er klar for fart eller sprint

MÅLET HER ER:
- å få i gang muskelen igjen
- å unngå at skaden blir verre
- å bygge opp kontroll før du gjør mer

VIKTIG:
- dette skal være rolig
- du skal ikke presse gjennom smerte
- hvis du er usikker, velg heller dette nivået enn et for tungt nivå`
    },
	
	    {
      t: "Heel press",
      d: "3 x 10 sek per bein",
      i: `SLIK GJØR DU:
- Ligg på ryggen
- Bøy det ene kneet slik at foten står i gulvet
- La det andre beinet være bøyd eller litt mer avslappet, alt etter hva som føles best
- Press hælen på arbeidsbeinet rolig ned i gulvet
- Tenk at du prøver å dra hælen litt bakover mot rumpa, uten at foten faktisk flytter seg
- Hold dette trykket i 10 sekunder
- Slapp av
- Bytt bein hvis du skal gjøre begge

DETTE ER EN STATISK ØVELSE:
- det betyr at muskelen jobber uten at du beveger mye på beinet
- den skal vekke bakside lår, ikke irritere den

DU SKAL KJENNE:
- et tydelig, men rolig arbeid bak i låret
- at muskelen aktiveres uten at det gjør vondt
- kontroll, ikke stress

DU SKAL IKKE KJENNE:
- skarp smerte
- krampe
- at hele kroppen spenner seg

VANLIGE FEIL:
- presser altfor hardt
- holder pusten
- spenner skuldre, mage og nakke unødvendig
- prøver å “vinne” øvelsen i stedet for å kontrollere den

STOPP HVIS:
- smerten øker mens du holder
- du kjenner napp eller stikk
- du ikke klarer å slappe av i resten av kroppen

TIPS:
- start med et rolig trykk
- du trenger ikke presse maks
- kvalitet og kontroll er viktigere enn kraft her`
    },

    {
      t: "Glute bridge",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Ligg på ryggen på gulvet
- Bøy knærne så føttene står flatt i bakken
- Ha føttene omtrent hoftebredde fra hverandre
- Ha armene liggende rolig langs siden
- Press hælene ned i gulvet
- Løft hofta rolig opp til kroppen danner en ganske rett linje fra skuldre til knær
- Hold toppen i 1–2 sekunder
- Senk hofta rolig ned igjen
- Gjenta rolig og kontrollert

DETTE SKAL DU TENKE PÅ:
- press hofta opp, ikke ryggen
- beveg deg rolig
- hold kroppen stabil hele tiden

DU SKAL KJENNE:
- at det jobber i rumpa
- at det jobber bak i låret
- at du har kontroll hele veien opp og ned

DU SKAL IKKE KJENNE:
- skarp smerte i bakside lår
- stikking eller “napp”
- at korsryggen tar over

VANLIGE FEIL:
- løfter for høyt og overdriver bevegelsen
- skyver magen opp i stedet for hofta
- går for fort
- slapper av helt på toppen
- presser mest med tærne i stedet for hælene

STOPP HVIS:
- du kjenner tydelig smerte i låret
- det napper i muskelen
- du føler at du må kompensere med rygg eller andre siden

TIPS:
- tenk “press gjennom hælene”
- tenk “stram rumpa på toppen”
- det er bedre å gjøre få gode repetisjoner enn mange dårlige`
    },
	
	{
  t: "Heel slide",
  d: "3 x 10",
  i: `SLIK GJØR DU:
- Ligg på ryggen på gulvet
- Strekk beina ut foran deg
- Dra hælen rolig inn mot rumpa, men bare så langt det føles trygt
- Hold foten i kontakt med gulvet hele tiden
- Skyv rolig tilbake igjen
- Gjør 10 rolige repetisjoner

MÅLET MED ØVELSEN:
- å få bakside lår i gang igjen
- å bevege muskelen uten høy belastning
- å bygge trygghet i bevegelse

DU SKAL KJENNE:
- rolig arbeid bak i låret
- kontrollert bevegelse
- ingen smerte

DU SKAL IKKE KJENNE:
- skarp smerte
- napp eller utrygghet
- at du må hjelpe til med andre muskler

VANLIGE FEIL:
- drar hælen for raskt
- løfter foten fra gulvet
- går for langt inn hvis det føles stramt

STOPP HVIS:
- du kjenner smerte
- det napper i låret
- bevegelsen føles utrygg

TIPS:
- gjør det rolig og kontrollert
- korte bevegelser er helt ok
- dette handler om å vekke muskelen, ikke presse den`
},

    {
      t: "Rolig gange",
      d: "5 min",
      i: `SLIK GJØR DU:
- Reis deg opp rolig
- Begynn å gå i vanlig, rolig tempo
- Ta korte og naturlige steg
- Hold overkroppen avslappet
- La armene svinge naturlig
- Gå i 5 minutter uten å skynde deg

MÅLET MED DENNE ØVELSEN:
- å få blodsirkulasjon i gang
- å gjøre muskelen mindre stiv
- å venne beinet til bevegelse igjen

DU SKAL KJENNE:
- at kroppen blir litt varmere
- at låret kanskje kjennes litt lettere etter hvert
- at du går mer naturlig etter en stund

DU SKAL IKKE KJENNE:
- at du halter mer og mer
- at smerten øker
- at du må “beskytte” det skadde beinet hele tiden

VANLIGE FEIL:
- går for fort
- tar for lange steg
- prøver å teste om man kan småjogge
- ignorerer at man halter

STOPP HVIS:
- du begynner å halte tydelig
- du kjenner smerte som øker
- det napper i bakside lår

TIPS:
- korte steg er bedre enn lange steg
- rolig gange er nok her
- ikke gjør mer bare fordi det føles litt bedre etter 1 minutt`
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
- fortsatt ikke er klar for sprint eller hard belastning

MÅLET HER ER:
- å bygge mer kontroll
- å tåle litt mer bevegelse
- å gjøre bakside lår sterkere uten å provosere skaden

VIKTIG:
- du skal fortsatt være forsiktig
- dette er ikke nivået for å teste maks
- hvis noe begynner å gjøre vondt, gå tilbake ett nivå`
    },

    {
      t: "Glute bridge",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Ligg på ryggen med knærne bøyd
- Sett føttene flatt i gulvet, omtrent hoftebredde
- Press hælene ned i gulvet
- Løft hofta rolig opp til kroppen blir lang og sterk
- Hold toppen i 1 sekund
- Senk rolig helt ned igjen
- Gjør 10 rolige repetisjoner

HVA SOM ER VIKTIG HER:
- nå jobber du mer med kontroll gjennom flere repetisjoner
- hver repetisjon skal se lik ut
- kroppen skal være stabil hele tiden

DU SKAL KJENNE:
- arbeid i rumpe og bakside lår
- god kontroll
- at det blir litt tyngre utover settet uten at det gjør vondt

DU SKAL IKKE KJENNE:
- smerte i det skadde området
- at ryggen tar over
- at du “vrir” kroppen til en side

VANLIGE FEIL:
- skyter hofta opp for fort
- mister kontroll på vei ned
- bruker tærne mer enn hælene
- lar knærne falle innover eller utover

STOPP HVIS:
- smerten kommer tilbake
- du kjenner at bevegelsen blir skjev
- du ikke klarer å kontrollere tempoet

TIPS:
- tenk “rolig opp, rolig ned”
- press likt med begge beina
- kvalitet først, alltid`
    },

    {
      t: "Hip hinge",
      d: "3 x 8",
      i: `SLIK GJØR DU:
- Stå med føttene omtrent hoftebredde
- Ha en liten bøy i knærne
- Hold brystet oppe og ryggen rett
- Skyv rumpa bakover som om du skal lukke en dør med rumpa
- La overkroppen lene seg frem mens ryggen holder seg rett
- Gå bare så langt ned at du kjenner et kontrollert strekk bak i lårene
- Reis deg rolig opp igjen ved å presse hofta frem

MÅLET MED ØVELSEN:
- å lære bakside lår å jobbe kontrollert
- å trene hoftebevegelsen riktig
- å tåle strekk uten å miste kontroll

DU SKAL KJENNE:
- et tydelig strekk bak i låret
- at rumpa og bakside jobber når du går opp igjen
- kontroll gjennom hele bevegelsen

DU SKAL IKKE KJENNE:
- skarp smerte
- at det drar for mye i det skadde punktet
- at korsryggen jobber mest

VANLIGE FEIL:
- rund rygg
- bøyer knærne for mye så det blir mer knebøy enn hoftebøy
- går for langt ned
- går for fort

STOPP HVIS:
- du kjenner smerte i låret
- du mister rett rygg
- det napper i bevegelsen

TIPS:
- tenk “rumpa bak”
- tenk “brystet stolt”
- gå kortere ned hvis du er usikker`
    },

    {
      t: "Marching",
      d: "3 x 20 steg",
      i: `SLIK GJØR DU:
- Stå rett opp
- Løft ett kne rolig opp
- Sett foten kontrollert ned igjen
- Løft det andre kneet
- Fortsett annenhver side som en kontrollert marsj
- Hold magen lett spent og kroppen høy
- Gjør 20 steg totalt

MÅLET MED ØVELSEN:
- å bygge kontroll i hofte og lår
- å venne bakside lår til bevegelse igjen
- å trene rytme og stabilitet

DU SKAL KJENNE:
- at du jobber kontrollert
- at du holder balansen
- litt aktivitet i hofte og lår, uten smerte

DU SKAL IKKE KJENNE:
- stikk i bakside lår
- at du må “kaste” beinet opp
- at du mister kontroll på kroppen

VANLIGE FEIL:
- løfter kneet for raskt
- lener overkroppen bakover
- mister balansen
- prøver å gjøre det for eksplosivt

STOPP HVIS:
- det gjør vondt når du løfter beinet
- du mister kontroll
- du begynner å kompensere med overkroppen

TIPS:
- gjør det rolig og rent
- tenk “balanse og kontroll”
- dette er ikke sprint, dette er kontroll`
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
- å forberede bakside lår på løping
- å komme nærmere fotballbevegelse igjen

VIKTIG:
- dette er ofte nivået der mange går for fort frem
- bare fordi du føler deg bedre, betyr det ikke at du er klar for maks sprint
- kontroll kommer før fart`
    },

    {
      t: "Nordic",
      d: "3 x 4",
      i: `SLIK GJØR DU:
- Stå på knærne på en myk matte eller et mykt underlag
- Få noen til å holde rundt anklene dine, eller fest beina under noe stabilt
- Hold kroppen så rett som mulig fra knær til skuldre
- Kryss armene foran brystet eller hold hendene klare foran deg
- Len deg sakte fremover
- Prøv å holde igjen med bakside lår så lenge du klarer
- Når du ikke klarer mer, tar du deg imot med hendene
- Press deg rolig opp igjen eller hjelp til med hendene

MÅLET MED ØVELSEN:
- å gjøre bakside lår sterk i den typen belastning som ofte gir skade
- å lære muskelen å bremse kroppen

DU SKAL KJENNE:
- at det jobber tungt bak i lårene
- at du “bremser deg ned”
- kontroll så lenge du klarer

DU SKAL IKKE KJENNE:
- skarp smerte
- plutselig napp
- at det låser seg

VANLIGE FEIL:
- faller rett ned uten å holde igjen
- bøyer i hofta i stedet for å holde kroppen lang
- prøver å gå for langt hvis du ikke er klar
- gjør øvelsen for raskt

STOPP HVIS:
- du kjenner smerte
- du mister kontroll helt
- det føles utrygt i bakside lår

TIPS:
- litt kontroll er bedre enn mye fall
- tenk “brems ned”
- dette er en av de viktigste øvelsene for hamstring`
    },

    {
      t: "Ettbeins balanse",
      d: "3 x 20 sek",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold overkroppen høy
- Se på et punkt foran deg
- Hold hofta så rett som mulig
- Stå rolig i 20 sekunder
- Bytt bein
- Gjør samme antall runder på begge sider

MÅLET MED ØVELSEN:
- å bygge kontroll rundt hofte, kne og ankel
- å gjøre kroppen mer stabil før løping og retningsendringer
- å oppdage om den skadde siden fortsatt er usikker

DU SKAL KJENNE:
- at du må jobbe med balansen
- at fot, legg, hofte og lår samarbeider
- kontroll, ikke stress

DU SKAL IKKE KJENNE:
- smerte i bakside lår
- at du står og spenner hele kroppen
- at du må hoppe rundt hele tiden

VANLIGE FEIL:
- ser ned i gulvet hele tiden
- låser kroppen helt stivt
- lar hofta falle ut til siden
- gir opp med en gang man mister litt balanse

STOPP HVIS:
- det gjør vondt
- du mister kontroll så mye at øvelsen blir kaos
- du føler deg ustabil på en måte som ikke føles trygg

TIPS:
- små justeringer er normalt
- fokusér på ro, ikke perfeksjon
- jo roligere du står, jo bedre kvalitet`
    },

    {
      t: "Lett løp",
      d: "5 x 10m",
      i: `SLIK GJØR DU:
- Stå klart i rolig startposisjon
- Løp 10 meter i kontrollert fart
- Start rolig og bygg litt fart, men ikke maks
- Gå tilbake som pause
- Gjenta 5 ganger

MÅLET MED ØVELSEN:
- å teste hvordan bakside lår tåler løp
- å komme tilbake til løpsfølelse
- å bygge trygghet før raskere sprint

DU SKAL KJENNE:
- at løpet føles kontrollert
- at du tør å sette i bakken normalt
- at kroppen jobber uten frykt

DU SKAL IKKE KJENNE:
- smerte når du øker farten
- at du holder igjen fordi det føles utrygt
- napp i frasparket

VANLIGE FEIL:
- starter for hardt
- prøver å løpe maks “for å teste”
- tar for lange steg
- hopper over pausen

STOPP HVIS:
- du kjenner smerte
- du begynner å halte eller beskytte beinet
- du kjenner at kroppen låser seg

TIPS:
- tenk “rolig, lett, kontrollert”
- det skal se naturlig ut
- hvis du er usikker, er du ikke klar for neste nivå ennå`
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
- trenger å teste fart og fotballbevegelse før full retur

MÅLET HER ER:
- å gå fra kontrollert trening til kampnære bevegelser
- å sjekke at kroppen tåler sprint, vending og spill
- å bli trygg før du er helt tilbake

VIKTIG:
- “nesten klar” er ikke det samme som “klar for full kamp”
- du skal fortsatt være ærlig med kroppen
- ingen grunn til å stresse siste del`
    },

    {
      t: "Sprint",
      d: "3 x 20m",
      i: `SLIK GJØR DU:
- Start i rolig stilling
- Løp 20 meter
- Første drag rolig kontrollert
- Andre drag litt raskere
- Tredje drag nær kampfart hvis alt kjennes bra
- Gå tilbake og ta god pause mellom dragene

MÅLET MED ØVELSEN:
- å teste om bakside lår tåler høyere fart
- å gjøre overgangen mot vanlig sprint
- å kjenne om du kan løpe naturlig igjen

DU SKAL KJENNE:
- at du kan løpe uten å holde igjen for mye
- at stegene føles naturlige
- at kroppen svarer bra når du øker fart

DU SKAL IKKE KJENNE:
- napp
- smerte når du øker farten
- at du blir redd i frasparket

VANLIGE FEIL:
- går rett på høy fart i første drag
- hopper over pauser
- prøver å “bevise” at man er frisk
- løper med for lange steg

STOPP HVIS:
- du kjenner smerte
- du begynner å løpe skjevt
- du ikke tør å trykke til

TIPS:
- bygg fart gradvis
- siste drag skal bare være raskt hvis de første føles bra
- det er bedre å stoppe litt for tidlig enn litt for sent`
    },

    {
      t: "Retning",
      d: "5 runder",
      i: `SLIK GJØR DU:
- Løp noen meter frem
- Brems kontrollert
- Snu kroppen
- Løp tilbake
- Hold tyngdepunktet litt lavt når du skal stoppe og vende
- Gjenta 5 runder

MÅLET MED ØVELSEN:
- å teste hvordan bakside lår tåler bremsing og vending
- å gjøre kroppen klar for fotballbevegelser
- å kjenne om du har kontroll i retningsendring

DU SKAL KJENNE:
- at du kan stoppe og snu uten frykt
- at bevegelsen er kontrollert
- at kroppen føles stabil

DU SKAL IKKE KJENNE:
- smerte når du bremser
- napp når du skal vende
- at du holder igjen på den skadde siden

VANLIGE FEIL:
- går for hardt inn i vendingen
- stopper med stive bein
- mister balansen
- prøver å være for eksplosiv for tidlig

STOPP HVIS:
- det gjør vondt når du stopper
- det gjør vondt når du skyver fra igjen
- du føler deg ustabil

TIPS:
- korte steg inn i vendingen
- kontroll først, fart etterpå
- dette skal ligne fotball, men ikke være kaos`
    },

    {
      t: "Spill",
      d: "5 min",
      i: `SLIK GJØR DU:
- Spill rolig i liten periode
- Vær i bevegelse
- Ta med løp, stopp, vending og enkle fotballbevegelser
- Øk tempo litt hvis kroppen kjennes bra
- Ikke gå rett i full intensitet

MÅLET MED ØVELSEN:
- å teste hvordan kroppen fungerer i ekte spill
- å bygge trygghet før du er helt tilbake
- å kjenne om du er klar for vanlig trening eller kamp

DU SKAL KJENNE:
- at du tør å bevege deg normalt
- at kroppen svarer naturlig
- at du ikke tenker på bakside lår hele tiden

DU SKAL IKKE KJENNE:
- smerte
- frykt i hver aksjon
- at du holder igjen i løp eller vending

VANLIGE FEIL:
- går rett inn med for høy intensitet
- prøver å imponere
- ignorerer små varsler fra kroppen
- spiller for lenge når det egentlig holder med kort test

STOPP HVIS:
- du kjenner smerte
- du kjenner napp eller utrygghet
- kroppen føles verre jo lenger du holder på

TIPS:
- kort og kontrollert er nok
- det viktigste er hvordan det føles, ikke hvor hardt du går
- god retur handler om å være smart`
    }

  ],

  prevent: [

    {
      t: "Klar?",
      d: "Forebygging",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- ikke nødvendigvis er skadet nå
- vil unngå hamstringskade
- vil være bedre rustet for sprint og kamp

MÅLET HER ER:
- å gjøre bakside lår sterkere
- å tåle sprint bedre
- å redusere sjansen for at skaden kommer tilbake

VIKTIG:
- forebygging virker bare hvis du gjør det jevnlig
- dette er ikke noe du gjør én gang
- kvalitet og rutine er nøkkelen`
    },

    {
      t: "Nordic",
      d: "3 x 6",
      i: `SLIK GJØR DU:
- Stå på knærne på et mykt underlag
- Få noen til å holde anklene dine, eller fest beina under noe stabilt
- Hold kroppen lang og rett
- Len deg sakte frem
- Hold igjen med bakside lår så lenge du klarer
- Ta deg imot med hendene
- Kom rolig opp igjen

MÅLET MED ØVELSEN:
- å gjøre hamstring sterk i bremsende arbeid
- å bygge den typen styrke som beskytter mot sprintskade

DU SKAL KJENNE:
- tydelig, tung jobbing bak i lårene
- at du prøver å bremse deg ned

DU SKAL IKKE KJENNE:
- skarp smerte
- at du faller ukontrollert hver gang
- at du mister stillingen helt med en gang

VANLIGE FEIL:
- bøyer i hofta
- faller rett ned
- gjør øvelsen for raskt
- slurver fordi den er tung

STOPP HVIS:
- du kjenner smerte
- du mister kontroll fullstendig

TIPS:
- denne øvelsen er tung, og det er normalt
- litt kontroll er bra
- dette er en av de beste øvelsene for forebygging`
    },

    {
      t: "Sprint teknikk",
      d: "Korte steg",
      i: `SLIK GJØR DU:
- Løp med korte, raske steg
- Hold kroppen høy og aktiv
- Bruk armene godt
- Tenk at foten treffer bakken raskt og lett
- Ikke strekk beinet langt frem foran deg

MÅLET MED ØVELSEN:
- å løpe på en måte som gir bedre kontroll
- å unngå at bakside lår blir utsatt for unødvendig stress
- å gjøre sprinten mer effektiv

DU SKAL KJENNE:
- rytme
- flyt
- raske steg uten at du “drar” beinet frem

DU SKAL IKKE KJENNE:
- at du overstrider
- at du lander tungt foran kroppen
- at sprinten føles stiv og lang

VANLIGE FEIL:
- for lange steg
- prøver å nå bakken langt foran kroppen
- lite armbruk
- stiv overkropp

STOPP HVIS:
- du kjenner smerte i bakside lår
- teknikken faller helt sammen når du prøver å øke fart

TIPS:
- raske, korte steg er bedre enn lange steg
- tenk rytme, ikke bare kraft
- god sprintteknikk beskytter også kroppen`
    },

    {
      t: "Oppvarming",
      d: "Alltid",
      i: `SLIK GJØR DU:
- Start med rolig bevegelse
- Gjør dynamiske bevegelser for hofte og lår
- Øk tempo gradvis
- Gjør korte akselerasjoner før du sprinter maks
- Gå fra rolig til raskt, ikke rett på fullt

MÅLET MED ØVELSEN:
- å gjøre kroppen varm før fart
- å forberede bakside lår på belastning
- å redusere risikoen for skade

DU SKAL KJENNE:
- at kroppen blir varm
- at bevegelsene føles lettere
- at du er klar før høy fart

DU SKAL IKKE KJENNE:
- at du er kald og stiv når du sprinter
- at du går rett fra stillestående til maks fart

VANLIGE FEIL:
- hopper over oppvarming
- gjør den for kort
- går rett i sprint
- slurver i de siste forberedelsene før kamp

STOPP HVIS:
- du merker at kroppen ikke er klar for fart ennå

TIPS:
- oppvarming er ikke pynt, det er beskyttelse
- jo høyere fart du skal opp i, jo viktigere er god oppvarming
- mange skader skjer fordi spillere går for tidlig på fullt`
    }

  ]

};

/* TIPS */

const tips = [
  "Ikke tren gjennom smerte",
  "Kvalitet er viktigere enn fart",
  "Ta deg god tid",
  "Kontroll først",
  "Stopp hvis du kjenner smerte"
];

/* START */

function startPhase(type){
	
	// 🔥 TVING FULL RESET FRA TEST
mode = "workout";
inGameTest = false;

// fjern test UI
yesBtn.style.display = "none";
noBtn.style.display = "none";

// sørg for riktig knapp
nextBtn.style.display = "block";

// fjern test-progress hvis finnes
if(progressWrap){
  progressWrap.style.display = "block";
}

// reset step tekst (kritisk)
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

  // 🔥 viktig
nextBtn.style.display = "block";
yesBtn.style.display = "none";
noBtn.style.display = "none";
nextBtn.innerText = "NESTE";
nextBtn.onclick = nextExercise; // 🔥 viktig

/* NIVÅ TEKST */
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
  almost: "2–3 ganger i uka. Forbered deg på løping.",
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

  // 🔥 ALLTID overskriv step
  step.innerText = "Øvelse " + (i+1) + " av " + exercises.length;

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
  desc.innerText =
    finishText[currentLevel] + "\n\n" +
    nextStep[currentLevel];

  nextBtn.innerText = "TILBAKE";

  nextBtn.onclick = () => {
	   resetUI();
    workoutScreen.classList.remove("active");
    startScreen.classList.add("active");

    document.body.classList.remove("testMode");

    document.getElementById("hint").style.display = "block";
    tipEl.style.display = "block";

    nextBtn.onclick = nextExercise; // reset
  };
}

if(nextBtn){
  nextBtn.onclick = nextExercise;
}

/* MODAL (forklaring) */

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
    resetUI();   // ✅ riktig sted
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
  testStep = -1; // viktig
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

- Sprint er siste steg – ikke rush det`;

  step.innerText = ""; // viktig reset

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
  step.innerText = "Test " + (testStep+1) + " av " + testFlow.length;

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
  } 
  else if(inGameTest){
    nextGameTest(true);
  }
};

noBtn.onclick = () => {
  if(mode === "test"){
    nextTest(false);
  } 
  else if(inGameTest){
    nextGameTest(false);
  }
};

}


function nextTest(answer){
  answers.push(answer);

  const failMap = [
    "pain",     // smerte
    "better",   // aktivering
    "better",   // kontroll
    "almost",   // jogg
    "almost",   // akselerasjon
    "almost",   // sprint
    "ready"     // retningsendring
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

  const text = {
    pain: "Start på nivå: Har vondt",
    better: "Start på nivå: Føles litt bedre",
    almost: "Start på nivå: Nesten klar",
    ready: "Start på nivå: Klar for spill",
    prevent: "Du kan gå rett til forebygging"
  };

const resultMap = {
  pain: "Du må starte rolig og bygge opp igjen kroppen",
  better: "Du er på vei tilbake – bygg videre med kontroll",
  almost: "Du er nær – men ikke klar for høy fart ennå",
  ready: "Du kan gjøre testøkta",
  prevent: "Du er skadefri – jobb med forebygging"
};

desc.innerText = resultMap[recommendedLevel];

  nextBtn.style.display = "block";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  nextBtn.innerText = recommendedLevel === "ready"
  ? "START TESTØKT"
  : "START NIVÅ";

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
desc.innerText =
  "Spørsmål 1 av 3\n\n" +
  "Kjente du smerte under økta?";

  nextBtn.style.display = "none";
  yesBtn.style.display = "block";
  noBtn.style.display = "block";
  

  tipEl.innerText = "";
}

const questions = [
  "Kjente du smerte under økta?",
  "Holdt du igjen i sprint eller vending?",
  "Følte du deg utrygg i noen bevegelser?"
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

  // Hvis noe er JA → ikke klar
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
  nextBtn.onclick = nextExercise;   // 🔥 viktig

  title.classList.remove("resultGood", "resultBad");
  exerciseBox.classList.remove("resultCard", "ready", "pain");

  document.getElementById("hint").style.display = "block";
  tipEl.style.display = "block";

  testStep = 0;
  answers = [];
  step.innerText = "";
  
}