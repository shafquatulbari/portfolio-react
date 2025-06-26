import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants";

// Stagger container animation (decoupled from SectionWrapper)
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

const FlappyTechGame = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const loadedImagesRef = useRef({});
  const gameStateRef = useRef({
    vehicle: { x: 80, y: 250, velocity: 0 },
    buildings: [],
    score: 0,
    gameStarted: false,
    gameOver: false,
    collectedTechs: [],
  });

  const [gameState, setGameState] = useState({
    score: 0,
    gameStarted: false,
    gameOver: false,
    collectedTechs: [],
    showInstructions: true,
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const GAME_CONFIG = {
    gravity: 0.2, // Reduced gravity for smoother flying
    jumpStrength: -4, // Reduced jump strength for more controlled movement
    buildingWidth: 80,
    buildingGap: 220, // Increased vertical gap between buildings
    buildingSpeed: 2,
    vehicleSize: 35,
    techSize: 40,
    horizontalSpacing: 300, // New property for horizontal spacing between buildings
    maxParticles: 15, // Reduced particle count for better performance
  };

  // Preload all tech images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = technologies.map((tech) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            loadedImagesRef.current[tech.name] = img;
            resolve(img);
          };
          img.onerror = () => {
            console.warn(`Failed to load image for ${tech.name}`);
            resolve(null); // Resolve with null instead of rejecting
          };
          img.src = tech.icon;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // Still set to true to allow game to start
      }
    };

    loadImages();
  }, []);

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameStateRef.current = {
      vehicle: { x: 80, y: canvas.height / 2, velocity: 0 },
      buildings: [],
      score: 0,
      gameStarted: false,
      gameOver: false,
      collectedTechs: [],
    };

    setGameState({
      score: 0,
      gameStarted: false,
      gameOver: false,
      collectedTechs: [],
      showInstructions: true,
    });
  }, []);

  const createBuilding = (canvas) => {
    const minHeight = 50;
    const maxHeight = canvas.height - GAME_CONFIG.buildingGap - minHeight;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    // Get uncollected tech indices
    const collectedTechIndices = gameStateRef.current.collectedTechs.map(
      (tech) => technologies.findIndex((t) => t.name === tech.name)
    );
    const availableTechIndices = technologies
      .map((_, index) => index)
      .filter((index) => !collectedTechIndices.includes(index));

    // If all techs are collected, don't show any more techs
    const hasTech = availableTechIndices.length > 0 && Math.random() > 0.4;
    const techIndex = hasTech
      ? availableTechIndices[
          Math.floor(Math.random() * availableTechIndices.length)
        ]
      : 0;

    return {
      x: canvas.width,
      topHeight: height,
      bottomY: height + GAME_CONFIG.buildingGap,
      bottomHeight: canvas.height - (height + GAME_CONFIG.buildingGap),
      passed: false,
      hasTech: hasTech,
      techCollected: false,
      techIndex: techIndex,
    };
  };

  const drawVehicle = (ctx, vehicle) => {
    ctx.save();

    // Vehicle body with cyberpunk glow
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 15;

    // Main vehicle body (sleek futuristic shape)
    ctx.fillStyle = "#1e40af";
    ctx.beginPath();
    ctx.ellipse(
      vehicle.x,
      vehicle.y,
      GAME_CONFIG.vehicleSize / 2,
      GAME_CONFIG.vehicleSize / 3,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Vehicle cockpit
    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.ellipse(vehicle.x + 5, vehicle.y - 2, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Engine glow effects
    ctx.shadowColor = "#ff00ff";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.ellipse(vehicle.x - 15, vehicle.y + 3, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(vehicle.x - 15, vehicle.y - 3, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vehicle lights
    ctx.shadowBlur = 5;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(vehicle.x + 12, vehicle.y, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawBuilding = (ctx, building) => {
    ctx.save();

    // Building shadows and depth
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Top building
    const gradient1 = ctx.createLinearGradient(
      building.x,
      0,
      building.x + GAME_CONFIG.buildingWidth,
      0
    );
    gradient1.addColorStop(0, "#1f2937");
    gradient1.addColorStop(0.5, "#374151");
    gradient1.addColorStop(1, "#111827");
    ctx.fillStyle = gradient1;
    ctx.fillRect(building.x, 0, GAME_CONFIG.buildingWidth, building.topHeight);

    // Bottom building
    const gradient2 = ctx.createLinearGradient(
      building.x,
      building.bottomY,
      building.x + GAME_CONFIG.buildingWidth,
      building.bottomY + building.bottomHeight
    );
    gradient2.addColorStop(0, "#1f2937");
    gradient2.addColorStop(0.5, "#374151");
    gradient2.addColorStop(1, "#111827");
    ctx.fillStyle = gradient2;
    ctx.fillRect(
      building.x,
      building.bottomY,
      GAME_CONFIG.buildingWidth,
      building.bottomHeight
    );

    // Building windows (cyberpunk style)
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Top building windows
    for (let i = 0; i < Math.floor(building.topHeight / 25); i++) {
      for (let j = 0; j < 3; j++) {
        if (Math.random() > 0.3) {
          // 70% chance of lit window
          ctx.fillStyle = Math.random() > 0.7 ? "#00ffff" : "#ff0080";
          const windowX = building.x + 8 + j * 20;
          const windowY = 8 + i * 25;
          if (windowY < building.topHeight - 15) {
            ctx.fillRect(windowX, windowY, 12, 8);
          }
        }
      }
    }

    // Bottom building windows
    for (let i = 0; i < Math.floor(building.bottomHeight / 25); i++) {
      for (let j = 0; j < 3; j++) {
        if (Math.random() > 0.3) {
          // 70% chance of lit window
          ctx.fillStyle = Math.random() > 0.7 ? "#00ffff" : "#ff0080";
          const windowX = building.x + 8 + j * 20;
          const windowY = building.bottomY + 8 + i * 25;
          if (windowY < building.bottomY + building.bottomHeight - 15) {
            ctx.fillRect(windowX, windowY, 12, 8);
          }
        }
      }
    }

    // Building edge highlights
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      building.x,
      0,
      GAME_CONFIG.buildingWidth,
      building.topHeight
    );
    ctx.strokeRect(
      building.x,
      building.bottomY,
      GAME_CONFIG.buildingWidth,
      building.bottomHeight
    );

    // Neon building outlines
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      building.x + 2,
      2,
      GAME_CONFIG.buildingWidth - 4,
      building.topHeight - 4
    );
    ctx.strokeRect(
      building.x + 2,
      building.bottomY + 2,
      GAME_CONFIG.buildingWidth - 4,
      building.bottomHeight - 4
    );
    ctx.setLineDash([]);

    ctx.restore();
  };

  const drawTech = (ctx, building, techIndex) => {
    if (!building.hasTech || building.techCollected) return;

    const tech = technologies[techIndex % technologies.length];
    const techX =
      building.x + GAME_CONFIG.buildingWidth / 2 - GAME_CONFIG.techSize / 2;
    const techY =
      building.topHeight +
      GAME_CONFIG.buildingGap / 2 -
      GAME_CONFIG.techSize / 2;

    // Create a circular ball background
    ctx.save();

    // Outer glow effect
    ctx.shadowColor = "#ec4899";
    ctx.shadowBlur = 25;

    // Main ball with gradient
    const gradient = ctx.createRadialGradient(
      techX + GAME_CONFIG.techSize / 2,
      techY + GAME_CONFIG.techSize / 2,
      0,
      techX + GAME_CONFIG.techSize / 2,
      techY + GAME_CONFIG.techSize / 2,
      GAME_CONFIG.techSize / 2
    );
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.8)"); // Purple center
    gradient.addColorStop(0.7, "rgba(236, 72, 153, 0.6)"); // Pink middle
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)"); // Blue edge

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      techX + GAME_CONFIG.techSize / 2,
      techY + GAME_CONFIG.techSize / 2,
      GAME_CONFIG.techSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Ball border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw tech icon if loaded
    const loadedImage = loadedImagesRef.current[tech.name];
    if (loadedImage) {
      const iconSize = GAME_CONFIG.techSize * 0.6; // Icon is 60% of ball size
      const iconX = techX + (GAME_CONFIG.techSize - iconSize) / 2;
      const iconY = techY + (GAME_CONFIG.techSize - iconSize) / 2;

      ctx.save();
      // Create a circular clipping path for the icon
      ctx.beginPath();
      ctx.arc(
        techX + GAME_CONFIG.techSize / 2,
        techY + GAME_CONFIG.techSize / 2,
        (GAME_CONFIG.techSize / 2) * 0.7, // Slightly smaller than the ball
        0,
        Math.PI * 2
      );
      ctx.clip();

      // Draw the icon
      ctx.drawImage(loadedImage, iconX, iconY, iconSize, iconSize);
      ctx.restore();
    } else {
      // Fallback to tech name if image not loaded
      ctx.shadowBlur = 5;
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        tech.name,
        techX + GAME_CONFIG.techSize / 2,
        techY + GAME_CONFIG.techSize / 2 + 3
      );
    }

    // Tech name below the ball
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#ffffff";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      tech.name,
      techX + GAME_CONFIG.techSize / 2,
      techY + GAME_CONFIG.techSize + 15
    );

    ctx.restore();
  };

  const checkCollisions = (vehicle, buildings) => {
    const canvas = canvasRef.current;

    // Ground and ceiling collision
    if (vehicle.y <= 0 || vehicle.y >= canvas.height) {
      return { collision: true, type: "boundary" };
    }

    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];

      // Check if vehicle is horizontally aligned with building
      if (
        vehicle.x + GAME_CONFIG.vehicleSize / 2 > building.x &&
        vehicle.x - GAME_CONFIG.vehicleSize / 2 <
          building.x + GAME_CONFIG.buildingWidth
      ) {
        // Check building collision
        if (
          vehicle.y - GAME_CONFIG.vehicleSize / 2 < building.topHeight ||
          vehicle.y + GAME_CONFIG.vehicleSize / 2 > building.bottomY
        ) {
          return { collision: true, type: "building" };
        }

        // Check tech collection
        if (building.hasTech && !building.techCollected) {
          const techX = building.x + GAME_CONFIG.buildingWidth / 2;
          const techY = building.topHeight + GAME_CONFIG.buildingGap / 2;
          const distance = Math.sqrt(
            Math.pow(vehicle.x - techX, 2) + Math.pow(vehicle.y - techY, 2)
          );

          if (distance < GAME_CONFIG.techSize) {
            building.techCollected = true;
            return {
              collision: false,
              techCollected: building.techIndex, // Use the building's specific tech index
            };
          }
        }
      }

      // Score increment
      if (
        !building.passed &&
        vehicle.x > building.x + GAME_CONFIG.buildingWidth
      ) {
        building.passed = true;
        return { collision: false, scored: true };
      }
    }

    return { collision: false };
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const state = gameStateRef.current;

    if (!state.gameStarted || state.gameOver) return;

    // Clear canvas with animated cyberpunk background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0f0f23");
    gradient.addColorStop(0.5, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add distant city background
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 20; i++) {
      const x = i * 40 - ((Date.now() * 0.01) % 800);
      const height = 50 + Math.sin(i) * 30;
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(x, canvas.height - height, 30, height);

      // Building lights
      if (Math.random() > 0.7) {
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(x + 5, canvas.height - height + 10, 4, 4);
      }
    }
    ctx.restore();

    // Update vehicle physics
    state.vehicle.velocity += GAME_CONFIG.gravity;
    // Add velocity damping for smoother flight
    state.vehicle.velocity *= 0.98;
    state.vehicle.y += state.vehicle.velocity;

    // Clamp velocity to prevent excessive speed
    state.vehicle.velocity = Math.max(-6, Math.min(6, state.vehicle.velocity));

    // Update buildings
    for (let i = state.buildings.length - 1; i >= 0; i--) {
      const building = state.buildings[i];
      building.x -= GAME_CONFIG.buildingSpeed;

      if (building.x + GAME_CONFIG.buildingWidth < 0) {
        state.buildings.splice(i, 1);
      }
    }

    // Add new buildings
    if (
      state.buildings.length === 0 ||
      state.buildings[state.buildings.length - 1].x <
        canvas.width - GAME_CONFIG.horizontalSpacing
    ) {
      state.buildings.push(createBuilding(canvas));
    }

    // Check collisions
    const result = checkCollisions(state.vehicle, state.buildings);

    if (result.collision) {
      state.gameOver = true;
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        showInstructions: false,
      }));
      return;
    }

    if (result.scored) {
      state.score += 1;
      setGameState((prev) => ({ ...prev, score: state.score }));
    }

    if (result.techCollected !== undefined) {
      const tech = technologies[result.techCollected % technologies.length];
      state.collectedTechs.push(tech);
      setGameState((prev) => ({
        ...prev,
        collectedTechs: [...state.collectedTechs],
      }));
    }

    // Draw everything
    state.buildings.forEach((building) => {
      drawBuilding(ctx, building);
      drawTech(ctx, building, building.techIndex); // Use building's own tech index
    });

    drawVehicle(ctx, state.vehicle);

    // Draw score
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${state.score}`, 20, 40);

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, []);

  const jump = useCallback(() => {
    const state = gameStateRef.current;

    if (!imagesLoaded) {
      // Don't start game until images are loaded
      return;
    }

    if (!state.gameStarted) {
      state.gameStarted = true;
      setGameState((prev) => ({
        ...prev,
        gameStarted: true,
        showInstructions: false,
      }));
      gameLoop();
    } else if (!state.gameOver) {
      state.vehicle.velocity = GAME_CONFIG.jumpStrength;
    } else {
      // Restart game
      initializeGame();
    }
  }, [gameLoop, initializeGame, imagesLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = 500;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize game
    initializeGame();

    // Event listeners
    const handleKeyPress = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => jump();
    const handleTouch = (e) => {
      e.preventDefault();
      jump();
    };

    document.addEventListener("keydown", handleKeyPress);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("keydown", handleKeyPress);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouch);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [jump, initializeGame]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Title */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Flappy Tech Skills
        </h2>
        <p className="text-gray-300 text-lg">
          Pilot through the cyberpunk city with smooth flight controls and
          collect technology skills!
        </p>
      </div>

      {/* Game Container */}
      <div className="relative border-2 border-indigo-500 rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl">
        <canvas
          ref={canvasRef}
          className="block w-full h-[500px] cursor-pointer touch-none"
          style={{ touchAction: "none" }}
        />

        {/* Game Instructions Overlay */}
        {gameState.showInstructions && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-900/90 rounded-xl border border-cyan-400/30 max-w-md mx-4">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                Ready to Play?
              </h3>
              <p className="text-gray-300 mb-6">
                Pilot the flying vehicle through the cyberpunk city and collect
                tech skills! Use gentle taps for smooth flying.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-pink-500 text-black rounded font-mono font-semibold">
                    SPACE
                  </kbd>
                  <span className="text-gray-300">or</span>
                  <kbd className="px-3 py-1 bg-pink-500 text-black rounded font-mono font-semibold">
                    TAP
                  </kbd>
                </div>
                <p className="text-sm text-gray-400">to fly smoothly</p>
              </div>
              {!imagesLoaded ? (
                <div className="px-6 py-3 bg-gray-600 text-gray-300 font-bold rounded-lg">
                  Loading tech icons...
                </div>
              ) : (
                <button
                  onClick={jump}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
                >
                  Start Game
                </button>
              )}
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-900/90 rounded-xl border border-red-400/30 max-w-md mx-4">
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                Game Over!
              </h3>
              <p className="text-xl text-white mb-2">
                Score: {gameState.score}
              </p>
              <p className="text-lg text-purple-400 mb-4">
                Skills Collected: {gameState.collectedTechs.length}/
                {technologies.length}
              </p>
              {gameState.collectedTechs.length === technologies.length && (
                <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg">
                  <p className="text-green-400 font-bold text-lg">
                    🎉 Perfect Score!
                  </p>
                  <p className="text-green-300 text-sm">
                    All technologies mastered!
                  </p>
                </div>
              )}
              {gameState.collectedTechs.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Technologies mastered:
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {gameState.collectedTechs.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs font-mono"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={jump}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Score Display */}
        {gameState.gameStarted && !gameState.gameOver && (
          <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-lg">
            <div className="text-white font-mono">
              <div>Score: {gameState.score}</div>
              <div className="text-sm text-purple-300">
                Skills: {gameState.collectedTechs.length}/{technologies.length}
              </div>
              {gameState.collectedTechs.length === technologies.length && (
                <div className="text-xs text-green-400 mt-1">
                  ✨ All Mastered!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="text-center text-gray-300 text-sm">
          <p className="mb-2">
            💡 <strong>Pro Tip:</strong> Use gentle, rhythmic taps for smooth
            flight control and collect technology icons to showcase your skills
            mastery!
          </p>
          <p>
            Works on desktop with{" "}
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">SPACE</kbd>{" "}
            or mobile with <strong>TAP</strong> - smooth flying controls for
            precise navigation
          </p>
        </div>
      </div>
    </div>
  );
};

const Tech = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16"
    >
      <span className="hash-span" id="tech">
        &nbsp;
      </span>

      <div className="py-12">
        <FlappyTechGame />
      </div>
    </motion.section>
  );
};

export default Tech;
