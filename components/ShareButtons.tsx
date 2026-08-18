"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 미지원(비보안 컨텍스트) - 조용히 무시
    }
  }

  function shareX() {
    const params = new URLSearchParams({
      text: "해외축구 팀 성향 테스트 - 감독이 되어 찾는 나의 팀",
      url: window.location.href,
    });
    window.open(
      `https://twitter.com/intent/tweet?${params}`,
      "_blank",
      "popup=true,width=550,height=420,noopener,noreferrer",
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={shareX}
        aria-label="X로 공유"
        className="flex size-14 items-center justify-center rounded-full bg-black text-white"
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
        </svg>
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={copyLink}
          aria-label="링크 복사"
          className="flex size-14 items-center justify-center rounded-full bg-white text-[#2c2735]"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>

        {copied && (
          <span
            role="status"
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold"
          >
            링크를 복사했어요
          </span>
        )}
      </div>
    </div>
  );
}
