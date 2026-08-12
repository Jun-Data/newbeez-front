import { QUESTIONS } from "./questions";
import type { ChoiceIndex } from "./types";
import type { MatchInput } from "./scoring";

// 리그 ↔ 코드 숫자 (Q1 선택지 순서를 그대로)
const LEAGUE_CODES = QUESTIONS.flatMap((q) =>
  q.kind === "league" ? q.options.map((o) => o.value) : [],
);

// 성향 문항 id를 문항 순서대로 (q2 ~ q9)
const SCALE_IDS = QUESTIONS.flatMap((q) => (q.kind === "scale" ? [q.id] : []));

// 답코드 길이 = 리그 1자리 + 성향 문항 수
export const ANSWER_CODE_LENGTH = 1 + SCALE_IDS.length;

// 답 → 9자리 URL용 코드
export function encodeAnswerCode(input: MatchInput): string {
  const league = LEAGUE_CODES.indexOf(input.league);
  const scales = SCALE_IDS.map((id) => input.choices[id]).join("");
  return `${league}${scales}`;
}

// 9자리 코드 → 답, 조금이라도 벗어나면 null
export function decodeAnswerCode(code: string): MatchInput | null {
  if (code.length !== ANSWER_CODE_LENGTH) return null;
  if (!/^[0-9]+$/.test(code)) return null;
  const leagueIndex = Number(code[0]);
  if (leagueIndex >= LEAGUE_CODES.length) return null;
  const choices = {} as MatchInput["choices"];
  for (let i = 0; i < SCALE_IDS.length; i++) {
    const choice = Number(code[i + 1]);
    if (choice > 3) return null;
    choices[SCALE_IDS[i]] = choice as ChoiceIndex;
  }
  return { league: LEAGUE_CODES[leagueIndex], choices };
}
