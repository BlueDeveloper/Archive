'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileFixedCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`mobile-fixed-cta ${visible ? 'mobile-fixed-cta--visible' : ''}`}>
      <Link href="/contact" className="mobile-fixed-cta-btn">
        프로젝트 문의하기
      </Link>
    </div>
  );
}
