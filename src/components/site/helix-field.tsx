"use client";

import { useEffect, useRef } from "react";

/**
 * An interactive 3D double helix drawn on a 2D canvas (no WebGL): two strands
 * of glowing brand-teal nodes spiral around a vertical axis, joined by rungs.
 * It rotates continuously and tilts toward the cursor.
 *
 * Performance-tuned: a single cached glow sprite blitted per node (no per-frame
 * arc fills / alpha overdraw), preallocated buffers (no per-frame allocation or
 * sort), DPR capped, and the loop pauses when the hero scrolls out of view.
 * Honors reduced-motion (one static frame).
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

    const STRAND = 48;
    const N = STRAND + 1;
    const COUNT = N * 2;
    // preallocated per-node buffers — reused every frame
    const sx = new Float32Array(COUNT);
    const sy = new Float32Array(COUNT);
    const sc = new Float32Array(COUNT);

    // cached radial-gradient glow sprite — one drawImage per node beats two arcs
    const SPRITE = 48;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
      g.addColorStop(0, "rgba(0,203,187,1)");
      g.addColorStop(0.35, "rgba(0,203,187,0.55)");
      g.addColorStop(1, "rgba(0,203,187,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    const TURNS = 3;
    const FOCAL = 620;

    const draw = (time: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.17;
      const span = h * 0.92;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const yaw = (reduce ? 0.7 : time * 0.00025) + mouse.x * 0.5;
      const tilt = mouse.y * 0.45;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      for (let s = 0; s < 2; s++) {
        for (let i = 0; i <= STRAND; i++) {
          const t = i / STRAND;
          const ang = t * TURNS * Math.PI * 2 + s * Math.PI;
          const x = Math.cos(ang) * R;
          const z0 = Math.sin(ang) * R;
          const y0 = (t - 0.5) * span;
          const y1 = y0 * cosT - z0 * sinT;
          const z1 = y0 * sinT + z0 * cosT;
          const x2 = x * cosY + z1 * sinY;
          const z2 = -x * sinY + z1 * cosY;
          const scale = FOCAL / (FOCAL + z2);
          const idx = s * N + i;
          sx[idx] = cx + x2 * scale;
          sy[idx] = cy + y1 * scale;
          sc[idx] = scale;
        }
      }

      ctx.clearRect(0, 0, w, h);

      // rungs between strands (cheap strokes, solid colour + varying alpha)
      ctx.strokeStyle = "rgb(0,203,187)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= STRAND; i += 3) {
        const a = i;
        const b = N + i;
        ctx.globalAlpha = 0.14 * ((sc[a] + sc[b]) / 2);
        ctx.beginPath();
        ctx.moveTo(sx[a], sy[a]);
        ctx.lineTo(sx[b], sy[b]);
        ctx.stroke();
      }

      // backbone along each strand
      ctx.globalAlpha = 0.1;
      for (let s = 0; s < 2; s++) {
        ctx.beginPath();
        for (let i = 0; i <= STRAND; i++) {
          const idx = s * N + i;
          if (i) ctx.lineTo(sx[idx], sy[idx]);
          else ctx.moveTo(sx[idx], sy[idx]);
        }
        ctx.stroke();
      }

      // nodes — one cached sprite blit each
      for (let idx = 0; idx < COUNT; idx++) {
        const scale = sc[idx];
        const size = Math.max(4, scale * 9);
        ctx.globalAlpha = Math.min(1, scale * 0.85);
        ctx.drawImage(sprite, sx[idx] - size / 2, sy[idx] - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    if (reduce) {
      requestAnimationFrame(draw); // single static frame
    } else {
      // only animate while the hero is on screen
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 },
      );
      io.observe(canvas);
      return () => {
        stop();
        io.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
