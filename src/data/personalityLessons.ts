import { Lesson, Question } from '../types';
import { PERSONALITY_LESSONS_PART1, PERSONALITY_QUESTIONS_PART1 } from './personalityLessonsPart1';
import { PERSONALITY_LESSONS_PART2, PERSONALITY_QUESTIONS_PART2 } from './personalityLessonsPart2';

export const PERSONALITY_LESSONS: Lesson[] = [
  ...PERSONALITY_LESSONS_PART1,
  ...PERSONALITY_LESSONS_PART2,
];

export const PERSONALITY_QUESTIONS: Question[] = [
  ...PERSONALITY_QUESTIONS_PART1,
  ...PERSONALITY_QUESTIONS_PART2,
];
