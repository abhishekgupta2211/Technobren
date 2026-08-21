"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Server, Activity } from "lucide-react";

export function AnimatedWaveScaleSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 520;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      step += 0.009;
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Indigo/Black Base Canvas Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#09060c");
      bgGrad.addColorStop(0.5, "#140810");
      bgGrad.addColorStop(1, "#050307");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 44 Glowing Wave Ribbon Lines
      const numLines = 44;
      ctx.lineWidth = 1.35;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();

        const progress = i / numLines;
        
        // Multi-color spectrum from Neon Magenta to Deep Red & Purple
        const r = Math.floor(240 - progress * 50);
        const g = Math.floor(60 + Math.sin(progress * Math.PI) * 80);
        const b = Math.floor(130 + progress * 110);
        const alpha = 0.2 + (1 - Math.abs(progress - 0.5) * 2) * 0.65;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const amplitude = 52 + i * 2.4;
        const frequency = 0.0022 + i * 0.00008;

        for (let x = 0; x <= width; x += 5) {
          const yWave1 = Math.sin(x * frequency + step + i * 0.07) * amplitude;
          const yWave2 = Math.cos(x * 0.0012 + step * 0.8) * 35;
          const arch = Math.sin((x / width) * Math.PI) * 140;

          const y = height * 0.58 - arch + yWave1 + yWave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#09060c] text-white pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28">
      {/* Dynamic Animated Canvas Wave */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-90"
      />

      {/* Ambient Red/Purple Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-brand-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 size-96 rounded-full bg-purple-600/15 blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/15 px-4 py-1.5 backdrop-blur-md">
                <Activity className="size-3.5 text-brand-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-brand-200 tracking-wider">
                  Enterprise Infrastructure &amp; High-Availability Architecture
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-3xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tight">
                Scale with confidence. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-pink-200 to-purple-300">
                  Zero downtime. Unlimited growth.
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-brand-100/90 leading-relaxed max-w-2xl">
                Handle millions of API transactions per second with sub-millisecond response times, automated auto-scaling clusters, and enterprise resilience — even during peak traffic surges.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="flex items-center gap-3 sm:gap-4">
              <Button href="/hire-developers" variant="primary" size="lg" arrow className="bg-white text-brand-950 hover:bg-brand-50 font-bold shadow-xl">
                Deploy Engineering Team
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Glassmorphism Animated Metrics Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8 border-t border-brand-800/40 pt-12">
          <Reveal delay={2}>
            <div className="group rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-950/40 via-purple-950/20 to-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] font-bold text-brand-300 uppercase tracking-widest">
                  Daily Throughput
                </span>
                <Server className="size-4 text-brand-400" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-pink-300 sm:text-5xl lg:text-6xl tracking-tight">
                500m+
              </p>
              <p className="mt-2 text-xs text-brand-200/80 font-medium">
                API requests processed per day with 99.99% SLA uptime
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="group rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-950/40 via-purple-950/20 to-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] font-bold text-purple-300 uppercase tracking-widest">
                  Peak Concurrency
                </span>
                <Zap className="size-4 text-purple-400" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 sm:text-5xl lg:text-6xl tracking-tight">
                10k+
              </p>
              <p className="mt-2 text-xs text-purple-200/80 font-medium">
                Simultaneous requests per second under peak load
              </p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="group rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-950/40 via-purple-950/20 to-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] font-bold text-pink-300 uppercase tracking-widest">
                  Database Velocity
                </span>
                <ShieldCheck className="size-4 text-emerald-400" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-brand-300 sm:text-5xl lg:text-6xl tracking-tight">
                150k+
              </p>
              <p className="mt-2 text-xs text-pink-200/80 font-medium">
                Secured transactions per minute with instant data sync
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
