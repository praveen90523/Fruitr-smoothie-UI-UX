import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "lucide-react";
import { FlavorInfo, FLAVORS } from "../types";
import ProfileView from "./ProfileView";
import { drinks } from "../data/drinks";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import img6 from "../images/img6.png";

const bottles = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const INGREDIENT_IMAGES: Record<string, { url: string; label: string; origin: string }> = {
  raspberry: {
    url: "https://i.pinimg.com/736x/1f/5f/8a/1f5f8a024457a937ed197d7566821188.jpg",
    label: "Wild Raspberries",
    origin: "Alpine Foothills"
  },
  mango: {
    url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=150&h=150&q=80",
    label: "Alphonso Mango",
    origin: "Deccan Plateau"
  },
  kiwi: {
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?auto=format&fit=crop&w=150&h=150&q=80",
    label: "Organic Gold Kiwi",
    origin: "Bay of Plenty"
  },
  blueberry: {
    url: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=150&h=150&q=80",
    label: "Antioxidant Berries",
    origin: "Cascade Range"
  },
  strawberry: {
    url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=150&h=150&q=80",
    label: "Field Strawberries",
    origin: "Santa Maria Valley"
  },
  cocoa: {
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=150&h=150&q=80",
    label: "Belgian Dark Cocoa",
    origin: "Equatorial Forest"
  }
};


const FLAVOR_RECIPES: Record<string, { prepTime: string; calories: string; servings: string; difficulty: string; ingredients: string[]; steps: string[] }> = {
  raspberry: {
    prepTime: "5 Min",
    calories: "280 kcal",
    servings: "1 Bowl",
    difficulty: "Easy",
    ingredients: ["1.5 cups Frozen Wild Raspberries", "1 ripe Frozen Banana", "1/2 cup Unsweetened Coconut Milk", "1 tbsp Chia seeds", "Granola, Blueberries, and Kiwi for topping"],
    steps: ["Blend raspberries, banana, and coconut milk until silky smooth and thick.", "Pour into your signature white ceramic bowl, smoothing the surface.", "Decorate carefully with rows of granola, blueberries, and fresh fruit slices.", "Serve immediately while cold and enjoy pure alpine freshness."]
  },
  mango: {
    prepTime: "6 Min",
    calories: "320 kcal",
    servings: "1 Bowl",
    difficulty: "Easy",
    ingredients: ["1.5 cups Alphonso Mango chunks", "1/2 cup Greek Yogurt or Oat Yogurt", "1/4 cup Orange Juice", "1 tsp Ground Turmeric for glow", "Mango slices, Pumpkin seeds, and Coconut flakes"],
    steps: ["Blend mango, yogurt, orange juice, and turmeric on high speed until golden.", "Pour the dense tropical mixture into the chilled bowl.", "Garnish with fresh mango ribbons, toasted coconut flakes, and pumpkin seeds.", "Sip or spoon under morning light for an instant energy boost."]
  },
  kiwi: {
    prepTime: "5 Min",
    calories: "240 kcal",
    servings: "1 Bowl",
    difficulty: "Medium",
    ingredients: ["3 peeled Organic Gold Kiwis", "1 cup Fresh Baby Spinach (for color)", "1/2 cup Frozen Pineapple chunks", "1/2 cup Pure Apple juice", "Kiwi wheels, Hemp seeds, and Almond slices"],
    steps: ["Blend peeled kiwis, baby spinach, pineapple, and apple juice until vibrant green.", "Transfer into your bowl, using a spoon to swirl the surface.", "Adorn with thin kiwi slices, a sprinkle of hemp seeds, and crunchy almonds.", "Enjoy a zesty, nutrient-dense breakfast rich in Vitamin C."]
  },
  blueberry: {
    prepTime: "5 Min",
    calories: "290 kcal",
    servings: "1 Bowl",
    difficulty: "Easy",
    ingredients: ["1.5 cups Wild Blueberries", "1/2 cup Almond milk", "1 scoop Vanilla Pea Protein (optional)", "1 tbsp Flaxseed meal", "Blueberries, Banana slices, and Chia seeds"],
    steps: ["Combine blueberries, almond milk, pea protein, and flaxseeds in the blender.", "Process until completely smooth, yielding a deep royal purple mixture.", "Pour into the bowl and top with fresh banana coins and active chia seeds.", "Savor the deep antioxidant-rich flavors of the mountain ranges."]
  },
  strawberry: {
    prepTime: "5 Min",
    calories: "260 kcal",
    servings: "1 Bowl",
    difficulty: "Easy",
    ingredients: ["1.5 cups Sweet Strawberries", "1/2 cup Oat milk", "1/2 cup Cashew yogurt", "1 tbsp Maple syrup", "Strawberry halves, Granola, and Mint leaves"],
    steps: ["Blend strawberries, oat milk, cashew yogurt, and maple syrup to a creamy pink.", "Pour the blush blend into your bowl, letting it settle.", "Arrange fresh strawberry halves on top alongside clusters of golden granola.", "Garnish with a fresh mint leaf for a perfect contrast."]
  },
  cocoa: {
    prepTime: "7 Min",
    calories: "390 kcal",
    servings: "1 Bowl",
    difficulty: "Medium",
    ingredients: ["2 tbsp Premium Belgian Cocoa powder", "2 frozen bananas (for creaminess)", "1/2 cup Creamy Cashew milk", "1 tbsp Peanut butter or Almond butter", "Dark chocolate curls, cacao nibs, and raspberries"],
    steps: ["Blend cocoa powder, frozen bananas, cashew milk, and nut butter until thick.", "Scoop the rich chocolatey ganache into your presentation bowl.", "Top with raw cacao nibs, dark chocolate curls, and fresh raspberries.", "Savor this indulgent, chocolate truffle in a bowl."]
  }
};

interface GlassCardProps {
  activeFlavor: FlavorInfo;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (idx: number) => void;
  isLoading?: boolean;
  activePage: string;
  onChangePage: (page: string) => void;
}

export default function GlassCard({
  activeFlavor,
  activeIndex,
  onNext,
  onPrev,
  onSelectIndex,
  isLoading = false,
  activePage,
  onChangePage,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", category: "Catering" });

  useEffect(() => {
    setIsSubmitted(false);
  }, [activePage, activeIndex]);

  // Implement Awwwards-level 3D glass mouse tilt and light refraction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || isLoading) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse offset from card center (-1 to 1)
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Limit rotation to a luxury, subtle 5.5 degrees max
      const tiltX = (y / (rect.height / 2)) * -5.5;
      const tiltY = (x / (rect.width / 2)) * 5.5;

      cardRef.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // Calculate real-time reflection highlight positions
      const reflectX = (e.clientX - rect.left) / rect.width * 100;
      const reflectY = (e.clientY - rect.top) / rect.height * 100;

      cardRef.current.style.setProperty("--reflect-x", `${reflectX}%`);
      cardRef.current.style.setProperty("--reflect-y", `${reflectY}%`);
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      // Smooth reset
      cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
      cardRef.current.style.setProperty("--reflect-x", `50%`);
      cardRef.current.style.setProperty("--reflect-y", `50%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const element = cardRef.current;
    element?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isLoading]);

  // Framer Motion spring transition presets
  const springTransition = { type: "spring", stiffness: 260, damping: 20 };

  return (
    <motion.div
      ref={cardRef}
      id="glass-hero-card"
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={isLoading ? {} : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="glass-container w-[92%] max-w-6xl h-[85vh] md:h-[78vh] rounded-[28px] relative z-20 flex flex-col justify-between p-6 md:p-10 text-white premium-glow overflow-hidden"
    >
      {/* 1. Header Navigation */}
      <header id="card-header" className="flex items-center justify-between w-full relative z-30">        {/* Logo */}
        <motion.div
          className="flex items-center gap-1.5 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={springTransition}
          onClick={() => onChangePage("Home")}
        >
          <span className="font-display font-extrabold text-2xl tracking-tight text-white drop-shadow-sm select-none">
            Fruitr
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white self-end mb-1.5 animate-pulse" />
        </motion.div>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-0.5 sm:gap-1 glass-nav px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold">
          {["Home", "Drinks", "Recipes", "Contact"].map((item) => {
            const isActive = item === activePage;
            return (
              <motion.button
                key={item}
                whileHover={{ scale: isActive ? 1.05 : 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                style={{
                  color: isActive ? activeFlavor.bgColorCenter : undefined,
                }}
                className={`relative px-2.5 sm:px-4 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-300 cursor-pointer ${isActive
                  ? "bg-white font-black shadow-xl scale-105"
                  : "text-white/70 hover:text-white"
                  }`}
                onClick={() => onChangePage(item)}
              >
                {item}
              </motion.button>
            );
          })}
        </nav>

        {/* Profile Action */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={springTransition}
          onClick={() => onChangePage("Profile")}
          className={`w-9 h-9 rounded-full border active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer ${activePage === "Profile"
            ? "bg-white border-white text-black font-bold"
            : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-white/20"
            }`}
          aria-label="User Profile"
        >
          <User className={`w-4 h-4 ${activePage === "Profile" ? "text-black" : "text-white"}`} />
        </motion.button>
      </header>

      {/* 2. Middle Content Layer: Blur-to-Sharp Backdrop Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 select-none pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeFlavor.id + "-" + activePage}
            initial={{ y: 50, filter: "blur(18px)", opacity: 0, letterSpacing: "0.25em" }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 0.15, letterSpacing: "-0.01em" }}
            exit={{ y: -50, filter: "blur(18px)", opacity: 0, letterSpacing: "-0.04em" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[13vw] md:text-[10rem] tracking-tight text-center leading-none select-none text-white uppercase opacity-15"
          >
            {activePage === "Home" ? activeFlavor.title : activePage}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 3. Hero Layout (Left & Right Controls overlay) */}
      {activePage !== "Profile" ? (
        <div id="hero-layout" className="grid grid-cols-1 md:grid-cols-12 h-full items-end md:items-center relative z-20 pointer-events-none">

          {activePage === "Home" && (
            <>
              {/* Left Side: Premium CTA */}
              <div className="col-span-1 md:col-span-5 flex flex-col justify-end h-full pb-8 md:pb-0 pointer-events-auto max-w-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFlavor.id}
                    initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-5"
                  >
                    {/* Button + Price */}
                    <div className="flex items-center gap-6 mb-2">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={springTransition}
                        style={{ color: activeFlavor.bgColorCenter }}
                        className="px-10 py-4 bg-white rounded-full font-bold text-sm tracking-wide shadow-2xl transition-all duration-300 cursor-pointer uppercase font-black"
                      >
                        Buy Now
                      </motion.button>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-2xl font-light tracking-tight text-white"
                      >
                        {activeFlavor.price}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed font-light max-w-xs">
                      {activeFlavor.description}
                    </p>

                    {/* Premium Ingredient Capsule with Picture */}
                    {INGREDIENT_IMAGES[activeFlavor.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-2xl p-2.5 max-w-xs backdrop-blur-md shadow-md"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-inner border border-white/10 shrink-0 bg-white/5">
                          <img
                            src={INGREDIENT_IMAGES[activeFlavor.id].url}
                            alt={INGREDIENT_IMAGES[activeFlavor.id].label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold font-mono">
                            Raw Ingredient
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {INGREDIENT_IMAGES[activeFlavor.id].label}
                          </span>
                          <span className="text-[9px] text-white/50 truncate">
                            Origin: {INGREDIENT_IMAGES[activeFlavor.id].origin}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center spacing (for 3D bowl, which overlays this grid) */}
              <div className="col-span-1 md:col-span-5 flex items-center justify-center h-full relative z-50 pointer-events-none">

                {/* Ambient dynamic glow behind bottle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`glow-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.35, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="absolute w-[440px] h-[440px] rounded-full blur-[130px] -z-10"
                    style={{
                      backgroundColor: activeFlavor.accentColor,
                    }}
                  />
                </AnimatePresence>

                {/* Interactive Premium Bottle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bottle-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.76, rotate: -10, y: 40 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.76, rotate: 10, y: -40 }}
                    transition={{ type: "spring", stiffness: 130, damping: 15 }}
                    whileHover={{ scale: 1.06, rotate: 2 }}
                    className="relative z-10 w-[420px] md:w-[480px] flex items-center justify-center cursor-pointer pointer-events-auto select-none"
                  >
                    <img
                      src={bottles[activeIndex]}
                      alt={activeFlavor.title}
                      className="w-full object-contain bottle-shadow bottle select-none pointer-events-none animate-float"
                    />
                  </motion.div>
                </AnimatePresence>

              </div>
            </>
          )}

          {activePage === "Drinks" && (
            <>
              <div className="col-span-1 md:col-span-7 flex flex-col justify-center h-full pb-8 md:pb-0 pointer-events-auto max-w-2xl text-left">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-4 pr-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">Curated Mixology</span>
                    <h2 className="font-display font-bold text-3xl tracking-tight text-white mt-1">
                      Craft Mocktails & Sips
                    </h2>
                    <p className="text-xs text-white/60 mt-1 max-w-lg leading-relaxed font-light">
                      Every beverage is hand-crafted with our organic fruit bases and raw botanical infusions, styled exclusively for the <span className="font-bold text-white uppercase">{activeFlavor.title}</span> collection.
                    </p>
                  </div>

                  {/* Scrollable grid of drinks */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-[38vh] overflow-y-auto pr-2 custom-scrollbar">
                    {drinks.map((drink, idx) => (
                      <motion.div
                        key={drink.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="flex flex-col justify-between p-3.5 bg-white/5 border border-white/8 hover:border-white/20 rounded-2xl backdrop-blur-md transition-all duration-300 relative overflow-hidden group shadow-md"
                      >
                        {/* Hover Glow Background */}
                        <div
                          className="absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10 animate-pulse"
                          style={{
                            background: `radial-gradient(circle, ${drink.color} 0%, transparent 70%)`
                          }}
                        />

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/5">
                            <img
                              src={drink.image}
                              alt={drink.name}
                              className="w-full h-full object-cover select-none pointer-events-none"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h3 className="font-bold text-xs text-white leading-snug truncate">
                              {drink.name}
                            </h3>
                            <span className="text-[10px] text-white/50 font-mono mt-0.5">
                              ${drink.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center spacing (for shifted 3D bowl) */}
              <div className="col-span-1 md:col-span-3 h-[15vh] md:h-full" />
            </>
          )}

          {activePage === "Recipes" && (
            <>
              <div className="col-span-1 md:col-span-7 flex flex-col justify-center h-full pb-8 md:pb-0 pointer-events-auto max-w-2xl text-left">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-4 pr-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">Gourmet Guide</span>
                    <h2 className="font-display font-bold text-3xl tracking-tight text-white mt-1">
                      How to Prepare
                    </h2>
                  </div>

                  {/* Stats Bento Layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: "Prep Time", val: FLAVOR_RECIPES[activeFlavor.id]?.prepTime, detail: "Fast & Fresh" },
                      { label: "Calories", val: FLAVOR_RECIPES[activeFlavor.id]?.calories, detail: "All Natural" },
                      { label: "Yield", val: FLAVOR_RECIPES[activeFlavor.id]?.servings, detail: "Generous Portion" },
                      { label: "Difficulty", val: FLAVOR_RECIPES[activeFlavor.id]?.difficulty, detail: "Home Culinary" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-3 flex flex-col justify-between shadow-sm">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">{stat.label}</span>
                        <span className="text-base font-black mt-1" style={{ color: activeFlavor.creamColor }}>{stat.val}</span>
                        <span className="text-[8px] text-white/50 mt-0.5">{stat.detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ingredients & Steps Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Ingredients List */}
                    <div className="bg-white/3 border border-white/6 rounded-2xl p-4">
                      <h3 className="text-xs font-black uppercase tracking-wider text-white/80 border-b border-white/5 pb-2 mb-2.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeFlavor.accentColor }} />
                        Raw Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {FLAVOR_RECIPES[activeFlavor.id]?.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-white/70 leading-relaxed font-light">
                            <span className="text-white/40 font-mono shrink-0">0{i + 1}.</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step by Step Guide */}
                    <div className="bg-white/3 border border-white/6 rounded-2xl p-4">
                      <h3 className="text-xs font-black uppercase tracking-wider text-white/80 border-b border-white/5 pb-2 mb-2.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeFlavor.creamColor }} />
                        Step-by-Step
                      </h3>
                      <ul className="space-y-3.5">
                        {FLAVOR_RECIPES[activeFlavor.id]?.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[11px] text-white/70 leading-relaxed font-light">
                            <span className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-mono shrink-0 font-bold" style={{ color: activeFlavor.creamColor }}>
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center spacing (for shifted 3D bowl) */}
              <div className="col-span-1 md:col-span-3 h-[15vh] md:h-full" />
            </>
          )}

          {activePage === "Contact" && (
            <>
              <div className="col-span-1 md:col-span-7 flex flex-col justify-center h-full pb-8 md:pb-0 pointer-events-auto max-w-2xl text-left">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-4 pr-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">Lounge & Concierge</span>
                    <h2 className="font-display font-bold text-3xl tracking-tight text-white mt-1">
                      Connect with Fruitr
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                    {/* Form Section */}
                    <div className="sm:col-span-7 bg-white/5 border border-white/8 rounded-2xl p-4 md:p-5 relative overflow-hidden backdrop-blur-md">
                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.form
                            key="contact-form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={(e) => {
                              e.preventDefault();
                              setIsSubmitted(true);
                            }}
                            className="space-y-3"
                          >
                            {/* Name and Email */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[8px] uppercase tracking-wider text-white/50 font-mono block">Your Name</label>
                                <input
                                  type="text"
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                  placeholder="Praveen"
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs focus:outline-none placeholder-white/20 transition-all font-light"
                                  style={{
                                    caretColor: activeFlavor.accentColor,
                                  }}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] uppercase tracking-wider text-white/50 font-mono block">Email Address</label>
                                <input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                  placeholder="user@example.com"
                                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs focus:outline-none placeholder-white/20 transition-all font-light"
                                  style={{
                                    caretColor: activeFlavor.creamColor,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Category Selector */}
                            <div className="space-y-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/50 font-mono block">Inquiry Type</label>
                              <div className="flex gap-1.5 flex-wrap">
                                {["Catering", "Feedback", "Wholesale"].map((cat) => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                                    className="px-2.5 py-1 rounded-lg text-[9px] font-semibold border transition-all cursor-pointer"
                                    style={{
                                      borderColor: formData.category === cat ? activeFlavor.accentColor : "rgba(255, 255, 255, 0.1)",
                                      backgroundColor: formData.category === cat ? `${activeFlavor.accentColor}15` : "rgba(255, 255, 255, 0.02)",
                                      color: formData.category === cat ? "#ffffff" : "rgba(255, 255, 255, 0.6)"
                                    }}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/50 font-mono block">Message</label>
                              <textarea
                                required
                                rows={2.5}
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Write your inquiry..."
                                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs focus:outline-none placeholder-white/20 transition-all font-light resize-none custom-scrollbar"
                              />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="w-full py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all duration-300 text-white uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2"
                              style={{
                                background: `linear-gradient(135deg, ${activeFlavor.bgColorCenter} 0%, ${activeFlavor.accentColor} 100%)`
                              }}
                            >
                              Send Message
                            </motion.button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="success-screen"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center h-full py-6 space-y-3"
                          >
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                              style={{ backgroundColor: `${activeFlavor.accentColor}20`, border: `2px solid ${activeFlavor.accentColor}` }}
                            >
                              <svg className="w-6 h-6" style={{ color: activeFlavor.creamColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-white">Message Dispatched</h3>
                              <p className="text-[10px] text-white/60 mt-1 max-w-xs mx-auto">
                                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our concierge will get back to you at <span className="text-white">{formData.email}</span>.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setIsSubmitted(false);
                                setFormData({ name: "", email: "", message: "", category: "Catering" });
                              }}
                              className="text-[9px] uppercase tracking-wider text-white/50 hover:text-white underline cursor-pointer"
                            >
                              Submit another response
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Info Card Section */}
                    <div className="sm:col-span-5 flex flex-col justify-between p-4 bg-white/3 border border-white/6 rounded-2xl">
                      <div className="space-y-3">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono">Flagship Lounge</span>
                          <p className="text-[11px] text-white/80 font-medium mt-0.5 leading-relaxed font-light">
                            Fruitr Lounge Manhattan<br />
                            72 Fifth Ave, New York, NY
                          </p>
                        </div>

                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono">Hours</span>
                          <p className="text-[11px] text-white/80 font-medium mt-0.5 leading-relaxed font-light">
                            Mon — Fri: 7am - 9pm<br />
                            Sat — Sun: 8am - 10pm
                          </p>
                        </div>

                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono">Direct Contact</span>
                          <p className="text-[11px] text-white/80 font-medium mt-0.5 leading-relaxed font-light">
                            concierge@fruitr.premium<br />
                            +1 (800) 555-FRUT
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" style={{ backgroundColor: activeFlavor.accentColor }} />
                        <span className="text-[8px] uppercase tracking-wider text-white/40 font-mono">Concierge Online</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center spacing (for shifted 3D bowl) */}
              <div className="col-span-1 md:col-span-3 h-[15vh] md:h-full" />
            </>
          )}

          {/* Right Side: Vertical Controls */}
          <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 py-4 md:py-0 pointer-events-auto">
            {/* Slider Pagination dots */}
            <div className="flex md:flex-col gap-2.5 order-2 md:order-1">
              {FLAVORS.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => onSelectIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex
                    ? "w-6 md:w-1.5 md:h-6 bg-white shadow-sm shadow-white scale-110"
                    : "w-1.5 bg-white/35 hover:bg-white/60"
                    }`}
                  aria-label={`Go to flavor ${f.title}`}
                />
              ))}
            </div>


          </div>

        </div>
      ) : (
        <ProfileView activeFlavor={activeFlavor} />
      )}

      {/* 4. Editorial Decorative Footer */}
      <footer id="card-footer" className="flex flex-col sm:flex-row justify-between items-center w-full relative z-30 pt-4 border-t border-white/5 gap-3">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/40 justify-center sm:justify-start">
          <span>Organic Certified</span>
          <span>Vegan Friendly</span>
          <span>No Added Sugar</span>
        </div>
        {activePage !== "Profile" && (
          <div className="flex items-center space-x-2">
            {FLAVORS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeIndex ? "bg-white scale-110 shadow-sm shadow-white" : "bg-white/20"
                  }`}
              />
            ))}
          </div>
        )}
      </footer>
    </motion.div>
  );
}
