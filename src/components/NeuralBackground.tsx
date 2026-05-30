"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 78;
const MAX_DIST = 165;
const MAX_PULSES = 14;

type Node = { x: number; y: number; vx: number; vy: number; r: number; glow: number };
type Pulse = { a: number; b: number; t: number; speed: number };

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes.length = 0;
      pulses.length = 0;
      frame = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.6 + 0.7,
          glow: 0,
        });
      }
    };

    const trySpawnPulse = () => {
      if (pulses.length >= MAX_PULSES) return;
      const a = Math.floor(Math.random() * nodes.length);
      const candidates: number[] = [];
      for (let b = 0; b < nodes.length; b++) {
        if (b === a) continue;
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) candidates.push(b);
      }
      if (!candidates.length) return;
      const b = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({ a, b, t: 0, speed: 0.005 + Math.random() * 0.009 });
    };

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
        n.glow = Math.max(0, n.glow - 0.016);
      }

      // Edges — color shifts toward green when nodes glow
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const proximity = 1 - Math.sqrt(d2) / MAX_DIST;
            const boost = Math.max(nodes[i].glow, nodes[j].glow);
            const alpha = proximity * (0.13 + boost * 0.28);
            const r = Math.round(61 + boost * -61);
            const g = Math.round(58 + boost * 159);
            const b = Math.round(57 + boost * 89);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        if (n.glow > 0.05) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16);
          grad.addColorStop(0, `rgba(0,217,146,${n.glow * 0.45})`);
          grad.addColorStop(1, "rgba(0,217,146,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        const r = Math.round(61 + n.glow * -61);
        const g = Math.round(58 + n.glow * 159);
        const b = Math.round(57 + n.glow * 89);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.55 + n.glow * 0.45})`;
        ctx.fill();
      }

      // Spawn
      if (frame % 32 === 0) trySpawnPulse();

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const na = nodes[p.a];
        const nb = nodes[p.b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > MAX_DIST) { pulses.splice(i, 1); continue; }

        const px = na.x + dx * p.t;
        const py = na.y + dy * p.t;

        const halo = ctx.createRadialGradient(px, py, 0, px, py, 10);
        halo.addColorStop(0, "rgba(0,217,146,0.7)");
        halo.addColorStop(0.35, "rgba(0,217,146,0.15)");
        halo.addColorStop(1, "rgba(0,217,146,0)");
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#00d992";
        ctx.fill();

        p.t += p.speed;
        if (p.t >= 1) {
          nodes[p.b].glow = 1;
          pulses.splice(i, 1);
        }
      }

      // Vignette — darkens edges, keeps center clear
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.12, W / 2, H / 2, H * 0.88);
      vg.addColorStop(0, "rgba(16,16,16,0)");
      vg.addColorStop(0.55, "rgba(16,16,16,0.08)");
      vg.addColorStop(1, "rgba(16,16,16,0.92)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      frame++;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
