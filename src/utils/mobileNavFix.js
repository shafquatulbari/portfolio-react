// Mobile navigation crash prevention utilities
// Minimal fixes for rapid navigation issues on mobile devices

let navigationTimeout = null;
let isNavigating = false;

// Debounce navigation to prevent rapid section changes
export const safeNavigateToSection = (
  setCurrentSection,
  sectionId,
  delay = 300
) => {
  // Prevent multiple rapid navigation calls
  if (isNavigating) return;

  isNavigating = true;

  // Clear any pending navigation
  if (navigationTimeout) {
    clearTimeout(navigationTimeout);
  }

  navigationTimeout = setTimeout(() => {
    setCurrentSection(sectionId);
    isNavigating = false;
  }, delay);
};

// Safe cleanup for animation frames and timers
export const createSafeCleanup = () => {
  const timers = new Set();
  const animationFrames = new Set();

  return {
    addTimer: (timerId) => timers.add(timerId),
    addAnimationFrame: (frameId) => animationFrames.add(frameId),
    cleanup: () => {
      timers.forEach(clearTimeout);
      timers.forEach(clearInterval);
      animationFrames.forEach(cancelAnimationFrame);
      timers.clear();
      animationFrames.clear();
    },
  };
};

// Throttle touch events to prevent excessive calls
export const throttleTouchEvents = (callback, limit = 100) => {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      callback.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Safe state updater to prevent race conditions
export const createSafeStateUpdater = (setState) => {
  let isMounted = true;

  const safeSetState = (newState) => {
    if (isMounted) {
      setState(newState);
    }
  };

  const cleanup = () => {
    isMounted = false;
  };

  return { safeSetState, cleanup };
};

// Mobile device detection
export const isMobileDevice = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
  );
};

// Memory cleanup for mobile
export const performMemoryCleanup = () => {
  if (isMobileDevice() && window.gc && typeof window.gc === "function") {
    try {
      window.gc();
    } catch (e) {
      // Garbage collection not available, ignore
    }
  }
};
