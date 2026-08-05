import { CLUBS } from "@/lib/clubs";
import { QUESTIONS } from "@/lib/questions";
import { matchTeam, type MatchInput } from "@/lib/scoring";
import type { ChoiceIndex, LeagueFilter } from "@/lib/types";

// 성향 문항 id 목록 (q2~q9)
const SCALE_IDS = QUESTIONS.filter((q) => q.kind === "scale").map((q) => q.id);
const LEAGUES: readonly LeagueFilter[] = ["EPL", "ETC", "ALL"];

// i(0~65535)를 4진법으로 쪼개 8문항 답(0~3)으로
function choicesFor(i: number): MatchInput["choices"] {
  const choices: Record<string, ChoiceIndex> = {};
  let x = i;
  for (const id of SCALE_IDS) {
    choices[id] = (x % 4) as ChoiceIndex;
    x = Math.floor(x / 4);
  }
  return choices;
}

// 한 리그 전수 감사 → 팀별 우승 (가중치) 집계
// weightOf: 답 하나의 가중치. 조합 가중치 = 8개 답 가중치의 곱.
function auditLeague(
  league: LeagueFilter,
  weightOf: (c: ChoiceIndex) => number,
) {
  const counts: Record<string, number> = {};
  const pool = CLUBS.filter((t) => league === "ALL" || t.league === league);
  pool.forEach((t) => (counts[t.slug] = 0));

  const combos = 4 ** SCALE_IDS.length; // 65536
  let total = 0;
  for (let i = 0; i < combos; i++) {
    const choices = choicesFor(i);
    const w = Object.values(choices).reduce<number>(
      (acc, c) => acc * weightOf(c),
      1,
    );
    const { winner } = matchTeam({ league, choices });
    counts[winner.slug] += w;
    total += w;
  }
  return { counts, total };
}

// 단언: 조건 거짓이면 실패(exit 1)
function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error(`❌ 감사 실패: ${msg}`);
    process.exit(1);
  }
}

// 응답 모델: 균등 vs 중앙편향(가운데 답 1·2 = "약간"을 2배 가중)
const MODELS = [
  { name: "균등", weightOf: () => 1 },
  { name: "중앙편향", weightOf: (c: ChoiceIndex) => (c === 1 || c === 2 ? 2 : 1) },
];

// 실행: 모델 × 리그마다 감사 + 통계 + 단언
for (const model of MODELS) {
  console.log(`\n===== ${model.name} 모델 =====`);
  for (const league of LEAGUES) {
    const { counts, total } = auditLeague(league, model.weightOf);
    const entries = Object.entries(counts)
      .map(([slug, n]) => [slug, (n / total) * 100] as const)
      .sort((a, b) => b[1] - a[1]);
    const pcts = entries.map((e) => e[1]);
    const max = Math.max(...pcts);
    const min = Math.min(...pcts);
    const starved = pcts.filter((p) => p === 0).length;

    console.log(
      `\n[${league}] ${entries.map(([s, p]) => `${s} ${p.toFixed(1)}%`).join("  ")}`,
    );
    console.log(`  최대/최소 ${(max / min).toFixed(2)}배, 굶는 팀 ${starved}`);

    assert(starved === 0, `${model.name}/${league}: 굶는 팀 ${starved}개`);
    assert(
      max / min <= 5,
      `${model.name}/${league}: 최대/최소 ${(max / min).toFixed(2)}배`,
    );
  }
}

console.log("\n✅ 감사 통과 (균등 + 중앙편향)");
