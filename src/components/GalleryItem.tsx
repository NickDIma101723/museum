'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function GalleryItem({ imageSrc, title, description }: GalleryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !imageRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(imageRef.current, {
      scale: 1.3,
      duration: 1.5,
      ease: 'power2.out'
    })
    .from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=1');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={itemRef} className="group relative">
      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={`filmShape-${title.replace(/\s/g, '')}`} clipPathUnits="objectBoundingBox">
            <path d="M 0.05,0 H 0.95 Q 1,0 1,0.05 V 0.95 Q 1,1 0.95,1 H 0.05 Q 0,1 0,0.95 V 0.05 Q 0,0 0.05,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Image Container with Clip Path */}
      <div 
        className="aspect-[4/5] overflow-hidden relative"
        style={{ 
          clipPath: `url(#filmShape-${title.replace(/\s/g, '')})`,
          WebkitClipPath: `url(#filmShape-${title.replace(/\s/g, '')})`
        }}
      >
        <div 
          ref={imageRef}
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text Content */}
      <div ref={textRef} className="mt-6">
        <h3 className="text-2xl font-bold mb-2 text-black">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
