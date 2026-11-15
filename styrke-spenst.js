"use strict";
(function(){
function item(tag, title, dose, guide) {
  return { tag, title, dose, guide };
}

const commonWarmup = item("Oppvarming", "Gjør kroppen klar", "3–4 minutter", [
  "Start med rolig jogg på stedet i 30–45 sekunder.",
  "Gjør kneløft i 20–30 sekunder.",
  "Gjør spark bak i 20–30 sekunder.",
  "Ta noen rolige utfall fremover.",
  "Avslutt med noen små lette hopp. Du skal bli varm, ikke sliten."
]);

const strengthItems = {
  split: item("Bein", "Utfall på stedet", "3 × 8 per bein", [
    "Stå med én fot foran og én fot bak.",
    "Hold føttene på samme sted hele tiden.",
    "Bøy begge knær og senk kroppen rett ned.",
    "Press deg opp igjen gjennom den fremste foten.",
    "Gjør alle repetisjonene og bytt deretter bein."
  ]),
  hip: item("Bakside", "Ettbeins hoftebøy", "3 × 8 per bein", [
    "Stå på ett bein. Hold i en vegg eller stol hvis du trenger balanse.",
    "Bøy kneet du står på litt.",
    "Skyv rumpa bakover mens overkroppen går frem.",
    "La det andre beinet gå bak deg.",
    "Reis deg rolig opp igjen. Hold ryggen rett."
  ]),
  calf: item("Legg", "Stå på tå på ett bein", "3 × 12 per bein", [
    "Stå ved en vegg eller stol.",
    "Stå på ett bein og hold lett med hånden hvis du trenger balanse.",
    "Løft hælen så høyt du kan.",
    "Senk hælen rolig ned til gulvet.",
    "Gjør alle repetisjonene og bytt bein."
  ]),
  push: item("Overkropp", "Armhevinger", "3 × 8–15", [
    "Sett hendene i gulvet litt bredere enn skuldrene.",
    "Strekk beina bak deg og hold kroppen rett.",
    "Bøy albuene og senk brystet rolig mot gulvet.",
    "Press deg opp igjen uten at hofta synker.",
    "Blir det for tungt, sett hendene på en benk eller stol i stedet."
  ]),
  groin: item("Lyske", "Sideplanke med kne på stol", "2 × 6–8 per side", [
    "Ligg på siden ved en lav stol eller benk.",
    "Legg kneet på det øverste beinet oppå stolen.",
    "Støtt overkroppen på albuen.",
    "Løft hofta opp fra gulvet.",
    "Senk rolig ned igjen. Bytt side når du er ferdig."
  ]),
  sideplank: item("Mage / side", "Sideplanke", "2 × 25–35 sek per side", [
    "Ligg på siden og støtt deg på albuen.",
    "Ha beina strake og føttene oppå hverandre.",
    "Løft hofta opp fra gulvet.",
    "Hold kroppen så rett som mulig mens tiden går.",
    "Blir det for tungt, bøy knærne og støtt på kneet."
  ]),
  pogo: item("Spenst", "Små raske hopp", "3 × 15", [
    "Stå med føttene omtrent i hoftebredde.",
    "Hold kroppen ganske høy og knærne bare litt bøyd.",
    "Gjør små raske hopp rett opp.",
    "Prøv å være kort tid i gulvet mellom hvert hopp.",
    "Stopp hvis hoppene blir tunge eller du får smerte."
  ]),
  up: item("Spenst", "Hopp rett opp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knær og hofter og før armene bakover.",
    "Sving armene frem og hopp så høyt du kan.",
    "Land på begge beina med myke knær.",
    "Finn balansen og ta en kort pause før neste hopp."
  ]),
  broad: item("Spenst", "Lengdehopp", "3 × 3", [
    "Stå med føttene omtrent i skulderbredde.",
    "Bøy litt i knærne og før armene bakover.",
    "Sving armene frem og hopp så langt frem du klarer.",
    "Land på begge beina med myke knær.",
    "Stå stille et øyeblikk før neste hopp."
  ]),
  onelegjump: item("Spenst", "Hopp frem på ett bein", "2 × 4 per bein", [
    "Stå på ett bein.",
    "Bøy kneet litt.",
    "Hopp kontrollert fremover.",
    "Land på samme bein med kneet litt bøyd.",
    "Finn balansen før neste hopp. Start med korte hopp."
  ]),
  sidejump: item("Spenst", "Hopp side til side", "2 × 5 per side", [
    "Stå på ett bein.",
    "Hopp kontrollert sidelengs og land på det andre beinet.",
    "Bøy kneet litt når du lander.",
    "Finn balansen før du hopper tilbake.",
    "Start med korte hopp og øk bare når du har kontroll."
  ]),
  jumpsprint: item("Spenst + fart", "Hopp + kort sprint", "4 repetisjoner", [
    "Stå klar med god plass foran deg.",
    "Gjør ett kraftig hopp rett opp.",
    "Land på begge beina med myke knær.",
    "Sprint direkte 5–8 meter frem.",
    "Gå rolig tilbake og hvil 60–90 sekunder før neste gang."
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
      item("Styrke", "Utfall på stedet", "2 × 6 per bein", strengthItems.split.guide),
      item("Spenst", "Hopp rett opp", "3 × 3", strengthItems.up.guide),
      item("Bakside", "Ettbeins hoftebøy", "2 × 8 per bein", strengthItems.hip.guide),
      item("Spenst", "Små raske hopp", "3 × 12", strengthItems.pogo.guide),
      item("Legg", "Stå på tå på ett bein", "2 × 12 per bein", strengthItems.calf.guide),
      item("Spenst + fart", "Hopp + kort sprint", "3 repetisjoner", strengthItems.jumpsprint.guide)
    ]
  }
};


const descriptions={strength:"Styrk bein, legger, overkropp og kjernemuskulatur. Utfør repetisjonene rolig og kontrollert.",jump:"Tren på å hoppe eksplosivt og lande stabilt. Ta god pause mellom hoppene.",combo:"En balansert økt med både kontrollert styrke og korte eksplosive aksjoner."};
const times={strength:"20–25 min",jump:"15–20 min",combo:"20–25 min"};
const icons={strength:"🏋️",jump:"↟",combo:"⚡"};
const cues={
"Utfall på stedet":["Hold overkroppen rolig og kneet i samme retning som tærne.","Unngå at fremre kne faller innover.","45–75 sekunder"],
"Ettbeins hoftebøy":["Skyv hoften bakover og hold ryggen lang.","Ikke vri hoften eller rund ryggen.","45–75 sekunder"],
"Stå på tå på ett bein":["Løft deg høyt og senk hælen langsomt.","Ikke sprett gjennom repetisjonene.","45–60 sekunder"],
"Armhevinger":["Hold mage og sete aktive gjennom hele bevegelsen.","Ikke la hoften synke.","45–75 sekunder"],
"Sideplanke med kne på stol":["Hold kroppen på linje og løft hoften kontrollert.","Ikke la hoften synke. Start med få repetisjoner.","60–90 sekunder"],
"Sideplanke":["Hold kroppen rett og pust rolig.","Ikke vri overkroppen.","30–60 sekunder"],
"Små raske hopp":["Hold hoppene lave og land lett.","Ikke fortsett når hoppene blir tunge.","60–90 sekunder"],
"Hopp rett opp":["Hopp kraftfullt, land mykt og finn balansen.","Ikke la knærne falle innover.","60–90 sekunder"],
"Lengdehopp":["Bruk armene og land med myke knær.","Ikke hopp videre før du har kontroll på landingen.","60–90 sekunder"],
"Hopp frem på ett bein":["Start med korte hopp og stabil landing.","Ikke la kneet falle innover.","60–90 sekunder"],
"Hopp side til side":["Hold balansen etter hver landing.","Ikke øk lengden før du mestrer korte hopp.","60–90 sekunder"],
"Hopp + kort sprint":["Land kontrollert og sprint først når du har balansen.","Sørg for god plass til å bremse.","90–120 sekunder"]
};
const $=id=>document.getElementById(id);let key=null,completed=new Set(),single=false,index=0;
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function update(){const n=programs[key].items.length;$("progressBar").style.width=(completed.size/n*100)+"%";$("progressText").textContent=completed.size+" av "+n+" øvelser fullført"+(completed.size===n?" · Bra jobbet!":"");[...$("exerciseList").children].forEach((e,i)=>e.hidden=single&&i!==index);$("exerciseNav").hidden=!single;$("position").textContent=(index+1)+" av "+n;$("prev").disabled=index===0;$("next").disabled=index===n-1;$("allView").classList.toggle("selected",!single);$("oneView").classList.toggle("selected",single);$("allView").setAttribute("aria-pressed",String(!single));$("oneView").setAttribute("aria-pressed",String(single))}
function render(){$("exerciseList").replaceChildren();programs[key].items.forEach((ex,i)=>{const card=el("article","exercise-card");const header=el("div","exercise-heading");header.append(el("span","number",String(i+1)));const label=el("div","exercise-label");label.append(el("span","tag",ex.tag),el("h3","",ex.title),el("strong","dose",ex.dose));header.append(label);card.append(header);
const guidance=el("div","guidance");guidance.hidden=i!==0;guidance.append(el("h4","","Slik gjør du"));const steps=el("ol");ex.guide.forEach(t=>steps.append(el("li","",t)));guidance.append(steps);const tip=cues[ex.title];if(tip){guidance.append(el("p","focus","✓ Viktig: "+tip[0]),el("p","avoid","Pass på: "+tip[1]));card.append(el("p","rest","Anbefalt pause mellom sett: "+tip[2]))}else{guidance.append(el("p","focus","✓ Start rolig og bli varm uten å bli sliten."));card.append(el("p","rest","Oppvarming · ingen fast pause"))}
const actions=el("div","exercise-actions"),expand=el("button","expand",i===0?"Skjul forklaring ▴":"Slik gjør du ▾"),done=el("button","done","Marker fullført");expand.type=done.type="button";expand.setAttribute("aria-expanded",String(i===0));expand.addEventListener("click",()=>{guidance.hidden=!guidance.hidden;expand.textContent=guidance.hidden?"Slik gjør du ▾":"Skjul forklaring ▴";expand.setAttribute("aria-expanded",String(!guidance.hidden))});done.addEventListener("click",()=>{if(completed.has(i))completed.delete(i);else completed.add(i);done.classList.toggle("checked",completed.has(i));done.textContent=completed.has(i)?"✓ Fullført":"Marker fullført";update()});actions.append(expand,done);card.append(actions,guidance);$("exerciseList").append(card)});update()}
function open(k){if(!programs[k])return;key=k;completed.clear();single=false;index=0;$("sessionTitle").textContent=programs[k].name;$("sessionLead").textContent=descriptions[k];$("sessionMeta").textContent=times[k]+" · "+programs[k].items.length+" øvelser inkludert oppvarming";$("menu").hidden=true;$("session").hidden=false;render();history.replaceState(null,"","#"+k);window.scrollTo(0,0)}
function back(){$("session").hidden=true;$("menu").hidden=false;history.replaceState(null,"",location.pathname);window.scrollTo(0,0)}
Object.entries(programs).forEach(([k,p])=>{const b=el("button","program-card");b.type="button";b.append(el("span","program-icon",icons[k]));const copy=el("span","program-copy");copy.append(el("strong","",p.name),el("small","",descriptions[k]),el("em","",times[k]+" · "+p.items.length+" øvelser"));b.append(copy,el("span","chevron","›"));b.addEventListener("click",()=>open(k));$("programList").append(b)});
$("backToMenu").addEventListener("click",back);$("allView").addEventListener("click",()=>{single=false;update()});$("oneView").addEventListener("click",()=>{single=true;update()});$("prev").addEventListener("click",()=>{index=Math.max(0,index-1);update();$("sessionTitle").scrollIntoView({behavior:"smooth"})});$("next").addEventListener("click",()=>{index=Math.min(programs[key].items.length-1,index+1);update();$("sessionTitle").scrollIntoView({behavior:"smooth"})});$("restart").addEventListener("click",()=>{completed.clear();index=0;render()});const hash=location.hash.slice(1);if(programs[hash])open(hash);
})();