'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function KakaoChat() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <a
      href="https://pf.kakao.com/_xbzxoTX/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="kakao-chat-btn"
      aria-label="카카오톡 상담"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="32"
        height="32"
        fill="none"
      >
        <rect width="256" height="256" rx="60" fill="#FEE500" />
        <path
          d="M128 60c-44.183 0-80 29.668-80 66.264 0 23.546 15.672 44.21 39.244 55.855l-8.042 29.184c-.608 2.206 1.932 3.99 3.874 2.718l34.07-22.298c3.558.476 7.18.726 10.854.726 44.183 0 80-29.668 80-66.185C208 89.668 172.183 60 128 60Z"
          fill="#3C1E1E"
        />
      </svg>
    </a>
  );
}
