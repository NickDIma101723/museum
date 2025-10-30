'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface JaggedFrameProps {
  children?: React.ReactNode;
  className?: string;
}

export default function JaggedFrame({ children, className = '' }: JaggedFrameProps) {
  const frameRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !frameRef.current) return;

    const container = containerRef.current;
    const frame = frameRef.current;
    
    const updatePath = () => {
      const { width, height } = container.getBoundingClientRect();
      const radius = 60; // Corner radius
      const path = `
        M ${radius},0 
        L ${width * 0.4},0 L ${width * 0.45},6 
        L ${width * 0.7},0
        L ${width - radius},0 
        Q ${width},0 ${width},${radius}
        L ${width},${height * 0.3} L ${width - 6},${height * 0.4}
        L ${width},${height * 0.6}
        L ${width},${height - radius}
        Q ${width},${height} ${width - radius},${height}
        L ${width * 0.7},${height} L ${width * 0.45},${height - 6}
        L ${width * 0.4},${height}
        L ${radius},${height}
        Q 0,${height} 0,${height - radius}
        L 6,${height * 0.6} 
        L 0,${height * 0.4}
        L 0,${radius}
        Q 0,0 ${radius},0 Z`;
      
      frame.setAttribute('d', path);

      const length = frame.getTotalLength();
      gsap.fromTo(frame, 
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut' }
      );
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    observer.observe(container);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <clipPath id="frameClip">
            <path
              d={`
                M 60,0 
                L 400,0 L 450,6 
                L 700,0
                L 940,0 
                Q 1000,0 1000,60
                L 1000,300 L 994,400
                L 1000,600
                L 1000,940
                Q 1000,1000 940,1000
                L 700,1000 L 450,994
                L 400,1000
                L 60,1000
                Q 0,1000 0,940
                L 6,600 
                L 0,400
                L 0,60
                Q 0,0 60,0 Z
              `}
              transform="scale(0.001, 0.001)"
            />
          </clipPath>
        </defs>
        <foreignObject 
          width="100%" 
          height="100%" 
          style={{ clipPath: 'url(#frameClip)' }}
        >
          <div className="w-full h-full bg-black/50" />
        </foreignObject>
        <path
          ref={frameRef}
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="transition-all duration-300"
        />
      </svg>
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}