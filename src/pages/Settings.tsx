import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Database, Globe, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { useSiteSettingsStore, usePersonalInfo, useSocialLinks } from '../store/siteSettingsStore';

interface SettingsFormData {
  personal_first_name: string;
  personal_last_name: string;
  personal_email: string;
  personal_phone: string;
  personal_bio: string;
  social_github: string;
  social_linkedin: string;
  social_instagram: string;
  social_facebook: string;
  supabaseUrl: string;
  supabaseKey: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}



const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, changePassword } = useAuthStore();
  const { loading, fetchSettings, updateSetting } = useSiteSettingsStore();
  const personalInfo = usePersonalInfo();
  const socialLinks = useSocialLinks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);
  const [formData, setFormData] = useState<SettingsFormData>({
    personal_first_name: '',
    personal_last_name: '',
    personal_email: '',
    personal_phone: '',
    personal_bio: '',
    social_github: '',
    social_linkedin: '',
    social_instagram: '',
    social_facebook: '',
    supabaseUrl: '',
    supabaseKey: '',
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
  });
  const [errors, setErrors] = useState<Partial<SettingsFormData>>({});
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordFormData>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchSettings().then(() => {
      setDataLoaded(true);
    });
  }, [isAuthenticated, navigate, fetchSettings]);
  
  useEffect(() => {
    // Ustaw wartości formularza na podstawie danych z bazy tylko raz po załadowaniu
    if (dataLoaded && !loading && !formInitialized) {
      setFormData({
        personal_first_name: personalInfo.firstName,
        personal_last_name: personalInfo.lastName,
        personal_email: personalInfo.email,
        personal_phone: personalInfo.phone,
        personal_bio: personalInfo.bio,
        social_github: socialLinks.github,
        social_linkedin: socialLinks.linkedin,
        social_instagram: socialLinks.instagram,
        social_facebook: socialLinks.facebook,
        supabaseUrl: '',
        supabaseKey: '',
        emailjsServiceId: '',
        emailjsTemplateId: '',
        emailjsPublicKey: '',
      });
      setFormInitialized(true);
    }
  }, [dataLoaded, loading, personalInfo, socialLinks, formInitialized]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SettingsFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (passwordErrors[name as keyof PasswordFormData]) {
      setPasswordErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SettingsFormData> = {};
    
    if (!formData.personal_first_name.trim()) {
      newErrors.personal_first_name = 'Imię jest wymagane';
    }
    
    if (!formData.personal_last_name.trim()) {
      newErrors.personal_last_name = 'Nazwisko jest wymagane';
    }
    
    if (!formData.personal_email.trim()) {
      newErrors.personal_email = 'Email jest wymagany';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.personal_email)) {
      newErrors.personal_email = 'Nieprawidłowy format email';
    }
    
    if (!formData.personal_phone.trim()) {
      newErrors.personal_phone = 'Telefon jest wymagany';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Zapisz każde ustawienie osobno
      const promises = Object.entries(formData).map(([key, value]) => 
        updateSetting(key, value || '')
      );
      
      await Promise.all(promises);
      toast.success('Ustawienia zostały zapisane!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Wystąpił błąd podczas zapisywania ustawień');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const validatePasswordForm = (): boolean => {
    const newErrors: Partial<PasswordFormData> = {};
    
    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = 'Aktualne hasło jest wymagane';
    }
    
    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = 'Nowe hasło jest wymagane';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Hasło musi mieć co najmniej 6 znaków';
    }
    
    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Potwierdzenie hasła jest wymagane';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
    }
    
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Hasło zostało zmienione!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Wystąpił błąd podczas zmiany hasła';
      toast.error(errorMessage);
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="dark:text-white light:text-gray-900">Ładowanie ustawień...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="dark:bg-white/5 light:bg-gray-100 dark:border-white/10 light:border-gray-200 border-b backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Powrót
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold dark:text-white light:text-gray-900">Ustawienia</h1>
              <p className="dark:text-gray-400 light:text-gray-600">Zarządzaj swoimi danymi osobowymi i konfiguracją</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold dark:text-white light:text-gray-900">Dane osobowe</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Imię *
                  </label>
                  <input
                    name="personal_first_name"
                    value={formData.personal_first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Wprowadź imię"
                  />
                  {errors.personal_first_name && (
                    <p className="mt-1 text-sm text-red-400">{errors.personal_first_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Nazwisko *
                  </label>
                  <input
                    name="personal_last_name"
                    value={formData.personal_last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Wprowadź nazwisko"
                  />
                  {errors.personal_last_name && (
                    <p className="mt-1 text-sm text-red-400">{errors.personal_last_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    name="personal_email"
                    value={formData.personal_email}
                    onChange={handleInputChange}
                    type="email"
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="email@example.com"
                  />
                  {errors.personal_email && (
                    <p className="mt-1 text-sm text-red-400">{errors.personal_email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    name="personal_phone"
                    value={formData.personal_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="+48 123 456 789"
                  />
                  {errors.personal_phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.personal_phone}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="personal_bio"
                  value={formData.personal_bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="Krótki opis o sobie..."
                />
              </div>
            </Card>

            {/* Database Configuration */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold dark:text-white light:text-gray-900">Konfiguracja bazy danych</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Supabase URL
                  </label>
                  <input
                    name="supabaseUrl"
                    value={formData.supabaseUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://your-project.supabase.co"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Supabase Anon Key
                  </label>
                  <input
                    name="supabaseKey"
                    value={formData.supabaseKey}
                    onChange={handleInputChange}
                    type="password"
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  />
                </div>
              </div>
            </Card>

            {/* Email Configuration */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold dark:text-white light:text-gray-900">Konfiguracja EmailJS</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Service ID
                  </label>
                  <input
                    name="emailjsServiceId"
                    value={formData.emailjsServiceId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="service_xxxxxxx"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Template ID
                  </label>
                  <input
                    name="emailjsTemplateId"
                    value={formData.emailjsTemplateId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="template_xxxxxxx"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Public Key
                  </label>
                  <input
                    name="emailjsPublicKey"
                    value={formData.emailjsPublicKey}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="user_xxxxxxxxxxxxxxx"
                  />
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold dark:text-white light:text-gray-900">Linki społecznościowe</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    name="social_github"
                    value={formData.social_github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    name="social_linkedin"
                    value={formData.social_linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    name="social_instagram"
                    value={formData.social_instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    name="social_facebook"
                    value={formData.social_facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
            </Card>

            {/* Password Change Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold dark:text-white light:text-gray-900">Zmiana hasła</h2>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Aktualne hasło *
                    </label>
                    <input
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Wprowadź aktualne hasło"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-400">{passwordErrors.currentPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Nowe hasło *
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Wprowadź nowe hasło"
                    />
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-400">{passwordErrors.newPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Potwierdź hasło *
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Potwierdź nowe hasło"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="secondary"
                    icon={Lock}
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? 'Zmienianie...' : 'Zmień hasło'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost">
                  Anuluj
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                icon={Save}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Zapisywanie...' : 'Zapisz ustawienia'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;