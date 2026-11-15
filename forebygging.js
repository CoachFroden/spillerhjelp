"use strict";
(function(){
  const warmup = {
    t: "Rolig oppvarming",
    d: "3–4 min",
    i: "Start med 1 minutt rolig gange eller lett jogg på stedet. Beveg armene naturlig og øk tempoet litt etter hvert. Fortsett med 30 sekunder rolige høye kneløft, der du løfter ett kne om gangen uten å lene deg bakover. Ta deretter 30 sekunder rolige hælspark, der du fører hælene mot rumpa uten å sparke hardt. Gjør 30 sekunder sidesteg til høyre og venstre med litt bøy i knærne. Avslutt med 30–60 sekunder lett jogg og noen rolige ankel- og hoftebevegelser. Du skal kjenne deg varm og klar, ikke sliten eller andpusten. Stopp hvis en bevegelse gjør vondt."
  };

  const programs = {
    hamstring: [
      warmup,
      { t: "Nordic (bakside lår)", d: "2 x 4", i: "Legg deg på knærne på en myk matte, og få en partner til å holde anklene godt fast. Hold kroppen mest mulig rett fra knær til skuldre og stram magen. Len hele kroppen langsomt fremover mens du prøver å bremse med musklene på baksiden av lårene. Når du ikke klarer å holde igjen mer, tar du imot med hendene på gulvet. Skyv deg rolig tilbake til start. Begynn med få repetisjoner og stopp ved smerte." },
      { t: "Ettbeins hoftebøy", d: "2 x 6 per side", i: "Stå på ett bein med kneet litt bøyd og se rett frem. Skyv hoften bakover mens overkroppen heller frem og det andre beinet strekkes bakover. Hold ryggen lang og hoftene vendt mot gulvet. Gå bare så langt ned som du klarer uten å miste balansen. Press gjennom standfoten og reis deg rolig opp igjen. Bytt bein." },
      { t: "Hofteløft med hælene langt unna", d: "2 x 8", i: "Ligg på ryggen med knærne bøyd og føttene i gulvet. Flytt hælene litt lenger bort fra rumpa enn i et vanlig hofteløft. Ha armene i gulvet ved siden av kroppen. Press hælene ned og løft hoftene til kroppen danner en omtrent rett linje fra skuldre til knær. Hold et øyeblikk uten å svaie i korsryggen. Senk rumpa rolig tilbake." },
      { t: "Høyfartsløp", d: "3 x 20 m · ca. 70–85 %", i: "Finn en flat, trygg strekning på minst 20 meter og varm godt opp først. Start hvert drag kontrollert og øk farten gradvis gjennom løpet. Hold blikket fremover og løp med naturlige armbevegelser. Løp raskt, men ikke alt du klarer; målet er god teknikk. Brems gradvis etter målstreken. Gå rolig tilbake og hvil før neste drag." }
    ],

    legg: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå på flatt gulv med føttene omtrent i hoftebredde og knærne strake, men ikke låste. Hold lett i en vegg eller stol for balansen. Press deg rolig opp på tå med vekten over stortåballen og resten av forfoten. Hold øverst et kort øyeblikk uten å lene kroppen fremover. Senk hælene langsomt helt ned igjen. Gjør 12 repetisjoner, hvil litt og gjenta." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Stå på flatt gulv med føttene omtrent i hoftebredde og hold lett i en vegg. Bøy begge knærne litt, som om du skal sette deg på en høy stol. Hold knærne like mye bøyd mens du løfter hælene rolig fra gulvet. Hold et kort øyeblikk på tå og senk hælene kontrollert ned. Unngå at knærne faller innover eller at du retter dem ut underveis." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Stå på flatt gulv på ett bein og hold lett i en vegg for balansen. Løft den andre foten fra gulvet og hold kroppen oppreist. Press deg rolig opp på tå på standbeinet uten å vri ankelen. Hold et kort øyeblikk og senk hælen langsomt ned. Bytt bein etter antall repetisjoner. Er dette for vanskelig, start med tåhev på begge bein." },
      { t: "Små raske hopp", d: "2 x 15", i: "Stå med føttene omtrent i hoftebredde og myke knær. Gjør små hopp rett opp med begge bein samtidig. Land lett på forfoten og la hælene nærme seg gulvet mellom hoppene. Hold hoppene lave og finn en jevn rytme. Stopp hvis du får vondt eller mister kontrollen." }
    ],

    akilles: [
      warmup,
      { t: "Tåhev – strakt kne", d: "2 x 12", i: "Stå på flatt gulv med føttene omtrent i hoftebredde og knærne strake, men ikke låste. Hold lett i en vegg eller stol for balansen. Press deg rolig opp på tå med vekten over stortåballen og resten av forfoten. Hold øverst et kort øyeblikk uten å lene kroppen fremover. Senk hælene langsomt helt ned igjen. Gjør 12 repetisjoner, hvil litt og gjenta." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Stå på flatt gulv med føttene omtrent i hoftebredde og hold lett i en vegg. Bøy begge knærne litt, som om du skal sette deg på en høy stol. Hold knærne like mye bøyd mens du løfter hælene rolig fra gulvet. Hold et kort øyeblikk på tå og senk hælene kontrollert ned. Unngå at knærne faller innover eller at du retter dem ut underveis." },
      { t: "Ettbeins tåhev", d: "2 x 8 per side", i: "Stå på flatt gulv på ett bein og hold lett i en vegg for balansen. Løft den andre foten fra gulvet og hold kroppen oppreist. Press deg rolig opp på tå på standbeinet uten å vri ankelen. Hold et kort øyeblikk og senk hælen langsomt ned. Bytt bein etter antall repetisjoner. Er dette for vanskelig, start med tåhev på begge bein." },
      { t: "Små raske hopp", d: "2 x 15", i: "Stå med føttene omtrent i hoftebredde og myke knær. Gjør små hopp rett opp med begge bein samtidig. Land lett på forfoten og la hælene nærme seg gulvet mellom hoppene. Hold hoppene lave og finn en jevn rytme. Stopp hvis du får vondt eller mister kontrollen." }
    ],

    hael: [
      warmup,
      { t: "Tåhev – begge bein", d: "2 x 12", i: "Stå med føttene omtrent i hoftebredde på flatt gulv. Hold lett i en vegg eller stol hvis du trenger balanse. Løft begge hælene samtidig og press deg rolig opp på tå. Hold øverst et kort øyeblikk og senk kontrollert helt ned. Hold kroppen oppreist og unngå å rulle anklene utover." },
      { t: "Tåhev – bøyd kne", d: "2 x 12", i: "Stå på flatt gulv med føttene omtrent i hoftebredde og hold lett i en vegg. Bøy begge knærne litt, som om du skal sette deg på en høy stol. Hold knærne like mye bøyd mens du løfter hælene rolig fra gulvet. Hold et kort øyeblikk på tå og senk hælene kontrollert ned. Unngå at knærne faller innover eller at du retter dem ut underveis." },
      { t: "Ettbeins balanse", d: "2 x 30 sek per side", i: "Stå på flatt gulv ved siden av en vegg eller stol. Flytt vekten over på ett bein og løft den andre foten litt fra gulvet. Se på et fast punkt foran deg og hold kneet på standbeinet litt mykt. Prøv å holde hoften rett og kroppen mest mulig i ro. Sett ned foten hvis du mister balansen, og prøv igjen." },
      { t: "Hopp og landing", d: "2 x 8", i: "Stå med føttene omtrent i hoftebredde og litt bøy i knærne. Gjør et lite hopp rett opp med begge bein. Land stille og mykt med hofter og knær lett bøyd. Pass på at knærne peker samme vei som tærne. Finn balansen før neste hopp, og øk ikke høyden før du lander kontrollert." }
    ],

    lyske: [
      warmup,
      { t: "Klem ball mellom knærne", d: "2 x 20 sek", i: "Ligg på ryggen med bøyde knær og begge føtter i gulvet. Legg en myk ball eller pute mellom knærne. Stram forsiktig på innsiden av lårene ved å presse knærne mot ballen. Hold et jevnt trykk mens du puster normalt. Slipp rolig opp etter angitt tid. Ikke klem så hardt at du får vondt." },
      { t: "Copenhagen-planke (lett)", d: "2 x 6 per side", i: "Legg en myk matte ved siden av en lav, stabil benk. Ligg på siden og støtt deg på underarmen med albuen under skulderen. Legg kneet på det øverste beinet oppå benken, mens det nederste beinet er under. Stram magen og løft hoften forsiktig fra gulvet. Hold kroppen mest mulig rett et kort øyeblikk og senk kontrollert ned igjen. Begynn med kort bevegelse og få repetisjoner." },
      { t: "Sideutfall", d: "2 x 6 per side", i: "Stå med føttene omtrent i hoftebredde og blikket frem. Ta et kontrollert steg langt ut til siden. Bøy kneet på beinet du steg ut med, og skyv hoften bakover mens det andre beinet er mer strakt. Hold hele foten i gulvet og la kneet peke samme vei som tærne. Press deg tilbake til start og gjenta på andre siden." },
      { t: "Raske sidesteg", d: "3 x 10 m", i: "Stå med litt bøy i knærne og føttene omtrent i hoftebredde. Senk hoften litt og se fremover. Ta korte, raske steg sidelengs over en strekning på 10 meter. Skyv fra med beinet lengst fra retningen du beveger deg i. Hold føttene fra hverandre og unngå å krysse beina. Gå rolig tilbake før neste drag." }
    ],

    kne: [
      warmup,
      { t: "Knebøy til benk", d: "2 x 8", i: "Stå foran en stabil stol eller benk med føttene omtrent i skulderbredde. Hold blikket fremover og strekk armene litt frem for balansen. Skyv rumpa bakover og bøy knærne kontrollert som om du skal sette deg. Berør stolen lett uten å falle ned på den. Press gjennom hele foten og reis deg opp igjen. Hold knærne i samme retning som tærne." },
      { t: "Splittknebøy", d: "2 x 6 per side", i: "Stå med én fot foran den andre, med god avstand mellom føttene. Hold overkroppen oppreist og blikket frem. Bøy begge knærne og senk kroppen rolig rett ned. Gå bare så dypt som du klarer med kontroll. Press gjennom den fremre foten og reis deg opp igjen. Hold fremre kne i samme retning som tærne og bytt bein etter repetisjonene." },
      { t: "Gå ned fra lavt trinn", d: "2 x 6 per side", i: "Stå på et lavt, stabilt trinn med én fot, og la den andre foten henge utenfor kanten. Hold gjerne i et rekkverk eller en vegg for balansen. Bøy kneet på standbeinet langsomt slik at hælen på det frie beinet nærmer seg gulvet. Berør gulvet lett uten å legge vekten over på den frie foten. Press deg kontrollert opp igjen. Hold kneet over foten og hoften stabil." },
      { t: "Hopp og landing", d: "2 x 6", i: "Stå med føttene omtrent i hoftebredde og litt bøy i knærne. Gjør et lite hopp rett opp med begge bein. Land stille og mykt med hofter og knær lett bøyd. Pass på at knærne peker samme vei som tærne. Finn balansen før neste hopp, og øk ikke høyden før du lander kontrollert." }
    ],

    ankel: [
      warmup,
      { t: "Ettbeins balanse", d: "2 x 30 sek per side", i: "Stå på flatt gulv ved siden av en vegg eller stol. Flytt vekten over på ett bein og løft den andre foten litt fra gulvet. Se på et fast punkt foran deg og hold kneet på standbeinet litt mykt. Prøv å holde hoften rett og kroppen mest mulig i ro. Sett ned foten hvis du mister balansen, og prøv igjen." },
      { t: "Balanse med fotstrekk", d: "2 runder per side", i: "Stå på ett bein ved siden av en vegg hvis du trenger støtte. Bøy kneet på standbeinet litt og hold hoften rett. Strekk den frie foten frem og berør gulvet lett med tærne. Før foten tilbake og strekk den deretter ut til siden og skrått bak. Flytt vekten minst mulig bort fra standbeinet. Gjør bevegelsene sakte og bytt bein." },
      { t: "Ettbeins tåhev", d: "2 x 10 per side", i: "Stå på flatt gulv på ett bein og hold lett i en vegg for balansen. Løft den andre foten fra gulvet og hold kroppen oppreist. Press deg rolig opp på tå på standbeinet uten å vri ankelen. Hold et kort øyeblikk og senk hælen langsomt ned. Bytt bein etter antall repetisjoner. Er dette for vanskelig, start med tåhev på begge bein." },
      { t: "Hopp og landing", d: "2 x 8", i: "Stå med føttene omtrent i hoftebredde og litt bøy i knærne. Gjør et lite hopp rett opp med begge bein. Land stille og mykt med hofter og knær lett bøyd. Pass på at knærne peker samme vei som tærne. Finn balansen før neste hopp, og øk ikke høyden før du lander kontrollert." }
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
