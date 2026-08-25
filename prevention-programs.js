"use strict";

(function () {
  const originalInit = window.initRehabApp;
  if (typeof originalInit !== "function") return;

  const warmup = {
    t: "Rolig oppvarming",
    d: "2 min",
    i: "Start med rolig jogg på stedet eller lett bevegelse. Målet er bare å bli varm før styrkeøvelsene."
  };

  const programs = {
    hamstring: [
      warmup,
      { t: "Nordic hamstring", d: "2 x 4", i: "Få en annen person til å holde anklene. Len deg rolig frem og ta imot med hendene før du mister kontrollen." },
      { t: "Ettbeins RDL", d: "2 x 6 per side", i: "Stå på ett bein. Skyv rumpa bakover mens overkroppen går frem. Reis deg rolig opp igjen." },
      { t: "Long-lever bridge", d: "2 x 8", i: "Ligg på ryggen med føttene litt lenger fra rumpa enn ved vanlig hofteløft. Press hælene ned og løft rumpa opp." },
      { t: "Høyfartsløp", d: "3 x 20 m · ca. 70–85 %", i: "Start kontrollert og løp litt raskere for hvert drag. Gå tilbake og hvil mellom dragene." }
    ],

    legg: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå ved en vegg. Løft hælene opp så du står på tå og senk rolig ned igjen." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Bøy knærne litt og hold dem bøyd mens du løfter hælene opp og ned." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Stå på ett bein ved en vegg. Løft hælen høyt opp og senk rolig ned." },
      { t: "Pogohopp", d: "2 x 15", i: "Gjør små raske hopp rett opp. Hold hoppene lave og lette." }
    ],

    akilles: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå på flatt gulv. Løft hælene kontrollert opp og senk rolig ned." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Bøy knærne litt og hold dem bøyd mens du løfter hælene." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Bruk vegg eller stol for balanse. Løft hælen høyt og senk rolig ned." },
      { t: "Pogohopp", d: "2 x 15", i: "Små raske hopp med begge bein. Stopp hvis Akilles eller hælen begynner å gjøre vondt." }
    ],

    hael: [
      warmup,
      { t: "Tåhev – begge bein", d: "2 x 12", i: "Stå på flatt gulv. Løft begge hælene opp og senk rolig ned." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Bøy knærne litt og hold dem bøyd mens du løfter hælene." },
      { t: "Ettbeins balanse", d: "2 x 30 sek per side", i: "Stå ved en vegg. Løft én fot og stå rolig på det andre beinet." },
      { t: "Hopp og landing", d: "2 x 8", i: "Gjør små rolige hopp og land mykt med litt bøy i knærne." }
    ],

    lyske: [
      warmup,
      { t: "Adduktor squeeze", d: "2 x 20 sek", i: "Ligg på ryggen med en ball eller pute mellom knærne. Klem rolig sammen og hold." },
      { t: "Kort Copenhagen", d: "2 x 6 per side", i: "Ligg på siden med kneet på en stol eller benk. Løft hofta opp og senk rolig ned." },
      { t: "Sideutfall", d: "2 x 6 per side", i: "Ta et steg til siden, bøy kneet på beinet du går mot og skyv deg tilbake til start." },
      { t: "Lateral shuffle", d: "3 x 10 m", i: "Flytt deg sidelengs med korte raske steg uten å krysse beina." }
    ],

    kne: [
      warmup,
      { t: "Knebøy til benk", d: "2 x 8", i: "Stå foran en stol. Senk rumpa rolig ned til stolen og reis deg opp igjen." },
      { t: "Split squat", d: "2 x 6 per side", i: "Stå med én fot foran og én bak. Senk kroppen rett ned og press deg opp igjen." },
      { t: "Step-down", d: "2 x 6 per side", i: "Stå på et lavt trinn på ett bein. Senk den andre hælen rolig mot gulvet og press deg opp igjen." },
      { t: "Hopp og landing", d: "2 x 6", i: "Gjør små hopp og land mykt med knærne litt bøyd. Hold balansen før neste hopp." }
    ],

    ankel: [
      warmup,
      { t: "Ettbeins balanse", d: "2 x 30 sek per side", i: "Stå ved en vegg. Løft én fot og stå rolig på det andre beinet." },
      { t: "Star reach", d: "2 runder per side", i: "Stå på ett bein og berør gulvet lett med den andre foten foran, til siden og skrått bak." },
      { t: "Ettbeins tåhev", d: "2 x 10 per side", i: "Stå på ett bein ved en vegg. Løft hælen høyt opp og senk rolig ned." },
      { t: "Hopp og landing", d: "2 x 8", i: "Gjør små hopp og land mykt og stabilt. Start rett opp og legg senere inn litt sideveis hopp." }
    ]
  };

  function pickProgram(name) {
    const n = String(name || "").toLowerCase();
    if (n.includes("hamstring")) return programs.hamstring;
    if (n.includes("akilles")) return programs.akilles;
    if (n.includes("hæl") || n.includes("sever")) return programs.hael;
    if (n.includes("lyske")) return programs.lyske;
    if (n.includes("kne")) return programs.kne;
    if (n.includes("ankel")) return programs.ankel;
    if (n.includes("legg")) return programs.legg;
    return null;
  }

  window.initRehabApp = function (config) {
    const program = pickProgram(config?.name);
    if (program && config?.phases) {
      config.phases.prevent = program.map(item => ({ ...item }));
      config.levels = Object.assign({}, config.levels || {}, {
        prevent: ["FOREBYGGING", "8–12 min styrke"]
      });
    }
    return originalInit(config);
  };
})();
