export interface AvatarStats {
  humanity: number;     // 인간성
  freedom: number;      // 자유
  fantasy: number;      // 환상성
  anonymity: number;    // 익명성
  expressiveness: number; // 표현력
  presence: number;     // 존재감
}

export type PersonaType = 
  | 'main' 
  | 'lowpoly' 
  | 'pixel' 
  | 'ai' 
  | 'sketch' 
  | 'collage' 
  | 'mascot'
  | 'custom';

export interface Avatar {
  id: string;
  name: string;
  type: PersonaType;
  typeName: string; // e.g. "메인 캐릭터", "로우폴리곤", etc.
  imageUrl: string;
  createdDate: string;
  playTime: number; // in hours
  description: string;
  stats: AvatarStats;
  borderColor: string;
  glowColor: string;
  badgeText: string;
}
