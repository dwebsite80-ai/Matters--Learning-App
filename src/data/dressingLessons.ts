import { Lesson, Question } from '../types';
import { DRESSING_LESSONS_PART1, DRESSING_QUESTIONS_PART1 } from './dressingLessonsPart1';
import { DRESSING_LESSONS_PART2, DRESSING_QUESTIONS_PART2 } from './dressingLessonsPart2';

export const DRESSING_LESSONS: Lesson[] = [
  ...DRESSING_LESSONS_PART1,
  ...DRESSING_LESSONS_PART2,
];

export const DRESSING_QUESTIONS: Question[] = [
  ...DRESSING_QUESTIONS_PART1,
  ...DRESSING_QUESTIONS_PART2,
];
