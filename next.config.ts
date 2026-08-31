import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MVP 동안만 - 홈·카테고리 페이지 생기면 삭제
  async redirects() {
    return [
      { source: "/", destination: "/football/quiz", permanent: false },
      { source: "/football", destination: "/football/quiz", permanent: false },
    ];
  },
};

export default nextConfig;
