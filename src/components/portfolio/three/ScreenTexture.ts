import { CanvasTexture, SRGBColorSpace } from "three";

export function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#10171c";
  ctx.fillRect(0, 0, 1024, 640);
  const glow = ctx.createRadialGradient(770, 280, 20, 720, 300, 600);
  glow.addColorStop(0, "#253f50"); glow.addColorStop(1, "#10171c");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 1024, 640);
  ctx.strokeStyle = "#34454f"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 72); ctx.lineTo(1024, 72); ctx.stroke();
  ctx.font = "500 21px sans-serif"; ctx.fillStyle = "#eef0ee";
  ctx.fillText("EW / PRODUKT CYFROWY", 40, 45);
  ctx.fillStyle = "#a6cce2"; ctx.font = "16px monospace"; ctx.fillText("POMYSŁ → WDROŻENIE", 780, 44);
  ctx.fillStyle = "#a4b7c3"; ctx.font = "17px monospace"; ctx.fillText("KAŻDY DETAL MA CEL", 50, 145);
  ctx.fillStyle = "#f0f1ec"; ctx.font = "500 58px sans-serif";
  ctx.fillText("Jeden produkt.", 50, 228); ctx.fillText("Każda warstwa.", 50, 300);
  ctx.font = "18px sans-serif"; ctx.fillStyle = "#9caeb9";
  ctx.fillText("Interfejs. Logika. Infrastruktura.", 50, 346);
  ctx.fillStyle = "#c4dfef"; ctx.beginPath(); ctx.roundRect(50, 387, 204, 48, 24); ctx.fill();
  ctx.fillStyle = "#172530"; ctx.font = "17px sans-serif"; ctx.fillText("Poznaj szczegóły  ↗", 69, 418);
  for (let i = 0; i < 5; i++) {
    const x = 665 + i * 13, y = 195 + i * 32;
    ctx.fillStyle = i === 4 ? "#96c5df" : `rgba(155,190,211,${0.1 + i * 0.035})`;
    ctx.strokeStyle = "#7e9aab";
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 135, y - 65); ctx.lineTo(x + 240, y - 7); ctx.lineTo(x + 105, y + 60); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  ctx.strokeStyle = "#34454f"; ctx.beginPath(); ctx.moveTo(50, 500); ctx.lineTo(974, 500); ctx.stroke();
  ["01  INTERFEJS", "02  TECHNOLOGIA", "03  WDROŻENIE"].forEach((label, i) => {
    ctx.fillStyle = "#abc0cb"; ctx.font = "16px monospace"; ctx.fillText(label, 50 + i * 320, 550);
    ctx.fillStyle = "#eef0ee"; ctx.font = "20px sans-serif"; ctx.fillText(["Wygoda użytkowania", "Wszystko działa razem", "Gotowy do działania"][i], 50 + i * 320, 589);
  });
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createLayerTexture(label: string, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = index % 2 ? "#17252e" : "#1c2a33";
  ctx.fillRect(0, 0, 512, 320);
  ctx.fillStyle = "#d3e6f0"; ctx.font = "15px monospace";
  ctx.fillText(`0${index + 1} / ${label.toUpperCase()}`, 24, 34);
  ctx.strokeStyle = "#496271"; ctx.lineWidth = 1;
  for (let i = 0; i < 9; i++) {
    const x = 32 + i * 55;
    ctx.beginPath(); ctx.moveTo(x, 288); ctx.lineTo(x, 210 - i % 3 * 18); ctx.lineTo(256, 150); ctx.stroke();
    ctx.fillStyle = "#83a9bd"; ctx.fillRect(x - 2, 286, 4, 4);
  }
  ctx.fillStyle = "#3a515f"; ctx.fillRect(185, 90, 142, 112);
  ctx.strokeStyle = "#8cabbc"; ctx.strokeRect(192, 97, 128, 98);
  ctx.fillStyle = "#c1d9e5"; ctx.font = "24px monospace"; ctx.fillText(["", "</>", "AUTH", "API", "SQL", "CLOUD", "CI/CD"][index], index === 5 ? 214 : 226, 155);
  ctx.font = "9px monospace"; ctx.fillStyle = "#8babbc"; ctx.fillText("EW / SYSTEM ARCHITECTURE", 24, 306);
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
  return texture;
}
