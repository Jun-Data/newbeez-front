"use client";

import { useEffect } from "react";
import { QUESTIONS } from "@/lib/questions";
import { useQuizStore } from "../_store";
import type { Pole } from "@/lib/questions";
import type { ChoiceIndex } from "@/lib/types";

type ScaleOption = { choice: ChoiceIndex; label: string; detail?: string };

function scaleOptions(negative: Pole, positive: Pole): ScaleOption[] {
  return [
    { choice: 0, label: negative.headline, detail: negative.detail },
    { choice: 1, label: `약간 ${negative.word}` },
    { choice: 2, label: `약간 ${positive.word}` },
    { choice: 3, label: positive.headline, detail: positive.detail },
  ];
}

export default function QuizPlay() {
  const index = useQuizStore((s) => s.index);
  const league = useQuizStore((s) => s.league);
  const choices = useQuizStore((s) => s.choices);
  const setLeague = useQuizStore((s) => s.setLeague);
  const setChoice = useQuizStore((s) => s.setChoice);
  const goBack = useQuizStore((s) => s.goBack);
  const goNext = useQuizStore((s) => s.goNext);
  const reset = useQuizStore((s) => s.reset);

  // 스토어는 컴포넌트 밖 싱글턴이라 화면을 떠나도 값이 남는다.
  // 나갈 때 비워두면 다음 진입이 항상 Q1 부터다.
  useEffect(() => reset, [reset]);

  // index 가 문항 수와 같아지면 완료 (6단계에서 결과 패널로 교체)
  if (index >= QUESTIONS.length) {
    return <p className="p-8 text-center">완료</p>;
  }

  const question = QUESTIONS[index];

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-8">
      <p className="text-sm text-gray-500">
        {index + 1} / {QUESTIONS.length}
      </p>
      <h1 className="mt-3 text-xl font-bold">{question.prompt}</h1>
      <div className="mt-8 flex flex-col gap-3">
        {question.kind === "league"
          ? question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={league === option.value}
                onClick={() => {
                  setLeague(option.value);
                  goNext();
                }}
                className={`rounded-xl border p-4 text-left ${league === option.value ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}
              >
                {option.label}
              </button>
            ))
          : scaleOptions(question.negative, question.positive).map((option) => (
              <button
                key={option.choice}
                type="button"
                aria-pressed={choices[question.id] === option.choice}
                onClick={() => {
                  setChoice(question.id, option.choice);
                  goNext();
                }}
                className={`rounded-xl border p-4 text-left ${
                  choices[question.id] === option.choice
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-300"
                }`}
              >
                <span className="font-semibold">{option.label}</span>
                {option.detail && (
                  <span className="mt-1 block text-sm text-gray-500">
                    {option.detail}
                  </span>
                )}
              </button>
            ))}
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="mt-6 self-start text-sm text-gray-400"
        >
          ← 이전
        </button>
      )}
    </main>
  );
}
