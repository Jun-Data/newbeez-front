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
    prompt: "반가워요 감독님! 첫 부임지로 어떤 무대에 마음이 끌리세요?",
    options: [
      {
        value: "EPL",
        headline: "대세이자 화제의 중심",
        detail: "가장 많은 이야깃거리와 예측불가능한 승부",
      },
      {
        value: "ETC",
        headline: "전통이자 낭만의 중심",
        detail: "오랜기간 군림해온 자리와 명성",
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
    prompt: "부임 첫 미팅! 감독님이 그리는 우리 팀의 플레이 스타일은?",
    negative: {
      headline: "철벽 수비!",
      detail: "단단하게 지키다 빠르게 역습",
    },
    positive: {
      headline: "화끈한 공격!",
      detail: "먼저 몰아쳐 주도권 쟁취",
    },
  },
  {
    kind: "scale",
    id: "q3",
    axis: "resource",
    slot: "principle",
    prompt: "팀 운영 예산이 생겼어요! 어떻게 사용할까요?",
    negative: {
      headline: "원석 발굴!",
      detail: "유망주로 세상을 놀라게 한다",
    },
    positive: {
      headline: "월드 클래스!",
      detail: "비싸지만 검증된 슈퍼스타 영입",
    },
  },
  {
    kind: "scale",
    id: "q4",
    axis: "organization",
    slot: "principle",
    prompt: "훈련장에서 우리 팀 에이스에게 내릴 지시는?",
    negative: {
      headline: "팀이 먼저!",
      detail: "누구나 팀 시스템에 녹아들도록",
    },
    positive: {
      headline: "너의 무대!",
      detail: "전술에 구애 받지 않고 마음껏 활약하도록",
    },
  },
  {
    kind: "scale",
    id: "q5",
    axis: "goal",
    slot: "principle",
    prompt: "경기 직전, 라커룸 연설! 뭐라고 하시겠어요?",
    negative: {
      headline: "즐기자!",
      detail: "결과는 내가 책임진다. 우리만의 축구를 보여줘",
    },
    positive: {
      headline: "무조건 승리!",
      detail: "수단과 방법을 가리지 말아라",
    },
  },

  {
    kind: "scale",
    id: "q6",
    axis: "tactics",
    slot: "situational",
    prompt: "전반전, 우리 팀이 선제골을 넣었어요! 앞서가는 지금 어떻게 할까요?",
    negative: {
      headline: "걸어 잠근다!",
      detail: "실리적으로 역습을 노리며 승리를 굳힌다",
    },
    positive: {
      headline: "몰아친다!",
      detail: "추가골을 노려 경기를 끝내버린다",
    },
  },
  {
    kind: "scale",
    id: "q7",
    axis: "organization",
    slot: "situational",
    prompt: "시즌 중, 감독님이 가장 먼저 중용하는 선수는?",
    negative: {
      headline: "살림꾼!",
      detail: "조용히 팀을 위해 궂은일을 다하는 선수",
    },
    positive: {
      headline: "해결사!",
      detail: "확실한 한 방으로 경기를 뒤집는 선수",
    },
  },
  {
    kind: "scale",
    id: "q8",
    axis: "resource",
    slot: "situational",
    prompt:
      "겨울 이적시장, 다른 팀이 우리 에이스 영입을 위해 천문학적 이적료를 제안했어요!",
    negative: {
      headline: "판다!",
      detail: "새로운 자금으로 팀 전체를 업그레이드",
    },
    positive: {
      headline: "지킨다!",
      detail: "돈이 얼마든 에이스는 팀에 남아야 해",
    },
  },
  {
    kind: "scale",
    id: "q9",
    axis: "goal",
    slot: "situational",
    prompt: "시즌 종료! 우리 팀의 1년을 요약한 스포츠 1면 헤드라인은?",
    negative: {
      headline: "기적의 동화!",
      detail: "모두의 예상을 뒤엎은 위대한 반란",
    },
    positive: {
      headline: "절대 1강!",
      detail: "상대 팀들을 압도한 리그의 지배자",
    },
  },
] as const satisfies readonly Question[];

// 데이터에서 id만 뽑아 "q1" | ... | "q9" 자동 생성
export type QuestionId = (typeof QUESTIONS)[number]["id"];
