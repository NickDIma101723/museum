"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import GalleryItem from "@/components/GalleryItem";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const verticalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Animate hamburger to X
      gsap.to(line1Ref.current, {
        rotation: 45,
        top: '50%',
        y: '-50%',
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(line2Ref.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
      });
      gsap.to(line3Ref.current, {
        rotation: -45,
        top: '50%',
        y: '-50%',
        duration: 0.4,
        ease: "power3.inOut"
      });
    } else {
      // Animate X back to hamburger
      gsap.to(line1Ref.current, {
        rotation: 0,
        top: '0',
        y: '0%',
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(line2Ref.current, {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: "power2.inOut"
      });
      gsap.to(line3Ref.current, {
        rotation: 0,
        top: '100%',
        y: '-100%',
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isMenuOpen]);

  // Hero text refs
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (!mounted) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const ctx = gsap.context(() => {
      // Hero text animations
      if (heroTitleRef.current) {
        gsap.from(heroTitleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 1.5,
          ease: "power3.out"
        });
      }

      if (heroDescRef.current) {
        gsap.from(heroDescRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 1.8,
          ease: "power3.out"
        });
      }

      // Left sidebar animation
      gsap.from(leftSidebarRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Hamburger menu icon animation
      gsap.from(hamburgerRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        delay: 0.8,
        ease: "power2.out"
      });

      // Hamburger lines animation
      gsap.from(line1Ref.current, {
        width: 0,
        duration: 0.3,
        delay: 1,
        ease: "power2.out"
      });

      gsap.from(line2Ref.current, {
        width: 0,
        duration: 0.3,
        delay: 1.1,
        ease: "power2.out"
      });

      gsap.from(line3Ref.current, {
        width: 0,
        duration: 0.3,
        delay: 1.2,
        ease: "power2.out"
      });

      // Vertical lines animation
      verticalLinesRef.current.forEach((line, index) => {
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            opacity: 0,
            duration: 1.2,
            delay: 0.3 + index * 0.1,
            ease: "expo.out",
            transformOrigin: "top"
          });
        }
      });
      gsap.from(rightSidebarRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power2.out"
      });

      // Top horizontal line animation
      gsap.from(topLineRef.current, {
        scaleX: 0,
        duration: 0.6,
        delay: 0.9,
        ease: "power2.out",
        transformOrigin: "right"
      });

      // Bottom horizontal line animation
      gsap.from(bottomLineRef.current, {
        scaleX: 0,
        duration: 0.6,
        delay: 1,
        ease: "power2.out",
        transformOrigin: "right"
      });
    });

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="relative min-h-screen">
      {/* Navbar Component */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Left sidebar */}
      <div
        ref={leftSidebarRef}
        className="fixed left-0 top-0 h-screen w-12 sm:w-16 border-r border-black flex flex-col"
      >
        {/* Hamburger menu */}
        <div
          ref={hamburgerRef}
          className="h-12 sm:h-16 flex items-center justify-center border-b border-black"
        >
          <button
            onClick={toggleMenu}
            className="relative w-4 h-3 sm:w-5 sm:h-4 hover:opacity-70 transition-opacity"
          >
            <div
              ref={line1Ref}
              className="absolute w-full h-0.5 bg-black origin-center"
            ></div>
            <div
              ref={line2Ref}
              className="absolute w-full h-0.5 bg-black origin-center top-1/2 -translate-y-1/2"
            ></div>
            <div
              ref={line3Ref}
              className="absolute w-full h-0.5 bg-black origin-center bottom-0"
            ></div>
          </button>
        </div>

        {/* Bottom horizontal line */}
        <div className="mt-auto border-t border-black h-12 sm:h-16"></div>
      </div>

      {/* Vertical black lines */}
      <div className="absolute inset-0 justify-evenly pointer-events-none hidden sm:flex">
        <div
          ref={(el) => { verticalLinesRef.current[0] = el; }}
          className="w-px bg-black h-full"
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[1] = el; }}
          className="w-px bg-black h-full"
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[2] = el; }}
          className="w-px bg-black h-full"
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[3] = el; }}
          className="w-px bg-black h-full"
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[4] = el; }}
          className="w-px bg-black h-full"
        ></div>
      </div>

      {/* Right sidebar line */}
      <div
        ref={rightSidebarRef}
        className="fixed right-0 top-0 h-screen w-12 sm:w-16 border-l border-black flex flex-col"
      >
        {/* Top horizontal line */}
        <div
          ref={topLineRef}
          className="border-b border-black h-12 sm:h-16"
        ></div>
        
        {/* Bottom horizontal line */}
        <div
          ref={bottomLineRef}
          className="mt-auto border-t border-black h-12 sm:h-16"
        ></div>
      </div>

      {/* Main content area */}
      <div className="ml-12 mr-12 sm:ml-16 sm:mr-16">
        <div className="px-4 sm:px-8 lg:px-16">
          {/* Hero Section with staggered text animation */}
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div ref={heroTitleRef} className="mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold leading-[0.95] mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            A MODERN MUSEUM
          </h1>
        </div>
        
        <div ref={heroDescRef}>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl leading-relaxed">
            Exploring the intersection of art, culture, and innovation in contemporary society.
          </p>
        </div>
      </section>

      {/* Featured Films Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black">Featured Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <GalleryItem 
            imageSrc="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=750&fit=crop"
            title="The Journey"
            description="A compelling story of discovery and transformation"
          />
          <GalleryItem 
            imageSrc="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=750&fit=crop"
            title="Echoes"
            description="Sound and silence in modern cinema"
          />
          <GalleryItem 
            imageSrc="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=750&fit=crop"
            title="Urban Dreams"
            description="City life through a new lens"
          />
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
