"use client";

import { useEffect } from "react";
import { QUESTIONS } from "@/lib/questions";
import BipolarScale from "./BipolarScale";
import { encodeAnswerCode } from "@/lib/answer-code";
import { matchTeam } from "@/lib/scoring";
import { toMatchInput, useQuizStore } from "../_store";

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

  // ⚠️ 임시 확인용 화면 — S8 에서 결과 페이지로 이동하도록 통째로 교체된다
  if (index >= QUESTIONS.length) {
    const input = toMatchInput({ league, choices });

    if (input === null) {
      return (
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-8">
          <h1 className="text-xl font-bold">답이 덜 채워졌어요</h1>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-gray-300 p-4"
          >
            처음부터
          </button>
        </main>
      );
    }

    const { winner, userAxes } = matchTeam(input);
    const code = encodeAnswerCode(input);

    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-8">
        <h1 className="text-xl font-bold">테스트 완료</h1>

        <dl className="flex flex-col gap-1 text-sm">
          <dt className="text-gray-500">닮은 팀</dt>
          <dd className="mb-2 text-lg font-bold">{winner.name}</dd>

          <dt className="text-gray-500">답코드 ({code.length}자리)</dt>
          <dd className="mb-2 font-mono">{code}</dd>

          <dt className="text-gray-500">4축 점수</dt>
          <dd className="mb-2 font-mono text-xs">{JSON.stringify(userAxes)}</dd>

          <dt className="text-gray-500">S8 에서 이동할 주소</dt>
          <dd className="font-mono text-xs break-all">
            /football/result/{winner.slug}?a={code}
          </dd>
        </dl>

        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-gray-300 p-4"
        >
          다시하기
        </button>
      </main>
    );
  }

  // index 가 문항 수와 같아지면 완료 (6단계에서 결과 패널로 교체)
  if (index >= QUESTIONS.length) {
    return <p className="p-8 text-center">완료</p>;
  }

  const question = QUESTIONS[index];

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-4">
      <p className="text-sm text-gray-500">
        {index + 1} / {QUESTIONS.length}
      </p>
      <h1 className="mt-3 text-xl font-bold">{question.prompt}</h1>
      {question.kind === "league" ? (
        <div className="mt-8 flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setLeague(option.value);
                goNext();
              }}
              className={`rounded-xl border p-4 text-left ${league === option.value ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <BipolarScale
          negative={question.negative}
          positive={question.positive}
          selected={choices[question.id]}
          onSelect={(choice) => {
            setChoice(question.id, choice);
            goNext();
          }}
        />
      )}
      {index > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="mt-3 self-start text-sm text-gray-400"
        >
          ← 이전
        </button>
      )}
    </main>
  );
}
