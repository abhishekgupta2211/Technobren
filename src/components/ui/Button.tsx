"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const button = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-[transform,box-shadow,background-color,border-color,color]",
    "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-600 text-white shadow-[0_1px_2px_rgba(174,49,53,0.22),0_5px_14px_-8px_rgba(174,49,53,0.38)]",
          "hover:bg-brand-700 hover:shadow-[0_2px_4px_rgba(174,49,53,0.2),0_10px_24px_-10px_rgba(174,49,53,0.42)]",
          "hover:-translate-y-0.5",
        ],
        secondary: [
          "bg-white text-ink-900 border border-ink-200",
          "shadow-[0_1px_2px_rgba(16,15,20,0.05)]",
          "hover:border-ink-300 hover:shadow-[0_3px_10px_-6px_rgba(16,15,20,0.14)] hover:-translate-y-0.5",
        ],
        ghost: ["text-ink-700 hover:text-brand-700 hover:bg-brand-50"],
        onDark: [
          "bg-white text-ink-950 shadow-[0_5px_16px_-10px_rgba(0,0,0,0.4)]",
          "hover:-translate-y-0.5 hover:shadow-[0_9px_24px_-12px_rgba(0,0,0,0.5)]",
        ],
        outlineDark: [
          "border border-white/20 text-white bg-white/[0.04] backdrop-blur-sm",
          "hover:bg-white/[0.1] hover:border-white/35 hover:-translate-y-0.5",
        ],
      },
      size: {
        sm: "h-9 px-4 text-[0.82rem] rounded-lg",
        md: "h-11 px-5 text-[0.9rem] rounded-xl",
        lg: "h-[3.25rem] px-7 text-[0.95rem] rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type StyleProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
  /** Show the signature arrow that slides on hover. */
  arrow?: boolean;
};

type LinkButtonProps = StyleProps & { href: string };
type NativeButtonProps = StyleProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative z-10 size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const { href, className, variant, size, children, arrow } = props;
    const classes = cn(button({ variant, size }), className);
    const isHttp = href.startsWith("http");
    const isProtocol = isHttp || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isProtocol) {
      return (
        <a
          href={href}
          className={classes}
          {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  const { className, variant, size, children, arrow, href: _href, ...rest } = props;
  void _href;

  return (
    <button className={cn(button({ variant, size }), className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
