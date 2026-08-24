"use strict";

initRehabApp({
  name: "Ankel",
  scopeShort: "For typisk lett–moderat overtråkk og gradvis retur etter lateral ankelskade.",
  scope: "Dette opplegget passer best ved et typisk overtråkk der smerte og funksjon gradvis bedres. Det skal ikke brukes som selvdiagnose ved mulig brudd, alvorlig leddbåndsskade, syndesmoseskade eller et bein som ikke kan belastes.",
  painRuleShort: "Beveg og belast gradvis – hevelse, smerte og kontroll styrer progresjonen.",
  painRule: `Tidlig, beskyttet bevegelse og gradvis belastning er ofte nyttig etter et vanlig overtråkk. Lett ubehag kan være akseptabelt i rolige øvelser dersom det ikke øker gjennom økta, du ikke halter og ankelen ikke blir mer hoven eller tydelig verre senere samme dag eller neste morgen.

Stopp ved skarp smerte, svikt, økende hevelse, nummenhet eller hvis du ikke kan belaste normalt. Hopp, løping og retningsendring skal være smertefrie og kontrollerte før du øker videre.`,
  safetyQuestions: [
    {
      t: "Mulig brudd eller alvorlig skade?",
      d: "Er ankelen/foten tydelig deformert, er smerten svært sterk over et bestemt beinpunkt, eller klarer du ikke å ta fire normale steg etter skaden?",
      stop: "Ikke belast videre i selvtesten. En slik skade kan trenge medisinsk vurdering og eventuelt røntgen."
    },
    {
      t: "Raskt økende hevelse eller funksjonstap?",
      d: "Har du svært stor/rask hevelse, omfattende blåmerker, eller føles ankelen helt ute av stand til å støtte deg?",
      stop: "Dette bør vurderes av helsepersonell før du bruker et standard rehabopplegg."
    },
    {
      t: "Nummen, kald eller misfarget fot?",
      d: "Har du nummenhet, prikking som ikke gir seg, eller en fot som blir kald, blek/blå eller tydelig annerledes enn den andre?",
      stop: "Dette er ikke et normalt rehabtegn. Søk rask medisinsk vurdering."
    }
  ],
  tests: [
    { t: "Gange", d: "Kan du gå normalt uten halting og uten tydelig økende smerte?", failLevel: "pain" },
    { t: "Bevegelse", d: "Kan du føre kneet frem over foten og bevege ankelen opp/ned uten tydelig smerte eller låsning?", failLevel: "better" },
    { t: "Tåhev", d: "Kan du gjøre 15 rolige tåhev og deretter 10 på ett bein med god kontroll?", failLevel: "better" },
    { t: "Balanse", d: "Kan du stå 30 sekunder på ett bein og gjøre 5 rolige reach-bevegelser uten at ankelen svikter?", failLevel: "better" },
    { t: "Hopp", d: "Kan du gjøre 10 små ettbeinshopp på stedet uten smerte eller ustabilitet?", failLevel: "almost" },
    { t: "Jogging", d: "Kan du jogge i 5 minutter uten økende smerte, hevelse eller endret steg?", failLevel: "almost" },
    { t: "Retning", d: "Kan du akselerere, bremse og vende begge veier uten smerte eller at ankelen føles ustabil?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      {
        t: "Ankelpump",
        d: "3 x 15–20",
        i: "Trekk foten rolig opp og press den ned igjen innenfor et komfortabelt område. Ikke tving inn i smerte."
      },
      {
        t: "Rolig bevegelighet",
        d: "2 x 8 hver retning",
        i: "Lag små kontrollerte sirkler eller skriv alfabetet med foten. Bevegelsen skal være rolig og ikke provosere."
      },
      {
        t: "Vektflytting",
        d: "3 x 30 sek",
        i: "Stå med støtte og flytt vekten rolig over på den aktuelle foten. Målet er normal belastning uten halting."
      },
      {
        t: "Tåhev – begge bein",
        d: "3 x 8–12",
        i: "Bruk støtte. Løft og senk kontrollert. Reduser belastningen hvis smerten øker."
      },
      {
        t: "Rolig gange",
        d: "5–10 min hvis du går normalt",
        i: "Gange er nyttig først når steget er rimelig normalt. Ikke tren inn halting."
      }
    ],
    better: [
      {
        t: "Kne-over-tå",
        d: "3 x 10",
        i: "Hold hælen i gulvet og før kneet rolig frem over tærne. Sammenlign med den andre siden, men ikke press hardt inn i smerte."
      },
      {
        t: "Ettbeins tåhev",
        d: "3 x 8–12",
        i: "Bruk lett støtte. Hold foten stabil og senk rolig."
      },
      {
        t: "Ettbeins balanse",
        d: "3 x 30 sek",
        i: "Stå nær en vegg. Når dette er lett kan du snu hodet eller gjøre små armbevegelser."
      },
      {
        t: "Star reach",
        d: "2 x 5 i tre retninger",
        i: "Stå på det aktuelle beinet og nå den andre foten rolig frem, skrått bakover og til siden. Hold kne og fot kontrollert."
      },
      {
        t: "Jogg/gå",
        d: "8–12 min",
        i: "Veksle rolig jogg og gange. Avslutt hvis ankelen blir mer hoven, smertefull eller ustabil."
      }
    ],
    almost: [
      {
        t: "Tåhev-kapasitet",
        d: "3 x 12–20 ettbeins",
        i: "Jevn høyde og kontroll."
      },
      {
        t: "Dynamisk balanse",
        d: "3 x 30 sek",
        i: "Stå på ett bein og gjør reach-bevegelser, små knebøy eller ta imot en ball."
      },
      {
        t: "Pogohopp",
        d: "3 x 20",
        i: "Start med begge bein og gå til ett bein når det er smertefritt og stabilt."
      },
      {
        t: "Løpsprogresjon",
        d: "4 x 20–30 m: ca. 60–70–80–85 %",
        i: "Gradvis fart. Ankelen skal kjennes stabil ved fraspark og landing."
      },
      {
        t: "Planlagte vendinger",
        d: "2 x 4 per side",
        i: "Start med 45° og bygg mot 90°. Bremse kontrollert før du øker eksplosiviteten."
      }
    ],
    ready: [
      {
        t: "Oppvarming",
        d: "8–10 min",
        i: "Rolig løp, ankelbevegelighet, tåhev, balanse og progressive drag."
      },
      {
        t: "Ettbeinshopp",
        d: "10 fremover + 10 sideveis",
        i: "Små kontrollerte hopp først. Land stabilt uten smerte eller følelse av svikt."
      },
      {
        t: "Lateral hoppserie",
        d: "2 x 10",
        i: "Hopp rolig side til side over en tenkt linje. Øk fart først når kontrollen er god."
      },
      {
        t: "Løp og retning",
        d: "6–8 aksjoner opp mot 90–95 %",
        i: "Akselerer, brems og vend begge veier. Ingen ustabilitet eller beskyttelse."
      },
      {
        t: "Fotballsekvens",
        d: "8–10 min",
        i: "Kombiner ball, vendinger, korte sprinter og kontrollerte stopp. Bygg mot kampnær intensitet."
      }
    ],
    prevent: [
      {
        t: "Ettbeins balanse",
        d: "3 x 30–45 sek, 2–3 ganger per uke",
        i: "Gjør balansen gradvis vanskeligere med reach, ball eller mykt underlag når grunnkontrollen er god."
      },
      {
        t: "Star reach",
        d: "2–3 x 5 per retning",
        i: "Dynamisk balanse trener kontroll i flere retninger."
      },
      {
        t: "Ettbeins tåhev",
        d: "3 x 10–15",
        i: "Bygg kapasitet i legg og ankel."
      },
      {
        t: "Hopp og landing",
        d: "2–3 x 10",
        i: "Varier fremover, sideveis og små retningsendringer med kontroll."
      },
      {
        t: "Ved gjentatte overtråkk",
        d: "Fortsett balansearbeid gjennom sesongen",
        i: "Tidligere overtråkk øker risikoen for nye. Jevn nevromuskulær/balansebasert trening er viktig. Ved vedvarende instabilitet kan fysioterapeut vurdere behov for videre oppfølging og eventuell støtte/taping."
      }
    ]
  },
  returnQuestions: [
    "Kjente du smerte eller svikt under hopp, løp eller vendinger?",
    "Holdt du igjen fordi ankelen føltes ustabil eller utrygg?",
    "Ble ankelen tydelig mer hoven, stiv eller smertefull mot slutten av testøkta?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan starte gradert lagtrening. Bygg først kontrollert fotballbelastning og deretter full trening. Ankelen skal tåle hopping, løping og vending uten smerte/instabilitet, og hevelse/smerte bør ikke øke til neste morgen før kamp vurderes."
});
