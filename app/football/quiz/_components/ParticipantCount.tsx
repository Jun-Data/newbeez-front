// 참여자 수 — 백엔드 연결 시 구현 (docs/ARCHITECTURE.md §4.3, §6)
//
// - 반드시 CSR: 마운트 후 GET /api/v1/participants/count 조회
// - 백엔드가 죽어도 이 줄만 조용히 비면 된다 (퀴즈는 정상 동작해야 함)
// - 최소 표본 임계값 미만이면 숨김 — 기준값은 §9 미정 항목
// - 조건은 count === null 로 명시 비교할 것.
//   {count && ...} 로 쓰면 count 가 0 일 때 화면에 "0" 이 그려진다.
export default function ParticipantCount() {
  return null;
}
