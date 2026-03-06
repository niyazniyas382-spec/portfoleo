import React, { useEffect, useRef } from 'react';

const FluidCanvas = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;

    const pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
    };

    const params = {
      gridSize: 20,
      viscosity: 0.96,
      mouseForce: 0.5,
      dragForce: 1.2,
      particleCount: 800,
    };

    let grid = [];
    let particles = [];

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const cols = Math.ceil(width / params.gridSize) + 1;
      const rows = Math.ceil(height / params.gridSize) + 1;
      grid = [];

      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = { x: 0, y: 0, vx: 0, vy: 0 };
        }
      }
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < params.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          life: Math.random(),
          size: 1 + Math.random() * 2,
          color: darkMode ? '168, 85, 247' : '107, 33, 168', // Purple tint
        });
      }
    };

    const update = () => {
      // Update grid forces
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          const cell = grid[i][j];
          
          if (pointer.moved) {
            const dx = i * params.gridSize - pointer.x;
            const dy = j * params.gridSize - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = (pointer.down ? params.dragForce : params.mouseForce) * Math.exp(-dist / 100);
            
            cell.vx += pointer.dx * force;
            cell.vy += pointer.dy * force;
          }

          cell.vx *= params.viscosity;
          cell.vy *= params.viscosity;
        }
      }

      // Update particles
      particles.forEach(p => {
        const gx = Math.floor(p.x / params.gridSize);
        const gy = Math.floor(p.y / params.gridSize);

        if (gx >= 0 && gx < grid.length && gy >= 0 && gy < grid[0].length) {
          const cell = grid[gx][gy];
          p.vx += cell.vx * 0.1;
          p.vy += cell.vy * 0.1;
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.life = 0.5 + Math.random() * 0.5;
        }
      });

      pointer.moved = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        ctx.beginPath();
        const opacity = p.life * 0.4;
        ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a line trail for speed
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.5) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${p.color}, ${opacity * 0.5})`;
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.stroke();
        }
      });
    };

    const loop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      pointer.dx = x - pointer.x;
      pointer.dy = y - pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };

    const handlePointerDown = () => (pointer.down = true);
    const handlePointerUp = () => (pointer.down = false);
    const handleResize = () => {
      initGrid();
      initParticles();
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('resize', handleResize);

    initGrid();
    initParticles();
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: darkMode ? 'screen' : 'multiply' }}
    />
  );
};

export default FluidCanvas;
