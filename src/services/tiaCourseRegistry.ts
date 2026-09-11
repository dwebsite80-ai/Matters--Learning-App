import { ALL_SUBJECTS, ALL_TOPICS, ALL_LESSONS, getTopicsBySubject, getLessonById } from '../data/initialContent';
import { Subject, Topic, Lesson, TiaLessonContext, SubjectId } from '../types';

export interface DynamicCourseTopic {
  id: string;
  title: string;
  title_hi?: string;
  description: string;
  description_hi?: string;
}

export interface DynamicCourseLesson {
  id: string;
  title: string;
  title_hi?: string;
  subtitle?: string;
  subtitle_hi?: string;
  hook?: string;
}

export interface DynamicCourseScope {
  id: string;
  name: string; // Clean concise display name, e.g. "Case Studies", "Economics"
  fullName: string; // Full subject title, e.g. "Case Studies: Real-World Business Stories"
  name_hi: string;
  description: string;
  description_hi?: string;
  topics: DynamicCourseTopic[];
  lessons: DynamicCourseLesson[];
  syllabusSummary: string;
  allowedKeywords: string[];
  primaryEntities: string[];
  outOfScopeResponse: {
    en: string;
    hi: string;
  };
}

/**
 * Extracts a clean, concise course name from raw subject names.
 * Strips secondary subtitles (after colon) or parentheticals.
 * E.g.: "Case Studies: Real-World Business Stories" -> "Case Studies"
 *       "Personality Development" -> "Personality Development"
 *       "Dressing Sense" -> "Dressing Sense"
 *       "Economics" -> "Economics"
 */
export function extractCleanCourseName(rawName: string): string {
  if (!rawName) return 'Current Course';
  let clean = rawName.split(':')[0].trim();
  clean = clean.split('(')[0].trim();
  return clean || rawName;
}

/**
 * Stopwords to exclude when auto-indexing keywords from course text
 */
const COMMON_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'how', 'what', 'why', 'who', 'when', 'where', 'which',
  'ye', 'yeh', 'hai', 'hain', 'ka', 'ke', 'ki', 'ko', 'me', 'mein', 'se', 'par',
  'aur', 'kya', 'kaise', 'kyu', 'kyun', 'nahi', 'tha', 'thi', 'the', 'hota', 'hoti',
  'hote', 'kar', 'kare', 'karna', 'liye', 'apne', 'aap', 'mera', 'meri',
]);

/**
 * Dynamically constructs the course scope for ANY subject/course.
 * Supports all existing courses and any future courses added to the curriculum.
 */
export function getCourseScope(
  subjectId?: string,
  context?: TiaLessonContext
): DynamicCourseScope {
  // 1. Resolve subject from ALL_SUBJECTS or context
  const targetId = subjectId || context?.subjectId;
  let subject = targetId ? ALL_SUBJECTS.find((s) => s.id === targetId) : undefined;

  // If not found by ID, try matching subjectName
  if (!subject && context?.subjectName) {
    subject = ALL_SUBJECTS.find(
      (s) =>
        s.name.toLowerCase() === context.subjectName.toLowerCase() ||
        extractCleanCourseName(s.name).toLowerCase() ===
          extractCleanCourseName(context.subjectName).toLowerCase()
    );
  }

  // If not found and lessonId exists, look up the lesson's subject
  if (!subject && context?.lessonId) {
    const lesson = getLessonById(context.lessonId);
    if (lesson?.subject_id) {
      subject = ALL_SUBJECTS.find((s) => s.id === lesson.subject_id);
    }
  }

  // Synthesize dynamic subject if not in ALL_SUBJECTS (e.g., newly added runtime course)
  const resolvedSubject: Subject = subject || {
    id: (targetId as SubjectId) || ('case-studies' as SubjectId),
    name: context?.subjectName || 'Case Studies: Real-World Business Stories',
    name_hi: context?.subjectName_hi || 'केस स्टडीज़: वास्तविक व्यापार कहानियां',
    description:
      context?.courseDescription ||
      'Real-world business case studies, founder stories, and business models.',
    description_hi: context?.courseDescription_hi || '',
    icon: 'Briefcase',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    themeColor: '#059669',
    order_index: 1,
  };

  const cleanName = extractCleanCourseName(resolvedSubject.name);

  // 2. Resolve topics dynamically
  const topics: DynamicCourseTopic[] =
    context?.courseTopics && context.courseTopics.length > 0
      ? context.courseTopics.map((t) => ({
          id: t.id,
          title: t.title,
          title_hi: t.title_hi,
          description: t.description || '',
          description_hi: '',
        }))
      : getTopicsBySubject(resolvedSubject.id).map((t) => ({
          id: t.id,
          title: t.title,
          title_hi: t.title_hi,
          description: t.description || '',
          description_hi: t.description_hi || '',
        }));

  // 3. Resolve lessons dynamically
  const lessons: DynamicCourseLesson[] =
    context?.courseLessons && context.courseLessons.length > 0
      ? context.courseLessons.map((l) => ({
          id: l.id,
          title: l.title,
          title_hi: l.title_hi,
          subtitle: l.subtitle,
          subtitle_hi: '',
        }))
      : ALL_LESSONS.filter((l) => l.subject_id === resolvedSubject.id).map((l) => ({
          id: l.id,
          title: l.title_en || l.title,
          title_hi: l.title_hi,
          subtitle: l.subtitle_en || l.subtitle,
          subtitle_hi: l.subtitle_hi,
          hook: l.hook_en || l.hook,
        }));

  // 4. Build dynamic syllabus summary
  const syllabusLines: string[] = [
    `Course: ${cleanName} (${resolvedSubject.name})`,
    `Description: ${resolvedSubject.description}`,
    `Core Topics (${topics.length}):`,
    ...topics.map((t, idx) => `  ${idx + 1}. ${t.title}: ${t.description}`),
    `Lessons (${lessons.length}):`,
    ...lessons.map((l, idx) => `  ${idx + 1}. ${l.title} ${l.subtitle ? `(${l.subtitle})` : ''}`),
  ];
  const syllabusSummary = syllabusLines.join('\n');

  // 5. Build dynamic out-of-scope response
  // Explicitly adheres to user-mandated template:
  // Hindi: "Ye topic mere current course ka part nahi hai 😊. Main abhi aapko [COURSE NAME] se related questions mein help kar sakti hoon."
  // English: "That topic isn't part of my current course 😊. I can help you with questions related to [COURSE NAME]."
  const outOfScopeResponse = {
    hi: `Ye topic mere current course ka part nahi hai 😊. Main abhi aapko ${cleanName} se related questions mein help kar sakti hoon.`,
    en: `That topic isn't part of my current course 😊. I can help you with questions related to ${cleanName}.`,
  };

  // 6. Extract allowed keywords and primary entities from course data
  const keywordSet = new Set<string>();
  const entitySet = new Set<string>();

  // Add course names
  keywordSet.add(cleanName.toLowerCase());
  keywordSet.add(resolvedSubject.name.toLowerCase());
  if (resolvedSubject.name_hi) keywordSet.add(resolvedSubject.name_hi.toLowerCase());

  // Harvest all words and phrases from topics
  topics.forEach((t) => {
    entitySet.add(t.title.toLowerCase());
    tokenizeIntoSet(t.title, keywordSet);
    tokenizeIntoSet(t.description, keywordSet);
    if (t.title_hi) {
      entitySet.add(t.title_hi.toLowerCase());
      tokenizeIntoSet(t.title_hi, keywordSet);
    }
    if (t.description_hi) tokenizeIntoSet(t.description_hi, keywordSet);
  });

  // Harvest all words and key entities from lessons
  lessons.forEach((l) => {
    entitySet.add(l.title.toLowerCase());
    // Extract company / person name before colon if present (e.g. "Airbnb", "Zerodha", "Amul", "Canva", "OYO")
    if (l.title.includes(':')) {
      const entity = l.title.split(':')[0].trim().toLowerCase();
      if (entity) entitySet.add(entity);
    }
    tokenizeIntoSet(l.title, keywordSet);
    if (l.subtitle) tokenizeIntoSet(l.subtitle, keywordSet);
    if (l.title_hi) tokenizeIntoSet(l.title_hi, keywordSet);
  });

  // Common pedagogical/learning query terms that are valid inside any active course
  const generalLearningTerms = [
    'purpose', 'meaning', 'concept', 'definition', 'example', 'udharan', 'samjhao',
    'kya hota hai', 'kaise kaam karta hai', 'disadvantages', 'advantages', 'fayde',
    'nuksan', 'features', 'importance', 'kyu zaruri hai', 'summary', 'overview',
  ];
  generalLearningTerms.forEach((t) => keywordSet.add(t));

  return {
    id: resolvedSubject.id,
    name: cleanName,
    fullName: resolvedSubject.name,
    name_hi: resolvedSubject.name_hi,
    description: resolvedSubject.description,
    description_hi: resolvedSubject.description_hi,
    topics,
    lessons,
    syllabusSummary,
    allowedKeywords: Array.from(keywordSet),
    primaryEntities: Array.from(entitySet),
    outOfScopeResponse,
  };
}

/**
 * Tokenizes a string into non-stopword tokens and adds them to a Set.
 */
function tokenizeIntoSet(text: string, set: Set<string>): void {
  if (!text) return;
  const words = text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !COMMON_STOPWORDS.has(w));

  words.forEach((w) => set.add(w));
}

/**
 * Returns clean names for all subjects in the system
 */
export function getAllSubjectMap(): Record<string, string> {
  const map: Record<string, string> = {};
  ALL_SUBJECTS.forEach((s) => {
    map[s.id] = extractCleanCourseName(s.name);
  });
  return map;
}
