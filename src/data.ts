import { Avatar } from './types';

export const DEFAULT_AVATARS: Avatar[] = [
  {
    id: '1',
    name: 'ME',
    type: 'main',
    typeName: '메인 캐릭터',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515744514092957847/-_2026_6_14_17.47.34_3.png?ex=6a301e95&is=6a2ecd15&hm=bfed44fd8575d55f4f1097a93df439b782b436976d5461bc8872eed7321fefb8&',
    createdDate: '2005-09-25',
    playTime: 181632,
    description: '외부, 내부와 동시에 상호작용 하며 살아가는 가장 보편적인 모습의 자아.',
    stats: {
      humanity: 85,
      freedom: 75,
      fantasy: 60,
      anonymity: 40,
      expressiveness: 80,
      presence: 90
    },
    borderColor: 'border-fuchsia-400',
    glowColor: 'shadow-fuchsia-500/50',
    badgeText: 'CORE_SELF'
  },
  {
    id: '2',
    name: 'Poly-S01',
    type: 'lowpoly',
    typeName: '로우폴리곤',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745061470736565/-_2026_6_14_16.30.23.png?ex=6a301f17&is=6a2ecd97&hm=802bb6ecaa219aa51a402b32f6aa31b5f359647d79ec6d164b149d1cc48c3305&',
    createdDate: '2005-09-25',
    playTime: 181632,
    description: '수많은 정보를 덜어내고 최소한의 구조만 남긴 아바타. 사회적 페르소나가 제거된 상태로, \'나\'의 가장 깊은 내면에 가까운 모습을 유지한다. 관측자에 따라 단순한 모델로 보일 수도 있으나, 그 안에는 가장 많은 의미가 압축되어 있다고 전해진다.',
    stats: {
      humanity: 40,
      freedom: 65,
      fantasy: 50,
      anonymity: 80,
      expressiveness: 45,
      presence: 60
    },
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-cyan-500/50',
    badgeText: 'REDUX_3D'
  },
  {
    id: '3',
    name: 'Pixie-Bit',
    type: 'pixel',
    typeName: '픽셀 아트',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745060598190210/1.png?ex=6a301f17&is=6a2ecd97&hm=69afed1990de10688e5e66992128a8fc79f16e66527d0d4592fd1681358caa56&',
    createdDate: '2000-04-05',
    playTime: 17544,
    description: '오래된 디지털 기록 속에서 발견된 아바타. 낮은 해상도로 인해 세부적인 정보는 소실되었지만, \'나\'의 기억과 감정은 여전히 보존되어 있다. 과거의 경험이 현재의 자아를 구성한다는 사실을 증명하는 존재.',
    stats: {
      humanity: 70,
      freedom: 85,
      fantasy: 95,
      anonymity: 50,
      expressiveness: 90,
      presence: 75
    },
    borderColor: 'border-yellow-400',
    glowColor: 'shadow-yellow-500/30',
    badgeText: '8BIT_MAGIC'
  },
  {
    id: '4',
    name: 'A.I.-SINK',
    type: 'ai',
    typeName: 'AI 해석',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745060225028146/7baf97ac-cb5d-402a-84f7-2b5380a14c3d.png?ex=6a301f17&is=6a2ecd97&hm=d50f5c83ebfc72a2540ed15c18b29251ad3ed18f52907d0e1ace067f3a63e579&',
    createdDate: '2026-03-04',
    playTime: 2232,
    description: '인공지능이 사용자의 행동 데이터를 분석하여 생성한 아바타. 실제 \'나\'의 모습과 유사하지만 완전히 동일하지는 않다. 때때로 메인 캐릭터조차 인식하지 못한 성향을 드러내기도 한다. 이 아바타가 얼마나 실제 자아에 가까운지는 아직 밝혀지지 않았다.',
    stats: {
      humanity: 30,
      freedom: 90,
      fantasy: 100,
      anonymity: 90,
      expressiveness: 95,
      presence: 85
    },
    borderColor: 'border-purple-400',
    glowColor: 'shadow-purple-500/50',
    badgeText: 'ALGO_HEFT'
  },
  {
    id: '5',
    name: 'Draft-Out',
    type: 'sketch',
    typeName: '스케치 이미지',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745062389289172/-_2026_6_14_17.47.34_2.png?ex=6a301f18&is=6a2ecd98&hm=2a04dfa54dcbf6a1499bd1eb25b0fb3b4d16ab2dd8e8916e722d19c36e62366c&',
    createdDate: '2018-08-30',
    playTime: 70080,
    description: '완성되지 않은 선들로 이루어진 아바타. 지속적으로 형태가 변화하며, 새로운 경험을 획득할 때마다 일부 구조가 수정된다. 성장 가능성이 가장 높은 개체로 분류되지만, 완전한 형태가 관측된 사례는 존재하지 않는다.',
    stats: {
      humanity: 95,
      freedom: 95,
      fantasy: 30,
      anonymity: 95,
      expressiveness: 50,
      presence: 40
    },
    borderColor: 'border-slate-400',
    glowColor: 'shadow-slate-500/50',
    badgeText: 'PRIMORDIAL'
  },
  {
    id: '6',
    name: 'mix of tastes',
    type: 'collage',
    typeName: '콜라주',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745062858915860/-_2026_6_14_17.47.34.png?ex=6a301f18&is=6a2ecd98&hm=a8b557ac017ab41220a1c7a2491b2edf45f228c2b4dd637b209e5aea8d0c379a&',
    createdDate: '2016-10-31',
    playTime: 87672,
    description: '다양한 취향과 기억의 파편으로 구성된 아바타. 음악, 패션, 게임, 영화 등 \'나\'가 좋아하는 요소들이 하나의 형태로 결합되어 있다. 일부 조각은 시간이 지나며 사라지고, 새로운 조각이 추가되기도 한다. \'나\'와 가장 높은 동기화율을 가진 개체 중 하나.',
    stats: {
      humanity: 60,
      freedom: 99,
      fantasy: 90,
      anonymity: 30,
      expressiveness: 99,
      presence: 99
    },
    borderColor: 'border-red-400',
    glowColor: 'shadow-red-500/50',
    badgeText: 'MAXIMALISM'
  },
  {
    id: '7',
    name: 'Pinko-Waving',
    type: 'mascot',
    typeName: '마스코트 일러스트',
    imageUrl: 'https://cdn.discordapp.com/attachments/1324728082166190130/1515745061994762293/-_2026_6_14_17.47.34_1.png?ex=6a301f17&is=6a2ecd97&hm=2186d2c02b84c4beff031d8c39b473af8471a3e3e0587310477ed97c6847e752&',
    createdDate: '2024-03-25',
    playTime: 17544,
    description: '완전히 새로운 형태를 선택한 아바타. 본질적인 모습에서 완전히 탈피하여 \'나\'의 외모, 성별, 나이와 같은 정보는 더 이상 의미를 갖지 않는다. 디지털 공간에서 가장 높은 자유도를 가진 계열로 기록되어 있다.',
    stats: {
      humanity: 90,
      freedom: 80,
      fantasy: 80,
      anonymity: 60,
      expressiveness: 85,
      presence: 50
    },
    borderColor: 'border-pink-400',
    glowColor: 'shadow-pink-400/50',
    badgeText: 'MASCOT'
  }
];
