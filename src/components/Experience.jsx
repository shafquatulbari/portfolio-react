import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { trackButtonClick, trackEvent } from "../utils/analytics";
import { useScrollTracking } from "../utils/scrollTracking";

const TerminalExperience = ({ experience, index }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Reset animation when experience changes
  useEffect(() => {
    setDisplayedContent("");
    setCurrentLine(0);
    setIsVisible(false);

    // Small delay to trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [experience.company_name]); // Reset when company changes

  const terminalLines = [
    `$ cd /career/${experience.company_name
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    `$ ls -la`,
    `total ${experience.points.length + 2}`,
    `drwxr-xr-x 2 user user 4096 ${new Date().toLocaleDateString()} ${
      experience.date
    }`,
    ``,
    `$ cat position.info`,
    `# ====================================`,
    `# ${experience.title}`,
    `# Company: ${experience.company_name}`,
    `# Duration: ${experience.date}`,
    `# ====================================`,
    ``,
    `$ cat responsibilities.txt`,
    ...experience.points.map(
      (point, idx) => `${String(idx + 1).padStart(2, "0")}. ${point}`
    ),
    ``,
    `$ echo "Experience status: ✓ COMPLETED"`,
    `Experience status: ✓ COMPLETED`,
    `$ echo "Skills acquired: $(grep -o '[A-Z][a-z]*[A-Z][A-Za-z]*\\|[A-Z]{2,}' responsibilities.txt | head -10 | tr '\\n' ', ')"`,
    `Skills acquired: JavaScript, React, Node.js, MongoDB, Testing, API, Automation, Agile`,
    ``,
  ];

  useEffect(() => {
    if (isVisible && currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + terminalLines[currentLine] + "\n");
        setCurrentLine((prev) => prev + 1);
      }, 80 + Math.random() * 40); // Add slight randomness to typing speed

      return () => clearTimeout(timer);
    }
  }, [currentLine, terminalLines, isVisible]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  const getLineStyle = (line) => {
    if (line.startsWith("$")) {
      return "text-cyan-400";
    } else if (line.startsWith("#")) {
      return "text-purple-400 font-bold";
    } else if (line.match(/^\d{2}\./)) {
      return "text-gray-300";
    } else if (line.includes("✓ COMPLETED")) {
      return "text-green-400 font-bold";
    } else if (line.includes("Skills acquired:")) {
      return "text-yellow-400";
    } else if (line.startsWith("total") || line.startsWith("drwxr")) {
      return "text-blue-400";
    } else {
      return "text-gray-300";
    }
  };

  return (
    <div
      id={`terminal-${index}`}
      className="opacity-0 animate-fade-in-up"
      style={{
        animationDelay: "0.1s",
        animationFillMode: "forwards",
      }}
    >
      <div className="experience-terminal bg-gray-900 border-2 border-cyan-400 rounded-lg p-3 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-cyan-300 h-full">
        {/* Terminal header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 pb-2 border-b border-gray-700 gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-2 sm:ml-4 text-gray-400 text-xs break-all">
              {experience.company_name.toLowerCase().replace(/\s+/g, "-")}
              -terminal
            </div>
          </div>
          <div className="text-xs text-gray-500 font-mono text-center sm:text-right">
            {experience.date}
          </div>
        </div>

        {/* Terminal content */}
        <div className="min-h-[350px] sm:min-h-[450px] max-h-[350px] sm:max-h-[450px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-green-400">
            {displayedContent.split("\n").map((line, lineIndex) => (
              <div
                key={lineIndex}
                className="mb-1 hover:bg-gray-800/20 px-1 rounded transition-colors duration-200"
              >
                {line.startsWith("$") ? (
                  <span>
                    <span className="text-cyan-400">user@portfolio:~</span>
                    <span className="text-white">{line}</span>
                  </span>
                ) : (
                  <span className={getLineStyle(line)}>{line}</span>
                )}
              </div>
            ))}
            {currentLine >= terminalLines.length && showCursor && (
              <span className="bg-cyan-400 text-black px-1 animate-pulse">
                _
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [showTerminals, setShowTerminals] = useState(false);
  const [bootSequence, setBootSequence] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);

  // Add scroll tracking for Experience section
  const experienceRef = useScrollTracking("experience_section");

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const bootMessages = [
    "Initializing career database...",
    "Loading work experience modules...",
    "Connecting to professional timeline...",
    "Authenticating credentials...",
    "✓ Database ready",
    "✓ Experience modules loaded",
    "✓ Timeline synchronized",
    "✓ Credentials verified",
    "",
    "Welcome to Work Experience Terminal v2.0",
    "Type 'help' for available commands",
    "",
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextExperience = () => {
    const newIndex =
      currentExperienceIndex < experiences.length - 1
        ? currentExperienceIndex + 1
        : 0;
    setCurrentExperienceIndex(newIndex);

    // Track navigation
    trackButtonClick("next_experience", "experience");
    trackEvent(
      "navigation",
      "experience_change",
      `${experiences[currentExperienceIndex].company_name}_to_${experiences[newIndex].company_name}`
    );
  };

  const prevExperience = () => {
    const newIndex =
      currentExperienceIndex > 0
        ? currentExperienceIndex - 1
        : experiences.length - 1;
    setCurrentExperienceIndex(newIndex);

    // Track navigation
    trackButtonClick("prev_experience", "experience");
    trackEvent(
      "navigation",
      "experience_change",
      `${experiences[currentExperienceIndex].company_name}_to_${experiences[newIndex].company_name}`
    );
  };

  const goToExperience = (index) => {
    const oldIndex = currentExperienceIndex;
    setCurrentExperienceIndex(index);

    // Track direct navigation
    trackButtonClick(`experience_indicator_${index}`, "experience");
    trackEvent(
      "navigation",
      "experience_direct",
      `${experiences[oldIndex].company_name}_to_${experiences[index].company_name}`
    );
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextExperience();
      trackEvent("navigation", "experience_swipe", "swipe_left");
    } else if (isRightSwipe) {
      prevExperience();
      trackEvent("navigation", "experience_swipe", "swipe_right");
    }
  };

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < bootMessages.length) {
          setBootSequence((prev) => [...prev, bootMessages[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setBootComplete(true);
            setTimeout(() => setShowTerminals(true), 500);
          }, 1000);
        }
      }, 200);
    }, 500);

    return () => clearTimeout(bootTimer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!showTerminals) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextExperience();
        trackEvent("navigation", "experience_keyboard", "arrow_right");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevExperience();
        trackEvent("navigation", "experience_keyboard", "arrow_left");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showTerminals]);

  return (
    <>
      {/* Header Section */}
      <div
        className="text-center mb-8 sm:mb-12 px-3 sm:px-0"
        ref={experienceRef}
      >
        <div className="inline-block bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 sm:p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 w-full max-w-2xl">
          <div className="mb-2 sm:mb-3">
            <span className="text-cyan-400 font-mono text-xs sm:text-sm block sm:inline">
              user@portfolio:~/experience$
            </span>
            <span className="text-white font-mono text-xs sm:text-sm animate-pulse block sm:inline sm:ml-1">
              cat work_history.log
            </span>
          </div>
          <p
            className={`${styles.sectionSubText} text-center mb-1 sm:mb-2 text-xs sm:text-base`}
            style={{
              color: "#00ffff",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
              fontFamily: "'Fira Code', monospace",
              fontStyle: "italic",
            }}
          >
            ~/career$ ls -la --sort=time
          </p>
          <h2
            className="text-white font-black text-center"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
              background: "linear-gradient(90deg, #00ffff, #aa00ff, #00ffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
              fontWeight: "bold",
              lineHeight: "1.2",
              fontFamily: "'Fira Code', monospace",
              backgroundSize: "200% auto",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Work_Experience.log
          </h2>
          <div className="mt-2 sm:mt-3 text-xs text-gray-400 font-mono break-all">
            Last modified: {new Date().toLocaleString()} | Size:{" "}
            {experiences.length} entries
          </div>
        </div>
      </div>

      {/* Boot Sequence */}
      {!bootComplete && (
        <div className="max-w-4xl mx-auto mb-8 px-3 sm:px-0">
          <div className="bg-black border-2 border-green-500 rounded-lg p-3 sm:p-6 font-mono text-xs sm:text-sm">
            <div className="flex items-center mb-3 sm:mb-4 pb-2 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <div className="ml-2 sm:ml-4 text-green-400 text-xs">
                SYSTEM BOOT
              </div>
            </div>
            <div className="min-h-[150px] sm:min-h-[200px]">
              {bootSequence.map((message, index) => (
                <div key={index} className="mb-1">
                  {message && message.startsWith("✓") ? (
                    <span className="text-green-400">{message}</span>
                  ) : message && message.includes("Welcome") ? (
                    <span className="text-cyan-400 font-bold">{message}</span>
                  ) : message && message.includes("Type") ? (
                    <span className="text-yellow-400">{message}</span>
                  ) : (
                    <span className="text-gray-300">{message || ""}</span>
                  )}
                </div>
              ))}
              <span className="bg-green-400 text-black px-1 animate-pulse">
                _
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Experience Cards */}
      {showTerminals && (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Navigation Header */}
          <div className="mb-6 bg-gray-900 border-2 border-cyan-400 rounded-lg p-3 sm:p-4 font-mono">
            {/* Terminal Command Line - responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-0 gap-2 sm:gap-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 sm:gap-0">
                <span className="text-cyan-400 text-xs sm:text-sm break-all">
                  user@portfolio:~/experience$ ls | head -1
                </span>
                <span className="text-yellow-400 font-bold text-sm">
                  {currentExperienceIndex + 1} of {experiences.length}
                </span>
              </div>

              {/* Navigation Controls - responsive positioning */}
              <div className="flex items-center justify-center sm:justify-end space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={prevExperience}
                  className="px-2 sm:px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs sm:text-sm font-mono transition-colors duration-200 border border-purple-400 hover:border-purple-300 flex-shrink-0"
                  title="Previous experience"
                >
                  ← prev
                </button>
                <button
                  onClick={nextExperience}
                  className="px-2 sm:px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs sm:text-sm font-mono transition-colors duration-200 border border-purple-400 hover:border-purple-300 flex-shrink-0"
                  title="Next experience"
                >
                  next →
                </button>
              </div>
            </div>

            {/* Experience Indicators */}
            <div className="flex justify-center space-x-2 mt-3 pt-3 border-t border-gray-700">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToExperience(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentExperienceIndex
                      ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  title={`Go to experience ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current Experience Terminal */}
          <div
            className="min-h-[450px] sm:min-h-[600px] max-h-[450px] sm:max-h-[600px] overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <TerminalExperience
              key={`terminal-experience-${currentExperienceIndex}`}
              experience={experiences[currentExperienceIndex]}
              index={currentExperienceIndex}
            />
          </div>

          {/* Keyboard Navigation Hint */}
          <div className="mt-4 text-center">
            <div className="inline-block bg-gray-900/80 border border-gray-600 rounded-lg px-4 py-2">
              <span className="text-gray-400 text-xs font-mono">
                💡 Use ← → arrow keys, swipe left/right, or click buttons to
                navigate
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Command Summary */}
      {showTerminals && (
        <div
          className="mt-8 bg-gray-900 border-2 border-purple-400 rounded-lg p-6 font-mono text-sm max-w-3xl mx-auto hover:border-purple-300 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <div className="ml-4 text-gray-400 text-xs">
                career-summary-terminal
              </div>
            </div>
            <div className="text-xs text-purple-400 font-bold">LIVE</div>
          </div>
          <div className="text-green-400">
            <div className="mb-2 hover:bg-gray-800/20 px-2 py-1 rounded transition-colors">
              <span className="text-cyan-400">user@portfolio:~</span>
              <span className="text-white">$ cat /career/current_view.log</span>
            </div>
            <div className="text-yellow-400 mb-3 ml-2 font-bold">
              Currently viewing:{" "}
              {experiences[currentExperienceIndex].company_name}
            </div>
            <div className="text-gray-300 text-sm ml-2 mb-4">
              {experiences[currentExperienceIndex].title} •{" "}
              {experiences[currentExperienceIndex].date}
            </div>

            <div className="mb-2 hover:bg-gray-800/20 px-2 py-1 rounded transition-colors">
              <span className="text-cyan-400">user@portfolio:~</span>
              <span className="text-white">
                $ find /career -type f -name "*.experience" | wc -l
              </span>
            </div>
            <div className="text-yellow-400 mb-3 ml-2 font-bold text-lg">
              {experiences.length} experiences found
            </div>

            <div className="mb-2 hover:bg-gray-800/20 px-2 py-1 rounded transition-colors">
              <span className="text-cyan-400">user@portfolio:~</span>
              <span className="text-white">
                $ grep -r "technologies" /career --count
              </span>
            </div>
            <div className="text-blue-400 mb-3 ml-2">
              React.js • Node.js • MongoDB • JavaScript • Python • C++ • Test
              Automation • WebDriverIO • API Testing
            </div>

            <div className="mb-2 hover:bg-gray-800/20 px-2 py-1 rounded transition-colors">
              <span className="text-cyan-400">user@portfolio:~</span>
              <span className="text-white">
                $ echo "Navigation: $(echo 'Use ← → keys, swipe, or buttons
                above')"
              </span>
            </div>
            <div className="text-green-400 font-bold ml-2">
              Navigation: Use ← → keys, swipe, or buttons above 🚀
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700">
              <div className="text-purple-400 text-xs">
                💡 Tip: Navigate through experiences using arrow keys, swipe
                left/right on mobile, or click the navigation buttons
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Experience, "work");
