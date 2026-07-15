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

## Git 워크플로우
- **브랜치 = GitHub Flow**: 항상 동작하는 `main`에서 기능 브랜치(`feat/…`·`fix/…`·`chore/…`, 소문자-하이픈)를 따서 작업 → 병합. 초기 세팅·스캐폴딩은 `main`에 직접. 새 작업 전엔 깨끗한 트리(커밋 or `git stash`).
- **커밋 메시지 = gitmoji + Conventional Commits** 결합: `:이모지: type(scope): 요약` (요약 50자 이내·간결하게, scope 선택). 예) `:sparkles: feat(quiz): 세로 4점척도 질문 화면`
  - 자주 씀: `:sparkles: feat`(기능) · `:bug: fix`(버그) · `:memo: docs`(문서) · `:lipstick: style`(UI/디자인) · `:recycle: refactor`(정리) · `:wrench: chore`(설정·잡일) · `:heavy_plus_sign: chore`(의존성 추가) · `:arrow_up: chore`(의존성 업글) · `:white_check_mark: test`(테스트) · `:tada:`(초기화)
- 커밋 메시지에 **Claude 공동저자(`Co-Authored-By`) 트레일러는 넣지 않음.**

## 규칙
- 사용자는 **프론트 입문자** — 개념부터 설명(explain-first), 명령은 사용자가 직접 실행.
- 무거운 인프라(인증·배포 자동화)는 명시적 요청 전엔 도입하지 않음.
- Windows + 한글 경로 환경.
