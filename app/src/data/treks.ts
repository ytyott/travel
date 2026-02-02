export interface Trek {
  id: string;
  name: string;
  nameLine2: string;
  image: string;
  duration: string;
  difficulty: string;
  maxAltitude: string;
  bestMonths: string;
  description: string;
  eyebrow?: string;
}

export const trekData: Trek[] = [
  {
    id: 'everest-base-camp',
    name: 'EVEREST',
    nameLine2: 'BASE CAMP',
    image: '/everest_basecamp_trail.jpg',
    duration: '12–14 days',
    difficulty: 'Moderate–Hard',
    maxAltitude: '5,364m',
    bestMonths: 'Mar–May, Sep–Nov',
    description: 'Follow the Khumbu to the foot of the world\'s highest peak—villages, monasteries, and big mountain moments.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'annapurna-base-camp',
    name: 'ANNAPURNA',
    nameLine2: 'BASE CAMP',
    image: '/annapurna_sanctuary.jpg',
    duration: '7–10 days',
    difficulty: 'Moderate',
    maxAltitude: '4,130m',
    bestMonths: 'Mar–May, Oct–Nov',
    description: 'Trek into the sanctuary for 360° peaks, rhododendron forests, and warm teahouse hospitality.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'langtang-valley',
    name: 'LANGTANG',
    nameLine2: 'VALLEY',
    image: '/langtang_forest_path.jpg',
    duration: '7–8 days',
    difficulty: 'Moderate',
    maxAltitude: '4,984m',
    bestMonths: 'Mar–May, Oct–Nov',
    description: 'A quieter trail from forest to alpine meadows, rich with Tamang culture and big views.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'manaslu-circuit',
    name: 'MANASLU',
    nameLine2: 'CIRCUIT',
    image: '/manaslu_lodge_view.jpg',
    duration: '14–16 days',
    difficulty: 'Hard',
    maxAltitude: '5,106m',
    bestMonths: 'Mar–May, Oct–Nov',
    description: 'Remote valleys, dramatic passes, and authentic teahouse life around the eighth highest mountain.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'ghorepani-poon-hill',
    name: 'GHOREPANI',
    nameLine2: 'POON HILL',
    image: '/poonhill_ridge_flags.jpg',
    duration: '4–5 days',
    difficulty: 'Easy–Moderate',
    maxAltitude: '3,210m',
    bestMonths: 'Year-round (clearest Oct–Nov)',
    description: 'A short, rewarding trek to a famous sunrise viewpoint over Dhaulagiri and Annapurna.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'mardi-himal',
    name: 'MARDI',
    nameLine2: 'HIMAL',
    image: '/mardi_ridge_walk.jpg',
    duration: '5–7 days',
    difficulty: 'Moderate',
    maxAltitude: '4,500m',
    bestMonths: 'Mar–May, Oct–Nov',
    description: 'A newer ridge route with fewer crowds, stunning angles on Machapuchare, and crisp alpine air.',
    eyebrow: 'FEATURED TREK',
  },
  {
    id: 'gokyo-lakes',
    name: 'GOKYO',
    nameLine2: 'LAKES',
    image: '/gokyo_lakeside.jpg',
    duration: '12–14 days',
    difficulty: 'Moderate–Hard',
    maxAltitude: '5,357m',
    bestMonths: 'Mar–May, Oct–Nov',
    description: 'Turquoise lakes, a quieter trail, and one of the best panoramas in the Everest region.',
    eyebrow: 'FEATURED TREK',
  },
];
