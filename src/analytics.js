import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-0RS1R2SDHE';
const siteUrl = process.env.REACT_APP_SITE_URL || 'http://localhost:3000';

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};