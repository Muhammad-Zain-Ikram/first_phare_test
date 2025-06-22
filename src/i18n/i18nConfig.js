import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

// Translations Files
import en from "./en.json"
import ur from "./ur.json"

// Configration
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources:{
       en: {
            translation: en
        },
        ur: {
            translation: ur
        }
    }
})