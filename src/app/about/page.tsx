"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const verticalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
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
      gsap.set([
        heroTitleRef.current,
        heroSubtitleRef.current,
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
      
      // Hero animations
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

      if (heroSubtitleRef.current) {
        gsap.set(heroSubtitleRef.current, { y: 50, opacity: 0 });
        gsap.to(heroSubtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: startDelay + 0.3,
          ease: "power2.out"
        });
      }

      // Story section
      if (storyRef.current) {
        gsap.set(storyRef.current, { y: 80, opacity: 0 });
        gsap.to(storyRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          ease: "power2.out"
        });
      }

      // Stats animation
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.set(stat, { scale: 0.9, opacity: 0 });
          gsap.to(stat, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            ease: "back.out(1.2)"
          });
        }
      });

      // Mission section
      if (missionRef.current) {
        gsap.set(missionRef.current, { y: 60, opacity: 0 });
        gsap.to(missionRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          ease: "power2.out"
        });
      }

      // Team grid
      if (teamGridRef.current) {
        const teamItems = teamGridRef.current.querySelectorAll('.team-item');
        gsap.set(teamItems, { y: 60, opacity: 0 });
        gsap.to(teamItems, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: teamGridRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          ease: "power2.out"
        });
      }

      // Sidebars
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

      gsap.to(hamburgerRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: startDelay + 1,
        ease: "power2.out"
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

      gsap.set(topLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(topLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.4,
        ease: "power2.out",
        transformOrigin: "left"
      });

      gsap.set(bottomLineRef.current, { scaleX: 0, opacity: 1 });
      gsap.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: startDelay + 1.6,
        ease: "power2.out",
        transformOrigin: "right"
      });
    });

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="relative min-h-screen bg-white">
      {!mounted && <div className="fixed inset-0 bg-white z-[9999]" />}
      
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Left sidebar */}
      <div
        ref={leftSidebarRef}
        className="fixed left-0 top-0 h-screen w-12 sm:w-16 border-r border-black flex flex-col z-40 opacity-0"
      >
        <div
          ref={hamburgerRef}
          className="h-12 sm:h-16 flex items-center justify-center border-b border-black opacity-0"
          style={{ display: isMenuOpen ? 'none' : 'flex' }}
        >
          <button
            onClick={toggleMenu}
            className="relative w-4 h-3 sm:w-5 sm:h-3 hover:opacity-70 transition-opacity"
          >
            <div className="absolute w-full h-0.5 bg-black origin-center top-0"></div>
            <div className="absolute w-full h-0.5 bg-black origin-center bottom-0"></div>
          </button>
        </div>
        <div className="mt-auto border-t border-black h-12 sm:h-16"></div>
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0 justify-evenly pointer-events-none hidden sm:flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { verticalLinesRef.current[i] = el; }}
            className="w-px bg-black h-full"
          ></div>
        ))}
      </div>

      {/* Right sidebar */}
      <div
        ref={rightSidebarRef}
        className="fixed right-0 top-0 h-screen w-12 sm:w-16 border-l border-black flex flex-col opacity-0 z-40"
      >
        <div
          ref={topLineRef}
          className="border-b border-black h-12 sm:h-16 opacity-0 flex items-center justify-center"
        >
          <Link 
            href="/"
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
          </Link>
        </div>
        <div
          ref={bottomLineRef}
          className="mt-auto border-t border-black h-12 sm:h-16 opacity-0"
        ></div>
      </div>

      {/* Main content */}
      <div className="ml-12 mr-12 sm:ml-16 sm:mr-16">
        
        {/* Hero Section - Bold Asymmetric */}
        <section className="min-h-screen flex items-end pb-32 px-6 relative">
          <div className="absolute top-1/4 right-0 text-[12vw] md:text-[18vw] font-bold opacity-[0.03] leading-none select-none">1985</div>
          <div className="w-full">
            <h1 
              ref={heroTitleRef}
              className="text-[clamp(4rem,18vw,28rem)] font-bold leading-[0.75] text-black tracking-tighter opacity-0 mb-8"
            >
              ABOUT<br/>
              <span className="text-[clamp(2rem,9vw,14rem)] font-light italic">the museum</span>
            </h1>
            <p 
              ref={heroSubtitleRef}
              className="text-xl md:text-3xl font-light max-w-2xl opacity-0 ml-auto"
            >
              Where contemporary art transcends tradition and innovation becomes legacy
            </p>
          </div>
        </section>

        {/* Intro Statement - Full Bleed */}
        <section ref={storyRef} className="px-6 py-32 bg-black text-white -mx-6 sm:-mx-10 lg:-mx-16 mb-32 opacity-0">
          <div className="max-w-6xl mx-auto">
            <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-12">
              Since 1985, we&apos;ve been redefining what a museum can be—
              <span className="italic font-normal"> not just a space to view art, but a living, breathing ecosystem where creativity thrives.</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/20">
              <div>
                <div className="text-5xl md:text-7xl font-bold mb-2">40</div>
                <div className="text-sm uppercase tracking-wider opacity-60">Years</div>
              </div>
              <div>
                <div className="text-5xl md:text-7xl font-bold mb-2">200+</div>
                <div className="text-sm uppercase tracking-wider opacity-60">Artists</div>
              </div>
              <div>
                <div className="text-5xl md:text-7xl font-bold mb-2">50K</div>
                <div className="text-sm uppercase tracking-wider opacity-60">Visitors</div>
              </div>
              <div>
                <div className="text-5xl md:text-7xl font-bold mb-2">5</div>
                <div className="text-sm uppercase tracking-wider opacity-60">Floors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Story - Asymmetric Grid */}
        <section className="px-6 mb-32">
          <div className="grid grid-cols-12 gap-6">
            {/* Large Image */}
            <div className="col-span-12 lg:col-span-7 relative group cursor-pointer">
              <div className="aspect-[16/10] bg-black overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1400&h=900&fit=crop&q=80"
                  alt="Gallery space"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-6xl font-bold">50K</div>
                <div className="text-xs uppercase tracking-wider">SQ FT</div>
              </div>
            </div>

            {/* Text Block */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <div className="text-xs tracking-[0.3em] font-bold mb-6 text-gray-400">THE EVOLUTION</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                From Underground to Iconic
              </h2>
              <p className="text-lg font-light leading-relaxed mb-6">
                What began as a rebellious 500 sq ft gallery in downtown SoHo has transformed into 
                a 50,000 sq ft cultural landmark. We didn&apos;t follow the rules—we rewrote them.
              </p>
              <p className="text-lg font-light leading-relaxed">
                Today, we house one of North America&apos;s most progressive contemporary art collections, 
                spanning sculpture, digital art, installations, and immersive experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Mission - Bold Statement */}
        <section ref={missionRef} className="px-6 mb-32 opacity-0">
          <div className="border-y-8 border-black py-24 text-center hover:bg-black hover:text-white transition-all duration-700 cursor-pointer group">
            <div className="text-xs tracking-[0.3em] font-bold mb-8 opacity-50 group-hover:opacity-80">OUR PHILOSOPHY</div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-6xl mx-auto">
              ART IS NOT<br/>
              A <span className="italic">SPECTATOR</span><br/>
              SPORT
            </h2>
          </div>
        </section>

        {/* Image Mosaic */}
        <section className="px-6 mb-32">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3 lg:col-span-2 aspect-square bg-black overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=600&fit=crop&q=80"
                alt="Artwork"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
              />
            </div>
            <div className="col-span-3 lg:col-span-2 aspect-square bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
              <div>
                <div className="text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">150+</div>
                <div className="text-xs uppercase tracking-wider">Artworks</div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-2 aspect-square lg:row-span-2 bg-black overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=1200&fit=crop&q=80"
                alt="Installation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="col-span-3 lg:col-span-2 aspect-square bg-black overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=600&fit=crop&q=80"
                alt="Sculpture"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-all duration-700"
              />
            </div>
            <div className="col-span-3 lg:col-span-2 aspect-square bg-black overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop&q=80"
                alt="Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Team - Editorial Style */}
        <section ref={teamGridRef} className="px-6 mb-32">
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] font-bold mb-4 text-gray-400">LEADERSHIP</div>
            <h2 className="text-5xl md:text-7xl font-bold">The Visionaries</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="team-item group cursor-pointer">
              <div className="aspect-[3/4] bg-black overflow-hidden mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&q=80"
                  alt="Sarah Mitchell"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="relative">
                <div className="text-8xl font-bold absolute -top-20 left-0 opacity-10 select-none">01</div>
                <h3 className="text-3xl font-bold mb-2 relative z-10">Sarah Mitchell</h3>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Chief Curator</p>
                <p className="text-base font-light leading-relaxed">
                  20 years shaping contemporary narratives. Former MoMA curator, Guggenheim fellow.
                </p>
              </div>
            </div>

            <div className="team-item group cursor-pointer">
              <div className="aspect-[3/4] bg-black overflow-hidden mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80"
                  alt="James Chen"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="relative">
                <div className="text-8xl font-bold absolute -top-20 left-0 opacity-10 select-none">02</div>
                <h3 className="text-3xl font-bold mb-2 relative z-10">James Chen</h3>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Executive Director</p>
                <p className="text-base font-light leading-relaxed">
                  Visionary leader transforming museum experiences through technology and accessibility.
                </p>
              </div>
            </div>

            <div className="team-item group cursor-pointer">
              <div className="aspect-[3/4] bg-black overflow-hidden mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&q=80"
                  alt="Maria Rodriguez"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="relative">
                <div className="text-8xl font-bold absolute -top-20 left-0 opacity-10 select-none">03</div>
                <h3 className="text-3xl font-bold mb-2 relative z-10">Maria Rodriguez</h3>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Head of Education</p>
                <p className="text-base font-light leading-relaxed">
                  Building bridges between art and communities. Award-winning educator and advocate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Modern Cards */}
        <section className="px-6 mb-32">
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] font-bold mb-4 text-gray-400">WHAT DRIVES US</div>
            <h2 className="text-5xl md:text-7xl font-bold">Core Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-8 border-black p-12 bg-white hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[12rem] font-bold opacity-5 leading-none select-none">01</div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Access for All</h3>
              <p className="text-lg font-light leading-relaxed relative z-10">
                Art shouldn&apos;t be exclusive. We break down barriers—free admission days, 
                multilingual guides, sensory-friendly hours, and community partnerships.
              </p>
            </div>

            <div className="border-8 border-black p-12 bg-black text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[12rem] font-bold opacity-10 leading-none select-none group-hover:opacity-5">02</div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Radical Innovation</h3>
              <p className="text-lg font-light leading-relaxed relative z-10">
                From VR installations to AI-generated art, we embrace technology as a medium. 
                The future of art is being written here.
              </p>
            </div>

            <div className="border-8 border-black p-12 bg-black text-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[12rem] font-bold opacity-10 leading-none select-none group-hover:opacity-5">03</div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Diverse Voices</h3>
              <p className="text-lg font-light leading-relaxed relative z-10">
                50% of our exhibitions feature underrepresented artists. We amplify voices 
                that challenge, inspire, and provoke new ways of seeing.
              </p>
            </div>

            <div className="border-8 border-black p-12 bg-white hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[12rem] font-bold opacity-5 leading-none select-none">04</div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">Living Community</h3>
              <p className="text-lg font-light leading-relaxed relative z-10">
                More than a museum—we&apos;re a gathering space. Artist talks, workshops, 
                late-night events, and collaborations that spark connection.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="px-6 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-4xl font-light leading-relaxed mb-12">
              We believe art has the power to transform, challenge, and unite. 
              <span className="italic font-normal"> Every exhibition is an invitation to see the world differently.</span>
            </p>
            <div className="inline-block border-4 border-black px-12 py-6 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
              <span className="text-lg font-bold tracking-wider">VISIT US</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
