import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Code, Palette, Zap, Shield, Users, Headphones, Star, CheckCircle } from 'lucide-react';
import { Card, Button, LoadingSpinner } from '../components/ui';
import { Link } from 'react-router-dom';
import { useServicesStore } from '../store/servicesStore';

const Services: React.FC = () => {
  const { services, loading, error, fetchActiveServices } = useServicesStore();

  useEffect(() => {
    fetchActiveServices();
  }, [fetchActiveServices]);

  // Mapowanie ikon na podstawie nazwy
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Globe': Globe,
      'Smartphone': Smartphone,
      'Code': Code,
      'Palette': Palette,
      'Zap': Zap,
      'Shield': Shield,
      'Star': Star,
      'CheckCircle': CheckCircle,
    };
    return iconMap[iconName] || Code;
  };

  // Mapowanie kolorów i gradientów
  const getServiceStyle = (index: number) => {
    const styles = [
      { color: 'text-primary', gradient: 'from-primary to-blue-500' },
      { color: 'text-secondary', gradient: 'from-secondary to-purple-500' },
      { color: 'text-accent', gradient: 'from-accent to-orange-500' },
      { color: 'text-pink-400', gradient: 'from-pink-400 to-red-500' },
      { color: 'text-yellow-400', gradient: 'from-yellow-400 to-orange-500' },
      { color: 'text-green-400', gradient: 'from-green-400 to-teal-500' },
    ];
    return styles[index % styles.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">Błąd podczas ładowania usług</h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">{error}</p>
          <Button onClick={() => fetchActiveServices()} variant="primary">
            Spróbuj ponownie
          </Button>
        </div>
      </div>
    );
  }

  const process = [
    {
      step: '01',
      title: 'Konsultacja',
      description: 'Omawiamy Twoje potrzeby i cele projektu.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Planowanie',
      description: 'Tworzę szczegółowy plan i harmonogram realizacji.',
      icon: Code,
    },
    {
      step: '03',
      title: 'Realizacja',
      description: 'Implementuję rozwiązanie zgodnie z ustaleniami.',
      icon: Zap,
    },
    {
      step: '04',
      title: 'Wsparcie',
      description: 'Zapewniam wsparcie techniczne po wdrożeniu.',
      icon: Headphones,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Usługi
            </span>
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Oferuję kompleksowe usługi w zakresie tworzenia nowoczesnych aplikacji 
            webowych i desktopowych dostosowanych do Twoich potrzeb.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">Brak dostępnych usług</p>
            </div>
          ) : (
            services.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              const style = getServiceStyle(index);
              const priceText = service.price_from 
                ? `Od ${service.price_from} ${service.price_currency}` 
                : 'Zapytaj o cenę';
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card variant="glass" className="h-full p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${style.gradient} mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-900">{service.title}</h3>
                        <p className={`text-sm font-medium ${style.color}`}>{priceText}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">{service.short_description}</p>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm mb-6">{service.description}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Link to="/contact">
                      <Button 
                        variant="outline" 
                        className="w-full"
                      >
                        Zapytaj o wycenę
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-white dark:text-white light:text-gray-900 mb-12">
            Proces współpracy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="text-center relative"
              >
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
                
                <div className="glass p-6 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center glass p-12 rounded-xl"
        >
          <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            Gotowy na rozpoczęcie projektu?
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8 max-w-2xl mx-auto">
            Skontaktuj się ze mną, aby omówić szczegóły Twojego projektu. 
            Oferuję bezpłatną konsultację i wycenę.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Skontaktuj się
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="lg">
                Zobacz portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;