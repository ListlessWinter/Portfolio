import React, { useEffect, useRef } from 'react';
import sakuraBranchImg from '../assets/sakura_branch.png';

// Blossom cluster centres on sakura_branch.png (normalised 0-1). Wisps are born here.
const BLOSSOMS = [
  [0.51, 0.33], [0.57, 0.27], [0.62, 0.35], [0.66, 0.22], [0.48, 0.53],
  [0.67, 0.51], [0.64, 0.65], [0.75, 0.65], [0.79, 0.76], [0.77, 0.84],
  [0.84, 0.53], [0.55, 0.60],
];

// Morph window, as fractions of viewport height for the Projects section's top edge:
// starts when it enters the lower part of the screen, completes near the top.
const START = 0.95;
const END = 0.2;

// Onibi palette: ghost cyan/blue with an occasional violet spirit. Index 4 = sakura pink (sparks only).
const HUES = [186, 196, 210, 285, 330];

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (a, b, v) => {
  const x = clamp((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const rand = (a, b) => a + Math.random() * (b - a);

function makeGlowSprite(hue) {
  const size = 64;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const g = sprite.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `hsla(${hue}, 100%, 97%, 1)`);
  grad.addColorStop(0.16, `hsla(${hue}, 100%, 78%, 0.9)`);
  grad.addColorStop(0.42, `hsla(${hue}, 100%, 58%, 0.32)`);
  grad.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return sprite;
}

class Wisp {
  constructor(side, index, total, compact) {
    this.side = side; // 0 = left, 1 = right
    this.anchor = BLOSSOMS[(index * 5 + side * 3) % BLOSSOMS.length];
    this.delay = (index / total) * 0.45; // peel off one after another
    this.homeX = compact ? rand(0.015, 0.075) : rand(0.025, 0.1);
    this.homeY = 0.14 + ((index + rand(0.1, 0.9)) / total) * 0.74;
    this.phase = rand(0, Math.PI * 2);
    this.speed = rand(0.22, 0.45);
    this.ampX = rand(12, 30) * (compact ? 0.55 : 1);
    this.ampY = rand(28, 64) * (compact ? 0.7 : 1);
    this.radius = rand(5, 8.5) * (compact ? 0.75 : 1);
    this.hue = Math.random() < 0.2 ? 3 : Math.floor(rand(0, 3));
    this.maxTrail = compact ? 14 : 24;
    this.trail = [];
    this.ox = 0;
    this.oy = 0;
  }
}

const SpiritBranches = ({ triggerRef }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sprites = HUES.map(makeGlowSprite);
    const branches = [
      { wrap: leftRef.current, img: leftImgRef.current },
      { wrap: rightRef.current, img: rightImgRef.current },
    ];

    let width = 0;
    let height = 0;
    let compact = false;
    let wisps = [];
    let sparks = [];
    let target = 0;
    let t = 0;
    let styledT = -1;
    let canvasClear = true;
    let rafId = 0;
    const mouse = { x: -9999, y: -9999 };

    const buildWisps = () => {
      const perSide = compact ? 3 : 6;
      wisps = [];
      for (let side = 0; side < 2; side++) {
        for (let i = 0; i < perSide; i++) wisps.push(new Wisp(side, i, perSide, compact));
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nextCompact = width < 768;
      if (nextCompact !== compact || wisps.length === 0) {
        compact = nextCompact;
        buildWisps();
      }
    };

    const measure = () => {
      const el = triggerRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      target = clamp((START * height - top) / ((START - END) * height));
    };

    const styleBranches = (progress) => {
      const fade = smoothstep(0.3, 0.92, progress);
      const glow = Math.sin(clamp(progress / 0.65) * Math.PI);
      const filter =
        `contrast(1.5) brightness(${(0.7 + glow * 0.9).toFixed(3)}) ` +
        `saturate(${(1 + progress * 0.6).toFixed(3)}) hue-rotate(${(-140 * progress).toFixed(1)}deg) ` +
        `blur(${(fade * 6).toFixed(2)}px)`;
      for (const { wrap, img } of branches) {
        wrap.style.opacity = (1 - fade).toFixed(3);
        wrap.style.setProperty('--branch-scale', (1 - fade * 0.12).toFixed(3));
        wrap.style.visibility = progress > 0.995 ? 'hidden' : 'visible';
        img.style.filter = filter;
      }
    };

    const anchorPoint = (wisp, rects) => {
      const rect = rects[wisp.side];
      const nx = wisp.side === 0 ? wisp.anchor[0] : 1 - wisp.anchor[0];
      return [rect.left + nx * rect.width, rect.top + wisp.anchor[1] * rect.height];
    };

    const emitSpark = (x, y, hueIndex, size = rand(1, 2.4)) => {
      if (sparks.length > 220) return;
      sparks.push({
        x, y,
        vx: rand(-0.6, 0.6),
        vy: rand(-1.3, -0.3),
        life: 1,
        decay: rand(0.012, 0.028),
        size,
        hue: hueIndex,
      });
    };

    const draw = (x, y, radius, alpha, hueIndex) => {
      if (alpha <= 0.002) return;
      ctx.globalAlpha = Math.min(alpha, 1);
      ctx.drawImage(sprites[hueIndex], x - radius, y - radius, radius * 2, radius * 2);
    };

    const frame = (now) => {
      rafId = requestAnimationFrame(frame);

      const prevT = t;
      t += (target - t) * 0.08;
      if (Math.abs(target - t) < 0.0005) t = target;
      const delta = t - prevT;

      if (Math.abs(t - styledT) > 0.001) {
        styleBranches(t);
        styledT = t;
      }

      if (t <= 0.001 && sparks.length === 0) {
        if (!canvasClear) {
          ctx.clearRect(0, 0, width, height);
          canvasClear = true;
        }
        return;
      }

      canvasClear = false;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const time = now / 1000;
      const rects = branches.map(({ img }) => img.getBoundingClientRect());

      // Blossoms shed sparks while the branch is transforming
      if (!reducedMotion && Math.abs(delta) > 0.0006 && t > 0.02 && t < 0.98) {
        const count = Math.min(6, Math.ceil(Math.abs(delta) * 450));
        const hueIndex = t < 0.35 ? 4 : t < 0.65 ? 3 : 1;
        for (let i = 0; i < count; i++) {
          const wisp = wisps[Math.floor(Math.random() * wisps.length)];
          const [ax, ay] = anchorPoint(wisp, rects);
          emitSpark(ax + rand(-24, 24), ay + rand(-24, 24), hueIndex);
        }
      }

      for (const wisp of wisps) {
        const local = easeInOut(clamp((t - wisp.delay) / 0.55));
        if (local <= 0) {
          wisp.trail.length = 0;
          continue;
        }

        const [ax, ay] = anchorPoint(wisp, rects);
        const motion = reducedMotion ? 0 : 1;
        const s = wisp.speed;
        const fx = wisp.homeX * width
          + (Math.sin(time * s + wisp.phase) * wisp.ampX
          + Math.sin(time * s * 2.3 + wisp.phase * 1.7) * wisp.ampX * 0.4) * motion;
        const fy = wisp.homeY * height
          + (Math.sin(time * s * 0.7 + wisp.phase * 0.5) * wisp.ampY
          + Math.cos(time * s * 1.9 + wisp.phase) * wisp.ampY * 0.25) * motion;
        const freeX = wisp.side === 0 ? fx : width - fx;

        // Curious but shy: drift away from the cursor
        let tox = 0;
        let toy = 0;
        const dx = wisp.x - mouse.x;
        const dy = wisp.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0.01) {
          const push = (1 - dist / 150) * 46;
          tox = (dx / dist) * push;
          toy = (dy / dist) * push;
        }
        wisp.ox += (tox - wisp.ox) * 0.06;
        wisp.oy += (toy - wisp.oy) * 0.06;

        // Float up in an arc from the blossom to its haunt
        wisp.x = ax + (freeX - ax) * local + wisp.ox * local;
        wisp.y = ay + (fy - ay) * local - Math.sin(local * Math.PI) * 60 + wisp.oy * local;

        // Flame tail: old trail points keep rising like a hitodama's wisp
        for (const p of wisp.trail) {
          p.y -= reducedMotion ? 0.3 : 0.95;
          p.x += Math.sin(time * 3 + p.y * 0.05 + wisp.phase) * 0.35;
        }
        wisp.trail.push({ x: wisp.x, y: wisp.y });
        if (wisp.trail.length > wisp.maxTrail) wisp.trail.shift();

        const flicker = reducedMotion
          ? 1
          : 0.86 + 0.1 * Math.sin(time * 8 + wisp.phase) + 0.04 * Math.sin(time * 21 + wisp.phase * 3);
        const alpha = local * flicker;
        const r = wisp.radius * (0.35 + 0.65 * local) * flicker;

        for (let i = 0; i < wisp.trail.length; i++) {
          const k = (i + 1) / wisp.trail.length;
          const p = wisp.trail[i];
          draw(p.x, p.y, r * (0.45 + 1.9 * k), alpha * k * 0.42, wisp.hue);
        }
        draw(wisp.x, wisp.y, r * 7, alpha * 0.35, wisp.hue); // halo
        draw(wisp.x, wisp.y, r * 2.4, alpha, wisp.hue); // body
        draw(wisp.x, wisp.y, r * 1.1, alpha * 0.9, wisp.hue); // white-hot core

        if (!reducedMotion && local > 0.9 && Math.random() < 0.025) {
          emitSpark(wisp.x + rand(-4, 4), wisp.y - r, wisp.hue, rand(0.8, 1.6));
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.012;
        p.vx *= 0.985;
        p.life -= p.decay;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        draw(p.x, p.y, p.size * 4, p.life * 0.8, p.hue);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const onScroll = () => measure();
    const onResize = () => {
      resize();
      measure();
    };
    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerOut = (e) => {
      if (!e.relatedTarget) {
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };

    resize();
    measure();
    t = target; // no morph animation on first paint
    rafId = requestAnimationFrame(frame);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, [triggerRef]);

  return (
    <>
      <div className="sakura-wrapper branch-left" ref={leftRef} aria-hidden="true">
        <img src={sakuraBranchImg} alt="" className="sakura-branch" ref={leftImgRef} />
      </div>
      <div className="sakura-wrapper branch-right" ref={rightRef} aria-hidden="true">
        <img src={sakuraBranchImg} alt="" className="sakura-branch" ref={rightImgRef} />
      </div>
      <canvas className="wisp-canvas" ref={canvasRef} aria-hidden="true" />
    </>
  );
};

export default SpiritBranches;
