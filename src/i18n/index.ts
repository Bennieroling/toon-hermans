import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import nl from "./locales/nl.json"
import es from "./locales/es.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl },
      es: { translation: es },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "nl", "es"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "sorun-language",
      caches: ["localStorage"],
    },
  })

export default i18n
