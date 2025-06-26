import { useRef, useEffect } from "react";

// Custom hook for scroll tracking
export const useScrollTracking = (sectionName) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Track section view
            if (typeof gtag !== "undefined") {
              gtag("event", "section_view", {
                section_name: sectionName,
                engagement_time: Date.now(),
              });
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName]);

  return elementRef;
};
