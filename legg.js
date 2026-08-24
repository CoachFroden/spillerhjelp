"use strict";

initRehabApp({
  name: "Legg",
  scopeShort: "For typisk muskelstrekk eller belastningssmerte i gastrocnemius/soleus.",
  scope: "Dette opplegget er laget for typisk muskulær leggsmerte eller en mild–moderat leggstrekk etter løping eller fotball. Krampe som går helt over raskt er ikke det samme som en muskelskade, og uforklarlig hevelse/rødme/varme i leggen skal ikke behandles som en vanlig idrettsskade i appen.",
  painRuleShort: "Belast gradvis – ikke provoser økende smerte eller endret gange.",
  painRule: `Rolig styrke kan utføres med ingen eller lett, stabilt ubehag dersom du går normalt, smerten ikke øker gjennom økta og leggen er tilbake på samme eller bedre nivå neste morgen.

Stopp ved skarp smerte, økende hevelse, tydelig svakhet, krampe/låsing som tiltar eller hvis du begynner å halte. Hopp, akselerasjon og høy fart skal gjennomføres uten tydelig smerte eller beskyttelse før du øker videre.`,
  safetyQuestions: [
    { t: "Uforklarlig hevelse eller varme?", d: "Er leggen tydelig mer hoven enn den andre, rød/varm, svært øm uten en klar idrettshendelse, eller har du samtidig tungpust/brystsmerter?", stop: "Dette skal ikke behandles som vanlig leggstrekk i appen. Ved tungpust eller brystsmerter sammen med slik legghevelse bør du søke akutt medisinsk hjelp. Ellers bør leggen vurderes av lege." },
    { t: "Knepp eller kraftig akutt skade?", d: "Kjente du et tydelig knepp/smell, fikk plutselig sterke smerter, stor hevelse/blåmerker eller klarer du ikke å skyve fra normalt?", stop: "Dette kan være en større muskelskade eller skade i akillessenen og bør vurderes av helsepersonell før rehabtesten." },
    { t: "Kan du belaste beinet?", d: "Er du ute av stand til å gå noen normale steg, eller har du raskt økende smerte/hevelse etter skade?", stop: "Ikke test hopping eller løping. Få skaden vurdert før du følger et selvstyrt opplegg." }
  ],
  tests: [
    { t: "Gange", d: "Kan du gå normalt uten halting eller tydelig smerte?", failLevel: "pain" },
    { t: "Tåhev – begge", d: "Kan du gjøre 15 rolige tåhev på begge bein uten tydelig smerte?", failLevel: "better" },
    { t: "Tåhev – ett bein", d: "Kan du gjøre 12 kontrollerte ettbeins tåhev med omtrent samme høyde hver gang?", failLevel: "better" },
    { t: "Soleus", d: "Kan du gjøre 12 tåhev med bøyd kne på ett bein uten smerte eller svikt?", failLevel: "better" },
    { t: "Jogging", d: "Kan du jogge i 5 minutter uten økende stramhet, smerte eller endret steg?", failLevel: "almost" },
    { t: "Hopp", d: "Kan du gjøre 20 lette pogohopp og 10 små ettbeinshopp uten smerte?", failLevel: "almost" },
    { t: "Høyere fart", d: "Kan du gjennomføre 4 x 20 meter opp mot ca. 90 % fart uten smerte eller at du holder igjen?", failLevel: "almost" }
  ],
  phases: {
    pain: [
      { t: "Ankelpump", d: "3 x 15–20", i: "Sitt eller ligg. Trekk foten opp og press den rolig ned igjen. Beveg innenfor et komfortabelt område." },
      { t: "Isometrisk tåhev", d: "4 x 20 sek", i: "Stå med støtte og løft hælene litt. Hold rolig. Bruk begge bein i starten. Flytt gradvis mer vekt over på den vonde siden hvis det er komfortabelt." },
      { t: "Bøyd-kne leggpress", d: "3 x 20 sek", i: "Sitt med kneet bøyd ca. 90 grader. Press forfoten ned i gulvet uten at hælen trenger å løftes mye. Dette belaster soleus rolig." },
      { t: "Rolig gange", d: "5–10 min hvis du går normalt", i: "Kort, naturlig steg. Ikke bruk gange som en test hvis du halter." }
    ],
    better: [
      { t: "Tåhev – strakt kne", d: "3 x 10–15", i: "Løft hælene kontrollert opp, hold ett sekund og senk på 2–3 sekunder. Start med begge bein og gå gradvis mot mer belastning på den aktuelle siden." },
      { t: "Tåhev – bøyd kne", d: "3 x 10–15", i: "Hold knærne lett bøyd mens du gjør tåhev. Dette gir mer arbeid til soleus." },
      { t: "Ettbeins tåhev", d: "3 x 6–10", i: "Bruk støtte for balanse. Prioriter lik høyde og rolig senkefase. Hvis du mister høyde eller får økende smerte, gå tilbake til to bein." },
      { t: "Kne-over-tå mobilitet", d: "2 x 10 rolig", i: "Stå med hele foten i gulvet og før kneet rolig frem over tærne uten at hælen løfter seg. Dette er kontrollert bevegelighet, ikke hard tøying." },
      { t: "Jogg/gå", d: "8–12 min", i: "Veksle rolig jogg og gange. Gå videre bare hvis leggen ikke blir gradvis strammere og er like bra eller bedre neste morgen." }
    ],
    almost: [
      { t: "Ettbeins tåhev", d: "3 x 12–20", i: "Jobb mot god utholdenhet med jevn høyde. Sammenlign med den friske siden uten å jage et bestemt tall dersom teknikken faller." },
      { t: "Bøyd-kne ettbeins tåhev", d: "3 x 10–15", i: "Hold kneet lett bøyd og gjør kontrollerte tåhev." },
      { t: "Pogohopp", d: "3 x 20", i: "Små, raske hopp med kort bakkekontakt. Start med begge bein. Gå over til lett ettbeinsvariant når det er smertefritt." },
      { t: "Løpsprogresjon", d: "4 x 30 m: ca. 60–70–80–85 %", i: "Full kontroll og god pause. Ingen høy fart hvis leggen strammer mer for hvert drag." },
      { t: "Akselerasjon", d: "4 x 15–20 m opp mot 85–90 %", i: "Bygg fart gradvis. Leggen skal tåle frasparket uten smerte eller frykt." }
    ],
    ready: [
      { t: "Oppvarming", d: "8–10 min gradvis", i: "Rolig løp, bevegelighet, tåhev og progressive drag." },
      { t: "Tåhev-kapasitet", d: "20–25 gode ettbeins repetisjoner", i: "Bruk samme tempo og omtrent samme høyde. Stopp hvis kvaliteten faller tydelig. Dette er en praktisk kapasitetskontroll, ikke en medisinsk diagnose." },
      { t: "Hoppserie", d: "20 pogos + 10 ettbeinshopp", i: "Land kontrollert og hold rytmen. Ingen smerte eller tydelig forskjell i trygghet." },
      { t: "Progressiv løping", d: "4 x 20–30 m opp mot 90–95 %", i: "Full pause. Høy fart skal kjennes naturlig." },
      { t: "Fotballbevegelse", d: "8–10 min", i: "Kombiner korte akselerasjoner, brems, vending og ballarbeid. Øk kontrollert mot kampnær intensitet." }
    ],
    prevent: [
      { t: "Tung tåhev – strakt kne", d: "3 x 8–12, 1–2 ganger per uke", i: "Når du er smertefri og teknikken er god kan du øke motstanden gradvis." },
      { t: "Tung tåhev – bøyd kne", d: "3 x 8–12", i: "Bøyd kne trener særlig soleus, som arbeider mye i løping." },
      { t: "Pogo og spenst", d: "2–3 x 20", i: "Bruk lave, kontrollerte hopp og bygg gradvis mot raskere bakkekontakt." },
      { t: "Løpsbelastning", d: "Bygg fart og mengde gradvis", i: "Leggskader kommer ofte når kapasitet og løpsbelastning ikke matcher. Etter pauser bør både total løping og raske løp bygges opp trinnvis." },
      { t: "Krampe er ikke bare væske", d: "Se på total belastning", i: "Væske og salt kan være relevant, men treningsbelastning, utmattelse og tidligere krampe spiller også inn. Gjentatte kramper bør ikke bare løses ved å drikke mer." }
    ]
  },
  returnQuestions: [
    "Kjente du smerte, låsing eller krampefølelse under raske løp eller hopp?",
    "Holdt du igjen i fraspark, akselerasjon eller vending?",
    "Ble leggen tydelig strammere, mer øm eller mer sliten enn forventet mot slutten?"
  ],
  returnSuccessText: "Testøkta gikk uten tydelige varselsignaler. Du kan starte gradert retur til lagtrening. Bygg først treningsmengde og fart, og gjennomfør full trening uten reaksjon før kamp vurderes. Leggen bør også være like bra eller bedre neste morgen."
});
