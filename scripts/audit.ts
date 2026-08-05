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

// 한 리그 전수 감사 → 팀별 우승 횟수
function auditLeague(league: LeagueFilter) {
  const counts: Record<string, number> = {};
  const pool = CLUBS.filter((t) => league === "ALL" || t.league === league);
  pool.forEach((t) => (counts[t.slug] = 0));

  const total = 4 ** SCALE_IDS.length; // 65536
  for (let i = 0; i < total; i++) {
    const { winner } = matchTeam({ league, choices: choicesFor(i) });
    counts[winner.slug] += 1;
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

// 실행: 리그마다 감사 + 통계 + 단언
for (const league of LEAGUES) {
  const { counts, total } = auditLeague(league);
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

  assert(starved === 0, `${league}: 굶는 팀 ${starved}개`);
  assert(max / min <= 5, `${league}: 최대/최소 ${(max / min).toFixed(2)}배`);
}

console.log("\n✅ 감사 통과");
