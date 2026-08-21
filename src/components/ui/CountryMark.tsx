import { cn } from "@/lib/utils";

/**
 * A country marker.
 *
 * Regional-indicator flag emoji have no glyph in Chrome on Windows — they paint
 * as the bare letter pair ("IN", "AE", "US"), which reads as broken data. This
 * renders the ISO code as a deliberate chip instead, so it looks the same
 * everywhere.
 */
const CODES: Record<string, string> = {
  India: "IN",
  UAE: "AE",
  USA: "US",
  Australia: "AU",
  Uganda: "UG",
};

export function CountryMark({
  country,
  className,
}: {
  country: string;
  className?: string;
}) {
  const code = CODES[country] ?? country.slice(0, 2).toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-[1.15rem] shrink-0 items-center rounded border border-ink-200 bg-white px-1.5 font-mono text-[0.6rem] font-medium tracking-wider text-ink-600",
        className,
      )}
    >
      {code}
    </span>
  );
}
