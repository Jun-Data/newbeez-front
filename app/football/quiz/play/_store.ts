"use client";

import { create } from "zustand";
import { QUESTIONS } from "@/lib/questions";
import type { MatchInput, ScaleId } from "@/lib/scoring";
import type { ChoiceIndex, LeagueFilter } from "@/lib/types";

export interface QuizAnswers {
  readonly league: LeagueFilter | null;
  readonly choices: Partial<Record<ScaleId, ChoiceIndex>>;
}

interface QuizState extends QuizAnswers {
  readonly index: number;
  setLeague: (league: LeagueFilter) => void;
  setChoice: (id: ScaleId, choice: ChoiceIndex) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
}

// 새 객체를 매번 만든다 (공유 객체를 재사용하면 초기값이 오염 가능)
const initialAnswers = (): QuizAnswers & { index: number } => ({
  index: 0,
  league: null,
  choices: {},
});

export const useQuizStore = create<QuizState>((set) => ({
  ...initialAnswers(),
  setLeague: (league) => set({ league }),
  setChoice: (id, choice) =>
    set((state) => ({ choices: { ...state.choices, [id]: choice } })),
  goNext: () =>
    set((state) => ({ index: Math.min(state.index + 1, QUESTIONS.length) })),
  goBack: () => set((state) => ({ index: Math.max(state.index - 1, 0) })),
  reset: () => set(initialAnswers()),
}));

export function toMatchInput(answers: QuizAnswers): MatchInput | null {
  if (answers.league === null) return null;

  for (const question of QUESTIONS) {
    if (question.kind !== "scale") continue;
    if (answers.choices[question.id] === undefined) return null; // 0도 유효한 값
  }
  return {
    league: answers.league,
    choices: answers.choices as MatchInput["choices"],
  };
}
