'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TopLoaderComponent() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    setVisible(true);
    setProgress(10);

    const growInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(growInterval);
          return prev;
        }
        const rate = prev < 70 ? 5 : prev < 90 ? 2 : 0.5;
        return Math.min(prev + rate, 98);
      });
    }, 200);

    return () => clearInterval(growInterval);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => {
      setProgress(100);
      const hideTimeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(hideTimeout);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        boxShadow: '0 0 10px #00c6ff, 0 0 5px #0072ff',
        opacity: visible || progress > 0 ? 1 : 0,
        transition: 'width 0.3s ease, opacity 0.5s ease',
        zIndex: 9999,
      }}
    />
  );
}
