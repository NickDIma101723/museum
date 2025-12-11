"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip transition on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      (window as any).pageTransitioning = false;
      return;
    }

    // Only show transition when going TO contact page
    if (pathname === "/contact") {
      (window as any).pageTransitioning = true;
      setIsTransitioning(true);
      
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        (window as any).pageTransitioning = false;
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      (window as any).pageTransitioning = false;
    }
  }, [pathname]);

  if (!isTransitioning) return null;

  // Only upward animation for contact page
  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none flex">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-black"
          style={{
            animation: `slideUp 1.5s cubic-bezier(0.76, 0, 0.24, 1) ${i * 0.08}s forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
