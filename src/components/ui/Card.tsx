import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  variant?: 'default' | 'glass';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false,
  variant = 'default',
  onClick,
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  const glassClasses = glass || variant === 'glass' ? 'glass' : 'card-bg';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;