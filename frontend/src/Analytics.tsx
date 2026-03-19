import React from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const GA_MEASUREMENT_ID = viteEnv?.VITE_GA_MEASUREMENT_ID || process.env.VITE_GA_MEASUREMENT_ID || '';

function ensureAnalyticsScript() {
  if (!GA_MEASUREMENT_ID || typeof document === 'undefined') {
    return;
  }

  if (!document.querySelector(`script[data-ga-src="${GA_MEASUREMENT_ID}"]`)) {
    const externalScript = document.createElement('script');
    externalScript.async = true;
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    externalScript.dataset.gaSrc = GA_MEASUREMENT_ID;
    document.head.appendChild(externalScript);
  }

  if (!document.querySelector(`script[data-ga-inline="${GA_MEASUREMENT_ID}"]`)) {
    const inlineScript = document.createElement('script');
    inlineScript.dataset.gaInline = GA_MEASUREMENT_ID;
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = window.gtag || gtag;
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(inlineScript);
  }
}

export function Analytics() {
  const location = useLocation();

  React.useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    ensureAnalyticsScript();

    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: `${location.pathname}${location.search}${location.hash}`,
      });
    }
  }, [location]);

  return null;
}
