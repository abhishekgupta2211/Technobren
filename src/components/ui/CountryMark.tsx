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

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 overflow-hidden rounded-xs border border-ink-200/80 bg-ink-100/40",
        className,
      )}
    >
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={`${country} flag`}
          className="size-full object-cover"
        />
      ) : (
        <span className="font-mono text-[0.6rem] font-bold text-ink-700">
          {country.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}
