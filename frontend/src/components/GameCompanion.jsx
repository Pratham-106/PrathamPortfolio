
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "../styles/GameCompanion.css";

const STORAGE_KEY = "shadow-cat-rpg-v1";

const SECTION_REWARDS = {
  home: 10,
  about: 20,
  skills: 20,
  projects: 30,
  contact: 20,
};

const MESSAGES = [
  "Meow! Welcome to the developer's realm. 🐾",
  "Quest hint: Explore every section to earn XP!",
  "I guard these projects from dangerous bugs.",
  "React + MongoDB + coffee = developer magic.",
  "Have you checked the Projects section yet?",
  "Click me five times to earn a bonus!",
  "The darkness makes my powers stronger...",
  "Every developer starts at Level 1!",
  "Psst... the Void is watching you. 👀",
  "You're doing great, human. Keep exploring!",
];

const EVOLUTIONS = [
  {
    level: 1,
    name: "Shadow Kitten",
    minXP: 0,
    nextXP: 100,
  },
  {
    level: 2,
    name: "Phantom Cat",
    minXP: 100,
    nextXP: 250,
  },
  {
    level: 3,
    name: "Void Guardian",
    minXP: 250,
    nextXP: null,
  },
];

const initialProgress = {
  xp: 0,
  clicks: 0,
  unlocked: [],
  lastVisit: "",
};

function getToday() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

// Load saved progress and apply the daily reward
// before React initializes the component state.
function loadProgress() {
  let saved;

  try {
    saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );
  } catch {
    saved = null;
  }

  const validSaved =
    saved && typeof saved === "object" && !Array.isArray(saved);

  const progress = validSaved
    ? {
        xp:
          Number.isFinite(saved.xp) && saved.xp >= 0
            ? saved.xp
            : 0,

        clicks:
          Number.isInteger(saved.clicks) && saved.clicks >= 0
            ? saved.clicks
            : 0,

        unlocked: Array.isArray(saved.unlocked)
          ? saved.unlocked.filter(
              (item) => typeof item === "string"
            )
          : [],

        lastVisit:
          typeof saved.lastVisit === "string"
            ? saved.lastVisit
            : "",
      }
    : { ...initialProgress, unlocked: [] };

  const today = getToday();

  if (progress.lastVisit !== today) {
    const isReturning = progress.lastVisit !== "";

    return {
      ...progress,
      xp: progress.xp + (isReturning ? 20 : 0),
      lastVisit: today,
    };
  }

  return progress;
}

function getEvolution(xp) {
  if (xp >= 250) return EVOLUTIONS[2];
  if (xp >= 100) return EVOLUTIONS[1];

  return EVOLUTIONS[0];
}

// Void Kitty: a floating magical shadow cat.
function SpiritCat({ level, pupilOffset }) {
  return (
    <svg
      className="spirit-cat-sprite"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Void Kitty, evolution level ${level}`}
    >
      <defs>
        <linearGradient
          id="voidKittyBody"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#353044" />
          <stop offset="55%" stopColor="#171321" />
          <stop offset="100%" stopColor="#08070d" />
        </linearGradient>

        <linearGradient
          id="voidKittyAura"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        <radialGradient id="voidKittyEye">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="100%" stopColor="#c084fc" />
        </radialGradient>
      </defs>

      {level >= 3 && (
        <circle
          className="spirit-cat-aura"
          cx="50"
          cy="48"
          r="39"
          fill="none"
          stroke="url(#voidKittyAura)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
      )}

      {/* Magical wisps */}
      <g className="spirit-cat-wisps">
        <path
          d="M 22 53 Q 5 42 16 28"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M 78 48 Q 94 36 85 23"
          fill="none"
          stroke="#c084fc"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="15" cy="61" r="2" fill="#c084fc" />
        <circle cx="84" cy="64" r="2" fill="#a855f7" />

        {level >= 2 && (
          <>
            <path
              d="M 29 17 L 32 23 L 38 26 L 32 29 L 29 35 L 26 29 L 20 26 L 26 23 Z"
              fill="#c084fc"
            />
            <path
              d="M 77 69 L 79 73 L 83 75 L 79 77 L 77 81 L 75 77 L 71 75 L 75 73 Z"
              fill="#a855f7"
            />
          </>
        )}
      </g>

      {/* Tail */}
      <path
        className="spirit-cat-tail"
        d="M 67 70 C 91 77 91 51 79 48 C 72 46 70 55 77 57"
        fill="none"
        stroke="url(#voidKittyBody)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      <path
        d="M 77 57 Q 72 53 77 49"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Ears */}
      <path
        d="M 24 42 L 26 12 Q 27 7 32 13 L 44 28"
        fill="url(#voidKittyBody)"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M 56 28 L 69 12 Q 74 7 75 13 L 77 43"
        fill="url(#voidKittyBody)"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M 29 30 L 30 19 L 38 29"
        fill="#a855f7"
        opacity="0.6"
      />

      <path
        d="M 62 29 L 71 19 L 72 31"
        fill="#a855f7"
        opacity="0.6"
      />

      {/* Body */}
      <ellipse
        cx="50"
        cy="64"
        rx="29"
        ry="28"
        fill="url(#voidKittyBody)"
        stroke="#8b5cf6"
        strokeWidth="1.5"
      />

      {/* Face */}
      <path
        d="M 27 46 Q 50 33 73 46 Q 82 65 65 75 Q 50 83 35 75 Q 18 65 27 46 Z"
        fill="url(#voidKittyBody)"
      />

      {/* Eyes */}
      <ellipse
        cx="39"
        cy="55"
        rx="7"
        ry="9"
        fill="url(#voidKittyEye)"
      />

      <ellipse
        cx="61"
        cy="55"
        rx="7"
        ry="9"
        fill="url(#voidKittyEye)"
      />

      {/* Black pupils follow the cursor */}
      <circle
        className="spirit-pupil"
        cx="39"
        cy="55"
        r="3.5"
        transform={`translate(${pupilOffset.x} ${pupilOffset.y})`}
      />

      <circle
        className="spirit-pupil"
        cx="61"
        cy="55"
        r="3.5"
        transform={`translate(${pupilOffset.x} ${pupilOffset.y})`}
      />

      {/* Nose and mouth */}
      <path
        d="M 47 65 Q 50 68 53 65 Z"
        fill="#c084fc"
      />

      <path
        d="M 50 68 L 50 71 M 50 71 Q 45 76 42 71 M 50 71 Q 55 76 58 71"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Whiskers */}
      <g
        stroke="#a78bfa"
        strokeWidth="1"
        opacity="0.75"
        strokeLinecap="round"
      >
        <path d="M 31 65 L 18 62" />
        <path d="M 31 69 L 19 70" />
        <path d="M 69 65 L 82 62" />
        <path d="M 69 69 L 81 70" />
      </g>

      {/* Paws */}
      <ellipse
        cx="34"
        cy="85"
        rx="9"
        ry="5"
        fill="#292238"
        stroke="#8b5cf6"
        strokeWidth="1"
      />

      <ellipse
        cx="66"
        cy="85"
        rx="9"
        ry="5"
        fill="#292238"
        stroke="#8b5cf6"
        strokeWidth="1"
      />

      {/* Void Guardian crown */}
      {level >= 3 && (
        <g className="spirit-cat-crown">
          <path
            d="M 35 23 L 31 10 L 43 17 L 50 5 L 57 17 L 69 10 L 65 23 Z"
            fill="url(#voidKittyAura)"
            stroke="#e9d5ff"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="15" r="2" fill="#ffffff" />
        </g>
      )}
    </svg>
  );
}

function GameCompanion() {
  const [progress, setProgress] = useState(loadProgress);
  const [isOpen, setIsOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const [message, setMessage] = useState(
    "Psst... I'm Void Kitty. Explore the portfolio to help me grow! 😼💜"
  );

  const catRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({
    x: 0,
    y: 0,
  });

  const evolution = getEvolution(progress.xp);
  const nextXP = evolution.nextXP;

  const xpPercentage = nextXP
    ? Math.min(
        100,
        ((progress.xp - evolution.minXP) /
          (nextXP - evolution.minXP)) *
          100
      )
    : 100;

  // Persist progress whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );
    } catch {
      // Void Kitty remains usable if storage is unavailable.
    }
  }, [progress]);

  // Award XP only once per achievement.
  const awardXP = useCallback((id, amount) => {
    setProgress((current) => {
      if (current.unlocked.includes(id)) {
        return current;
      }

      return {
        ...current,
        xp: current.xp + amount,
        unlocked: [...current.unlocked, id],
      };
    });
  }, []);

  // Award XP when visitors discover portfolio sections.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          const reward = SECTION_REWARDS[sectionId];

          if (reward) {
            awardXP(`section-${sectionId}`, reward);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    Object.keys(SECTION_REWARDS).forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [awardXP]);

  // Award XP when the visitor switches to dark mode.
  // The observer callback runs when the DOM theme changes.
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute(
        "data-theme"
      );

      if (theme === "dark") {
        awardXP("dark-mode", 10);
      }
    };

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [awardXP]);

  // Make Void Kitty's pupils follow the pointer.
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!catRef.current) return;

      const rect = catRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      const maxOffset = 3;

      setPupilOffset({
        x: (dx / distance) * Math.min(maxOffset, Math.abs(dx) / 30),
        y: (dy / distance) * Math.min(maxOffset, Math.abs(dy) / 30),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCatClick = () => {
    const nextClicks = progress.clicks + 1;

    setProgress((current) => {
      const clicks = current.clicks + 1;

      const earnedXP =
        (current.clicks === 0 ? 10 : 0) +
        (clicks % 5 === 0 ? 25 : 0) +
        (clicks === 12 ? 25 : 0);

      const newAchievements = [];

      if (
        current.clicks === 0 &&
        !current.unlocked.includes("first-talk")
      ) {
        newAchievements.push("first-talk");
      }

      if (clicks % 5 === 0) {
        newAchievements.push(
          `click-bonus-${Math.floor(clicks / 5)}`
        );
      }

      if (
        clicks === 12 &&
        !current.unlocked.includes("secret-cat")
      ) {
        newAchievements.push("secret-cat");
      }

      return {
        ...current,
        clicks,
        xp: current.xp + earnedXP,
        unlocked: [
          ...new Set([
            ...current.unlocked,
            ...newAchievements,
          ]),
        ],
      };
    });

    if (nextClicks === 12) {
      setMessage(
        "🏆 SECRET ACHIEVEMENT: Shadow Whisperer! +25 XP!"
      );
    } else if (nextClicks % 5 === 0) {
      setMessage(
        "✨ Combo complete! Five interactions earned +25 XP!"
      );
    } else if (nextClicks === 1) {
      setMessage(
        "First interaction! You earned +10 XP. Let's go! 😼"
      );
    } else {
      setMessage(
        MESSAGES[(nextClicks - 1) % MESSAGES.length]
      );
    }

    setIsOpen(true);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset Void Kitty's XP, achievements, and evolution? This cannot be undone."
    );

    if (!confirmed) return;

    const resetProgress = {
      ...initialProgress,
      unlocked: [],
      lastVisit: getToday(),
    };

    setProgress(resetProgress);
    setMessage(
      "A fresh adventure begins! Let's explore together. 🐾"
    );
    setShowStats(false);
    setIsOpen(true);
  };

  return (
    <aside
      className={`game-companion cat-level-${evolution.level}`}
      aria-label="Void Kitty RPG companion"
    >
      {isOpen && (
        <div
          className="companion-dialogue"
          role="status"
          aria-live="polite"
        >
          <button
            type="button"
            className="companion-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close companion dialogue"
          >
            ×
          </button>

          <span className="companion-dialogue-label">
            🐾 Void Kitty · {evolution.name}
          </span>

          <p>{message}</p>

          <div className="companion-xp-info">
            <span>LEVEL {evolution.level}</span>

            <span>
              {progress.xp} XP
              {nextXP ? ` / ${nextXP}` : " · MAX"}
            </span>
          </div>

          <div
            className="companion-xp-track"
            role="progressbar"
            aria-label="Evolution progress"
            aria-valuemin={evolution.minXP}
            aria-valuemax={nextXP || progress.xp}
            aria-valuenow={progress.xp}
          >
            <div
              className="companion-xp-fill"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>

          <button
            type="button"
            className="companion-stats-toggle"
            onClick={() => setShowStats((value) => !value)}
            aria-expanded={showStats}
          >
            {showStats ? "Hide achievements" : "View achievements"}
          </button>

          {showStats && (
            <div className="companion-stats">
              <p>
                Sections discovered:{" "}
                {
                  progress.unlocked.filter((item) =>
                    item.startsWith("section-")
                  ).length
                }
                /{Object.keys(SECTION_REWARDS).length}
              </p>

              <p>Cat interactions: {progress.clicks}</p>

              <p>
                First interaction:{" "}
                {progress.unlocked.includes("first-talk")
                  ? "Unlocked 🐾"
                  : "Locked 🔒"}
              </p>

              <p>
                Secret achievement:{" "}
                {progress.unlocked.includes("secret-cat")
                  ? "Unlocked 🏆"
                  : "Locked 🔒"}
              </p>

              <p>
                Dark mode:{" "}
                {progress.unlocked.includes("dark-mode")
                  ? "Discovered 🌙"
                  : "Not discovered"}
              </p>

              <p>Evolution: {evolution.name}</p>

              <button
                type="button"
                className="companion-reset"
                onClick={handleReset}
              >
                Reset progress
              </button>
            </div>
          )}
        </div>
      )}

      <button
        ref={catRef}
        type="button"
        className="companion-character"
        onClick={handleCatClick}
        aria-label={`Talk to Void Kitty, level ${evolution.level}`}
        aria-expanded={isOpen}
      >
        <SpiritCat
          level={evolution.level}
          pupilOffset={pupilOffset}
        />
      </button>
    </aside>
  );
}

export default GameCompanion;
