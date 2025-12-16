import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring, useMotionValue } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  Search, Plus, Mic, Lock, Fingerprint, ChevronRight, Settings, Check, 
  Menu, X, Bot, Grid, ListFilter, Mic2, FileText, LayoutGrid, 
  MoreVertical, ArrowUpDown, Smartphone, Tag, Clock, Database, Download, Star
} from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const features = [
  {
    id: "home",
    title: "Your Thoughts. Organized.",
    description: "Keep your ideas synchronized and structured. Switch views, search instantly, and let AI organize it for you.",
    color: "#a855f7", // Purple
    align: "left"
  },
  {
    id: "security",
    title: "Privacy First.",
    description: "Your notes are yours alone. Lock the app with biometrics and keep everything encrypted on-device.",
    color: "#10b981", // Emerald
    align: "right"
  },
  {
    id: "voice",
    title: "Capture Everything.",
    description: "Record voice notes and get instant offline transcripts. Perfect for meetings, lectures, or random ideas.",
    color: "#f43f5e", // Rose
    align: "left"
  },
  {
    id: "ai",
    title: "On-Device Intelligence.",
    description: "Chat with your notes, summarize long texts, and generate titles—all without sending data to the cloud.",
    color: "#6366f1", // Indigo
    align: "right"
  },
];

// --- App Accurate Colors & Styles ---
// Based on NoteGuard Codebase Analysis
const THEME = {
    background: "#121212",
    surface: "#1E1E1E",
    primary: "#a855f7", // Purple-500 equivalent
    text: "#E5E7EB", // Gray-200
    textSecondary: "#9CA3AF", // Gray-400
    border: "rgba(255,255,255,0.08)"
};

const HeaderAction = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
    <div className={cn(
        "p-2 rounded-full transition-colors",
        active ? "bg-purple-500/10 text-purple-400" : "text-neutral-400 hover:bg-white/5"
    )}>
        <Icon className="w-5 h-5" />
    </div>
);

const FilterChip = ({ label, active = false, icon: Icon }: { label: string, active?: boolean, icon?: any }) => (
    <div className={cn(
        "px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 border transition-colors",
        active 
            ? "bg-purple-500/20 text-purple-400 border-purple-500/20" 
            : "bg-[#1E1E1E] text-neutral-400 border-white/5 hover:bg-[#252525]"
    )}>
        {Icon && <Icon className="w-3 h-3" />}
        {label}
    </div>
);

// --- High Fidelity Screens ---

const ScreenHome = () => (
  <div className="h-full w-full bg-[#121212] flex flex-col font-sans relative overflow-hidden select-none">
    {/* Top Status Bar Area (Simulated) */}
    <div className="h-2 w-full"></div>

    {/* App Header */}
    <div className="px-4 py-3 flex items-center justify-between z-10 border-b border-white/5">
        <div className="flex items-center gap-3">
             <img src={`${import.meta.env.BASE_URL}/icon.png`} alt="NoteGuard" className="w-8 h-6 object-contain" />
        </div>
        <div className="flex items-center gap-1">
             <HeaderAction icon={LayoutGrid} />
             <HeaderAction icon={ArrowUpDown} />
             <HeaderAction icon={Search} />
             <HeaderAction icon={Bot} active />
             <HeaderAction icon={Settings} />
        </div>
    </div>
    
    {/* Quick Filter Chips */}
    <div className="py-3 pl-4 flex gap-2 overflow-x-hidden relative">
         <FilterChip label="All (4)" active icon={FileText} />
         <FilterChip label="Tagged (1)" icon={Tag} />
         <FilterChip label="Audio (1)" icon={Mic} />
         {/* Fade to indicate scroll */}
         <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#121212] to-transparent pointer-events-none"></div>
    </div>

    {/* Note List (Masonry-style Grid simulation) */}
    <div className="flex-1 px-3 pb-20 flex flex-col gap-3 font-sans overflow-hidden">
        
        {/* Voice Note Card */}
        <div className="p-4 rounded-2xl bg-[#1E1E1E] shadow-sm border border-white/5">
            <div className="flex justify-between items-start mb-3">
                 <div className="px-2 py-0.5 rounded-lg bg-neutral-800 border border-white/5 text-[10px] text-purple-400 font-medium">#voice-note</div>
            </div>
             
             {/* Voice Preview */}
             <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-purple-500/5">
                <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-purple-400" />
                </div>
                 <div className="flex-1 flex gap-0.5 items-center h-4">
                    {[0.4, 0.7, 0.3, 0.9, 0.5, 0.6, 0.8, 0.4, 0.6, 0.3, 0.7, 0.2].map((h,i) => (
                        <div key={i} className="w-1 rounded-full bg-purple-500/40" style={{height: `${h * 100}%`, opacity: i % 2 === 0 ? 0.8 : 0.4 }}></div>
                    ))}
                 </div>
            </div>
            
            <h3 className="text-[15px] font-semibold text-white mb-1 leading-snug">testing voice</h3>
            <p className="text-[11px] text-neutral-500 font-medium">Edited few seconds ago • 2 words</p>
        </div>

        {/* Checklist Card */}
        <div className="p-4 rounded-2xl bg-[#1E1E1E] shadow-sm border border-white/5">
             <div className="space-y-2.5">
                <div className="flex gap-3 items-center opacity-50">
                    <div className="w-4 h-4 rounded-[4px] bg-purple-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-[13px] text-neutral-400 line-through">Buy groceries</span>
                </div>
                 <div className="flex gap-3 items-center">
                    <div className="w-4 h-4 rounded-[4px] border border-neutral-600"></div>
                    <span className="text-[13px] text-neutral-200">Finish project design</span>
                </div>
                 <div className="flex gap-3 items-center">
                    <div className="w-4 h-4 rounded-[4px] border border-neutral-600"></div>
                    <span className="text-[13px] text-neutral-200">Call Mom</span>
                </div>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 pt-2 border-t border-white/5">Edited 24 minutes ago • 11 words</p>
        </div>

        {/* Text Card */}
        <div className="p-4 rounded-2xl bg-[#1E1E1E] shadow-sm border border-white/5">
             <h3 className="text-[15px] font-semibold text-white mb-1 leading-snug">Kyoto Trip Plan</h3>
             <p className="text-[13px] text-neutral-400 line-clamp-3 leading-relaxed">
                 Visit Fushimi Inari early to avoid crowds. Then head to Arashiyama bamboo grove. Don't forget to try the matcha ice cream near the station!
             </p>
             <p className="text-[11px] text-neutral-500 font-medium mt-3">2 hours ago • 34 words • 1 min read</p>
        </div>
    </div>

    {/* FAB */}
    <div className="absolute bottom-6 right-6 z-20">
        <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/40 transform hover:scale-105 transition-transform active:scale-95 cursor-pointer">
            <Plus className="w-7 h-7 text-white stroke-[2.5]" />
        </div>
    </div>
  </div>
);

const ScreenSettings = () => (
    <div className="h-full w-full bg-[#121212] flex flex-col font-sans relative text-neutral-200 overflow-y-auto no-scrollbar">
        <div className="p-4 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-[#121212] z-10">
            <ChevronRight className="w-6 h-6 rotate-180 text-neutral-400" />
            <span className="text-lg font-bold text-white tracking-wide">Settings</span>
        </div>
        
        <div className="p-4 space-y-8 pb-10">
            {/* Display */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">Display</h4>
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <LayoutGrid className="w-6 h-6 text-neutral-400" />
                         <div>
                             <p className="text-[15px] font-medium text-white">Expanded View</p>
                             <p className="text-[13px] text-neutral-500">Show full note content in lists</p>
                         </div>
                     </div>
                     <div className="w-11 h-6 bg-[#333] rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-neutral-500 rounded-full"></div></div>
                 </div>
            </div>

            {/* Security */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">Security</h4>
                 <div className="flex flex-col gap-6">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <Fingerprint className="w-6 h-6 text-neutral-400" />
                             <div>
                                 <p className="text-[15px] font-medium text-white">Use Biometrics</p>
                                 <p className="text-[13px] text-neutral-500">Unlock notes with fingerprint/face</p>
                             </div>
                         </div>
                         <div className="w-11 h-6 bg-[#333] rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-neutral-500 rounded-full"></div></div>
                     </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <Lock className="w-6 h-6 text-neutral-400" />
                             <div>
                                 <p className="text-[15px] font-medium text-white">App Lock</p>
                                 <p className="text-[13px] text-neutral-500 leading-tight">Lock the entire app with PIN or<br/>biometrics</p>
                             </div>
                         </div>
                         <div className="w-11 h-6 bg-[#333] rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-neutral-500 rounded-full"></div></div>
                     </div>
                 </div>
            </div>

            {/* AI Models */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">AI Models</h4>
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="w-6 h-6 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-purple-400" />
                         </div>
                         <div>
                             <p className="text-[15px] font-medium text-white">Manage AI Models</p>
                             <p className="text-[13px] text-neutral-500 leading-tight">Download and configure AI models for<br/>chat and speech-to-text</p>
                         </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-neutral-600" />
                 </div>
            </div>

            {/* Backup & Restore */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">Backup & Restore</h4>
                 
                 <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/5">
                    <div className="flex gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Database className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                             <p className="text-[15px] font-bold text-white">Export Backup</p>
                             <p className="text-[13px] text-neutral-500">Share backup file to save it anywhere.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex-1 bg-purple-500 text-white text-[13px] font-semibold py-2.5 rounded-full text-center">Export</div>
                        <div className="flex-1 border border-white/20 text-neutral-300 text-[13px] font-semibold py-2.5 rounded-full text-center">Encrypted</div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
);

const ScreenVoice = () => (
    <div className="h-full w-full bg-[#121212] flex flex-col font-sans relative text-neutral-200">
         <div className="p-4 flex items-center justify-between border-b border-white/5">
             <ChevronRight className="w-6 h-6 rotate-180 text-neutral-400" />
             <span className="text-lg font-bold text-white tracking-wide">Voice Note</span>
             <Settings className="w-5 h-5 text-neutral-400" />
        </div>

        <div className="flex-1 flex flex-col p-4 gap-4">
             {/* Mic Area */}
             <div className="bg-[#1E1E1E] rounded-2xl p-6 flex flex-col items-center justify-center border border-white/5 h-64 relative overflow-hidden group">
                 {/* Bg Glow */}
                 <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-500"></div>

                 <div className="bg-[#2d2d2d] px-3 py-1.5 rounded-full flex items-center gap-2 mb-8 border border-white/5 z-10">
                     <Bot className="w-3 h-3 text-purple-400" />
                     <span className="text-xs text-neutral-300 font-medium">Whisper Tiny EN</span>
                 </div>
                 
                 {/* Mic Button */}
                 <div className="w-20 h-20 rounded-full bg-[#2d2d2d] flex items-center justify-center relative cursor-pointer z-10 shadow-lg shadow-black/50">
                     <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
                     <Mic2 className="w-8 h-8 text-purple-400 relative z-10" />
                 </div>
                 <p className="text-sm text-neutral-500 mt-6 font-medium">Tap to recording...</p>
             </div>

             {/* Transcription Placeholder */}
             <div className="bg-[#1E1E1E] rounded-2xl p-5 flex-1 border border-white/5 opacity-80">
                 <h4 className="text-sm font-semibold text-white mb-2">Transcription</h4>
                 <div className="space-y-2">
                     <div className="h-2 w-3/4 bg-neutral-800 rounded-full"></div>
                     <div className="h-2 w-full bg-neutral-800 rounded-full"></div>
                     <div className="h-2 w-5/6 bg-neutral-800 rounded-full"></div>
                 </div>
             </div>
        </div>
    </div>
);

const ScreenAI = () => (
    <div className="h-full w-full bg-[#121212] flex flex-col font-sans relative text-neutral-200 overflow-y-auto no-scrollbar">
        <div className="p-4 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-[#121212] z-10">
            <ChevronRight className="w-6 h-6 rotate-180 text-neutral-400" />
            <span className="text-lg font-bold text-white tracking-wide">AI Models</span>
        </div>

        <div className="p-4 pt-6 space-y-8 pb-20">
            {/* Transcription Models */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">Transcription Models (Whisper)</h4>
                 <div className="space-y-3">
                     {/* Whisper Tiny */}
                     <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/5 relative overflow-hidden group">
                         <div className="flex justify-between items-start mb-2">
                             <div>
                                 <h3 className="text-[15px] font-bold text-white mb-2">Whisper Tiny EN</h3>
                                 <div className="flex gap-2 mb-2">
                                     <div className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center gap-1">
                                         <Mic className="w-2.5 h-2.5" /> Whisper
                                     </div>
                                     <div className="px-2 py-0.5 rounded-md bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold">Tiny</div>
                                 </div>
                             </div>
                             <Download className="w-5 h-5 text-purple-400" />
                         </div>
                         <p className="text-[12px] text-neutral-500">Lightweight speech-to-text model (English)</p>
                     </div>

                     {/* Whisper Base */}
                     <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/5 relative overflow-hidden group">
                         <div className="flex justify-between items-start mb-2">
                             <div>
                                 <h3 className="text-[15px] font-bold text-white mb-2">Whisper Base EN</h3>
                                 <div className="flex gap-2 mb-2">
                                     <div className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center gap-1">
                                         <Mic className="w-2.5 h-2.5" /> Whisper
                                     </div>
                                      <div className="px-2 py-0.5 rounded-md bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold">Base</div>
                                 </div>
                             </div>
                             <Download className="w-5 h-5 text-purple-400" />
                         </div>
                         <p className="text-[12px] text-neutral-500">Higher quality speech-to-text (English)</p>
                     </div>
                 </div>
            </div>

             {/* LLMs */}
            <div>
                 <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">Text Generation Models (LLMs)</h4>
                 <p className="text-[11px] text-neutral-600 mb-4">Available to Download</p>
                 
                 <div className="space-y-3">
                     {/* LLaMA */}
                     <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                         <div className="flex justify-between items-start mb-3">
                             <h3 className="text-[15px] font-bold text-white">LLaMA 3.2 - 1B - SpinQuant</h3>
                             <Download className="w-5 h-5 text-purple-400" />
                         </div>
                         <div className="flex gap-2">
                             <div className="px-2 py-1 rounded-lg bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold flex items-center gap-1">
                                 <Database className="w-2.5 h-2.5" /> 1.24 B
                             </div>
                             <div className="px-2 py-1 rounded-lg bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold flex items-center gap-1">
                                 <Download className="w-2.5 h-2.5" /> 1.14 GB
                             </div>
                              <div className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center gap-1">
                                 <Star className="w-2.5 h-2.5 fill-purple-300" /> Featured
                             </div>
                         </div>
                     </div>
                     
                     {/* Phi 4 Mini */}
                      <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                         <div className="flex justify-between items-start mb-3">
                             <h3 className="text-[15px] font-bold text-white">Phi 4 Mini - 4B - Quantized</h3>
                             <Download className="w-5 h-5 text-purple-400" />
                         </div>
                         <div className="flex gap-2">
                             <div className="px-2 py-1 rounded-lg bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold flex items-center gap-1">
                                 <Database className="w-2.5 h-2.5" /> 3.82 B
                             </div>
                             <div className="px-2 py-1 rounded-lg bg-[#2a2a2a] text-neutral-400 text-[10px] font-bold flex items-center gap-1">
                                 <Download className="w-2.5 h-2.5" /> 4.63 GB
                             </div>
                              <div className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center gap-1">
                                 <Star className="w-2.5 h-2.5 fill-purple-300" /> Featured
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        {/* FAB */}
        <div className="absolute bottom-6 right-6 z-20">
            <div className="w-14 h-14 bg-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/40 transform hover:scale-105 transition-transform active:scale-95 cursor-pointer text-black">
                <Plus className="w-7 h-7 stroke-[2.5]" />
            </div>
        </div>
    </div>
);

export default function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Floating Phone Effects
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -25]); 
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]); 

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig); 
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig); 
  
  const combinedRotateX = useTransform(() => rotateXSpring.get());
  const combinedRotateY = useTransform(() => rotateY.get() + rotateYSpring.get());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = features.map(f => document.getElementById(`feature-${f.id}`));
      let currentIdx = 0;
      let minDist = Infinity;
      sections.forEach((sec, idx) => {
          if (!sec) return;
          const r = sec.getBoundingClientRect();
          const dist = Math.abs(r.top - window.innerHeight / 2);
          if (dist < minDist) {
              minDist = dist;
              currentIdx = idx;
          }
      });
      setActiveFeature(currentIdx);
    };
    
    const onMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX / window.innerWidth - 0.5);
        mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-10 perspective-2000">
          
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={cn(
                  "w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 opacity-20",
                  activeFeature === 0 ? "bg-purple-600 translate-x-[10%]" :
                  activeFeature === 1 ? "bg-emerald-600 translate-x-[-10%]" :
                  activeFeature === 2 ? "bg-rose-600 translate-y-[10%]" :
                  "bg-indigo-600 translate-y-[-10%]"
              )}></div>
          </div>

          {/* 3D Phone Shell */}
      {/* 3D Phone Shell */}
          <motion.div 
            style={{ 
                rotateX: combinedRotateX,
                rotateY: combinedRotateY,
                scale,
                z: 100
            }} 
            className="relative transform-3d cursor-grab active:cursor-grabbing scale-[0.85] md:scale-100 transition-transform duration-500"
          >
              <div 
                className="relative w-[320px] h-[680px] bg-[#121212] rounded-[48px] shadow-2xl overflow-hidden border-[6px] border-[#2a2a2a]"
                style={{
                    boxShadow: `
                        0 0 0 2px #1a1a1a,
                        4px 4px 0 2px #0f0f0f, 
                        7px 7px 0 2px #0a0a0a, 
                        10px 10px 0 2px #050505,
                        0 30px 60px -15px rgba(0,0,0,0.8),
                        0 0 50px -10px rgba(255,255,255,0.05)
                    `
                }}
              >
                  {/* Glass Reflection */}
                  <div className="absolute inset-0 rounded-[42px] ring-1 ring-white/10 z-50 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-[#121212]">
                       <motion.div
                         initial={false}
                         animate={{ opacity: activeFeature === 0 ? 1 : 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute inset-0"
                       ><ScreenHome /></motion.div>
                       
                       <motion.div
                         initial={false}
                         animate={{ opacity: activeFeature === 1 ? 1 : 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute inset-0"
                       ><ScreenSettings /></motion.div>
                       
                       <motion.div
                         initial={false}
                         animate={{ opacity: activeFeature === 2 ? 1 : 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute inset-0"
                       ><ScreenVoice /></motion.div>
                       
                        <motion.div
                         initial={false}
                         animate={{ opacity: activeFeature === 3 ? 1 : 0 }}
                         transition={{ duration: 0.5 }}
                         className="absolute inset-0"
                       ><ScreenAI /></motion.div>
                  </div>
              </div>
          </motion.div>
      </div>

      {/* Feature Text Sections */}
      <div className="relative z-20">
        {features.map((feature, index) => (
            <div 
                id={`feature-${feature.id}`}
                key={feature.id} 
                className={cn(
                    "min-h-screen flex items-center px-6 md:px-20 pointer-events-none",
                    feature.align === 'left' ? "justify-start" : "justify-end"
                )}
            >
                <div className="max-w-lg pointer-events-auto w-full">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-black/30 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] md:bg-transparent md:backdrop-blur-none md:p-0 md:border-none md:shadow-none transition-all duration-300"
                     >
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
                            {feature.title}
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            {feature.description}
                        </p>
                         <div className="mt-8 flex items-center gap-2">
                             <div className="h-1 w-12 rounded-full" style={{backgroundColor: feature.color}}></div>
                         </div>
                     </motion.div>
                </div>
            </div>
        ))}
      </div>
      
      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .transform-3d { transform-style: preserve-3d; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
