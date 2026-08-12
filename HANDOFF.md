# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업.
> **durable 설계(좌표·문항·알고리즘) = `newbeez-back/docs/` 가 source of truth — 여기에 중복하지 말 것.**
> **시스템 설계(라우팅·렌더링·스키마·API·MVP 경계) = [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — 2026-08-11 신설, 아래 요약보다 우선.
> **마지막 업데이트: 2026-08-12 — 답코드 모듈 완성(감사 통과). 다음은 퀴즈 진행 화면**
> **브랜치: `main` 하나뿐 (`a15ba7a`, 워킹트리 깨끗) · feat/* 전부 병합·삭제 · ⚠️ origin 푸시 대기**

## 🎯 지금 어디까지 왔나
- ✅ **설계 확정** (`newbeez-back/docs/`) — 15팀 좌표·문항·매칭 알고리즘
- ✅ **시스템 설계 확정** (`docs/ARCHITECTURE.md`) — 채점=프론트 순수함수 / 결과=ISR `/football/result/[slug]?a=<9자리>` / 백엔드=표시 데이터·참여 로그·댓글 / **MVP 경계 확정**
- ✅ **인물 큐레이션** (`docs/club-people-2026-08.md`) — 15팀 감독·스타·레전드 45건, 웹조사 + 적대적 검증
- ✅ **한국어 표기 통일** — 팀명 정식 표기(`lib/clubs.ts` 7곳 수정), 인명 7건 확정
- ✅ **폰트·테마 정리** — Pretendard 서브셋 400/600/700(806KB) · Geist 제거 · 다크모드 제거(라이트 고정)
- ✅ **척도 UI 확정** — 세로축 4점 + 전점 라벨 (ARCHITECTURE §8.1). 디자인 시안 요청 단계
- ✅ **호스팅 조사 완료** — 1순위 OCI Always Free 서울. **결정은 보류**(MVP에 불필요, 단 A1 확보가 복불복이라 미리 시도 권장)
- ✅ **답코드 모듈** (`lib/answer-code.ts`) — 답 ⇄ 9자리 문자열. 왕복 196,608건 + 계약 가드 3종 감사 통과
- ✅ **문서 분리** — `ARCHITECTURE.md`(423줄, 지금 만드는 것) / `FUTURE.md`(159줄, MVP 이후)
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
- ⬜ **S1.5 coord-spread** ← 선택: 좌표 방향 분산으로 **ALL 4.4배 → ~2.25배**. 부호·정체성 보존, 감사 통과까지만
- ✅ **S2 quiz-intro** (완료 · `47952a6` → main 병합): `/football/quiz` 인트로 + 히어로 이미지
- ✅ **S2.5 answer-code** (완료 · `587b4d2`): `lib/answer-code.ts` + `scripts/audit-answer-code.ts`
  - 결과 화면에서 `decodeAnswerCode` 가 `null` 이면 **`matchTeam` 을 부르지 말 것** (ARCHITECTURE §3.2)
- ⬜ **S3 clubs-data** — TheSportsDB 1회성 프리페치 → `data/clubs.source.json` + **배지 15장 다운로드**(URL 링크 금지) + 팀 표시 데이터
- ⬜ **S4 landing** — `/football` 얇은 안내(히어로 + 퀴즈 버튼) + 출처 푸터 + **조기 배포**. ~~15팀 그리드~~ 제외 결정
- ⬜ **S5 quiz-store** ← **다음 후보 A**: Zustand 스토어 + `/football/quiz/play` 셸
  - 인트로가 이 경로로 링크 중인데 **아직 404**
  - 스토어는 `MatchInput` 모양 그대로 담으면 `matchTeam`·`encodeAnswerCode` 에 변환 없이 넘어간다
  - **스토어·라우트는 디자인 무관**하나 실제 화면은 시안 필요
- ⬜ **S6 quiz-scale** — `<BipolarScale>` **세로축 4점 + 전점 라벨** (ARCHITECTURE §8.1). **디자인 시안 대기 중**
- ⬜ **S7 quiz-flow** — 진행바·뒤로·자동진행·완료 이동
- ⬜ **S8 result** — 한국어 카피 15팀 + `/football/result/[slug]` + 답코드 **9자리**(리그1+성향8) + 4축 다이아몬드
  - ⚠️ **파싱 검증 필수** — `matchTeam` 호출 전에 막지 않으면 조작 URL로 페이지가 죽는다 (ARCHITECTURE §3)
- ⬜ **S9 share** — OG 태그 → 카카오 SDK(도메인 확정 후) · **S10 og-image**(동적)
- ⬜ **F6 백엔드** — 최소(`POST /participants`)부터. 호스팅 1순위 **OCI Always Free 서울**
- ⬜ 이후 — 익명 댓글(결과별) → `/football` 허브 오픈(꿀팁·팀 순위) → 카카오 로그인 + 입문팀 UGC

> **MVP 경계는 `docs/ARCHITECTURE.md` §9가 기준.** 위 슬라이스는 그 순서를 잘게 쪼갠 것.

## 📌 핵심 포인터
- **설계 source = `newbeez-back/docs/`** (좌표·문항·알고리즘)
- **매칭 = 코사인(방향)** — 근소동점 밴드(`COS_BAND`)는 **유클리드 거리**로 가름. (~~Q10 색 타이브레이크는 제거됨~~)
- **Q10 색상 문항·`colorCode`·`Color` 제거됨** — 매칭에 미사용이고 마지막 질문 색 불일치(78.7%)로 신뢰 저해 → 삭제. 팀 색이 결과 카드에 필요하면 S7 프레젠테이션 층에서 다시 추가
- **결과 = ISR `/football/result/[slug]?a=<9자리 답코드>`** — Q1 리그 1자리 + Q2~Q9 성향 8자리. Q1이 있어야 `matchTeam` 재실행으로 **slug 대조 검증**이 가능 (2026-08-11 변경, 상세는 ARCHITECTURE §3)
- **데이터 3층**: `lib/clubs.ts`(좌표·**표시명 원본**·프론트) + `data/clubs.source.json`(오픈API 프리페치·S3) + **`team_results` DB**(배지·경기장·인물·카피)
  - ~~`lib/club-facts.ts` / `lib/club-copy.ts`~~ — 두 이름이 혼용됐으나 **표시 데이터는 DB로 확정**(ARCHITECTURE §5.1)
- **실행**: 프론트 `pnpm dev`(:3000) · 감사 `pnpm quiz:audit` · 백엔드 `./gradlew bootRun`(:8080)
- **버전 주의**: Next 16 (코드 전 `node_modules/next/dist/docs/` 읽기)
- **작업 방식**: `/work`·`/handoff` · **git은 Claude 실행**, `pnpm`은 사용자 직접 · **explain-first(학습, 코드는 사용자 타이핑 / 단 테스트·도구 스크립트는 Claude가 직접 수정)**

---
*`/handoff` (또는 "핸드오프")로 이 파일을 갱신.*
