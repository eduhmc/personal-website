import { useEffect, useRef, useState } from 'react';
import type { Like } from '../data/likes';

type Props = { likes: Like[] };
type Faller = { x: number; y: number; speed: number; like: number };
type Phase = 'ready' | 'playing' | 'over';

const W = 480;
const H = 560;
const PAD = 72; // paddle width
const CELL = 2.6; // dot spacing inside a falling icon
const LIVES = 3;

// Catch the things I like as they fall. Arrow keys, mouse, or touch.
export default function CatchGame({ likes }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem('lab-best')) || 0);
    } catch {}
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const css = getComputedStyle(canvas);
    const ink = css.getPropertyValue('--ink').trim();
    const accent = css.getPropertyValue('--accent').trim();
    const dim = css.getPropertyValue('--line').trim();

    let px = W / 2;
    let keys = { left: false, right: false };
    let fallers: Faller[] = [];
    let lives = LIVES;
    let points = 0;
    let spawn = 0;
    let last = performance.now();
    let raf = 0;
    let flash = 0;

    const drawIcon = (like: Like, cx: number, cy: number, color: string) => {
      ctx.fillStyle = color;
      const off = (15 * CELL) / 2;
      like.icon.forEach((row, r) =>
        [...row].forEach((ch, c) => {
          if (ch !== '#') return;
          ctx.beginPath();
          ctx.arc(cx - off + c * CELL, cy - off + r * CELL, CELL * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }),
      );
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const level = 1 + points / 8;

      if (keys.left) px -= 7 * dt;
      if (keys.right) px += 7 * dt;
      px = Math.max(PAD / 2, Math.min(W - PAD / 2, px));

      spawn -= dt;
      if (spawn <= 0) {
        fallers.push({ x: 30 + Math.random() * (W - 60), y: -30, speed: 1.6 + Math.random() * 1.2 * level, like: Math.floor(Math.random() * likes.length) });
        spawn = Math.max(18, 60 - points * 1.5);
      }

      const py = H - 36;
      fallers = fallers.filter((f) => {
        f.y += f.speed * dt;
        if (f.y > py - 14 && f.y < py + 10 && Math.abs(f.x - px) < PAD / 2 + 12) {
          points++;
          setScore(points);
          return false;
        }
        if (f.y > H + 20) {
          lives--;
          flash = 10;
          return false;
        }
        return true;
      });

      ctx.clearRect(0, 0, W, H);
      if (flash > 0) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = flash / 40;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
        flash -= dt;
      }
      // Dotted backdrop
      ctx.fillStyle = dim;
      for (let y = 20; y < H; y += 24) for (let x = 20; x < W; x += 24) ctx.fillRect(x, y, 1.5, 1.5);

      fallers.forEach((f) => drawIcon(likes[f.like], f.x, f.y, ink));

      // Paddle (a little tray)
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.roundRect(px - PAD / 2, py, PAD, 9, 5);
      ctx.fill();

      // HUD
      ctx.fillStyle = ink;
      ctx.font = '13px "JetBrains Mono Variable", monospace';
      ctx.fillText(`SCORE ${points}`, 16, 26);
      ctx.fillText('♥'.repeat(Math.max(lives, 0)), W - 60, 26);

      if (lives <= 0) {
        setPhase('over');
        setBest((b) => {
          const nb = Math.max(b, points);
          try {
            localStorage.setItem('lab-best', String(nb));
          } catch {}
          return nb;
        });
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = down;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = down;
      if (e.key.startsWith('Arrow')) e.preventDefault();
    };
    const kd = onKey(true);
    const ku = onKey(false);
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px = ((e.clientX - rect.left) / rect.width) * W;
    };

    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    canvas.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerdown', onPointer);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerdown', onPointer);
    };
  }, [phase, likes]);

  const start = () => {
    setScore(0);
    setPhase('playing');
  };

  return (
    <div className="game">
      <canvas ref={canvasRef} className="game-canvas" width={W} height={H} aria-label="Catch game" />
      {phase !== 'playing' && (
        <div className="game-overlay">
          {phase === 'over' ? (
            <>
              <p className="mono">Game over</p>
              <p className="game-big">{score} caught</p>
              <p className="mono">Best · {best}</p>
            </>
          ) : (
            <>
              <p className="game-big">Catch the things I like</p>
              <p className="mono">← → or mouse · miss 3 and it's over</p>
            </>
          )}
          <button type="button" className="game-btn" onClick={start} autoFocus>
            {phase === 'over' ? 'Play again' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
}
