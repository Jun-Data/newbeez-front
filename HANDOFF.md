# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업.
> **durable 설계(좌표·문항·알고리즘) = `newbeez-back/docs/` 가 source of truth — 여기에 중복하지 말 것.**
> **시스템 설계(라우팅·렌더링·스키마·API·MVP 경계) = [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — 2026-08-11 신설, 아래 요약보다 우선.
> **마지막 업데이트: 2026-08-25 — S5 진행 중. `/football/quiz/play` 404 해소·9문항 동작. 남은 건 완료 패널 하나**
> **브랜치: `feat/quiz-store` (`9f24cb6`, 워킹트리 깨끗, origin 푸시됨, **main 미병합**) · `main`은 `8945d9e`**

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
- ✅ **인트로 완성** (`/football/quiz`) — OG·헤더·CTA·**공유 3버튼**·참여자 수 자리. 남은 건 **배포 후 카카오 실검증**뿐. ~~CTA 404~~ **해소됨(S5)**
- 🔨 **S5 진행 화면 동작** (`/football/quiz/play`) — 스토어·라우트·9문항 클릭 완성. **완료 패널만 남음**
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
- ✅ **S2.7 intro-og** (완료 · `bafe409`): OG 이미지(1200×634·138KB)+alt · 로고 헤더(#f2fafe) · CTA 368×72(방구석연구소 실측과 동일) · 히어로 4px 크롭(#b0cd2a 이음매) · sr-only h1 · 서비스명 "팀 성향 테스트" 통일
- ✅ **S2.8 intro-social** (완료 · `7b51002` 병합): 인트로 공유 3버튼 + 참여자 수 자리
  - `components/ShareButtons.tsx` — 카카오·X·링크복사 56px 원형, 순서는 레퍼런스 실측(시작하기 → 참여자수 → 공유). **공용 `components/`에 둔 이유는 결과 화면에서도 쓰기 때문**(ARCHITECTURE §4.2)
  - 링크 복사 = `navigator.clipboard` + **2초 토스트**(모달 아님 — 푸망도 `copied_toast`, 방구석연구소만 모달) · X = `URLSearchParams` + 팝업 550×420 + `noopener` · 카카오 = `next/script` lazyOnload + SRI + `Share.sendScrap({requestUrl})`
  - **키 없으면 카카오 버튼·SDK를 아예 렌더 안 함** — 저장소를 받은 사람이 `.env.local` 없이 실행해도 화면 정상
  - `app/football/quiz/_components/ParticipantCount.tsx` — **인트로 전용이라 라우트에 콜로케이션**. 지금은 `return null`이고 구현 규칙은 주석에 보존(F6에서 채움)
  - ⚠️ **배포 후 실측할 것**: 안드로이드 **카톡 인앱 브라우저(WebView) 일부 기기**에서 `navigator.clipboard`가 막힐 수 있음(호스트 앱이 `clipboard-write` 권한을 안 열면 `NotAllowedError`). 안드로이드 크롬은 정상이고, 카카오·X 버튼은 무관 → 증상은 **"링크 복사 버튼만 무반응"**
    - 지금은 localhost라 **재현 자체가 불가**. HTTPS 배포 후 본인 폰 카톡에서 눌러 10초면 판정
    - 실패가 확인되면 그때 `document.execCommand("copy")` 폴백 추가(deprecated이지만 인앱에서 동작). **확인 전에 미리 넣지 말 것** — 검증할 환경이 없어 동작을 보장할 수 없음
  - 컴포넌트 배치 규칙 확정: **한 라우트만 쓰면 그 라우트 `_components/`, 두 곳 이상이면 최상위 `components/`**. Next 문서는 이 주제에 unopinionated
- ⬜ **S3 clubs-data** — TheSportsDB 1회성 프리페치 → `data/clubs.source.json` + **배지 15장 다운로드**(URL 링크 금지) + 팀 표시 데이터
- ⬜ **S4 landing** — `/football` 얇은 안내(히어로 + 퀴즈 버튼) + 출처 푸터 + **조기 배포**. ~~15팀 그리드~~ 제외 결정
  - 🔺 **우선순위 올라감**: 카카오 공유는 **배포 전까지 검증 불가**(아래 포인터 참고). S2.8 결과물을 확인하려면 배포가 선행돼야 함
- 🔨 **S5 quiz-store** ← **진행 중** (`feat/quiz-store` 푸시됨, **main 미병합**)
  - ✅ `_store.ts` (`7cf0093`) — 스토어 + `toMatchInput` 검문소
  - ✅ `page.tsx` · `_components/QuizPlay.tsx` (`9f24cb6`) — 라우트 + 진행 화면. **404 해소, 9문항 끝까지 동작**
  - ⬜ **남은 것 = 완료 패널 하나** (~30줄, 디자인 무관): `index === 9`일 때 `toMatchInput → matchTeam → encodeAnswerCode` 결과를 텍스트로 찍어 **전 구간 검증**. 팀명·9자리 답코드·4축 점수·이동할 주소 + 다시하기
    - **S8에서 `router.replace(...)` 한 줄로 통째로 교체될 임시 화면** — 링크로 걸지 말 것(결과 라우트가 아직 404)
    - 끝나면 `pnpm lint`·`pnpm build` → **main 병합**
- ⬜ **S6 quiz-scale** — `<BipolarScale>` **세로축 4점 + 전점 라벨** (ARCHITECTURE §8.1). **디자인 시안 대기 중 = 이 슬라이스의 블로커**
  - 재료는 이미 있음: 색 `#b0cd2a`·`#2c2735`·`#f2fafe`(인트로) · Pretendard 400/600/700 · `max-w-lg` 모바일 우선 · CTA 368×72 실측
  - `QuizPlay.tsx`의 `scaleOptions()`를 그대로 가져가면 됨 (극 두 개 → 선택지 4개 파생)
  - **오탭 방지가 디자인 요구사항** — 자동 진행이라 잘못 누르면 즉시 확정. 선택지 간격을 넉넉히
- ⬜ **S7 quiz-flow** — 진행바 · 자동진행(지연) · 완료 이동 · **진입 가드**
  - 진행바는 **9칸 세그먼트 표시 전용**. ~~칸 클릭으로 문항 점프~~ 기각 — 375px에서 한 칸 ≈35px로 터치 권장치(44px) 미달이라 오탭 복구 장치가 오탭을 유발
  - ~~뒤로 버튼~~ 은 **S5에서 이미 넣음**(`← 이전`, 한 칸씩)
  - **진입 가드**: 새로고침·주소 직접 입력이면 인트로로 `router.replace` (레퍼런스 실측 — 푸망·방구석연구소 둘 다 그렇게 동작)
    - 구현: `_store.ts`에 모듈 변수 `let started = false` + 인트로 CTA를 클라이언트 컴포넌트로 바꿔 클릭 시 `markStarted()`. **모듈 메모리는 앱 내부 이동에는 살아남고 새로고침에는 사라지므로** 이 둘을 구분할 수 있음
    - ⚠️ 정적 HTML에 Q1이 이미 그려져 있어 **리다이렉트 전 한 프레임 깜빡임**이 생김. 없애려면 추가 처리 필요
- ⬜ **S8 result** — 한국어 카피 15팀 + `/football/result/[slug]` + 답코드 **9자리**(리그1+성향8) + 4축 다이아몬드
  - ⚠️ **파싱 검증 필수** — `matchTeam` 호출 전에 막지 않으면 조작 URL로 페이지가 죽는다 (ARCHITECTURE §3)
- ⬜ **S9 share** — OG 태그 → 카카오 SDK(도메인 확정 후) · **S10 og-image**(동적)
- ⬜ **F6 백엔드** — 최소(`POST /participants`)부터. 호스팅 1순위 **OCI Always Free 서울**
- ⬜ 이후 — 익명 댓글(결과별) → `/football` 허브 오픈(꿀팁·팀 순위) → 카카오 로그인 + 입문팀 UGC

> **MVP 경계는 `docs/ARCHITECTURE.md` §9가 기준.** 위 슬라이스는 그 순서를 잘게 쪼갠 것.

## 📌 핵심 포인터

### 🟡 카카오 공유 — 배포 전까지 검증 불가 (2026-08-21 조사, 재조사 비쌈)
- **콘솔이 2025-12-03에 개편됨.** 검색으로 나오는 한국어 튜토리얼은 **전부 그 이전 글**이라 없어진 메뉴(`[플랫폼] > [Web] > 사이트 도메인`)를 안내한다. **공식 문서와 2026년 데브톡만 신뢰할 것**
- **도메인은 여전히 두 곳**에 각각 등록해야 하며, 개편으로 위치가 갈렸다. 카카오 FAQ가 이 혼동을 "자주하는 실수 ★★★★★"로 지목
  | 어디에 | 무엇을 막나 | 실패 코드 |
  |---|---|---|
  | `[앱] > [플랫폼 키] > [JavaScript 키] > [JavaScript SDK 도메인]` | 앱 키 도용 | **4019** |
  | `[앱] > [제품 링크 관리] > [웹 도메인]` | 링크 위·변조(피싱) | **4002** |
- **로컬에서는 링크가 항상 등록 도메인 루트로 치환된다.** `localhost`는 카카오 스크랩 서버가 도달 불가 + 포트 3000이 허용 범위(80·443) 밖 → **콘솔을 어떻게 만져도 안 없어짐**. 실측: PC 카톡 `http://localhost:3000/`, 모바일 `http://localhost/`
- **로컬에서 검증되는 범위** — SDK 로드·SRI·`init`·도메인 등록 2곳·공유창 열림까지. 미리보기 카드와 전체 경로 링크는 배포 후
- **배포 시 체크리스트**
  1. 실 origin을 **두 곳 모두**에 등록 (localhost는 지우지 말 것)
  2. URL에 `:443`을 **쓰지 말 것** — 등록 시 정규화로 사라져서 오히려 매칭 실패
  3. **`metadataBase` 교체** ([app/layout.tsx](app/layout.tsx)) — 안 바꾸면 `og:url`이 localhost로 나가고 **카카오가 그쪽을 따라간다**
  4. 배포 후 OG 태그는 **`curl`로 확인** (개발자도구는 응답과 다를 수 있음)
  5. 새 도메인 등록은 **즉시 반영되지 않음** — 잠시 후 재시도
- **SDK 버전은 찍어보지 말고** [공식 다운로드 페이지](https://developers.kakao.com/docs/ko/javascript/download)에서 확인. 버전과 `integrity`는 **반드시 짝**(하나만 바꾸면 스크립트가 조용히 차단됨)
- **웹훅은 안 씀** — 서버가 있어야 하고 `serverCallbackArgs`를 함께 넘겨야 발동. F6 이후 선택
- 문서: [공유 FAQ](https://developers.kakao.com/docs/ko/kakaotalk-share/faq) · [JS 가이드](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link) · [앱 키 마이그레이션](https://developers.kakao.com/docs/ko/getting-started/app-key-migration) · [데브톡 공유 FAQ](https://devtalk.kakao.com/t/topic/149604)

### 🔵 퀴즈 진행 화면 — S5에서 확정된 것 (2026-08-25)
- **파일 배치**: `play/_store.ts`(스토어) · `play/page.tsx`(서버, metadata+noindex) · `play/_components/QuizPlay.tsx`(클라이언트, 화면)
  - **`"use client"` 파일에서는 `metadata`를 못 내보낸다** → 라우트/메타데이터와 화면을 반드시 분리
  - `robots: { index: false }` — 진행 화면 색인 차단. **유입 착지점은 인트로 하나로** (§4.1)
- **한 라우트 + 상태 교체**(문항마다 URL을 두지 않음) — 답이 URL에 없어서 `/play/5`를 새로고침하면 "5번 문항인데 답 0개"라는 **모순 상태**가 생긴다
- **`index`를 스토어에 둔 이유** — 답과 위치가 항상 함께 움직이므로. 컴포넌트 `useState`로 쪼개면 S7 자동진행에서 두 갱신 시스템이 한 핸들러에 섞인다
- **자동 진행** — 선택 = 답 저장 + 다음 문항. **"다음" 버튼 없음**(탭 18회 → 9회)
- **`← 이전`(한 칸)과 선택된 답 표시는 넣음** — 자동 진행이라 오탭을 되돌릴 수단이 없으면 **잘못된 답으로 나온 결과**가 공유되고, 그건 이 서비스의 목표를 직접 해친다. 시각적 위계는 낮춤(`text-gray-400`)
- ~~완료 화면에서 이전~~ — 결과는 **별도 라우트 + `reset`으로 답이 비워짐**. 다시하기로 처음부터가 맞음
- **`reset`은 언마운트 정리로** (`useEffect(() => reset, [reset])`) — 들어올 때 초기화하면 지난 완료 화면이 한 프레임 비친다. 새로고침은 메모리째 사라지므로 이 장치와 무관
- ⏸ **새로고침 시 답 유실은 "미룬 것"** — `persist` 미들웨어(sessionStorage)로 해결 가능하나 하이드레이션 깜빡임·낡은 답 복원 방어가 따라온다. 스토어 모양이 이미 저장하기 좋아 **나중에 감싸기만 하면 되고 화면 코드는 안 바뀜**. 배포 후 완주율 보고 결정
- 📝 **Q7·Q8의 `word`가 어색** (`약간 살림꾼형` · `약간 매각파`) — `word`가 유형 명사라 정도부사 "약간"과 안 붙는다. **`headline`은 감탄·명령형이라 8/9에서 불가**하므로 형식이 아니라 값을 손봐야 함. S6 디자인 얹은 뒤 재검토 (문구 수정은 답코드에 영향 없음 — §3.3)
- ⚠️ **Tailwind 캐시 함정** — 새 폴더/파일을 여러 개 만든 뒤 **새 클래스만 스타일이 안 먹는** 일이 있었다. Tailwind의 의존은 `import` 그래프 밖(파일 감시)이라 놓칠 수 있음. **`rm -rf .next && pnpm dev`** 로 해결. 서버만 재시작하면 `.next` 캐시가 그대로 재사용돼 안 고쳐짐
  - 진단 순서: DevTools로 ① 클래스가 붙었나 → ② Styles에 그 CSS 규칙이 있나 → ③ 캐시 삭제. `aria-pressed`가 **스타일과 무관하게 로직을 확인시켜 줘서** 범위를 빨리 좁혔다

### 그 외
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
