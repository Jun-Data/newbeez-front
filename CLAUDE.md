@AGENTS.md

> **세션 시작 시 [HANDOFF.md](HANDOFF.md) 먼저 확인** — 진행 상황·다음 할 일.

# Newbeez (프론트엔드)

**해외축구 감독 성향 테스트** — 10문항 퀴즈로 사용자를 15개 축구팀 중 1팀에 매칭 추천하는 바이럴 웹서비스. 개인 학습 프로젝트. 향후 러닝화·키보드 등 카테고리 확장 예정.

## 스택
- **Next.js 16** (App Router) · **React 19** · TypeScript
- **Tailwind CSS v4** · **Zustand 5** (퀴즈 답 상태 관리)
- 패키지 매니저: **pnpm** (npm/yarn 사용 금지)

## 명령어
| 목적 | 명령 |
|---|---|
| 개발 서버 | `pnpm dev` → http://localhost:3000 |
| 빌드 | `pnpm build` |
| 린트 | `pnpm lint` |

## App Router 구조
- `app/page.tsx` = 홈(`/`) · `app/layout.tsx` = 공통 레이아웃
- `app/<이름>/page.tsx` = `/<이름>` 라우트 (예: `app/quiz/page.tsx` → `/quiz`)

## 백엔드 연동
- 별도 레포 **newbeez-back** (Spring Boot, `localhost:8080`). 데이터(팀·문항)는 백엔드가 소유 → 프론트는 **API로 fetch**. (백엔드 완성 전엔 임시 정적 데이터 허용)
- **제품 설계(15팀 좌표·10문항·추천 알고리즘)는 `newbeez-back/docs/` 참고.**

## Git & 작업 방식
- **브랜치** GitHub Flow: `main`은 항상 동작. 기능은 `feat/…` 브랜치→병합, 세팅·잡일은 `main` 직접.
- **커밋** gitmoji + Conventional: `:이모지: type: 요약` (예 `:sparkles: feat:` · `:bug: fix:` · `:wrench: chore:`). `Co-Authored-By` 안 씀.
- **작업 루프** `/work [설명]`: 계획(explain-first·승인 대기)→브랜치·빌드→검증→커밋→`main` 병합→`/handoff`. (상세는 `.claude/commands/work.md`)
- **역할** git(커밋·푸시·브랜치)은 **Claude가** 실행, `pnpm` 등 학습 명령은 **사용자가 직접**.

## 규칙
- 사용자는 **프론트 입문자** — 개념부터 설명(explain-first), 명령은 사용자가 직접 실행.
- 무거운 인프라(인증·배포 자동화)는 명시적 요청 전엔 도입하지 않음.
- Windows + 한글 경로 환경.
