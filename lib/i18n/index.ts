import { ko } from './ko';
import { en } from './en';
import { ja } from './ja';
import { zh } from './zh';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { pt } from './pt';
import { id } from './id';
import { vi } from './vi';
import { th } from './th';
import { ar } from './ar';
import { hi } from './hi';
import { tr } from './tr';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'de' | 'pt' | 'id' | 'vi' | 'th' | 'ar' | 'hi' | 'tr';

export const translations = {
  ko,
  en,
  ja,
  zh,
  es,
  fr,
  de,
  pt,
  id,
  vi,
  th,
  ar,
  hi,
  tr,
} as const;

export type Translations = typeof translations;

export const DEFAULT_LANGUAGE: Language = 'ko';
export const SUPPORTED_LANGUAGES: Language[] = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'id', 'vi', 'th', 'ar', 'hi', 'tr'];

export const LANGUAGE_META: Record<Language, { label: string; flag: string }> = {
  ko: { label: '한국어', flag: '🇰🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  ja: { label: '日本語', flag: '🇯🇵' },
  zh: { label: '中文', flag: '🇨🇳' },
  es: { label: 'Español', flag: '🇪🇸' },
  fr: { label: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  pt: { label: 'Português', flag: '🇧🇷' },
  id: { label: 'Bahasa Indonesia', flag: '🇮🇩' },
  vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
  th: { label: 'ภาษาไทย', flag: '🇹🇭' },
  ar: { label: 'العربية', flag: '🇸🇦' },
  hi: { label: 'हिन्दी', flag: '🇮🇳' },
  tr: { label: 'Türkçe', flag: '🇹🇷' },
};
