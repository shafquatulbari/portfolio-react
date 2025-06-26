// Scroll Progress Utility
export const initScrollProgress = () => {
  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${progress}%`
    );

    // Update active navigation dot
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = scrollTop + 100; // Offset for navbar

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Update active dot
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
    });
  };

  // Throttled scroll event listener
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateScrollProgress();

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

// Smooth scroll to section
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
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
