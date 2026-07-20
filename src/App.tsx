import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FLAVORS, FlavorInfo } from "./types";
import GlassCard from "./components/GlassCard";
import SmoothieScene from "./components/SmoothieScene";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePage, setActivePage] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);
  const activeFlavor = FLAVORS[activeIndex];
  const isTransitioning = useRef(false);

  // Swipe gesture tracking for mobile devices
  const touchStartY = useRef(0);

  // References for custom trailing cursor
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Throttle helper to prevent double skipping
  const triggerTransitionLock = () => {
    isTransitioning.current = true;
    setTimeout(() => {
      isTransitioning.current = false;
    }, 1000); // matches GSAP morph animation speed
  };

  const handleNext = () => {
    if (isTransitioning.current || isLoading) return;
    triggerTransitionLock();
    setActiveIndex((prev) => (prev + 1) % FLAVORS.length);
  };

  const handlePrev = () => {
    if (isTransitioning.current || isLoading) return;
    triggerTransitionLock();
    setActiveIndex((prev) => (prev - 1 + FLAVORS.length) % FLAVORS.length);
  };

  const handleSelectIndex = (idx: number) => {
    if (isTransitioning.current || idx === activeIndex || isLoading) return;
    triggerTransitionLock();
    setActiveIndex(idx);
  };

  // 1. Loader Timeout Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400); // Luxury loading sequence duration
    return () => clearTimeout(timer);
  }, []);

  // 2. Custom Cursor tracker with CSS smooth delay
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorRingRef.current) {
        // Fast instant center dot
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // Gentle offset trailing outer ring
        cursorRingRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // Detect hoverable targets
        const target = e.target as HTMLElement;
        const isHoverable = target?.closest("button, a, [role='button'], .cursor-pointer");
        if (isHoverable) {
          cursorRingRef.current.style.width = "54px";
          cursorRingRef.current.style.height = "54px";
          cursorRingRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          cursorRingRef.current.style.borderColor = "rgba(255, 255, 255, 0.9)";
        } else {
          cursorRingRef.current.style.width = "38px";
          cursorRingRef.current.style.height = "38px";
          cursorRingRef.current.style.backgroundColor = "transparent";
          cursorRingRef.current.style.borderColor = "rgba(255, 255, 255, 0.4)";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // 3. Add scroll wheel event listener with heavy premium momentum threshold
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLoading) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, isLoading]);

  // 4. Add swipe support for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLoading) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 55) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, isLoading]);

  return (
    <main
      id="root-container"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden font-sans transition-colors duration-1000 select-none"
    >
      {/* Cinematic Ambient Lighting & Vignette Background */}
      {/* Dynamic base gradient layer */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeFlavor.bgColorCenter} 0%, ${activeFlavor.bgColorBottom} 100%)`
        }}
      />

      {/* Volumetric top glow highlight */}
      <div
        className="absolute top-0 inset-x-0 h-[50vh] opacity-35 blur-3xl pointer-events-none transition-all duration-1000 ease-in-out z-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${activeFlavor.bgColorTop} 0%, transparent 80%)`
        }}
      />

      {/* Volumetric center glow layer */}
      <div
        className="absolute inset-0 radial-glow opacity-60 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeFlavor.accentColor} 0%, transparent 65%)`
        }}
      />

      {/* Soft Vignette Overlay to frame the scene */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%] pointer-events-none z-1" />

      {/* Film Grain Texture Layer for high-end cinematic feel */}
      <div className="film-grain" />

      {/* Modern Custom Trailing Cursor (Hidden on Touch Devices) */}
      <div className="hidden lg:block">
        <div ref={cursorDotRef} className="custom-cursor-dot" style={{ transition: "transform 0.02s linear" }} />
        <div ref={cursorRingRef} className="custom-cursor-ring" style={{ transition: "transform 0.12s cubic-bezier(0.1, 0.8, 0.25, 1)" }} />
      </div>

      {/* Cinematic Awwwards Loading Experience */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="luxury-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full bg-[#120005] z-50 flex flex-col items-center justify-center gap-6"
          >
            {/* Spinning Smoothie Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/20 animate-spin" />
              <div className="absolute w-12 h-12 rounded-full border-b-2 border-l-2 border-[#ff2a5f] animate-spin [animation-duration:1.2s]" />
              <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
            </div>

            {/* Logo character-by-character loading reveal */}
            <div className="flex items-center gap-1.5 mt-2">
              {"FRUITR".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
                  className="font-display font-black text-2xl tracking-widest text-white"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Luxury tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-[9px] uppercase tracking-[0.3em] text-white/80 font-mono mt-1"
            >
              Pure Organic Premium Smoothie
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Glassmorphism Hero Card (occupies ~85% width) */}
      <GlassCard
        activeFlavor={activeFlavor}
        activeIndex={activeIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        onSelectIndex={handleSelectIndex}
        isLoading={isLoading}
        activePage={activePage}
        onChangePage={setActivePage}
      />

      {/* 3. ThreeJS 3D Canvas overlaying the center coordinates of the Glass Card */}
      {!isLoading && <SmoothieScene activeIndex={activeIndex} activePage={activePage} />}

      {/* 4. Designer Portfolio Signature Attribution Badge */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            id="designer-signature-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-3 md:bottom-5 z-30 flex items-center justify-center pointer-events-auto"
          >
            <a
              href="https://portfolio-rho-kohl-u7nc6exjpq.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill border border-white/8 hover:border-white/20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white/90 hover:text-white hover:scale-105 active:scale-95 shadow-lg shadow-black/10 transition-all duration-300 group"
            >
              {/* Circular avatar badge */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[1px] shadow-sm flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold text-white uppercase font-mono">
                  PD
                </div>
              </div>
              <span className="font-medium tracking-wider group-hover:tracking-widest transition-all">
                Praveen Design
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
