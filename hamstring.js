"use strict";

initRehabApp({
  name: "Hamstring",
  scopeShort: "For typisk muskelstrekk eller belastningssmerte i bakside lår.",
  scope: "Dette opplegget passer best ved en typisk hamstringstrekk eller belastningssmerte i bakside lår etter løping, sprint eller fotball. Det passer ikke som selvbehandling ved kraftig traume, tydelig avrivning eller smerte som sannsynligvis kommer fra rygg, hofte eller nerve.",
  painRuleShort: "Lett ubehag kan være greit i rolig styrke – sprint skal være smertefri.",
  painRule: `I rolig styrketrening kan et lett og stabilt ubehag på omtrent 0–2 av 10 være akseptabelt dersom du ikke halter eller kompenserer, det ikke øker gjennom økta, og området er tilbake på samme eller bedre nivå senere samme dag og neste morgen.

Stopp ved skarp smerte, napp, økende smerte, tydelig svakhet eller endret bevegelse. Jogging, rask løping og spesielt sprint skal være smertefri før du øker videre.`,
  safetyQuestions: [
    { t: "Akutt og kraftig skade?", d: "Hørte eller kjente du et tydelig knepp/pop, fikk umiddelbart store smerter, betydelig hevelse/blåmerker eller klarer du ikke å gå normalt?", stop: "Dette kan være mer enn en lett muskelstrekk. Få skaden vurdert av lege eller fysioterapeut før du følger et selvstyrt rehabopplegg." },
    { t: "Smerte helt oppe ved setet?", d: "Er smerten svært høyt i bakside lår ved sitteknuten, særlig etter sprint eller spark, og gjør det vondt å sitte eller gå?", stop: "Hos unge spillere kan en kraftig skade høyt ved sitteknuten være en avulsjonsskade og bør vurderes av helsepersonell. Ikke test sprint eller tøying nå." },
    { t: "Uvanlige symptomer?", d: "Har du nummenhet, prikking, tydelig kraftsvikt, smerter som stråler fra ryggen, eller smerter som blir stadig verre uten belastning?", stop: "Symptombildet passer ikke godt med en enkel hamstringstrekk. Få en faglig vurdering før du fortsetter." }
  ],
  tests: [
    { t: "Gange", d: "Kan du gå normalt uten halting eller tydelig smerte?", failLevel: "pain" },
    { t: "Bridge", d: "Kan du gjøre 10 rolige glute bridge med lik belastning på begge bein uten tydelig smerte?", failLevel: "better" },
    { t: "Lang hamstring", d: "Kan du gjøre 8 long-lever bridge rolig uten smerte eller krampefølelse?", failLevel: "better" },
    { t: "Jogging", d: "Kan du jogge rolig i 5 minutter uten smerte, halting eller økende stramhet?", failLevel: "almost" },
    { t: "Akselerasjon", d: "Kan du løpe 4 x 20 meter med gradvis fart opp mot ca. 85 % uten smerte eller at du holder igjen?", failLevel: "almost" },
    { t: "Høy fart", d: "Kan du gjennomføre 2–3 kontrollerte drag opp mot 90–95 % fart helt smertefritt?", failLevel: "almost" },
    { t: "Fotballbevegelse", d: "Kan du bremse, vende og akselerere igjen uten smerte eller utrygghet?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      { t: "Heel press", d: "4 x 20 sek – rolig til moderat trykk", i: "Ligg på ryggen med kneet bøyd. Press hælen ned og tenk at du vil dra den mot rumpa uten at foten flytter seg. Hold 20 sekunder. Start lett og øk bare hvis det kjennes stabilt." },
      { t: "Glute bridge", d: "3 x 8–12", i: "Ligg på ryggen med bøyde knær. Press gjennom hælene og løft hofta kontrollert. Hold bekkenet stabilt. Senk rolig. Ikke jag høyde hvis bakside lår protesterer." },
      { t: "Aktiv knebøy", d: "3 x 10 rolig", i: "Stå eller ligg og bøy/strekk kneet kontrollert gjennom et smertefritt område. Målet er bevegelse og kontakt med muskelen, ikke tøying." },
      { t: "Rolig gange", d: "5–10 min hvis du går normalt", i: "Gå med normalt steg. Avslutt dersom du begynner å halte eller smerten øker." }
    ],
    better: [
      { t: "Long-lever bridge", d: "3 x 6–10", i: "Ligg på ryggen med hælene lenger fra rumpa enn i vanlig bridge. Løft hofta kontrollert. Dette øker belastningen på hamstring. Flytt føttene nærmere hvis det blir for tungt." },
      { t: "Hamstring slider", d: "3 x 5–8", i: "Ligg på ryggen med hælene på sokker/håndkle på glatt gulv. Løft hofta lett og skyv hælene rolig ut. Trekk dem inn igjen med kontroll. Start med kort bevegelse." },
      { t: "Ettbeins RDL", d: "3 x 6–8 per side", i: "Stå på ett bein med lett knebøy. Skyv hofta bak og len overkroppen frem mens ryggen holdes rolig. Gå bare så langt du har kontroll. Start uten ekstra vekt." },
      { t: "Jogg/gå", d: "8–12 min – rolig", i: "Veksle for eksempel 2 min rolig jogg og 1 min gange. Øk sammenhengende jogging bare hvis steget er normalt og du er like bra eller bedre neste morgen." }
    ],
    almost: [
      { t: "Ettbeins bridge", d: "3 x 8 per side", i: "Løft hofta med ett bein i bakken. Hold bekkenet stabilt og senk rolig." },
      { t: "Slider – langsom ut", d: "3 x 6", i: "Bruk begge bein eller ett bein etter nivå. Legg mest vekt på en langsom utglidning på 3–4 sekunder." },
      { t: "Assistert Nordic", d: "2–3 x 4", i: "Få noen til å holde anklene. Len kroppen kontrollert frem og ta imot med hendene før du mister kontroll. Start med kort bevegelse. Dette skal være tungt, men ikke smertefullt." },
      { t: "Løpsprogresjon", d: "4 x 20 m: ca. 60–70–80–85 %", i: "God oppvarming først. Gå tilbake mellom dragene. Ingen sprint dersom du kjenner smerte eller begynner å beskytte beinet." },
      { t: "Akselerasjon", d: "4 x 15–20 m opp mot 85–90 %", i: "Bygg fart gradvis i hvert drag. Full pause. Ingen maksstart." }
    ],
    ready: [
      { t: "Fotballoppvarming", d: "8–10 min gradvis", i: "Rolig jogg, dynamiske bevegelser, noen progressive løp og lette ballberøringer. Ikke gå direkte fra stillestående til sprint." },
      { t: "Progressiv sprint", d: "4 x 20–30 m: ca. 70–80–90–95 %", i: "Full pause mellom dragene. Siste drag skal være raskt, men kontrollert og helt smertefritt." },
      { t: "Akselerasjon og brems", d: "4–6 repetisjoner", i: "Akselerer 10–15 meter, brems kontrollert og gå tilbake. Øk intensiteten gradvis." },
      { t: "Vendinger", d: "2 x 4 per side", i: "Bruk 45–90 graders retningsendringer. Start planlagt, ikke reaktivt. Hold god kontroll i brems og nytt fraspark." },
      { t: "Fotballsekvens", d: "8–10 min", i: "Kombiner pasning, føring, korte løp, vendinger og noen kontrollerte spark. Øk mot kampnær fart uten å gå direkte til kaotisk spill." }
    ],
    prevent: [
      { t: "Nordic hamstring", d: "2 x 4–6, 1–2 ganger per uke", i: "Kontrollert fremoverlening med partner som holder anklene. Start med få gode repetisjoner og øk gradvis. Ikke legg tung Nordic rett før kamp dersom du blir støl av den." },
      { t: "Ettbeins RDL", d: "3 x 6–8 per side", i: "Hoftehinge med kontroll. Når teknikken er stabil kan du bruke passende ekstern belastning." },
      { t: "Slider / lang hamstring", d: "2–3 x 6–10", i: "Velg slider eller long-lever bridge for styrke ved lengre muskellengde." },
      { t: "Høyfartsløp", d: "Jevn eksponering når du er frisk", i: "Hamstring må være vant til høy fart for å tåle høy fart. Bruk gradvis oppvarming og noen raske, kontrollerte drag i treningsuka når totalbelastningen tillater det." },
      { t: "Belastningsstyring", d: "Unngå brå hopp i sprintmengde", i: "Vær særlig forsiktig etter sykdom, ferie, skade eller perioder med lite løping. Bygg antall raske løp og total fotballbelastning gradvis." }
    ]
  },
  returnQuestions: [
    "Kjente du smerte eller napp under sprintdelen?",
    "Holdt du igjen, forkortet steget eller beskyttet beinet i akselerasjon/vending?",
    "Ble bakside lår tydelig strammere eller mer irritert mot slutten av testøkta?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan begynne gradert retur til lagtrening. Start med kontrollerte deler av økta og bygg mot full trening. For hamstring bør høy fart og sprint tåles smertefritt, og du bør ha gjennomført full trening uten reaksjon før kamp vurderes. Sjekk alltid hvordan området kjennes neste morgen."
});
