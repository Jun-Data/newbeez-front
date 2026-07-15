# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업. (durable 설계·결정은 `newbeez-back/docs/` 참고)
> **마지막 업데이트: 2026-07-15 — 프론트 아키텍처 확정, 슬라이스 빌드 시작**

## 🎯 지금 어디까지 왔나
- ✅ **퀴즈 설계 확정** — 15팀 좌표·10문항·추천 알고리즘·분포 검증 (`newbeez-back/docs/`)
- ✅ **프론트 F0** — `pnpm dev` 확인. (랜딩 시제품은 "설계 먼저" 위해 되돌림)
- ✅ **프론트 아키텍처 확정** — "하이브리드 트리오": 채점=프론트 순수함수 · 결과=서버렌더 `/result/[team]`(공유 OG) · 백엔드는 F6에 데이터 소유권 이전
- ✅ **baseline 커밋(`85e4dbe`) main 푸시** + `/work`·`/handoff` 커스텀 명령·작업 루프 도입

## 🗺️ 슬라이스 로드맵 (1 슬라이스 = 1 브랜치, `/work`로 진행)
- ⬜ **1. share-metadata** — 바이럴 OG 메타데이터 (`app/layout.tsx`, "정체성 훅" 카피) ← **다음**
- ⬜ **2. quiz-scoring** — `lib/` 타입·팀·문항 데이터 + 유클리드 채점 (콘솔 검증)
- ⬜ **3. quiz-ui** — Zustand 스토어 + 질문 화면(세로 4점척도)·진행바 + 완료→결과 이동
- ⬜ **4. quiz-result** — `/result/[team]` 결과 페이지 + `generateMetadata` (팀별 OG 이미지는 후속)
- 이후 **F6** — 백엔드 API 연동(데이터 소유권 이전)

## 📌 핵심 포인터
- **설계 = `newbeez-back/docs/`** (좌표·문항·알고리즘 = source of truth)
- **바이럴 핵심**: 결과는 서버렌더 URL(`/result/[team]`)이어야 카톡 OG 미리보기가 뜸. 채점 수학은 프론트 순수함수(`lib/scoring.ts`).
- **실행**: 프론트 `pnpm dev`(:3000) · 백엔드 `./gradlew bootRun`(:8080) — 포트 달라 동시 OK
- **버전 주의**: Next 16 (코드 전 `node_modules/next/dist/docs/` 읽기)
- **작업 방식**: `/work`(다음 슬라이스 자동)·`/handoff`. **git은 Claude가 실행**, `pnpm` 등 학습용 명령은 사용자가 직접. explain-first.

---
*`/handoff` (또는 "핸드오프")로 이 파일을 갱신.*
