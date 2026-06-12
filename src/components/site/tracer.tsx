"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

// run before paint on the client, fall back to useEffect during SSR
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// where the dot sits vertically in the viewport (0 = top, 1 = bottom)
const ANCHOR = 0.62;

/**
 * A single line that winds down the whole page. The line is a static layer
 * that just translates with scroll (cheap GPU transform — no repaint), and a
 * glowing dot stays pinned around the middle-lower of the viewport, sliding
 * left/right to keep riding the line as the page scrolls underneath it.
 */
export function Tracer() {
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0, vh: 0 });
  const [d, setD] = useState("");
  const [ready, setReady] = useState(false);
  const lengthRef = useRef(0);

  const { scrollY } = useScroll();
  // translate the whole line layer up by the scroll offset
  const lineY = useTransform(scrollY, (v) => -v);

  // dot only moves horizontally; driven directly so it stays exactly on the line
  const dotX = useMotionValue(0);

  // measure the document + (re)build the snaking path (before paint)
  useIsoLayoutEffect(() => {
    const measure = () => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      setSize({ w, h, vh });
      setD(buildPath(w, h));
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // recompute the dot's x for the current scroll position
  const place = (scroll: number) => {
    const path = pathRef.current;
    if (!path || !lengthRef.current) return;
    const targetY = scroll + size.vh * ANCHOR;
    dotX.set(xAtY(path, lengthRef.current, targetY));
  };

  // when the path changes, refresh its length + position the dot before paint,
  // then reveal it — so it never flashes at the left edge on first load
  useIsoLayoutEffect(() => {
    if (pathRef.current && size.vh) {
      lengthRef.current = pathRef.current.getTotalLength();
      place(scrollY.get());
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, size.vh]);

  useMotionValueEvent(scrollY, "change", place);

  if (!size.w || !size.h) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* the line — static content, only translated (composited, not repainted) */}
      <motion.svg
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        fill="none"
        style={{ y: lineY }}
        className="absolute left-0 top-0"
      >
        <path ref={pathRef} d={d} stroke="#00cbbb" strokeOpacity={0.28} strokeWidth={2} strokeLinecap="round" />
      </motion.svg>

      {/* the dot — pinned to the viewport's middle-lower, slides horizontally.
          Motion controls translateX on this element, so all centering lives on
          the child to avoid a transform clash. Rendered only once positioned. */}
      {ready && (
      <motion.div style={{ x: dotX, top: `${ANCHOR * 100}%` }} className="absolute left-0">
        <div className="absolute h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_16px_4px_rgba(0,203,187,0.55)]">
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-md" />
          <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </div>
      </motion.div>
      )}
    </div>
  );
}

/** Binary-search the path (monotonic in y) for the x where it crosses `targetY`. */
function xAtY(path: SVGPathElement, length: number, targetY: number) {
  let lo = 0;
  let hi = length;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < targetY) lo = mid;
    else hi = mid;
  }
  return path.getPointAtLength((lo + hi) / 2).x;
}

/** Smooth alternating left/right S-curve from the top of the page to the bottom. */
function buildPath(w: number, h: number) {
  const cols = [0.5, 0.13, 0.87, 0.16, 0.84, 0.5, 0.14, 0.86, 0.5];
  const n = cols.length;
  let d = `M ${w * cols[0]} 0`;
  for (let i = 1; i < n; i++) {
    const y0 = (h * (i - 1)) / (n - 1);
    const y1 = (h * i) / (n - 1);
    const x0 = w * cols[i - 1];
    const x1 = w * cols[i];
    const cy0 = y0 + (y1 - y0) * 0.5;
    const cy1 = y1 - (y1 - y0) * 0.5;
    d += ` C ${x0} ${cy0}, ${x1} ${cy1}, ${x1} ${y1}`;
  }
  return d;
}
