"use strict";

initRehabApp({
  name: "Kne",
  scopeShort: "For gradvis belastningsrelatert smerte foran/rundt kneskålen.",
  scope: "Dette opplegget er avgrenset til gradvis fremre knesmerte som typisk provoseres av løping, hopping, knebøy, trapper eller mye trening. Det skal ikke brukes som rehab for akutte vridningsskader, korsbånd, menisk, brudd eller et kne som er tydelig hovent, låser seg eller svikter etter skade.",
  painRuleShort: "Styr belastningen etter symptomer – litt ubehag kan være greit, forverring er ikke målet.",
  painRule: `Ved gradvis fremre knesmerte kan lett, kontrollert ubehag under styrke være akseptabelt dersom smerten ikke øker gjennom økta, bevegelsen er normal og kneet er tilbake på samme eller bedre nivå neste morgen.

Reduser dybde, motstand eller mengde dersom smerten øker. Stopp ved skarp smerte, ny hevelse, låsning, svikt eller tydelig halting. Løping, hopping og fotballbelastning skal bygges trinnvis.`,
  safetyQuestions: [
    {
      t: "Akutt vridning eller kontakt?",
      d: "Startet dette med en tydelig vridning/kollisjon, et popp/knepp, rask hevelse eller at kneet ga etter?",
      stop: "Dette passer ikke med enkel belastningsrelatert fremre knesmerte. Få kneet vurdert før du bruker dette opplegget."
    },
    {
      t: "Låsing eller stor hevelse?",
      d: "Er kneet tydelig hovent, låser seg slik at du ikke får bøyd/strukket normalt, eller klarer du ikke å belaste beinet?",
      stop: "Ikke test hopping eller løping. Dette bør vurderes av helsepersonell."
    },
    {
      t: "Vedvarende eller uvanlig smerte?",
      d: "Har du sterk hvilesmerte/nattsmerte, feber/rødme/varme i kneet eller smerte som blir raskt verre uten klar belastningsgrunn?",
      stop: "Symptombildet bør vurderes medisinsk før du følger et treningsopplegg i appen."
    }
  ],
  tests: [
    { t: "Hverdag", d: "Kan du gå og reise deg fra stol uten halting og uten mer enn lett smerte?", failLevel: "pain" },
    { t: "Knebøy", d: "Kan du gjøre 10 rolige knebøy til komfortabel dybde med jevn kontroll og uten økende smerte?", failLevel: "better" },
    { t: "Step-down", d: "Kan du gjøre 8 kontrollerte step-down fra et lavt trinn per side uten tydelig smerte eller svikt?", failLevel: "better" },
    { t: "Ettbeins knebøy", d: "Kan du gjøre 6 kontrollerte ettbeins knebøy til benk/stol per side?", failLevel: "almost" },
    { t: "Jogging", d: "Kan du jogge i 5–10 minutter uten at smerten bygger seg opp eller endrer steget?", failLevel: "almost" },
    { t: "Hopp", d: "Kan du gjøre 10 små ettbeinshopp og lande kontrollert uten tydelig smerte?", failLevel: "almost" },
    { t: "Retning", d: "Kan du akselerere, bremse og vende i moderat–høy fart uten smerte eller utrygghet?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      {
        t: "Belastningsjustering",
        d: "Reduser det som tydelig provoserer – behold aktivitet du tåler",
        i: "Målet er ikke full hvile. Reduser midlertidig mengden dype knebøy, hopp, harde løp eller annet som tydelig øker symptomene, og behold smerte-tolerert aktivitet."
      },
      {
        t: "Sitt-til-stå",
        d: "3 x 8–12",
        i: "Bruk en stol/benk som gir komfortabel dybde. Reis deg og sett deg rolig med jevn belastning."
      },
      {
        t: "Wall sit – grunn",
        d: "4 x 20–30 sek",
        i: "Stå mot vegg i en grunn knevinkel. Velg en vinkel som er komfortabel. Ikke gå dypere bare for å gjøre øvelsen tyngre."
      },
      {
        t: "Glute bridge",
        d: "3 x 10–12",
        i: "Løft hofta rolig og hold bekkenet stabilt."
      },
      {
        t: "Rolig sykkel/gange",
        d: "8–15 min hvis tolerert",
        i: "Velg aktivitet som holder deg i gang uten at smerten bygger seg opp."
      }
    ],
    better: [
      {
        t: "Knebøy til benk",
        d: "3 x 8–12",
        i: "Bruk en dybde du tåler og øk gradvis. Knær kan bevege seg naturlig over tærne; viktigst er kontroll og symptomrespons."
      },
      {
        t: "Step-up",
        d: "3 x 8 per side",
        i: "Stig kontrollert opp på et lavt trinn og senk rolig ned igjen. Øk høyden gradvis."
      },
      {
        t: "Split squat – kort",
        d: "3 x 6–8 per side",
        i: "Bruk kort bevegelsesutslag først. Hold balanse og jevn kontroll."
      },
      {
        t: "Sidegang / hofte",
        d: "3 x 10–15 steg per vei",
        i: "Med eller uten miniband. Hold bekkenet rolig og ta kontrollerte steg."
      },
      {
        t: "Jogg/gå",
        d: "10–15 min",
        i: "Bygg løping gradvis. Hvis smerten bygger seg opp, reduser fart eller varighet."
      }
    ],
    almost: [
      {
        t: "Ettbeins knebøy til benk",
        d: "3 x 6–8 per side",
        i: "Sett deg lett mot benk/stol og reis deg. Kontroller hele bevegelsen."
      },
      {
        t: "Step-down",
        d: "3 x 6–8 per side",
        i: "Senk motsatt hæl rolig mot gulvet fra et lavt trinn og press opp igjen."
      },
      {
        t: "Pogohopp",
        d: "3 x 20",
        i: "Små hopp med myk, rytmisk landing. Øk høyde først når det er komfortabelt."
      },
      {
        t: "Løpsprogresjon",
        d: "4 x 30 m: ca. 60–70–80–85 %",
        i: "God oppvarming og kontrollert økning."
      },
      {
        t: "Brems og vending",
        d: "2 x 4 per side",
        i: "Start med planlagt 45° vending og øk gradvis mot 90°."
      }
    ],
    ready: [
      {
        t: "Oppvarming",
        d: "8–10 min gradvis",
        i: "Rolig løp, dynamisk bevegelse, knebøy/utfall og progressive drag."
      },
      {
        t: "Ettbeins kontroll",
        d: "8 knebøy + 8 step-down per side",
        i: "Jevn kontroll og symptomrespons er viktigere enn å se helt identisk ut side til side."
      },
      {
        t: "Hopp og landing",
        d: "10 fremover + 10 sideveis",
        i: "Start med små hopp. Land kontrollert og øk gradvis."
      },
      {
        t: "Løp og retning",
        d: "6–8 aksjoner opp mot 90–95 %",
        i: "Kombiner akselerasjon, brems og planlagte vendinger."
      },
      {
        t: "Fotballsekvens",
        d: "8–10 min",
        i: "Ballarbeid, korte løp, vendinger og noen hopp/duell-lignende bevegelser i gradvis økende tempo."
      }
    ],
    prevent: [
      {
        t: "Split squat",
        d: "3 x 6–10 per side",
        i: "Bygg styrke i lår og hofte gjennom kontrollert ettbeinsarbeid."
      },
      {
        t: "Knebøy",
        d: "3 x 8–12",
        i: "Velg belastning og dybde som passer nivået."
      },
      {
        t: "Hofte og legg",
        d: "2–3 øvelser x 8–15",
        i: "Kombiner hoftearbeid, tåhev og ettbeinskontroll."
      },
      {
        t: "Hopp/landing",
        d: "2–3 x 6–10",
        i: "Kvalitet, myk landing og kontrollert retningsendring."
      },
      {
        t: "Fast oppvarmingsrutine",
        d: "2+ ganger per uke",
        i: "Et flerkomponent oppvarmingsopplegg med løp, styrke, balanse, hopp og retningsendring er mer robust skadeforebygging enn én enkelt kneøvelse."
      }
    ]
  },
  returnQuestions: [
    "Bygget knesmerten seg tydelig opp under løp, hopp eller vendinger?",
    "Holdt du igjen eller endret landingen/bevegelsen fordi kneet føltes utrygt?",
    "Var kneet tydelig mer irritert eller hovent mot slutten av testøkta?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelig forverring. Du kan starte gradert lagtrening. Øk først treningsmengde og deretter kampnære topper. For belastningsrelatert fremre knesmerte er reaksjonen senere samme dag og neste morgen spesielt viktig. Full trening bør tåles før kamp vurderes."
});
