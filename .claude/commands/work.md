---
description: 로드맵 다음 슬라이스를 브랜치에서 계획→빌드→검증→커밋→병합
argument-hint: [작업 설명 (생략 시 HANDOFF의 다음 슬라이스)]
---
작업 대상: $ARGUMENTS
(비어 있으면 HANDOFF.md "슬라이스 로드맵"의 **다음 미완 슬라이스**를 선택)

## 루프
1. **계획(explain-first)** — 슬라이스 + 제안 브랜치명(`feat/<slug>`, Claude가 자동 생성) + 파일별 무엇을·왜 → 코드 전 **사용자 승인 대기**
2. **브랜치 & 빌드** — 승인 후 브랜치 생성·구현 (Next 관련이면 `node_modules/next/dist/docs/` 먼저)
3. **검증** — 콘솔 / `pnpm build`·`pnpm lint` 후 결과 공유
4. **커밋** — CLAUDE.md 커밋 컨벤션 (Claude가 실행, 사용자는 리뷰)
5. **병합** — 검증 통과 시 `main` 병합 + 브랜치 삭제
6. **마무리** — `/handoff`로 HANDOFF 갱신

- **브랜치명은 사용자에게 묻지 않고** 작업 내용에서 Claude가 짓는다.
- git은 Claude가 실행, `pnpm` 등 학습용 명령은 사용자가 직접 실행하도록 안내.
