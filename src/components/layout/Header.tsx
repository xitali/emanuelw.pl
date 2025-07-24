import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  const navItems = [
    { path: '/', label: 'Strona główna' },
    { path: '/about', label: 'O mnie' },
    { path: '/services', label: 'Usługi' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Kontakt' },
  ];

  const adminItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/projects', label: 'Projekty' },
    { path: '/admin/messages', label: 'Wiadomości' },
    { path: '/admin/users', label: 'Użytkownicy' },
    { path: '/admin/services', label: 'Usługi' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={theme === 'light' ? '/emanuelw-logo.jpeg' : '/emanuelw-logo.jpeg'}
              alt="Emanuel Włoch Logo" 
              className="w-14 h-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
              Emanuel Włoch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-300 light:text-gray-600 hover:text-white light:hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Admin Navigation */}
            {isAuthenticated && (
              <div className="flex items-center space-x-6 ml-6 pl-6 border-l border-white/20 light:border-gray-300">
                {adminItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-secondary'
                          : 'text-gray-400 light:text-gray-500 hover:text-white light:hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeAdminTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Desktop */}
            <div className="hidden md:block">
              <ThemeToggle size="sm" />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white light:text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-white light:text-gray-900" />
              )}
            </button>
          </div>
        </div>


      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </motion.header>
  );
};

export default Header;