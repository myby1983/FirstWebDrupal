import { Sparkles, Calendar, ArrowRight, Server, FileText, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  key?: string;
  siteName: string;
  siteSlogan: string;
  primaryColor: string;
  accentColor: string;
  onCtaClick: () => void;
}

export default function Hero({
  siteName,
  siteSlogan,
  primaryColor,
  accentColor,
  onCtaClick
}: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 px-6 md:px-10 border-b border-slate-900"
    >
      {/* Radiant Minimal Blur Bubbles from design template */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Blueprint Grid Accent */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Core Text Banner Info */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono tracking-[0.2em] uppercase text-sky-400"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>ENTERPRISE CMS CORE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold font-sans leading-tight tracking-tighter text-white"
          >
            Built for scale. <br />Designed for <span className="text-sky-400" style={{ color: accentColor }}>flexibility.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 font-sans font-light leading-relaxed max-w-2xl"
          >
            {siteSettingsForHero(siteName, siteSlogan)}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={onCtaClick}
              className="px-5 py-2.5 rounded font-sans font-semibold text-xs uppercase tracking-widest bg-sky-600 cursor-pointer shadow-md text-white hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
              id="hero_cta_explore"
              aria-label="Explore the latest website news updates"
            >
              <span>Explore News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded font-sans text-xs uppercase tracking-widest font-semibold border border-slate-800 bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
              aria-label="Contact support"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Dynamic Minimal Statistics Widget from template */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-4 text-left"
        >
          <div className="w-full border border-white/10 rounded-xl bg-white/5 backdrop-blur-md grid grid-cols-2 p-6 gap-6 shadow-2xl">
            <div className="border-r border-white/10 pr-4">
              <div className="text-sky-400 text-3xl font-extrabold font-sans tracking-tight">14M+</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-1">Active Users</div>
            </div>
            <div className="pl-2">
              <div className="text-emerald-400 text-3xl font-extrabold font-sans tracking-tight">46k+</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-1">Modules Loaded</div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WCAG 2.1 AA Screen Reader Standard</span>
            </span>
            <span className="font-bold text-slate-200">100% Core</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function siteSettingsForHero(siteName: string, siteSlogan: string) {
  return `${siteName} — ${siteSlogan}`;
}
