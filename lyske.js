"use strict";

initRehabApp({
  name: "Lyske",
  scopeShort: "For typisk adduktorrelatert smerte på innsiden av lår/lyske.",
  scope: "Dette opplegget passer best ved typisk adduktorrelatert lyskesmerte etter løping, vendinger eller spark. Lyskeregionen kan også gi symptomer fra hofte, bukvegg, brokk, pubis eller andre strukturer, så selvtesten skal ikke brukes som diagnose.",
  painRuleShort: "Rolig adduktorstyrke kan gi lett ubehag – fart og spark skal bygges gradvis.",
  painRule: `Ved kontrollert styrke kan lett og stabilt ubehag være akseptabelt dersom det ikke øker gjennom økta, du ikke endrer bevegelsen og du er tilbake på samme eller bedre nivå neste morgen.

Stopp ved skarp smerte, plutselig kraftsvikt, økende smerte for hvert sett eller dersom du begynner å beskytte området. Rask løping, harde vendinger og kraftige spark skal være smertefrie før full fotballbelastning.`,
  safetyQuestions: [
    {
      t: "Kraftig akutt skade?",
      d: "Kom smerten plutselig med et tydelig knepp/pop, stor hevelse/blåmerker eller klarer du ikke å gå normalt?",
      stop: "Dette kan være en større muskel- eller seneskade og bør vurderes av helsepersonell før selvstyrt rehab."
    },
    {
      t: "Andre symptomer i lysken?",
      d: "Har du kul/hevelse i lysken, sterke magesmerter, testikkelsmerte/hevelse eller smerte som ikke tydelig henger sammen med bevegelse/trening?",
      stop: "Dette passer ikke godt med en enkel adduktorskade. Få medisinsk vurdering før du bruker rehabopplegget."
    },
    {
      t: "Dyp hofte- eller hvilesmerte?",
      d: "Har du sterke dype hoftesmerter, tydelig låsning/klikking med funksjonstap, nattlig smerte eller smerte som blir gradvis verre uten belastning?",
      stop: "Lyskesmerter kan komme fra flere strukturer. Disse symptomene bør vurderes faglig før videre testing."
    }
  ],
  tests: [
    { t: "Gange", d: "Kan du gå normalt uten tydelig smerte eller halting?", failLevel: "pain" },
    { t: "Adduktor squeeze", d: "Kan du klemme en ball/pute mellom knærne 5 x 5 sek med moderat kraft uten tydelig smerte?", failLevel: "better" },
    { t: "Sideutfall", d: "Kan du gjøre 8 korte, kontrollerte sideutfall per side uten tydelig smerte?", failLevel: "better" },
    { t: "Jogging", d: "Kan du jogge i 5 minutter uten smerte eller beskyttelse?", failLevel: "almost" },
    { t: "Sidebevegelse", d: "Kan du gjøre 3 x 10 meter sideveis forflytning i moderat fart uten smerte?", failLevel: "almost" },
    { t: "Vending", d: "Kan du gjøre 5 kontrollerte 45–90° retningsendringer per side uten smerte?", failLevel: "almost" },
    { t: "Spark", d: "Kan du slå 5–8 kontrollerte spark og øke mot ca. 80–90 % kraft uten smerte?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      {
        t: "Adduktor squeeze",
        d: "5 x 10–20 sek – lett/moderat",
        i: "Ligg på ryggen med bøyde knær og en ball/pute mellom knærne. Klem med rolig, moderat kraft. Målet er smertestyrt aktivering, ikke maks innsats."
      },
      {
        t: "Bent-knee fallout",
        d: "2–3 x 8 per side",
        i: "Ligg på ryggen med bøyde knær. La ett kne gli rolig ut til siden og tilbake innenfor et komfortabelt område."
      },
      {
        t: "Glute bridge",
        d: "3 x 8–12",
        i: "Løft hofta kontrollert. Hold bekkenet stabilt og fordel belastningen likt."
      },
      {
        t: "Rolig gange",
        d: "5–10 min hvis du går normalt",
        i: "Gå med naturlig steg. Stopp dersom smerten øker eller du begynner å halte."
      }
    ],
    better: [
      {
        t: "Side-liggende adduksjon",
        d: "3 x 8–12 per side",
        i: "Ligg på siden. Det nederste beinet er arbeidsbeinet. Løft det rolig noen centimeter og senk kontrollert."
      },
      {
        t: "Kort Copenhagen",
        d: "2–3 x 5–8 per side",
        i: "Støtt kneet på en benk/stol mens underste bein løftes mot det øverste. Start med kort spak og liten dose. Copenhagen er tung; ikke bruk lang variant tidlig."
      },
      {
        t: "Kort sideutfall",
        d: "3 x 6–8 per side",
        i: "Ta et kontrollert steg til siden og bøy kneet på arbeidsbeinet. Hold dybden moderat og skyv rolig tilbake."
      },
      {
        t: "Sideveis gange",
        d: "3 x 10–15 m",
        i: "Små kontrollerte steg sideveis i lett knebøy. Øk farten først når det er smertefritt."
      },
      {
        t: "Jogg/gå",
        d: "8–12 min",
        i: "Veksle rolig jogg og gange. Ingen økning hvis lysken blir tydelig mer irritert senere samme dag eller neste morgen."
      }
    ],
    almost: [
      {
        t: "Copenhagen",
        d: "3 x 6 per side",
        i: "Bruk kort eller lengre spak etter kapasitet. Hold bekkenet stabilt. Øk spaklengde før du jager mange repetisjoner."
      },
      {
        t: "Sideutfall",
        d: "3 x 8 per side",
        i: "Øk gradvis dybde og kraft. Hold kontroll over hofte, kne og fot."
      },
      {
        t: "Lateral shuffle",
        d: "4 x 10–15 m",
        i: "Bygg fra ca. 50 % til 80 % fart. Ikke kryss beina."
      },
      {
        t: "Retningsendring",
        d: "2 x 4 per side",
        i: "Start med 45° og gå gradvis mot 90°. Planlagte vendinger før reaktive."
      },
      {
        t: "Spark-progresjon",
        d: "8–12 spark: 50–60–70–80 %",
        i: "Start med korte pasninger. Øk gradvis lengde og kraft. Avslutt dersom du får napp eller begynner å holde igjen."
      }
    ],
    ready: [
      {
        t: "Oppvarming",
        d: "8–10 min gradvis",
        i: "Rolig løp, hoftebevegelser, sideforflytning og progressive akselerasjoner."
      },
      {
        t: "Høy fart",
        d: "4 x 20–30 m opp mot 90–95 %",
        i: "Bygg fart gradvis og ta full pause."
      },
      {
        t: "Vending og brems",
        d: "6–8 repetisjoner",
        i: "Bruk begge sider og varier 45–90° retningsendring. Ingen smerte eller beskyttelse."
      },
      {
        t: "Spark-progresjon",
        d: "10–12 spark opp mot 90–95 %",
        i: "Begynn med pasning, gå mot lengre pasning/skudd. Maks kraft er siste steg."
      },
      {
        t: "Fotballsekvens",
        d: "8–10 min",
        i: "Kombiner løp, vending, mottak, pasning og noen avslutninger i kontrollert, gradvis økende tempo."
      }
    ],
    prevent: [
      {
        t: "Copenhagen adduction",
        d: "2 x 6–8 per side, 1–2 ganger per uke",
        i: "Velg kort eller lang spak etter nivå. Øk gradvis. Øvelsen er høyintensiv for adduktorene."
      },
      {
        t: "Sideutfall",
        d: "3 x 6–10 per side",
        i: "Kontrollert styrke gjennom sideveis bevegelse."
      },
      {
        t: "Ettbeins styrke",
        d: "3 x 6–10",
        i: "Split squat eller ettbeins knebøy til benk bygger hofte- og beinkapasitet rundt lysken."
      },
      {
        t: "Spark og vending",
        d: "Jevn eksponering i trening",
        i: "Ikke la første harde spark eller raske sidebevegelse etter en pause komme i kamp. Bygg disse aksjonene inn gradvis i trening."
      },
      {
        t: "Følg tidlige symptomer",
        d: "Ikke vent til du må stå over",
        i: "Ved gradvis økende lyskesymptomer: reduser den provoserende belastningen midlertidig og fortsett passende styrke. Tidlig justering er bedre enn å presse til funksjonen faller."
      }
    ]
  },
  returnQuestions: [
    "Kjente du tydelig lyskesmerte under rask løping, vending eller sidebevegelse?",
    "Holdt du igjen i spark eller retningsendringer fordi området føltes utrygt?",
    "Ble lysken tydelig mer irritert mot slutten av testøkta?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan starte gradert lagtrening. Bygg først mengde og intensitet i løp, vendinger og spark. Full trening uten reaksjon bør tåles før kamp vurderes, og området skal være like bra eller bedre neste morgen."
});
