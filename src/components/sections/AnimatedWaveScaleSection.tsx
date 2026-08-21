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

      // Clean Light Subtle Gradient Background matching Website Theme
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.5, "#fff8f8");
      bgGrad.addColorStop(1, "#fdf2f2");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 36 TechnoBren Brand Red Wave Ribbon Lines (RGB: 174, 49, 53)
      const numLines = 36;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();

        const progress = i / numLines;
        
        // Brand Red Spectrum (174, 49, 53)
        const r = Math.floor(180 + progress * 40);
        const g = Math.floor(40 + progress * 20);
        const b = Math.floor(50 + progress * 20);
        const alpha = 0.08 + (1 - Math.abs(progress - 0.5) * 2) * 0.28;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const amplitude = 32 + i * 1.6;
        const frequency = 0.0024 + i * 0.00008;

        for (let x = 0; x <= width; x += 6) {
          const yWave1 = Math.sin(x * frequency + step + i * 0.07) * amplitude;
          const yWave2 = Math.cos(x * 0.0012 + step * 0.8) * 20;
          const arch = Math.sin((x / width) * Math.PI) * 70;

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
    <section className="relative overflow-hidden border-t border-ink-100 bg-white py-12 sm:py-16">
      {/* Dynamic Animated Canvas Wave — Brand Red Theme */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      {/* Subtle Brand Red Glow Orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-brand-500/10 blur-3xl"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3.5 py-1 text-xs font-semibold text-brand-700">
                <Activity className="size-3.5 text-brand-600 animate-pulse" />
                <span>Enterprise Infrastructure &amp; High Availability</span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl text-ink-950 tracking-tight">
                Scale with confidence. <span className="text-brand-700">Zero downtime.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-600 leading-relaxed">
                Handle millions of API transactions per second with sub-millisecond response times, automated auto-scaling clusters, and enterprise resilience.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="shrink-0">
              <Button href="/hire-developers" variant="primary" size="lg" arrow className="shadow-md">
                Deploy Engineering Team
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Compact Clean Metrics Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-ink-200/60 pt-8">
          <Reveal delay={2}>
            <div className="group rounded-2xl border border-ink-200 bg-white/80 p-5 backdrop-blur-xs transition-all duration-300 hover:border-brand-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-ink-500 uppercase tracking-wider">
                  Daily Throughput
                </span>
                <Server className="size-4 text-brand-600" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand-700 sm:text-4xl tracking-tight">
                500m+
              </p>
              <p className="mt-1 text-xs text-ink-600 font-medium">
                API requests processed per day with 99.99% SLA uptime
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="group rounded-2xl border border-ink-200 bg-white/80 p-5 backdrop-blur-xs transition-all duration-300 hover:border-brand-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-ink-500 uppercase tracking-wider">
                  Peak Concurrency
                </span>
                <Zap className="size-4 text-brand-600" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand-700 sm:text-4xl tracking-tight">
                10k+
              </p>
              <p className="mt-1 text-xs text-ink-600 font-medium">
                Simultaneous requests per second under peak load
              </p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="group rounded-2xl border border-ink-200 bg-white/80 p-5 backdrop-blur-xs transition-all duration-300 hover:border-brand-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] font-bold text-ink-500 uppercase tracking-wider">
                  Database Velocity
                </span>
                <ShieldCheck className="size-4 text-emerald-600" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand-700 sm:text-4xl tracking-tight">
                150k+
              </p>
              <p className="mt-1 text-xs text-ink-600 font-medium">
                Secured transactions per minute with instant data sync
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
