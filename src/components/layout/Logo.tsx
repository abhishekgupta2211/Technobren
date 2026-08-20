import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The TechnoBren logo, used unmodified.
 *
 * The wordmark is crimson + charcoal artwork drawn for a light background, so on
 * dark surfaces we present it on its own white plate rather than recolouring it.
 */
export function Logo({
  className,
  onDark = false,
  preload = false,
}: {
  className?: string;
  onDark?: boolean;
  preload?: boolean;
}) {
  const img = (
    <Image
      src="/brand/technobren-logo.png"
      alt={`${site.legalName} logo`}
      width={169}
      height={60}
      preload={preload}
      className="h-full w-auto object-contain"
    />
  );

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-80",
        className,
      )}
    >
      {onDark ? (
        <span className="inline-flex h-full items-center rounded-lg bg-white px-3 py-2 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
          <span className="block h-8">{img}</span>
        </span>
      ) : (
        <span className="block h-9 sm:h-10">{img}</span>
      )}
    </Link>
  );
}
