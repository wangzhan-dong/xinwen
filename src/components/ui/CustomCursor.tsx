"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Ensure zero rendering on server and handle mobile/touch fallback
  if (!mounted) return null;
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-[9999] opacity-0 mix-blend-difference pointer-events-none fixed top-0 left-0 bg-transparent rounded-full`}
      animate={{
        x: mousePosition.x - (isHovering ? 30 : 10),
        y: mousePosition.y - (isHovering ? 30 : 10),
        width: isHovering ? 60 : 20,
        height: isHovering ? 60 : 20,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering ? "transparent" : "white",
        borderWidth: isHovering ? 2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
}
