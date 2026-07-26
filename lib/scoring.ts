import { AXES } from "./types";
import type {
  Axis,
  AxisVector,
  ChoiceIndex,
  Color,
  LeagueFilter,
  Team,
} from "./types";
import { CLUBS } from "./clubs";
import { QUESTIONS } from "./questions";
import { ITEM_VALUES, AXIS_SCALE, COS_BAND } from "./scoring-config";

// 성향 문항 (q2 ~q9)의 id만 뽑기 - kind: "scale" 갈래만 걸러 id 추출
type ScaleId = Extract<(typeof QUESTIONS)[number], { kind: "scale" }>["id"];

// 선택 요약
export interface MatchInput {
  readonly league: LeagueFilter; // Q1 리그 필터
  readonly choices: Record<ScaleId, ChoiceIndex>; // Q2 ~ Q9 선택 인덱스
  readonly color: Color; // Q10 색상
}

// 추천 결과
export interface MatchResult {
  readonly userAxes: AxisVector; // 4축 점수 (그래프용)
  readonly winner: Team; // 추천 팀
  readonly rivalSlug: string; // 상극 팀
}

// 답변 8개 -> 4축 점수 벡터
export function scoreAxes(choices: Record<ScaleId, ChoiceIndex>): AxisVector {
  const sum: AxisVector = { tactics: 0, resource: 0, organization: 0, goal: 0 };
  const count: AxisVector = {
    tactics: 0,
    resource: 0,
    organization: 0,
    goal: 0,
  };

  for (const q of QUESTIONS) {
    if (q.kind !== "scale") continue; // 성향 문항만
    sum[q.axis] += ITEM_VALUES[q.slot][choices[q.id]];
    count[q.axis] += 1;
  }

  return {
    tactics: (sum.tactics / count.tactics) * AXIS_SCALE,
    resource: (sum.resource / count.resource) * AXIS_SCALE,
    organization: (sum.organization / count.organization) * AXIS_SCALE,
    goal: (sum.goal / count.goal) * AXIS_SCALE,
  };
}

// 내적: 두 벡터를 축마다 곱해서 합
function dot(a: AxisVector, b: AxisVector): number {
  return AXES.reduce((s, axis) => s + a[axis] * b[axis], 0);
}

// 벡터의 길이 (크기)
function norm(a: AxisVector): number {
  return Math.sqrt(dot(a, a));
}

// 방향 유사도 (코사인 각도)
function cosine(a: AxisVector, b: AxisVector): number {
  const denom = norm(a) * norm(b);
  return denom === 0 ? 0 : dot(a, b) / denom;
}

// euclidean (두 점 사이 거리)
function euclidean(a: AxisVector, b: AxisVector): number {
  return Math.sqrt(AXES.reduce((s, axis) => s + (a[axis] - b[axis]) ** 2, 0));
}
