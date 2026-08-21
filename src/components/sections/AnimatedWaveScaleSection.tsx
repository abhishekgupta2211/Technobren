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
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 340;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      step += 0.009;
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Indigo/Black Base Canvas Gradient (Original Dark Theme)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#080c19");
      bgGrad.addColorStop(0.5, "#0d142b");
      bgGrad.addColorStop(1, "#050811");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 40 Glowing Wave Ribbon Lines (Neon Magenta / Purple Spectrum)
      const numLines = 40;
      ctx.lineWidth = 1.25;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();

        const progress = i / numLines;
        
        // Multi-color spectrum from Neon Magenta to Purple
        const r = Math.floor(230 - progress * 110);
        const g = Math.floor(70 + Math.sin(progress * Math.PI) * 40);
        const b = Math.floor(240 - progress * 30);
        const alpha = 0.2 + (1 - Math.abs(progress - 0.5) * 2) * 0.6;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const amplitude = 36 + i * 1.8;
        const frequency = 0.0022 + i * 0.00008;

        for (let x = 0; x <= width; x += 5) {
          const yWave1 = Math.sin(x * frequency + step + i * 0.07) * amplitude;
          const yWave2 = Math.cos(x * 0.0012 + step * 0.8) * 22;
          const arch = Math.sin((x / width) * Math.PI) * 80;

          const y = height * 0.54 - arch + yWave1 + yWave2;

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
    <section className="relative overflow-hidden bg-[#080c19] text-white py-12 sm:py-16">
      {/* Dynamic Animated Canvas Wave — Original Dark Theme */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-95"
      />

      {/* Ambient Purple/Magenta Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 size-80 rounded-full bg-purple-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-pink-600/15 blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 backdrop-blur-md">
                <Activity className="size-3.5 text-purple-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-purple-200 tracking-wider">
                  Enterprise Infrastructure &amp; Performance
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl leading-tight text-white tracking-tight">
                Scale with confidence. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300">Zero downtime.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-purple-200/90 leading-relaxed">
                Handle thousands of transactions per second with consistent speed, ultra-low latency, and enterprise reliability — even during peak traffic surges.
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

        {/* Compact Original Dark Glassmorphism Metrics Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-purple-900/40 pt-8">
          <Reveal delay={2}>
            <div className="group rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 via-purple-900/20 to-black/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-purple-300 uppercase tracking-wider">
                  Daily Throughput
                </span>
                <Server className="size-4 text-purple-400" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-purple-300 sm:text-4xl tracking-tight">
                500m+
              </p>
              <p className="mt-1 text-xs text-purple-200/80 font-medium">
                API requests processed per day with 99.99% SLA uptime
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="group rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 via-purple-900/20 to-black/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-purple-300 uppercase tracking-wider">
                  Peak Concurrency
                </span>
                <Zap className="size-4 text-purple-400" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 sm:text-4xl tracking-tight">
                10k+
              </p>
              <p className="mt-1 text-xs text-purple-200/80 font-medium">
                Simultaneous requests per second under peak load
              </p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="group rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 via-purple-900/20 to-black/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-purple-300 uppercase tracking-wider">
                  Database Velocity
                </span>
                <ShieldCheck className="size-4 text-emerald-400" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-purple-300 sm:text-4xl tracking-tight">
                150k+
              </p>
              <p className="mt-1 text-xs text-purple-200/80 font-medium">
                Secured transactions per minute with instant data sync
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
