/**
 * Google Analytics 4 (GA4) Integration for MediaGrabs
 * 
 * Clean, lightweight, official gtag.js implementation for Vite + React SPA.
 * Tracks page views, hash navigation, and user interactions without third-party dependencies.
 */

// Read GA4 Measurement ID from Vite environment variables
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();

let isInitialized = false;

/**
 * Validates if a Measurement ID is properly configured and not a placeholder
 */
export const isValidMeasurementId = (id: string): boolean => {
  return Boolean(
    id &&
    id !== 'G-XXXXXXXXXX' &&
    id.length >= 7 &&
    /^G-[A-Z0-9]+$/i.test(id)
  );
};

/**
 * Removes sensitive query parameters (tokens, keys, passwords) before reporting URLs to GA
 */
export const sanitizeUrl = (urlString: string): string => {
  try {
    const isAbsolute = urlString.startsWith('http://') || urlString.startsWith('https://');
    const url = new URL(urlString, isAbsolute ? undefined : 'https://mediagrabs.local');
    
    // Sensitive keys to redact
    const sensitiveKeys = [
      'token', 'access_token', 'refresh_token', 'auth',
      'key', 'api_key', 'apikey', 'secret', 'password', 'pwd',
      'sig', 'signature'
    ];

    let modified = false;
    for (const key of Array.from(url.searchParams.keys())) {
      if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
        url.searchParams.set(key, '[REDACTED]');
        modified = true;
      }
    }

    if (!modified) {
      return urlString;
    }

    return isAbsolute ? url.toString() : (url.pathname + url.search + url.hash);
  } catch {
    return urlString;
  }
};

/**
 * Initializes Google Analytics 4 if Measurement ID exists and is valid
 */
export const initGA = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (isInitialized) return true;

  if (!isValidMeasurementId(GA_MEASUREMENT_ID)) {
    if (import.meta.env.DEV) {
      console.info(
        '[Google Analytics] VITE_GA_MEASUREMENT_ID is not configured or is a placeholder. Analytics tracking is paused.'
      );
    }
    return false;
  }

  try {
    // 1. Initialize dataLayer and gtag function
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    window.gtag = function () {
      dataLayer.push(arguments);
    };

    window.gtag('js', new Date());

    // 2. Configure GA4 without sending automatic initial page_view (we track manually for React SPA precision)
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true, // Privacy best-practice
      cookie_flags: 'SameSite=None;Secure',
    });

    // 3. Inject official Google tag script asynchronously into <head>
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    isInitialized = true;
    return true;
  } catch (error) {
    console.error('[Google Analytics] Failed to initialize:', error);
    return false;
  }
};

/**
 * Track a page view in GA4
 * Supports React SPA hash changes, pathname changes, and initial mount
 */
export const trackPageView = (customPath?: string, customTitle?: string): void => {
  if (typeof window === 'undefined') return;

  // Attempt lazy initialization if not already done
  if (!isInitialized) {
    const initialized = initGA();
    if (!initialized) return;
  }

  if (typeof window.gtag !== 'function') return;

  const rawPath = customPath || (window.location.pathname + window.location.search + window.location.hash);
  const path = sanitizeUrl(rawPath);
  const title = customTitle || document.title || 'MediaGrabs';
  const location = sanitizeUrl(window.location.href);

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: location,
    page_path: path,
  });
};

/**
 * Track user interaction events (e.g. Download click, modal open)
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
  if (typeof window === 'undefined' || !isInitialized || typeof window.gtag !== 'function') return;

  // Sanitize event parameters to avoid sending sensitive properties
  const safeParams: Record<string, unknown> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string') {
        safeParams[key] = sanitizeUrl(value);
      } else {
        safeParams[key] = value;
      }
    }
  }

  window.gtag('event', eventName, safeParams);
};

/**
 * Track SEO landing page views with slug and tool title
 */
export const trackSEOLandingPageView = (slug: string, toolTitle: string): void => {
  trackPageView(`/${slug}`, `${toolTitle} — MediaGrabs`);
  trackEvent('seo_landing_page_view', {
    tool_slug: slug,
    tool_title: toolTitle,
  });
};

/**
 * Track when a user clicks 'Analyze Link' on an SEO landing page
 */
export const trackAnalyzeClicked = (toolSlug: string, platform?: string): void => {
  trackEvent('seo_analyze_clicked', {
    tool_slug: toolSlug,
    platform: platform || 'unspecified',
  });
};

/**
 * Track when a user clicks the Download CTA from an SEO landing page
 */
export const trackDownloadCTAClicked = (toolSlug: string, source: string): void => {
  trackEvent('download_cta_clicked', {
    tool_slug: toolSlug,
    source: source,
    platform: 'Windows',
  });
};

/**
 * Track when a user clicks a conversion action or chooses an offline format
 */
export const trackConversionCTAClicked = (toolSlug: string, format?: string): void => {
  trackEvent('conversion_cta_clicked', {
    tool_slug: toolSlug,
    target_format: format || 'default',
    platform: 'Windows',
  });
};

