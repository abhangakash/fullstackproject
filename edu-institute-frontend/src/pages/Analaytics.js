// src/Analytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null;  // This component does not render anything
};

export default Analytics;
