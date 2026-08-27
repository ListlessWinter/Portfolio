import React, { useEffect, useRef } from 'react';

// Sakura Petal Class
class Petal {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true); // true = random Y start (for initial load)
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width;
    // If initial, spread them all over screen. If not, start at top (-10)
    this.y = initial ? Math.random() * this.canvas.height : -10;
    
    this.size = Math.random() * 5 + 8; // Size 8-13px
    this.speedY = Math.random() * .3 + 0.2; // Fall speed
    this.swayAmplitude = Math.random() * 2; // How far it moves left/right
    this.swayFrequency = Math.random() * 0.02 + 0.005; // How fast it sways
    this.swayOffset = Math.random() * Math.PI * 2; // Random start point in sine wave
    
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01; // Spin speed
    
    // Color: Varying shades of Pink
    // 340-350 hue is pink/reddish.
    this.color = `hsla(${Math.random() * 20 + 340}, 80%, 85%, 0.6)`;
  }

  update() {
    this.y += this.speedY;
    // Sine wave movement for "floating" effect
    this.x += Math.sin(this.y * this.swayFrequency + this.swayOffset) * this.swayAmplitude;
    this.rotation += this.rotationSpeed;

    // Reset if it goes off bottom or way off sides
    if (this.y > this.canvas.height + 10 || this.x < -20 || this.x > this.canvas.width + 20) {
      this.reset(false);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw a simple petal shape (Oval)
    ctx.beginPath();
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.restore();
  }
}

const SakuraParticles = ({ zIndex = 0 }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]); 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    // Initialize Particles (Amount depends on screen size)
    const initParticles = () => {
      // Reduced particle count for a lighter, more elegant fall (per layer)
      const particleCount = window.innerWidth < 768 ? 8 : 15;  
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new Petal(canvas));
      }
    };
    initParticles();

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((petal) => {
        petal.update();
        petal.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Clicks pass through
        zIndex: zIndex // Adjustable layer depth
      }}
    />
  );
};

export default SakuraParticles;