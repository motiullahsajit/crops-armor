// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translation files
import translationEN from "./src/locales/en/translation.json";
import translationBN from "./src/locales/bn/translation.json";

// Define the resources with the translation files
const resources = {
  en: {
    translation: translationEN,
  },
  bn: {
    translation: translationBN,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
