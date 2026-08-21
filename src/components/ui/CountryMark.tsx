import { cn } from "@/lib/utils";

/**
 * A country marker.
 *
 * Regional-indicator flag emoji have no glyph in Chrome on Windows — they paint
 * as the bare letter pair ("IN", "AE", "US"), which reads as broken data. This
 * renders the ISO code as a deliberate chip instead, so it looks the same
 * everywhere.
 */
const FLAGS: Record<string, string> = {
  India: "🇮🇳",
  UAE: "🇦🇪",
  Uganda: "🇺🇬",
  USA: "🇺🇸",
  Australia: "🇦🇺",
};

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
  const flag = FLAGS[country] ?? "🌐";
  const code = CODES[country] ?? country.slice(0, 2).toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-ink-50/60 px-2 py-0.5 font-mono text-[0.72rem] font-medium text-ink-700",
        className,
      )}
    >
      <span className="text-[1.05rem] leading-none" role="img" aria-label={country}>
        {flag}
      </span>
      <span>{code}</span>
    </span>
  );
}
