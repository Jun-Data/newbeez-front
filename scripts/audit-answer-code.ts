import { QUESTIONS } from "@/lib/questions";
import {
  ANSWER_CODE_LENGTH,
  encodeAnswerCode,
  decodeAnswerCode,
} from "@/lib/answer-code";
import type { ChoiceIndex } from "@/lib/types";
import type { MatchInput } from "@/lib/scoring";

// ─────────────────────────────────────────────────────────────
// 답코드 계약 — 여기가 URL 규격의 기준이다.
// 이 값과 questions.ts 가 어긋나면 이미 공유된 링크가 다른 결과를
// 가리키게 된다. 바꾸려면 "옛 링크가 깨진다"를 감수하고 함께 고칠 것.
// ─────────────────────────────────────────────────────────────
const EXPECTED_LEAGUES = ["EPL", "ETC", "ALL"] as const;

const EXPECTED_SCALE_IDS = [
  "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9",
] as const;

// 각 성향 문항이 어느 축을 어떤 배점으로 재는가
const EXPECTED_AXIS_SLOT: Record<string, string> = {
  q2: "tactics/principle",
  q3: "resource/principle",
  q4: "organization/principle",
  q5: "goal/principle",
  q6: "tactics/situational",
  q7: "organization/situational",
  q8: "resource/situational",
  q9: "goal/situational",
};

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error(`❌ 답코드 감사 실패: ${msg}`);
    process.exit(1);
  }
}

// ── ① 리그 순서 ───────────────────────────────────────────────
// LEAGUE_CODES 는 Q1 선택지에서 파생된다. 순서가 곧 코드 숫자다.
const actualLeagues = QUESTIONS.flatMap((q) =>
  q.kind === "league" ? q.options.map((o) => o.value) : [],
);
assert(
  actualLeagues.join(",") === EXPECTED_LEAGUES.join(","),
  `Q1 리그 순서가 바뀜\n     기대: ${EXPECTED_LEAGUES.join(",")}\n     실제: ${actualLeagues.join(",")}\n     → 기존 공유 링크의 리그가 다르게 해석된다`,
);
console.log(`  ① 리그 순서 [${actualLeagues.join(", ")}]`);

// ── ② 성향 문항 순서·개수 ──────────────────────────────────────
const actualScaleIds = QUESTIONS.flatMap((q) =>
  q.kind === "scale" ? [q.id] : [],
);
assert(
  actualScaleIds.join(",") === EXPECTED_SCALE_IDS.join(","),
  `성향 문항 순서/개수가 바뀜\n     기대: ${EXPECTED_SCALE_IDS.join(",")}\n     실제: ${actualScaleIds.join(",")}\n     → 답코드 자릿수의 의미가 달라진다`,
);
console.log(`  ② 성향 문항 ${actualScaleIds.length}개 순서 일치`);

// ── ③ 축·배점 ────────────────────────────────────────────────
// 자릿수는 그대로인데 의미만 달라지는 가장 위험한 변경을 잡는다.
for (const q of QUESTIONS) {
  if (q.kind !== "scale") continue;
  const actual = `${q.axis}/${q.slot}`;
  assert(
    actual === EXPECTED_AXIS_SLOT[q.id],
    `${q.id} 의 축·배점이 바뀜 (기대 ${EXPECTED_AXIS_SLOT[q.id]}, 실제 ${actual})\n     → 자릿수는 같은데 그래프만 달라진다. 옛 링크가 조용히 틀려진다`,
  );
}
console.log("  ③ 축·배점 조합 일치");

// ── ④ 코드 길이 ───────────────────────────────────────────────
const expectedLength = 1 + EXPECTED_SCALE_IDS.length;
assert(
  ANSWER_CODE_LENGTH === expectedLength,
  `ANSWER_CODE_LENGTH 가 ${ANSWER_CODE_LENGTH} (기대 ${expectedLength})`,
);
console.log(`  ④ 코드 길이 ${ANSWER_CODE_LENGTH}자리`);

// ── ⑤ 왕복 전수 ───────────────────────────────────────────────
// i(0 ~ 65535)를 4진법으로 쪼개 8문항 답으로
function choicesFor(i: number): MatchInput["choices"] {
  const choices = {} as MatchInput["choices"];
  let x = i;
  for (const id of EXPECTED_SCALE_IDS) {
    choices[id] = (x % 4) as ChoiceIndex;
    x = Math.floor(x / 4);
  }
  return choices;
}

const combos = 4 ** EXPECTED_SCALE_IDS.length; // 65536
let roundTrips = 0;

for (const league of EXPECTED_LEAGUES) {
  for (let i = 0; i < combos; i++) {
    const input: MatchInput = { league, choices: choicesFor(i) };
    const code = encodeAnswerCode(input);

    assert(
      code.length === ANSWER_CODE_LENGTH,
      `encode 결과가 ${code.length}자리 (league=${league}, i=${i}): "${code}"`,
    );

    const back = decodeAnswerCode(code);
    assert(back !== null, `decode 가 null 반환 (code="${code}")`);
    assert(
      back!.league === input.league,
      `리그 불일치 (code="${code}"): ${input.league} → ${back!.league}`,
    );
    for (const id of EXPECTED_SCALE_IDS) {
      assert(
        back!.choices[id] === input.choices[id],
        `${id} 불일치 (code="${code}"): ${input.choices[id]} → ${back!.choices[id]}`,
      );
    }
    roundTrips++;
  }
}
console.log(`  ⑤ 왕복 ${roundTrips.toLocaleString()}건 전부 일치`);

// ── ⑥ 불량 입력은 전부 null ────────────────────────────────────
const BAD_CODES = [
  ["", "빈 문자열"],
  ["0", "너무 짧음"],
  ["12345678", "8자리"],
  ["0123456789", "10자리"],
  ["399999999", "리그 자리가 범위 밖(3)"],
  ["040000000", "성향 답이 범위 밖(4)"],
  ["03210421x", "숫자가 아닌 글자"],
  ["-32104213", "음수 기호"],
  ["0 3210421", "공백"],
  ["０３２１０４２１３", "전각 숫자"],
] as const;

for (const [bad, why] of BAD_CODES) {
  assert(
    decodeAnswerCode(bad) === null,
    `불량 코드가 통과됨 — ${why}: "${bad}"`,
  );
}
console.log(`  ⑥ 불량 입력 ${BAD_CODES.length}종 전부 차단`);

console.log("\n✅ 답코드 감사 통과");
