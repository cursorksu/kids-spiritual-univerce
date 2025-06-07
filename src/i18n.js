import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as R from 'ramda';

import * as commonEn from './i18n/en';
import lessonsEn from './i18n/en/lessons.json';

import * as commonRu from './i18n/ru';
import lessonsRu from './i18n/ru/lessons.json';

import * as commonUa from './i18n/ua';
import lessonsUa from './i18n/ua/lessons.json';

const resources = {
	en: {
		common: commonEn,
		lessons: lessonsEn,
		tr: R.mergeRight({}, commonEn, lessonsEn),
	},
	ru: {
		common: commonRu,
		lessons: lessonsRu,
		tr: R.mergeRight({}, commonRu, lessonsRu),
	},
	ua: {
		common: commonUa,
		lessons: lessonsUa,
		tr: R.mergeRight({}, commonUa, lessonsUa),
	},
};

const userLanguage = navigator.language || navigator.userLanguage || 'ua';

i18n
.use(initReactI18next)
.init({
	resources,
	lng: userLanguage.split('-')[0] || 'ua',
	fallbackLng: ['ru', 'en', 'ua'],
	interpolation: {
		escapeValue: false,
	},
	ns: ['common', 'lessons', 'tr'],
	defaultNS: 'tr',
});

export default i18n;
