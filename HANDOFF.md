# HANDOFF — 진행 상황 & 다음 할 일

> 세션 시작 시 이 파일을 먼저 읽고 이어서 작업. (durable 설계·결정은 `newbeez-back/docs/` 참고)
> **마지막 업데이트: 2026-07-15 — 설계·기반 세팅 완료, 빌드 시작 직전**

## 🎯 지금 어디까지 왔나

**설계 + 기반 세팅 = 완료.** 이제 실제 코딩 시작 단계.

- ✅ **퀴즈 설계 확정** — 15팀 좌표 · 10문항 · 추천 알고리즘 · 분포 검증 (딥리서치·시뮬 20회+)
- ✅ **설계 문서화** — `newbeez-back/docs/quiz-design.md` · `questions.md` + `data/teams.json`
- ✅ **CLAUDE.md** — 프론트·백 양쪽 (스택·규칙·문서 목차)
- ✅ **레포 구조 확정** — 2레포 분리(newbeez-front / newbeez-back), 데이터는 **백엔드가 source of truth**
- ✅ **백엔드 Step 0** — Spring Boot 앱 실행 + MySQL(`newbeez`) 연결 확인
- ⬜ **프론트 Step 0** — `pnpm dev`로 앱 실행 확인 (아직 안 함)

## ▶️ 바로 다음 할 일 (택 1)

- **프론트 F0** — 앱 실행 + App Router 구조 이해 → 이후 F1 랜딩 페이지
  `cd C:\Users\이현준\Desktop\newbeez` → `pnpm dev` → http://localhost:3000
- **또는 백엔드 Item 엔티티** — `data/teams.json` 시딩용 `Item` 클래스 (제네릭, 좌표는 축구 concrete)
  `cd C:\newbeez-back` → `domain/Item.java`

## 🗺️ 전체 로드맵
- **프론트 (newbeez)**: F0 실행 → F1 랜딩 → F2 퀴즈데이터 → F3 질문화면(세로 4점) → F4 진행(Zustand) → F5 결과+추천 → F6 백엔드 연결
- **백엔드 (newbeez-back)**: ✅Step0 → Item 엔티티 → 시딩 → Repository → Service(추천로직) → Controller(API) → 프론트 연결

## 📌 핵심 포인터
- **설계 = `newbeez-back/docs/`** (좌표·문항·알고리즘 = source of truth)
- **실행**: 프론트 `pnpm dev`(:3000) · 백엔드 `./gradlew bootRun`(:8080) — 포트 달라 동시 실행 OK
- **버전 주의**: 프론트=Next 16(코드 전 `node_modules/next/dist/docs/` 읽기) · 백=Spring Boot 4.1(Jackson3·Hibernate7·jakarta)
- **사용자**: 프론트 입문자, 백엔드도 학습 중 → **explain-first, 명령은 직접 실행**

---
*세션 끝낼 때 "핸드오프"라고 하면 이 파일을 갱신해줘요.*
