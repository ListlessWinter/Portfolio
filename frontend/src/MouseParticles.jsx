import React, { useEffect, useRef } from 'react';

const MouseParticles = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: undefined, y: undefined });
  const frameCount = useRef(0); 

  const isHoveringInteractive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;

      const target = e.target;
      const clickable = target.closest('a, button, input, textarea, .card, .tech-item');
      
      if (clickable) {
        isHoveringInteractive.current = true;
      } else {
        isHoveringInteractive.current = false;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', () => {
        mouse.current.x = undefined;
        mouse.current.y = undefined;
    });

    class Particle {
      constructor() {
        this.x = mouse.current.x;
        this.y = mouse.current.y;
        this.size = Math.random() * 15 + 10; 
        this.opacity = 1; 
        this.speedY = Math.random() * -0.5 - 0.2; 
        this.angle = Math.random() * Math.PI * 2; 
        this.spinSpeed = Math.random() * 0.05 + 0.02;
        this.hue = Math.random() * 60 + 160; 
      }

      update() {
        this.y += this.speedY;
        this.angle += this.spinSpeed;
        this.x += Math.sin(this.angle) * 0.5; 
        if (this.opacity > 0) this.opacity -= 0.008; 
        if (this.size > 0.2) this.size -= 0.05;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0, 
            this.x, this.y, this.size 
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 90%, ${this.opacity})`);
        gradient.addColorStop(0.4, `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; 

      frameCount.current++;
      
      if (
        frameCount.current % 3 === 0 && 
        mouse.current.x !== undefined && 
        !isHoveringInteractive.current 
      ) {
         particles.current.push(new Particle());
      }

      particles.current.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.opacity <= 0.01 || particle.size <= 0.2) {
          particles.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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
        pointerEvents: 'none', 
        zIndex: 9999,
      }}
    />
  );
};

export default MouseParticles;