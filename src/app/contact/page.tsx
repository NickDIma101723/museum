"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import ScrollVelocity from "@/components/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const verticalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formInputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formHeaderRef = useRef<HTMLHeadingElement>(null);
  const formDescRef = useRef<HTMLParagraphElement>(null);
  const floatingContact1Ref = useRef<HTMLDivElement>(null);
  const floatingContact2Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerContentRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackHome = () => {
    // Create wave transition overlay from bottom to top, right to left
    const transitionEl = document.createElement('div');
    transitionEl.className = 'fixed inset-0 z-[10000] flex';
    transitionEl.innerHTML = Array.from({ length: 10 }, (_, i) => 
      `<div class="flex-1 bg-black" style="transform: translateY(100%); animation: slideUpSlowly 2.5s cubic-bezier(0.76, 0, 0.24, 1) ${(9-i) * 0.1}s forwards;"></div>`
    ).join('');
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUpSlowly {
        0% { transform: translateY(100%); }
        30% { transform: translateY(0); }
        70% { transform: translateY(0); }
        100% { transform: translateY(-100%); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(transitionEl);
    
    // Navigate after bars cover screen
    setTimeout(() => {
      router.push('/');
    }, 1500);
    
    // Clean up
    setTimeout(() => {
      transitionEl.remove();
      style.remove();
    }, 4500);
  };

  useEffect(() => {
    // Wait for page transition to complete before mounting
    const checkTransition = () => {
      if (!(window as Window & { pageTransitioning?: boolean }).pageTransitioning) {
        setMounted(true);
      } else {
        setTimeout(checkTransition, 100);
      }
    };
    
    checkTransition();
  }, []);



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
      // Set initial states - everything hidden
      gsap.set([
        heroTitleRef.current,
        contactFormRef.current,
        contactInfoRef.current,
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
      
      // Hero title animation
      if (heroTitleRef.current) {
        gsap.set(heroTitleRef.current, { y: 100, opacity: 0 });
        gsap.to(heroTitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          delay: startDelay,
          ease: "power3.out"
        });
      }
      
      // Floating contact cards
      if (floatingContact1Ref.current) {
        gsap.set(floatingContact1Ref.current, { x: 50, opacity: 0 });
        gsap.to(floatingContact1Ref.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: startDelay + 0.6,
          ease: "power2.out"
        });
      }
      
      if (floatingContact2Ref.current) {
        gsap.set(floatingContact2Ref.current, { x: -50, opacity: 0 });
        gsap.to(floatingContact2Ref.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: startDelay + 0.8,
          ease: "power2.out"
        });
      }
      
      // Contact form animation - immediate on page load
      if (contactFormRef.current) {
        gsap.set(contactFormRef.current, { opacity: 1 });
        
        // Form header animations
        if (formHeaderRef.current) {
          gsap.set(formHeaderRef.current, { y: 60, opacity: 0 });
          gsap.to(formHeaderRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: startDelay + 0.4,
            ease: "power2.out"
          });
        }
        
        if (formDescRef.current) {
          gsap.set(formDescRef.current, { y: 30, opacity: 0 });
          gsap.to(formDescRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: startDelay + 0.6,
            ease: "power2.out"
          });
        }
        
        // Animate form inputs with stagger immediately
        const validInputs = formInputsRef.current.filter(Boolean);
        gsap.set(validInputs, { y: 50, opacity: 0 });
        
        validInputs.forEach((input, index) => {
          gsap.to(input, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: startDelay + 0.8 + (index * 0.1),
            ease: "power2.out"
          });
        });
      }
      
      // Contact info animation
      if (contactInfoRef.current) {
        gsap.set(contactInfoRef.current, { y: 60, opacity: 0 });
        gsap.to(contactInfoRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: startDelay + 0.5,
          ease: "power2.out"
        });
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

      // Hamburger lines
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

      // Vertical lines
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

      // Top horizontal line
      gsap.set(topLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(topLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.4,
        ease: "power2.out",
        transformOrigin: "left"
      });

      // Bottom horizontal line
      gsap.set(bottomLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.6,
        ease: "power2.out",
        transformOrigin: "right"
      });
      
      // Parallax footer reveal effect with smooth motion
      if (footerRef.current) {
        gsap.to(footerRef.current, {
          yPercent: -60,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom-=100 top",
            scrub: 2.5,
            anticipatePin: 1,
          },
        });
      }
      
      // Footer content stagger
      const validFooterContent = footerContentRef.current.filter(Boolean);
      validFooterContent.forEach((content) => {
        gsap.set(content, { y: 60, opacity: 0 });
        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          ease: "power2.out"
        });
      });
    });

    return () => ctx.revert();
  }, [mounted]);

  return (
    <>

      <div className="relative min-h-screen bg-white z-[-2]">
        {/* White background until animations start */}
        {!mounted && <div className="fixed inset-0 bg-white z-[9999]" />}
        
        {/* Navbar Component */}
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Left sidebar */}
      <div
        ref={leftSidebarRef}
        className="absolute left-0 top-0 h-full w-12 sm:w-16 border-r border-black flex flex-col z-40 opacity-0"
      >
        {/* Hamburger menu */}
        <div
          ref={hamburgerRef}
          className="h-12 sm:h-16 flex items-center justify-center border-b border-black opacity-0"
          style={{ display: isMenuOpen ? 'none' : 'flex' }}
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
      <div className="absolute inset-0 justify-evenly pointer-events-none hidden sm:flex" style={{ height: '100%' }}>
        <div
          ref={(el) => { verticalLinesRef.current[0] = el; }}
          className="w-px bg-black"
          style={{ height: '100%' }}
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[1] = el; }}
          className="w-px bg-black"
          style={{ height: '100%' }}
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[2] = el; }}
          className="w-px bg-black"
          style={{ height: '100%' }}
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[3] = el; }}
          className="w-px bg-black"
          style={{ height: '100%' }}
        ></div>
        <div
          ref={(el) => { verticalLinesRef.current[4] = el; }}
          className="w-px bg-black"
          style={{ height: '100%' }}
        ></div>
      </div>

      {/* Right sidebar */}
      <div
        ref={rightSidebarRef}
        className="absolute right-0 top-0 h-full w-12 sm:w-16 border-l border-black flex flex-col opacity-0 z-40"
      >
        {/* Top square with left arrow */}
        <div
          ref={topLineRef}
          className="border-b border-black h-12 sm:h-16 opacity-0 flex items-center justify-center"
        >
          <button
            onClick={handleBackHome}
            className="group cursor-pointer"
            title="Back to Home"
          >
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-black transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
        </div>
        
        {/* Bottom square */}
        <div
          ref={bottomLineRef}
          className="mt-auto border-t border-black h-12 sm:h-16 opacity-0"
        ></div>
      </div>

      {/* Main content area */}
      <div className="ml-12 mr-12 sm:ml-16 sm:mr-16">
        
        {/* Hero Section with Large Text */}
        <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
          <div className="text-center w-full">
            <Link href="/">
              <h1 
                ref={heroTitleRef}
                className="text-[clamp(3rem,15vw,24rem)] font-bold leading-[0.8] text-black mb-8 tracking-tighter opacity-0 cursor-pointer hover:opacity-60 transition-opacity duration-300"
              >
                CONTACT
              </h1>
            </Link>
          </div>
          
          {/* Floating contact info cards */}
          <div ref={floatingContact1Ref} className="absolute top-20 right-20 text-right opacity-0">
            <p className="text-sm uppercase tracking-wider font-medium">Quick Contact</p>
            <p className="text-lg font-light mt-2">info@modernmuseum.com</p>
          </div>
          
          <div ref={floatingContact2Ref} className="absolute bottom-20 left-20 opacity-0">
            <p className="text-sm uppercase tracking-wider font-medium">Location</p>
            <p className="text-lg font-light mt-2">New York, NY</p>
          </div>
        </section>

        {/* Contact Content Section */}
        <section className="min-h-screen bg-white py-16 lg:py-20">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
            
            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* LEFT COLUMN - Contact Info (Takes 3 columns on large) */}
              <div ref={contactInfoRef} className="lg:col-span-3 space-y-6 opacity-0">
                
                {/* Visit Us */}
                <div className="border-4 border-black p-8 bg-white relative z-10">
                  <div className="text-xs tracking-[0.3em] font-bold mb-4">VISIT US</div>
                  <h3 className="text-3xl font-bold mb-5 leading-tight">
                    123 MODERN<br/>
                    AVENUE
                  </h3>
                  <p className="text-base font-medium mb-6">
                    Art District<br/>
                    New York, NY 10001<br/>
                    United States
                  </p>
                  <div className="pt-5 border-t-2 border-black space-y-2">
                    <a href="tel:+12125551234" className="block text-lg font-bold hover:opacity-60 transition-opacity">
                      +1 (212) 555-1234
                    </a>
                    <a href="mailto:info@modernmuseum.com" className="block text-sm font-medium hover:opacity-60 transition-opacity">
                      info@modernmuseum.com
                    </a>
                  </div>
                </div>

                {/* Gallery Hours */}
                <div className="border-4 border-black bg-white relative z-10">
                  <div className="bg-black text-white p-6">
                    <div className="text-xs tracking-[0.3em] font-bold">HOURS</div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white transition-colors duration-200 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black group-hover:bg-white"></div>
                          <span className="text-sm font-bold tracking-wider">TUE—FRI</span>
                        </div>
                        <span className="text-lg font-medium">10—18</span>
                      </div>
                    </div>
                    <div className="border-4 border-black p-5 bg-white hover:bg-black hover:text-white transition-colors duration-200 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black group-hover:bg-white"></div>
                          <span className="text-sm font-bold tracking-wider">SAT—SUN</span>
                        </div>
                        <span className="text-lg font-medium">10—20</span>
                      </div>
                    </div>
                    <div className="border-4 border-black p-5 bg-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-400"></div>
                          <span className="text-sm font-bold tracking-wider text-gray-500">MONDAY</span>
                        </div>
                        <span className="text-sm font-bold tracking-wider text-gray-500">CLOSED</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-4 border-black bg-black text-white p-4 text-center">
                    <p className="text-xs font-bold tracking-[0.3em]">
                      ★ FREE FIRST FRIDAY ★
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-4 border-black p-6 text-center bg-white relative z-10">
                    <div className="text-4xl font-bold mb-1">150+</div>
                    <div className="text-xs font-medium uppercase tracking-wider">Works</div>
                  </div>
                  <div className="border-4 border-black p-6 text-center bg-white relative z-10">
                    <div className="text-4xl font-bold mb-1">25K</div>
                    <div className="text-xs font-medium uppercase tracking-wider">Visitors</div>
                  </div>
                </div>

                {/* Social */}
                <div className="border-4 border-black bg-white overflow-hidden relative z-10">
                  <div className="p-8">
                    <div className="text-xs tracking-[0.3em] font-bold mb-6 text-center">FOLLOW US</div>
                    <div className="space-y-4">
                      <a href="#" className="group relative flex items-center justify-between p-5 border-4 border-black hover:bg-black hover:text-white transition-all duration-300">
                        <span className="font-bold text-sm tracking-wider">INSTAGRAM</span>
                        <span className="text-2xl font-light group-hover:translate-x-1 transition-transform duration-300">↗</span>
                      </a>
                      <a href="#" className="group relative flex items-center justify-between p-5 border-4 border-black hover:bg-black hover:text-white transition-all duration-300">
                        <span className="font-bold text-sm tracking-wider">TWITTER</span>
                        <span className="text-2xl font-light group-hover:translate-x-1 transition-transform duration-300">↗</span>
                      </a>
                      <a href="#" className="group relative flex items-center justify-between p-5 border-4 border-black hover:bg-black hover:text-white transition-all duration-300">
                        <span className="font-bold text-sm tracking-wider">LINKEDIN</span>
                        <span className="text-2xl font-light group-hover:translate-x-1 transition-transform duration-300">↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="border-4 border-black overflow-hidden bg-white relative z-10">
                  <div className="bg-white p-8 border-b-4 border-black">
                    <div className="text-xs tracking-[0.3em] font-bold">FIND US</div>
                  </div>
                  <div className="w-full h-[400px] lg:h-[500px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6174341259936!2d-73.98823492346646!3d40.74844097138684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale"
                    ></iframe>
                  </div>
                </div>

              </div>

              {/* MIDDLE & RIGHT - Form (Takes 9 columns on large) */}
              <div ref={contactFormRef} className="lg:col-span-9 border-4 border-black p-8 lg:p-12 xl:p-16 opacity-0 bg-white relative z-10 min-h-[1600px] lg:min-h-0">
                <div className="mb-10">
                  <h2 ref={formHeaderRef} className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85]">
                    GET IN<br/>TOUCH
                  </h2>
                  <div className="w-24 h-1 bg-black mt-6"></div>
                  <p ref={formDescRef} className="text-base lg:text-lg font-medium mt-6 text-gray-700 max-w-2xl">
                    Have a question about our collection? Interested in collaborating? Planning a visit? We&apos;d love to hear from you.
                  </p>
                </div>

                <form className="space-y-8">
                  <div ref={(el) => { formInputsRef.current[0] = el; }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs tracking-[0.3em] font-bold mb-3">FIRST NAME *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.3em] font-bold mb-3">LAST NAME *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div ref={(el) => { formInputsRef.current[1] = el; }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs tracking-[0.3em] font-bold mb-3">EMAIL *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.3em] font-bold mb-3">PHONE</label>
                      <input
                        type="tel"
                        className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div ref={(el) => { formInputsRef.current[2] = el; }}>
                    <label className="block text-xs tracking-[0.3em] font-bold mb-3">SUBJECT</label>
                    <input
                      type="text"
                      className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400"
                      placeholder="What would you like to discuss?"
                    />
                  </div>

                  <div ref={(el) => { formInputsRef.current[3] = el; }}>
                    <label className="block text-xs tracking-[0.3em] font-bold mb-3">MESSAGE *</label>
                    <textarea
                      rows={8}
                      required
                      className="w-full px-0 py-4 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent text-xl font-medium placeholder-gray-400 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <div ref={(el) => { formInputsRef.current[4] = el; }} className="flex flex-col lg:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      className="group relative flex-1 bg-white text-black py-6 px-6 text-sm font-bold tracking-[0.2em] border-4 border-black overflow-hidden transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="relative z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 inline-block">SEND MESSAGE</span>
                    </button>
                    <button
                      type="reset"
                      className="group relative w-full lg:w-48 bg-white text-black py-6 px-6 text-sm font-bold tracking-[0.2em] border-4 border-black overflow-hidden transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="relative z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 inline-block">RESET</span>
                    </button>
                  </div>
                </form>

                {/* Form Footer */}
                <div className="mt-10 pt-8 border-t-2 border-black">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
                    <p className="text-sm font-medium text-gray-600">
                      * Required fields. We respond within 24-48 hours.
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                      <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
                      <span className="text-gray-400">|</span>
                      <a href="#" className="hover:opacity-60 transition-opacity">Terms of Service</a>
                    </div>
                  </div>
                  
                  {/* Multiple Velocity Scrolls */}
                  <div className="py-8 space-y-8 -mx-8 lg:-mx-12 xl:-mx-16 flex-1 flex flex-col justify-center">
                    <ScrollVelocity
                      texts={['Contact Us']}
                      velocity={40}
                      className="text-8xl md:text-[10rem] font-bold tracking-tighter opacity-20"
                      defaultDirection={-1}
                      lockDirection={true}
                    />
                    <ScrollVelocity
                      texts={['Get In Touch']}
                      velocity={50}
                      className="text-8xl md:text-[10rem] font-bold tracking-tighter opacity-15"
                      lockDirection={true}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer area container for parallax */}
        <div className="relative">
          {/* Hidden content behind footer for parallax reveal */}
          <div className="absolute inset-0 bg-black h-[60vh] flex items-center justify-center text-white z-10">
            <div className="text-center">
              <h2 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.7] tracking-tighter mb-6">
                REVEAL
              </h2>
              <p className="text-xl md:text-2xl font-light tracking-wide">
                Hidden Content Behind Footer
              </p>
            </div>
          </div>

          {/* Footer - with reveal effect */}
          <footer ref={footerRef} className="relative bg-black text-white pt-16 pb-16 z-20 mt-32 min-h-[60vh] overflow-hidden">
          <div className="w-full relative z-30 h-full">
            
            {/* Footer Grid - 4 columns like the image */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24 px-6 md:px-12 lg:px-20 relative z-30">
              
              {/* Menu Column */}
              <div ref={(el) => { footerContentRef.current[0] = el; }}>
                <h3 className="text-xl md:text-2xl font-normal mb-8">Menu</h3>
                <nav className="space-y-4">
                  <Link href="/" className="block text-lg font-light hover:translate-x-2 transition-all duration-300">Home</Link>
                  <a href="#exhibitions" className="block text-lg font-light hover:translate-x-2 transition-all duration-300">Exhibitions</a>
                  <a href="#collections" className="block text-lg font-light hover:translate-x-2 transition-all duration-300">Collections</a>
                  <a href="#visit" className="block text-lg font-light hover:translate-x-2 transition-all duration-300">Visit</a>
                  <a href="#about" className="block text-lg font-light hover:translate-x-2 transition-all duration-300">About</a>
                </nav>
              </div>

              {/* Office Column */}
              <div ref={(el) => { footerContentRef.current[1] = el; }}>
                <h3 className="text-xl md:text-2xl font-normal mb-8">Office</h3>
                <div className="space-y-3 text-lg font-light">
                  <p>Modern Museum</p>
                  <p>123 Avenue</p>
                  <p>New York, NY</p>
                  <p className="pt-3">
                    <a href="mailto:info@modernmuseum.com" className="hover:translate-x-2 inline-block transition-all duration-300">
                      Email
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours Column */}
              <div ref={(el) => { footerContentRef.current[2] = el; }}>
                <h3 className="text-xl md:text-2xl font-normal mb-8">Hours</h3>
                <div className="space-y-3 text-lg font-light">
                  <p>Mon - Fri: 10am - 6pm</p>
                  <p>Sat - Sun: 11am - 7pm</p>
                  <p>Closed: Tuesdays</p>
                </div>
              </div>

              {/* Socials Column */}
              <div ref={(el) => { footerContentRef.current[3] = el; }}>
                <h3 className="text-xl md:text-2xl font-normal mb-8">Socials</h3>
                <nav className="space-y-3 text-lg font-light">
                  <a href="#" className="block hover:translate-x-2 transition-all duration-300">Instagram</a>
                  <a href="#" className="block hover:translate-x-2 transition-all duration-300">LinkedIn</a>
                  <a href="#" className="block hover:translate-x-2 transition-all duration-300">Facebook</a>
                  <a href="#" className="block hover:translate-x-2 transition-all duration-300">Twitter/X</a>
                </nav>
              </div>

            </div>


          </div>
        </footer>
        </div>

        </div>
      </div>
    </>
  );
}