"use strict";

initRehabApp({
  name: "Akilles",
  scopeShort: "For gradvis belastningsrelatert smerte og stivhet i akillessenen.",
  scope: "Dette opplegget passer best ved typiske belastningsplager i akillessenen, særlig smerte og stivhet som har kommet gradvis og ofte sitter noen centimeter over hælen. Det er ikke en diagnose. Hos barn og unge i vekst kan smerte helt nede i selve hælen være Sever-lignende plager og bør vurderes under Hæl / Sever. Ved smerte helt ved senefestet skal øvelsene gjøres fra flatt gulv uten å senke hælen under forfoten.",
  painRuleShort: "Akilles trenger gradert belastning – ikke full hvile – men reaksjonen samme dag og neste morgen styrer progresjonen.",
  painRule: `Ved typiske belastningsplager i akillessenen er gradert senebelastning førstevalget. Full hvile er vanligvis ikke nødvendig; behold aktivitet som tåles og bygg belastningen gradvis.

Lett og stabilt ubehag under rolige styrkeøvelser kan være akseptabelt dersom du ikke halter eller endrer frasparket, smerten ikke øker gjennom økta, og senen ikke er tydelig mer smertefull eller stiv senere samme dag eller neste morgen.

Reduser belastningen ved skarp smerte, økende halting, tydelig svakere fraspark eller markert verre morgenstivhet. Hopp, sprint og raske retningsendringer kommer senere i progresjonen. Ved smerte helt ved hælfestet: gjør tåhev fra gulv og unngå å slippe hælen dypt ned fra en trapp eller kant.`,
  safetyQuestions: [
    { t: "Plutselig smell eller følelse av å bli sparket?", d: "Kom smerten akutt med et smell/knepp eller en følelse av at noen sparket deg bak i leggen, og er det vanskelig å skyve fra, stå på tå eller gå normalt?", stop: "Dette kan passe med en akutt akillesseneruptur. Ikke fortsett selvtesten. Få rask medisinsk vurdering." },
    { t: "Akutt stor hevelse eller blåmerker?", d: "Har du etter en akutt hendelse fått rask hevelse, omfattende blåmerker eller tydelig tap av kraft i legg/fot?", stop: "Dette passer ikke med vanlig gradvis akillesbelastning og bør vurderes av helsepersonell før rehab." },
    { t: "Rød, varm og kraftig hoven legg eller fot?", d: "Er leggen/foten uvanlig rød, varm eller tydelig hoven, eller har du samtidig tung pust eller brystsmerter?", stop: "Dette skal ikke behandles som vanlig akillesplage. Søk rask medisinsk vurdering; ved tung pust eller brystsmerter er det akutt." },
    { t: "Barn/ungdom med smerte i selve hælen?", d: "Er spilleren fortsatt i vekst og sitter smerten mest i eller rundt hælbeinet, særlig ved løping og hopping, heller enn i selve senen?", stop: "Dette kan passe bedre med vekstrelatert hælsmerte. Bruk Hæl / Sever-modulen eller få en faglig vurdering hvis du er usikker." },
    { t: "Atypisk eller vedvarende forverring?", d: "Har du sterke hvile-/nattsmerter, feber, sår, nummenhet, eller blir tilstanden gradvis verre til tross for belastningsjustering?", stop: "Dette passer dårlig med en vanlig belastningsrelatert akillesplage og bør vurderes av lege eller fysioterapeut." }
  ],
  tests: [
    { t: "Gange", d: "Kan du gå normalt uten halting og uten tydelig smerte i frasparket?", failLevel: "pain" },
    { t: "Tåhev – begge bein", d: "Kan du gjøre 15 rolige tåhev fra flatt gulv uten at smerten bygger seg tydelig opp?", failLevel: "pain" },
    { t: "Tåhev – ett bein", d: "Kan du gjøre 10 kontrollerte ettbeins tåhev med omtrent samme høyde gjennom settet?", failLevel: "better" },
    { t: "Bøyd-kne tåhev", d: "Kan du gjøre 10 kontrollerte tåhev med lett bøyd kne uten tydelig økende smerte?", failLevel: "better" },
    { t: "Pogohopp", d: "Kan du gjøre 20 små raske hopp på begge bein uten at du beskytter siden eller får tydelig smerte?", failLevel: "almost" },
    { t: "Ettbeinshopp", d: "Kan du gjøre 8–10 små ettbeinshopp kontrollert uten tydelig smerte eller svakt fraspark?", failLevel: "almost" },
    { t: "Jogging", d: "Kan du jogge rolig i 5 minutter uten økende smerte, halting eller gradvis stivere steg?", failLevel: "almost" },
    { t: "Fotballfart", d: "Kan du gjøre 4 x 20 meter med progresjon opp mot ca. 85–90 % uten at du holder igjen i frasparket?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      { t: "Belastningsjustering", d: "Reduser det som tydelig provoserer – behold det som tåles", i: "Kutt midlertidig ned på sprint, mange hopp og lange harde økter hvis de gir tydelig reaksjon. Full hvile er vanligvis ikke nødvendig ved typisk tendinopati." },
      { t: "Isometrisk tåhev", d: "4 x 30–45 sek – begge bein", i: "Løft hælene rolig fra gulvet og hold. Bruk støtte. Belastningen skal kjennes i legg/Akilles uten skarp smerte." },
      { t: "Sittende tåhev", d: "3 x 12–15", i: "Sitt med knærne bøyd og løft hælene rolig. Legg eventuelt lett vekt over knærne når dette tåles godt." },
      { t: "Rolige tåhev – begge bein", d: "3 x 8–12", i: "Stå på flatt gulv. Bruk 2–3 sekunder opp og 2–3 sekunder ned. Ikke senk hælen under forfoten hvis smerten sitter ved senefestet." },
      { t: "Gange eller lett sykkel", d: "10–15 min innenfor toleranse", i: "Velg aktivitet der steget/fratråkket er normalt og som ikke gir tydelig forverring senere eller neste morgen." }
    ],
    better: [
      { t: "Langsomme tåhev", d: "3 x 10–12", i: "Stå på begge bein eller gå over til ett bein når det er kontrollert. Jobb rolig gjennom et komfortabelt bevegelsesutslag." },
      { t: "Bøyd-kne tåhev", d: "3 x 10–12", i: "Hold kneet lett bøyd og løft hælen kontrollert. Dette trener soleus og akilles i en annen vinkel enn strakt kne." },
      { t: "Ettbeins tåhev med støtte", d: "3 x 6–10", i: "Bruk fingertuppene i vegg for balanse. Hold jevn høyde og rolig tempo. Legg på belastning først når dette tåles godt." },
      { t: "Kne-over-tå", d: "2 x 8–10 rolig", i: "Før kneet rolig frem mens hælen holder kontakt med gulvet. Ikke press hardt inn i smerte, særlig ikke ved smerte helt ved hælfestet." },
      { t: "Jogg/gå", d: "8–12 min", i: "Veksle rolig jogg og gange. Avslutt hvis smerte eller stivhet bygger seg tydelig opp eller frasparket endres." }
    ],
    almost: [
      { t: "Tyngre ettbeins tåhev", d: "3 x 6–8", i: "Bruk for eksempel en ryggsekk med belastning. Utfør langsomt og kontrollert. Belastningen skal være krevende, men innenfor toleransen." },
      { t: "Tyngre bøyd-kne tåhev", d: "3 x 8–10", i: "Sittende eller stående med lett bøyd kne. Øk motstand gradvis fremfor å jage mange repetisjoner." },
      { t: "Pogohopp", d: "3 x 20", i: "Små raske hopp med kort bakkekontakt. Start på begge bein og gå til ett bein når responsen er god." },
      { t: "Løpsprogresjon", d: "4 x 20–30 m: ca. 60–70–80–85 %", i: "Øk fart gradvis. Frasparket skal føles symmetrisk og senen skal ikke bli gradvis mer smertefull." },
      { t: "Akselerasjon og brems", d: "4–6 repetisjoner opp mot 85–90 %", i: "Bygg først rett frem. Legg til kontrollert nedbremsing før raske vendinger." }
    ],
    ready: [
      { t: "Progressiv oppvarming", d: "8–10 min", i: "Rolig løp, tåhev, små hopp og progressive drag. Ikke gå rett fra stillstand til maksimal sprint." },
      { t: "Tåhev-kapasitet", d: "2 x 12–15 ettbeins", i: "Kontroller høyde, rytme og fraspark. Stor sideforskjell eller tydelig smerte betyr at du bør bygge mer kapasitet først." },
      { t: "Hoppserie", d: "2 x 20 pogo + 2 x 8 ettbein", i: "Land og skyv fra kontrollert. Ingen halting eller tydelig beskyttelse." },
      { t: "Løp 70–95 %", d: "6–8 progressive drag", i: "Bygg fra moderat til høy fart. Høy fart skal introduseres gradvis og uten tydelig smerte eller svakere fraspark." },
      { t: "Retning og fotballsekvens", d: "8–10 min", i: "Kombiner akselerasjon, brems, 45–90° vendinger, ball og korte løp. Øk mot kampnær intensitet stegvis." }
    ],
    prevent: [
      { t: "Tung tåhev – strakt kne", d: "3 x 6–10, 2–3 ganger per uke", i: "Bygg gradvis belastning i gastrocnemius/Akilles. Bruk ryggsekk, manual eller maskin når kroppsvekt blir lett." },
      { t: "Tung tåhev – bøyd kne", d: "3 x 8–12, 2–3 ganger per uke", i: "Trener soleus og hele plantarflexor-kapasiteten som er viktig i løp og retningsendring." },
      { t: "Spenst / pogo", d: "2–3 x 20", i: "Når symptomfri og tilbake i normal trening: bruk små elastiske hopp for å vedlikeholde evnen til å lagre og frigjøre kraft raskt." },
      { t: "Eksponering for fart", d: "Noen progressive drag gjennom treningsuka", i: "Akilles bør være vant til løping i høyere fart før kampbelastning. Øk gradvis etter perioder med lite trening." },
      { t: "Belastningsstyring", d: "Unngå store, brå hopp i løping og hopping", i: "Etter ferie, sykdom eller redusert trening: bygg sprint, hopp og total fotballmengde opp igjen over tid. Reager tidlig hvis morgenstivhet eller smerte begynner å øke." }
    ]
  },
  returnQuestions: [
    "Økte smerten tydelig under hopping, løping eller retningsendringer?",
    "Holdt du igjen eller mistet kraft i frasparket på grunn av Akilles?",
    "Ble senen tydelig mer smertefull eller stiv mot slutten av økta eller senere samme dag?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan starte gradert lagtrening. Bygg først kontrollert fotballbelastning og deretter full trening. Akilles bør tåle hopp, raske fraspark og høyere løpsfart uten tydelig symptomøkning, og reaksjonen neste morgen bør være tilbake på samme eller bedre nivå før kamp vurderes."
});
