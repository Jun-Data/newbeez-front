// 퀴즈·팀 공용 타입 (데이터의 모양 약속)
export type League = "EPL" | "ETC"; // 팀이 실제 속한 리그
export type LeagueFilter = League | "ALL"; // Q1 에서 사용자가 고르는 리그 필터 (ALL = 전체 15팀)
export type Color = "빨강" | "파랑" | "노랑" | "검정" | "흰색"; // Q10 유니폼 색 - 동점 가르기용

// 4개 성향 축
export const AXES = ["tactics", "resource", "organization", "goal"] as const;
export type Axis = (typeof AXES)[number];

// 답변 = 4개 선택지 중 위치
export type ChoiceIndex = 0 | 1 | 2 | 3;

// 축당 두 문항 중 어느 쪽인가 (다른 배점)
export type ItemSlot = "principle" | "situational";

// 4축 점수 묶음 (형태 : {tactics: 1, ...})
export type AxisVector = Record<Axis, number>;

// 팀 하나의 모양
export interface Team {
  readonly slug: string; // URL 식별자(/result/[slug])
  readonly name: string; // 화면 표시명 (한글)
  readonly league: League;
  readonly colorCode: Color;
  readonly rivalSlug: string; // 고정 라이벌(상극팀)
  readonly coords: AxisVector;
}
