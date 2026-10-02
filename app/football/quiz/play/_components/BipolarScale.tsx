"use client";

import type { Pole } from "@/lib/questions";
import type { ChoiceIndex } from "@/lib/types";

interface BipolarScaleProps {
  readonly negative: Pole; // 위쪽 극
  readonly positive: Pole; // 아래쪽 극
  readonly selected: ChoiceIndex | undefined; // 0도 유효한 타입이라 undefined
  readonly onSelect: (choice: ChoiceIndex) => void;
}

function PoleText({ pole }: { readonly pole: Pole }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold">{pole.headline}</p>
      <p className="mt-1 truncate text-xs text-gray-500">{pole.detail}</p>
    </div>
  );
}

interface ScaleDotProps {
  readonly choice: ChoiceIndex; // 누른 값
  readonly big?: boolean; // 극단 큰 원
  readonly selected: ChoiceIndex | undefined;
  readonly onSelect: (choice: ChoiceIndex) => void;
}

function ScaleDot({ choice, big, selected, onSelect }: ScaleDotProps) {
  const isSelected = selected === choice;
  return (
    <button
      type="button"
      onClick={() => onSelect(choice)}
      className={`relative rounded-full border ${big ? "size-20 short:size-12" : "size-12 short:size-8"} ${isSelected ? "border-[#2c2735] bg-[#2c2735] ring-4 ring-[#fbe3a5]" : "border-[#b7bbbe] bg-white"}`}
    />
  );
}

export default function BipolarScale({
  negative,
  positive,
  selected,
  onSelect,
}: BipolarScaleProps) {
  return (
    <div className="mt-4 short:mt-2 flex flex-1 flex-col gap-6 short:gap-4">
      <PoleText pole={negative} />
      <div className="relative flex max-h-100 flex-col flex-1 justify-center items-center gap-6">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#dddfdf]" />
        <ScaleDot choice={0} big selected={selected} onSelect={onSelect} />
        <ScaleDot choice={1} selected={selected} onSelect={onSelect} />
        <ScaleDot choice={2} selected={selected} onSelect={onSelect} />
        <ScaleDot choice={3} big selected={selected} onSelect={onSelect} />
      </div>
      <PoleText pole={positive} />
    </div>
  );
}
