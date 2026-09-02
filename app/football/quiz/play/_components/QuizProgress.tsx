"use client";

import { useId } from "react";

interface QuizProgressProps {
  readonly index: number; // 현재 문항 (0부터)
  readonly total: number; // 전체 문항 수
}

/** 공의 실루엣. 클립·흰 바탕·테두리 세 곳에서 재사용한다 */
const BALL_RIM =
  "M22.1 12.0 C22.1 14.0 21.4 16.4 20.2 18.0 C19.1 19.7 17.0 21.2 15.1 21.8 C13.3 22.3 10.9 22.1 9.0 21.5 C7.1 20.9 4.9 19.5 3.7 17.9 C2.5 16.4 1.7 14.0 1.7 12.0 C1.8 10.0 2.7 7.8 3.9 6.2 C5.1 4.6 7.1 3.0 8.9 2.4 C10.7 1.9 13.1 2.1 15.0 2.7 C16.8 3.2 18.8 4.4 20.0 6.0 C21.2 7.5 22.0 10.0 22.1 12.0Z";

/** 검은 오각형 6개 — 가운데 1 + 둘레 5. 둘레 것은 실루엣 밖까지 뻗어 클립으로 잘린다 */
const BALL_PATCHES = [
  "M12.2 8.1 Q13.7 9.6 15.7 10.6 Q14.7 12.6 14.2 14.8 Q11.9 15.1 9.5 15.2 Q9.2 12.9 8.3 10.7 Q10.2 9.4 12.2 8.1Z",
  "M20.1 0.8 Q21.1 2.8 21.5 4.9 Q20.0 6.3 18.3 7.4 Q16.5 6.0 14.6 4.7 Q14.9 2.7 15.8 0.8 Q17.9 0.9 20.1 0.8Z",
  "M24.8 16.1 Q23.3 17.2 21.9 18.5 Q20.3 17.2 18.4 16.2 Q18.8 14.1 19.8 12.1 Q21.9 12.3 24.0 12.1 Q24.5 14.1 24.8 16.1Z",
  "M12.0 25.3 Q10.2 24.3 8.5 23.1 Q9.4 21.2 10.3 19.3 Q12.2 19.7 14.2 19.7 Q15.1 21.3 15.5 23.2 Q13.7 24.1 12.0 25.3Z",
  "M-0.8 16.4 Q-0.3 14.5 0.0 12.7 Q2.0 12.4 4.1 12.3 Q4.9 14.3 5.6 16.5 Q4.0 17.8 2.2 18.8 Q0.5 17.8 -0.8 16.4Z",
  "M3.8 1.1 Q6.1 1.2 8.3 0.8 Q8.7 2.9 9.0 5.1 Q7.5 6.1 6.0 7.1 Q4.2 6.2 2.6 4.9 Q3.5 3.1 3.8 1.1Z",
];

/** 막대 캡슐. 수평은 유지하고 위아래 가장자리만 ±0.3 흔들었다 */
const BAR_CAPSULE =
  "M8.5 -0.16 Q26.2 -0.16 43.9 -0.24 Q61.6 -0.24 79.2 -0.06 Q96.9 -0.06 114.6 -0.21 Q132.3 -0.21 150.0 -0.26 Q167.7 -0.26 185.4 -0.06 Q203.1 -0.06 220.8 0.25 Q238.4 0.25 256.1 0.18 Q273.8 0.18 291.5 0.16 A6.5 6.5 0 0 1 291.5 13.18 Q273.8 13.18 256.1 13.20 Q238.4 13.20 220.8 13.26 Q203.1 13.26 185.4 12.83 Q167.7 12.83 150.0 12.76 Q132.3 12.76 114.6 12.80 Q96.9 12.80 79.2 12.87 Q61.6 12.87 43.9 13.02 Q26.2 13.02 8.5 12.83 A6.5 6.5 0 0 1 8.5 -0.16Z";

const INK = "#2c2735";
const TRACK = "#ebeceb";
const FILL = "#b0cd2a";

function SoccerBall({ size }: { readonly size: number }) {
  const clipId = useId();

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <path d={BALL_RIM} />
        </clipPath>
      </defs>
      <path d={BALL_RIM} fill="#fff" />
      <g
        clipPath={`url(#${clipId})`}
        fill={INK}
        stroke={INK}
        strokeWidth={0.55}
        strokeLinejoin="round"
      >
        {BALL_PATCHES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path
        d={BALL_RIM}
        fill="none"
        stroke={INK}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Capsule({ fill }: { readonly fill: string }) {
  return (
    <svg
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      className="block h-4 w-full"
    >
      <path
        d={BAR_CAPSULE}
        transform="translate(0 1.5)"
        fill={fill}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function QuizProgress({ index, total }: QuizProgressProps) {
  const step = Math.min(index + 1, total);
  const percent = (step / total) * 100;

  return (
    <div className="relative flex h-7 items-center">
      <Capsule fill={TRACK} />

      <div
        className="absolute inset-0 flex items-center"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <Capsule fill={FILL} />
      </div>

      <span
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${percent}%` }}
      >
        <SoccerBall size={28} />
      </span>
    </div>
  );
}
