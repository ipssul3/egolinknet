import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from '../types';
import { RefreshCw, Play } from 'lucide-react';
import { playSelectChirp, playSystemReset } from '../utils/audio';

interface EgoBranchingTreeProps {
  avatars: Avatar[];
  selectedId: string;
  onSelect: (id: string) => void;
  onResetDatabase: () => void;
}

export default function EgoBranchingTree({
  avatars,
  selectedId,
  onSelect,
  onResetDatabase,
}: EgoBranchingTreeProps) {
  // Find main character
  const mainAvatar = useMemo(() => avatars.find(a => a.type === 'main'), [avatars]);
  
  // Find surrounding sub-avatars
  const subAvatars = useMemo(() => avatars.filter(a => a.type !== 'main'), [avatars]);

  // Coordinates for 6-radial positions on an 500x500 box (Desktop only)
  const positionMap: Record<string, { x: number; y: number; angleName: string }> = {
    // 12 o'clock
    'lowpoly': { x: 250, y: 70, angleName: 'STRUCTURE // 001' },
    // 2 o'clock
    'pixel': { x: 410, y: 160, angleName: '8-BIT_BITRATE // 002' },
    // 4 o'clock
    'ai': { x: 410, y: 340, angleName: 'ALGORITHM_SINK // 003' },
    // 6 o'clock
    'sketch': { x: 250, y: 430, angleName: 'DRAFT_FRAME // 004' },
    // 8 o'clock
    'collage': { x: 90, y: 340, angleName: 'STATIC_COLLAGE // 005' },
    // 10 o'clock
    'mascot': { x: 90, y: 160, angleName: 'MASCOT // 006' },
  };

  const centerPos = { x: 250, y: 250 };

  const handleSelect = (id: string) => {
    playSelectChirp();
    onSelect(id);
  };

  const handleReset = () => {
    playSystemReset();
    onResetDatabase();
  };

  return (
    <div id="ego-branch-tree-container" className="relative flex flex-col h-full bg-white border-[3px] border-slate-900 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] overflow-hidden font-mono text-slate-800">
      {/* Visual background grid - vibrant cyan cyber grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"></div>
      
      {/* Diagonal digital grid crosslines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,transparent_20%,rgba(6,182,212,0.02)_20%,rgba(6,182,212,0.02)_21%,transparent_21%)] bg-[size:56px_56px]"></div>

      {/* Frame Header Decals (Y2K Neon Blue Titlebar) */}
      <div className="relative z-10 flex items-center justify-between bg-cyan-400 text-slate-900 px-4 py-2.5 border-b-[3px] border-slate-900 select-none text-[11px] md:text-xs font-black">
        <div className="flex items-center space-x-2">
          {/* Decorative Window Controls mimic early OS/Consoles */}
          <div className="flex space-x-1 mr-1.5">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-950"></span>
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-slate-950"></span>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
          </div>
          <span className="font-black tracking-wider uppercase">[LINK_TERMINAL // MATRIX_MAP]</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-cyan-950 text-[10px] hidden sm:inline">NODES: {avatars.length}/12</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-rose-200 hover:bg-rose-300 text-slate-950 px-2.5 py-1 rounded border-2 border-slate-900 transition-all uppercase text-[10px] font-black tracking-tight cursor-pointer shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px ] active:shadow-0"
            title="Reset Database to Defaults"
          >
            <RefreshCw className="h-3 w-3" />
            RESET_SYS
          </button>
        </div>
      </div>

      {/* Layout A: DESKTOP CONSTELLATION RADIAL RADAR (Visible >= md) */}
      <div className="hidden md:block relative flex-1 min-h-[500px] w-full" id="constellation-desktop-stage">
        {/* Pulsing Target Radar Circles (Faint lines to remove harsh outlines) */}
        <div className="absolute top-[250px] left-[250px] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-dashed border-cyan-150/15 rounded-full pointer-events-none animate-[pulse_6s_infinite]"></div>
        <div className="absolute top-[250px] left-[250px] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-dashed border-fuchsia-150/15 rounded-full pointer-events-none animate-[spin_55s_linear_infinite]"></div>
        <div className="absolute top-[250px] left-[250px] -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] border border-double border-cyan-150/10 rounded-full pointer-events-none"></div>

        {/* Dynamic Laser Cable SVG Pathways */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '500px', height: '500px' }} viewBox="0 0 500 500">
          <defs>
            <linearGradient id="neonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.45" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render digital pathways from core to sub-avatars */}
          {subAvatars.map((person) => {
            const pos = positionMap[person.type] || { x: 250 + Math.random() * 100 - 50, y: 250 + Math.random() * 100 - 50 };
            const isSelected = selectedId === person.id;
            
            return (
              <g key={person.id}>
                {/* Underlay glow path */}
                <motion.line
                  x1={centerPos.x}
                  y1={centerPos.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? '#d946ef' : '#06b6d4'}
                  strokeWidth={isSelected ? 3 : 1.5}
                  opacity={isSelected ? 0.95 : 0.45}
                  filter="url(#glowFilter)"
                  initial={{ strokeDasharray: '6,6' }}
                  animate={{ strokeDashoffset: -120 }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                />

                {/* Animated laser pulse bullet shooting down the wire */}
                <motion.circle
                  r="3.5"
                  fill={isSelected ? '#d946ef' : '#06b6d4'}
                  filter="url(#glowFilter)"
                  animate={{
                    cx: [centerPos.x, pos.x],
                    cy: [centerPos.y, pos.y],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5 + Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Node: MAIN CORE AVATAR (세아) - Bolder size */}
        {mainAvatar && (
          <div
            style={{
              position: 'absolute',
              left: `${centerPos.x}px`,
              top: `${centerPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="z-30 group"
          >
            <motion.div
              layoutId={`node-frame-${mainAvatar.id}`}
              onClick={() => handleSelect(mainAvatar.id)}
              className={`relative cursor-pointer transition-all ${
                selectedId === mainAvatar.id
                  ? 'scale-115 rounded-full shadow-[5px_5px_0px_0px_rgba(217,70,239,1)]'
                  : 'hover:scale-108 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.45)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
              }`}
            >
              {/* Spinning compass badge around core */}
              <div className="absolute inset-0 -m-3 border-[2px] border-dashed border-fuchsia-500 rounded-full animate-[spin_25s_linear_infinite] opacity-60"></div>
              
              {/* Portrait image container of MAIN */}
              <div className="w-24 h-24 rounded-full bg-slate-50 border-[3px] border-slate-900 overflow-hidden relative shadow-inner">
                <img
                  src={mainAvatar.imageUrl}
                  alt={mainAvatar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80";
                  }}
                />
                
                {/* Glitch filter layer on selection */}
                {selectedId === mainAvatar.id && (
                  <div className="absolute inset-0 bg-fuchsia-500/10 mix-blend-overlay animate-pulse"></div>
                )}
              </div>

              {/* Character miniature name pill */}
              <div className="absolute -bottom-2 right-1 text-[11px] hover:scale-105 active:scale-95 transition-all text-white font-black bg-fuchsia-600 border-2 border-slate-900 text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] uppercase select-none tracking-tight">
                {mainAvatar.name.split(' (')[0]}
              </div>

              {/* Core Crown Spark */}
              <div className="absolute -top-2.5 -left-1 bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded border-2 border-slate-900 text-[8px] font-black tracking-tight uppercase shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                {mainAvatar.badgeText}
              </div>
            </motion.div>
          </div>
        )}

        {/* Radial Sub-Avatars nodes - Enormously Larger and Centered */}
        {subAvatars.map((person) => {
          const coords = positionMap[person.type] || { x: centerPos.x, y: centerPos.y - 120, angleName: 'CUSTOM_LINK' };
          const isSelected = selectedId === person.id;

          return (
            <div
              key={person.id}
              style={{
                position: 'absolute',
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="z-20 group"
            >
              <div className="absolute -top-6 whitespace-nowrap text-[8px] text-cyan-950 group-hover:text-fuchsia-600 font-extrabold transition-colors pointer-events-none bg-yellow-100 px-1.5 py-0.5 border-2 border-slate-900 rounded shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                {coords.angleName}
              </div>

              <motion.div
                onClick={() => handleSelect(person.id)}
                className={`relative cursor-pointer transition-all ${
                  isSelected
                    ? 'scale-115 rounded-lg shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] border-slate-900'
                    : 'hover:scale-110 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.4)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                {/* Node portrait crop - ENLARGED to w-18 h-18 */}
                <div className="w-18 h-18 rounded-lg bg-white border-[3px] border-slate-900 overflow-hidden relative">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&q=80";
                    }}
                  />
                </div>

                {/* Sub name tag */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-900 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded whitespace-nowrap tracking-tight shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all">
                  {person.name.split(' (')[0]}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Layout B: MOBILE HIERARCHICAL BRANCH LIST (Visible < md) */}
      <div className="block md:hidden flex-1 p-4 space-y-6" id="constellation-mobile-stage">
        {/* Core Consciousness Box */}
        {mainAvatar ? (
          <div className="flex flex-col items-center">
            <div className="inline-block relative">
              {/* Connected node */}
              <div
                onClick={() => handleSelect(mainAvatar.id)}
                className={`p-1 rounded-full border-[3px] bg-white ${
                  selectedId === mainAvatar.id
                    ? 'border-slate-900 shadow-[4px_4px_0px_0px_rgba(217,70,239,1)] scale-105'
                    : 'border-slate-400'
                } transition-all cursor-pointer`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={mainAvatar.imageUrl}
                    alt={mainAvatar.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&q=80";
                    }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-fuchsia-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] whitespace-nowrap uppercase">
                CORE_SELF
              </div>
            </div>
            <p className="text-center text-[10px] text-fuchsia-600 mt-3 font-extrabold uppercase tracking-widest bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
              {mainAvatar.name}
            </p>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-3 text-xs border-[3px] border-dashed border-slate-900 rounded-lg bg-slate-50">
            [ CORE_CONSCIOUSNESS_OFFLINE ]
          </div>
        )}

        {/* Tree Connection Arrow */}
        <div className="flex flex-col items-center justify-center py-2 h-8 text-cyan-500 animate-pulse">
          <div className="w-1.5 h-full bg-slate-900"></div>
          <div className="text-xs font-black text-slate-900 -mt-1">▼</div>
        </div>

        {/* Derivative Sub-Consciousness Grid */}
        <div>
          <h4 className="text-cyan-900 text-[10px] font-black tracking-wider mb-3.5 text-center border-b-[3px] border-slate-900 pb-1.5 uppercase">
            ▲ MULTI-MEDIUM BRANCH STATES ▲
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {subAvatars.map((person) => {
              const isSelected = selectedId === person.id;
              return (
                <div
                  key={person.id}
                  onClick={() => handleSelect(person.id)}
                  className={`relative flex flex-col items-center p-2.5 rounded-lg bg-white border-[2.5px] border-slate-900 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-50 shadow-[3px_3px_0px_0px_rgba(6,182,212,1)] scale-105'
                      : 'hover:border-slate-700 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,0.4)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
                  }`}
                >
                  <div className="w-14 h-14 rounded overflow-hidden mb-1.5 border-2 border-slate-900">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80";
                      }}
                    />
                  </div>
                  <span className="text-[8px] font-black text-slate-900 text-center truncate w-full tracking-tighter">
                    {person.name.split(' (')[0]}
                  </span>
                  <span className="text-[7px] text-cyan-950 font-black mt-0.5 px-1.5 py-0.5 bg-cyan-300 rounded border border-slate-900 uppercase">
                    {person.badgeText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>



      {/* Cyber Station Margin Decals (Bright Theme Friendly) */}
      <div className="bg-slate-50 p-2 border-t border-slate-100 text-[9px] text-slate-400 flex items-center justify-between select-none font-bold">
        <span>SINK_SYS: CORE_SECURE_SYNC</span>
        <span className="animate-pulse text-cyan-600">▲ ONLINE // LAB_STAGE_Y2K</span>
      </div>
    </div>
  );
}
