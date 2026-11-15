"use strict";
(function(){
  const warmup = {
    t: "Rolig oppvarming",
    d: "2 min",
    i: "Start med rolig jogg på stedet eller lett bevegelse. Målet er bare å bli varm før styrkeøvelsene."
  };

  const programs = {
    hamstring: [
      warmup,
      { t: "Nordic (bakside lår)", d: "2 x 4", i: "Få en annen person til å holde anklene. Len deg rolig frem og ta imot med hendene før du mister kontrollen." },
      { t: "Ettbeins hoftebøy", d: "2 x 6 per side", i: "Stå på ett bein. Skyv rumpa bakover mens overkroppen går frem. Reis deg rolig opp igjen." },
      { t: "Hofteløft med hælene langt unna", d: "2 x 8", i: "Ligg på ryggen med føttene litt lenger fra rumpa enn ved vanlig hofteløft. Press hælene ned og løft rumpa opp." },
      { t: "Høyfartsløp", d: "3 x 20 m · ca. 70–85 %", i: "Start kontrollert og løp litt raskere for hvert drag. Gå tilbake og hvil mellom dragene." }
    ],

    legg: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå ved en vegg. Løft hælene opp så du står på tå og senk rolig ned igjen." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Bøy knærne litt og hold dem bøyd mens du løfter hælene opp og ned." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Stå på ett bein ved en vegg. Løft hælen høyt opp og senk rolig ned." },
      { t: "Små raske hopp", d: "2 x 15", i: "Gjør små raske hopp rett opp. Hold hoppene lave og lette." }
    ],

    akilles: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå på flatt gulv. Løft hælene kontrollert opp og senk rolig ned." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Bøy knærne litt og hold dem bøyd mens du løfter hælene." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Bruk vegg eller stol for balanse. Løft hælen høyt og senk rolig ned." },
      { t: "Små raske hopp", d: "2 x 15", i: "Små raske hopp med begge bein. Stopp hvis Akilles eller hælen begynner å gjøre vondt." }
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
      { t: "Klem ball mellom knærne", d: "2 x 20 sek", i: "Ligg på ryggen med en ball eller pute mellom knærne. Klem rolig sammen og hold." },
      { t: "Copenhagen-planke (lett)", d: "2 x 6 per side", i: "Ligg på siden med kneet på en stol eller benk. Løft hofta opp og senk rolig ned." },
      { t: "Sideutfall", d: "2 x 6 per side", i: "Ta et steg til siden, bøy kneet på beinet du går mot og skyv deg tilbake til start." },
      { t: "Raske sidesteg", d: "3 x 10 m", i: "Flytt deg sidelengs med korte raske steg uten å krysse beina." }
    ],

    kne: [
      warmup,
      { t: "Knebøy til benk", d: "2 x 8", i: "Stå foran en stol. Senk rumpa rolig ned til stolen og reis deg opp igjen." },
      { t: "Splittknebøy", d: "2 x 6 per side", i: "Stå med én fot foran og én bak. Senk kroppen rett ned og press deg opp igjen." },
      { t: "Gå ned fra lavt trinn", d: "2 x 6 per side", i: "Stå på et lavt trinn på ett bein. Senk den andre hælen rolig mot gulvet og press deg opp igjen." },
      { t: "Hopp og landing", d: "2 x 6", i: "Gjør små hopp og land mykt med knærne litt bøyd. Hold balansen før neste hopp." }
    ],

    ankel: [
      warmup,
      { t: "Ettbeins balanse", d: "2 x 30 sek per side", i: "Stå ved en vegg. Løft én fot og stå rolig på det andre beinet." },
      { t: "Balanse med fotstrekk", d: "2 runder per side", i: "Stå på ett bein og berør gulvet lett med den andre foten foran, til siden og skrått bak." },
      { t: "Ettbeins tåhev", d: "2 x 10 per side", i: "Stå på ett bein ved en vegg. Løft hælen høyt opp og senk rolig ned." },
      { t: "Hopp og landing", d: "2 x 8", i: "Gjør små hopp og land mykt og stabilt. Start rett opp og legg senere inn litt sideveis hopp." }
    ]
  };



const labels={hamstring:"Bakside lår",legg:"Legg",akilles:"Akilles",hael:"Hæl",lyske:"Lyske",kne:"Kne",ankel:"Ankel"};
const icons={hamstring:"⚡",legg:"🦵",akilles:"↟",hael:"👟",lyske:"◆",kne:"◉",ankel:"⌁"};
const goals={hamstring:"Styrke for bakside lår og sprint",legg:"Styrke og kontroll for leggene",akilles:"Styrke for legg og sene",hael:"Fotstyrke, balanse og landing",lyske:"Styrke og kontroll i sidebevegelser",kne:"Knestyrke og stabile landinger",ankel:"Balanse og stabilitet"};
const tips={
"Nordic (bakside lår)":["Hold hofter og overkropp på linje.","Ikke rykk deg ned; øvelsen er tung. Begynn forsiktig.","Partner og mykt underlag"],
"Ettbeins hoftebøy":["Hold ryggen lang og hoftene rett frem.","Ikke vri overkroppen for å komme dypere."],
"Hofteløft med hælene langt unna":["Press gjennom hælene og hold hoftene stabile.","Unngå å svaie i korsryggen."],
"Høyfartsløp":["Øk farten gradvis og hvil mellom dragene.","Ikke løp maks når beina er tunge.","Trygg rett strekning på minst 20 meter"],
"Copenhagen-planke (lett)":["Hold kroppen mest mulig rett og løft kontrollert.","Ikke la hoften synke.","Stabil benk og mykt underlag"],
"Klem ball mellom knærne":["Klem jevnt og pust normalt.","Ikke klem så hardt at det gjør vondt.","Ball eller pute"],
"Balanse med fotstrekk":["Hold kneet over foten og stå stødig.","Ikke la kneet falle innover."],
"Gå ned fra lavt trinn":["Senk langsomt og hold kneet over foten.","Ikke slipp hoften ned til siden.","Lavt, stabilt trinn"],
"Splittknebøy":["Press gjennom fremre fot og hold balansen.","Ikke la kneet falle innover."],
"Små raske hopp":["Hold hoppene små, lette og rytmiske.","Ikke land tungt."],
"Hopp og landing":["Land mykt med knær og tær i samme retning.","Ikke la knærne falle innover."],
"Ettbeins balanse":["Se på et fast punkt og hold hoften stabil.","Ikke lås kneet helt."],
"Raske sidesteg":["Hold deg lav og ta korte sidesteg.","Ikke kryss beina."]
};
const list=document.getElementById("preventionList"),detail=document.getElementById("preventionDetail"),chooser=document.getElementById("preventionChooser"),title=document.getElementById("programTitle"),steps=document.getElementById("programSteps");
let current=null,done=new Set(),single=false,index=0;
function el(tag,cls,txt){const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x}
function update(){const n=programs[current].length;document.getElementById("sessionCount").textContent=done.size+" av "+n+" fullført";document.getElementById("sessionBar").style.width=(done.size/n*100)+"%";[...steps.children].forEach((x,i)=>x.hidden=single&&i!==index);document.getElementById("sessionNavigation").hidden=!single;document.getElementById("exercisePosition").textContent=(index+1)+" av "+n;document.getElementById("previousExercise").disabled=index===0;document.getElementById("nextExercise").disabled=index===n-1;document.getElementById("showAll").classList.toggle("selected",!single);document.getElementById("showOne").classList.toggle("selected",single)}
function render(){steps.replaceChildren();programs[current].forEach((item,i)=>{const card=el("article","prevention-step");const head=el("div","prevention-step-head");const number=el("span","step-number",String(i+1));const name=el("div","exercise-name");name.append(el("h3","",item.t),el("strong","prevention-dose",item.d));head.append(number,name);card.append(head);
const actions=el("div","exercise-actions"),expand=el("button","exercise-expand","Slik gjør du ▾"),complete=el("button","exercise-complete","Marker fullført");expand.type=complete.type="button";const guide=el("div","exercise-guide");guide.hidden=true;const instructions=el("ol","exercise-instructions");item.i.split(/(?<=[.!?])\s+/).filter(Boolean).forEach(t=>instructions.append(el("li","",t)));guide.append(el("h4","","Steg for steg"),instructions);const t=tips[item.t];if(t){guide.append(el("p","exercise-tip","✓ Husk: "+t[0]),el("p","exercise-warning","Unngå: "+t[1]));if(t[2])guide.append(el("p","exercise-equipment","Du trenger: "+t[2]))}else guide.append(el("p","exercise-tip","✓ Gjør bevegelsen rolig og kontrollert."));expand.textContent="Slik gjør du ▾";expand.setAttribute("aria-expanded","false");expand.addEventListener("click",()=>{guide.hidden=!guide.hidden;expand.textContent=guide.hidden?"Slik gjør du ▾":"Skjul forklaring ▴";expand.setAttribute("aria-expanded",String(!guide.hidden))});complete.addEventListener("click",()=>{if(done.has(i))done.delete(i);else done.add(i);complete.classList.toggle("is-done",done.has(i));complete.textContent=done.has(i)?"✓ Fullført":"Marker fullført";update()});actions.append(expand,complete);card.append(actions,guide);steps.append(card)});update()}
function open(key){if(!programs[key])return;current=key;done=new Set();single=false;index=0;title.textContent=labels[key];chooser.hidden=true;detail.hidden=false;render();window.scrollTo(0,0);history.replaceState(null,"","#"+key)}
function showList(){detail.hidden=true;chooser.hidden=false;history.replaceState(null,"",location.pathname);window.scrollTo(0,0)}
Object.keys(programs).forEach(key=>{const b=el("button","home-action prevention-option");b.type="button";b.append(el("span","home-action-icon",icons[key]));const copy=el("span","home-action-copy");copy.append(el("strong","",labels[key]),el("small","",goals[key]));b.append(copy,el("span","home-chevron","›"));b.addEventListener("click",()=>open(key));list.append(b)});
document.getElementById("programBack").addEventListener("click",showList);
document.getElementById("resetSession").addEventListener("click",()=>{done.clear();render()});
document.getElementById("showAll").addEventListener("click",()=>{single=false;update()});
document.getElementById("showOne").addEventListener("click",()=>{single=true;update()});
document.getElementById("previousExercise").addEventListener("click",()=>{index=Math.max(0,index-1);update()});
document.getElementById("nextExercise").addEventListener("click",()=>{index=Math.min(programs[current].length-1,index+1);update()});
const hash=location.hash.slice(1);if(programs[hash])open(hash);
})();
