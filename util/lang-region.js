import { getUserLangRegion } from './cookie';

export const DEFAULT_LANG_REGION = 'en-US';

const getStandardDeviceLang = (lang) => {
  if (['nl', 'nl-NL'].indexOf(lang) > -1) {
    return 'nl';
  }

  if (['te', 'te-IN'].indexOf(lang) > -1) {
    return 'te';
  }

  if (['en', 'en-US'].indexOf(lang) > -1) {
    return 'en-US';
  }

  if (['en-IN'].indexOf(lang) > -1) {
    return 'en-IN';
  }

  return DEFAULT_LANG_REGION;
};

export const availLangRegions = [
  	'en-US',
  'en-IN',
  	'nl',  		
  	'te'
];

export const getDeviceLangRegion = () => {
  if (process.browser) {
    return (navigator && navigator.language) ? getStandardDeviceLang(navigator.language) : DEFAULT_LANG_REGION;
  }

  return DEFAULT_LANG_REGION;
};

export const getUserLangRegPref = (byQueryPref) => {
  if (byQueryPref) {
    return byQueryPref;
  }

  const byCookiePref = getUserLangRegion();
  return byCookiePref || getDeviceLangRegion();
};
