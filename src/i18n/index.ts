// Re-export everything from TranslationProvider
export { 
  TranslationProvider, 
  useTranslation, 
  t, 
  languages, 
  currentLanguage 
} from './TranslationProvider';

// Default export for convenience
import { t, languages, currentLanguage } from './TranslationProvider';
export default { t, languages, currentLanguage };
