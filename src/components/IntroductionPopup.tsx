import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, HelpCircle, Gamepad2, X } from 'lucide-react';
import { playRetroClick, playSystemReset } from '../utils/audio';

interface IntroductionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroductionPopup({ isOpen, onClose }: IntroductionPopupProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    playRetroClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div id="intro-popup-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 overflow-y-auto">
        <motion.div
          id="intro-popup-window"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white border-[3px] border-slate-900 rounded-xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] overflow-hidden font-mono text-slate-800"
        >
          {/* Scanline Effect Banner */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,24,38,0.01)_95%,rgba(217,70,239,0.03)_95%)] bg-[length:100%_4px] bg-repeat opacity-40"></div>

          {/* Window Header */}
          <div id="intro-header" className="relative z-10 flex items-center justify-between bg-fuchsia-400 p-4 border-b-[3px] border-slate-900 text-slate-950 select-none">
            <div className="flex items-center space-x-2">
              {/* Decorative controls */}
              <div className="flex space-x-1.5 mr-1.5">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-950"></span>
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-slate-950"></span>
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
              </div>
              <Terminal className="h-5 w-5 text-slate-950" />
              <span className="font-black tracking-widest text-xs md:text-sm">
                ★ SYSTEM_INFO.EXE (EGO_LINK) ★
              </span>
            </div>
            
            {/* Control Box */}
            <div className="flex items-center">
              <button 
                onClick={handleClose}
                className="p-1 px-2.5 bg-rose-500 hover:bg-rose-600 rounded border-2 border-slate-905 transition-colors cursor-pointer text-xs font-black border-slate-900"
                title="CLOSE"
              >
                X
              </button>
            </div>
          </div>

          {/* Connected status bar */}
          <div className="flex items-center justify-between text-[10px] text-cyan-900 bg-cyan-100 px-4 py-2 border-b-[3px] border-slate-900">
            <span className="flex items-center gap-1 font-bold">
              ★ SYSTEM INFORMATION PANEL ★
            </span>
            <span className="text-fuchsia-700 font-extrabold tracking-wider uppercase">
              ONLINE
            </span>
          </div>

          {/* Content area */}
          <div className="p-5 max-h-[400px] overflow-y-auto text-slate-650 text-xs md:text-sm leading-relaxed space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-fuchsia-950 font-black text-sm border-b-2 border-slate-900 pb-1.5">
                <Gamepad2 className="h-4 w-4 text-fuchsia-600 animate-pulse" />
                <span>[ 에고 링크넷 ]</span>
              </div>
              <p className="text-slate-800 font-medium">
                현대인은 하나의 몸으로만 존재하지 않는다.
게임, SNS, 가상세계 더불어 현실에서까지 우리는 서로 다른 형태의 아바타를 만들고 사용하며 살아간다.
이 작품은 게임의 캐릭터 도감 및 프로필 UI 형식을 차용하여 다양한 시각적 매체로 구현된 아바타들을 하나의 카탈로그로 기록한다.
각 아바타는 단순한 캐릭터가 아니라 현실 속 인간이 디지털 공간에서 생성한 또 다른 몸이며, 각각 다른 정체성과 역할을 가진다.
              </p>
              <p className="text-slate-800 font-medium">
                이 카탈로그는 메인 캐릭터인 <span className="text-cyan-800 font-black">‘나 (Core Self)’</span>로부터 분화되어 나온 
                다양한 자아를 시각화한 정보 아카이브이다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-[11px] text-slate-800">
                <div className="bg-cyan-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-cyan-900 block font-black">◇ 로우폴리곤 (Poly)</span>
                  불필요한 요소를 걷어낸 본질적 자아.
                </div>
                <div className="bg-amber-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-amber-950 block font-black">◇ 픽셀 아트 (Bit)</span>
                  어린 시절의 기억과 향수를 담은 자아.
                </div>
                <div className="bg-purple-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-purple-950 block font-black">◇ AI 해석 (Genesis)</span>
                  AI가 나를 분석해 만들어낸 모습.
                </div>
                <div className="bg-slate-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-slate-905 block font-black text-slate-800">◇ 스케치 (Draft)</span>
                  형성 중인 자아.
                </div>
                <div className="bg-red-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-red-950 block font-black">◇ 콜라주 (Static)</span>
                  수많은 취향들로 이루어진 자아.
                </div>
                <div className="bg-pink-100 p-2 border-[2px] border-slate-900 rounded-lg shadow-[2px_2px_0px_rgba(15,23,42,1)]">
                  <span className="text-pink-950 block font-black">◇ 마스코트 (Pinko)</span>
                  기존의 모습에서 탈피하여 스스로 선택한 전혀 다른 자아.
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Deck */}
          <div className="flex items-center justify-between p-4 bg-slate-100 border-t-[3px] border-slate-900">
            <span className="text-[10px] text-slate-700 font-bold uppercase">
              MODULE STATE: ACTIVE
            </span>
            <button
              onClick={() => {
                playSystemReset();
                onClose();
              }}
              className="px-5 py-2.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-black text-xs tracking-wider rounded border-2 border-slate-900 shadow-[3px_3px_0px_rgba(15,23,42,1)] active:scale-95 transition-all uppercase cursor-pointer"
            >
              System Connect!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
