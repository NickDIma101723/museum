"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import WaveLoading from "@/components/WaveLoading";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
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
    
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      // Already visited - skip loading screen
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Animate 2-line hamburger to X
      gsap.to(line1Ref.current, {
        rotation: 45,
        top: '50%',
        y: '-50%',
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(line3Ref.current, {
        rotation: -45,
        top: '50%',
        y: '-50%',
        duration: 0.4,
        ease: "power3.inOut"
      });
    } else {
      // Animate X back to 2-line hamburger
      gsap.to(line1Ref.current, {
        rotation: 0,
        top: '0',
        y: '0%',
        duration: 0.4,
        ease: "power3.inOut"
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
  
  // Split image refs - three layers
  const splitImageContainerRef = useRef<HTMLDivElement>(null);

  // Enable scroll on home page
  useEffect(() => {
    if (!mounted) return;
    
    // Allow scrolling on the body
    document.body.style.overflow = 'auto';
    
    return () => {
      // Clean up
      document.body.style.overflow = 'auto';
    };
  }, [mounted]);

  // Lenis smooth scroll
  useEffect(() => {
    if (!mounted || isLoading) return;

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

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, [mounted, isLoading]);

  useEffect(() => {
    if (!mounted || isLoading) return;
    
    const ctx = gsap.context(() => {
      // Set initial states - everything hidden
      gsap.set([
        heroTitleRef.current?.querySelectorAll('h1'),
        heroDescRef.current?.querySelector('p'),
        leftSidebarRef.current,
        rightSidebarRef.current,
        hamburgerRef.current,
        topLineRef.current,
        bottomLineRef.current,
        ...verticalLinesRef.current.filter(Boolean)
      ], {
        opacity: 0
      });
      
      const startDelay = 0.3;
      
      // Hero title animation - slide up from below
      if (heroTitleRef.current) {
        const titleLines = heroTitleRef.current.querySelectorAll('h1');
        
        gsap.set(titleLines, { y: 100, opacity: 0 });
        gsap.to(titleLines, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.25,
          delay: startDelay,
          ease: "power3.out"
        });
      }
      
      // Description animation - fade in with slide up
      if (heroDescRef.current) {
        const text = heroDescRef.current.querySelector('p');
        
        if (text) {
          gsap.set(text, { y: 40, opacity: 0 });
          gsap.to(text, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: startDelay + 1,
            ease: "power2.out"
          });
        }
      }

      // Sidebars animation
      gsap.to(leftSidebarRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: startDelay + 0.2,
        ease: "power2.out"
      });

      gsap.to(rightSidebarRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: startDelay + 0.3,
        ease: "power2.out"
      });

      // Hamburger container animation
      gsap.to(hamburgerRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: startDelay + 1,
        ease: "power2.out"
      });

      // Hamburger lines - draw in with stagger
      gsap.set([line1Ref.current, line3Ref.current], { scaleX: 0, opacity: 1 });
      
      gsap.to(line1Ref.current, {
        scaleX: 1,
        duration: 0.8,
        delay: startDelay + 1.2,
        ease: "power2.out",
        transformOrigin: "left"
      });
      
      gsap.to(line3Ref.current, {
        scaleX: 1,
        duration: 0.8,
        delay: startDelay + 1.35,
        ease: "power2.out",
        transformOrigin: "right"
      });

      // Vertical lines - grow from bottom to top with wave effect
      verticalLinesRef.current.forEach((line, index) => {
        if (line) {
          gsap.set(line, { scaleY: 0, opacity: 1 });
          gsap.to(line, {
            scaleY: 1,
            duration: 1.4,
            delay: startDelay + 0.6 + index * 0.12,
            ease: "power3.out",
            transformOrigin: "bottom"
          });
        }
      });

      // Top horizontal line - draw from left to right
      gsap.set(topLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(topLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.4,
        ease: "power2.out",
        transformOrigin: "left"
      });

      // Bottom horizontal line - draw from right to left
      gsap.set(bottomLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.6,
        ease: "power2.out",
        transformOrigin: "right"
      });

      // No animation - just display the image
    });

    return () => ctx.revert();
  }, [mounted, isLoading]);

  return (
    <>
      {/* Wave Loading Screen */}
      {isLoading && <WaveLoading onComplete={() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }} />}
      
      {/* White background until loading completes */}
      {isLoading && <div className="fixed inset-0 bg-white z-[9998]" />}
      
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
            className="relative w-4 h-3 sm:w-5 sm:h-3 hover:opacity-70 transition-opacity"
          >
            <div
              ref={line1Ref}
              className="absolute w-full h-0.5 bg-black origin-center top-0"
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
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-12 md:px-20 lg:px-32">
        <div ref={heroTitleRef} className="space-y-8">
          <div className="overflow-hidden">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold leading-[0.9] text-black">
              A MODERN
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold leading-[0.9] text-black">
              MUSEUM
            </h1>
          </div>
          
          <div ref={heroDescRef} className="pt-6">
            <p className="text-xl md:text-2xl lg:text-3xl tracking-[0.3em] text-gray-500 uppercase">
              EST. 2025
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* Image Section */}
      <section 
        ref={splitImageContainerRef} 
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="relative w-full h-[60vh] border-4 border-black">
          <img 
            src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=2400&h=1600&fit=crop&q=80"
            alt="Museum art"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>
      </section>
      </div>
    </>
  );
}
