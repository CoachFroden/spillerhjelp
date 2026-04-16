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
    d: "Har du vondt i ankelen når du går, står eller tråkker ned?",
    i: "Dette er første og viktigste sjekk. Mange med ankelproblem kjenner det ikke bare i trening, men også i vanlige situasjoner som når de går, står, går i trapper eller tråkker litt skjevt ned. Hvis ankelen fortsatt gjør vondt her, betyr det at den fortsatt er irritert og ikke klar for mer belastning. DU SKAL IKKE kjenne stikk, murring eller smerte rundt ankelen når du går eller står vanlig. Hvis du kjenner dette, må du starte roligere."
  },
  {
    t: "Bevegelse",
    d: "Kan du bevege ankelen opp, ned og sideveis uten smerte?",
    i: "Sitt eller stå rolig og beveg ankelen kontrollert. Trekk tærne opp mot deg, press foten rolig ned, og kjenn litt side til side uten å tvinge. Dette tester om ankelen har nok bevegelse før du går videre til mer belastning. DU SKAL KUNNE bevege ankelen rolig uten smerte og uten at den føles låst. DU SKAL IKKE kjenne stiv stopp, skarp smerte eller føle at ankelen ikke vil bevege seg."
  },
  {
    t: "Gir etter",
    d: "Kjennes ankelen ut som om den gir etter når du står på ett bein?",
    i: "Dette er veldig viktig. Mange som har vrikket ankelen kjenner ikke bare smerte, men også at ankelen ikke føles til å stole på. Stå på ett bein og kjenn etter. Hvis ankelen vingler ukontrollert, føles som om den kan svikte, eller du ikke tør å legge vekt normalt på den, er du ikke klar for neste steg. JA på dette spørsmålet er altså dårlig. NEI er bra."
  },
  {
    t: "Tåhev",
    d: "Kan du gjøre 10 rolige tåhev uten smerte og med god kontroll?",
    i: "Gjør 10 rolige tåhev. Løft deg kontrollert opp på tærne og senk rolig ned igjen. Dette tester om ankelen tåler vanlig belastning og om du klarer å holde kontroll når du gjør flere repetisjoner. DU SKAL KJENNE kontroll og jevn bevegelse. DU SKAL IKKE KJENNE smerte, at foten ruller ut, eller at du mister kontroll når du går opp eller ned."
  },
  {
    t: "Hopp",
    d: "Kan du gjøre 10 små hopp og lande mykt uten smerte?",
    i: "Dette tester om ankelen tåler litt mer eksplosiv belastning. Gjør små hopp på stedet og fokuser på landingen. DU SKAL lande mykt, rolig og kontrollert. DU SKAL IKKE miste balansen, lande tungt eller kjenne smerte i ankelen. Hvis ankelen ikke tåler små hopp, tåler den heller ikke kampbelastning."
  },
  {
    t: "Jogging",
    d: "Kan du jogge 2–3 minutter uten at ankelen blir verre?",
    i: "Jogge rolig i to til tre minutter. Dette skal være lett og jevn jogging, ikke sprint. Målet er å se om ankelen tåler gjentatt belastning over litt tid. DU SKAL IKKE kjenne at det bygger seg opp smerte, at ankelen blir mer og mer stiv, eller at du halter eller beskytter steget. Hvis det blir verre jo lenger du holder på, er du ikke klar."
  },
  {
    t: "Retning",
    d: "Kan du snu og endre retning uten smerte eller at ankelen føles ustabil?",
    i: "Dette er siste steg. Løp noen meter, brems, snu og løp tilbake igjen. Målet er å kjenne om du tør å stole på ankelen når det ligner mer på fotball. DU SKAL IKKE føle at ankelen svikter, holder igjen fordi du er redd, eller kjenne smerte når du bytter retning. Hvis du ikke stoler på ankelen her, er du ikke klar for full retur."
  }
];

const data = {

  pain: [

    {
      t: "Klar?",
      d: "Start rolig",
      i: `DETTE NIVÅET ER FOR DEG SOM:
- har vondt i ankelen
- kjenner smerte i vanlige situasjoner
- har vrikket ankelen eller kjenner at den fortsatt er irritert
- ikke er klar for løping, hopping eller hard belastning

MÅLET HER ER:
- å roe ned ankelen
- å unngå at irritasjonen blir verre
- å bygge opp bevegelse og kontroll igjen
- å komme tilbake steg for steg i stedet for å presse for tidlig

VIKTIG:
- ikke test ankelen hele tiden
- ikke tren gjennom smerte
- hvis ankelen gjør vondt i vanlige situasjoner, er det et tydelig tegn på at du må starte rolig
- dette nivået handler om å skape ro og trygghet, ikke om å bevise noe`
    },

    {
      t: "Ankelpump",
      d: "3 x 15",
      i: `SLIK GJØR DU:
- Sitt eller ligg med beinet rolig foran deg
- Trekk tærne opp mot deg
- Press så foten rolig ned igjen
- Gjenta kontrollert 15 ganger

MÅLET MED ØVELSEN:
- å få i gang bevegelse i ankelen
- å øke sirkulasjonen
- å gjøre ankelen mindre stiv uten stor belastning

DU SKAL KJENNE:
- lett bevegelse
- at ankelen jobber rolig
- kontroll

DU SKAL IKKE KJENNE:
- skarp smerte
- at ankelen låser seg
- at bevegelsen blir verre og verre

VANLIGE FEIL:
- gjør det for fort
- presser hardt ned hvis det gjør vondt
- spenner hele beinet unødvendig
- prøver å gjøre store bevegelser for tidlig

STOPP HVIS:
- smerten øker
- ankelen kjennes verre etter noen repetisjoner
- det føles utrygt

TIPS:
- små og rolige repetisjoner er nok
- dette handler om å få i gang ankelen, ikke om å trene hardt`
    },

    {
      t: "Sirkelkontroll",
      d: "3 x 8 hver vei",
      i: `SLIK GJØR DU:
- Sitt eller ligg
- Løft foten litt fra underlaget
- Lag små sirkler med ankelen
- Gjør 8 runder én vei og 8 den andre
- Hold bevegelsen rolig og kontrollert

MÅLET MED ØVELSEN:
- å bevege ankelen i flere retninger
- å bygge kontroll
- å redusere stivhet etter vrikk eller irritasjon

DU SKAL KJENNE:
- kontrollert bevegelse
- at ankelen jobber i flere vinkler
- lett aktivitet, ikke smerte

DU SKAL IKKE KJENNE:
- skarp smerte
- at ankelen låser seg i én retning
- at bevegelsen blir hakkete og utrygg

VANLIGE FEIL:
- lager for store sirkler
- går for fort
- presser inn i smerte
- bruker hele beinet i stedet for ankelen

STOPP HVIS:
- det gjør vondt
- ankelen blir mer irritert
- du mister kontroll

TIPS:
- små sirkler med god kontroll er bedre enn store og slurvete bevegelser`
    },

    {
      t: "Håndkle-krøll",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Sitt på en stol
- Legg et lite håndkle under foten
- Bruk tærne til å krølle håndkleet inn mot deg
- Slapp av og gjenta
- Gjør 10 repetisjoner

MÅLET MED ØVELSEN:
- å aktivere små muskler i fot og ankel
- å bygge mer kontroll i foten
- å støtte ankelen nedenfra

DU SKAL KJENNE:
- at tær og fot jobber
- lett aktivitet under foten
- kontroll

DU SKAL IKKE KJENNE:
- smerte i ankelen
- krampe i foten som ødelegger øvelsen
- at du må hjelpe mye med hele beinet

VANLIGE FEIL:
- gjør det for fort
- prøver å dra hele håndkleet i én bevegelse
- bruker for mye kraft
- mister kontroll

STOPP HVIS:
- ankelen gjør vondt
- foten blir mer irritert
- du mister kontroll på bevegelsen

TIPS:
- denne øvelsen ser liten ut, men kan være fin for å bygge tilbake kontroll etter vrikk`
    },

    {
      t: "Vektflytt",
      d: "3 x 20 sek",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Flytt vekten rolig fra side til side
- Kjenn at den vonde ankelen tar imot vekt rolig
- Hold bevegelsen kontrollert
- Gjenta i 20 sekunder

MÅLET MED ØVELSEN:
- å venne ankelen til belastning igjen
- å bygge trygghet når du legger vekt på foten
- å forberede deg på mer stående arbeid

DU SKAL KJENNE:
- at ankelen tar imot vekt rolig
- kontroll
- at du blir litt tryggere på å stå på den

DU SKAL IKKE KJENNE:
- skarp smerte
- at ankelen kollapser
- at du blir veldig redd for å legge vekt på den

VANLIGE FEIL:
- går for fort side til side
- kaster vekten over
- prøver å være for tøff for tidlig
- holder pusten og spenner hele kroppen

STOPP HVIS:
- smerten øker
- ankelen kjennes mer ustabil
- bevegelsen blir utrygg

TIPS:
- rolig vektflytt er et viktig steg før mer aktiv belastning`
    },

    {
      t: "Rolig gange",
      d: "5 min",
      i: `SLIK GJØR DU:
- Gå rolig i vanlig tempo
- Ta naturlige steg
- Rull rolig over foten
- Ikke prøv å teste ankelen
- Gå i 5 minutter hvis det kjennes greit

MÅLET MED ØVELSEN:
- å få kroppen i bevegelse igjen
- å kjenne om ankelen tåler vanlig belastning
- å unngå at du blir stiv og forsiktig i alt du gjør

DU SKAL KJENNE:
- at gangen kanskje blir litt friere etter hvert
- kontroll
- at du tør å tråkke ned mer normalt

DU SKAL IKKE KJENNE:
- at ankelen gjør mer og mer vondt
- at du halter
- at du holder igjen tydelig i hvert steg

VANLIGE FEIL:
- går for fort
- tar for lange steg
- prøver å jogge “bare litt”
- ignorerer at ankelen blir verre

STOPP HVIS:
- smerten øker
- du begynner å halte
- ankelen føles mer irritert for hvert minutt

TIPS:
- rolig og vanlig gange er nok her
- ikke stress frem progresjon`
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
- fortsatt ikke er klar for hopping, sprint eller harde vendinger

MÅLET HER ER:
- å bygge mer styrke og kontroll
- å gjøre ankelen tryggere
- å tåle litt mer belastning uten at smerten kommer tilbake

VIKTIG:
- selv om det føles bedre, betyr det ikke at ankelen er klar for full fart
- hvis ankelen blir verre igjen, må du ned et nivå
- ustabilitet er like viktig å ta på alvor som smerte`
    },

    {
      t: "Tåhev med begge bein",
      d: "3 x 12",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Hold deg gjerne lett i en vegg
- Løft deg kontrollert opp på tærne
- Hold kort på toppen
- Senk rolig ned igjen
- Gjør 12 repetisjoner

MÅLET MED ØVELSEN:
- å styrke legg og ankel
- å bygge mer kapasitet i fot og ankelledd
- å tåle vanlig belastning bedre

DU SKAL KJENNE:
- arbeid i legg og ankel
- kontroll opp og ned
- jevn bevegelse

DU SKAL IKKE KJENNE:
- smerte i ankelen
- at foten ruller ut eller inn ukontrollert
- at du mister balansen

VANLIGE FEIL:
- går for fort
- spretter
- lar vekten falle til én side
- presser videre selv om ankelen protesterer

STOPP HVIS:
- det gjør vondt
- ankelen kjennes ustabil
- du mister kontroll på vei ned

TIPS:
- tenk jevnt opp og jevnt ned
- kvaliteten i ankelen er viktigere enn hvor høyt du kommer`
    },

    {
      t: "Ettbeins balanse",
      d: "3 x 20 sek per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold kroppen høy
- Se på et punkt foran deg
- La ankelen jobbe rolig
- Hold i 20 sekunder
- Bytt bein

MÅLET MED ØVELSEN:
- å bygge stabilitet rundt ankelen
- å gjøre fot, ankel og legg bedre til å samarbeide
- å gjøre deg tryggere før mer krevende belastning

DU SKAL KJENNE:
- små justeringer i fot og ankel
- kontroll
- stabilitet

DU SKAL IKKE KJENNE:
- smerte
- at ankelen gir etter
- at du må hoppe rundt ukontrollert

VANLIGE FEIL:
- låser hele kroppen stivt
- ser ned hele tiden
- gir opp med en gang det vingler litt
- står for høyt og stivt i ankelen

STOPP HVIS:
- det gjør vondt
- ankelen føles utrygg
- du mister kontroll helt

TIPS:
- litt vingling er normalt
- poenget er å lære ankelen å kontrollere små justeringer`
    },

    {
      t: "Sidebevegelse",
      d: "3 x 10 hver vei",
      i: `SLIK GJØR DU:
- Stå med føttene litt fra hverandre
- Flytt vekten rolig mot høyre og venstre side
- Ta små side-steg hvis det føles greit
- Hold overkroppen rolig
- Gjenta 10 ganger til hver side

MÅLET MED ØVELSEN:
- å gjøre ankelen tryggere i sideveis belastning
- å forberede deg på mer fotball-lik bevegelse
- å bygge kontroll før raske vendinger

DU SKAL KJENNE:
- at ankelen tar imot vekt kontrollert
- stabilitet sideveis
- trygghet i små retningsendringer

DU SKAL IKKE KJENNE:
- smerte
- at ankelen kollapser ut til siden
- at du blir redd for å legge vekt på den

VANLIGE FEIL:
- går for fort
- tar for store steg
- kaster vekten over
- mister kontroll i fotstillingen

STOPP HVIS:
- det gjør vondt
- ankelen kjennes mer ustabil
- du mister kontroll

TIPS:
- små sidebevegelser med kontroll er mye bedre enn store og raske steg`
    },

    {
      t: "Mini knebøy",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Stå med begge føtter i gulvet
- Gå rolig litt ned i knebøy
- Reis deg rolig opp igjen
- Hold vekten jevnt på føttene
- Gjør 10 repetisjoner

MÅLET MED ØVELSEN:
- å bygge kontroll i hele beinet med fokus på ankel
- å gjøre ankelen tryggere når kne og hofte også er med
- å forberede kroppen på mer belastning

DU SKAL KJENNE:
- at du står stødig over foten
- kontroll
- jevn bevegelse

DU SKAL IKKE KJENNE:
- smerte i ankelen
- at ankelen ruller ut eller inn
- at du mister balansen

VANLIGE FEIL:
- går for dypt for tidlig
- lar føttene kollapse
- går for fort
- glemmer å holde kontroll over hele foten

STOPP HVIS:
- det gjør vondt
- ankelen ikke føles stabil
- du mister kontroll i bunnen

TIPS:
- ankelen skal føles som en stabil base her
- dette er et fint mellomsteg før mer dynamiske øvelser`
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
- å gjøre ankelen klarere for hopp, løp og vending
- å gå fra trygg trening til mer fotball-lik belastning

VIKTIG:
- dette er nivået der mange går for fort frem
- bare fordi ankelen er mye bedre, betyr det ikke at den er klar for full kamp
- hvis ankelen fortsatt kjennes ustabil, må du være ærlig med det`
    },

    {
      t: "Ettbeins tåhev",
      d: "3 x 8 per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold deg lett i noe hvis du må
- Løft deg kontrollert opp på tærne
- Hold et lite øyeblikk på toppen
- Senk rolig ned igjen
- Gjør 8 repetisjoner

MÅLET MED ØVELSEN:
- å bygge styrke i én ankel av gangen
- å teste om den vonde siden tåler mer egen belastning
- å gjøre deg klarere for løp og retningsendring

DU SKAL KJENNE:
- tydelig arbeid i legg og ankel
- kontroll
- at ankelen holder linjen

DU SKAL IKKE KJENNE:
- smerte
- at foten kollapser ut til siden
- at ankelen føles som den kan gi etter

VANLIGE FEIL:
- spretter opp
- faller for fort ned
- lar vekten gå for mye til ytterkant av foten
- bruker for mye fart

STOPP HVIS:
- det gjør vondt
- ankelen blir ustabil
- du mister kontroll

TIPS:
- dette er en ærlig øvelse
- hvis den skadde siden er mye svakere eller mer ustabil, er du ikke helt klar ennå`
    },

    {
      t: "Ettbeins hopp",
      d: "3 x 6 per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Gjør små, kontrollerte hopp
- Land mykt hver gang
- Hold kne og ankel stabile
- Gjør 6 repetisjoner per side

MÅLET MED ØVELSEN:
- å gjøre ankelen klarere for mer eksplosiv belastning
- å teste om du kan lande og stabilisere på én side
- å forberede deg på spill-lik bevegelse

DU SKAL KJENNE:
- rytme
- kontroll
- at ankelen holder seg stabil i landingen

DU SKAL IKKE KJENNE:
- smerte
- at ankelen gir etter
- at du må hoppe av fordi du mister balansen

VANLIGE FEIL:
- hopper for høyt for tidlig
- lander stivt
- mister kontroll etter de første repetisjonene
- fokuserer på høyde i stedet for landing

STOPP HVIS:
- det gjør vondt
- ankelen føles ustabil
- du ikke klarer å lande kontrollert

TIPS:
- myk landing og kontroll er viktigere enn høye hopp
- dette avslører fort om ankelen fortsatt mangler stabilitet`
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
- å teste om ankelen tåler løpsbevegelse
- å bygge trygghet når du setter ned foten i fart
- å gjøre deg klarere for raskere arbeid

DU SKAL KJENNE:
- at løpet ser og føles naturlig ut
- at du tør å tråkke ned normalt
- at ankelen holder seg rolig

DU SKAL IKKE KJENNE:
- smerte
- at ankelen blir verre for hvert drag
- at du holder igjen i steget

VANLIGE FEIL:
- starter for hardt
- hopper over pauser
- prøver å teste maks fart
- ignorerer at ankelen blir mer irritert

STOPP HVIS:
- du kjenner smerte
- du halter
- du ikke lenger løper naturlig

TIPS:
- rolig og jevn progresjon er bedre enn én hard test`
    },

    {
      t: "Sidehopp",
      d: "3 x 8",
      i: `SLIK GJØR DU:
- Stå rolig
- Hopp små steg side til side
- Land mykt hver gang
- Hold kontroll i ankel og fot
- Gjør 8 repetisjoner

MÅLET MED ØVELSEN:
- å gjøre ankelen klarere for sideveis belastning
- å teste hvordan den reagerer når du må stabilisere deg raskt
- å bygge trygghet i mer realistiske fotballbevegelser

DU SKAL KJENNE:
- at ankelen tar imot landingen kontrollert
- rytme
- stabilitet

DU SKAL IKKE KJENNE:
- smerte
- at ankelen vrir seg
- at du mister balansen helt

VANLIGE FEIL:
- hopper for langt
- lander tungt
- går for raskt frem
- glemmer kontroll i foten

STOPP HVIS:
- det gjør vondt
- ankelen føles som den vrir seg
- du mister kontroll

TIPS:
- små sidehopp med god kontroll er nok
- dette er et viktig steg før raske vendinger`
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
- å teste ankelen i mer fotball-lik belastning
- å se om den tåler bremsing og nytt fraspark
- å avsløre om kontrollen fortsatt svikter når ting blir mer dynamisk

DU SKAL KJENNE:
- kontroll
- at du kan bremse uten smerte
- at ankelen holder seg stabil

DU SKAL IKKE KJENNE:
- smerte når du bremser eller snur
- at ankelen svikter
- at du blir redd for neste steg

VANLIGE FEIL:
- går for hardt inn i vendingen
- stopper stivt
- mister kontroll over foten
- blir for eksplosiv for tidlig

STOPP HVIS:
- det gjør vondt
- ankelen kjennes ustabil
- du ikke stoler på den

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
- å teste om ankelen tåler høyere fart
- å sjekke om den tåler bremsing, vending og landinger
- å være ærlig før du går tilbake til full belastning

VIKTIG:
- nesten klar er ikke det samme som klar for alt
- du skal fortsatt stoppe hvis ankelen gir dårlige signaler
- utrygghet og “gir etter”-følelse er like viktig å ta på alvor som smerte`
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
- å teste om ankelen tåler høyere fart
- å se om du tør å trykke fra normalt
- å kjenne om ankelen holder når belastningen øker

DU SKAL KJENNE:
- at du kan løpe naturlig
- at du tør å sette ned foten normalt
- at ankelen tåler belastningen

DU SKAL IKKE KJENNE:
- smerte
- at du holder igjen
- at ankelen kjennes ustabil eller “løs”

VANLIGE FEIL:
- går rett på høy fart
- hopper over pauser
- prøver å bevise for mye
- ignorerer små signaler

STOPP HVIS:
- det gjør vondt
- du holder igjen
- ankelen ikke føles trygg

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
- å teste ankelen i retningsendring
- å se om den tåler bremsing og nytt fraspark
- å sjekke kontrollen når det ligner mer på fotball

DU SKAL KJENNE:
- at du kan stoppe og snu uten frykt
- at ankelen holder seg stabil
- kontroll i bevegelsen

DU SKAL IKKE KJENNE:
- smerte i bremsing
- at ankelen svikter eller vrir seg
- at du holder igjen i vendingen

VANLIGE FEIL:
- går for hardt inn i vendingen
- stive steg
- blir for eksplosiv for tidlig
- mister kontroll i foten

STOPP HVIS:
- det gjør vondt
- ankelen blir ustabil
- du ikke stoler på den

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
- Hold ankel og fot stabile
- Gjenta 6 ganger per runde

MÅLET MED ØVELSEN:
- å teste om ankelen tåler mer eksplosiv belastning
- å sjekke om du holder linjen i landingen
- å se om teknikken holder når du blir mer utfordret

DU SKAL KJENNE:
- kontroll
- myk landing
- at ankelen holder seg stabil over foten

DU SKAL IKKE KJENNE:
- smerte
- at ankelen vrir seg
- at du lander tungt eller stivt

VANLIGE FEIL:
- hopper for høyt for tidlig
- glemmer teknikk fordi man fokuserer på kraft
- lander stivt
- lar foten falle ut eller inn

STOPP HVIS:
- det gjør vondt
- du ikke klarer å lande kontrollert
- ankelen kjennes ustabil

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
- å teste hvordan ankelen fungerer i ekte bevegelse
- å bygge trygghet før full retur
- å kjenne om du kan fokusere på spillet og ikke bare ankelen

DU SKAL KJENNE:
- at kroppen flyter naturlig
- at ankelen ikke stjeler oppmerksomheten din
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
- ankelen blir mer og mer irritert
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
- vil unngå ankelproblemer og overtråkk
- vil være bedre rustet for trening, sprint, landing og vending

MÅLET HER ER:
- å gjøre ankelen sterkere og mer stabil
- å lære kroppen å lande og snu bedre
- å bygge rutiner som gjør det lettere å holde seg skadefri

VIKTIG:
- forebygging virker bare hvis du gjør det jevnlig
- dette er ikke noe du gjør én gang
- styrke, balanse og kontroll betyr mye for ankelen over tid`
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
- å styrke legg og ankel
- å gjøre muskler og sener bedre rustet til løp og hopp
- å bygge kapasitet over tid

DU SKAL KJENNE:
- tydelig arbeid i legg og ankel
- kontroll
- jevn bevegelse

DU SKAL IKKE KJENNE:
- smerte
- at foten ruller ukontrollert
- at du spretter

VANLIGE FEIL:
- går for fort
- bruker fart i stedet for kontroll
- fordeler vekten skjevt
- slurver fordi øvelsen ser enkel ut

STOPP HVIS:
- det gjør vondt
- ankelen kjennes ustabil

TIPS:
- en sterkere ankel og legg tåler mer kampbelastning`
    },

    {
      t: "Balanse",
      d: "3 x 30 sek per bein",
      i: `SLIK GJØR DU:
- Stå på ett bein
- Hold kroppen høy
- Se frem
- La ankelen jobbe rolig
- Hold i 30 sekunder
- Bytt bein

MÅLET MED ØVELSEN:
- å bygge stabilitet
- å gjøre ankelen bedre på små justeringer
- å forebygge at den “gir etter” når du lander eller vrir

DU SKAL KJENNE:
- små justeringer i fot og ankel
- kontroll
- stabilitet

DU SKAL IKKE KJENNE:
- smerte
- at ankelen svikter
- at du hopper rundt for å redde balansen

VANLIGE FEIL:
- låser hele kroppen
- ser ned hele tiden
- gir opp for fort
- gjør øvelsen uten fokus

STOPP HVIS:
- det gjør vondt
- ankelen kjennes utrygg

TIPS:
- denne øvelsen er enkel å gjøre ofte, og den er veldig nyttig over tid`
    },

    {
      t: "Sidehopp",
      d: "3 x 10",
      i: `SLIK GJØR DU:
- Gjør små hopp side til side
- Land mykt
- Hold ankel og fot stabile
- Gjenta 10 ganger

MÅLET MED ØVELSEN:
- å gjøre ankelen bedre rustet for sideveis belastning
- å forberede deg på retningsendringer
- å bygge kontroll i mer kamp-lik bevegelse

DU SKAL KJENNE:
- rytme
- kontroll
- stabile landinger

DU SKAL IKKE KJENNE:
- smerte
- at ankelen vrir seg
- at du lander tungt

VANLIGE FEIL:
- hopper for langt
- går for fort
- lander stivt
- mister kontroll i foten

STOPP HVIS:
- det gjør vondt
- ankelen kjennes ustabil

TIPS:
- små kontrollerte hopp er bedre enn store og kaotiske`
    },

    {
      t: "Oppvarming",
      d: "Alltid før økt",
      i: `FØR TRENING ELLER KAMP SKAL DU:
- starte rolig
- gjøre kroppen varm
- aktivere fot, ankel, legg og hofte
- ta noen dynamiske bevegelser
- øke tempo gradvis
- ta noen korte løp før full fart

MÅLET:
- å gjøre ankelen klar før hard belastning
- å redusere risikoen for at den blir irritert eller vrir seg tidlig
- å gjøre kroppen mer klar for hopp og vending

DU SKAL IKKE:
- gå rett fra stillestående til maks fart
- hoppe over oppvarming
- slurve i siste del før høy intensitet

TIPS:
- oppvarming er beskyttelse
- jo bedre du forbereder ankelen, jo lettere er det å tåle belastning`
    },

    {
      t: "Kontrollhusk",
      d: "Det viktigste signalet",
      i: `DETTE SKAL DU HUSKE:
- ankelen skal ikke kjennes løs eller som om den gir etter
- du skal kunne lande mykt
- du skal kunne snu uten frykt
- du skal ikke ignorere smerte eller ustabilitet

HVIS ANKELEN OFTE FØLES UTRYGG:
- er det et tegn på at du mangler kontroll
- du bør jobbe mer med styrke og balanse før du presser videre

HVIS DU KJENNER SMERTE OFTE:
- må du ikke bare tenke “det går sikkert over”
- du må reagere tidlig og justere belastningen

TIPS:
- mange ankelproblemer blir verre fordi spilleren går for fort tilbake
- sterk ankel + god balanse + gode landinger + ærlig progresjon er mye bedre enn å bare tape opp og håpe på det beste`
    }

  ]

};

/* TIPS */
const tips = [
  "Ankelen skal føles stabil når du lander",
  "Ikke løp fra smerte eller ustabilitet",
  "Myk landing er viktigere enn høyt hopp",
  "Kontroll først, fart etterpå",
  "Hvis ankelen gir etter, må du roe ned",
  "Kvalitet er viktigere enn å bevise noe",
  "Stopp hvis smerte eller ustabilitet øker"
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
    pain: "Ro ned ankelen og bygg kontroll igjen.",
    better: "Bygg styrke uten å trigge smerte eller ustabilitet.",
    almost: "Forbered ankelen på løp, hopp og vending.",
    ready: "",
    prevent: "Bygg styrke, landing og stabilitet over tid."
  };

  levelBig.innerText = levelMap[type][0];
  levelSmall.innerHTML = levelMap[type][1] + " - <br>" + levelInfo[type];

  if(type === "ready" && isTestWorkout){
    exercises[0].t = "TESTØKT";
    exercises[0].d = "Fullfør uten smerte, svikt eller utrygghet";
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
    pain: "Bra. Du har roet ned ankelen og startet med kontroll i stedet for å presse gjennom smerte.",
    better: "Bra. Du er på vei tilbake – fortsett å bygge styrke og stabilitet rolig.",
    almost: "Bra. Du nærmer deg – men gå ikke for fort frem hvis ankelen fortsatt er ustabil.",
    prevent: "Bra. Dette er arbeid som gjør det lettere å holde ankelen sterk og stabil over tid."
  };

  const nextStep = {
    pain: "Gjør dette nivået flere ganger før du går videre.",
    better: "Fortsett her til ankelen kjennes stabil og rolig.",
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
- På spørsmål om smerte eller om ankelen gir etter,
  er JA et dårlig svar

- Hvis det gjør vondt → stopp
- Hvis ankelen føles ustabil eller gir etter → stopp
- Ikke press deg gjennom dårlige signaler
- Ikke test hvor mye utrygghet du tåler

- Retningsendring er siste steg – ikke rush det`;

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
    "pain",     // bevegelse
    "better",   // gir etter
    "better",   // tåhev
    "almost",   // hopp
    "almost",   // jogging
    "ready"     // retning
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
    pain: "Du må starte rolig og roe ned ankelen før du gjør mer.",
    better: "Du er på vei tilbake – bygg videre med kontroll og stabilitet.",
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
    "Kjente du smerte i ankelen under økta?";

  nextBtn.style.display = "none";
  yesBtn.style.display = "block";
  noBtn.style.display = "block";

  tipEl.innerText = "";
}

const questions = [
  "Kjente du smerte i ankelen under økta?",
  "Holdt du igjen i sprint, hopp eller vending fordi ankelen ikke føltes trygg?",
  "Kjentes ankelen ustabil ut eller som om den kunne gi etter i noen bevegelser?"
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
      "Hvis du trener uten smerte og med god ankelkontroll,\n" +
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