"use client";

import { useEffect, useRef } from "react";

/**
 * An interactive 3D double helix drawn on a 2D canvas (no WebGL): two strands
 * of glowing brand-teal nodes spiral around a vertical axis, joined by rungs.
 * It rotates continuously and tilts toward the cursor. Depth drives node size,
 * brightness, and draw order (painter's algorithm). Honors reduced-motion.
 */
export function HelixField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    const STRAND = 66;
    const TURNS = 3;
    const FOCAL = 620;

    const draw = (time: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.17;
      const span = h * 0.92;

      // ease the cursor influence so the tilt glides
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const yaw = (reduce ? 0.7 : time * 0.00025) + mouse.x * 0.5;
      const tilt = mouse.y * 0.45;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      type Pt = { sx: number; sy: number; scale: number; z: number };
      const strands: Pt[][] = [[], []];

      for (let s = 0; s < 2; s++) {
        for (let i = 0; i <= STRAND; i++) {
          const t = i / STRAND;
          const ang = t * TURNS * Math.PI * 2 + s * Math.PI;
          const x = Math.cos(ang) * R;
          const z0 = Math.sin(ang) * R;
          const y0 = (t - 0.5) * span;
          // rotate around X (cursor tilt)
          const y1 = y0 * cosT - z0 * sinT;
          const z1 = y0 * sinT + z0 * cosT;
          // rotate around Y (spin)
          const x2 = x * cosY + z1 * sinY;
          const z2 = -x * sinY + z1 * cosY;
          const scale = FOCAL / (FOCAL + z2);
          strands[s].push({ sx: cx + x2 * scale, sy: cy + y1 * scale, scale, z: z2 });
        }
      }

      ctx.clearRect(0, 0, w, h);

      // rungs between the two strands
      for (let i = 0; i <= STRAND; i += 3) {
        const a = strands[0][i];
        const b = strands[1][i];
        ctx.strokeStyle = `rgba(0,203,187,${0.14 * ((a.scale + b.scale) / 2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // faint backbone along each strand
      for (let s = 0; s < 2; s++) {
        ctx.beginPath();
        strands[s].forEach((p, i) => (i ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy)));
        ctx.strokeStyle = "rgba(0,203,187,0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // nodes — far ones first so near ones sit on top
      const nodes = [...strands[0], ...strands[1]].sort((a, b) => b.z - a.z);
      for (const p of nodes) {
        const r = Math.max(0.5, p.scale * 2.6);
        const a = Math.min(1, p.scale * 0.85);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,203,187,${a * 0.1})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,203,187,${a})`;
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
