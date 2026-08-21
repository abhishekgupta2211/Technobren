import { cn } from "@/lib/utils";

/**
 * A country marker.
 *
 * Regional-indicator flag emoji have no glyph in Chrome on Windows — they paint
 * as the bare letter pair ("IN", "AE", "US"), which reads as broken data. This
 * renders the ISO code as a deliberate chip instead, so it looks the same
 * everywhere.
 */
const FLAG_SVGS: Record<string, string> = {
  India: "https://flagcdn.com/w40/in.png",
  UAE: "https://flagcdn.com/w40/ae.png",
  Uganda: "https://flagcdn.com/w40/ug.png",
  USA: "https://flagcdn.com/w40/us.png",
  Australia: "https://flagcdn.com/w40/au.png",
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
  const flagUrl = FLAG_SVGS[country];
  const code = CODES[country] ?? country.slice(0, 2).toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-ink-50/70 px-2 py-1 font-mono text-[0.72rem] font-medium text-ink-800 shadow-2xs",
        className,
      )}
    >
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={`${country} flag`}
          className="h-3.5 w-5 rounded-xs object-cover"
        />
      ) : (
        <span className="text-[0.85rem]">🌐</span>
      )}
      <span>{code}</span>
    </span>
  );
}
