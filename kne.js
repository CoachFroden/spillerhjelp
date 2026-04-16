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

/*
  Spørsmål som er negativt formulert:
  JA = dårlig / NEI = bra
*/
const negativeQuestions = [0, 2];

/* TEST FLOW */
const testFlow = [
  {
    t: "Smerte",
    d: "Har du vondt i kneet når du går, sitter eller reiser deg?",
    i: "Dette er første og viktigste sjekk. Mange med fremre knesmerte kjenner det ikke bare i trening, men også i vanlige situasjoner som når de går i trapper, sitter lenge, reiser seg fra stol eller går vanlig. Hvis kneet fortsatt gjør vondt her, betyr det at det fortsatt er irritert og ikke klar for mer belastning. DU SKAL IKKE kjenne stikk, trykk eller murring foran i kneet når du går eller reiser deg. Hvis du kjenner dette, må du starte roligere."
  },
  {
    t: "Bøy",
    d: "Kan du bøye kneet helt og rolig uten smerte?",
    i: "Stå rolig og bøy deg kontrollert ned. Du trenger ikke gå fort. Poenget er å kjenne om kneet tåler bevegelsen uten smerte og uten at du holder igjen. Dette tester om kneet tåler grunnleggende bøying før du går videre til mer belastning. DU SKAL KUNNE bøye kneet rolig med kontroll. DU SKAL IKKE kjenne stikk, trykk eller føle at kneet stopper deg på grunn av smerte."
  },
  {
    t: "Valgus",
    d: "Faller kneet innover når du gjør knebøy eller lander?",
    i: "Dette er veldig viktig. Når kneet faller innover, mister du kontroll i hofte, kne og fot. Det betyr ikke automatisk stor skade, men det er et tydelig tegn på at du ikke har god nok kontroll ennå. Se på kneet ditt når du gjør en rolig knebøy eller et lite hopp. Hvis kneet peker tydelig innover i stedet for rett over foten, er du ikke klar for neste steg. JA på dette spørsmålet er altså dårlig. NEI er bra."
  },
  {
    t: "Knebøy",
    d: "Kan du gjøre 10 rolige knebøy uten smerte og med god kontroll?",
    i: "Gjør 10 rolige knebøy. Beveg deg jevnt ned og opp igjen. Dette tester om kneet tåler vanlig belastning og om du klarer å holde teknikken når du gjør flere repetisjoner. DU SKAL KJENNE kontroll og jevn bevegelse. DU SKAL IKKE KJENNE smerte foran i kneet, at kneet faller innover, eller at du må jukse med kroppen for å komme opp."
  },
  {
    t: "Hopp",
    d: "Kan du gjøre 10 små hopp og lande mykt uten smerte?",
    i: "Dette tester om kneet tåler litt mer eksplosiv belastning. Gjør små hopp på stedet og fokuser på landingen. DU SKAL lande mykt, stille og kontrollert. DU SKAL IKKE lande tungt, bli stiv i kneet eller kjenne smerte foran i kneet. Hvis kneet ikke tåler små hopp, tåler det heller ikke kampbelastning."
  },
  {
    t: "Jogging",
    d: "Kan du jogge 2–3 minutter uten at kneet blir verre?",
    i: "Jogge rolig i to til tre minutter. Dette skal være lett og jevn jogging, ikke sprint. Målet er å se om kneet tåler gjentatt belastning over litt tid. DU SKAL IKKE kjenne at det bygger seg opp smerte, at du halter eller at du begynner å beskytte kneet. Hvis det blir verre jo lenger du holder på, er du ikke klar."
  },
  {
    t: "Sprint",
    d: "Kan du sprinte 2–3 ganger uten smerte eller at du holder igjen?",
    i: "Dette er siste steg. Løp to til tre sprint med god pause mellom. Målet er å kjenne om du tør å trykke til og om kneet tåler høyere fart. DU SKAL IKKE holde igjen, være redd for å trykke fra, eller kjenne smerte i kneet når du øker farten. Hvis du ikke stoler på kneet her, er du ikke klar for full retur."
  }
];

const data = {

  pain: [

    {
      t: "Klar?",
      d: "Start rolig",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har vondt i kneet
- kjenner smerte i vanlige situasjoner
- kjenner det når du går, sitter lenge, går i trapper eller prøver å bøye kneet
- ikke er klar for løping, hopping eller hard belastning

MÅLET HER ER:
- å roe ned kneet
- å unngå at irritasjonen blir verre
- å bygge opp kontroll igjen
- å komme tilbake steg for steg i stedet for å presse gjennom smerte

VIKTIG:
- ikke test kneet hele tiden
- ikke tren gjennom smerte
- hvis kneet gjør vondt i vanlige situasjoner, er det et tydelig tegn på at du må starte rolig
- dette nivået handler om å skape ro og kontroll, ikke om å være tøff`
    },

    {
      t: "Quad-spenn",
      d: "3 x 10 hold",
      i: `SLIK GJØR DU:
- Sitt eller ligg med beinet strakt
- Stram fremside lår så kneet presses lett ned
- Hold spennet i 3–5 sekunder
- Slapp av rolig
- Gjenta 10 ganger

MÅLET MED ØVELSEN:
- å aktivere fremside lår uten stor belastning på kneet
- å gi kneet støtte fra muskulaturen rundt
- å få tilbake kontakt og kontroll

DU SKAL KJENNE:
- at låret jobber
- et tydelig, men rolig spenn
- kontroll

DU SKAL IKKE KJENNE:
- skarp smerte i kneet
- at kneet blir verre jo flere repetisjoner du gjør
- at du må kompensere med hofte eller andre muskler

VANLIGE FEIL:
- spenner for kort tid
- presser for hardt hvis det gjør vondt
- holder pusten
- prøver å gjøre øvelsen “tøff” i stedet for kontrollert

STOPP HVIS:
- kneet gjør tydelig vondt
- smerten øker
- øvelsen føles mer irriterende enn nyttig

TIPS:
- dette er en enkel øvelse, men den er nyttig når kneet er irritert
- kvalitet og kontroll er viktigere enn kraft her`
    },

    {
      t: "Rett bein løft",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Ligg på ryggen
- Bøy det ene beinet og ha det andre strakt
- Stram låret på det strake beinet
- Løft beinet rolig opp
- Senk rolig ned igjen
- Gjenta kontrollert

MÅLET MED ØVELSEN:
- å aktivere fremside lår uten dyp knebøy
- å bygge støtte rundt kneet
- å gi deg en trygg måte å begynne å belaste igjen

DU SKAL KJENNE:
- arbeid i fremside lår
- kontroll
- rolig bevegelse

DU SKAL IKKE KJENNE:
- skarp smerte i kneet
- at kneet blir mer irritert
- at du må svinge beinet opp

VANLIGE FEIL:
- løfter for fort
- slipper beinet raskt ned
- slurver med å holde kneet strakt
- bruker fart i stedet for kontroll

STOPP HVIS:
- det gjør vondt i kneet
- bevegelsen føles utrygg
- smerten øker utover settet

TIPS:
- tenk rolig opp og rolig ned
- hold kvaliteten lik på hver repetisjon`
    },

    {
      t: "Hælglid",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Ligg på ryggen
- Strekk beinet rolig ut
- Dra hælen kontrollert inn mot rumpa
- Gå bare så langt det kjennes greit
- Strekk beinet rolig ut igjen
- Gjør 10 repetisjoner

MÅLET MED ØVELSEN:
- å få i gang bevegelse i kneet
- å gjøre knebøyingen mindre stiv
- å bygge trygghet i bevegelse

DU SKAL KJENNE:
- kontrollert bevegelse
- at kneet bøyer og strekker seg rolig
- lett aktivitet, ikke irritasjon

DU SKAL IKKE KJENNE:
- skarp smerte foran i kneet
- at kneet låser seg
- at du må tvinge bevegelsen

VANLIGE FEIL:
- drar for fort inn
- går for langt hvis det gjør vondt
- prøver å presse gjennom stivhet

STOPP HVIS:
- smerte øker
- kneet kjennes verre etterpå
- du må presse for å få det til

TIPS:
- små bevegelser er helt ok i starten
- dette handler om trygg bevegelse, ikke om å være tøff`
    },

    {
      t: "Sitt-til-stå",
      d: "3 x 8",
      i: `SLIK GJØR DU:
- Sett deg på en stol eller benk
- Reis deg rolig opp
- Sett deg rolig ned igjen
- Gjør det kontrollert
- Bruk hendene litt hvis du må i starten

MÅLET MED ØVELSEN:
- å trene en vanlig hverdagsbevegelse
- å bygge styrke i en trygg vinkel
- å gjøre kneet klarere for mer belastning senere

DU SKAL KJENNE:
- kontroll
- arbeid i lår og hofte
- at du kan reise deg uten å kaste kroppen opp

DU SKAL IKKE KJENNE:
- tydelig smerte foran i kneet
- at kneet kollapser innover
- at du “faller” ned i stolen

VANLIGE FEIL:
- går for fort
- skyver kneet langt frem ukontrollert
- bruker fart i stedet for styrke
- lar kneet falle innover

STOPP HVIS:
- det gjør vondt
- kneet blir mer irritert
- du mister kontroll

TIPS:
- tenk rolig ned, rolig opp
- god kontroll her er et fint tegn før du går videre`
    },

    {
      t: "Rolig gange",
      d: "5 min",
      i: `SLIK GJØR DU:
- Gå rolig i vanlig tempo
- Ta naturlige steg
- Hold overkroppen avslappet
- Ikke prøv å “teste” kneet
- Gå i 5 minutter hvis det kjennes greit

MÅLET MED ØVELSEN:
- å få kroppen i bevegelse igjen
- å kjenne om kneet tåler vanlig belastning
- å unngå at du blir stiv og forsiktig i alt du gjør

DU SKAL KJENNE:
- at kroppen blir litt varmere
- at gangen føles roligere etter hvert
- kontroll

DU SKAL IKKE KJENNE:
- at kneet gjør mer og mer vondt
- at du halter
- at du beskytter steget tydelig

VANLIGE FEIL:
- går for fort
- tar for lange steg
- prøver å jogge “bare litt”
- ignorerer at kneet blir verre

STOPP HVIS:
- smerten øker
- du begynner å halte
- kneet føles mer irritert for hvert minutt

TIPS:
- korte, rolige steg er bedre enn å pushe for mye
- vanlig gange er nok her`
    }

  ],

  better: [

    {
      t: "Klar?",
      d: "Føles litt bedre",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har mindre smerte enn før
- kan gå ganske normalt
- tåler vanlige bevegelser bedre
- fortsatt ikke er klar for hopping, sprint eller hard trening

MÅLET HER ER:
- å bygge mer styrke og kontroll
- å gjøre kneet tryggere
- å tåle litt mer belastning uten at smerten kommer tilbake

VIKTIG:
- selv om det føles bedre, betyr det ikke at du er klar for maks belastning
- hvis kneet blir verre igjen, må du ned et nivå
- det er vanlig at kneet føles bedre i starten og så blir irritert hvis du går for fort frem`
    },

    {
      t: "Knebøy til boks",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Stå foran en stol, benk eller kasse
- Gå rolig ned til du så vidt toucher underlaget
- Reis deg rolig opp igjen
- Hold brystet oppe
- Gjør 10 repetisjoner

MÅLET MED ØVELSEN:
- å trene knebøy med kontrollert dybde
- å bygge styrke uten å gå for tungt eller dypt for tidlig
- å trene kneet til å tåle mer belastning

DU SKAL KJENNE:
- arbeid i lår og hofte
- kontroll hele veien
- at kneet holder seg stabilt

DU SKAL IKKE KJENNE:
- skarp smerte foran i kneet
- at kneet faller innover
- at du “stuper” ned mot stolen

VANLIGE FEIL:
- går for fort ned
- spretter opp
- lar knærne falle innover
- bruker for mye fart

STOPP HVIS:
- det gjør vondt
- teknikken blir stygg
- kneet blir mer irritert utover settet

TIPS:
- sett deg ikke tungt ned, bare bruk boksen som kontroll
- tenk rolige repetisjoner med samme kvalitet hver gang`
    },

    {
      t: "Step-up",
      d: "3 x 8 per bein",
      i: `SLIK GJØR DU:
- Finn en lav kasse, trapp eller benk
- Sett én fot oppå
- Press deg kontrollert opp
- Senk rolig ned igjen
- Gjør 8 repetisjoner før du bytter bein

MÅLET MED ØVELSEN:
- å styrke kneet i énbeinsarbeid
- å bygge kontroll i hofte, kne og ankel
- å forberede deg på mer fotball-lik belastning

DU SKAL KJENNE:
- arbeid i lår, hofte og sete
- at du må kontrollere kneet
- jevn bevegelse

DU SKAL IKKE KJENNE:
- smerte foran i kneet
- at kneet faller innover
- at du må kaste kroppen opp

VANLIGE FEIL:
- bruker fart i stedet for styrke
- dytter mye fra med det nederste beinet
- mister balansen
- lar kneet falle innover på vei opp

STOPP HVIS:
- kneet gjør vondt
- du mister kontroll
- kvaliteten faller mye

TIPS:
- tenk at kneet peker samme vei som foten
- rolig og rent er bedre enn tungt`
    },

    {
      t: "Ettbeins balanse",
      d: "3 x 20 sek per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold kroppen høy
- Se på et punkt foran deg
- La kneet være lett bøyd
- Hold balansen i 20 sekunder
- Bytt bein

MÅLET MED ØVELSEN:
- å bygge kontroll rundt kneet
- å gjøre hofte, kne og fot bedre til å samarbeide
- å oppdage om den ene siden fortsatt er ustabil

DU SKAL KJENNE:
- små justeringer i fot, legg og hofte
- kontroll
- stabilitet

DU SKAL IKKE KJENNE:
- smerte i kneet
- at kneet vingler ukontrollert
- at du må hoppe rundt

VANLIGE FEIL:
- låser kneet helt stivt
- ser ned hele tiden
- gir opp med en gang det blir litt vanskelig
- lar hofta falle sammen

STOPP HVIS:
- det gjør vondt
- kneet føles ustabilt på en utrygg måte
- du ikke klarer å kontrollere beinet

TIPS:
- små justeringer er normalt
- ro og kontroll er målet, ikke perfeksjon`
    },

    {
      t: "Bro med hælpress",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Ligg på ryggen med knærne bøyd
- Sett føttene i gulvet
- Press hælene ned
- Løft hofta rolig opp
- Hold kort på toppen
- Senk rolig ned igjen

MÅLET MED ØVELSEN:
- å bygge støtte bak i kjeden
- å gi kneet hjelp fra hofte og bakside
- å redusere at kneet må ta alt alene

DU SKAL KJENNE:
- arbeid i rumpe og bakside lår
- stabilitet
- kontroll

DU SKAL IKKE KJENNE:
- smerte i kneet
- at korsryggen tar over
- ukontrollert bevegelse

VANLIGE FEIL:
- skyter hofta opp for fort
- overdriver høyden
- presser mest med tærne
- mister kontroll på vei ned

STOPP HVIS:
- kneet gjør vondt
- ryggen tar over
- du mister stabiliteten

TIPS:
- et sterkere bakside-sete-system gjør det lettere å holde kneet stabilt senere`
    }

  ],

  almost: [

    {
      t: "Klar?",
      d: "Nesten klar",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- kan gå normalt
- tåler en del belastning
- har lite eller ingen smerte i vanlige situasjoner
- fortsatt ikke er klar for full fart eller kamp

MÅLET HER ER:
- å bygge styrke og kontroll videre
- å gjøre kneet klarere for hopp, løp og vending
- å gå fra trygg trening til mer fotball-lik belastning

VIKTIG:
- dette er nivået der mange går for fort frem
- bare fordi kneet er mye bedre, betyr det ikke at du er klar for full trening
- du må fortsatt være ærlig hvis kneet blir irritert eller faller sammen i teknikken`
    },

    {
      t: "Utfall bakover",
      d: "3 x 8 per bein",
      i: `SLIK GJØR DU:
- Stå rett opp
- Ta ett rolig steg bakover
- Senk deg kontrollert ned
- Press deg rolig opp igjen
- Bytt side etter 8 repetisjoner

MÅLET MED ØVELSEN:
- å bygge styrke i ett bein av gangen
- å trene kontroll over kneet
- å gjøre kroppen klarere for mer dynamisk arbeid

DU SKAL KJENNE:
- arbeid i lår, hofte og sete
- kontroll
- at du må styre kneet aktivt

DU SKAL IKKE KJENNE:
- smerte foran i kneet
- at kneet faller innover
- at du mister balansen hele tiden

VANLIGE FEIL:
- tar for langt steg
- går for fort ned
- skyver kneet ukontrollert
- lar kroppen kollapse fremover

STOPP HVIS:
- det gjør vondt
- kneet kollapser innover
- du mister kontroll

TIPS:
- bakoverutfall er ofte litt snillere for kneet enn fremoverutfall
- tenk rolig og kontrollert hele veien`
    },

    {
      t: "Ettbeins sit-to-stand",
      d: "3 x 6 per bein",
      i: `SLIK GJØR DU:
- Sett deg på en stol eller benk
- Ha mest mulig vekt på ett bein
- Reis deg kontrollert opp
- Sett deg rolig ned igjen
- Gjør 6 repetisjoner per side

MÅLET MED ØVELSEN:
- å teste og bygge styrke i ett bein
- å sjekke om den skadde siden fortsatt er svakere
- å gjøre kneet klart for mer krevende bevegelse

DU SKAL KJENNE:
- tydelig arbeid i lår og hofte
- at du må kontrollere kneet
- stabilitet

DU SKAL IKKE KJENNE:
- smerte i kneet
- at kneet faller tydelig innover
- at du må kaste kroppen opp

VANLIGE FEIL:
- bruker begge bein uten å merke det
- går for fort
- lar kneet falle innover
- bruker sving og fart

STOPP HVIS:
- kneet gjør vondt
- du ikke klarer å holde kontroll
- kvaliteten blir dårlig

TIPS:
- dette er en veldig ærlig øvelse
- hvis den ene siden kollapser, er du ikke helt klar ennå`
    },

    {
      t: "Små hopp",
      d: "3 x 12",
      i: `SLIK GJØR DU:
- Gjør små hopp på stedet
- Land mykt hver gang
- Hold rytmen rolig
- Se om du klarer å holde kneet stabilt

MÅLET MED ØVELSEN:
- å gjøre kneet klarere for elastisk belastning
- å øve på kontroll i landingen
- å forberede kroppen på løp og vending

DU SKAL KJENNE:
- rytme
- lett og kontrollert landing
- at kneet holder seg stabilt

DU SKAL IKKE KJENNE:
- smerte
- tung landing
- at kneet faller innover når du lander

VANLIGE FEIL:
- hopper for høyt
- lander stivt
- mister kontrollen etter noen repetisjoner
- prøver å gjøre det eksplosivt for tidlig

STOPP HVIS:
- det gjør vondt
- kneet kollapser innover
- du mister myk landing

TIPS:
- myk landing er viktigere enn høyde
- tenk stille føtter og rolig kropp`
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
- å teste om kneet tåler løpsbevegelse
- å bygge trygghet i fraspark og landing
- å gjøre deg klarere for raskere arbeid

DU SKAL KJENNE:
- at løpet ser og føles naturlig ut
- at du tør å sette ned foten normalt
- at kneet holder seg rolig

DU SKAL IKKE KJENNE:
- smerte
- at kneet blir verre for hvert drag
- at du holder igjen i steget

VANLIGE FEIL:
- starter for hardt
- hopper over pauser
- prøver å teste maks fart
- ignorerer at kneet blir mer irritert

STOPP HVIS:
- du kjenner smerte
- du halter
- du ikke lenger løper naturlig

TIPS:
- rolig og jevn progresjon er bedre enn én hard test`
    },

    {
      t: "Stopp og vending",
      d: "3 runder",
      i: `SLIK GJØR DU:
- Løp noen meter frem
- Brems kontrollert ned
- Snu kroppen
- Løp tilbake
- Gjør dette 3 runder

MÅLET MED ØVELSEN:
- å teste kneet i mer fotball-lik belastning
- å se om det tåler bremsing og nytt fraspark
- å avsløre om kontrollen fortsatt svikter når ting blir mer dynamisk

DU SKAL KJENNE:
- kontroll
- at du kan bremse rolig uten smerte
- at kneet peker stabilt

DU SKAL IKKE KJENNE:
- smerte når du bremser
- at kneet faller inn
- at du blir redd for neste steg

VANLIGE FEIL:
- går for hardt inn i vendingen
- stopper med stive bein
- mister kontroll i kneet
- blir for eksplosiv for tidlig

STOPP HVIS:
- det gjør vondt
- kneet kollapser
- du ikke stoler på beinet

TIPS:
- kontroll først, fart etterpå
- dette skal ligne fotball, men fortsatt være smart`
    }

  ],

  ready: [

    {
      t: "Klar?",
      d: "Siste steg før trening",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har veldig lite eller ingen smerte
- tåler løping ganske bra
- kan gjøre flere øvelser uten problemer
- trenger å teste deg før full trening eller kamp

MÅLET HER ER:
- å teste om kneet tåler høyere fart
- å sjekke om det tåler bremsing, vending og spillnære bevegelser
- å være ærlig før du går tilbake til full belastning

VIKTIG:
- nesten klar er ikke det samme som klar for alt
- du skal fortsatt stoppe hvis kneet gir signaler
- ingen grunn til å stresse siste steg`
    },

    {
      t: "Sprint",
      d: "3 x 20m",
      i: `SLIK GJØR DU:
- Start rolig i første drag
- Øk litt i andre drag
- Kom opp i høyere fart i tredje hvis alt kjennes bra
- Gå tilbake og ta god pause mellom hvert drag

MÅLET MED ØVELSEN:
- å teste om kneet tåler høyere fart
- å se om du tør å trykke fra normalt
- å kjenne om kneet holder når belastningen øker

DU SKAL KJENNE:
- at du kan løpe naturlig
- at du tør å sette i bakken normalt
- at kneet tåler belastningen

DU SKAL IKKE KJENNE:
- smerte
- at du holder igjen
- at kneet kjennes ustabilt

VANLIGE FEIL:
- går rett på høy fart
- hopper over pauser
- prøver å bevise for mye
- ignorerer små signaler

STOPP HVIS:
- det gjør vondt
- du holder igjen
- kneet ikke føles trygt

TIPS:
- bygg fart gradvis
- siste drag skal bare være raskt hvis de første er bra`
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
- å teste kneet i retningsendring
- å se om det tåler bremsing og nytt fraspark
- å sjekke kontrollen når det ligner mer på fotball

DU SKAL KJENNE:
- at du kan stoppe og snu uten frykt
- at kneet holder seg stabilt
- kontroll i bevegelsen

DU SKAL IKKE KJENNE:
- smerte i bremsing
- at kneet faller innover
- at du holder igjen i vendingen

VANLIGE FEIL:
- går for hardt inn i vendingen
- stive steg
- blir for eksplosiv for tidlig
- mister kontroll på teknikken

STOPP HVIS:
- det gjør vondt
- kneet blir ustabilt
- du ikke stoler på det

TIPS:
- korte steg inn i vendingen gjør det lettere å holde kontroll
- dette skal være spillnært, men ikke kaos`
    },

    {
      t: "Hopp og land",
      d: "3 x 6",
      i: `SLIK GJØR DU:
- Gjør et litt større hopp enn tidligere nivå
- Land mykt med kontroll
- Hold kneet stabilt
- Gjenta 6 ganger per runde

MÅLET MED ØVELSEN:
- å teste om kneet tåler mer eksplosiv belastning
- å sjekke om du holder linjen i landingen
- å se om teknikken holder når du blir mer utfordret

DU SKAL KJENNE:
- kontroll
- myk landing
- at kneet peker godt over foten

DU SKAL IKKE KJENNE:
- smerte
- at kneet faller innover
- at du lander tungt eller stivt

VANLIGE FEIL:
- hopper for høyt for tidlig
- glemmer teknikk fordi man fokuserer på kraft
- lander stivt
- lar kneet falle sammen

STOPP HVIS:
- det gjør vondt
- du ikke klarer å lande kontrollert
- kneet kollapser innover

TIPS:
- en god landing sier mye om hvor klar du faktisk er
- myk og stabil er viktigere enn høyt`
    },

    {
      t: "Spillnær test",
      d: "5 min",
      i: `SLIK GJØR DU:
- Beveg deg aktivt i noen minutter
- Ta med løp, stopp, vending, små retningsskifter og lett spillbevegelse
- Øk tempo litt hvis alt føles bra
- Ikke gå rett i full intensitet

MÅLET MED ØVELSEN:
- å teste hvordan kneet fungerer i ekte bevegelse
- å bygge trygghet før full retur
- å kjenne om du kan fokusere på spillet og ikke bare kneet

DU SKAL KJENNE:
- at kroppen flyter naturlig
- at kneet ikke stjeler oppmerksomheten din
- at du tør å bevege deg normalt

DU SKAL IKKE KJENNE:
- smerte
- utrygghet
- at du holder igjen i hver aksjon

VANLIGE FEIL:
- går rett på for høy intensitet
- prøver å imponere
- spiller for lenge “for å teste litt mer”
- ignorerer små signaler

STOPP HVIS:
- det gjør vondt
- kneet blir mer og mer irritert
- du mister trygghet

TIPS:
- kort og kontrollert er nok
- det viktigste er hvordan det føles, ikke hvordan det ser ut`
    }

  ],

  prevent: [

    {
      t: "Klar?",
      d: "Forebygging",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- ikke nødvendigvis har vondt nå
- vil unngå knesmerter
- vil være bedre rustet for trening, hopp, sprint og vending

MÅLET HER ER:
- å gjøre kneet sterkere og mer stabilt
- å lære kroppen å lande og bremse bedre
- å bygge rutiner som gjør det lettere å holde seg skadefri

VIKTIG:
- forebygging virker bare hvis du gjør det jevnlig
- dette er ikke noe du gjør én gang
- sterkere lår, hofter og bedre kontroll betyr mye for kneet over tid`
    },

    {
      t: "Knebøy",
      d: "3 x 12",
      i: `SLIK GJØR DU:
- Stå med føttene omtrent hofte- eller skulderbredde
- Gå rolig ned i knebøy
- Hold brystet oppe
- Reis deg rolig opp igjen
- Gjør 12 repetisjoner

MÅLET MED ØVELSEN:
- å styrke lår og hofter
- å bygge grunnstyrke rundt kneet
- å gjøre det lettere å tåle løp og belastning

DU SKAL KJENNE:
- arbeid i lår og sete
- kontroll
- jevn bevegelse

DU SKAL IKKE KJENNE:
- smerte foran i kneet
- at kneet faller innover
- at du spretter ukontrollert opp

VANLIGE FEIL:
- går for fort
- lar knærne falle inn
- løfter hælene
- mister kontroll i bunnen

STOPP HVIS:
- det gjør vondt
- teknikken faller sammen

TIPS:
- god knebøyteknikk er en viktig base for mye annet
- tenk kontroll før dybde`
    },

    {
      t: "Landing",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Gjør et lite hopp
- Land mykt
- Hold kneet stabilt
- Gjenta 10 ganger

MÅLET MED ØVELSEN:
- å lære kroppen å ta imot kraft på en trygg måte
- å redusere unødvendig belastning på kneet
- å gjøre deg bedre rustet for kamp og trening

DU SKAL KJENNE:
- myk landing
- kontroll
- at kneet holder seg rolig og stabilt

DU SKAL IKKE KJENNE:
- smerte
- at kneet faller innover
- tung, stiv landing

VANLIGE FEIL:
- lander for tungt
- hopper høyere enn man kontrollerer
- glemmer knekontroll
- mister rytmen

STOPP HVIS:
- det gjør vondt
- du ikke kan holde kontrollen

TIPS:
- landingskontroll er en av de viktigste tingene for å forebygge kneproblemer`
    },

    {
      t: "Sidegang med kontroll",
      d: "3 x 10 steg hver vei",
      i: `SLIK GJØR DU:
- Stå med lett bøy i knærne
- Gå rolig sideveis noen steg
- Hold hofta stabil
- Hold kneet pekende samme vei som foten
- Gå tilbake andre veien

MÅLET MED ØVELSEN:
- å styrke hofte og sidekontroll
- å gjøre det lettere å hindre at kneet faller innover
- å bygge bedre stabilitet i retningsendringer

DU SKAL KJENNE:
- arbeid i hofte og sete
- kontroll i kneet
- stabilitet

DU SKAL IKKE KJENNE:
- smerte i kneet
- at kneet kollapser innover
- at overkroppen vingler mye

VANLIGE FEIL:
- tar for store steg
- mister hoftekontroll
- retter knærne helt ut
- slurver fordi det ser enkelt ut

STOPP HVIS:
- det gjør vondt
- du mister teknikken

TIPS:
- dette ser enkelt ut, men er veldig nyttig for knekontroll`
    },

    {
      t: "Oppvarming",
      d: "Alltid før økt",
      i: `FØR TRENING ELLER KAMP SKAL DU:
- starte rolig
- gjøre kroppen varm
- aktivere hofte, lår og ankler
- ta noen dynamiske bevegelser
- øke tempo gradvis
- ta noen korte løp før full fart

MÅLET:
- å gjøre kneet klart før hard belastning
- å redusere risikoen for at kneet blir irritert tidlig i økta
- å gjøre kroppen mer klar for hopp og retningsendring

DU SKAL IKKE:
- gå rett fra stillestående til maks fart
- hoppe over oppvarming
- slurve i siste del før høy intensitet

TIPS:
- oppvarming er beskyttelse
- jo bedre du forbereder kroppen, jo lettere er det å tåle belastning`
    },

    {
      t: "Kontrollhusk",
      d: "Det viktigste signalet",
      i: `DETTE SKAL DU HUSKE:
- kneet skal ikke falle tydelig innover
- du skal kunne lande mykt
- du skal kunne bremse med kontroll
- du skal ikke ignorere smerte foran i kneet

HVIS KNEET FALLER INNOVER OFTE:
- er det et tegn på at du mangler kontroll
- du bør jobbe mer med styrke og teknikk før du presser videre

HVIS DU KJENNER SMERTE OFTE:
- må du ikke bare tenke “det går sikkert over”
- du må reagere tidlig og justere belastningen

TIPS:
- mange knesmerter blir verre fordi spilleren fortsetter for lenge med dårlig kontroll
- sterk kropp + god landing + god bremsing + ærlig progresjon er mye bedre enn å bare tøye litt og håpe på det beste`
    }

  ]

};

/* TIPS */
const tips = [
  "Kneet skal peke samme vei som foten",
  "Ikke tren gjennom knesmerte",
  "Myk landing er viktigere enn høyt hopp",
  "Kontroll først, fart etterpå",
  "Hvis kneet faller innover, må du roe ned",
  "Kvalitet er viktigere enn å bevise noe",
  "Stopp hvis smerte øker"
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
    pain: "Ro ned kneet og bygg kontroll igjen.",
    better: "Bygg styrke uten å trigge smerte.",
    almost: "Forbered kneet på løp, hopp og vending.",
    ready: "",
    prevent: "Bygg styrke, landing og knekontroll over tid."
  };

  levelBig.innerText = levelMap[type][0];
  levelSmall.innerHTML = levelMap[type][1] + " - <br>" + levelInfo[type];

  if(type === "ready" && isTestWorkout){
    exercises[0].t = "TESTØKT";
    exercises[0].d = "Fullfør uten smerte, innoverfall eller utrygghet";
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
    pain: "Bra. Du har roet ned kneet og startet med kontroll i stedet for å presse gjennom smerte.",
    better: "Bra. Du er på vei tilbake – fortsett å bygge styrke og kontroll rolig.",
    almost: "Bra. Du nærmer deg – men gå ikke for fort frem hvis kneet mister kontroll.",
    prevent: "Bra. Dette er arbeid som gjør det lettere å holde kneet sterkt og stabilt over tid."
  };

  const nextStep = {
    pain: "Gjør dette nivået flere ganger før du går videre.",
    better: "Fortsett her til kneet kjennes stabilt og rolig.",
    almost: "Når dette føles lett og kontrollert → gå til testøkt.",
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

- JA = helt uten smerte og full kontroll
- NEI = hvis du kjenner noe, er usikker eller holder igjen

MEN:
- På spørsmål om smerte eller om kneet faller innover,
  er JA et dårlig svar

- Hvis det gjør vondt → stopp
- Hvis kneet faller tydelig innover → stopp
- Ikke press deg gjennom dårlige signaler
- Ikke test hvor mye smerte du tåler

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
    "pain",     // bøy
    "better",   // valgus
    "better",   // knebøy
    "almost",   // hopp
    "almost",   // jogging
    "ready"     // sprint
  ];

  let isFail;

  if(negativeQuestions.includes(testStep)){
    isFail = (answer === true);
  } else {
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
    pain: "Du må starte rolig og roe ned kneet før du gjør mer.",
    better: "Du er på vei tilbake – bygg videre med kontroll og styrke.",
    almost: "Du er nær – men ikke klar for full fart og full belastning ennå.",
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
    "Kjente du smerte i kneet under økta?";

  nextBtn.style.display = "none";
  yesBtn.style.display = "block";
  noBtn.style.display = "block";

  tipEl.innerText = "";
}

const questions = [
  "Kjente du smerte i kneet under økta?",
  "Holdt du igjen i sprint, hopp eller vending fordi kneet ikke føltes trygt?",
  "Falt kneet innover eller mistet du kontroll i noen bevegelser?"
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
      "Hvis du trener uten smerte og med god knekontroll,\n" +
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