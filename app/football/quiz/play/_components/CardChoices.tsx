"use client";

import type { LeagueOption } from "@/lib/questions";
import type { LeagueFilter } from "@/lib/types";

interface CardChoicesProps {
  readonly options: readonly LeagueOption[];
  readonly selected: LeagueFilter | null;
  readonly onSelect: (value: LeagueFilter) => void;
}

export default function CardChoices({
  options,
  selected,
  onSelect,
}: CardChoicesProps) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={`rounded-xl border-2 p-4 text-left ${
            selected === option.value
              ? "border-[#fbb914] bg-[#fffcf2]"
              : "border-gray-200 bg-white"
          }`}
        >
          <p className="font-bold">{option.headline}</p>
          <p className="mt-1 text-xs text-gray-500">{option.detail}</p>
        </button>
      ))}
    </div>
  );
}
