import React, { useMemo, useState } from 'react';
import { Avatar, AvatarStats, PersonaType } from '../types';
import { Trash2, AlertTriangle, Calendar, Clock, Smile, Edit3, Image, Shield, Sparkles, Check, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { playRetroClick, playSelectChirp, playEraseSound, playTabTap } from '../utils/audio';

interface AvatarProfileTerminalProps {
  avatar: Avatar | null;
  onUpdate: (updated: Avatar) => void;
  onDelete: (id: string) => void;
}

export default function AvatarProfileTerminal({
  avatar,
  onUpdate,
  onDelete,
}: AvatarProfileTerminalProps) {
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [presetUrlInput, setPresetUrlInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);


  // Calculation for the custom SVG Polygon Radar Chart
  // Center: (100, 100), Radius: 70
  // Stat keys order: humanity, freedom, fantasy, anonymity, expressiveness, presence
  const radarPoints = useMemo(() => {
    if (!avatar) return [];
    const center = 100;
    const maxRadius = 65;
    const statsList = [
      avatar.stats.humanity,
      avatar.stats.freedom,
      avatar.stats.fantasy,
      avatar.stats.anonymity,
      avatar.stats.expressiveness,
      avatar.stats.presence,
    ];

    return statsList.map((val, idx) => {
      const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2; // Start from top (12 o'clock)
      const radius = (val / 100) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    });
  }, [avatar?.stats]);

  const radarPointsString = useMemo(() => {
    return radarPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  }, [radarPoints]);

  // Guidelines representing 20, 40, 60, 80, 100% ranges
  const webGrids = useMemo(() => {
    const center = 100;
    const maxRadius = 65;
    const radii = [13, 26, 39, 52, 65];

    return radii.map(radius => {
      const points = Array.from({ length: 6 }).map((_, idx) => {
        const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      return points;
    });
  }, []);

  if (!avatar) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-yellow-50 border-[3px] border-slate-900 rounded-xl text-slate-800 font-mono text-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
        <div className="p-3 bg-yellow-300 rounded-full border-2 border-slate-900 mb-3.5 shadow-[2px_2px_0px_rgba(15,23,42,1)] animate-[bounce_2s_infinite]">
          <AlertTriangle className="h-8 w-8 text-slate-950" />
        </div>
        <h3 className="font-black text-sm uppercase tracking-widest text-slate-900 bg-yellow-300 px-3 py-1.5 border-2 border-slate-900 rounded shadow-[2px_2px_0px_rgba(15,23,42,1)]">[ NO_TARGET_ACQUIRED ]</h3>
        <p className="text-xs mt-3 max-w-xs leading-relaxed font-bold text-slate-700">
          왼쪽 도감 네트워크망의 아바타 노드를 선택하여 정체성 정보 동기화를 개시하세요.
        </p>
      </div>
    );
  }

  // Pre-configured avatar images fallback preset catalog (Local safe copies)
  const presetCatalog = [
    { label: 'ME', url: 'assets/images/regenerated_image_1781448598653.png' },
    { label: 'Poly-S01', url: 'assets/images/regenerated_image_1781448600947.png' },
    { label: 'Pixie-Bit', url: 'assets/images/regenerated_image_1781448603101.png' },
    { label: 'A.I.-SINK', url: 'assets/images/regenerated_image_1781448612105.png' },
    { label: 'Draft-Out', url: 'assets/images/regenerated_image_1781448615290.png' },
    { label: 'mix of tastes', url: 'assets/images/regenerated_image_1781448609557.png' },
    { label: 'Pinko-Waving', url: 'assets/images/regenerated_image_1781448607718.png' },
  ];

  // Handler for text input edits (instant updates)
  const handleTextChange = (field: keyof Avatar, value: string | number) => {
    onUpdate({
      ...avatar,
      [field]: value
    });
  };

  // Handler for stat range changes
  const handleStatChange = (statName: keyof AvatarStats, value: number) => {
    onUpdate({
      ...avatar,
      stats: {
        ...avatar.stats,
        [statName]: value
      }
    });
  };

  // Preset imageUrl selector
  const selectPresetImage = (url: string) => {
    playSelectChirp();
    onUpdate({
      ...avatar,
      imageUrl: url
    });
    setPresetUrlInput(url);
    setShowImageEditor(false);
  };

  const totalSum = avatar.stats.humanity + avatar.stats.freedom + avatar.stats.fantasy + avatar.stats.anonymity + avatar.stats.expressiveness + avatar.stats.presence;
  const isClippedWarning = totalSum > 520;

  return (
    <div id="avatar-profile-editor" className="relative flex flex-col h-full bg-white border-[3px] border-slate-900 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] overflow-hidden font-mono text-slate-800">
      {/* Subtle digital horizontal scanlines in light theme */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(15,23,42,0.01)_95%,rgba(217,70,239,0.04)_95%)] bg-[length:100%_4px] bg-repeat opacity-40"></div>

      {/* Frame Header UI (Y2K Neon Pink Titlebar) */}
      <div className="relative z-10 flex items-center justify-between bg-fuchsia-400 text-slate-950 px-4 py-2.5 border-b-[3px] border-slate-900 select-none text-[11px] md:text-xs font-black">
        <div className="flex items-center space-x-2">
          {/* Decorative Window Controls mimic early OS/Consoles */}
          <div className="flex space-x-1 mr-1.5">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-950"></span>
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-slate-950"></span>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
          </div>
          <Shield className="h-4 w-4 text-slate-950 rotate-12" />
          <span className="font-black tracking-wider uppercase">[CONSOLE_PROFILE // EGO_ID_{avatar.id}]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-white text-slate-900 border-2 border-slate-900 px-2 py-0.5 rounded text-[9px] font-black tracking-widest shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
            {avatar.typeName.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
        
        {/* BIG PORTRAIT CENTER FIELD - IMAGE CENTRIC */}
        <div className="flex flex-col items-center pb-5 border-b border-dashed border-slate-100">
          
          {/* High-impact massive avatar frame */}
          <div className="relative group w-full max-w-[320px] mb-4">
            {/* Spinning decorative orbit ring on active focus */}
            {avatar.type === 'main' && (
              <div className="absolute inset-0 -m-3.5 border border-dashed border-fuchsia-400 rounded-lg animate-[spin_60s_linear_infinite] opacity-40"></div>
            )}
            
            <div className="w-full h-[360px] rounded-lg bg-slate-50 border-[3.5px] border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden relative transition-all duration-300">
              <img
                src={avatar.imageUrl}
                alt={avatar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";
                }}
              />
              
              {/* Overlay grid and lens filter lines */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,24,38,0)_94%,rgba(217,70,239,0.12)_94%)] bg-[length:100%_4px] bg-repeat opacity-40"></div>
              
              {/* Laser Scanner bar pulsing */}
              <div className="absolute left-0 right-0 h-1 bg-fuchsia-500/80 shadow-[0_0_8px_#d946ef] animate-[bounce_4s_infinite] opacity-60"></div>
              
              {/* Trigger panel overlay for Changing Portrait */}
              <button
                onClick={() => {
                  playTabTap();
                  setShowImageEditor(!showImageEditor);
                }}
                className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-black transition-opacity uppercase cursor-pointer text-center"
              >
                <Image className="h-7 w-7 mb-2 text-cyan-400 animate-pulse" />
                Change PORTRAIT
              </button>
            </div>
          </div>

          {/* Details Form Fields right under the massive portrait */}
          <div className="w-full max-w-sm space-y-3">
            {/* Name Input */}
            <div className="flex items-center gap-2 bg-white border-2 border-slate-900 focus-within:border-fuchsia-500 p-2.5 rounded-lg transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <span className="text-slate-700 font-extrabold pr-1 select-none text-[10px] tracking-wider shrink-0">NAME_TAG:</span>
              <input
                id="avatar-name-input"
                type="text"
                value={avatar.name}
                onChange={(e) => handleTextChange('name', e.target.value)}
                className="flex-1 bg-transparent border-none text-slate-900 focus:outline-none focus:ring-0 font-extrabold placeholder-slate-400 text-sm"
                placeholder="Name of Ego"
              />
              <Edit3 className="h-4 w-4 text-fuchsia-500 opacity-80 shrink-0" />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Created Date Input */}
              <div className="flex items-center gap-2 bg-white border-2 border-slate-900 p-2.5 rounded-lg transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <Calendar className="h-4 w-4 text-cyan-600 shrink-0" />
                <div className="flex-1 text-[10px] flex flex-col min-w-0">
                  <span className="text-[8px] text-slate-500 font-extrabold leading-none select-none uppercase">CREATED.SYS</span>
                  <input
                    id="avatar-created-input"
                    type="date"
                    value={avatar.createdDate}
                    onChange={(e) => handleTextChange('createdDate', e.target.value)}
                    className="bg-transparent border-none text-slate-800 focus:outline-none text-[11px] font-black p-0 mt-0.5 cursor-pointer w-full"
                  />
                </div>
              </div>

              {/* Play Time input */}
              <div className="flex items-center gap-2 bg-white border-2 border-slate-900 p-2.5 rounded-lg transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                <div className="flex-1 text-[10px] flex flex-col min-w-0">
                  <span className="text-[8px] text-slate-500 font-extrabold leading-none select-none uppercase">UPTIME.LOGS</span>
                  <input
                    id="avatar-playtime-input"
                    type="number"
                    min="0"
                    value={avatar.playTime}
                    onChange={(e) => handleTextChange('playTime', parseInt(e.target.value) || 0)}
                    className="bg-transparent border-none text-slate-800 focus:outline-none text-[11px] font-black p-0 mt-0.5 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Preset Image Drawer Panel inside Editor */}
        {showImageEditor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-slate-50 rounded-lg border border-cyan-150 text-xs space-y-4 shadow-inner"
          >
            <div className="flex items-center justify-between border-b border-cyan-100 pb-1.5">
              <span className="text-cyan-700 font-extrabold text-[10px] uppercase tracking-wider">★ PORTRAIT_DATABASE Presets</span>
              <button 
                onClick={() => {
                  playRetroClick();
                  setShowImageEditor(false);
                }}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                [X]
              </button>
            </div>
            
            {/* Custom URL Input Field */}
            <div className="flex gap-2">
              <input
                id="avatar-image-url-input"
                type="text"
                value={presetUrlInput}
                onChange={(e) => setPresetUrlInput(e.target.value)}
                placeholder="Image URL (HTTP://...)"
                className="flex-1 bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-1.5 rounded focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => {
                  if (presetUrlInput.trim()) {
                    playSelectChirp();
                    selectPresetImage(presetUrlInput.trim());
                  }
                }}
                className="px-4 py-1.5 bg-cyan-650 hover:bg-cyan-500 rounded text-white font-black text-[10px] tracking-wide cursor-pointer uppercase border border-cyan-200"
              >
                APPLY
              </button>
            </div>

            {/* Presets Grid */}
            <div>
              <p className="text-slate-500 text-[9px] mb-2 uppercase font-bold tracking-wider">Recommended Presets:</p>
              <div className="grid grid-cols-3 gap-2">
                {presetCatalog.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => selectPresetImage(preset.url)}
                    className="flex flex-col items-center bg-white p-1.5 hover:bg-cyan-50 border border-slate-250 hover:border-cyan-400 rounded transition-all text-left text-[9px] cursor-pointer"
                  >
                    <img 
                      src={preset.url} 
                      alt="" 
                      className="w-10 h-10 rounded object-cover mb-1" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80";
                      }}
                    />
                    <span className="text-[8px] text-slate-500 font-semibold truncate w-full text-center">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bio Description TextArea editable */}
        <div className="space-y-2 text-xs">
          <label className="text-[10px] text-slate-900 font-black uppercase tracking-wider block">
            ■ COGNITIVE_DESC.TXT (정체성 상세 설명)
          </label>
          <div className="relative">
            <textarea
              id="avatar-desc-textarea"
              value={avatar.description}
              onChange={(e) => handleTextChange('description', e.target.value)}
              className="w-full min-h-[95px] bg-white border-2 border-slate-900 rounded-lg p-3 text-slate-900 placeholder-slate-400 leading-relaxed font-mono focus:outline-none focus:border-fuchsia-500 text-xs shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              placeholder="Record multi-dimensional identity characteristics here..."
            />
            <Edit3 className="absolute bottom-3 right-3 h-3.5 text-fuchsia-500/50 pointer-events-none" />
          </div>
        </div>

        {/* Attributes Sliders + SVG Radar Polygon Visualizer */}
        <div className="space-y-4 pt-4 border-t-[3px] border-slate-900">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] text-slate-900 font-extrabold uppercase tracking-wider">
              ■ PROFILE_MATRIX (6대 능력치 스펙트럼)
            </h4>
            <div className="flex gap-2 text-[10px] bg-yellow-101 px-2.5 py-0.5 rounded border-2 border-slate-900 font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] bg-yellow-100">
              <span className="text-slate-800 pr-0.5">SUM.SYS</span>
              <span className={`font-black ${isClippedWarning ? 'text-rose-600 animate-pulse' : 'text-slate-950'}`}>
                {totalSum} pts
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            
            {/* Custom Glowing SVG Radar Polygon Graph (Light Theme Friendly) */}
            <div className="relative w-[180px] h-[180px] shrink-0 bg-emerald-50 rounded-xl border-2 border-slate-900 p-2.5 select-none shadow-[3.5px_3.5px_0px_0px_rgba(15,23,42,1)]">
              
              {/* Radar Graph Title Label Accents */}
              <span className="absolute top-1.5 left-2 text-[7px] text-fuchsia-600 font-extrabold tracking-tighter">HUMANITY</span>
              <span className="absolute top-1.5 right-2 text-[7px] text-cyan-600 font-extrabold tracking-tighter">FREEDOM</span>
              <span className="absolute bottom-5 right-2 text-[7px] text-amber-600 font-extrabold tracking-tighter">FANTASY</span>
              <span className="absolute bottom-1 left-[25%] text-[7px] text-slate-500 font-extrabold tracking-tighter">ANONYMITY</span>
              <span className="absolute bottom-5 left-1 text-[7px] text-purple-600 font-extrabold tracking-tighter">EXPRESS</span>
              <span className="white absolute top-[43%] left-0 text-[7px] text-pink-600 font-extrabold tracking-tighter">PRESENCE</span>

              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Guidelines web grids polygons */}
                {webGrids.map((points, idx) => (
                  <polygon
                    key={idx}
                    points={points}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                  />
                ))}

                {/* Star-Axis beams */}
                {Array.from({ length: 6 }).map((_, idx) => {
                  const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2;
                  const x = 100 + 65 * Math.cos(angle);
                  const y = 100 + 65 * Math.sin(angle);
                  return (
                    <line
                      key={idx}
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                      strokeDasharray="2,2"
                    />
                  );
                })}

                {/* Connected Glowing Active Stats Area Polygon */}
                {radarPointsString && (
                  <>
                    <polygon
                      points={radarPointsString}
                      fill={avatar.type === 'main' ? 'rgba(217,70,239,0.22)' : 'rgba(6,182,212,0.22)'}
                      stroke={avatar.type === 'main' ? '#d946ef' : '#06b6d4'}
                      strokeWidth="2.5"
                    />
                    {/* Glowing nodes */}
                    {radarPoints.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="#ffffff"
                        stroke={avatar.type === 'main' ? '#d946ef' : '#06b6d4'}
                        strokeWidth="1.8"
                      />
                    ))}
                  </>
                )}
              </svg>
            </div>

            {/* Attributes sliders list */}
            <div className="flex-1 w-full space-y-2.5 text-xs text-slate-705">
              
              {/* Slider 1: Humanity */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-fuchsia-600 font-extrabold">인간성 (HUMANITY)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.humanity}%</span>
                </div>
                <input
                  id="stat-humanity-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.humanity}
                  onChange={(e) => handleStatChange('humanity', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-fuchsia-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Slider 2: Freedom */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-600 font-extrabold">자유 (FREEDOM)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.freedom}%</span>
                </div>
                <input
                  id="stat-freedom-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.freedom}
                  onChange={(e) => handleStatChange('freedom', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-cyan-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Slider 3: Fantasy */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber-600 font-extrabold">환상성 (FANTASY)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.fantasy}%</span>
                </div>
                <input
                  id="stat-fantasy-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.fantasy}
                  onChange={(e) => handleStatChange('fantasy', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-amber-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Slider 4: Anonymity */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-extrabold">익명성 (ANONYMITY)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.anonymity}%</span>
                </div>
                <input
                  id="stat-anonymity-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.anonymity}
                  onChange={(e) => handleStatChange('anonymity', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-slate-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Slider 5: Expressiveness */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-purple-650 font-extrabold">표현력 (EXPRESS)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.expressiveness}%</span>
                </div>
                <input
                  id="stat-expressiveness-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.expressiveness}
                  onChange={(e) => handleStatChange('expressiveness', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-purple-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Slider 6: Presence */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-pink-650 font-extrabold">존재감 (PRESENCE)</span>
                  <span className="text-slate-900 font-black">{avatar.stats.presence}%</span>
                </div>
                <input
                  id="stat-presence-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={avatar.stats.presence}
                  onChange={(e) => handleStatChange('presence', parseInt(e.target.value))}
                  onMouseUp={() => playRetroClick()}
                  onTouchEnd={() => playRetroClick()}
                  className="w-full accent-pink-500 bg-slate-200 rounded-lg cursor-pointer h-1.5"
                />
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Footer Controls / Deletion Action (Bright Mode styled) */}
      <div className="p-3 bg-slate-100 border-t-[3px] border-slate-900 flex items-center justify-between select-none relative z-10">
        
        {/* Core items are protected from deletion */}
        {avatar.type === 'main' ? (
          <span className="text-[9px] text-fuchsia-950 font-black uppercase tracking-wider bg-fuchsia-300 px-3 py-1.5 rounded border-2 border-slate-900 shadow-[2px_2px_0px_rgba(15,23,42,1)] mx-auto">
            ★ CORE_PROTECTED (메인 오리지널 의식 보호됨)
          </span>
        ) : (
          <div className="flex items-center gap-2 w-full justify-between">
            {deleteConfirm ? (
              <div className="flex items-center gap-2 w-full">
                <span className="text-[10px] text-amber-600 animate-pulse font-extrabold uppercase shrink-0">ERASE CONFIRM?</span>
                <button
                  id="delete-confirm-yes-btn"
                  onClick={() => {
                     playEraseSound();
                     onDelete(avatar.id);
                     setDeleteConfirm(false);
                  }}
                  className="px-3 py-1.5 bg-red-550 hover:bg-red-500 bg-red-500 text-slate-950 font-black text-[10px] rounded border-2 border-slate-900 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[2.5px_2.5px_0px_rgba(15,23,42,1)]"
                >
                  Confirm Delete [Y]
                </button>
                <button
                  id="delete-confirm-no-btn"
                  onClick={() => {
                     playRetroClick();
                     setDeleteConfirm(false);
                  }}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-350 text-slate-900 font-extrabold text-[10px] rounded hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-slate-900 shadow-[2.5px_2.5px_0px_rgba(15,23,42,1)]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="text-[9px] text-emerald-800 font-black uppercase tracking-widest leading-none bg-emerald-100 border border-emerald-300 px-2 py-1 rounded">
                  ★ STATE_SYNC: SAFED_SECURE
                </span>
                
                <button
                  id="delete-persona-btn"
                  onClick={() => {
                     playRetroClick();
                     setDeleteConfirm(true);
                  }}
                  className="px-3 py-1.5 bg-white border-2 border-slate-900 text-red-650 font-black text-[10px] rounded flex items-center gap-1 cursor-pointer transition-all uppercase shadow-[2.5px_2.5px_0px_rgba(15,23,42,1)] hover:bg-red-500 hover:text-white"
                  title="Remove Ego from Matrix"
                >
                  <Trash2 className="h-3 w-3" />
                  DELETE PERSONA
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
