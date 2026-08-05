# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업.
> **durable 설계(좌표·문항·알고리즘) = `newbeez-back/docs/` 가 source of truth — 여기에 중복하지 말 것.**
> **마지막 업데이트: 2026-07-24 — S1 데이터·타입 층 완료, 채점 로직 착수 예정**
> **현재 브랜치: `feat/quiz-core` · 마지막 커밋: `56139e8`**

## 🎯 지금 어디까지 왔나
- ✅ **설계 확정** (`newbeez-back/docs/`) — 15팀 좌표·10문항·매칭 알고리즘
- ✅ **프론트 아키텍처 확정** — 채점=프론트 순수함수 / 결과=서버렌더 `/result/[slug]?a=<답코드>`(공유 OG) / 백엔드는 F6에 데이터 소유권 이전
- ✅ **S1 데이터·타입 층 (4파일, 전부 `tsc` 통과 후 커밋)**
  - `lib/types.ts` — 공용 타입 (`Axis`·`Team`·`Question` 재료 등)
  - `lib/clubs.ts` — 15팀 좌표·리그·색·라이벌
  - `lib/scoring-config.ts` — 배점표·`AXIS_SCALE`·`COS_BAND`
  - `lib/questions.ts` — 10문항 판별 유니온 + `QuestionId` 유도

## 🗺️ 슬라이스 로드맵 (1 슬라이스 = 1 브랜치, `/work`로 진행)
- 🔄 **S1 quiz-core** (진행 중 · `feat/quiz-core`)
  - ✅ types · clubs · scoring-config · questions
  - ⬜ `lib/scoring.ts` — **코사인** 채점 함수 ← **바로 다음**
  - ⬜ `scripts/audit.ts` — 65,536 전수 감사 (선행: `pnpm add -D tsx` + `package.json`에 `quiz:audit` 스크립트)
  - **DoD**: `pnpm quiz:audit` 통과 — 굶는 팀 0 · 최대/최소 5배 이하 · **중앙편향 모델에서도 통과**
- ⬜ **S1.5 coord-spread** — 좌표 방향 분산(감사 통과까지, 부호·정체성 보존)
- ⬜ **S2 clubs-data** — TheSportsDB 1회성 프리페치 + 배지 15장 + `lib/club-facts.ts`
- ⬜ **S3 landing** — `layout.tsx`(lang=ko·`metadataBase`·출처 푸터) + 랜딩(15팀 그리드) + **조기 배포**
- ⬜ **S4 quiz-store** — Zustand + `/quiz` 셸 + Q1
- ⬜ **S5 quiz-scale** — `<BipolarScale>` (Q2~Q9)
- ⬜ **S6 quiz-flow** — 진행바·뒤로·자동진행·Q10·완료 이동
- ⬜ **S7 result** — 한국어 카피 15팀 + `/result/[slug]` + `answer-code` + 성향 그래프
- ⬜ **S9 share · S10 og-image · S11 clubs-page**
- 이후 **F6** — 백엔드 API 연동(데이터 소유권 이전)

## 📌 핵심 포인터
- **설계 source = `newbeez-back/docs/`** (좌표·문항·알고리즘)
- **매칭 = 코사인(방향)** + 근소동점은 색(Q10)·유클리드 거리로 가름 (~~유클리드 단독 아님~~)
- **결과 = 서버렌더 `/result/[slug]?a=<8자리 답코드>`** — 본인·친구 모두 URL만으로 그래프 렌더, 카톡 OG는 slug만 봄
- **데이터 3층**: `lib/clubs.ts`(좌표·클라) + `data/clubs.source.json`(API·S2) + `lib/club-copy.ts`(카피·서버)
- **실행**: 프론트 `pnpm dev`(:3000) · 백엔드 `./gradlew bootRun`(:8080) — 포트 달라 동시 OK
- **버전 주의**: Next 16 (코드 전 `node_modules/next/dist/docs/` 읽기)
- **작업 방식**: `/work`·`/handoff` · **git은 Claude 실행**, `pnpm`은 사용자 직접 · **explain-first(학습 목적, 코드는 사용자가 타이핑)**

---
*`/handoff` (또는 "핸드오프")로 이 파일을 갱신.*
