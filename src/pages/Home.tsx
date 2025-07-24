import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ParticleBackground from '../components/ui/ParticleBackground';
import TypingAnimation from '../components/ui/TypingAnimation';
import { useProjectStore } from '../store/projectStore';

const Home: React.FC = () => {
  const { projects, fetchFeaturedProjects } = useProjectStore();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    fetchFeaturedProjects();
  }, [fetchFeaturedProjects]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={80}
        particleColor="#3b82f6"
        speed={0.3}
        interactive={true}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Cześć, jestem{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Emanuel Włoch
              </span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 h-12"
            >
              <TypingAnimation
                texts={[
                  'Full-stack Developer',
                  'React Specialist',
                  'Node.js Expert',
                  'UI/UX Enthusiast'
                ]}
                speed={100}
                deleteSpeed={50}
                pauseDuration={2000}
                className="text-xl md:text-2xl text-accent"
                cursorClassName="text-primary"
              />
            </motion.div>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Tworzę nowoczesne strony internetowe i aplikacje desktopowe z czystym kodem i dbałością o szczegóły.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/portfolio">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ExternalLink}
                >
                  Zobacz projekty
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  size="lg"
                  icon={ExternalLink}
                >
                  Moje usługi
                </Button>
              </Link>
            </div>
            
            <motion.button
              className="text-white/60 hover:text-white transition-colors"
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O <span className="text-primary">mnie</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Jestem pasjonatem technologii z doświadczeniem w tworzeniu nowoczesnych aplikacji web i desktop.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend Development',
                description: 'React, TypeScript, Tailwind CSS, Next.js',
                icon: '🎨',
              },
              {
                title: 'Backend Development',
                description: 'Node.js, Express, PostgreSQL, Prisma',
                icon: '⚙️',
              },
              {
                title: 'UI/UX Design',
                description: 'Figma, Adobe XD, Responsive Design',
                icon: '🎯',
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center h-full">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{skill.title}</h3>
                  <p className="text-gray-400">{skill.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Wybrane <span className="text-primary">projekty</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Oto niektóre z moich najnowszych prac
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    {/* Project Image/Preview */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                      {project.images && project.images.length > 0 ? (
                        <img 
                          src={project.images?.[0] || '/placeholder-image.jpg'} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-6xl opacity-50">🚀</span>
                      )}
                      {/* Status Badge */}
                      {project.project_status && (
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.project_status === 'active' ? 'bg-green-500/20 text-green-400' :
                            project.project_status === 'in-development' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {project.project_status}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      {/* Project Title & Type */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        {project.project_type && (
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                            {project.project_type}
                          </span>
                        )}
                      </div>
                      
                      {/* Short Description */}
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {project.short_description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(project.frontend_technologies || project.technologies)?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/20 text-primary text-sm rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.frontend_technologies || project.technologies) && (project.frontend_technologies || project.technologies)!.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-sm rounded">
                            +{(project.frontend_technologies || project.technologies)!.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* Key Features Preview */}
                      {project.key_features && project.key_features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Kluczowe funkcje:</p>
                          <p className="text-sm text-gray-400">
                            {project.key_features.slice(0, 2).join(', ')}
                            {project.key_features.length > 2 && '...'}
                          </p>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link to={`/portfolio/${project.id}`} className="flex-1">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                          >
                            Zobacz szczegóły
                          </Button>
                        </Link>
                        {project.repository_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Github}
                            onClick={() => window.open(project.repository_url, '_blank')}
                          >
                            Code
                          </Button>
                        )}
                        {project.project_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={ExternalLink}
                            onClick={() => window.open(project.project_url, '_blank')}
                          >
                            Live
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/portfolio">
                <Button
                  variant="primary"
                  size="lg"
                >
                  Zobacz wszystkie projekty
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;