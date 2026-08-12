# Newbeez — 입문의 정석

뭘 골라야 할지 막막한 뉴비를 위한 **취미 입문 가이드**. 첫 카테고리는 **해외축구**입니다.

9문항에 답하면 **자신과 가장 닮은 축구팀**을 추천해줍니다. 사용자가 *감독으로 팀에 입단해* 답하는 연출을 쓰지만, 재는 것은 **사용자 본인의 성향**이고 내주는 것은 **닮은 팀**입니다 (MBTI식 정체성 카드).

> 개인 학습 프로젝트입니다. 향후 러닝·카메라·등산 등으로 카테고리를 확장할 예정입니다.

## 스택

| | |
|---|---|
| 프레임워크 | **Next.js 16** (App Router) · React 19 · TypeScript |
| 스타일 | **Tailwind CSS v4** |
| 상태 | **Zustand 5** (퀴즈 답) |
| 패키지 매니저 | **pnpm** — npm·yarn 사용 금지 |
| 백엔드 | 별도 레포 [newbeez-back](https://github.com/Jun-Data/newbeez-back) (Spring Boot · MySQL) |

## 실행

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | ESLint |
| `pnpm quiz:audit` | **채점 엔진 전수 감사** — 65,536가지 답 조합을 모두 돌려 팀별 추천 분포를 검사 |

## 구조

```
app/                      App Router (라우트 = 폴더)
  football/               해외축구 카테고리
    quiz/                 테스트 인트로 → 진행 → 결과
lib/                      채점 코어 (백엔드 없이 동작)
  types.ts                공용 타입 · 4개 성향축
  clubs.ts                15팀 좌표 · 리그 · 라이벌
  questions.ts            9문항 (Q1 리그 필터 + Q2~Q9 성향)
  scoring-config.ts       배점표 · 튜닝 상수
  scoring.ts              matchTeam — 코사인 방향 + 밴드 내 거리 타이브레이크
scripts/audit.ts          전수 감사
docs/                     설계 문서
```

**채점은 전부 프론트엔드에서 돕니다.** 마지막 문항을 누른 순간 네트워크 왕복 없이 결과가 나오고, 답은 URL 쿼리(`?a=...`)에 담겨 공유 링크만으로 그래프가 재현됩니다. 백엔드는 팀 표시 정보와 커뮤니티 기능을 맡습니다.

## 문서

| 문서 | 내용 |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | **시스템 설계** — 라우팅·렌더링 전략·DB 스키마·API·UI 방침 |
| [docs/FUTURE.md](docs/FUTURE.md) | MVP 이후 — 댓글·입문 허브·UGC·인증·백엔드 호스팅 |
| [docs/club-people-2026-08.md](docs/club-people-2026-08.md) | 15팀 감독·스타·레전드 큐레이션 (검증 이력 포함) |
| [HANDOFF.md](HANDOFF.md) | 진행 상황과 다음 할 일 |
| [CLAUDE.md](CLAUDE.md) | 작업 규칙 |

제품 설계(15팀 좌표·문항 설계·매칭 알고리즘)의 원본은 백엔드 레포의 `docs/`에 있습니다.
