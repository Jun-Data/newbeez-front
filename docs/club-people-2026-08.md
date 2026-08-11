# 15팀 인물 큐레이션 — 2026-08-11 기준

> ⚠️ **이적시장 마감(2026-09-01) 이전 스냅샷.** 서비스 오픈 전 9월 초 재확인 필수.
> 스키마는 [ARCHITECTURE.md §5.1](ARCHITECTURE.md) 참고. SQL 시드는 `newbeez-back` 소유.

## 1. 최종 표

| slug | 팀 | 감독 | 감독 수식어 | 스타 | 스타 수식어 | 레전드 | 레전드 근거 |
|---|---|---|---|---|---|---|---|
| man-city | 맨체스터 시티 | 엔초 마레스카 | 펩의 제자, 점유율 축구 계승자 | 엘링 홀란 | 한 시즌 36골 괴물 골잡이 | 세르히오 아구에로 | 구단 최다 득점 260골(390경기), 2011-12 극장골 우승 |
| arsenal | 아스널 | 미켈 아르테타 | 22년 만에 리그 우승 안긴 감독 | 부카요 사카 | 왼발 감아차기의 달인 | 티에리 앙리 | 구단 최다 득점 228골(377경기), 2003-04 무패우승 주역 |
| liverpool | 리버풀 | 안도니 이라올라 | 쉴 틈 없이 몰아붙이는 압박 축구 | 버질 반 다이크 | 세계 최고의 수비수이자 주장 | 스티븐 제라드 | 710경기 186골, 2005 UCL 우승 주장 |
| tottenham | 토트넘 홋스퍼 | 로베르토 데 제르비 | 뒤에서부터 패스로 푸는 전술가 | 산드로 토날리 | 구단 최고 이적료로 온 중원 사령관 | **손흥민** | 454경기 173골, 2021-22 PL 득점왕, 2025 UEL 우승 주장 |
| chelsea | 첼시 | 사비 알론소 | 무패 우승 신화의 젊은 명장 | 콜 파머 | 차분한 왼발의 첼시 해결사 | 프랭크 램파드 | 구단 최다 득점 211골(648경기), 미드필더 최다 |
| man-utd | 맨체스터 유나이티드 | 마이클 캐릭 | 맨유 레전드 출신 사령탑 | 브라이언 음뵈모 | 발끝 매서운 오른쪽 폭격기 | **박지성** | 205경기 27골, PL 4회·UCL 1회, 아시아 최초 UCL 결승 선발 |
| real-madrid | 레알 마드리드 | 조제 무리뉴 | 스페셜 원, 우승 청부사 | 비니시우스 주니오르 | 왼쪽을 찢는 드리블 괴물 | 크리스티아누 호날두 | 구단 최다 득점 451골(438경기), 경기당 1골 이상 |
| barcelona | 바르셀로나 | 한지 플리크 | 고강도 압박의 지휘자 | 라민 야말 | 19세 등번호 10번 천재 | 리오넬 메시 | 구단 1위 672골·778경기·305도움(2003~2021) |
| atletico | 아틀레티코 마드리드 | 디에고 시메오네 | 투지로 무장한 수비 장인 | **이강인** | 왼발 하나로 다 하는 7번 | 앙투안 그리즈만 | 구단 최다 득점 212골(500경기), 아라고네스 173골 경신 |
| bayern | 바이에른 뮌헨 | 뱅상 콤파니 | 쉴 새 없이 몰아치는 공격 축구 | 해리 케인 | 손흥민과 뛰던 월드클래스 골잡이 | 토마스 뮐러 | 구단 최다 출전 756경기, 우승 33회(2008~2025) |
| dortmund | 보루시아 도르트문트 | 니코 코바치 | 수비부터 단단히 세우는 원칙주의자 | 니코 슐로터베크 | 독일 대표팀 수비의 기둥 | 마르코 로이스 | 429경기 170골, 분데스리가 출범 후 구단 최다 득점 |
| psg | 파리 생제르맹 | 루이스 엔리케 | 압박과 패스로 유럽을 제패한 명장 | 우스만 뎀벨레 | 발롱도르를 거머쥔 만능 공격수 | 킬리안 음바페 | 구단 최다 득점 256골(308경기), 리그1 득점왕 6연패 |
| inter | 인테르 밀란 | 크리스티안 키부 | 인테르 트레블 멤버 출신 감독 | 라우타로 마르티네스 | 월드컵 우승 멤버, 인테르 주장 | 하비에르 사네티 | 구단 최다 출전 858경기, 13년 주장, 4번 영구결번 |
| ac-milan | AC밀란 | 후벵 아모림 | 3백 전술의 포르투갈 젊은 명장 | 루카 모드리치 | 마흔에도 뛰는 미드필더 교과서 | 파올로 말디니 | 구단 최다 출전 902경기, 25시즌 원클럽맨, UCL 5회 |
| juventus | 유벤투스 | 루치아노 스팔레티 | 나폴리 33년 만의 우승 사령탑 | 랑달 콜로 무아니 | 등번호 9번 단 프랑스 골잡이 | 알레산드로 델 피에로 | 구단 최다 득점 290골·최다 출전 705경기, 11년 주장 |

레전드 15명 중복 없음. `legend_note`는 30~41자 → **`VARCHAR(64)` 권장**(현 스키마 48자는 여유 부족).

---

## 2. 검증에서 뒤집힌 것

| 팀 | 필드 | 원안 → 최종 | 근거 |
|---|---|---|---|
| atletico | legend_note | 그리즈만 211골 → **212골(500경기)** | 211골은 2026-03-24 이적 발표 시점 중간 수치. 5/17 히로나전 고별전(500번째 출전)까지 뛰고 212골 마감 |
| dortmund | legend_note | 로이스 426경기 → **429경기** | 426은 2024년 5월 리그 고별전 시점 집계. 총계는 429경기 170골 |

**표기 정정 3건**
- `barcelona.star_player_note` 18세 → **19세** (야말 2007-07-13생, 8/11 기준 19세)
- `real-madrid.legend_note` "경기당 1골 이상을 기록한 **유일한** 선수" → **"경기당 1골 이상"** ('유일' 근거 없음)
- `barcelona.legend_note` 2004~2021 → **2003~2021** (fcbarcelona.com 공식 표기)

**편집 재량 1건 (되돌려도 무방)**
- `ac-milan.star_player_note` "발롱도르 받은" → **"마흔에도 뛰는"** (PSG 뎀벨레와 '발롱도르' 중복 회피)

---

## 3. 9월 초 재확인 목록 (우선순위)

| # | 항목 | 리스크 |
|---|---|---|
| 1 | **atletico / 이강인** | 소속·계약(2031년까지, 7번) 확정이나 기초군사훈련으로 프리시즌 합류 지연. 개막전 선발 제외 예상 |
| 2 | **atletico / 훌리안 알바레스** | 본인 이적 요구 중, 구단 거부. 잔류 시 이강인보다 스타 후보로 강함 → 필드 재검토 |
| 3 | **liverpool / 반 다이크** | 계약 1년 남음. 구단이 제안 청취 용의 보도 |
| 4 | **chelsea / 콜 파머** | 비매품·2033년 계약이나 £130~150m 호가 보도 |
| 5 | **dortmund / 슐로터베크** | 소속 안전하나 무릎 부상으로 개막 결장, 9월 중순 복귀 |
| 6 | **psg / 뎀벨레** | 잔류 안정이나 재계약 협상 지연 |
| 7 | **bayern / 케인** | 잔류 확실, 재계약 서명 시점 미확인 |
| 8 | **tottenham / 로메로** | 아틀레티코 이적 협상 중. 스타 필드엔 없으나 팀 소개 문맥 영향 |
| 9 | **신임 감독 5인** | 마레스카·이라올라·무리뉴·아모림·알론소 모두 2026년 여름 부임 → 시즌 초 교체 리스크 구조적으로 높음 |
| 10 | **ac-milan / 모드리치** | 만 40세. 이적보다 **은퇴 리스크** |

---

## 4. 인명 표기 (확정)

원칙과 팀명 규칙은 [ARCHITECTURE.md §7.4](ARCHITECTURE.md) 참고. 아래는 매체 표기가 갈려 판단이 필요했던 인명만.

| 원어 | 갈리는 표기 | 채택 | 근거 |
|---|---|---|---|
| Haaland | 홀란 / 홀란드 | **홀란** | 매체가 "홀란"으로 이동, 원음 근접 |
| Palmer | 파머 / 팔머 | **파머** | 영어 `l` 묵음, 매체 주류 |
| Agüero | 아구에로 / 아궤로 | **아구에로** | 매체 표기 압도적 |
| van Dijk | 반 다이크 / 판데이크 | **반 다이크** | 원음은 판데이크지만 국내 인지도 우선 |
| Chivu | 키부 / 치부 | **키부** | 루마니아어 `Chi`=[ki], 원음·매체 일치 |
| Mbeumo | 음뵈모 / 음베우모 | **음뵈모** | 매체 정착 |
| Mourinho | 조제 / 조세 / 주제 | **조제 무리뉴** | 국립국어원·매체 일치 |

나머지 38명은 매체 표기가 하나로 굳어 있어 판단 불필요.

---

## 5. 카피 감수 포인트

- **juventus 감독 수식어** — "나폴리 33년 만의 우승 사령탑". 유벤투스 카드에 세리에A 경쟁팀 업적이 실림. 유베 팬 시선에서 어색할 수 있음
- **man-utd 감독 수식어** — "맨유 **레전드** 출신 사령탑"인데 같은 카드의 레전드 필드는 박지성. 단어가 겹쳐 혼동 소지

---

## 6. SQL (인물 컬럼만)

```sql
-- curated_at 컬럼이 없다면 선행:
-- ALTER TABLE team_results ADD COLUMN curated_at DATETIME NULL;

UPDATE team_results SET manager='엔초 마레스카', manager_note='펩의 제자, 점유율 축구 계승자', star_player='엘링 홀란', star_player_note='한 시즌 36골 괴물 골잡이', legend='세르히오 아구에로', legend_note='구단 최다 득점 260골(390경기), 2011-12 극장골 우승', curated_at=NOW() WHERE slug='man-city';
UPDATE team_results SET manager='미켈 아르테타', manager_note='22년 만에 리그 우승 안긴 감독', star_player='부카요 사카', star_player_note='왼발 감아차기의 달인', legend='티에리 앙리', legend_note='구단 최다 득점 228골(377경기), 2003-04 무패우승 주역', curated_at=NOW() WHERE slug='arsenal';
UPDATE team_results SET manager='안도니 이라올라', manager_note='쉴 틈 없이 몰아붙이는 압박 축구', star_player='버질 반 다이크', star_player_note='세계 최고의 수비수이자 주장', legend='스티븐 제라드', legend_note='710경기 186골, 2005 UCL 우승 주장', curated_at=NOW() WHERE slug='liverpool';
UPDATE team_results SET manager='로베르토 데 제르비', manager_note='뒤에서부터 패스로 푸는 전술가', star_player='산드로 토날리', star_player_note='구단 최고 이적료로 온 중원 사령관', legend='손흥민', legend_note='454경기 173골, 2021-22 PL 득점왕, 2025 UEL 우승 주장', curated_at=NOW() WHERE slug='tottenham';
UPDATE team_results SET manager='사비 알론소', manager_note='무패 우승 신화의 젊은 명장', star_player='콜 파머', star_player_note='차분한 왼발의 첼시 해결사', legend='프랭크 램파드', legend_note='구단 최다 득점 211골(648경기), 미드필더 최다', curated_at=NOW() WHERE slug='chelsea';
UPDATE team_results SET manager='마이클 캐릭', manager_note='맨유 레전드 출신 사령탑', star_player='브라이언 음뵈모', star_player_note='발끝 매서운 오른쪽 폭격기', legend='박지성', legend_note='205경기 27골, PL 4회·UCL 1회, 아시아 최초 UCL 결승 선발', curated_at=NOW() WHERE slug='man-utd';
UPDATE team_results SET manager='조제 무리뉴', manager_note='스페셜 원, 우승 청부사', star_player='비니시우스 주니오르', star_player_note='왼쪽을 찢는 드리블 괴물', legend='크리스티아누 호날두', legend_note='구단 최다 득점 451골(438경기), 경기당 1골 이상', curated_at=NOW() WHERE slug='real-madrid';
UPDATE team_results SET manager='한지 플리크', manager_note='고강도 압박의 지휘자', star_player='라민 야말', star_player_note='19세 등번호 10번 천재', legend='리오넬 메시', legend_note='구단 1위 672골·778경기·305도움(2003~2021)', curated_at=NOW() WHERE slug='barcelona';
UPDATE team_results SET manager='디에고 시메오네', manager_note='투지로 무장한 수비 장인', star_player='이강인', star_player_note='왼발 하나로 다 하는 7번', legend='앙투안 그리즈만', legend_note='구단 최다 득점 212골(500경기), 아라고네스 173골 경신', curated_at=NOW() WHERE slug='atletico';
UPDATE team_results SET manager='뱅상 콤파니', manager_note='쉴 새 없이 몰아치는 공격 축구', star_player='해리 케인', star_player_note='손흥민과 뛰던 월드클래스 골잡이', legend='토마스 뮐러', legend_note='구단 최다 출전 756경기, 우승 33회(2008~2025)', curated_at=NOW() WHERE slug='bayern';
UPDATE team_results SET manager='니코 코바치', manager_note='수비부터 단단히 세우는 원칙주의자', star_player='니코 슐로터베크', star_player_note='독일 대표팀 수비의 기둥', legend='마르코 로이스', legend_note='429경기 170골, 분데스리가 출범 후 구단 최다 득점', curated_at=NOW() WHERE slug='dortmund';
UPDATE team_results SET manager='루이스 엔리케', manager_note='압박과 패스로 유럽을 제패한 명장', star_player='우스만 뎀벨레', star_player_note='발롱도르를 거머쥔 만능 공격수', legend='킬리안 음바페', legend_note='구단 최다 득점 256골(308경기), 리그1 득점왕 6연패', curated_at=NOW() WHERE slug='psg';
UPDATE team_results SET manager='크리스티안 키부', manager_note='인테르 트레블 멤버 출신 감독', star_player='라우타로 마르티네스', star_player_note='월드컵 우승 멤버, 인테르 주장', legend='하비에르 사네티', legend_note='구단 최다 출전 858경기, 13년 주장, 4번 영구결번', curated_at=NOW() WHERE slug='inter';
UPDATE team_results SET manager='후벵 아모림', manager_note='3백 전술의 포르투갈 젊은 명장', star_player='루카 모드리치', star_player_note='마흔에도 뛰는 미드필더 교과서', legend='파올로 말디니', legend_note='구단 최다 출전 902경기, 25시즌 원클럽맨, UCL 5회', curated_at=NOW() WHERE slug='ac-milan';
UPDATE team_results SET manager='루치아노 스팔레티', manager_note='나폴리 33년 만의 우승 사령탑', star_player='랑달 콜로 무아니', star_player_note='등번호 9번 단 프랑스 골잡이', legend='알레산드로 델 피에로', legend_note='구단 최다 득점 290골·최다 출전 705경기, 11년 주장', curated_at=NOW() WHERE slug='juventus';
```
