"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AnimatedWaveScaleSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Draw dark background gradient matching TechnoBren dark theme
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#10090a");
      bgGrad.addColorStop(0.5, "#1c0d0f");
      bgGrad.addColorStop(1, "#0a0506");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const numLines = 38;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();

        const progress = i / numLines;
        // Dynamic color transition in TechnoBren Brand Red spectrum (RGB: 174, 49, 53)
        const r = Math.floor(225 - progress * 40);
        const g = Math.floor(55 + progress * 60);
        const b = Math.floor(65 + progress * 70);
        const alpha = 0.25 + (1 - Math.abs(progress - 0.5) * 2) * 0.6;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const amplitude = 48 + i * 2.2;
        const frequency = 0.002 + i * 0.0001;

        for (let x = 0; x <= width; x += 6) {
          const yWave1 = Math.sin(x * frequency + step + i * 0.08) * amplitude;
          const yWave2 = Math.cos(x * 0.001 + step * 0.7) * 30;
          
          // Curved arch across section
          const arch = Math.sin((x / width) * Math.PI) * 120;
          
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
    <section className="relative overflow-hidden bg-[#10090a] text-white py-20 sm:py-28">
      {/* Interactive WebGL/Canvas Wave Background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <Container size="wide" className="relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-brand-200 tracking-wider">
                Enterprise Infrastructure &amp; Performance
              </span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight text-white">
              Scale with confidence.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-100/80 leading-relaxed">
              Handle thousands of transactions per second with consistent speed, ultra-low latency, and enterprise reliability — even during peak traffic surges.
            </p>
          </Reveal>
        </div>

        {/* Animated Metrics Row */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 border-t border-brand-900/40 pt-10">
          <Reveal delay={2}>
            <div>
              <p className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-white sm:text-5xl lg:text-6xl tracking-tight">
                500m+
              </p>
              <p className="mt-2 font-mono text-xs font-semibold text-brand-200/80 uppercase tracking-widest">
                API Requests Per Day
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div>
              <p className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-200 to-white sm:text-5xl lg:text-6xl tracking-tight">
                10k+
              </p>
              <p className="mt-2 font-mono text-xs font-semibold text-brand-200/80 uppercase tracking-widest">
                Concurrent Peak RPS
              </p>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div>
              <p className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-white to-brand-200 sm:text-5xl lg:text-6xl tracking-tight">
                150k+
              </p>
              <p className="mt-2 font-mono text-xs font-semibold text-brand-200/80 uppercase tracking-widest">
                Transactions Per Minute
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
