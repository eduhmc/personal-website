import { useEffect, useRef, useState } from 'react';
import type { Like } from '../data/likes';

type Props = { likes: Like[] };

const COLS = 21;
const ROWS = 21;
const ICON = 15;
const REPEL_RADIUS = 70;
const CYCLE_MS = 4200;

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; on: number; target: number };

function readColors(el: HTMLElement) {
  const s = getComputedStyle(el);
  return { ink: s.getPropertyValue('--ink').trim(), dim: s.getPropertyValue('--ink-3').trim(), accent: s.getPropertyValue('--accent').trim() };
}

export default function DotGrid({ likes }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Auto-cycle through likes until the visitor picks one.
  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % likes.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [auto, likes.length]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let colors = readColors(canvas);
    let party = document.documentElement.classList.contains('party');
    let dots: Dot[] = [];
    let size = 0;
    let gap = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = rect.width;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = size / (COLS + 1);
      const prev = dots;
      dots = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const hx = gap * (c + 1);
          const hy = gap * (r + 1);
          const old = prev[r * COLS + c];
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, on: old?.on ?? 0, target: 0 });
        }
      }
      applyIcon();
    };

    let shownIcon = -1;
    const applyIcon = () => {
      shownIcon = activeRef.current;
      const icon = likes[shownIcon]?.icon ?? [];
      const off = Math.floor((COLS - ICON) / 2);
      dots.forEach((d, i) => {
        const r = Math.floor(i / COLS) - off;
        const c = (i % COLS) - off;
        d.target = icon[r]?.[c] === '#' ? 1 : 0;
        if (reduced) d.on = d.target;
      });
    };

    const frame = (t: number) => {
      if (shownIcon !== activeRef.current) applyIcon();
      ctx.clearRect(0, 0, size, size);
      const base = gap * 0.13;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        // Ease the "on" state so icons morph in rather than snap.
        d.on += (d.target - d.on) * 0.12;
        if (!reduced) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const f = (1 - dist / REPEL_RADIUS) * 2.2;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
          // Spring back home.
          d.vx += (d.hx - d.x) * 0.06;
          d.vy += (d.hy - d.y) * 0.06;
          d.vx *= 0.8;
          d.vy *= 0.8;
          d.x += d.vx;
          d.y += d.vy;
        }
        const wobble = reduced ? 0 : Math.sin(t / 600 + i * 0.35) * 0.35 * d.on;
        const r = base + d.on * gap * 0.25 + wobble;
        if (party && d.on > 0.5) ctx.fillStyle = `hsl(${(i * 7 + t / 8) % 360} 75% 60%)`;
        else ctx.fillStyle = d.on > 0.5 ? colors.ink : colors.dim;
        ctx.globalAlpha = 0.35 + d.on * 0.65;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    // Re-read colors when the theme flips or the easter egg fires.
    const mo = new MutationObserver(() => {
      colors = readColors(canvas);
      party = document.documentElement.classList.contains('party');
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    // Pause the loop when the hero scrolls out of view.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    layout();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [likes]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = likes[active];

  return (
    <div className="dotgrid">
      <figure className="polaroid">
        <span className="tape" aria-hidden="true" />
        <canvas
          ref={canvasRef}
          className="dotgrid-canvas"
          role="img"
          aria-label={`Dot drawing of ${current.label.toLowerCase()}`}
          onClick={() => pick((active + 1) % likes.length)}
        />
        <figcaption>
          <span className="mono">things I like · {String(active + 1).padStart(2, '0')}</span>
          <span className="caption" key={current.id}>
            {current.caption}
          </span>
        </figcaption>
      </figure>
      <div className="chips" role="group" aria-label="Things I like">
        {likes.map((l, i) => (
          <button key={l.id} type="button" className="chip" aria-pressed={i === active} onClick={() => pick(i)}>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
