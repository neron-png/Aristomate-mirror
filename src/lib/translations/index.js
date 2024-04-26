import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: { lang },
    el: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'home',
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'en',
      key: 'qr',
      loader: async () => (await import('./en/qr.json')).default,
    },
    {
      locale: 'en',
      key: 'slider',
      loader: async () => (await import('./en/slider.json')).default,
    },
    {
      locale: 'en',
      key: 'schedule',
      loader: async () => (await import('./en/sched.json')).default,
    },
    {
      locale: 'el',
      key: 'home',
      loader: async () => (await import('./el/home.json')).default,
    },
    {
      locale: 'el',
      key: 'qr',
      loader: async () => (await import('./el/qr.json')).default,
    },
    {
      locale: 'el',
      key: 'slider',
      loader: async () => (await import('./el/slider.json')).default,
    },
    {
      locale: 'el',
      key: 'schedule',
      loader: async () => (await import('./el/sched.json')).default,
    },
    
  ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);