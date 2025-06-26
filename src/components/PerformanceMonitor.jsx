import React, { useState, useEffect, memo } from "react";
import { createFPSMonitor, getMemoryUsage } from "../utils/performance";

const PerformanceMonitor = memo(() => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== "development") return;

    // FPS monitoring
    createFPSMonitor(setFps);

    // Memory monitoring
    const memoryInterval = setInterval(() => {
      const memUsage = getMemoryUsage();
      if (memUsage) {
        setMemory(memUsage);
      }
    }, 1000);

    // Toggle visibility with keyboard shortcut
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "p") {
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(memoryInterval);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (process.env.NODE_ENV !== "development" || !isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg border border-cyan-400/30 font-mono text-xs">
      <div className="space-y-1">
        <div className="text-cyan-400 font-bold">Performance Monitor</div>
        <div>
          FPS:{" "}
          <span
            className={
              fps > 50
                ? "text-green-400"
                : fps > 30
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {fps}
          </span>
        </div>
        {memory && (
          <>
            <div>Memory: {(memory.used / 1024 / 1024).toFixed(1)}MB</div>
            <div>Total: {(memory.total / 1024 / 1024).toFixed(1)}MB</div>
          </>
        )}
        <div className="text-gray-400 text-[10px] mt-2">Ctrl+P to toggle</div>
      </div>
    </div>
  );
});

PerformanceMonitor.displayName = "PerformanceMonitor";

export default PerformanceMonitor;
