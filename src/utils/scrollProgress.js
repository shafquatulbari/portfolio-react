// Scroll Progress Utility - Ultra-tight snap scrolling optimized
export const initScrollProgress = () => {
  let ticking = false;

  const updateScrollProgress = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Check if we have a scroll container or use window
        const scrollContainer = document.querySelector(".scroll-container");

        if (!scrollContainer) return;

        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight =
          scrollContainer.scrollHeight - scrollContainer.clientHeight;

        // More precise progress calculation for snap scrolling
        const progress = Math.min(
          100,
          Math.max(0, (scrollTop / scrollHeight) * 100)
        );

        document.documentElement.style.setProperty(
          "--scroll-progress",
          `${progress}%`
        );

        // Enhanced section detection for snap scrolling
        const sections = document.querySelectorAll("section[id]");
        const containerRect = scrollContainer.getBoundingClientRect();

        // Find the section that's most in view (for snap scrolling)
        let activeSection = null;
        let maxIntersection = 0;

        sections.forEach((section) => {
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top - containerRect.top;
          const sectionBottom = sectionRect.bottom - containerRect.top;

          // Calculate how much of the section is in the viewport
          const viewportHeight = containerRect.height;
          const intersectionTop = Math.max(0, -sectionTop);
          const intersectionBottom = Math.min(
            viewportHeight,
            sectionRect.height + sectionTop
          );
          const intersection = Math.max(
            0,
            intersectionBottom - intersectionTop
          );
          const intersectionRatio = intersection / viewportHeight;

          if (intersectionRatio > maxIntersection) {
            maxIntersection = intersectionRatio;
            activeSection = section;
          }
        });

        // Update active navigation dot with more precision
        if (activeSection) {
          const sectionId = activeSection.getAttribute("id");
          document.querySelectorAll(".nav-dot").forEach((dot) => {
            dot.classList.remove("active");
          });
          const activeDot = document.querySelector(
            `.nav-dot[data-section="${sectionId}"]`
          );
          if (activeDot) {
            activeDot.classList.add("active");
          }
        }

        ticking = false;
      });
    }
    ticking = true;
  };

  // Throttled scroll event listener
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Add listener to both window and scroll container
  const scrollContainer = document.querySelector(".scroll-container");

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
  } else {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // Initial call
  updateScrollProgress();

  // Cleanup function
  return () => {
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  };
};

// Enhanced smooth scroll to section with snap scrolling support
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  const scrollContainer = document.querySelector(".scroll-container");

  if (element) {
    if (scrollContainer) {
      // For scroll container, calculate position relative to container
      const elementTop = element.offsetTop;
      scrollContainer.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    } else {
      // Fallback to window scrolling
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }
};

// Section intersection observer for better active state detection
export const initSectionObserver = () => {
  const sections = document.querySelectorAll("section[id]");
  const navDots = document.querySelectorAll(".nav-dot");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");

          // Update navigation dots
          navDots.forEach((dot) => {
            dot.classList.remove("active");
            if (dot.getAttribute("data-section") === sectionId) {
              dot.classList.add("active");
            }
          });

          // Update navbar active state
          const navLinks = document.querySelectorAll(".nav-link");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-80px 0px 0px 0px", // Account for navbar
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  return () => {
    observer.disconnect();
  };
};
