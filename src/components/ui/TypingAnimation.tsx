import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  loop?: boolean;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = '',
  cursorClassName = '',
  showCursor = true,
  loop = true,
  onComplete
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        if (loop || currentTextIndex < texts.length - 1) {
          setIsDeleting(true);
        } else {
          onComplete?.();
          return;
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => {
            if (loop) {
              return (prev + 1) % texts.length;
            } else {
              return Math.min(prev + 1, texts.length - 1);
            }
          });
        }
      } else {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseDuration : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration, loop, onComplete]);

  return (
    <span className={className}>
      <span>{currentText}</span>
      {showCursor && (
        <motion.span
          className={`inline-block ${cursorClassName}`}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypingAnimation;