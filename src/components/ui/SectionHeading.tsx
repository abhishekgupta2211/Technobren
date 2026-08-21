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
        className={cn("h-px w-6", tone === "light" ? "bg-brand-300" : "bg-brand-500/60")}
      />
      {children}
    </span>
  );
}

/**
 * The section heading.
 *
 * Left-aligned headings lay out as a real two-column row: the type column is
 * wide enough to hold a full line, and the `aside` column is a first-class slot.
 * Previously the title was capped well short of the container and whatever sat
 * beside it floated in a large empty rectangle.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Content for the right-hand column — a CTA, a counter, a badge. */
  aside?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const type = (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={1}>
        <Tag
          className={cn(
            "font-display text-[2rem] leading-[1.06] sm:text-[2.5rem] lg:text-[2.95rem]",
            tone === "light" ? "text-ink-950" : "text-white",
            align === "center" ? "max-w-3xl" : "max-w-none",
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
              tone === "light" ? "text-ink-600" : "text-white/70",
              align === "center" ? "max-w-2xl" : "max-w-2xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );

  if (align === "center") {
    return <div className={cn("text-center", className)}>{type}</div>;
  }

  return (
    <div
      className={cn(
        "grid gap-7",
        aside && "lg:grid-cols-[minmax(0,40rem)_1fr] lg:items-end lg:gap-12",
        className,
      )}
    >
      {type}
      {aside && (
        <Reveal delay={2} className="lg:justify-self-end">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
