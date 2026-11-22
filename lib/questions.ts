import type { Axis, ItemSlot, LeagueFilter } from "./types";

// 성향 문항의 한쪽 극
export interface Pole {
  readonly headline: string; // 극단 버튼 큰 글씨
  readonly detail: string; // 극단 버튼 부연
}

// 리그 필터(Q1) 선택지
export interface LeagueOption {
  readonly value: LeagueFilter;
  readonly headline: string;
  readonly detail: string;
}

// 판별 유니온 - kind 태그로 3종 문항을 구분
export type Question =
  | {
      readonly kind: "league";
      readonly id: string;
      readonly prompt: string;
      readonly options: readonly LeagueOption[];
    }
  | {
      readonly kind: "scale";
      readonly id: string;
      readonly prompt: string;
      readonly axis: Axis;
      readonly slot: ItemSlot;
      readonly negative: Pole;
      readonly positive: Pole;
    };

export const QUESTIONS = [
  {
    kind: "league",
    id: "q1",
    prompt: "반가워요 감독님!\n첫 부임지로 어떤 무대에 마음이 끌리세요?",
    options: [
      {
        value: "EPL",
        headline: "대세이자 화제의 중심",
        detail: "가장 많은 이야깃거리, 예측불가능한 승부",
      },
      {
        value: "ETC",
        headline: "전통이자 낭만의 중심",
        detail: "오랜 세월 지켜 온 자리와 명성",
      },
      {
        value: "ALL",
        headline: "잘 모르겠어요",
        detail: "나와 맞는 팀이라면 어디든",
      },
    ],
  },
  {
    kind: "scale",
    id: "q2",
    axis: "tactics",
    slot: "principle",
    prompt: "취임 후 기자회견,\n기자들에게 밝힐 우리 팀의 축구는?",
    negative: {
      headline: "철벽 수비",
      detail: "단단하게 지키고 빠른 역습으로 끝낸다",
    },
    positive: {
      headline: "화끈한 공격",
      detail: "공을 쥐고 쉴 새 없이 몰아친다",
    },
  },
  {
    kind: "scale",
    id: "q3",
    axis: "resource",
    slot: "principle",
    prompt: "이적 예산이 생겼어요!\n어떻게 사용할까요?",
    negative: {
      headline: "유망주 3명",
      detail: "몇 년 뒤 터질 재능에 투자",
    },
    positive: {
      headline: "슈퍼스타 1명",
      detail: "지금 검증된 실력에 투자",
    },
  },
  {
    kind: "scale",
    id: "q4",
    axis: "organization",
    slot: "principle",
    prompt: "훈련 중,\n팀 에이스에게 내릴 지시는?",
    negative: {
      headline: "팀이 먼저",
      detail: "누구든 시스템 안에서 움직이도록",
    },
    positive: {
      headline: "너의 무대",
      detail: "전술은 잊고 마음껏 뛰도록",
    },
  },
  {
    kind: "scale",
    id: "q5",
    axis: "goal",
    slot: "principle",
    prompt: "경기 직전 라커룸 연설,\n선수들에게 뭐라고 하시겠어요?",
    negative: {
      headline: "오늘을 즐겨",
      detail: "결과는 내가 책임진다. 우리 축구를 보여줘",
    },
    positive: {
      headline: "무조건 승리",
      detail: "이기는 축구가 좋은 축구다. 반드시 이겨",
    },
  },

  {
    kind: "scale",
    id: "q6",
    axis: "tactics",
    slot: "situational",
    prompt: "우리 팀이 선제골을 넣었어요!\n선수들에게 내릴 지시는?",
    negative: {
      headline: "걸어 잠근다",
      detail: "실리적으로 역습을 노리며 승리를 굳힌다",
    },
    positive: {
      headline: "몰아친다",
      detail: "추가골을 노려 경기를 끝내버린다",
    },
  },
  {
    kind: "scale",
    id: "q7",
    axis: "organization",
    slot: "situational",
    prompt: "다음 경기 선발 명단,\n가장 먼저 이름을 적는 선수는?",
    negative: {
      headline: "살림꾼",
      detail: "조용히 팀을 위해 궂은일을 다하는 선수",
    },
    positive: {
      headline: "해결사",
      detail: "확실한 한 방으로 경기를 뒤집는 선수",
    },
  },
  {
    kind: "scale",
    id: "q8",
    axis: "resource",
    slot: "situational",
    prompt: "겨울 이적시장,\n에이스를 노리는 천문학적 제안이 왔어요",
    negative: {
      headline: "보낸다",
      detail: "새 자금으로 팀 전체를 업그레이드",
    },
    positive: {
      headline: "지킨다",
      detail: "돈이 얼마든 에이스는 남아야 한다",
    },
  },
  {
    kind: "scale",
    id: "q9",
    axis: "goal",
    slot: "situational",
    prompt: "시즌 종료!\n우리 팀의 1년을 담은 1면 헤드라인은?",
    negative: {
      headline: "기적의 동화",
      detail: "모두의 예상을 뒤엎은 위대한 반란",
    },
    positive: {
      headline: "절대 1강",
      detail: "상대 팀들을 압도한 리그의 지배자",
    },
  },
] as const satisfies readonly Question[];

// 데이터에서 id만 뽑아 "q1" | ... | "q9" 자동 생성
export type QuestionId = (typeof QUESTIONS)[number]["id"];
