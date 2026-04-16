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

const negativeQuestions = [1]; 
// index 1 = "Krampe-signal"

/* TEST FLOW */
const testFlow = [
  {
    t: "Smerte",
    d: "Kan du gå og være i ro uten smerte i leggen?",
    i: "Dette tester om leggen fortsatt er irritert i helt vanlige situasjoner. Reis deg opp, stå rolig og gå noen steg. Du skal kjenne etter om leggen gjør vondt når du står stille, går vanlig eller ruller over foten. Hvis du kjenner smerte, stikking, kraftig stramhet eller at du beskytter steget ditt, er du ikke klar for å gå videre."
  },
  {
    t: "Krampe-signal",
    d: "Kjenner du stramhet, små rykk eller at leggen vil låse seg?",
    i: "Dette er et viktig spørsmål fordi krampe ofte ikke kommer helt uten forvarsel. Mange kjenner først at leggen blir unormalt stram, at muskelen kjennes hard, eller at det kommer små rykninger og uro i området. Hvis du kjenner slike signaler allerede før belastning eller tidlig i bevegelse, er du ikke klar for å gå videre. TIDLIGE TEGN PÅ BEGYNNENDE KRAMPE kan være: at leggen strammer mer og mer, at den kjennes hard å ta på, at du endrer steget for å skåne den, eller at du føler at den når som helst kan låse seg."
  },
  {
    t: "Tåhev",
    d: "Kan du gjøre 15 rolige tåhev uten smerte eller krampefølelse?",
    i: "Stå oppreist med begge føtter i gulvet. Løft deg rolig opp på tærne, hold kontroll på toppen, og senk rolig ned igjen. Gjør dette 15 ganger. Dette tester om leggen tåler enkel belastning og om muskelen jobber normalt. Du skal ikke kjenne smerte, tydelig krampefølelse, låsing eller at du må stoppe fordi muskelen blir hard og utrygg."
  },
  {
    t: "Ettbeins kontroll",
    d: "Kan du stå på ett bein og gjøre 10 lette tåhev uten smerte?",
    i: "Stå på ett bein og løft deg rolig opp på tærne. Senk deg kontrollert ned igjen. Dette er tyngre enn vanlige tåhev og tester om leggen tåler mer belastning på egen side. Du skal ha kontroll, og du skal ikke kjenne skarp smerte, kraftig stramhet eller føle at muskelen er på vei til å låse seg."
  },
  {
    t: "Jogging",
    d: "Kan du jogge 2–3 minutter uten at leggen strammer mer og mer?",
    i: "Jogge rolig i to til tre minutter. Dette skal være lett og jevn jogging, ikke testing av fart. Målet er å kjenne om leggen tåler gjentatt belastning over litt tid. Hvis leggen gradvis blir hardere, strammere, begynner å murre eller du kjenner at steget ditt endrer seg, er du ikke klar for neste steg."
  },
  {
    t: "Akselerasjon",
    d: "Kan du løpe 5 korte drag med økende fart uten smerte eller krampe-tegn?",
    i: "Løp fem korte drag på omtrent ti til tjue meter. Start rolig på første drag og øk litt for hvert drag. Dette tester om leggen tåler mer kraft i frasparket. Du skal ikke kjenne at leggen trekker seg sammen, blir unormalt hard, begynner å rykke eller at du må holde igjen."
  },
  {
    t: "Sprint",
    d: "Kan du sprinte 2–3 ganger i høy fart uten smerte, låsing eller frykt?",
    i: "Løp to til tre sprint der du kommer opp i høy fart. Ta god pause mellom dragene. Dette er et viktig steg fordi leggkrampe og leggsmerter ofte merkes når du går opp i fart og trykker fra hardt. Du skal kunne sprinte naturlig uten at leggen låser seg, uten smerte og uten at du holder igjen fordi du er redd for hva som skjer."
  }
];

const data = {

  pain: [

    {
      t: "Klar?",
      d: "Start rolig",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har vondt i leggen
- kjenner tydelig stramhet eller krampefølelse
- har hatt krampe nylig eller føler at muskelen vil låse seg igjen
- ikke er klar for løping eller sprint

MÅLET HER ER:
- å roe ned leggen
- å få kontroll igjen
- å unngå at krampe eller smerte blir verre
- å bygge deg opp på nytt før du belaster mer

VIKTIG:
- du skal ikke presse gjennom smerte eller krampefølelse
- hvis leggen kjennes hardere og hardere, må du roe ned
- dette nivået handler om kontroll, ikke om å teste hvor mye du tåler`
    },

    {
      t: "Stopp og kjenn etter",
      d: "1–2 min",
      i: `SLIK GJØR DU:
- Stopp opp helt
- Stå rolig eller sett deg ned
- Kjenn etter hvordan leggen føles akkurat nå
- Prøv å være ærlig med kroppen

SE ETTER DISSE TIDLIGE TEGNENE:
- stramhet som bygger seg opp
- små rykninger i leggen
- at muskelen kjennes hard eller spent
- at du endrer steget for å avlaste
- at du er redd for å trykke fra

DETTE BETYR OFTE:
- at krampe er på vei
- at muskelen ikke tåler mer akkurat nå
- at du må roe ned før det låser seg helt

DU SKAL IKKE GJØRE:
- tenke “jeg prøver bare litt til”
- gå rett tilbake til sprint
- late som det går over hvis signalene blir tydeligere

TIPS:
- jo tidligere du reagerer, jo større sjanse for å stoppe det før full krampe
- mange får problemer fordi de ignorerer de første små tegnene`
    },

    {
      t: "Legg-strekk mot vegg",
      d: "3 x 20–30 sek",
      i: `SLIK GJØR DU:
- Stå vendt mot en vegg
- Sett hendene i veggen
- Sett det vonde beinet litt bak
- Hold hælen i bakken
- Len deg rolig frem til du kjenner et strekk i leggen
- Hold i 20–30 sekunder
- Slapp av og gjenta

MÅLET MED ØVELSEN:
- å roe ned spenning i leggen
- å minske følelsen av at muskelen vil låse seg
- å få muskelen til å slippe opp litt

DU SKAL KJENNE:
- et rolig strekk i leggen
- at spenningen kanskje blir litt mindre
- kontroll og ro

DU SKAL IKKE KJENNE:
- skarp smerte
- at det kjennes som om muskelen kramper mer
- at du rykker i strekket

VANLIGE FEIL:
- går for hardt inn i strekket
- spretter frem og tilbake
- løfter hælen fra bakken
- prøver å tvinge muskelen til å slippe

STOPP HVIS:
- smerten øker
- leggen begynner å rykke mer
- du føler at den låser seg

TIPS:
- rolig strekk virker bedre enn aggressivt strekk her
- pust rolig mens du holder`
    },

    {
      t: "Ankelpump",
      d: "3 x 15 per fot",
      i: `SLIK GJØR DU:
- Sett deg ned eller ligg
- Strekk beinet rolig ut
- Trekk tærne opp mot deg
- Press så foten rolig ned igjen
- Fortsett kontrollert frem og tilbake
- Gjør 15 repetisjoner

MÅLET MED ØVELSEN:
- å få i gang lett bevegelse i ankel og legg
- å øke sirkulasjonen
- å bevege muskelen uten stor belastning

DU SKAL KJENNE:
- lett aktivitet
- at ankelen og leggen beveger seg rolig
- ikke smerte

DU SKAL IKKE KJENNE:
- skarp smerte
- økende krampefølelse
- at du må presse hardt

VANLIGE FEIL:
- gjør det for fort
- klemmer til med full kraft
- stivner i hele beinet

STOPP HVIS:
- det øker i smerte
- muskelen begynner å trekke seg sammen
- bevegelsen føles utrygg

TIPS:
- små, rolige repetisjoner er nok
- dette handler om å roe ned og få flyt, ikke om å trene hardt`
    },

    {
      t: "Rolig gange",
      d: "3–5 min",
      i: `SLIK GJØR DU:
- Reis deg rolig opp
- Gå i vanlig, rolig tempo
- Ta korte steg
- Rull rolig over foten
- Hold skuldrene avslappet
- Gå i 3–5 minutter hvis det kjennes greit

MÅLET MED ØVELSEN:
- å få kroppen i bevegelse igjen
- å kjenne om leggen tåler vanlig belastning
- å unngå at du blir helt stiv

DU SKAL KJENNE:
- at kroppen blir litt varmere
- at steget kanskje flyter litt bedre etter hvert
- kontroll

DU SKAL IKKE KJENNE:
- at leggen strammer mer og mer
- at du halter tydelig
- at du må gå på tærne eller skåne steget

VANLIGE FEIL:
- går for fort
- tar for lange steg
- prøver å jogge “for å teste”
- ignorerer at leggen blir hardere

STOPP HVIS:
- du begynner å halte
- stramheten øker
- du kjenner begynnende krampe

TIPS:
- korte, rolige steg er bedre enn å presse frem lange steg
- hvis det føles verre jo lenger du går, må du ned i belastning`
    }

  ],

  better: [

    {
      t: "Klar?",
      d: "Føles litt bedre",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har mindre smerte enn før
- kan gå ganske normalt
- ikke kjenner krampe hele tiden
- fortsatt ikke er klar for hard løping eller sprint

MÅLET HER ER:
- å gjøre leggen tryggere
- å tåle litt mer belastning
- å bygge kontroll før du går videre

VIKTIG:
- dette er fortsatt ikke nivået for å pushe maks
- hvis krampefølelsen kommer tilbake, må du roe ned igjen
- progresjon er bra, men bare hvis kroppen faktisk tåler det`
    },

    {
      t: "Tåhev med begge bein",
      d: "3 x 12",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Hold deg gjerne lett i en vegg eller stol
- Løft deg rolig opp på tærne
- Hold toppen i ett sekund
- Senk rolig ned igjen
- Gjør 12 repetisjoner

MÅLET MED ØVELSEN:
- å styrke leggen rolig
- å få tilbake normal belastning
- å kjenne at muskelen tåler arbeid uten å låse seg

DU SKAL KJENNE:
- at leggen jobber
- kontroll hele veien opp og ned
- litt tyngre arbeid mot slutten uten smerte

DU SKAL IKKE KJENNE:
- skarp smerte
- krampefølelse
- at muskelen plutselig blir hard og låser seg

VANLIGE FEIL:
- går for fort opp og ned
- spretter
- lener kroppen for mye frem
- prøver å gjøre øvelsen eksplosiv for tidlig

STOPP HVIS:
- smerte kommer tilbake
- leggen begynner å rykke
- du mister kontroll

TIPS:
- tenk rolig opp, rolig ned
- kvalitet er viktigere enn høyde`
    },

    {
      t: "Sittende tåhev",
      d: "3 x 15",
      i: `SLIK GJØR DU:
- Sett deg på en stol
- Ha begge føtter i gulvet
- Løft hælene opp fra gulvet
- Senk rolig ned igjen
- Gjør 15 repetisjoner

MÅLET MED ØVELSEN:
- å trene leggen med litt mindre total belastning
- å få inn mange rolige repetisjoner
- å bygge toleranse uten å trigge krampe

DU SKAL KJENNE:
- jevnt arbeid i leggen
- rolig og kontrollert bevegelse
- at det er lettere enn stående tåhev

DU SKAL IKKE KJENNE:
- skarp smerte
- låsing
- at du må stoppe fordi muskelen blir hard

VANLIGE FEIL:
- stamper opp og ned
- løfter for raskt
- spenner hele kroppen

STOPP HVIS:
- du kjenner tydelig forverring
- leggen blir mer og mer anspent
- du mister kontroll på bevegelsen

TIPS:
- dette er en fin overgangsøvelse
- mange tåler denne bedre før de tåler tyngre stående arbeid`
    },

    {
      t: "Ettbeins balanse",
      d: "3 x 20 sek per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold kroppen høy
- Se på et punkt foran deg
- Prøv å holde balansen i 20 sekunder
- Bytt bein
- Gjenta

MÅLET MED ØVELSEN:
- å bygge kontroll rundt fot, ankel og legg
- å gjøre beinet tryggere før mer belastning
- å oppdage om den ene siden fortsatt er usikker

DU SKAL KJENNE:
- små justeringer i fot og legg
- at du jobber med kontroll
- stabilitet

DU SKAL IKKE KJENNE:
- smerte i leggen
- krampefølelse
- at du må hoppe rundt fordi du mister all kontroll

VANLIGE FEIL:
- låser hele kroppen helt stivt
- ser ned hele tiden
- gir opp med en gang det blir litt ustabilt

STOPP HVIS:
- det gjør vondt
- leggen kjennes mer og mer hard
- du føler deg utrygg

TIPS:
- små justeringer er normalt
- dette handler om ro og kontroll, ikke perfekt stillhet`
    },

    {
      t: "Lett gange på tær",
      d: "3 x 15 steg",
      i: `SLIK GJØR DU:
- Reis deg opp
- Løft hælene lett fra bakken
- Gå noen korte steg rolig på tærne
- Senk ned og hvil
- Gjør 15 steg per runde

MÅLET MED ØVELSEN:
- å venne leggen til mer aktiv belastning
- å teste kontroll
- å forberede deg på løp senere

DU SKAL KJENNE:
- tydelig arbeid i leggen
- at du må kontrollere hvert steg
- ikke smerte

DU SKAL IKKE KJENNE:
- at leggen låser seg
- krampefølelse
- skarp smerte

VANLIGE FEIL:
- går for langt
- går for fort
- prøver å “bevise” at du er bra igjen

STOPP HVIS:
- leggen strammer mer og mer
- du mister kontroll
- du føler at krampe er på vei

TIPS:
- korte steg er nok
- heller flere rolige runder enn én for hard`
    }

  ],

  almost: [

    {
      t: "Klar?",
      d: "Nesten klar",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- kan gå normalt
- tåler en del belastning
- har mindre eller ingen smerte i hvile
- kan gjøre rolige øvelser uten problemer
- fortsatt ikke er klar for full sprint eller kampintensitet

MÅLET HER ER:
- å gjøre leggen sterkere
- å tåle mer kraft i frasparket
- å gå fra kontrollert trening til løpsforberedelse

VIKTIG:
- det er lett å gå for fort frem her
- bare fordi det kjennes bedre, betyr det ikke at du er klar for maks belastning
- du må fortsatt reagere tidlig hvis leggen begynner å stramme`
    },

    {
      t: "Ettbeins tåhev",
      d: "3 x 8 per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold deg lett i noe hvis du trenger balanse
- Løft deg rolig opp på tærne
- Hold et lite øyeblikk på toppen
- Senk kontrollert ned igjen
- Gjør 8 repetisjoner

MÅLET MED ØVELSEN:
- å bygge styrke i leggen på én side
- å teste om den vonde siden tåler egen belastning
- å gjøre leggen klarere for løp og retningsendring

DU SKAL KJENNE:
- tydelig arbeid i leggen
- kontroll hele veien
- at det er tyngre enn med to bein

DU SKAL IKKE KJENNE:
- skarp smerte
- krampefølelse
- at muskelen blir unormalt hard

VANLIGE FEIL:
- spretter opp
- faller for fort ned
- bruker hofte og overkropp for å hjelpe for mye
- gjør for mange repetisjoner hvis kvaliteten faller

STOPP HVIS:
- du kjenner smerte
- det begynner å trekke til i leggen
- du mister kontroll

TIPS:
- tenk rolig og rent
- det er bedre med få gode repetisjoner enn mange dårlige`
    },

    {
      t: "Lett hopp på stedet",
      d: "3 x 15 sek",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Gjør små, lette hopp på stedet
- Hold rytmen rolig
- Land mykt
- Hvil mellom rundene

MÅLET MED ØVELSEN:
- å venne leggen til litt mer elastisk belastning
- å teste hvordan den reagerer på gjentatte små fraspark
- å forberede kroppen på løp

DU SKAL KJENNE:
- rytme
- lett spenst
- at leggen jobber uten å låse seg

DU SKAL IKKE KJENNE:
- smerte
- at leggen gradvis blir hardere
- begynnende krampe

VANLIGE FEIL:
- hopper for høyt
- går for lenge
- blir stiv i landingen
- ignorerer tidlige signaler

STOPP HVIS:
- leggen blir mer og mer stram
- du kjenner små rykk
- du mister flyt

TIPS:
- små hopp er nok
- målet er kontrollert reaksjon, ikke maks spenst`
    },

    {
      t: "Lett løp",
      d: "5 x 15m",
      i: `SLIK GJØR DU:
- Start rolig
- Løp 15 meter i kontrollert fart
- Gå tilbake som pause
- Gjenta 5 ganger
- Øk litt bare hvis det kjennes bra

MÅLET MED ØVELSEN:
- å teste hvordan leggen tåler løpsbevegelse
- å bygge trygghet
- å forberede deg på raskere løping

DU SKAL KJENNE:
- at løpet føles naturlig
- at du tør å rulle gjennom foten
- at leggen jobber uten å true med å låse seg

DU SKAL IKKE KJENNE:
- smerte
- økende stramhet for hvert drag
- at du må korte ned steget mye for å beskytte leggen

VANLIGE FEIL:
- starter for hardt
- prøver å løpe maks “for å teste”
- hopper over pauser
- presser selv om signalene blir dårligere

STOPP HVIS:
- leggen blir mer og mer hard
- du kjenner krampefølelse
- løpet ikke lenger ser naturlig ut

TIPS:
- rolig og jevn belastning er bedre enn én hard test`
    },

    {
      t: "Krampe-plan",
      d: "Lær signal + tiltak",
      i: `DETTE SKAL DU KUNNE FØR DU GÅR VIDERE:

TIDLIGE SYMPTOMER PÅ BEGYNNENDE KRAMPE:
- leggen blir uvanlig stram
- den kjennes hardere enn normalt
- små rykk eller “varsler”
- steget ditt begynner å endre seg
- du blir redd for å trykke fra

HVA DU SKAL GJØRE MED EN GANG:
- stopp eller ro ned
- strekk leggen rolig
- gå rolig noen steg
- rist lett løs
- ikke gå rett tilbake i høy fart

DETTE SKAL DU IKKE GJØRE:
- ignorere signalene
- tenke at det sikkert går over hvis du bare presser gjennom
- sprinte mens leggen allerede er i ferd med å låse seg

TIPS:
- en smart spiller reagerer tidlig
- mange fullfører seg rett inn i krampe fordi de venter for lenge`
    }

  ],

  ready: [

    {
      t: "Klar?",
      d: "Siste steg før trening",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har veldig lite eller ingen smerte
- tåler løping ganske bra
- er nærmere vanlig trening igjen
- trenger å teste fart og kampnære bevegelser før full retur

MÅLET HER ER:
- å teste om leggen tåler høyere fart
- å sjekke om du kan løpe, stoppe og vende uten problemer
- å være ærlig før du går tilbake til full belastning

VIKTIG:
- nesten klar er ikke det samme som klar for full kamp
- du skal fortsatt reagere på små signaler
- ingen grunn til å stresse siste del`
    },

    {
      t: "Sprint",
      d: "3 x 20m",
      i: `SLIK GJØR DU:
- Start i rolig stilling
- Løp 20 meter
- Første drag rolig
- Andre drag litt raskere
- Tredje drag nær kampfart hvis alt kjennes bra
- Gå tilbake og ta god pause

MÅLET MED ØVELSEN:
- å teste om leggen tåler høyere fart
- å kjenne om du kan trykke fra naturlig
- å se om fart trigger stramhet eller krampefølelse

DU SKAL KJENNE:
- at du kan løpe uten å holde igjen mye
- at frasparket føles normalt
- at leggen tåler belastningen

DU SKAL IKKE KJENNE:
- smerte
- at leggen blir hardere for hvert drag
- at du blir redd for at den skal låse seg

VANLIGE FEIL:
- går for hardt i første drag
- hopper over pauser
- prøver å bevise for mye
- ignorerer dårligere signaler på andre eller tredje drag

STOPP HVIS:
- du kjenner smerte
- leggen strammer kraftig
- du føler begynnende krampe

TIPS:
- bygg fart gradvis
- god pause er en del av testen`
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

MÅLET MED ØVELSEN:
- å teste om leggen tåler bremsing og nytt fraspark
- å gjøre kroppen klar for fotballbevegelse
- å kjenne om leggen holder under mer realistisk belastning

DU SKAL KJENNE:
- kontroll
- at du kan sette i foten normalt
- at du tør å skyve fra igjen

DU SKAL IKKE KJENNE:
- smerte når du bremser
- at leggen låser seg når du skal ut igjen
- tydelig frykt i frasparket

VANLIGE FEIL:
- går for hardt inn i vendingen
- stive steg
- blir for eksplosiv for tidlig
- ignorerer at leggen blir verre utover rundene

STOPP HVIS:
- det gjør vondt
- stramheten øker
- du ikke lenger stoler på beinet

TIPS:
- kontroll først, fart etterpå
- dette skal ligne fotball, men fortsatt være smart`
    },

    {
      t: "Spillnær bevegelse",
      d: "5 min",
      i: `SLIK GJØR DU:
- Beveg deg aktivt i noen minutter
- Ta med rolig løp, stopp, vending og små retningsskifter
- Øk litt hvis alt kjennes bra
- Ikke gå rett i full intensitet

MÅLET MED ØVELSEN:
- å teste hvordan leggen fungerer i mer ekte bevegelse
- å bygge trygghet før full trening
- å kjenne om du kan fokusere på spillet og ikke bare leggen

DU SKAL KJENNE:
- at kroppen flyter mer naturlig
- at du ikke tenker på leggen i hver aksjon
- at du tør å bevege deg normalt

DU SKAL IKKE KJENNE:
- smerte
- varsler om krampe
- at du holder igjen i hver aksjon

VANLIGE FEIL:
- går rett på for høy intensitet
- prøver å imponere
- spiller for lenge bare for å “teste litt mer”
- ignorerer små varsler

STOPP HVIS:
- du kjenner smerte
- du kjenner stramhet som bygger seg opp
- du mister trygghet

TIPS:
- kort og kontrollert er nok
- det viktigste er hvordan det føles, ikke hvor hardt det ser ut`
    }

  ],

  prevent: [

    {
      t: "Klar?",
      d: "Forebygging",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- ikke nødvendigvis har vondt nå
- vil unngå krampe og leggsmerter
- vil være bedre forberedt til trening og kamp

MÅLET HER ER:
- å gjøre leggen sterkere
- å reagere tidlig på signaler
- å ha gode rutiner før, under og etter kamp

VIKTIG:
- forebygging virker bare hvis du gjør det jevnlig
- dette er ikke noe du gjør én gang
- gode rutiner er ofte det som skiller de som får krampe ofte fra de som tåler mer`
    },

    {
      t: "Tåhev",
      d: "3 x 15",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Løft deg kontrollert opp på tærne
- Senk rolig ned igjen
- Gjør 15 repetisjoner

MÅLET MED ØVELSEN:
- å styrke leggen
- å gjøre muskelen bedre rustet til løp, sprint og hopp
- å bygge kapasitet over tid

DU SKAL KJENNE:
- tydelig arbeid i leggen
- kontroll
- at muskelen blir sterkere over tid

DU SKAL IKKE KJENNE:
- smerte
- krampefølelse
- at du spretter ukontrollert

TIPS:
- jevn styrke i leggen gjør det lettere å tåle kampbelastning
- dette er en enkel, men viktig basisøvelse`
    },

    {
      t: "Oppvarming før kamp",
      d: "Alltid",
      i: `FØR KAMP SKAL DU:
- starte rolig
- få kroppen varm
- gjøre dynamiske bevegelser for ankel, legg og fot
- øke tempo gradvis
- ta noen korte akselerasjoner før du går på høy fart

MÅLET:
- å gjøre leggen klar før hard belastning
- å redusere risikoen for at den låser seg når du plutselig må sprinte

DU SKAL IKKE:
- gå rett fra stillestående til maks sprint
- starte kamp med kalde muskler
- slurve i siste del av oppvarmingen

TIPS:
- jo kaldere og stivere du er når du begynner, jo større sjanse for problemer
- oppvarming er beskyttelse, ikke pynt`
    },

    {
      t: "Under kamp",
      d: "Reager tidlig",
      i: `UNDER KAMP SKAL DU KUNNE KJENNE IGJEN:
- unormal stramhet i leggen
- små rykk
- at leggen blir hard
- at steget forandrer seg
- at du blir redd for å trykke fra

HVIS DETTE SKJER:
- ro ned med en gang hvis mulig
- gå noen steg rolig
- strekk leggen kontrollert
- rist lett løs
- drikk hvis du har mulighet
- ikke gå rett tilbake til maks fart

DETTE ER VIKTIG:
- tidlig reaksjon kan stoppe full krampe
- hvis du venter til muskelen låser seg, er du mye dårligere stilt

TIPS:
- vær ærlig med signalene
- mange presser for lenge fordi de ikke vil ut av kamp`
    },

    {
      t: "Etter kamp",
      d: "Recovery",
      i: `ETTER KAMP BØR DU:
- gå eller jogge rolig ned
- gjøre lett bevegelighet for ankel og legg
- strekke rolig hvis det kjennes bra
- få i deg drikke
- la kroppen roe seg gradvis ned

MÅLET:
- å redusere stivhet
- å hjelpe muskulaturen å hente seg inn
- å være bedre rustet til neste økt

DU SKAL IKKE:
- bare stoppe helt brått hvis kroppen er helt kjørt
- ignorere at leggen er veldig stram etter kampen
- tenke at recovery ikke betyr noe

TIPS:
- god avslutning etter kamp kan gjøre stor forskjell neste dag
- dårlig recovery gjør det lettere å møte neste økt med slitne og stive legger`
    },

    {
      t: "Drikke og belastning",
      d: "Tenk smart",
      i: `KRAMPE HANDLER IKKE BARE OM ÉN TING.
DET KAN KOMME AV EN KOMBINASJON AV:
- høy belastning
- mye sprint
- trøtte muskler
- dårlig oppvarming
- for lite drikke
- at du ignorerer tidlige signaler

DETTE SKAL DU HUSKE:
- drikk jevnt gjennom dagen før kamp
- ikke vent til du allerede føler deg helt tørr
- hvis du vet at du ofte får krampe, må du være ekstra nøye med rutiner
- spillere som starter hardt uten å være klare, får ofte problemer tidligere

TIPS:
- tenk helhet
- sterk legg + god oppvarming + smart reaksjon + bra rutiner er mye bedre enn å bare prøve å strekke når problemet allerede er der`
    }

  ]

};

/* TIPS */
const tips = [
  "Reager tidlig på stramhet i leggen",
  "Ikke spill deg inn i full krampe",
  "Kvalitet er viktigere enn å pushe",
  "Kort pause tidlig er bedre enn full låsing senere",
  "Hvis steget ditt endrer seg, må du være ærlig",
  "Kontroll først",
  "Ignorer aldri små krampe-signaler"
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
    pain: ["NIVÅ 1", "Har vondt / krampe"],
    better: ["NIVÅ 2", "Føles litt bedre"],
    almost: ["NIVÅ 3", "Nesten klar"],
    ready: ["TESTØKT", "Siste sjekk før trening"],
    prevent: ["NIVÅ 5", "Forebygging"]
  };

  const levelInfo = {
    pain: "Rolig kontroll. Stopp tidlig hvis leggen vil låse seg.",
    better: "Bygg toleranse uten smerte eller krampefølelse.",
    almost: "Forbered leggen på løp og mer kraft.",
    ready: "",
    prevent: "Bygg rutiner før, under og etter kamp."
  };

  levelBig.innerText = levelMap[type][0];
  levelSmall.innerHTML = levelMap[type][1] + " - <br>" + levelInfo[type];

  if(type === "ready" && isTestWorkout){
    exercises[0].t = "TESTØKT";
    exercises[0].d = "Fullfør uten smerte, låsing eller krampe-tegn";
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
    pain: "Bra. Du har roet ned leggen og tatt kontroll i stedet for å presse videre.",
    better: "Bra. Du er på vei tilbake – fortsett med rolig og ærlig progresjon.",
    almost: "Bra. Du nærmer deg – men ikke gå for fort frem hvis leggen begynner å varsle.",
    prevent: "Bra. Dette er rutiner som gjør det lettere å holde deg unna krampe over tid."
  };

  const nextStep = {
    pain: "Gjør dette nivået flere ganger før du går videre.",
    better: "Fortsett her til alt kjennes stabilt og trygt.",
    almost: "Når dette føles lett → gå til testøkt.",
    prevent: "Fortsett jevnlig gjennom sesongen."
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

- JA = helt uten smerte, krampefølelse eller utrygghet
- NEI = hvis du kjenner noe, er usikker eller holder igjen

- Hvis leggen strammer mer og mer → stopp
- Hvis du kjenner små rykk eller låsing → stopp
- Ikke press deg gjennom varsler
- Ikke test hvor mye krampe du tåler

- Sprint er siste steg – ikke rush det`;

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
    "pain",     // krampe-signal
    "better",   // tåhev
    "better",   // ettbeins kontroll
    "almost",   // jogging
    "almost",   // akselerasjon
    "ready"     // sprint
  ];

  // 🔥 Sjekk om dette er et negativt spørsmål
  let isFail;

  if(negativeQuestions.includes(testStep)){
    // her betyr JA = fail
    isFail = (answer === true);
  } else {
    // vanlig spørsmål: NEI = fail
    isFail = (answer === false);
  }

  if(isFail){
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
  exerciseBox.classList.remove("ready", "pain");

  exerciseBox.classList.add(recommendedLevel === "ready" ? "ready" : "pain");

  const resultMap = {
    pain: "Du må starte rolig og roe ned leggen før du gjør mer.",
    better: "Du er på vei tilbake – bygg videre med kontroll.",
    almost: "Du er nær – men ikke klar for høy fart ennå.",
    ready: "Du kan gjøre testøkta.",
    prevent: "Du kan gå rett til forebygging."
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
    "Kjente du smerte eller tydelig stramhet i leggen under økta?";

  nextBtn.style.display = "none";
  yesBtn.style.display = "block";
  noBtn.style.display = "block";

  tipEl.innerText = "";
}

const questions = [
  "Kjente du smerte eller tydelig stramhet i leggen under økta?",
  "Holdt du igjen i sprint eller vending fordi du var redd for krampe eller låsing?",
  "Fikk du små krampe-signaler, rykk eller følelse av at leggen var på vei til å låse seg?"
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
      "Du kan delta på trening med full innsats.\n\n" +
      "Hvis du trener uten smerte, låsing eller krampe-signaler,\n" +
      "er du også mye nærmere å være klar for kamp.";
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
    document.body.classList.remove("testMode");
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
  document.getElementById("testProgress").innerText = "";
  document.body.classList.remove("testMode");
}