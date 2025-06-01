// Google Analytics 4 configuration

// Get GA4 Measurement ID from environment variables
export const GA_MEASUREMENT_ID = import.meta.env.VITE_APP_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  // Check if GA4 Measurement ID is available
  if (!GA_MEASUREMENT_ID) {
    console.warn(
      "GA4 Measurement ID not found. Analytics tracking will be disabled."
    );
    return;
  }

  // Create script element for gtag
  const script1 = document.createElement("script");
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script1.async = true;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url, title) => {
  if (!GA_MEASUREMENT_ID) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (!GA_MEASUREMENT_ID) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, section) => {
  trackEvent("click", "button", `${section}_${buttonName}`);
};

// Track section views (scroll tracking)
export const trackSectionView = (sectionName) => {
  trackEvent("scroll", "section_view", sectionName);
};

// Track download events
export const trackDownload = (fileName) => {
  trackEvent("download", "file", fileName);
};

// Track external link clicks
export const trackExternalLink = (url, linkName) => {
  trackEvent("click", "external_link", linkName, url);
};
