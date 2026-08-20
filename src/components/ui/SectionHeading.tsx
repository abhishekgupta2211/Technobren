import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-brand-700" : "text-brand-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "light" ? "bg-brand-300" : "bg-brand-500/60",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={1}>
        <Tag
          className={cn(
            "font-display text-[2rem] leading-[1.06] sm:text-[2.6rem] lg:text-[3.15rem]",
            tone === "light" ? "text-ink-950" : "text-white",
            align === "center" ? "max-w-3xl" : "max-w-2xl",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p
            className={cn(
              "text-pretty text-[1.02rem] leading-[1.65]",
              tone === "light" ? "text-ink-600" : "text-white/60",
              align === "center" ? "max-w-2xl" : "max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
