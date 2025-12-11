"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const closeLine1Ref = useRef<HTMLDivElement>(null);
  const closeLine2Ref = useRef<HTMLDivElement>(null);
  const museumTitleRef = useRef<HTMLDivElement>(null);
  const bottomInfoRef = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);

  // Cursor images for each section
  const cursorImages: { [key: string]: string } = {
    exhibitions: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=400&fit=crop&q=80",
    collections: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=400&fit=crop&q=80",
    visit: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=400&fit=crop&q=80",
    about: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400&h=400&fit=crop&q=80",
    contact: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=400&fit=crop&q=80"
  };

  // Mouse follow effect for cursor image
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorImageRef.current) return;
      
      gsap.to(cursorImageRef.current, {
        x: e.clientX + 30,
        y: e.clientY + 30,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMenuOpen]);

  // Show/hide cursor image based on hover state
  useEffect(() => {
    if (!cursorImageRef.current) return;

    if (hoveredItem) {
      gsap.to(cursorImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(cursorImageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [hoveredItem]);

  useEffect(() => {
    if (isMenuOpen) {
      // Animate dropdown sliding in from top
      if (dropdownRef.current) {
        gsap.set(dropdownRef.current, { display: 'block' });
        gsap.fromTo(dropdownRef.current, 
          {
            y: '-100%'
          },
          {
            y: '0%',
            duration: 0.9,
            ease: "power3.inOut"
          }
        );
      }

      // Animate close button lines
      if (closeButtonRef.current) {
        gsap.fromTo(closeLine1Ref.current,
          {
            rotation: 0,
            width: 0
          },
          {
            rotation: 45,
            width: 24,
            duration: 0.8,
            delay: 0.4,
            ease: "expo.out"
          }
        );
        gsap.fromTo(closeLine2Ref.current,
          {
            rotation: 0,
            width: 0
          },
          {
            rotation: -45,
            width: 24,
            duration: 0.8,
            delay: 0.45,
            ease: "expo.out"
          }
        );
      }

      // Animate museum title
      if (museumTitleRef.current) {
        gsap.fromTo(museumTitleRef.current,
          {
            x: -100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
          }
        );
      }

      // Animate bottom info
      if (bottomInfoRef.current) {
        gsap.fromTo(bottomInfoRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
          }
        );
      }

      // Animate menu items with stagger
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        {
          y: -30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: "power3.out"
        }
      );
    } else {
      // Animate close button lines out first
      if (closeLine1Ref.current && closeLine2Ref.current) {
        gsap.to([closeLine1Ref.current, closeLine2Ref.current], {
          width: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }

      // Animate menu items out
      gsap.to(menuItemsRef.current.filter(Boolean), {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in"
      });

      // Animate museum title out
      if (museumTitleRef.current) {
        gsap.to(museumTitleRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });
      }

      // Animate bottom info out
      if (bottomInfoRef.current) {
        gsap.to(bottomInfoRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        });
      }

      // Animate dropdown sliding out to top
      if (dropdownRef.current) {
        gsap.to(dropdownRef.current, {
          y: '-100%',
          duration: 0.8,
          delay: 0.3,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(dropdownRef.current, { display: 'none' });
          }
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={dropdownRef}
      className="fixed inset-0 bg-white z-50 overflow-hidden"
      style={{ display: 'none', transform: 'translateY(-100%)' }}
    >
      {/* Close button matching hamburger position */}
      <div 
        ref={closeButtonRef}
        className="fixed left-0 top-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center z-50"
      >
        <button
          onClick={toggleMenu}
          className="relative w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <div 
            ref={closeLine1Ref}
            className="absolute h-0.5 bg-black"
            style={{ width: 0 }}
          ></div>
          <div 
            ref={closeLine2Ref}
            className="absolute h-0.5 bg-black"
            style={{ width: 0 }}
          ></div>
        </button>
      </div>

      {/* Big Museum Title at Top */}
      <div ref={museumTitleRef} className="absolute top-16 left-4 sm:top-20 sm:left-20">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-light tracking-tight leading-none">MODERN ART</h1>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-none mt-1 sm:mt-2">COLLECTIVE</h1>
      </div>

      {/* Custom Cursor Image - Follows Mouse */}
      <div 
        ref={cursorImageRef}
        className="fixed pointer-events-none z-50"
        style={{ 
          opacity: 0,
          transform: 'translate(0, -50%)',
          width: '250px',
          height: '350px'
        }}
      >
        {hoveredItem && (
          <img 
            key={hoveredItem}
            src={cursorImages[hoveredItem]}
            alt={hoveredItem}
            className="w-full h-full object-cover shadow-2xl"
          />
        )}
      </div>

      {/* Navigation Items - Centered */}
      <div className="h-full flex items-center justify-center relative z-20 px-4 pb-32 sm:pb-0">
        <nav className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Navigation Items */}
          <div
            ref={(el) => { menuItemsRef.current[0] = el; }}
            className="relative overflow-hidden"
          >
            <a
              href="#exhibitions"
              onClick={() => toggleMenu()}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight relative cursor-pointer text-black group"
              onMouseEnter={() => {
                setHoveredItem('exhibitions');
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
              }}
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Exhibitions
              </span>
              <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                Exhibitions
              </span>
            </a>
          </div>
          <div
            ref={(el) => { menuItemsRef.current[1] = el; }}
            className="relative overflow-hidden"
          >
            <a
              href="#collections"
              onClick={() => toggleMenu()}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight relative cursor-pointer text-black group"
              onMouseEnter={() => {
                setHoveredItem('collections');
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
              }}
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Collections
              </span>
              <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                Collections
              </span>
            </a>
          </div>
          <div
            ref={(el) => { menuItemsRef.current[2] = el; }}
            className="relative overflow-hidden"
          >
            <a
              href="#visit"
              onClick={() => toggleMenu()}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight relative cursor-pointer text-black group"
              onMouseEnter={() => {
                setHoveredItem('visit');
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
              }}
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Visit
              </span>
              <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                Visit
              </span>
            </a>
          </div>
          <div
            ref={(el) => { menuItemsRef.current[3] = el; }}
            className="relative overflow-hidden"
          >
            <Link
              href="/about"
              onClick={() => toggleMenu()}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight relative cursor-pointer text-black group"
              onMouseEnter={() => {
                setHoveredItem('about');
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
              }}
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                About
              </span>
              <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                About
              </span>
            </Link>
          </div>
          <div
            ref={(el) => { menuItemsRef.current[4] = el; }}
            className="relative overflow-hidden"
          >
            <Link
              href="/contact"
              onClick={() => toggleMenu()}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight relative cursor-pointer text-black group"
              onMouseEnter={() => {
                setHoveredItem('contact');
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
              }}
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Contact
              </span>
              <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                Contact
              </span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom Info */}
      <div ref={bottomInfoRef} className="absolute bottom-16 sm:bottom-12 left-0 right-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-0 px-4 sm:px-20">
          {/* Left - Contact */}
          <div className="space-y-4 sm:space-y-8 w-full sm:w-auto">
            <div className="space-y-1">
              <p className="text-xs tracking-[0.2em] uppercase opacity-30 font-light">Inquiries</p>
              <a 
                href="mailto:info@modernartcollective.com" 
                className="block text-xs sm:text-sm font-light opacity-60 transition-opacity duration-300 hover:opacity-100 break-all"
              >
                info@modernartcollective.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-xs tracking-[0.2em] uppercase opacity-30 font-light">Visits</p>
              <a 
                href="mailto:visit@modernartcollective.com" 
                className="block text-xs sm:text-sm font-light opacity-60 transition-opacity duration-300 hover:opacity-100 break-all"
              >
                visit@modernartcollective.com
              </a>
            </div>
          </div>

          {/* Right - Social */}
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-xs tracking-[0.2em] uppercase opacity-30 mb-3 sm:mb-4 font-light">Follow</p>
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-2">
              <a 
                href="#" 
                className="text-sm font-light opacity-60 transition-all duration-300 hover:opacity-100 hover:tracking-wider"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-sm font-light opacity-60 transition-all duration-300 hover:opacity-100 hover:tracking-wider"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-sm font-light opacity-60 transition-all duration-300 hover:opacity-100 hover:tracking-wider"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
