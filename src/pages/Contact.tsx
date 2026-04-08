import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ContactFormData } from '../types';
import { useContactStore } from '../store/contactStore';
import { usePersonalInfo, useSocialLinks, useSiteSettingsStore } from '../store/siteSettingsStore';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { sendMessage, loading } = useContactStore();
  const personalInfo = usePersonalInfo();
  const socialLinks = useSocialLinks();
  const { fetchSettings } = useSiteSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Imię i nazwisko jest wymagane (min. 2 znaki)';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj prawidłowy adres email';
    }
    
    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'Temat jest wymagany (min. 3 znaki)';
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Wiadomość jest wymagana (min. 10 znaków)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const success = await sendMessage(formData);
      if (success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const contactInfoItems = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email || 'contact@emanuelw.pl',
      href: `mailto:${personalInfo.email || 'contact@emanuelw.pl'}`,
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: personalInfo.phone || '+48 123 456 789',
      href: `tel:${(personalInfo.phone || '+48123456789').replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      title: 'Lokalizacja',
      value: personalInfo.address || 'Polska',
      href: null,
    },
  ];
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">Dziękuję za wiadomość!</h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8">Odpowiem tak szybko, jak to możliwe.</p>
          <Button
            variant="primary"
            onClick={() => setIsSubmitted(false)}
          >
            Wyślij kolejną wiadomość
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Skontaktuj się <span className="text-primary">ze mną</span>
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto">
            Masz projekt do zrealizowania? Chcesz porozmawiać o współpracy? Napisz do mnie!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Informacje kontaktowe</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg mb-8">
                Jestem otwarty na nowe możliwości i ciekawe projekty. Skontaktuj się ze mną, 
                a omówimy szczegóły współpracy.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfoItems.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900">{info.title}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-8"
            >
              <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-900 mb-4">Znajdź mnie również na:</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'GitHub', href: socialLinks.github || 'https://github.com/emanuelw' },
                  { name: 'LinkedIn', href: socialLinks.linkedin || 'https://linkedin.com/in/emanuelw' },
                  { name: 'Instagram', href: socialLinks.instagram },
                  { name: 'Facebook', href: socialLinks.facebook },
                ].filter(social => social.href).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/5 dark:bg-white/5 light:bg-gray-100 hover:bg-primary/20 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-primary rounded-lg transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">Wyślij wiadomość</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-gray-50 border rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-white/10 dark:border-white/10 light:border-gray-300 focus:ring-primary/50 focus:border-primary/50'
                    }`}
                    placeholder="Twoje imię i nazwisko"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-gray-50 border rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-white/10 dark:border-white/10 light:border-gray-300 focus:ring-primary/50 focus:border-primary/50'
                    }`}
                    placeholder="twoj@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                
                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Temat *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-gray-50 border rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-white/10 dark:border-white/10 light:border-gray-300 focus:ring-primary/50 focus:border-primary/50'
                    }`}
                    placeholder="Temat wiadomości"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-gray-50 border rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                    }`}
                    placeholder="Opisz swój projekt lub zadaj pytanie..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  loading={loading}
                  className="w-full"
                >
                  {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;