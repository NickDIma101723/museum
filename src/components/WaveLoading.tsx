'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface WaveLoadingProps {
  onComplete: () => void;
}

export default function WaveLoading({ onComplete }: WaveLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Set initial states immediately
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
      
      // Start with completely empty text
      tl.call(() => {
        setDisplayText(''); // Clear any initial text
        setShowCursor(false); // Start without cursor
      })
      
      // Smooth fade in of text container
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      
      // Type "IT'S LOADING" with cursor effect
      .call(() => {
        const text = "IT'S LOADING";
        let i = 0;
        setShowCursor(true);
        const typeInterval = setInterval(() => {
          setDisplayText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(typeInterval);
            // Hide cursor after typing
            setTimeout(() => setShowCursor(false), 500);
          }
        }, Math.random() * 30 + 85); // Slightly random timing for natural feel
      })
      
      // Wait then delete and type "A MODERN XXXX"
      .to({}, { duration: 2.0 })
      .call(() => {
        const textToDelete = "IT'S LOADING";
        let currentText = textToDelete;
        
        // Show cursor and delete all text
        setShowCursor(true);
        const deleteInterval = setInterval(() => {
          currentText = currentText.slice(0, -1);
          setDisplayText(currentText);
          if (currentText.length === 0) {
            clearInterval(deleteInterval);
            
            // Brief scramble effect then type "A MODERN XXXX"
            setTimeout(() => {
              // Quick scramble effect
              let scrambleCount = 0;
              const scrambleChars = '▓▒░█▆▅▄▃▂▁';
              const scrambleInterval = setInterval(() => {
                if (scrambleCount < 3) {
                  const scrambled = Array.from({length: Math.random() * 4 + 2}, () => 
                    scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                  ).join('');
                  setDisplayText(scrambled);
                  scrambleCount++;
                } else {
                  clearInterval(scrambleInterval);
                  
                  // Now type "A MODERN XXXX" normally
                  const newText = "A MODERN XXXX";
                  let j = 0;
                  const typeInterval = setInterval(() => {
                    setDisplayText(newText.substring(0, j + 1));
                    j++;
                    if (j >= newText.length) {
                      clearInterval(typeInterval);
                      setShowCursor(false);
                    }
                  }, Math.random() * 25 + 100);
                }
              }, 100);
            }, 200);
          }
        }, 60);
      })
      
      // Wait longer before deleting "XXXX" and typing "MUSEUM"
      .to({}, { duration: 4.5 })
      .call(() => {
        // Show cursor and delete only "XXXX" part
        setShowCursor(true);
        let deleteCount = 0;
        const deleteInterval = setInterval(() => {
          if (deleteCount < 4) { // Delete 4 X's
            setDisplayText('A MODERN XXXX'.slice(0, -deleteCount - 1));
            deleteCount++;
          } else {
            clearInterval(deleteInterval);
            setDisplayText('A MODERN ');
            
            // Scramble then type "MUSEUM" 
            setTimeout(() => {
              // Brief glitch effect on the XXXX part
              let glitchCount = 0;
              const glitchChars = '░▒▓█▆▅▄▃▂▁';
              const glitchInterval = setInterval(() => {
                if (glitchCount < 2) {
                  const glitched = Array.from({length: 4}, () => 
                    glitchChars[Math.floor(Math.random() * glitchChars.length)]
                  ).join('');
                  setDisplayText('A MODERN ' + glitched);
                  glitchCount++;
                } else {
                  clearInterval(glitchInterval);
                  setDisplayText('A MODERN ');
                  
                  // Now type "MUSEUM" with smooth reveal
                  setTimeout(() => {
                    const newPart = 'MUSEUM';
                    let i = 0;
                    const typeInterval = setInterval(() => {
                      setDisplayText('A MODERN ' + newPart.substring(0, i + 1));
                      i++;
                      if (i >= newPart.length) {
                        clearInterval(typeInterval);
                        setShowCursor(false);
                      }
                    }, Math.random() * 30 + 120);
                  }, 150);
                }
              }, 120);
            }, 150);
          }
        }, 180);
      })
      
      // Animate line cutting through
      .to({}, { duration: 0.5 })
      .from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
        transformOrigin: "left"
      });
      
      // Wait long enough for "MUSEUM" to finish typing
      tl.to({}, { duration: 3.0 })
      .call(onComplete);
      
      // Change bars to white and make them wave down from top
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          // Make bars white and position them above screen
          gsap.set(bar, { backgroundColor: 'white', y: '-100%' });
          
          // Wave down from center outward
          const totalBars = barsRef.current.length;
          const center = totalBars / 2;
          const distanceFromCenter = Math.abs(i - center);
          
          tl.to(bar, {
            y: '100%', // Come down past the screen
            duration: 1.2,
            ease: "power2.out"
          }, distanceFromCenter * 0.1);
        }
      });
      
      // Hide container after wave
      tl.to(containerRef.current, {
        display: 'none',
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
    >
      {/* Text with line cutting through */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
          <div
            ref={textRef}
            className="text-white text-7xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-bold tracking-wider opacity-0"
          >
            {displayText}
            {showCursor && <span className="inline-block ml-2">|</span>}
          </div>
          {/* Cutting line */}
          <div
            ref={lineRef}
            className="absolute top-1/2 left-0 w-full h-0.5 bg-white"
            style={{ transform: 'translateY(-50%) scaleX(0)', transformOrigin: 'left' }}
          />
        </div>
      </div>
      
      {/* Wave Bars */}
      <div className="flex h-full w-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            ref={el => { barsRef.current[i] = el; }}
            className="flex-1 bg-black"
          />
        ))}
      </div>
      

    </div>
  );
}
