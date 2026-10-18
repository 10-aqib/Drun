"use client";

import React, { useEffect, useRef } from "react";

export default function SignatureTransition() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
      initArchParticles();
    };
    window.addEventListener("resize", handleResize);

    interface ArchParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      alpha: number;
      speed: number;
      offset: number;
    }

    let particles: ArchParticle[] = [];

    const initArchParticles = () => {
      particles = [];
      const centerX = width / 2;
      const archWidth = Math.min(width * 0.45, 380);
      const archHeight = 220;
      const count = width < 768 ? 400 : 850;

      for (let i = 0; i < count; i++) {
        // Parametric inverted catenary/arch curve simulating leather shoe strap arch
        const t = (i / count) * Math.PI; // 0 to PI
        const spread = (Math.random() - 0.5) * 28;
        
        // Arch formula
        const x = centerX + Math.cos(t) * (archWidth / 2) + spread;
        const y = 300 - Math.sin(t) * archHeight + (Math.random() - 0.5) * 25;

        const isCopper = Math.random() > 0.35;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.8,
          color: isCopper ? "#D88955" : "#FA9D60",
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.01,
          offset: Math.random() * Math.PI * 2,
        });
      }
    };

    initArchParticles();

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render woven stitching arch particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.offset += p.speed;

        // Gentle breathing kinetic motion
        const floatY = Math.sin(p.offset) * 3;
        const floatX = Math.cos(p.offset * 0.7) * 2;

        ctx.beginPath();
        ctx.arc(p.baseX + floatX, p.baseY + floatY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.75 + 0.25 * Math.sin(time * 3 + i));
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative z-20 w-full overflow-hidden select-none">
      {/* Seamless Transition Background Gradient from warm ivory into deep emerald */}
      <div className="h-44 sm:h-64 bg-gradient-to-b from-[#F8F7F3] via-[#85654B]/30 to-[#031A16] relative flex flex-col items-center justify-end">
        {/* Subtle Arch Canvas Overlay (Reference frame 32s) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Revealing statement at boundary */}
        <div className="relative z-20 text-center pb-8 px-6">
          <div className="inline-block px-4 py-1 rounded-full bg-[#101412]/80 backdrop-blur-md border border-[#D88955]/30 text-xs text-[#FA9D60] tracking-widest uppercase font-medium">
            Hand-Stitched Silhouette
          </div>
          <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#F6F5F0] mt-3 tracking-tight drop-shadow-md">
            Craftsmanship in every detail<span className="text-[#FA9D60]">.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
