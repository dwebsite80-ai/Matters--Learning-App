import { Subject, Topic, Lesson, Question, SubjectId } from '../types';
import { SUBJECTS, TOPICS } from './subjects';
import { LAW_LESSONS, LAW_QUESTIONS } from './lawLessons';
import { FINANCE_LESSONS, FINANCE_QUESTIONS } from './financeLessons';
import { ECONOMICS_LESSONS, ECONOMICS_QUESTIONS } from './economicsLessons';
import { BIHAR_LESSONS, BIHAR_QUESTIONS } from './biharLessons';
import { POLITY_LESSONS, POLITY_QUESTIONS } from './polityLessons';
import { HISTORY_LESSONS, HISTORY_QUESTIONS } from './historyLessons';
import { PERSONALITY_LESSONS, PERSONALITY_QUESTIONS } from './personalityLessons';
import { DRESSING_LESSONS, DRESSING_QUESTIONS } from './dressingLessons';
import { CASE_STUDIES_LESSONS_PART1, CASE_STUDIES_QUESTIONS_PART1 } from './caseStudiesLessonsPart1';
import { CASE_STUDIES_LESSONS_PART2, CASE_STUDIES_QUESTIONS_PART2 } from './caseStudiesLessonsPart2';
import { TIME_MANAGEMENT_LESSONS_PART1, TIME_MANAGEMENT_QUESTIONS_PART1 } from './timeManagementLessonsPart1';
import { TIME_MANAGEMENT_LESSONS_PART2, TIME_MANAGEMENT_QUESTIONS_PART2 } from './timeManagementLessonsPart2';

export const ALL_SUBJECTS: Subject[] = SUBJECTS;
export const ALL_TOPICS: Topic[] = TOPICS;
export const ALL_LESSONS: Lesson[] = [
  ...LAW_LESSONS,
  ...FINANCE_LESSONS,
  ...ECONOMICS_LESSONS,
  ...BIHAR_LESSONS,
  ...POLITY_LESSONS,
  ...HISTORY_LESSONS,
  ...PERSONALITY_LESSONS,
  ...DRESSING_LESSONS,
  ...CASE_STUDIES_LESSONS_PART1,
  ...CASE_STUDIES_LESSONS_PART2,
  ...TIME_MANAGEMENT_LESSONS_PART1,
  ...TIME_MANAGEMENT_LESSONS_PART2,
];
export const ALL_QUESTIONS: Question[] = [
  ...LAW_QUESTIONS,
  ...FINANCE_QUESTIONS,
  ...ECONOMICS_QUESTIONS,
  ...BIHAR_QUESTIONS,
  ...POLITY_QUESTIONS,
  ...HISTORY_QUESTIONS,
  ...PERSONALITY_QUESTIONS,
  ...DRESSING_QUESTIONS,
  ...CASE_STUDIES_QUESTIONS_PART1,
  ...CASE_STUDIES_QUESTIONS_PART2,
  ...TIME_MANAGEMENT_QUESTIONS_PART1,
  ...TIME_MANAGEMENT_QUESTIONS_PART2,
];

// Helper functions for easy data access
export function getSubjectById(subjectId: SubjectId): Subject | undefined {
  return ALL_SUBJECTS.find((s) => s.id === subjectId);
}

export function getTopicsBySubject(subjectId: SubjectId): Topic[] {
  return ALL_TOPICS.filter((t) => t.subject_id === subjectId).sort(
    (a, b) => a.order_index - b.order_index
  );
}

export function getLessonById(lessonId: string): Lesson | undefined {
  // 1. Direct match by lesson id
  const byId = ALL_LESSONS.find((l) => l.id === lessonId);
  if (byId) return byId;

  // 2. If topicId was passed as lessonId, check topic mapping
  const topic = ALL_TOPICS.find((t) => t.id === lessonId);
  if (topic?.lesson_id) {
    const byTopicLessonId = ALL_LESSONS.find((l) => l.id === topic.lesson_id);
    if (byTopicLessonId) return byTopicLessonId;
  }

  // 3. Fallback: match by topic_id
  return ALL_LESSONS.find((l) => l.topic_id === lessonId);
}

export function getLessonByTopicId(topicId: string): Lesson | undefined {
  // 1. First find the topic in ALL_TOPICS to check its explicit lesson_id
  const topic = ALL_TOPICS.find((t) => t.id === topicId);
  if (topic?.lesson_id) {
    const lesson = ALL_LESSONS.find((l) => l.id === topic.lesson_id);
    if (lesson) return lesson;
  }

  // 2. Match directly by lesson.topic_id
  const byTopicId = ALL_LESSONS.find((l) => l.topic_id === topicId);
  if (byTopicId) return byTopicId;

  // 3. Match directly by lesson.id (in case lesson id was passed)
  return ALL_LESSONS.find((l) => l.id === topicId);
}

export function getQuestionsByLessonId(lessonId: string): Question[] {
  const lesson = getLessonById(lessonId);
  if (lesson?.quizQuestions && lesson.quizQuestions.length > 0) {
    return lesson.quizQuestions;
  }
  const targetId = lesson?.id || lessonId;
  return ALL_QUESTIONS.filter((q) => q.lesson_id === targetId);
}

export function getQuestionsBySubjectId(subjectId: SubjectId): Question[] {
  return ALL_QUESTIONS.filter((q) => q.subject_id === subjectId);
}
