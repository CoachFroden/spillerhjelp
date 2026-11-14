"use strict";
/* Self-contained, lightweight schematic exercise illustrations. No external image hosting. */
window.exerciseIllustrations=(function(){
const P={
stand:[[65,32,65,65,53,91,52,121,76,91,79,121,47,62,37,85,83,62,92,85],[65,32,65,65,53,91,52,121,76,91,79,121,47,62,37,85,83,62,92,85]],
lunge:[[65,32,65,65,53,90,43,118,77,89,96,117,47,63,37,83,83,63,90,84],[67,47,67,76,49,100,33,119,90,96,105,119,49,74,42,96,83,74,91,94]],
hinge:[[65,32,65,65,53,91,52,121,76,91,79,121,47,62,37,85,83,62,92,85],[97,65,79,85,58,91,53,121,104,88,131,91,77,85,66,105,91,85,100,105]],
calf:[[65,32,65,65,53,91,52,121,76,91,79,121,47,62,37,85,83,62,92,85],[65,27,65,60,53,86,52,115,76,86,79,115,47,57,37,80,83,57,92,80]],
push:[[38,79,67,82,95,89,125,93,96,93,125,96,59,80,63,110,78,84,82,112],[38,94,67,94,95,98,125,101,96,100,125,103,59,92,57,111,78,96,77,112]],
side:[[35,79,62,82,91,87,125,91,91,87,125,91,54,81,54,111,72,83,82,98],[35,64,62,65,91,68,125,71,91,68,125,71,54,65,54,109,72,67,82,90]],
jump:[[65,39,65,68,53,94,43,117,77,94,89,117,48,64,36,86,82,64,94,86],[65,18,65,47,53,73,43,92,77,73,89,92,48,44,36,18,82,44,94,18]],
pogo:[[65,35,65,65,53,91,53,119,77,91,77,119,48,63,39,83,82,63,91,83],[65,19,65,49,53,75,53,99,77,75,77,99,48,47,39,67,82,47,91,67]],
broad:[[48,41,58,66,45,90,28,112,76,88,94,109,41,64,23,81,74,64,96,82],[93,29,95,54,80,78,79,102,110,78,126,102,78,52,65,33,112,52,127,34]],
onejump:[[53,37,62,65,51,90,48,119,77,91,88,102,45,63,33,82,79,63,92,78],[89,23,91,52,78,78,84,102,108,78,127,84,77,50,64,33,107,51,125,39]],
sidejump:[[46,34,54,63,43,90,37,117,67,91,80,111,37,60,25,80,71,61,85,81],[93,26,99,56,85,84,83,111,113,83,124,104,83,54,68,75,113,55,127,75]],
copenhagen:[[37,78,65,81,93,81,121,81,93,81,121,81,55,80,54,110,78,81,85,101],[37,62,65,65,93,65,121,65,93,65,121,65,55,64,54,109,78,65,85,91]],
sprint:[[45,37,60,64,47,87,26,109,78,84,101,108,43,61,29,77,75,62,91,46],[80,34,93,60,78,83,56,107,106,81,128,90,76,57,59,42,107,58,124,76]],
warm:[[65,32,65,65,53,91,52,121,76,91,79,121,47,62,37,85,83,62,92,85],[65,32,65,65,53,91,43,108,76,91,94,106,47,62,32,75,83,62,99,74]]
};
const type={
"Gjør kroppen klar":"warm","Utfall på stedet":"lunge","Ettbeins hoftebøy":"hinge",
"Stå på tå på ett bein":"calf","Armhevinger":"push","Sideplanke med kne på stol":"copenhagen",
"Sideplanke":"side","Små raske hopp":"pogo","Hopp rett opp":"jump","Lengdehopp":"broad",
"Hopp frem på ett bein":"onejump","Hopp side til side":"sidejump","Hopp + kort sprint":"sprint"
};
function figure(a,shift){
 const x=i=>a[i]+shift,y=i=>a[i+1];
 const line=(i,j)=>'<path d="M'+x(i)+' '+y(i)+' L'+x(j)+' '+y(j)+'"/>';
 return '<g fill="none" stroke="#dce9fa" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">'+
 '<circle cx="'+x(0)+'" cy="'+y(0)+'" r="10" fill="#e8bfa5" stroke="#e8bfa5"/>'+
 line(2,0)+line(2,4)+line(4,6)+line(4,8)+line(8,10)+line(2,12)+line(12,14)+line(2,16)+line(16,18)+'</g>';
}
function make(name){
 const t=type[name]||"warm",frames=P[t],base=t==="push"||t==="side"||t==="copenhagen"?121:133;
 const bench=t==="copenhagen"?'<path d="M97 83h42m-38 0v45m34-45v45" stroke="#9fb2d4" stroke-width="5" fill="none"/>':"";
 const floor='<path d="M12 '+base+'H148" stroke="#52667a" stroke-width="2" stroke-dasharray="4 5"/>';
 const arrow=t==="jump"||t==="pogo"||t==="calf"||t==="copenhagen"?'M80 111V101':t==="sidejump"?'M66 126H91':t==="broad"||t==="onejump"||t==="sprint"?'M57 128H98':t==="hinge"?'M92 115L109 104':'M104 120L111 109';
 const framesSvg=frames.map((p,i)=>'<g transform="translate('+(i*170+2)+',0)">'+floor+bench+figure(p,0)+'</g>').join("");
 return '<svg class="exercise-illustration" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 165" role="img" aria-label="'+name+': skjematisk start- og sluttstilling"><rect width="342" height="165" rx="15" fill="#13243a"/><path d="M171 12V151" stroke="#34465c" stroke-dasharray="4 5"/>'+framesSvg+'<path d="'+arrow+'" stroke="#6ee7b7" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(170,0)"/><text x="85" y="154" text-anchor="middle" fill="#afc4d8" font-size="11" font-family="system-ui">START</text><text x="255" y="154" text-anchor="middle" fill="#afc4d8" font-size="11" font-family="system-ui">BEVEGELSE</text></svg>';
}
return {make};
})();
