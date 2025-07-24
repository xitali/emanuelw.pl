import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePersonalInfo, useSocialLinks, useSiteSettingsStore } from '../../store/siteSettingsStore';

const Footer: React.FC = () => {
  const personalInfo = usePersonalInfo();
  const socialLinksData = useSocialLinks();
  const { fetchSettings } = useSiteSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: socialLinksData.github || 'https://github.com/emanuelw',
      color: 'hover:text-gray-300',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: socialLinksData.linkedin || 'https://linkedin.com/in/emanuelw',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: socialLinksData.instagram,
      color: 'hover:text-pink-400',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: socialLinksData.facebook,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${personalInfo.email || 'contact@emanuelw.pl'}`,
      color: 'hover:text-accent',
    },
  ].filter(link => link.href);

  const quickLinks = [
    { name: 'Start', href: '/' },
    { name: 'O mnie', href: '/about' },
    { name: 'Usługi', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Kontakt', href: '/contact' },
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Emanuel Włoch
              </span>
            </h3>
            <p className="text-gray-400 max-w-md">
              Tworzę nowoczesne strony internetowe i aplikacje desktopowe z czystym kodem i dbałością o szczegóły.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 text-gray-400 transition-colors rounded-lg hover:bg-white/10 ${link.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Szybkie linki</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Kontakt</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: {personalInfo.email || 'contact@emanuelw.pl'}</p>
              <p>Telefon: {personalInfo.phone || '+48 123 456 789'}</p>
              <p>Lokalizacja: {personalInfo.address || 'Polska'}</p>
              <p>{personalInfo.availability || 'Dostępny dla nowych projektów'}</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Emanuel Włoch. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Stworzone z <Heart className="w-4 h-4 mx-1 text-red-500" /> używając React & TypeScript
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;