"use strict";

initRehabApp({
  name: "Hæl / Sever",
  scopeShort: "For typisk belastningsrelatert hælsmerte hos barn og ungdom i vekst.",
  scope: "Dette opplegget passer best ved typisk Sever-lignende hælsmerte (calcaneal apofysitt): smerte bak/under hælen som kommer ved mye løping og hopping hos barn eller ungdom i vekst, og som ofte roer seg når belastningen reduseres. Det er ikke en diagnose og skal ikke brukes ved akutt traume, mulig brudd, tydelig betennelsespreg eller andre uvanlige symptomer.",
  painRuleShort: "Styr belastningen etter hælsmerte og halting – bygg opp igjen gradvis.",
  painRule: `Ved typisk Sever-lignende hælsmerte er full hvile sjelden nødvendig. Målet er å finne en belastning spilleren tåler.

Lett og stabilt ubehag kan være akseptabelt under rolige styrkeøvelser dersom spilleren ikke halter eller endrer bevegelsen, smerten ikke øker gjennom økta, og hælen er tilbake på samme eller bedre nivå senere samme dag og neste morgen.

Reduser eller stopp løping/hopping dersom smerten blir tydelig, spilleren begynner å halte eller gå på tå for å avlaste, eller hælen er klart verre neste morgen. Hopp og høy fart skal først bygges opp når vanlig gange og grunnleggende leggstyrke tåles godt.`,

  safetyQuestions: [
    {
      t: "Akutt skade eller mulig brudd?",
      d: "Startet smerten etter et kraftig fall, spark eller landingsuhell, med plutselig sterke smerter, tydelig hevelse/blåmerker eller problemer med å belaste foten?",
      stop: "Dette passer ikke med vanlig Sever-lignende belastningssmerte. Få fot/hæl vurdert av helsepersonell før du tester videre."
    },
    {
      t: "Rød, varm eller tydelig hoven hæl?",
      d: "Er hælen/foten tydelig rød, varm eller hoven, eller har spilleren feber eller virker syk?",
      stop: "Dette er ikke typisk for ukomplisert Sever og bør vurderes medisinsk."
    },
    {
      t: "Smerte uten belastning?",
      d: "Har spilleren sterke smerter i hvile eller om natten, eller blir smerten gradvis verre selv uten løping og hopping?",
      stop: "Dette passer dårlig med typisk Sever. Få en faglig vurdering før selvstyrt rehab."
    },
    {
      t: "Vedvarende kraftig ensidig smerte?",
      d: "Er smerten svært kraftig i bare én hæl, har den vart lenge uten bedring til tross for belastningsjustering, eller er funksjonen tydelig redusert?",
      stop: "Ved atypisk eller vedvarende hælsmerte bør årsaken vurderes av fysioterapeut eller lege."
    }
  ],

  tests: [
    { t: "Gange", d: "Kan du gå normalt uten halting eller at du går på tå for å avlaste hælen?", failLevel: "pain" },
    { t: "Tåhev – begge bein", d: "Kan du gjøre 15 rolige tåhev på begge bein uten tydelig økende hælsmerte?", failLevel: "better" },
    { t: "Tåhev – ett bein", d: "Kan du gjøre 10 kontrollerte ettbeins tåhev uten at hælsmerten bygger seg opp?", failLevel: "better" },
    { t: "Små hopp", d: "Kan du gjøre 20 små pogohopp på begge bein uten tydelig smerte eller avlastning?", failLevel: "almost" },
    { t: "Ettbeinshopp", d: "Kan du gjøre 8 små ettbeinshopp og lande kontrollert uten tydelig hælsmerte?", failLevel: "almost" },
    { t: "Jogging", d: "Kan du jogge rolig i 5 minutter uten økende smerte eller endret steg?", failLevel: "almost" },
    { t: "Fotballfart", d: "Kan du gjennomføre 4 x 20 meter med gradvis fart opp mot ca. 85–90 % uten smerte eller at du holder igjen?", failLevel: "almost" }
  ],

  phases: {
    pain: [
      {
        t: "Belastningsjustering",
        d: "Reduser løping og hopping som gir tydelig smerte",
        i: "Målet er ikke å stoppe all aktivitet. Behold aktivitet som ikke gir halting eller tydelig forverring, men reduser midlertidig sprint, hopping og lange økter dersom det provoserer hælen."
      },
      {
        t: "Isometrisk tåhev",
        d: "4 x 20 sek – begge bein",
        i: "Stå med støtte. Løft hælene litt fra gulvet og hold rolig. Bruk begge bein. Holdet skal kjennes i leggen, ikke gi skarp smerte i hælen."
      },
      {
        t: "Sittende tåhev",
        d: "3 x 12–15",
        i: "Sitt på stol med føttene i gulvet og knærne bøyd. Løft hælene rolig opp og senk kontrollert. Dette belaster soleus med mindre støt enn løping og hopping."
      },
      {
        t: "Kne-over-tå",
        d: "2 x 10 rolig",
        i: "Stå med hele foten i gulvet og før kneet rolig frem over tærne. Hold hælen nede. Dette gir kontrollert ankelbevegelighet uten aggressiv tøying."
      },
      {
        t: "Rolig gange",
        d: "5–10 min hvis du går normalt",
        i: "Gå med naturlig steg. Avslutt dersom du begynner å halte eller gå på tå for å avlaste hælen."
      }
    ],

    better: [
      {
        t: "Tåhev – begge bein",
        d: "3 x 12–15",
        i: "Løft hælene kontrollert opp og senk på 2–3 sekunder. Bruk gulv, ikke trapp, slik at hælen ikke presses langt ned under forfoten."
      },
      {
        t: "Tåhev – bøyd kne",
        d: "3 x 12–15",
        i: "Hold knærne lett bøyd og gjør kontrollerte tåhev. Dette øker arbeidet i soleus."
      },
      {
        t: "Ettbeins tåhev",
        d: "3 x 6–10 per side",
        i: "Bruk støtte for balanse. Start med få gode repetisjoner. Gå tilbake til to bein dersom hælsmerten bygger seg opp."
      },
      {
        t: "Rolig leggstrekk",
        d: "2 x 20 sek – bare hvis det føles godt",
        i: "Stå mot vegg med hælen i gulvet og len deg forsiktig frem. Dette skal kjennes som et mildt strekk i leggen, ikke smerte i selve hælen. Dropp øvelsen hvis hælen provoseres."
      },
      {
        t: "Jogg/gå",
        d: "8–12 min",
        i: "Veksle for eksempel 1–2 min rolig jogg og 1 min gange. Øk bare når steget er normalt og hælen er like bra eller bedre neste morgen."
      }
    ],

    almost: [
      {
        t: "Ettbeins tåhev",
        d: "3 x 10–15 per side",
        i: "Jobb mot jevn høyde og rolig senkefase. Ikke jag høyt repetisjonstall dersom hælsmerten øker."
      },
      {
        t: "Bøyd-kne tåhev",
        d: "3 x 10–15",
        i: "Hold lett bøy i knærne og arbeid kontrollert."
      },
      {
        t: "Pogohopp",
        d: "3 x 15–20",
        i: "Små, lave hopp med myk og rytmisk landing. Start på begge bein. Stopp hvis hælsmerten bygger seg opp."
      },
      {
        t: "Ettbeinshopp",
        d: "2 x 6–8 per side",
        i: "Små hopp på stedet. Land rolig og kontrollert. Hold høyden lav i starten."
      },
      {
        t: "Løpsprogresjon",
        d: "4 x 20–30 m: ca. 60–70–80–85 %",
        i: "God oppvarming først. Full pause mellom dragene. Ingen videre økning dersom hælen blir tydelig mer smertefull."
      }
    ],

    ready: [
      {
        t: "Oppvarming",
        d: "8–10 min gradvis",
        i: "Rolig løp, ankelbevegelighet, tåhev og noen progressive drag."
      },
      {
        t: "Hoppserie",
        d: "20 pogos + 10 små ettbeinshopp",
        i: "Hold hoppene lave og kontrollerte. Ingen halting eller tydelig avlastning."
      },
      {
        t: "Progressiv løping",
        d: "4 x 20–30 m opp mot 90 %",
        i: "Bygg fart gradvis. Ikke test maks bare for å se om det går."
      },
      {
        t: "Brems og vending",
        d: "6–8 kontrollerte aksjoner",
        i: "Akselerer, brems og gjør planlagte 45–90 graders vendinger."
      },
      {
        t: "Fotballsekvens",
        d: "8–10 min",
        i: "Kombiner pasning, føring, korte løp, vending og noen små hopp. Øk mot vanlig treningstempo uten å gå rett til full kampintensitet."
      }
    ],

    prevent: [
      {
        t: "Tåhev – strakt kne",
        d: "3 x 10–15, 2 ganger per uke",
        i: "Bygg leggkapasitet jevnlig gjennom sesongen. Når spilleren er symptomfri kan motstanden økes gradvis."
      },
      {
        t: "Tåhev – bøyd kne",
        d: "3 x 10–15",
        i: "Soleus arbeider mye i løping og bør også trenes."
      },
      {
        t: "Ankelbevegelighet",
        d: "2 x 10 kne-over-tå",
        i: "Hold god ankelbevegelighet uten aggressiv tøying av en smertefull hæl."
      },
      {
        t: "Hopp og løp",
        d: "Jevn eksponering gjennom uka",
        i: "Kroppen tåler belastning best når den er vant til den. Unngå at første store hopp i sprint- og hoppmengde kommer i kamp eller etter en pause."
      },
      {
        t: "Vekstperioder",
        d: "Juster belastningen tidligere",
        i: "Sever-lignende plager kan blusse opp i vekstperioder. Hvis hælen begynner å bli øm, reduser midlertidig den mest provoserende løpingen/hoppingen før spilleren begynner å halte."
      },
      {
        t: "Sko og hælkopp",
        d: "Bruk komfortable sko; hælkopp kan prøves",
        i: "Godt dempede sko kan redusere belastningen. En enkel hælkopp eller liten hælløft kan hjelpe enkelte spillere. Det er et symptomtiltak, ikke en erstatning for belastningsstyring og styrke."
      }
    ]
  },

  returnQuestions: [
    "Kjente du tydelig hælsmerte under hopping eller raskere løping?",
    "Begynte du å halte, gå på tå eller avlaste hælen under testøkta?",
    "Ble hælen tydelig mer smertefull mot slutten av økta?"
  ],

  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan starte gradert lagtrening. Ved Sever-lignende hælsmerte er målet å tåle mer fotball trinnvis, ikke å bli erklært 'ferdig' etter én test. Øk først treningsmengde og deretter de hardeste sprint-/hoppbelastningene. Hælen bør være like bra eller bedre neste morgen før belastningen økes videre."
});
