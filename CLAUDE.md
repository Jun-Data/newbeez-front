@AGENTS.md

> **세션 시작 시 [HANDOFF.md](HANDOFF.md) 먼저 확인** — 진행 상황·다음 할 일.

# Newbeez (프론트엔드)

**사용자 성향 팀 추천 테스트** — 9문항에 답하면 **자신과 가장 닮은 축구팀**을 추천해주는 바이럴 웹서비스(MBTI식 정체성 카드). 개인 학습 프로젝트. 향후 러닝화·키보드 등 카테고리 확장 예정.

- **컨셉**: 사용자가 _감독으로 팀에 입단해_ 문항에 답하는 연출. 감독은 **가벼운 스킨**이고 측정 대상이 아님 — 재는 것은 **사용자 본인의 성향**, 내주는 것은 **닮은 팀**.
- 따라서 결과 카피의 주어는 "당신은 이런 감독입니다"가 아니라 **"당신과 가장 닮은 팀은 ○○입니다"**.

## 스택

- **Next.js 16** (App Router) · **React 19** · TypeScript
- **Tailwind CSS v4** · **Zustand 5** (퀴즈 답 상태 관리)
- 패키지 매니저: **pnpm** (npm/yarn 사용 금지)

## 명령어

| 목적      | 명령                               |
| --------- | ---------------------------------- |
| 개발 서버 | `pnpm dev` → http://localhost:3000 |
| 빌드      | `pnpm build`                       |
| 린트      | `pnpm lint`                        |

## App Router 구조

- `app/page.tsx` = 홈(`/`) · `app/layout.tsx` = 공통 레이아웃
- `app/<이름>/page.tsx` = `/<이름>` 라우트 (예: `app/quiz/page.tsx` → `/quiz`)

## 역할 분담 (핵심)

- **계산은 프론트, 표시 데이터는 백엔드.** 답을 백엔드로 보내 결과를 받아오는 구조가 **아님**.
  - 문항·배점·팀 좌표·채점 로직 → 프론트 `lib/` (**이미 완성·전수검증됨. 재작성 금지**)
  - 팀 표시 정보(배지·경기장·감독·카피)·참여자 수·댓글 → 백엔드 DB
  - 두 층을 잇는 계약 = **`slug`**
- 별도 레포 **newbeez-back** (Spring Boot, `localhost:8080`).
- **시스템 설계(라우팅·렌더링·스키마·API)는 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — 지금 만드는 것만. MVP 이후는 [docs/FUTURE.md](docs/FUTURE.md).
- **제품 설계(15팀 좌표·9문항·추천 알고리즘)는 `newbeez-back/docs/` 참고.**

## Git & 작업 방식

- **브랜치** GitHub Flow: `main`은 항상 동작. 기능은 `feat/…` 브랜치→병합, 세팅·잡일은 `main` 직접.
- **커밋** gitmoji + Conventional: `:이모지: type: 요약` (예 `:sparkles: feat:` · `:bug: fix:` · `:wrench: chore:`). `Co-Authored-By` 안 씀.
- **작업 루프** `/work [설명]`: 계획(explain-first·승인 대기)→브랜치·빌드→검증→커밋→`main` 병합→`/handoff`. (상세는 `.claude/commands/work.md`)
- **역할** git(커밋·푸시·브랜치)은 **Claude가** 실행, `pnpm` 등 학습 명령은 **사용자가 직접**.

## 규칙

- 사용자는 **프론트 입문자** — 개념부터 설명(explain-first), 명령은 사용자가 직접 실행.
- 무거운 인프라(인증·배포 자동화)는 명시적 요청 전엔 도입하지 않음.
- Windows + 한글 경로 환경.
