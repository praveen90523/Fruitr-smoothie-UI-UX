import { motion } from "motion/react";
import {
  User, Heart, Award, ShoppingBag, Star, LogOut, CheckCircle
} from "lucide-react";
import { FlavorInfo } from "../types";

interface ProfileViewProps {
  activeFlavor: FlavorInfo;
}

export default function ProfileView({ activeFlavor }: ProfileViewProps) {
  // Spring transition presets for elegant hover physics
  const springTransition = { type: "spring", stiffness: 300, damping: 22 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 h-full flex flex-col justify-between"
    >
      {/* Scrollable Layout with custom styling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto max-h-[58vh] md:max-h-[52vh] pr-2 custom-scrollbar pointer-events-auto text-left">

        {/* Left Side: Avatar, Bio, Achievements & Settings Shortcuts (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">

          {/* Main profile avatar card */}
          <div className="bg-white/4 border border-white/6 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-white/12 transition-all duration-300">
            {/* Ambient inner glow */}
            <div
              className="absolute -inset-1 opacity-10 group-hover:opacity-15 transition-opacity duration-500 blur-xl -z-10"
              style={{
                background: `radial-gradient(circle, ${activeFlavor.accentColor} 0%, transparent 70%)`
              }}
            />

            <div className="flex flex-col items-center text-center">
              {/* Glowing Avatar Border */}
              <div
                className="w-24 h-24 rounded-full p-[3px] shadow-lg mb-4"
                style={{
                  background: `linear-gradient(135deg, ${activeFlavor.accentColor} 0%, ${activeFlavor.creamColor} 100%)`
                }}
              >
                <div className="w-full h-full rounded-full border border-black/20 overflow-hidden relative">
                  <img
                    src="https://i.pinimg.com/736x/2d/a9/a1/2da9a133fb45561e360c2c4a20b6ab8f.jpg"
                    alt="Praveen"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Name, Username, Badge */}
              <h2 className="font-display font-bold text-xl text-white tracking-tight">
                Praveen
              </h2>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                @praveen_design
              </p>

              {/* Gold Gradient Premium Badge */}
              <span className="inline-block mt-3 px-3 py-1 text-[9px] uppercase tracking-wider font-extrabold rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-sm">
                Premium Member
              </span>

              {/* Short Bio */}
              <p className="text-xs text-white/60 leading-relaxed font-light mt-4 pt-4 border-t border-white/5 w-full">
                Smoothie aficionado, organic living advocate, and design enthusiast. Exploring wild berry blends and cold-pressed elixirs.
              </p>
            </div>
          </div>

          {/* Achievement Badges Card */}
          <div className="bg-white/4 border border-white/6 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" style={{ color: activeFlavor.creamColor }} />
              Achievements
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { title: "Organic Lover", emoji: "🌿", color: "rgba(76, 175, 80, 0.12)", border: "rgba(76, 175, 80, 0.3)" },
                { title: "Berry Fanatic", emoji: "🍓", color: "rgba(233, 30, 99, 0.12)", border: "rgba(233, 30, 99, 0.3)" },
                { title: "Elite Member", emoji: "👑", color: "rgba(255, 193, 7, 0.12)", border: "rgba(255, 193, 7, 0.3)" }
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2 rounded-xl text-center border"
                  style={{ backgroundColor: badge.color, borderColor: badge.border }}
                >
                  <span className="text-lg mb-1">{badge.emoji}</span>
                  <span className="text-[8px] font-bold text-white/80 leading-snug break-words w-full">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* Elegant Outlined Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={springTransition}
            className="w-full py-3 rounded-xl border border-white/8 text-xs font-semibold tracking-wide text-rose-400 hover:text-rose-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Account
          </motion.button>
        </div>

        {/* Right Side: Stats Grid, Rewards Progress, Info, Timelines (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* Stats Grid (4 Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Orders", val: "48", detail: "Beverages Ordered", icon: ShoppingBag, color: activeFlavor.accentColor },
              { label: "Favorite Drinks", val: "12", detail: "Curated Selections", icon: Heart, color: activeFlavor.creamColor },
              { label: "Reward Points", val: "850", detail: "Points Available", icon: Star, color: "#ffb703" },
              { label: "Reviews Written", val: "15", detail: "Community Feedbacks", icon: CheckCircle, color: "#4caf50" }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/4 border border-white/6 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                {/* Micro glow effect */}
                <div
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 blur-lg"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">
                    {stat.label}
                  </span>
                  <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                </div>
                <span className="text-2xl font-black mt-2 leading-none text-white">
                  {stat.val}
                </span>
                <span className="text-[8px] text-white/50 mt-1">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Reward Points Progress Bar Card */}
          <div className="bg-white/4 border border-white/6 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Loyalty Rewards Progress
                </h3>
                <p className="text-[9px] text-white/50 font-mono mt-0.5 uppercase tracking-wide">
                  Earn points on every organic purchase
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-white">850</span>
                <span className="text-[10px] text-white/40"> / 1000 pts</span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "85%",
                  background: `linear-gradient(90deg, ${activeFlavor.creamColor} 0%, ${activeFlavor.accentColor} 100%)`
                }}
              />
            </div>

            <p className="text-[9.5px] text-white/60 leading-relaxed font-light">
              🏆 You are only <strong className="text-white font-bold">150 points</strong> away from unlocking your next free premium smoothie bowl!
            </p>
          </div>


          {/* Favorite Drinks Section */}
          <div className="bg-white/4 border border-white/6 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" style={{ color: activeFlavor.accentColor }} />
              Favorite Drinks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  name: "Crimson Sparkler",
                  type: "Raspberry base",
                  img: "https://i.pinimg.com/736x/c1/f5/4e/c1f54e6989abb175e5329714fc61f8fe.jpg",
                  bg: "rgba(255, 42, 95, 0.05)"
                },
                {
                  name: "Alphonso Breeze",
                  type: "Mango base",
                  img: "https://i.pinimg.com/736x/f8/56/5b/f8565b7442a9df396adc387c8555d8b4.jpg",
                  bg: "rgba(255, 159, 0, 0.05)"
                },
                {
                  name: "Emerald Collins",
                  type: "Kiwi base",
                  img: "https://i.pinimg.com/736x/f0/3f/6a/f03f6a105e9fbb0d752dc6ab591b75e6.jpg",
                  bg: "rgba(118, 192, 67, 0.05)"
                }
              ].map((drink, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/3 border border-white/6 hover:border-white/12 p-2.5 rounded-xl hover:scale-[1.02] cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: drink.bg }}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/8 shrink-0 bg-white/5">
                    <img
                      src={drink.img}
                      alt={drink.name}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] uppercase tracking-wider text-white/40 font-mono">
                      {drink.type}
                    </span>
                    <span className="text-xs font-bold text-white truncate mt-0.5">
                      {drink.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

      </div>
    </motion.div>
  );
}
