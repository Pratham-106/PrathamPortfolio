
import { useEffect, useState } from "react";
import "../styles/CurserSpotlight.css";

const CursorSpotlight = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateEnabled = () => {
      setEnabled(media.matches && !reducedMotion.matches);
    };

    updateEnabled();

    media.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      media.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;

    const handlePointerMove = (event) => {
      root.style.setProperty("--spotlight-x", `${event.clientX}px`);
      root.style.setProperty("--spotlight-y", `${event.clientY}px`);
      root.classList.add("cursor-spotlight-active");
    };

    const handlePointerLeave = () => {
      root.classList.remove("cursor-spotlight-active");
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      root.classList.remove("cursor-spotlight-active");
    };
  }, [enabled]);

  return null;
};

export default CursorSpotlight;
