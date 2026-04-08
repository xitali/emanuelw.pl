import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'switch';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  variant = 'button'
}) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (variant === 'switch') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          isDark ? 'bg-primary' : 'bg-gray-300'
        } ${className}`}
        style={{ width: '3rem', height: '1.5rem' }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-md"
          animate={{
            x: isDark ? '1.5rem' : '0rem'
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        >
          <motion.div
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Moon className="w-3 h-3 text-primary" />
            ) : (
              <Sun className="w-3 h-3 text-yellow-500" />
            )}
          </motion.div>
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        isDark 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-white text-gray-800 hover:bg-gray-100'
      } ${sizeClasses[size]} ${className}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
          damping: 10
        }}
      >
        {isDark ? (
          <Moon className={`${iconSizes[size]} transition-colors duration-300`} />
        ) : (
          <Sun className={`${iconSizes[size]} transition-colors duration-300`} />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full opacity-0 ${
          isDark ? 'bg-yellow-400' : 'bg-yellow-300'
        }`}
        animate={{
          opacity: isDark ? [0, 0.3, 0] : [0, 0.2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;