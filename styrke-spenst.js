"use strict";
(function(){
function item(tag, title, dose, guide) {
  return { tag, title, dose, guide };
}

const commonWarmup = item("Oppvarming", "Gjør kroppen klar", "3–4 minutter", [
  "Start med 1–2 minutter rolig jogg på stedet eller fremover.",
  "Gjør rolige kneløft i 20–30 sekunder.",
  "Gjør rolig hælspark i 20–30 sekunder.",
  "Ta 4–5 kontrollerte utfall med hvert bein.",
  "Avslutt med 5–8 små, lette hopp. Du skal være varm og klar, ikke sliten."
]);

const strengthItems = {
  split: item("Bein", "Utfall bakover", "3 × 8 per bein", [
    "Stå oppreist med føttene omtrent i hoftebredde.",
    "Ta et kontrollert steg bakover med det ene beinet, og sett tærne i gulvet.",
    "Bøy begge knær og senk hoften rett ned. Fremre kne skal følge tærnes retning, og overkroppen holdes stabil.",
    "Press gjennom fremre fot og før bakre bein frem igjen til stående utgangsstilling.",
    "Gjenta kontrollert, og bytt bein. Gjør 8 repetisjoner på hvert bein per sett."
  ]),
  hip: item("Bakside", "Ettbeins hoftebøy", "3 × 8 per bein", [
    "Stå på ett bein med en liten bøy i kneet. Hold lett i en vegg hvis du trenger balanse.",
    "Hold knevinkelen omtrent lik gjennom hele bevegelsen.",
    "Bøy i hoften ved å skyve setet bakover, slik at overkroppen lener seg frem med lang, nøytral rygg.",
    "La det frie beinet strekke seg bakover som motvekt. Hold begge hoftekammene vendt ned mot gulvet.",
    "Press gjennom foten du står på og strekk hoften for å komme opp igjen. Stopp før ryggen rundes eller bekkenet vrir seg."
  ]),
  calf: item("Legg", "Stå på tå på ett bein", "3 × 12 per bein", [
    "Stå ved en vegg eller stol.",
    "Stå på ett bein og hold lett med hånden hvis du trenger balanse.",
    "Press gjennom stortåballen og løft hælen kontrollert så høyt du klarer uten å vri ankelen.",
    "Senk hælen langsomt til gulvet før neste repetisjon. Hold kneet nesten strakt.",
    "Gjør alle repetisjonene og bytt bein."
  ]),
  push: item("Overkropp", "Armhevinger", "3 × 8–15", [
    "Plasser hendene omtrent i skulderbredde eller litt bredere, med fingrene fremover.",
    "Strekk beina bakover og spenn mage og sete, slik at kroppen danner en rett linje.",
    "Bøy albuene kontrollert, omtrent 30–60 grader ut fra kroppen, og senk brystet mot gulvet.",
    "Press deg opp igjen mens kroppen holdes stabil, uten at hoften siger ned.",
    "Er øvelsen for tung, sett hendene på en stabil benk eller mot en vegg i stedet."
  ]),
  groin: item("Lyske", "Copenhagen-planke (lett variant)", "2 × 4–6 per side", [
    "Legg deg på siden ved en solid, stabil benk som ikke kan gli eller velte.",
    "Legg innsiden av kneet på det øverste beinet på benken. Det nederste beinet ligger under.",
    "Plasser underarmen i gulvet med albuen rett under skulderen.",
    "Press det øverste kneet ned mot benken og løft hoften, samtidig som det nederste beinet løftes fra gulvet.",
    "Hold kroppen mest mulig rett i toppstillingen, og senk hoften og nederste bein rolig ned. Bytt side etter settet."
  ]),
  sideplank: item("Mage / side", "Sideplanke", "2 × 25–35 sek per side", [
    "Ligg på siden og støtt deg på albuen.",
    "Hold beina strake med føttene stablet, eller sett øverste fot litt foran for bedre balanse.",
    "Press underarmen og utsiden av nederste fot mot underlaget, og løft hoften til kroppen danner en rett linje.",
    "Hold hode, skuldre, hofter og ankler på linje mens du puster normalt.",
    "Er øvelsen for tung, bøy begge knær og støtt på det nederste kneet."
  ]),
  pogo: item("Spenst", "Små raske hopp", "2 × 10–15", [
    "Stå med føttene omtrent i hoftebredde.",
    "Hold kroppen oppreist med en liten, myk bøy i knærne.",
    "Gjør lave, rytmiske hopp hovedsakelig ved å bruke anklene.",
    "Ha kort bakkekontakt, men land kontrollert og stille.",
    "Avslutt settet hvis hoppene blir tunge, landingen mister kontroll eller du får vondt."
  ]),
  up: item("Spenst", "Hopp rett opp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knær og hofter og før armene bakover.",
    "Sving armene frem og hopp eksplosivt oppover med kontroll.",
    "Land på begge føtter med bøy i hofter og knær. Knærne skal følge tærnes retning.",
    "Stå stødig etter landingen. Ta deg tid til å hente deg inn før neste hopp."
  ]),
  broad: item("Spenst", "Lengdehopp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knærne og før armene bakover.",
    "Sving armene frem og hopp kraftfullt fremover, men ikke lenger enn at du kan lande kontrollert.",
    "Land på begge føtter med bøy i hofter og knær. Knærne skal følge tærnes retning.",
    "Hold landingen i 1–2 sekunder før du går tilbake til start og hviler."
  ]),
  onelegjump: item("Spenst", "Hopp frem på ett bein", "2 × 3 per bein", [
    "Stå stødig på ett bein, med kneet lett bøyd.",
    "Bøy litt i hofte og kne før du skyver fra.",
    "Hopp et kort stykke fremover med et eksplosivt, men kontrollert fraspark.",
    "Land på samme bein med myk bøy i hofte og kne, og hold kneet over foten.",
    "Hold balansen i 1–2 sekunder før neste hopp. Begynn med korte avstander."
  ]),
  sidejump: item("Spenst", "Hopp side til side", "2 × 4 per side", [
    "Stå stødig på ett bein, med kneet lett bøyd.",
    "Skyv fra sidelengs og land på motsatt bein med kne og hofte lett bøyd.",
    "La kneet følge tærnes retning og hold hoften stabil når du lander.",
    "Stå stødig i 1–2 sekunder før du hopper tilbake.",
    "Start med korte sidehopp. Øk avstanden først når du klarer stabile landinger på begge sider."
  ]),
  jumpsprint: item("Spenst + fart", "Hopp + kort sprint", "4 repetisjoner", [
    "Finn en flat, trygg strekning med plass til både 5–8 meter sprint og rolig nedbremsing.",
    "Gjør ett eksplosivt vertikalt hopp med armene som hjelp.",
    "Land på begge føtter med bøy i hofter og knær. Knærne skal følge tærnes retning.",
    "Når du har landet stabilt, akselererer du raskt 5–8 meter fremover og bremser gradvis.",
    "Gå rolig tilbake og hvil minst 90 sekunder, eller lenger om du trenger det for å kunne løpe raskt igjen."
  ])
};

const programs = {
  strength: {
    name: "Fotballstyrke",
    items: [commonWarmup, strengthItems.split, strengthItems.hip, strengthItems.calf, strengthItems.push, strengthItems.groin, strengthItems.sideplank]
  },
  jump: {
    name: "Spenst",
    items: [commonWarmup, strengthItems.pogo, strengthItems.up, strengthItems.broad, strengthItems.onelegjump, strengthItems.sidejump, strengthItems.jumpsprint]
  },
  combo: {
    name: "Kombi",
    items: [
      commonWarmup,
      item("Styrke", "Utfall bakover", "2 × 6 per bein", strengthItems.split.guide),
      item("Spenst", "Hopp rett opp", "3 × 3", strengthItems.up.guide),
      item("Bakside", "Ettbeins hoftebøy", "2 × 8 per bein", strengthItems.hip.guide),
      item("Spenst", "Små raske hopp", "2 × 10", strengthItems.pogo.guide),
      item("Legg", "Stå på tå på ett bein", "2 × 12 per bein", strengthItems.calf.guide),
      item("Spenst + fart", "Hopp + kort sprint", "3 repetisjoner", strengthItems.jumpsprint.guide)
    ]
  }
};


const trained={
  "Gjør kroppen klar":"Varmer opp kroppen og gjør deg klar for trening.",
  "Utfall bakover":"Lår, rumpe og balanse.",
  "Ettbeins hoftebøy":"Baksiden av lårene, rumpe og balanse.",
  "Stå på tå på ett bein":"Legger og styrke rundt ankelen.",
  "Armhevinger":"Bryst, skuldre, baksiden av overarmene og mage.",
  "Copenhagen-planke (lett variant)":"Innsiden av lårene (lysken), hofter og mage.",
  "Sideplanke":"Sidene av magen og musklene som holder hoften stabil.",
  "Små raske hopp":"Legger og evnen til å hoppe raskt opp igjen.",
  "Hopp rett opp":"Spenst i lår, rumpe og legger.",
  "Lengdehopp":"Kraft i lår, rumpe og legger når du hopper fremover.",
  "Hopp frem på ett bein":"Spenst på ett bein og balanse ved landing.",
  "Hopp side til side":"Spenst sidelengs og kontroll når du lander.",
  "Hopp + kort sprint":"Spenst og evnen til å komme raskt i gang med løping."
};

const descriptions={strength:"Styrk bein, legger, overkropp og kjernemuskulatur. Utfør repetisjonene rolig og kontrollert.",jump:"Tren på å hoppe eksplosivt og lande stabilt. Ta god pause mellom hoppene.",combo:"En balansert økt med både kontrollert styrke og korte eksplosive aksjoner."};
const times={strength:"25–35 min",jump:"20–30 min",combo:"25–35 min"};
const icons={strength:"🏋️",jump:"↟",combo:"⚡"};
const cues={
"Utfall bakover":["Ta et steg bakover for hver repetisjon, og hold fremre kne i samme retning som tærne.","Unngå at fremre kne faller innover.","45–75 sekunder"],
"Ettbeins hoftebøy":["Skyv rumpa bakover og hold ryggen rett.","Ikke vri hoften eller krum ryggen.","45–75 sekunder"],
"Stå på tå på ett bein":["Løft deg høyt og senk hælen langsomt.","Ikke sprett gjennom repetisjonene.","45–60 sekunder"],
"Armhevinger":["Hold mage og sete aktive gjennom hele bevegelsen.","Ikke la hoften synke.","45–75 sekunder"],
"Copenhagen-planke (lett variant)":["Hold kroppen rett og løft hoften rolig.","Nederste bein skal også løftes. Start med få repetisjoner og en trygg, stabil benk.","60–90 sekunder"],
"Sideplanke":["Hold kroppen rett og pust rolig.","Ikke vri overkroppen.","30–60 sekunder"],
"Små raske hopp":["Hold hoppene lave og land lett.","Ikke fortsett når hoppene blir tunge.","60–90 sekunder"],
"Hopp rett opp":["Hopp kraftfullt, land mykt og finn balansen.","Ikke la knærne falle innover.","60–90 sekunder"],
"Lengdehopp":["Bruk armene og land med myke knær.","Ikke hopp videre før du har kontroll på landingen.","60–90 sekunder"],
"Hopp frem på ett bein":["Start med korte hopp og stabil landing.","Ikke la kneet falle innover.","60–90 sekunder"],
"Hopp side til side":["Hold balansen etter hver landing.","Ikke øk lengden før du mestrer korte hopp.","60–90 sekunder"],
"Hopp + kort sprint":["Land på begge føtter, finn balansen og løp deretter raskt fremover.","Sørg for god plass til å bremse.","90–120 sekunder"]
};
const $=id=>document.getElementById(id);let key=null,completed=new Set(),single=false,index=0;
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function update(){const n=programs[key].items.length;$("progressBar").style.width=(completed.size/n*100)+"%";$("progressText").textContent=completed.size+" av "+n+" øvelser fullført"+(completed.size===n?" · Bra jobbet!":"");[...$("exerciseList").children].forEach((e,i)=>e.hidden=single&&i!==index);$("exerciseNav").hidden=!single;$("position").textContent=(index+1)+" av "+n;$("prev").disabled=index===0;$("next").disabled=index===n-1;$("allView").classList.toggle("selected",!single);$("oneView").classList.toggle("selected",single);$("allView").setAttribute("aria-pressed",String(!single));$("oneView").setAttribute("aria-pressed",String(single))}
function render(){$("exerciseList").replaceChildren();programs[key].items.forEach((ex,i)=>{const card=el("article","exercise-card");const header=el("div","exercise-heading");header.append(el("span","number",String(i+1)));const label=el("div","exercise-label");label.append(el("span","tag",ex.tag),el("h3","",ex.title),el("p","trains","Trener: "+(trained[ex.title]||ex.tag)),el("strong","dose",ex.dose));header.append(label);card.append(header);
const guidance=el("div","guidance");guidance.hidden=i!==0;guidance.append(el("h4","","Slik gjør du"));const steps=el("ol");ex.guide.forEach(t=>steps.append(el("li","",t)));guidance.append(steps);const tip=cues[ex.title];if(tip){guidance.append(el("p","focus","✓ Viktig: "+tip[0]),el("p","avoid","Pass på: "+tip[1]));card.append(el("p","rest","Anbefalt pause mellom sett: "+tip[2]))}else{guidance.append(el("p","focus","✓ Start rolig og bli varm uten å bli sliten."));card.append(el("p","rest","Oppvarming · ingen fast pause"))}
const actions=el("div","exercise-actions"),expand=el("button","expand",i===0?"Skjul forklaring ▴":"Slik gjør du ▾"),done=el("button","done","Marker fullført");expand.type=done.type="button";expand.setAttribute("aria-expanded",String(i===0));expand.addEventListener("click",()=>{guidance.hidden=!guidance.hidden;expand.textContent=guidance.hidden?"Slik gjør du ▾":"Skjul forklaring ▴";expand.setAttribute("aria-expanded",String(!guidance.hidden))});done.addEventListener("click",()=>{if(completed.has(i))completed.delete(i);else completed.add(i);done.classList.toggle("checked",completed.has(i));done.textContent=completed.has(i)?"✓ Fullført":"Marker fullført";update()});actions.append(expand,done);card.append(actions,guidance);$("exerciseList").append(card)});update()}
function open(k){if(!programs[k])return;key=k;completed.clear();single=false;index=0;$("sessionTitle").textContent=programs[k].name;$("sessionLead").textContent=descriptions[k];$("sessionMeta").textContent=times[k]+" · "+programs[k].items.length+" øvelser inkludert oppvarming";$("menu").hidden=true;$("session").hidden=false;render();history.replaceState(null,"","#"+k);window.scrollTo(0,0)}
function back(){$("session").hidden=true;$("menu").hidden=false;history.replaceState(null,"",location.pathname);window.scrollTo(0,0)}
Object.entries(programs).forEach(([k,p])=>{const b=el("button","program-card");b.type="button";b.append(el("span","program-icon",icons[k]));const copy=el("span","program-copy");copy.append(el("strong","",p.name),el("small","",descriptions[k]),el("em","",times[k]+" · "+p.items.length+" øvelser"));b.append(copy,el("span","chevron","›"));b.addEventListener("click",()=>open(k));$("programList").append(b)});
$("backToMenu").addEventListener("click",back);$("allView").addEventListener("click",()=>{single=false;update()});$("oneView").addEventListener("click",()=>{single=true;update()});$("prev").addEventListener("click",()=>{index=Math.max(0,index-1);update();$("sessionTitle").scrollIntoView({behavior:"smooth"})});$("next").addEventListener("click",()=>{index=Math.min(programs[key].items.length-1,index+1);update();$("sessionTitle").scrollIntoView({behavior:"smooth"})});$("restart").addEventListener("click",()=>{completed.clear();index=0;render()});const hash=location.hash.slice(1);if(programs[hash])open(hash);
})();