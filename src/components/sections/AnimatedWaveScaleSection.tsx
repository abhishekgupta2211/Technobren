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
    let height = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 420;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      step += 0.009;
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Brand Maroon Base Canvas Gradient (TechnoBren Brand Dark Theme)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#12080a");
      bgGrad.addColorStop(0.5, "#220e11");
      bgGrad.addColorStop(1, "#0a0405");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 40 Glowing Wave Ribbon Lines (TechnoBren Brand Red Spectrum: 174, 49, 53)
      const numLines = 40;
      ctx.lineWidth = 1.3;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();

        const progress = i / numLines;
        
        // Multi-color spectrum in TechnoBren Brand Red / Crimson / Rose
        const r = Math.floor(240 - progress * 40);
        const g = Math.floor(55 + Math.sin(progress * Math.PI) * 70);
        const b = Math.floor(70 + progress * 80);
        const alpha = 0.22 + (1 - Math.abs(progress - 0.5) * 2) * 0.65;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const amplitude = 42 + i * 2.0;
        const frequency = 0.0022 + i * 0.00008;

        for (let x = 0; x <= width; x += 5) {
          const yWave1 = Math.sin(x * frequency + step + i * 0.07) * amplitude;
          const yWave2 = Math.cos(x * 0.0012 + step * 0.8) * 26;
          const arch = Math.sin((x / width) * Math.PI) * 100;

          const y = height * 0.55 - arch + yWave1 + yWave2;

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
    <section className="relative overflow-hidden bg-[#12080a] text-white py-20 sm:py-24">
      {/* Dynamic Animated Canvas Wave — TechnoBren Brand Red Theme */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-95"
      />

      {/* Ambient TechnoBren Brand Red Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-brand-600/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-96 rounded-full bg-rose-600/20 blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/15 px-4 py-1.5 backdrop-blur-md">
                <Activity className="size-3.5 text-brand-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-brand-200 tracking-wider">
                  Enterprise Infrastructure &amp; High Availability
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight">
                Scale with confidence. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-rose-200 to-white">Zero downtime.</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-brand-100/90 leading-relaxed">
                Handle millions of API transactions per second with sub-millisecond response times, automated auto-scaling clusters, and enterprise resilience.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="shrink-0">
              <Button href="/hire-developers" variant="primary" size="lg" arrow className="bg-white text-brand-950 hover:bg-brand-50 font-bold shadow-xl">
                Deploy Engineering Team
              </Button>
            </div>
          </Reveal>
        </div>

        {/* TechnoBren Brand Dark Glassmorphic Metrics Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-brand-800/40 pt-10">
          <Reveal delay={2}>
            <div className="group rounded-2xl border border-brand-500/25 bg-gradient-to-b from-brand-950/50 via-rose-950/30 to-black/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/60 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-brand-300 uppercase tracking-widest">
                  Daily Throughput
                </span>
                <Server className="size-4 text-brand-400" />
              </div>
              <p className="mt-3 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-rose-300 sm:text-5xl tracking-tight">
                500m+
              </p>
              <p className="mt-1.5 text-xs text-brand-200/80 font-medium">
                API requests processed per day with 99.99% SLA uptime
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="group rounded-2xl border border-brand-500/25 bg-gradient-to-b from-brand-950/50 via-rose-950/30 to-black/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/60 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-rose-300 uppercase tracking-widest">
                  Peak Concurrency
                </span>
                <Zap className="size-4 text-rose-400" />
              </div>
              <p className="mt-3 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-brand-300 sm:text-5xl tracking-tight">
                10k+
              </p>
              <p className="mt-1.5 text-xs text-rose-200/80 font-medium">
                Simultaneous requests per second under peak load
              </p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="group rounded-2xl border border-brand-500/25 bg-gradient-to-b from-brand-950/50 via-rose-950/30 to-black/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-400/60 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-brand-300 uppercase tracking-widest">
                  Database Velocity
                </span>
                <ShieldCheck className="size-4 text-emerald-400" />
              </div>
              <p className="mt-3 font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-rose-300 sm:text-5xl tracking-tight">
                150k+
              </p>
              <p className="mt-1.5 text-xs text-brand-200/80 font-medium">
                Secured transactions per minute with instant data sync
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
