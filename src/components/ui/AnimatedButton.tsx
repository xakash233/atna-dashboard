import { motion, type HTMLMotionProps } from "motion/react";
import { useReadyToAnimate } from "@/components/ui/Motion";

/**
 * AnimatedButton wraps a standard button with subtle animations.
 */
export default function AnimatedButton({
  children,
  className = "",
  ...rest
}: HTMLMotionProps<"button">) {
  const animate = useReadyToAnimate();
  if (!animate) {
    return (
      <button className={className} {...(rest as any)}>
        {children}
      </button>
    );
  }
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05, opacity: 0.95 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
