import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import quizStartImage from "@/public/quiz_start.png";
import logo from "@/public/logo.png";

export const metadata: Metadata = {
  title: "해외축구 팀 성향 테스트",
  description: "감독이 되어 찾는 나와 닮은 팀. 9문항 · 약 1분",
  openGraph: {
    title: "해외축구 팀 성향 테스트",
    description: "감독이 되어 찾는 나와 닮은 팀. 9문항 · 약 1분",
    siteName: "Newbeez",
    type: "website",
    locale: "ko_KR",
  },
};
export default function QuizIntroPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col bg-[#b0cd2a]">
      <header className="flex h-14 items-center justify-center bg-[#f2fafe]">
        <Image src={logo} alt="newbeez" height={32} className="w-auto" />
      </header>
      <main className="flex flex-1 flex-col">
        <h1 className="sr-only">해외축구 팀 성향 테스트</h1>

        <Image
          src={quizStartImage}
          alt="축구를 하는 중인 카피바라 일러스트"
          placeholder="blur"
          preload
          sizes="(max-width: 512px) 100vw, 512px"
          className="h-auto w-full"
        />

        <div className="flex flex-1 flex-col px-4 pt-6 pb-10">
          <Link
            href="/football/quiz/play"
            className="mx-auto flex h-18 w-full max-w-92 items-center justify-center rounded-full bg-[#2c2735] text-2xl font-bold text-white"
          >
            시작하기
          </Link>
        </div>
      </main>
    </div>
  );
}
