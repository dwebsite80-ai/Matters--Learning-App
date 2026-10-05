// High-quality educational and editorial images matching the Matters design direction

export const USER_AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'; // Portrait of young man (Anurag) with warm smile

export const PROFILE_COVER_IMAGE =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'; // Majestic sunset mountain valley

// Course / Subject Thumbnails & Hero Banners
export const SUBJECT_IMAGES: Record<string, { thumbnail: string; banner: string }> = {
  'law-rights': {
    thumbnail:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', // Golden scales of justice in warm library
    banner:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  },
  'money-finance': {
    thumbnail:
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80', // Stacked gold coins & finance desk
    banner:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },
  economics: {
    thumbnail:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', // Glowing world globe & global market charts
    banner:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  'bihar-gk': {
    thumbnail:
      'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=600&q=80', // Ancient Nalanda / heritage architecture
    banner:
      'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=1200&q=80',
  },
  'polity-constitution': {
    thumbnail:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80', // Parliament & constitutional pillars
    banner:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  },
  'history-movement': {
    thumbnail:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80', // Colosseum & classical historical stone monument
    banner:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  },
  'personality-development': {
    thumbnail:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', // Confident executive leader & communication
    banner:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
  },
  'dressing-sense': {
    thumbnail:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', // Tailored wardrobe, fabric elegance & style
    banner:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  },
  'case-studies': {
    thumbnail:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // Modern glass skyscraper business headquarters
    banner:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  'time-management': {
    thumbnail:
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80', // Mechanical clock, hourglass & calendar
    banner:
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
  },
  'first-aid': {
    thumbnail:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', // Emergency response & medical care
    banner:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },
  'survival-skills': {
    thumbnail:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80', // Campfire, wilderness compass & outdoor survival
    banner:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
  },
  'modern-farming': {
    thumbnail:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80', // Lush modern sustainable precision agriculture
    banner:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
  philosophy: {
    thumbnail:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', // Classical Greek philosopher bust / marble sculpture
    banner:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  paradoxes: {
    thumbnail:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80', // Surreal mind-bending geometric physics
    banner:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  },
};

// Fallback images for lessons
export const DEFAULT_LESSON_IMAGES = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', // Greek sculpture
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80', // Parliament
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', // Scales of justice
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80', // Gavel
  'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=600&q=80', // Law documents
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80', // Cyber padlock
];

export function getSubjectThumbnail(subjectId: string): string {
  return (
    SUBJECT_IMAGES[subjectId]?.thumbnail ||
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  );
}

export function getSubjectBanner(subjectId: string): string {
  return (
    SUBJECT_IMAGES[subjectId]?.banner ||
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'
  );
}

export function getLessonImage(lessonIndex: number, subjectId?: string): string {
  if (subjectId && SUBJECT_IMAGES[subjectId]) {
    return SUBJECT_IMAGES[subjectId].thumbnail;
  }
  return DEFAULT_LESSON_IMAGES[lessonIndex % DEFAULT_LESSON_IMAGES.length];
}
