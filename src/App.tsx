import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DEFAULT_AVATARS } from './data';
import { Avatar, PersonaType } from './types';
import EgoBranchingTree from './components/EgoBranchingTree';
import AvatarProfileTerminal from './components/AvatarProfileTerminal';
import IntroductionPopup from './components/IntroductionPopup';
import { HelpCircle, Activity, Disc, Cpu, Volume2, Key, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { playSelectChirp } from './utils/audio';

export default function App() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(true);
  const [systemTime, setSystemTime] = useState<string>('');

  // 1. Initialize data from localStorage or default dataset on mount
  useEffect(() => {
    const cached = localStorage.getItem('y2k_avatar_db_v2');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Robust migration to replace old generated/expired/Discord images with newly generated local assets
          const migrated = parsed.map((cachedChar: Avatar) => {
            const defaultMatch = DEFAULT_AVATARS.find((d) => d.id === cachedChar.id);
            if (defaultMatch) {
              const updated = { ...cachedChar };
              // Force migration if the cached image is empty, includes expired discord link, or generated/temporary indicators
              if (
                !cachedChar.imageUrl ||
                cachedChar.imageUrl.includes('cdn.discordapp.com') ||
                cachedChar.imageUrl.includes('input_file') ||
                cachedChar.imageUrl.includes('mascot_pink_cat') ||
                cachedChar.imageUrl.startsWith('http') || // Update any remaining old external links
                cachedChar.imageUrl.includes('main_character') || // Migrate recently generated placeholders back to original
                cachedChar.imageUrl.includes('lowpoly_brown_hair') ||
                cachedChar.imageUrl.includes('pixel_character') ||
                cachedChar.imageUrl.includes('ai_character') ||
                cachedChar.imageUrl.includes('sketch_character') ||
                cachedChar.imageUrl.includes('collage_character') ||
                cachedChar.imageUrl.includes('pink_cat_mascot') ||
                cachedChar.imageUrl.startsWith('/src/') || // Migrate legacy /src/ paths to local public folder paths
                cachedChar.id === '1' || // Force synchronize core ME image
                cachedChar.id === '4'    // Force synchronize core AI Interpretation image
              ) {
                updated.imageUrl = defaultMatch.imageUrl;
              }
              // Sync updated default descriptions to match preset changes
              updated.description = defaultMatch.description;
              // Keep default names in sync
              updated.name = defaultMatch.name;
              // Sync updated creation dates & accumulated play times to reflect user adjustments instantly
              updated.createdDate = defaultMatch.createdDate;
              updated.playTime = defaultMatch.playTime;
              return updated;
            }
            return cachedChar;
          });
          setAvatars(migrated);
          // Sync any migrated improvements back to cache
          localStorage.setItem('y2k_avatar_db_v2', JSON.stringify(migrated));
          // Set selection to first element if cached ID is not present
          const hasMain = migrated.some((a: Avatar) => a.id === '1');
          setSelectedId(hasMain ? '1' : migrated[0].id);
          return;
        }
      } catch (e) {
        console.error('Failed parsing cached avatars', e);
      }
    }
    // Fallback to default
    setAvatars(DEFAULT_AVATARS);
    setSelectedId('1');
  }, []);

  // 2. Sync to localStorage on avatar edits
  const saveState = (updatedList: Avatar[]) => {
    setAvatars(updatedList);
    localStorage.setItem('y2k_avatar_db_v2', JSON.stringify(updatedList));
  };

  // 3. System time ticking clock (Y2K retro aesthetic)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Force Year 2000 styling or present year with miliseconds
      const year = 2000;
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      setSystemTime(`${year}-${month}-${date} // ${hour}:${min}:${sec}.${ms}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 50);
    return () => clearInterval(timer);
  }, []);

  // Selected Avatar lookup
  const selectedAvatar = avatars.find((a) => a.id === selectedId) || null;

  // 4. Update core properties or stats of an avatar in the array
  const handleUpdateAvatar = (updated: Avatar) => {
    const newList = avatars.map((a) => (a.id === updated.id ? updated : a));
    saveState(newList);
  };

  // 5. Delete an avatar (ensures main avatar with ID '1' is protected)
  const handleDeleteAvatar = (id: string) => {
    if (id === '1') return; // Core consciousness is immortal
    const newList = avatars.filter((a) => a.id !== id);
    saveState(newList);

    // Fall back to main avatar selection
    setSelectedId('1');
  };

  // 6. Reset database back to default initial layout
  const handleResetDatabase = () => {
    if (window.confirm('정말로 도감 데이터베이스를 초기 상태로 초기화할까요?')) {
      setAvatars(DEFAULT_AVATARS);
      setSelectedId('1');
      localStorage.setItem('y2k_avatar_db_v2', JSON.stringify(DEFAULT_AVATARS));
    }
  };

  return (
    <div id="y2k-app-root" className="min-h-screen w-full bg-[#ecf3fb] text-slate-900 flex flex-col overflow-x-hidden selection:bg-fuchsia-500 selection:text-white p-3 md:p-6 relative">
      
      {/* Dynamic scanlines, digital hologram grid overlay in bright theme */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_95%,rgba(6,182,212,0.12)_95%),linear-gradient(to_bottom,rgba(15,23,42,0.02)_95%,rgba(6,182,212,0.12)_95%)] bg-[size:32px_32px]"></div>
      
      {/* Top Banner Glowing Ring Backdrop (Light Theme optimization) */}
      <div className="absolute top-0 right-[25%] w-[400px] h-[155px] bg-cyan-300/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-[20%] w-[500px] h-[185px] bg-fuchsia-300/10 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Retro Cyber System Header (Y2K Game Console Style with Solid offset shadows and custom window controls) */}
      <header id="y2k-system-header" className="relative z-10 w-full max-w-7xl mx-auto mb-6 bg-white border-[3px] border-slate-900 p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center justify-between gap-4 font-mono select-none overflow-hidden">
        
        {/* Left Section Logo & Blinking Light */}
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <Disc className="h-8 w-8 text-fuchsia-500 animate-[spin_4s_linear_infinite] drop-shadow-[2px_2px_0px_rgba(15,23,42,0.9)]" />
            <div className="absolute inset-0 m-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black tracking-widest text-slate-900 flex items-center gap-1.5 uppercase">
              ★ EGO_LINK_NET <span className="text-[10px] bg-fuchsia-400 text-slate-950 px-1.5 py-0.5 rounded border-2 border-slate-900 font-black">v2.0</span> ★
            </h1>
            <p className="text-[9px] text-cyan-800 font-black leading-none tracking-tight">
              MULTI-REALITY MULTIVERSAL AVATAR REGISTRY [READY]
            </p>
          </div>
        </div>

        {/* Audio mock tracks / decorative visualizers in margins */}
        <div className="hidden lg:flex items-center space-x-2 text-slate-700 border-2 border-slate-900 rounded bg-[#e8f7f9] px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold">
          <Volume2 className="h-4 w-4 text-[#0eb1cc] animate-pulse" />
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 bg-[#0eb1cc] h-1 animate-[pulse_0.7s_infinite_alternate]"></div>
            <div className="w-0.5 bg-fuchsia-500 h-3 animate-[pulse_0.4s_infinite_alternate_delay-100]"></div>
            <div className="w-0.5 bg-amber-500 h-2 animate-[pulse_0.9s_infinite_alternate_delay-200]"></div>
            <div className="w-0.5 bg-[#0eb1cc] h-2.5 animate-[pulse_0.5s_infinite_alternate]"></div>
            <div className="w-0.5 bg-pink-500 h-1.5 animate-[pulse_0.6s_infinite_alternate_delay-150]"></div>
          </div>
          <span className="text-[8.5px] text-fuchsia-600 font-black tracking-wider animate-pulse uppercase">SYNCING_CONSCIOUSNESS</span>
        </div>

        {/* Right Section: Time stamp & Trigger popup manual */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto text-right text-xs">
          {/* Retro Clock */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right bg-yellow-100 px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono w-full md:w-auto shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <span className="text-[8px] text-slate-800 font-black select-none leading-none mb-1">SYSTEM_UTC_UPTIME</span>
            <span className="text-slate-900 font-black text-[10px] md:text-[11px] whitespace-nowrap tracking-wide">
              {systemTime || '2000-01-01 // 00:00:00.00'}
            </span>
          </div>

          {/* Guide Popup Trigger Button */}
          <button
            id="system-guide-popup-trigger"
            onClick={() => {
              playSelectChirp();
              setIsIntroOpen(true);
            }}
            className="px-4 py-2.5 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-950 font-black text-xs tracking-wider rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all uppercase cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <HelpCircle className="h-4 w-4 text-fuchsia-600" />
            <span className="hidden sm:inline">GUIDE_BOOK.HLP</span>
          </button>
        </div>

      </header>

      {/* Main Container Section split into Branch Tree & Profile Cards */}
      <main id="y2k-main-stage" className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side (5 value column): Radial Branch Map */}
        <section id="system-radial-branches" className="lg:col-span-5 h-full min-h-[500px]">
          <EgoBranchingTree
            avatars={avatars}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onResetDatabase={handleResetDatabase}
          />
        </section>

        {/* Right Side (7 value column): Editable Avatar profile deck */}
        <section id="system-profile-editor" className="lg:col-span-7 h-full">
          <AvatarProfileTerminal
            avatar={selectedAvatar}
            onUpdate={handleUpdateAvatar}
            onDelete={handleDeleteAvatar}
          />
        </section>

      </main>

      {/* Introduction Popup Component overlay */}
      <IntroductionPopup
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />

      {/* Bottom Footer Decor */}
      <footer id="y2k-system-footer" className="relative z-10 w-full max-w-7xl mx-auto mt-6 text-center text-[10px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200 pt-3.5 select-none">
        <span>© EGO_LINK_NETWORKS. ALL COGNITIONS REGISTERED UNDER SECTION_Y2K.</span>
        <span className="text-cyan-600/80 flex items-center gap-1 font-semibold">
          <Cpu className="h-3 w-3 animate-spin text-fuchsia-500" />
          CHRONO_BUFFER_SAFE_DOCK [3000]
        </span>
      </footer>
    </div>
  );
}
