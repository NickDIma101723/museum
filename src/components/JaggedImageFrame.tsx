'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface JaggedImageFrameProps {
  imageUrl: string;
  altText: string;
  parallax?: boolean;
  className?: string;
}

export default function JaggedImageFrame({ imageUrl, altText, parallax = false, className = '' }: JaggedImageFrameProps) {
  const frameRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const clipPathId = 'jagged-frame-clip';

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
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    observer.observe(container);

    // Set up parallax effect
    if (parallax && imageRef.current) {
      gsap.fromTo(imageRef.current,
        {
          y: '-20%',
        },
        {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
    
    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <clipPath id={clipPathId}>
            <path
              ref={frameRef}
              fill="none"
            />
          </clipPath>
        </defs>
      </svg>
      <div 
        className="relative w-full h-full overflow-hidden" 
        style={{ clipPath: `url(#${clipPathId})`, zIndex: 0 }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt={altText}
          className={`absolute inset-0 w-full h-[140%] object-cover ${parallax ? '-top-[20%]' : ''}`}
        />
      </div>
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ zIndex: 1 }}>
        <path
          ref={frameRef}
          fill="none"
          stroke="transparent"
          strokeWidth="0"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}