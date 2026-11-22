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
          className={`rounded-xl border-2 p-4 text-center ${
            selected === option.value
              ? "border-[#fbb914] bg-[#fffcf2]"
              : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-lg font-bold">{option.headline}</p>
          <p className="mt-1 text-sm text-gray-800">{option.detail}</p>
        </button>
      ))}
    </div>
  );
}
