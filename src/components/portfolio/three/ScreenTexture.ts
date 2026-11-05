import { CanvasTexture, SRGBColorSpace } from "three";

type View = "plan" | "design" | "ready";
const W = 1440, H = 960;
function surface(width: number, height: number) {
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}
function finish(canvas: HTMLCanvasElement) { const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace; return texture; }
export function createScreenTexture(view: View = "ready") {
  const { canvas, ctx: c } = surface(W, H);
  const box = (x: number,y: number,w: number,h: number,fill: string,r = 16) => { c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill(); };
  const text = (s: string,x: number,y: number,size=22,color="#a0a7ab",weight=400) => { c.fillStyle=color;c.font=`${weight} ${size}px Arial, sans-serif`;c.fillText(s,x,y); };
  c.beginPath(); c.roundRect(0,0,W,H,22);c.clip();
  box(0,0,W,H,"#101518",0);
  box(0,0,W,62,"#1b2227",0);
  ["#74838c","#64757f","#546671"].forEach((color,i)=>{c.fillStyle=color;c.beginPath();c.arc(29+i*24,31,6,0,Math.PI*2);c.fill();});
  box(460,14,520,34,"#11171b",8);text("twoja-firma.pl",628,38,16,"#afbec7");
  text("Twoja firma",66,121,28,"#efefea",600);text("Oferta     O firmie     Kontakt",950,117,19);
  box(65,157,1310,1,"#2a343b",0);
  if(view === "plan") {
    text("01 / ZACZYNAMY OD TWOJEGO PLANU",66,220,18,"#acd1e8");
    text("Co chcesz osiągnąć?",66,312,57,"#efefea",500);
    text("Zamień swój pomysł w czytelną ofertę.",66,363,25);
    const rows = [["01", "Twoja oferta", "Co proponujesz swoim klientom?"],["02", "Twoi odbiorcy", "Do kogo chcesz dotrzeć?"],["03", "Kontakt", "Jak klient ma się z Tobą skontaktować?"]];
    rows.forEach(([n,title,desc],i)=>{const y=431+i*127;box(65,y,826,105,"#192229",12);text(n,88,y+43,18,"#acd1e8");text(title,145,y+41,25,"#efefea",500);text(desc,145,y+77,21);});
    box(938,254,435,560,"#16242e",20);text("TWÓJ KIERUNEK",975,306,17,"#acd1e8");
    const labels=["Pokaż, co robisz", "Zbuduj zaufanie", "Ułatw kontakt"];
    labels.forEach((s,i)=>{const y=356+i*148;box(974,y,360,89,"#233b49",12);text(s,1002,y+53,25,"#d7e6ef",500);if(i<2){c.strokeStyle="#7097ad";c.lineWidth=2;c.beginPath();c.moveTo(1154,y+89);c.lineTo(1154,y+148);c.stroke();}});
  } else {
    const ready=view==="ready";
    const g=c.createLinearGradient(750,190,1390,750);g.addColorStop(0,ready?"#294e63":"#263640");g.addColorStop(1,"#10171d");
    c.fillStyle=g;c.beginPath();c.roundRect(824,205,550,552,20);c.fill();
    text(ready?"TWÓJ POMYSŁ. GOTOWA STRONA.":"02 / TWÓJ PROJEKT",66,231,17,"#acd1e8");
    text("Twoja firma.",66,348,80,"#efefea",500);text("Dobrze pokazana.",66,444,76,"#acd1e8",500);
    text("Pokaż, co oferujesz.",66,511,28,"#b8c3ca");text("Daj klientom prosty sposób na kontakt.",66,553,25,"#b8c3ca");
    box(66,610,267,68,ready?"#acd1e8":"#9eafba",8);text("Porozmawiajmy  ↗",94,653,25,"#10171c",500);
    // A single architectural motif with depth, rather than scattered fragments.
    for(let i=0;i<4;i++){const y=332+i*52; c.fillStyle=i===3?"#acd1e8":`rgba(172,209,232,${.1+i*.07})`;c.strokeStyle="#88b0c5";c.lineWidth=2;c.beginPath();c.moveTo(910,y+40);c.lineTo(1108,y-55);c.lineTo(1294,y+40);c.lineTo(1096,y+139);c.closePath();c.fill();c.stroke();}
    text("PRZEMYŚLANE W KAŻDYM DETALU",885,711,16,"#c0d5e1");
    [["01", "Oferta", "Pokaż, co Cię wyróżnia."],["02", "Realizacje", "Pokaż efekty swojej pracy."],["03", "Kontakt", "Daj się łatwo znaleźć."]].forEach(([n,title,desc],i)=>{const x=66+i*451;box(x,801,408,117,"#192229",12);text(n,x+22,835,15,"#acd1e8");text(title,x+69,840,25,"#efefea",500);text(desc,x+22,886,21);});
  }
  return finish(canvas);
}
export function createModuleTexture(title: string, detail: string) {
  const {canvas,ctx:c}=surface(640,210);
  c.fillStyle="#19272f";c.beginPath();c.roundRect(0,0,640,210,18);c.fill();c.strokeStyle="#6a8c9f";c.lineWidth=3;c.stroke();
  c.fillStyle="#acd1e8";c.font="500 31px Arial";c.fillText(title,36,77);
  c.fillStyle="#bdc8cf";c.font="24px Arial";c.fillText(detail,36,126);
  c.fillStyle="#acd1e8";c.beginPath();c.arc(582,62,7,0,Math.PI*2);c.fill();
  return finish(canvas);
}
export function createPhoneTexture() {
  const {canvas,ctx:c}=surface(420,840);
  c.beginPath();c.roundRect(0,0,420,840,34);c.clip();c.fillStyle="#10171c";c.fillRect(0,0,420,840);
  c.fillStyle="#acd1e8";c.font="600 27px Arial";c.fillText("Twoja firma",30,94);
  c.fillStyle="#efefea";c.font="500 47px Arial";c.fillText("Twoja oferta.",30,231);c.fillText("Zawsze pod ręką.",30,289);
  c.fillStyle="#8fb7cd";c.beginPath();c.roundRect(30,343,360,217,16);c.fill();
  c.fillStyle="#284b60";c.beginPath();c.moveTo(77,467);c.lineTo(206,387);c.lineTo(342,467);c.lineTo(212,532);c.closePath();c.fill();
  c.fillStyle="#acd1e8";c.beginPath();c.roundRect(30,606,360,65,9);c.fill();
  c.fillStyle="#10171c";c.font="500 25px Arial";c.fillText("Porozmawiajmy  ↗",96,648);
  c.fillStyle="#a0a7ab";c.font="22px Arial";c.fillText("Poznaj moją ofertę",30,743);
  c.fillStyle="#070b0d";c.beginPath();c.roundRect(151,12,118,26,13);c.fill();return finish(canvas);
}


export function createTabletTexture() {
  const { canvas, ctx:c } = surface(750, 1024);
  c.beginPath();c.roundRect(0,0,750,1024,32);c.clip();c.fillStyle="#10171c";c.fillRect(0,0,750,1024);
  c.fillStyle="#acd1e8";c.font="600 30px Arial";c.fillText("Twoja firma",44,74);
  c.fillStyle="#a0a7ab";c.font="20px Arial";c.fillText("Oferta    Kontakt",500,72);
  c.fillStyle="#efefea";c.font="500 64px Arial";c.fillText("Twoja firma.",44,217);c.fillText("Dobrze pokazana.",44,296);
  c.fillStyle="#afc5d2";c.font="27px Arial";c.fillText("Poznaj ofertę i porozmawiajmy.",44,353);
  const g=c.createLinearGradient(44,400,710,690);g.addColorStop(0,"#284b60");g.addColorStop(1,"#132731");c.fillStyle=g;c.beginPath();c.roundRect(44,400,662,301,18);c.fill();
  for(let i=0;i<3;i++){const y=462+i*46;c.fillStyle=i===2?"#acd1e8":"#6f97ac66";c.strokeStyle="#88b0c5";c.lineWidth=2;c.beginPath();c.moveTo(220,y+25);c.lineTo(369,y-40);c.lineTo(527,y+25);c.lineTo(378,y+92);c.closePath();c.fill();c.stroke();}
  c.fillStyle="#acd1e8";c.beginPath();c.roundRect(44,747,300,65,10);c.fill();c.fillStyle="#14232c";c.font="500 26px Arial";c.fillText("Porozmawiajmy  ↗",78,790);
  ["Oferta", "Realizacje", "Kontakt"].forEach((label,i)=>{const x=44+i*227;c.fillStyle="#1d303c";c.beginPath();c.roundRect(x,864,208,110,12);c.fill();c.fillStyle="#d6e4ed";c.font="25px Arial";c.fillText(label,x+24,924);});
  return finish(canvas);
}
