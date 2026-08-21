"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RegionOption {
  code: string;
  country: string;
  currency: string;
  flag: string;
  phone: string;
  city: string;
}

export const REGIONS: RegionOption[] = [
  {
    code: "IN",
    country: "India",
    currency: "INR (₹)",
    flag: "🇮🇳",
    phone: "+91 93 0536 5576",
    city: "Jaunpur, UP",
  },
  {
    code: "AE",
    country: "UAE",
    currency: "AED (د.إ)",
    flag: "🇦🇪",
    phone: "+971 50 123 4567",
    city: "Dubai, UAE",
  },
  {
    code: "UG",
    country: "Uganda",
    currency: "USD ($)",
    flag: "🇺🇬",
    phone: "+256 70 000 0000",
    city: "Kampala, UG",
  },
];

export function RegionSwitcher({ className }: { className?: string }) {
  const [selectedRegion, setSelectedRegion] = useState<RegionOption>(REGIONS[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-2xs transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-800"
        aria-label="Switch Region and Currency"
      >
        <span className="text-sm">{selectedRegion.flag}</span>
        <span className="font-mono text-[0.72rem] font-bold text-ink-900">{selectedRegion.code}</span>
        <span className="hidden sm:inline text-[0.68rem] text-ink-500 font-medium">({selectedRegion.currency.split(" ")[0]})</span>
        <ChevronDown className="size-3 text-ink-400" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-2xl border border-ink-200/90 bg-white p-1.5 shadow-xl backdrop-blur-xl">
            <div className="px-2 py-1.5 border-b border-ink-100 mb-1">
              <span className="flex items-center gap-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-ink-400">
                <Globe className="size-3 text-brand-600" /> Select Region / Currency
              </span>
            </div>
            {REGIONS.map((region) => {
              const isSelected = selectedRegion.code === region.code;
              return (
                <button
                  key={region.code}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(region);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors",
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-bold border border-brand-200/60"
                      : "text-ink-700 hover:bg-ink-50 hover:text-ink-950",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{region.flag}</span>
                    <div>
                      <span className="block font-semibold">{region.country}</span>
                      <span className="block text-[0.65rem] text-ink-400">{region.city}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[0.68rem] font-bold text-brand-700">
                    {region.currency}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
