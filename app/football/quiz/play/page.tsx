import type { Metadata } from "next";
import QuizPlay from "./QuizPlay";

export const metadata: Metadata = {
  title: "해외축구 팀 성향 테스트",
  robots: { index: false },
};

export default function QuizPlayPage() {
  return <QuizPlay />;
}
