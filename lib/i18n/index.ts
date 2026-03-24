import { ko } from './ko';
import { en } from './en';

export type Language = 'ko' | 'en';

export const translations = {
  ko,
  en,
} as const;

export type Translations = typeof translations;

export const DEFAULT_LANGUAGE: Language = 'ko';
export const SUPPORTED_LANGUAGES: Language[] = ['ko', 'en'];
