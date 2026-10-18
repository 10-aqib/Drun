"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle playback rate for cinematic motion
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.88;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback handled automatically
        });
      }
    }
  }, []);

  // Handle pointer parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // WebGL / Canvas Particle Monogram & Atmospheric dust
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = containerRef.current?.clientWidth || window.innerWidth);
    let height = (canvas.height = containerRef.current?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = containerRef.current?.clientWidth || window.innerWidth;
      height = canvas.height = containerRef.current?.clientHeight || window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      size: number;
      color: string;
      alpha: number;
      angle: number;
      speed: number;
      depth: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];

      // Ambient Floating Celestial Particles
      const ambientCount = width < 768 ? 45 : 85;
      for (let i = 0; i < ambientCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.85;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * 1.6 + 0.5,
          color: Math.random() > 0.6 ? "#FA9D60" : "#E9E8DF",
          alpha: Math.random() * 0.45 + 0.1,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.003,
          depth: Math.random() * 2 + 0.5,
        });
      }
    };

    initParticles();

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const mouseFactorX = mousePos.x * 25;
      const mouseFactorY = mousePos.y * 20;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y -= 0.18 * p.depth;
        p.x += Math.sin(time + i) * 0.2;

        if (p.y < 0) {
          p.y = height * 0.85;
          p.x = Math.random() * width;
        }

        const parallaxX = p.x + mouseFactorX * 0.2 * p.depth;
        const parallaxY = p.y + mouseFactorY * 0.2 * p.depth;

        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time + i));
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#031A16] select-none pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6"
    >
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center transform scale-[1.02] filter brightness-[0.88] contrast-[1.08]"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Layered Atmospheric Vignette & Scrim (Ensures maximum legibility & contrast) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(3, 26, 22, 0.35) 0%, rgba(3, 26, 22, 0.65) 60%, rgba(3, 26, 22, 0.94) 100%)",
        }}
      />

      {/* Top Navbar Clearance Fade */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[#031A16] via-[#031A16]/65 to-transparent pointer-events-none z-[2]" />

      {/* Bottom Section Blend */}
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-[#031A16] via-[#031A16]/80 to-transparent pointer-events-none z-[2]" />

      {/* 3. Interactive Warm Amber Horizon Glow (Accentuates video horizon) */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-[35%] pointer-events-none blur-3xl opacity-25 z-[2]"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, #D88955 0%, #A56D47 30%, transparent 70%)",
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* 4. Interactive Canvas Particle Monogram & Stardust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* 5. Subtle Soft Horizon Dune Silhouette at Bottom (semi-transparent to reveal video mountains) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 md:h-48 pointer-events-none z-[15] opacity-35"
        style={{
          transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -4}px)`,
          transition: "transform 0.5s ease-out",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover text-[#031A16] fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* 6. Foreground Content Container (Responsive typography & layout) */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-8 sm:pt-12 md:pt-14 pb-8">
        {/* Hero Headline (Responsive fluid sizing with solid, bold luxury typography) */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F6F5F0] leading-[1.12] sm:leading-[1.08] max-w-4xl mx-auto drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]">
          Crafted by tradition.
          <br />
          <span className="font-extrabold text-[#FA9D60]">
            Worn with distinction.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#D5E0DB] max-w-xl md:max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          Discover Peshawari footwear where centuries-old Pakistani artisan
          heritage converges with contemporary luxury and ergonomic mastery.
        </p>

        {/* Call to Actions (matching reference video copper pill) */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-row items-center justify-center gap-3.5 sm:gap-5 flex-wrap">
          <Link
            href="/shop"
            className="btn-copper-pill px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm md:text-base flex items-center gap-2.5 font-medium group shadow-[0_10px_35px_rgba(216,137,85,0.4)]"
          >
            <span>Explore Collection</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/craftsmanship"
            className="btn-ghost-luxury px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm md:text-base backdrop-blur-md bg-black/40 border-white/20 hover:border-[#FA9D60]"
          >
            Discover Our Craft
          </Link>
        </div>
      </div>

      {/* 7. Scroll Down Indicator */}
      <div className="relative z-30 flex flex-col items-center justify-center pt-4 pb-2">
        <a
          href="#featured-collection"
          className="group flex flex-col items-center text-[#C0CCC6] hover:text-[#FA9D60] transition-colors text-[10px] sm:text-xs tracking-widest uppercase gap-1.5 focus:outline-none drop-shadow-md"
        >
          <span>Scroll to explore</span>
          <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:border-[#FA9D60] group-hover:bg-[#FA9D60]/10 transition-all">
            <ArrowDown size={13} className="animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
