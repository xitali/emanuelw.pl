"use client";

import { motion } from "framer-motion";
import { useAnimationContext } from "./AnimationProvider";
import React from "react";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  viewportMargin?: string;
}

export function StaggerContainer({
  children,
  className = "",
  delayChildren = 0,
  staggerChildren = 0.1,
  viewportMargin = "-50px",
}: StaggerContainerProps) {
  const { isAnimated } = useAnimationContext();

  if (!isAnimated) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", direction = "up" }: { children: React.ReactNode, className?: string, direction?: "up" | "down" | "none" }) {
  const { isAnimated } = useAnimationContext();

  if (!isAnimated) {
    return <div className={className}>{children}</div>;
  }

  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
