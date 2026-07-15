"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lag follow effect
  const springConfig = { stiffness: 400, damping: 28, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is mobile or touch
    const checkDevice = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isCoarse);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      const mapElement = document.getElementById("interactive-map-container");
      if (mapElement) {
        const rect = mapElement.getBoundingClientRect();
        const isInside = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        setIsVisible(isInside);
        if (isInside && !isMobile) {
          document.body.classList.add("custom-cursor-map-hover");
        } else {
          document.body.classList.remove("custom-cursor-map-hover");
        }
      } else {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-map-hover");
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("custom-cursor-map-hover");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "LABEL" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".group");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-map-hover");
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 size-8 rounded-full border border-[#00d8a6] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(0, 216, 166, 0.08)" : "rgba(0, 216, 166, 0)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 size-1.5 rounded-full bg-[#6366f1] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 10000,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
