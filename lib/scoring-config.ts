import type { ItemSlot } from "./types";

// 배점 표 - 축당 두 문항의 값 집합 (상황 문항이 더 무겁게)
export const ITEM_VALUES: Record<
  ItemSlot,
  readonly [number, number, number, number]
> = {
  principle: [-3, -1.5, 1.5, 3], // Q2 ~ Q5 철학(가볍게)
  situational: [-5, -2.5, 2.5, 5], // Q6 ~ Q9 실전(무겁게)
};

// 축 점수 = 두 문항 평균 * AXIS_SCALE(범위 ±5 복원)
export const AXIS_SCALE = 1.25;

// 근소 동점 밴드 (코사인 유사도 단위) - 이 안이면 유클리드 거리로 가름
export const COS_BAND = 0.02;
