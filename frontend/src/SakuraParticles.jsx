import React, { useEffect, useRef } from 'react';

// Sakura Petal Class
class Petal {
  constructor(width, height) {
    this.reset(width, height, true); // true = random Y start (for initial load)
  }

  reset(width, height, initial = false) {
    this.x = Math.random() * width;
    // If initial, spread them all over screen. If not, start just above the top
    this.y = initial ? Math.random() * height : -20;

    this.size = Math.random() * 5 + 7; // Size 7-12px
    this.speedY = Math.random() * 0.35 + 0.25; // Fall speed
    this.swayAmplitude = Math.random() * 1.4 + 0.3; // How far it moves left/right
    this.swayFrequency = Math.random() * 0.02 + 0.005; // How fast it sways
    this.swayOffset = Math.random() * Math.PI * 2; // Random start point in sine wave

    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01; // Spin speed
    this.flip = Math.random() * Math.PI * 2; // 3D tumble phase
    this.flipSpeed = Math.random() * 0.03 + 0.01;

    // Varying shades of pink (hue 335-355)
    const hue = Math.random() * 20 + 335;
    this.fill = `hsla(${hue}, 85%, 86%, 0.75)`;
    this.edge = `hsla(${hue}, 90%, 72%, 0.75)`;
  }

  update(width, height) {
    this.y += this.speedY;
    // Sine wave movement for "floating" effect
    this.x += Math.sin(this.y * this.swayFrequency + this.swayOffset) * this.swayAmplitude;
    this.rotation += this.rotationSpeed;
    this.flip += this.flipSpeed;

    if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
      this.reset(width, height, false);
    }
  }

  draw(ctx) {
    const s = this.size;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    // Squash on one axis to fake the petal tumbling in 3D
    ctx.scale(1, 0.35 + Math.abs(Math.cos(this.flip)) * 0.65);

    // Sakura petal: rounded body with the signature notch at the tip
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.bezierCurveTo(s * 0.9, s * 0.55, s * 0.75, -s * 0.7, s * 0.22, -s);
    ctx.lineTo(0, -s * 0.72);
    ctx.lineTo(-s * 0.22, -s);
    ctx.bezierCurveTo(-s * 0.75, -s * 0.7, -s * 0.9, s * 0.55, 0, s);

    const gradient = ctx.createLinearGradient(0, s, 0, -s);
    gradient.addColorStop(0, this.edge);
    gradient.addColorStop(1, this.fill);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
  }
}

const SakuraParticles = ({ zIndex = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let petals = [];
    let rafId = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Light, elegant fall (per layer); fewer on small screens
    const initParticles = () => {
      const count = reducedMotion ? 4 : width < 768 ? 7 : 14;
      petals = Array.from({ length: count }, () => new Petal(width, height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const petal of petals) {
        petal.update(width, height);
        petal.draw(ctx);
      }
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const wasMobile = width < 768;
      resizeCanvas();
      if (wasMobile !== width < 768) initParticles();
    };

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Clicks pass through
        zIndex, // Adjustable layer depth
      }}
    />
  );
};

export default SakuraParticles;
