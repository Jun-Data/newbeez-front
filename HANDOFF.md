# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업.
> **durable 설계(좌표·문항·알고리즘) = `newbeez-back/docs/` 가 source of truth — 여기에 중복하지 말 것.**
> **마지막 업데이트: 2026-08-05 — S1 채점 코어 완성(감사 통과), 다음 S1.5 또는 S2**
> **현재 브랜치: `feat/quiz-core` (origin 푸시됨) · 마지막 커밋: `4e9f3ec`**

## 🎯 지금 어디까지 왔나
- ✅ **설계 확정** (`newbeez-back/docs/`) — 15팀 좌표·문항·매칭 알고리즘
- ✅ **프론트 아키텍처 확정** — 채점=프론트 순수함수 / 결과=서버렌더 `/result/[slug]?a=<답코드>` / 백엔드는 F6에 데이터 소유권 이전
- ✅ **S1 채점 코어 완성** (6파일, tsc 통과 + 감사 통과, 커밋·푸시 완료)
  - `lib/types.ts` — 공용 타입 (도메인별 정리)
  - `lib/clubs.ts` — 15팀 좌표·리그·라이벌 (colorCode 제거됨)
  - `lib/scoring-config.ts` — 배점표·`AXIS_SCALE`·`COS_BAND`
  - `lib/questions.ts` — **9문항**(Q1 리그 + Q2~Q9 성향) 판별 유니온 + `QuestionId`
  - `lib/scoring.ts` — `matchTeam` (코사인 방향 + 밴드 거리 타이브레이크)
  - `scripts/audit.ts` — 65,536 전수 감사, **`pnpm quiz:audit`** (tsx 설치됨)

## 🗺️ 슬라이스 로드맵 (1 슬라이스 = 1 브랜치, `/work`로 진행)
- ✅ **S1 quiz-core** (완료 · `feat/quiz-core`, `4e9f3ec` 푸시)
  - types · clubs · scoring-config · questions · scoring · audit
  - **DoD 충족**: `pnpm quiz:audit` 통과 — 굶는 팀 0 · EPL 2.4·ETC 2.7·**ALL 4.4배** · **균등+중앙편향 둘 다 통과**
- ⬜ **S1.5 coord-spread** ← 다음 후보 (선택): 좌표 방향 분산으로 **ALL 4.4배 → ~2.25배**. 부호·정체성 보존, 감사 통과까지만
- ⬜ **S2 clubs-data** ← 다음 후보: TheSportsDB 1회성 프리페치 + 배지 15장 + `lib/club-facts.ts`
- ⬜ **S3 landing** — `layout.tsx`(lang=ko·`metadataBase`·출처 푸터) + 랜딩(15팀 그리드) + **조기 배포**
- ⬜ **S4 quiz-store** — Zustand + `/quiz` 셸 + Q1
- ⬜ **S5 quiz-scale** — `<BipolarScale>` (Q2~Q9)
- ⬜ **S6 quiz-flow** — 진행바·뒤로·자동진행·완료 이동 (색 문항 없음)
- ⬜ **S7 result** — 한국어 카피 15팀 + `/result/[slug]` + `answer-code`(8답) + 성향 그래프
- ⬜ **S9 share · S10 og-image · S11 clubs-page**
- 이후 **F6** — 백엔드 API 연동(데이터 소유권 이전)

## 📌 핵심 포인터
- **설계 source = `newbeez-back/docs/`** (좌표·문항·알고리즘)
- **매칭 = 코사인(방향)** — 근소동점 밴드(`COS_BAND`)는 **유클리드 거리**로 가름. (~~Q10 색 타이브레이크는 제거됨~~)
- **Q10 색상 문항·`colorCode`·`Color` 제거됨** — 매칭에 미사용이고 마지막 질문 색 불일치(78.7%)로 신뢰 저해 → 삭제. 팀 색이 결과 카드에 필요하면 S7 프레젠테이션 층에서 다시 추가
- **결과 = 서버렌더 `/result/[slug]?a=<8자리 답코드>`** — Q2~Q9 답 인코딩, 본인·친구 모두 URL만으로 그래프 렌더
- **데이터 3층**: `lib/clubs.ts`(좌표·클라) + `data/clubs.source.json`(API·S2) + `lib/club-copy.ts`(카피·서버)
- **실행**: 프론트 `pnpm dev`(:3000) · 감사 `pnpm quiz:audit` · 백엔드 `./gradlew bootRun`(:8080)
- **버전 주의**: Next 16 (코드 전 `node_modules/next/dist/docs/` 읽기)
- **작업 방식**: `/work`·`/handoff` · **git은 Claude 실행**, `pnpm`은 사용자 직접 · **explain-first(학습, 코드는 사용자 타이핑 / 단 테스트·도구 스크립트는 Claude가 직접 수정)**

---
*`/handoff` (또는 "핸드오프")로 이 파일을 갱신.*
