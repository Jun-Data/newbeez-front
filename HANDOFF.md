# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업.
>
> **이 파일은 "상태 · 다음 할 일 · 함정"만 담는다.** 확정된 설계와 그 근거는 아래로 미루고 여기에 중복하지 않는다.
> - 시스템 설계(라우팅·렌더링·스키마·API·UI 방침) → **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**
> - 제품 설계(15팀 좌표·9문항·매칭 알고리즘) → **`newbeez-back/docs/`**
> - MVP 이후 기능 → [docs/FUTURE.md](docs/FUTURE.md)
> - 작업 규칙(역할·커밋·브랜치) → [CLAUDE.md](CLAUDE.md)

**마지막 업데이트: 2026-09-01** — S6-a 완료·배포·카카오 검증 완료. **다음은 S6-b**
브랜치 `main` 하나 · origin 동기화 · 워킹트리 깨끗
**🌐 배포: https://www.newbeez.kr** (Vercel · `main` 푸시 → 자동 배포)

---

## 🗺️ 슬라이스 로드맵

1 슬라이스 = 1 브랜치, `/work` 로 진행. **MVP 경계는 ARCHITECTURE §9.**

| | 슬라이스 | 상태 |
|---|---|---|
| **S1** | quiz-core — `lib/` 6파일 + 전수 감사 | ✅ `4e9f3ec` |
| S1.5 | coord-spread — 좌표 분산으로 ALL 4.4배 → ~2.25배 | ⬜ 선택 |
| **S2** | quiz-intro — `/football/quiz` | ✅ `47952a6` |
| **S2.5** | answer-code — 9자리 답코드 + 감사 | ✅ `587b4d2` |
| **S2.7** | intro-og — OG 이미지·헤더·CTA | ✅ `bafe409` |
| **S2.8** | intro-social — 공유 3버튼 + 참여자 수 자리 | ✅ `7b51002` |
| S3 | clubs-data — TheSportsDB 프리페치 + 배지 15장 | ⬜ |
| **S4** | landing + 배포 | 🟡 **배포만 완료** |
| **S5** | quiz-store — 스토어 + `/play` + 완료 패널 | ✅ `6c7888e` |
| **S6** | quiz-scale — 퀴즈 화면 디자인 | 🟡 **a 완료** |
| S7 | quiz-flow — 움직이는 것만 | ⬜ |
| S8 | result — 결과 화면 + 4축 다이아몬드 | ⬜ |
| S9·S10 | share — 카카오 SDK · 동적 OG 이미지 | ⬜ |
| F6 | 백엔드 — `POST /participants` 부터 | ⬜ |

이후: 익명 댓글 → `/football` 허브 오픈 → 카카오 로그인 + UGC

### 🟡 S4 landing — 배포는 됐고 랜딩 화면이 없다

- ✅ Vercel + `www.newbeez.kr` (호스팅케이알 구매 · apex → www 308)
- ✅ `/` · `/football` → `/football/quiz` **임시 리다이렉트** (`next.config.ts`). **홈·카테고리 화면이 생기면 이 5줄 삭제**
- ✅ `noindex` 는 **넣지 않기로** — 리다이렉트 덕에 미완성 페이지가 렌더링되지 않고, 색인 대상으로 남는 인트로는 완성된 페이지다. 넣으면 **나중에 빼는 걸 잊을 위험**이 더 크다
- ⬜ 남은 것: `/football` 실제 랜딩(히어로 + 퀴즈 버튼) + 출처 푸터. ~~15팀 그리드~~ 제외
- ⬜ **`app/robots.ts` · `app/sitemap.ts` 가 없다** — Next 가 파일 규약으로 지원한다. 인트로가 검색 유입의 착지점인데 색인 안내가 전혀 없는 상태. 이미 배포돼 있으니 지금 넣어도 됨
- ⬜ **`[scrollbar-gutter:stable]`** — 데스크톱에서 페이지를 오갈 때 로고가 7px 흔들린다(스크롤바 유무로 가용 폭이 바뀜). `app/layout.tsx` 의 `<html>` 에 한 줄

### 🟡 S6 quiz-scale — a 완료 / b·c 남음

**사양은 ARCHITECTURE §8.1·§8.2.** 시안은 `바탕화면/레퍼런스/…design….pdf` 의 **1a**(Q2~Q9) · **1b**(Q1).

- ✅ **S6-a bipolar-scale** — `_components/BipolarScale.tsx`. 배포됨
- ⬜ **S6-b** ← **다음** · `LeagueChoices.tsx`(Q1 카드) + `QuizProgress.tsx`(진행바)
  - 진행바 = 9칸 **세그먼트 표시 전용** + `N / 9` 병기
  - ~~칸을 눌러 문항 점프~~ **기각** — 375px 에서 한 칸 ≈35px 로 터치 권장치 미달. **오탭 복구 장치가 오탭을 유발**한다
  - ⚠️ **세로 예산을 반드시 다시 잴 것** — 아래 "SE 여유 9px" 참고. Q1 카드 3장이 척도보다 높다
- ⬜ **S6-c** · 배경 재검토(§8.3) — 이제 1a 가 실제로 그려졌으니 **그 위에서** 4장 비교

### ⬜ S7 quiz-flow — 움직이는 것만

- **자동진행 지연** — 지금은 즉시. 선택 표시를 볼 틈(200~400ms)을 줄지 결정
- **완료 → 결과 이동** — `router.replace("/football/result/[slug]?a=…")`. S8 과 맞물림
- **진입 가드** — 새로고침·주소 직접 입력이면 인트로로 (푸망·방구석연구소 둘 다 그렇게 동작)
  - `_store.ts` 에 모듈 변수 `let started = false` + 인트로 CTA 를 클라이언트로 바꿔 클릭 시 `markStarted()`. **모듈 메모리는 앱 내부 이동에는 살아남고 새로고침에는 사라진다**
  - ⚠️ 정적 HTML 에 Q1 이 이미 그려져 있어 **리다이렉트 전 한 프레임 깜빡임**이 생긴다

### ⬜ S9·S10 share — 동적 OG 이미지

- ⚠️ **`ImageResponse`(`next/og`)는 한글 폰트를 직접 실어야 한다.** 기본 폰트에 한글이 없어 그냥 쓰면 **두부(□)** 가 나온다. Pretendard 서브셋을 `fetch` 해 `fonts` 옵션에 넘길 것
- `@vercel/og` 는 옛 패키지명. 지금은 **`next/og` 내장**
- 카카오 **커스텀 템플릿**(버튼 이름 지정)은 전환율을 올릴 수 있지만, 지금의 `sendScrap`(OG 한 곳만 관리)과 상충한다. S9 에서 판단

### ⬜ S8 result

⚠️ **파싱 검증 필수** — `decodeAnswerCode` 가 `null` 이면 `matchTeam` 을 아예 부르지 않는다. 안 막으면 조작 URL 로 페이지가 죽는다 (ARCHITECTURE §3.2).

---

## 🔴 지금 열려 있는 위험

| | 무엇 | 어떻게 판정 |
|---|---|---|
| **오탭 — 짧은 화면만** | 일반 화면은 원을 **80/48** 로 키워 해소됨(48px > 권장 44px). 다만 **짧은 화면은 48/32 로 고정**이라 SE 계열엔 위험이 남는다 | S6-b 에서 헤더가 최종 모양이 된 뒤 여유를 다시 보고 결정. 여유가 없으면 `p-1.5` 투명 여백으로 터치 영역만 확보(원 크기는 유지 가능) |
| **SE 여유 9px** | 축 영역 최소 232px 인데 현재 241px → **헤더가 10px만 커져도 스크롤** | S6-b 에서 playwright 재측정. 진행바가 `2 / 9` 줄(20px)을 대체하므로 순증가는 그보다 작다 |

> ✅ **클립보드는 2026-09-01 실기기 확인 완료** — 카톡 인앱에서도 링크 복사 정상. `document.execCommand("copy")` 폴백은 **넣지 않는다**(검증된 환경에서 필요 없음).

---

## 📌 함정 모음 (경험으로 알게 된 것)

### ✅ 카카오 공유 — 2026-09-01 실기기 검증 완료

**S2.8 부터 미뤄온 항목이 닫혔다.** 폰에서 공유 → 카드 정상.

밖에서 확인한 것(playwright): SDK `2.8.2` 로드 · **SRI 통과**(버전과 `integrity` 짝이 맞음) · `isInitialized() === true` · `Share.sendScrap` 존재 · 버튼 3개 렌더.

⚠️ **`NEXT_PUBLIC_KAKAO_JS_KEY` 는 Vercel 환경변수에 따로 넣어야 한다.** `.env.local` 은 배포에 안 올라간다. 안 넣으면 **버튼이 아예 안 그려진다**(설계상 의도) — 이번에 한 번 걸렸다. 넣은 뒤 **Redeploy 필수**: `NEXT_PUBLIC_*` 은 빌드 시점에 코드로 인라인되므로 변수만 추가하면 반영되지 않는다.

> 아래는 다시 건드릴 때를 위한 기록. **재조사가 비싸므로 지우지 말 것** (2026-08-21 조사)

- 🚨 **기본 도메인이 `localhost` 면 공유된 카톡 링크가 `http://localhost/` 로 나가서 아무도 못 연다.** 실측: PC 카톡 `http://localhost:3000/`, 모바일 `http://localhost/`. `localhost` 는 목록에서 지우지 말되 **기본으로 두지 말 것**
  - 카카오 공식 FAQ 에 *기본 도메인*의 정의는 문서화돼 있지 않다 — 위 실측이 유일한 근거
- **콘솔이 2025-12-03에 개편됨.** 검색에 나오는 한국어 튜토리얼은 **전부 그 이전 글**이라 없어진 메뉴를 안내한다. **공식 문서와 2026년 데브톡만 신뢰할 것**
- **도메인은 두 곳**에 각각 등록하며 개편으로 위치가 갈렸다. 카카오 FAQ 가 "자주하는 실수 ★★★★★"로 지목

  | 어디에 | 무엇을 막나 | 실패 코드 |
  |---|---|---|
  | `[앱] > [플랫폼 키] > [JavaScript 키] > [JavaScript SDK 도메인]` | 앱 키 도용 | **4019** |
  | `[앱] > [제품 링크 관리] > [웹 도메인]` | 링크 위·변조(피싱) | **4002** |

- **증상별 원인**

  | 증상 | 원인 |
  |---|---|
  | 공유창이 안 뜸 | JavaScript SDK 도메인 미등록 (4019) |
  | 공유창은 뜨는데 전송 실패 | 웹 도메인 미등록 (4002) |
  | 카드는 뜨는데 내용이 낡음 | **스크랩 캐시** — 카카오가 예전 OG 를 들고 있음 |
  | 링크가 `localhost` 로 감 | **기본 도메인이 아직 localhost** |
  | **노란 버튼 자체가 없음** | `NEXT_PUBLIC_KAKAO_JS_KEY` 가 Vercel 환경변수에 없음(설계상 키 없으면 렌더 안 함) |

- URL 에 `:443` 을 **쓰지 말 것** — 등록 시 정규화로 사라져 오히려 매칭 실패
- 등록은 **즉시 반영되지 않음** — 잠시 후 재시도
- OG 태그는 `curl` 로 확인 (개발자도구는 응답과 다를 수 있음)
  `curl -s https://www.newbeez.kr/football/quiz | grep -o 'og:[^>]*'`
- **SDK 버전은 찍어보지 말고** [공식 다운로드 페이지](https://developers.kakao.com/docs/ko/javascript/download)에서 확인. 버전과 `integrity` 는 **반드시 짝**(하나만 바꾸면 스크립트가 조용히 차단됨)
- 웹훅은 안 씀 — 서버 + `serverCallbackArgs` 가 있어야 발동. F6 이후 선택
- 문서: [공유 FAQ](https://developers.kakao.com/docs/ko/kakaotalk-share/faq) · [JS 가이드](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link) · [데브톡](https://devtalk.kakao.com/t/topic/149604)

### 🚀 배포 (Vercel)

- ⚠️ **해시 붙은 배포 URL**(`...-bwkc6citg-...vercel.app`)은 **Vercel 로그인을 요구**한다. 폰 테스트는 반드시 `www.newbeez.kr` 로
- 리다이렉트 `source: "/football"` 은 **정확 매칭** — 하위까지 잡으면 퀴즈가 자기 자신으로 무한 리다이렉트한다
- 리다이렉트는 **307**(`permanent: false`). 308 은 브라우저가 영구 캐시해서 나중에 홈을 만들어도 계속 튕겨 보낸다
- `next.config.ts` 변경은 **개발 서버 재시작 전까지 반영 안 됨**

### 🔧 개발 중 함정

- ⚠️ **Tailwind 캐시** — 새 폴더/파일을 여러 개 만든 뒤 **새 클래스만 스타일이 안 먹는** 일이 있었다. 의존이 `import` 그래프 밖(파일 감시)이라 놓칠 수 있음. **`rm -rf .next && pnpm dev`**. 서버만 재시작하면 안 고쳐진다
  - 진단 순서: DevTools 로 ① 클래스가 붙었나 → ② Styles 에 그 CSS 규칙이 있나 → ③ 캐시 삭제
- ⚠️ **Tailwind 오타는 조용히 무시된다** (`border-gray-300s`). 스타일이 안 먹으면 **오타부터** 의심
- 🔧 **playwright MCP 로 실측할 것 — 눈으로만 보지 말 것.** `getBoundingClientRect()` 로 간격을, `scrollHeight > innerHeight` 로 넘침을 재고, **라이브 DOM 에 스타일을 주입해 코드 수정 전에 비교**한다
  - 이 방식이 두 번 설계를 바꿨다: §8.2 의 "간격 8px" 오독, `justify-center` 가 실기기에서 166px 을 벌리던 문제
  - ⚠️ Next 개발 오버레이(`<nextjs-portal>`)가 클릭을 가로챈다 → `browser_evaluate` 로 `el.click()` 직접 호출
  - ⚠️ 스크린샷 기본 경로가 **프로젝트 루트**다. 끝나면 지울 것
- 🚨 **데스크톱 브라우저만 보고 판단하지 말 것.** 375×667 DevTools 는 통과했지만 실기기 390×844 에서 레이아웃이 무너져 있었다. 원인은 화면이 **더 클 때** 남는 공간이 어디로 가느냐였다

### 📁 레퍼런스 폴더 (`바탕화면/레퍼런스/`) — git 에 없음

| 파일 | 내용 |
|---|---|
| **`Quiz screen design for soccer personality test.pdf`** | 이 프로젝트 전용 퀴즈 화면 시안 10개. **X24 가 채택안(1a·1b) 4폰 시트** |
| `방구석연구소.html` · `푸망레퍼런스.html` | 저장본. **둘 다 퀴즈 진행 화면 마크업은 없다**(클라이언트 렌더) |
| `배경후보/` | 일러스트 4종 PNG (S6-c 에서 재검토) |

- PDF 는 1페이지라 텍스트만 추출된다 → **`pypdf` 로 XObject 를 꺼내 PNG 변환**(PIL 없이 zlib+struct 로 가능)
- 레퍼런스 세부가 필요하면 **폰으로 직접 실측**하는 게 빠르다 — 이 방식이 여러 번 설계를 바꿨다(CTA 368×72 · 공유 버튼 순서 · 앞뒤 이동 없음 · 새로고침→인트로)

---

## 그 외

- **매칭 = 코사인(방향)** · 근소동점 밴드(`COS_BAND`)는 유클리드 거리로 가름
- **데이터 3층**: `lib/clubs.ts`(좌표·**표시명 원본**) + `data/clubs.source.json`(S3) + `team_results` DB(배지·인물·카피)
- **실행**: `pnpm dev`(:3000) · `pnpm quiz:audit` · 백엔드 `./gradlew bootRun`(:8080)
- ⚠️ **Next 16** — 코드 전 `node_modules/next/dist/docs/` 읽기 ([AGENTS.md](AGENTS.md))
- ⚠️ **`lib/questions.ts`·`lib/scoring.ts` 는 재작성 금지.** 손댔으면 **`pnpm quiz:audit` 로 기준선 대조**
  기준선: EPL 2.38 · ETC 2.69 · ALL 4.39 · 굶는 팀 0 · 왕복 196,608건
- **호스팅(백엔드)**: 1순위 OCI Always Free 서울. 결정 보류 — A1 확보가 복불복이라 미리 시도 권장

---
*`/handoff` (또는 "핸드오프")로 이 파일을 갱신.*
