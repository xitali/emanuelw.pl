import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, User, Briefcase, Mail, Settings, Users, Wrench } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const menuItems = [
    { path: '/', label: 'Strona główna', icon: Home },
    { path: '/about', label: 'O mnie', icon: User },
    { path: '/services', label: 'Usługi', icon: Briefcase },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/contact', label: 'Kontakt', icon: Mail },
  ];

  const adminItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Settings },
    { path: '/admin/projects', label: 'Projekty', icon: Briefcase },
    { path: '/admin/messages', label: 'Wiadomości', icon: Mail },
    { path: '/admin/users', label: 'Użytkownicy', icon: Users },
    { path: '/admin/services', label: 'Usługi', icon: Wrench },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed top-0 right-0 h-screen w-80 max-w-[90vw] bg-gray-900 dark:bg-gray-900 light:bg-white backdrop-blur-xl border-l border-white/10 light:border-gray-200 z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 light:border-gray-200">
              <h2 className="text-xl font-bold text-white light:text-gray-900">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 light:hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-white light:text-gray-900" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-6 pb-20">
                {/* Main Navigation */}
                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-medium text-gray-400 light:text-gray-600 uppercase tracking-wider mb-4">
                    Nawigacja
                  </h3>
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-primary/20 text-primary border border-primary/30'
                              : 'text-gray-300 light:text-gray-600 hover:text-white light:hover:text-gray-900 hover:bg-white/10 light:hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Admin Navigation */}
                {isAuthenticated && (
                  <div className="space-y-2 mb-8">
                    <h3 className="text-sm font-medium text-gray-400 light:text-gray-600 uppercase tracking-wider mb-4">
                      Panel administratora
                    </h3>
                    {adminItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (menuItems.length + index) * 0.1 }}
                        >
                          <Link
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                                : 'text-gray-300 light:text-gray-600 hover:text-white light:hover:text-gray-900 hover:bg-white/10 light:hover:bg-gray-100'
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Theme Toggle */}
                <div className="pt-6 border-t border-white/10 light:border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400 light:text-gray-600">Motyw</span>
                    <ThemeToggle variant="switch" />
                  </div>
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 border-t border-white/10 light:border-gray-200 bg-gray-900 dark:bg-gray-900 light:bg-white">
              <div className="text-center">
                <p className="text-sm text-gray-400 light:text-gray-600">
                  © 2025 Emanuel Włoch
                </p>
                <p className="text-xs text-gray-500 light:text-gray-400 mt-1">
                  Wszystkie prawa zastrzeżone
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;