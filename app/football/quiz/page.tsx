import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import quizStartImage from "@/public/quiz_start.png";

export const metadata: Metadata = {
  title: "해외축구 감독 성향 테스트",
  description: "9문항으로 알아보는, 나와 가장 닮은 축구팀은?",
  openGraph: {
    title: "해외축구 감독 성향 테스트 | Newbeez",
    description: "9문항으로 알아보는, 나와 가장 닮은 축구팀은?",
    siteName: "Newbeez",
    type: "website",
    locale: "ko_KR",
  },
};
export default function QuizIntroPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-6 py-10">
      <Image
        src={quizStartImage}
        alt="해외축구 입문 테스트 — 내 운명의 팀은 어디일까?"
        placeholder="blur"
        preload
        className="h-auto w-full rounded-2xl"
      />

      <Link
        href="/football/quiz/play"
        className="rounded-full bg-foreground px-10 py-4 text-lg font-semibold text-background transition-opacity hover:opacity-80"
      >
        퀴즈 시작하기
      </Link>
    </main>
  );
}
