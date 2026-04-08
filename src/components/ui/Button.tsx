import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  title?: string;
  'aria-busy'?: boolean | 'true' | 'false';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  title,
  'aria-busy': ariaBusy,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary light:border-primary light:text-primary light:hover:text-white',
    ghost: 'text-primary hover:bg-primary/10 dark:text-primary dark:hover:bg-primary/10 light:text-primary light:hover:bg-primary/10',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={(e) => onClick?.(e)}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      title={title}
      aria-busy={ariaBusy}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
    </motion.button>
  );
};

export default Button;