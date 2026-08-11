import type { Team } from "./types";

// 15팀 (설계)데이터
export const CLUBS: readonly Team[] = [
  // EPL (6팀)
  {
    slug: "man-city",
    name: "맨체스터 시티",
    league: "EPL",
    rivalSlug: "man-utd",
    coords: { tactics: 5, resource: 5, organization: -3, goal: 4 },
  },
  {
    slug: "arsenal",
    name: "아스널",
    league: "EPL",
    rivalSlug: "tottenham",
    coords: { tactics: -4, resource: -3, organization: -5, goal: 1 },
  },
  {
    slug: "liverpool",
    name: "리버풀",
    league: "EPL",
    rivalSlug: "man-utd",
    coords: { tactics: 4, resource: -1, organization: -1, goal: 3 },
  },
  {
    slug: "tottenham",
    name: "토트넘 홋스퍼",
    league: "EPL",
    rivalSlug: "arsenal",
    coords: { tactics: 1, resource: 2, organization: 2, goal: -5 },
  },
  {
    slug: "chelsea",
    name: "첼시",
    league: "EPL",
    rivalSlug: "tottenham",
    coords: { tactics: -3, resource: 5, organization: 2, goal: 2 },
  },
  {
    slug: "man-utd",
    name: "맨체스터 유나이티드",
    league: "EPL",
    rivalSlug: "liverpool",
    coords: { tactics: -1, resource: 4, organization: 3, goal: 3 },
  },

  // 그 외 유럽 (9팀)
  {
    slug: "real-madrid",
    name: "레알 마드리드",
    league: "ETC",
    rivalSlug: "barcelona",
    coords: { tactics: 4, resource: 4, organization: 5, goal: 5 },
  },
  {
    slug: "barcelona",
    name: "바르셀로나",
    league: "ETC",
    rivalSlug: "real-madrid",
    coords: { tactics: 5, resource: -3, organization: -5, goal: 4 },
  },
  {
    slug: "atletico",
    name: "아틀레티코 마드리드",
    league: "ETC",
    rivalSlug: "real-madrid",
    coords: { tactics: -5, resource: 2, organization: -4, goal: -3 },
  },
  {
    slug: "bayern",
    name: "바이에른 뮌헨",
    league: "ETC",
    rivalSlug: "dortmund",
    coords: { tactics: 4, resource: 2, organization: -3, goal: 5 },
  },
  {
    slug: "dortmund",
    name: "보루시아 도르트문트",
    league: "ETC",
    rivalSlug: "bayern",
    coords: { tactics: 2, resource: -5, organization: -1, goal: -5 },
  },
  {
    slug: "psg",
    name: "파리 생제르맹",
    league: "ETC",
    rivalSlug: "real-madrid",
    coords: { tactics: 5, resource: 5, organization: 1, goal: 4 },
  },
  {
    slug: "inter",
    name: "인테르 밀란",
    league: "ETC",
    rivalSlug: "ac-milan",
    coords: { tactics: -4, resource: -1, organization: -2, goal: 4 },
  },
  {
    slug: "ac-milan",
    name: "AC밀란",
    league: "ETC",
    rivalSlug: "inter",
    coords: { tactics: -3, resource: -3, organization: 4, goal: 2 },
  },
  {
    slug: "juventus",
    name: "유벤투스",
    league: "ETC",
    rivalSlug: "inter",
    coords: { tactics: -4, resource: 2, organization: -2, goal: 3 },
  },
];
