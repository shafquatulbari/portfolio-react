import { useEffect, useRef } from "react";
import { trackSectionView } from "../utils/analytics";

// Hook to track when sections come into view
export const useScrollTracking = (sectionName, threshold = 0.5) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(sectionName);
          }
        });
      },
      {
        threshold: threshold, // Trigger when 50% of section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before the section is fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionName, threshold]);

  return sectionRef;
};
