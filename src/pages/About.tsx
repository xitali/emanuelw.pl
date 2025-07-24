import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users, Award, Coffee } from 'lucide-react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  const skills = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, TypeScript, Vue.js, Next.js',
      color: 'text-primary',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD, Responsive Design',
      color: 'text-secondary',
    },
    {
      icon: Zap,
      title: 'Backend Development',
      description: 'Node.js, Express, PostgreSQL, MongoDB',
      color: 'text-accent',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Git, Agile, Code Review, Mentoring',
      color: 'text-primary',
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: '50+ Projektów',
      description: 'Zrealizowanych z sukcesem',
    },
    {
      icon: Users,
      title: '30+ Klientów',
      description: 'Zadowolonych z współpracy',
    },
    {
      icon: Coffee,
      title: '1000+ Godzin',
      description: 'Kodowania rocznie',
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
              O mnie
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Jestem pasjonatem technologii z ponad 5-letnim doświadczeniem w tworzeniu 
            nowoczesnych aplikacji webowych i desktopowych.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Moja historia</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Rozpocząłem swoją przygodę z programowaniem w 2019 roku, fascynując się 
                  możliwościami, jakie daje kod. Od tamtej pory nieustannie rozwijam swoje 
                  umiejętności, śledząc najnowsze trendy w branży IT.
                </p>
                <p>
                  Specjalizuję się w tworzeniu responsywnych aplikacji webowych z wykorzystaniem 
                  najnowszych technologii. Każdy projekt traktuję jako wyzwanie, które pozwala 
                  mi rozwijać się zawodowo i dostarczać najlepsze rozwiązania.
                </p>
                <p>
                  Poza programowaniem interesuję się designem UI/UX, co pozwala mi tworzyć 
                  nie tylko funkcjonalne, ale również estetyczne i intuicyjne interfejsy.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="glass p-8 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-white mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Moje umiejętności
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card variant="glass" className="h-full text-center p-6 hover:scale-105 transition-transform">
                  <skill.icon className={`w-12 h-12 ${skill.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {skill.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Moje wartości</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">Jakość</h3>
              <p className="text-gray-400">
                Każdy projekt wykonuję z najwyższą starannością, 
                dbając o czytelność kodu i optymalizację wydajności.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-secondary mb-4">Innowacyjność</h3>
              <p className="text-gray-400">
                Stale poszukuję nowych rozwiązań i technologii, 
                które mogą ulepszyć proces tworzenia aplikacji.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-4">Współpraca</h3>
              <p className="text-gray-400">
                Wierzę w siłę teamworku i otwartą komunikację 
                jako klucz do sukcesu każdego projektu.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;