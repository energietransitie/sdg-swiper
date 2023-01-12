import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Logger from '@utils/Logger';
import translationNL from '../../web/locales/nl/translation.json';
import translationEN from '../../web/locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  nl: {
    translation: translationNL
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: __DEV__,
    resources,
    interpolation: {
      escapeValue: false
    }
  })
  .catch(new Logger('Translator').error);

export default i18n;
