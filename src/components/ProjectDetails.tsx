import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  Globe, 
  Calendar, 
  Users, 
  Target, 
  Zap, 
  Award, 
  BarChart3,
  MessageSquare,
  Palette,
  Monitor,
  Smartphone,
  Code,
  Server,
  Wrench
} from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { Project } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjectStore();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id && projects.length > 0) {
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
      setLoading(false);
    }
  }, [id, projects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Projekt nie został znaleziony</h2>
          <Button onClick={() => navigate('/portfolio')}>Powrót do portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate('/portfolio')}
            className="text-gray-400 hover:text-white"
          >
            Powrót do portfolio
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h1>
                {project.featured && (
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg font-medium flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Wyróżniony
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {project.project_type && (
                  <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium">
                    {project.project_type}
                  </span>
                )}
                {project.project_status && (
                  <span className={`px-4 py-2 rounded-lg font-medium ${
                    project.project_status === 'active' ? 'bg-green-500/20 text-green-400' :
                    project.project_status === 'in-development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.project_status === 'active' ? 'Aktywny' :
                     project.project_status === 'in-development' ? 'W rozwoju' : 'Zakończony'}
                  </span>
                )}
                {project.created_at && (
                  <span className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.created_at).toLocaleDateString('pl-PL', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                )}
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {project.short_description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.repository_url && (
                  <Button
                    variant="outline"
                    icon={Github}
                    onClick={() => window.open(project.repository_url, '_blank')}
                  >
                    Zobacz kod
                  </Button>
                )}
                {project.project_url && (
                  <Button
                    variant="primary"
                    icon={Globe}
                    onClick={() => window.open(project.project_url, '_blank')}
                  >
                    Zobacz live
                  </Button>
                )}
              </div>
            </div>
            
            {/* Project Image */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <div className="relative">
                    <img 
                      src={project.images[activeImageIndex]} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl opacity-50">🚀</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            {project.detailed_description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">O projekcie</h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.detailed_description}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Key Features */}
            {project.key_features && project.key_features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-primary" />
                    Kluczowe funkcje
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.key_features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Challenges & Innovation */}
            {(project.main_challenge || project.innovation) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Wyzwania i innowacje</h2>
                  <div className="space-y-6">
                    {project.main_challenge && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Główne wyzwanie:</h3>
                        <p className="text-gray-300 leading-relaxed">{project.main_challenge}</p>
                      </div>
                    )}
                    {project.innovation && (
                      <div>
                        <h3 className="text-lg font-semibold text-secondary mb-3">Zastosowane innowacje:</h3>
                        <p className="text-gray-300 leading-relaxed">{project.innovation}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Results & Metrics */}
            {(project.project_result || project.performance_metrics) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-accent" />
                    Rezultaty i metryki
                  </h2>
                  <div className="space-y-6">
                    {project.project_result && (
                      <div>
                        <h3 className="text-lg font-semibold text-accent mb-3">Osiągnięte rezultaty:</h3>
                        <p className="text-gray-300 leading-relaxed">{project.project_result}</p>
                      </div>
                    )}
                    {project.performance_metrics && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Metryki wydajności:</h3>
                        <p className="text-gray-300 leading-relaxed">{project.performance_metrics}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* User Feedback */}
            {project.user_feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Opinie użytkowników
                  </h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.user_feedback}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Code className="w-5 h-5 text-primary" />
                  Stack technologiczny
                </h3>
                <div className="space-y-4">
                  {project.frontend_technologies && project.frontend_technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Frontend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.frontend_technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-sm rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.backend_technologies && project.backend_technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        Backend
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.backend_technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-secondary/20 text-secondary text-sm rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.tools_and_services && project.tools_and_services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Narzędzia
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tools_and_services.map((tool) => (
                          <span key={tool} className="px-2 py-1 bg-accent/20 text-accent text-sm rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!project.frontend_technologies || project.frontend_technologies.length === 0) && 
                   (!project.backend_technologies || project.backend_technologies.length === 0) && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-sm rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Design & UX */}
            {(project.design_style || project.color_palette || project.target_audience) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Palette className="w-5 h-5 text-secondary" />
                    Design & UX
                  </h3>
                  <div className="space-y-4">
                    {project.design_style && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Styl designu</h4>
                        <p className="text-gray-300 text-sm">{project.design_style}</p>
                      </div>
                    )}
                    {project.color_palette && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Paleta kolorów</h4>
                        <div className="space-y-2">
                          {project.color_palette.map((color: string, index: number) => {
                            const trimmedColor = color.trim();
                            const hexMatch = trimmedColor.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/);
                            return (
                              <div key={index} className="flex items-center gap-2">
                                {hexMatch && (
                                  <div 
                                    className="w-4 h-4 rounded border border-white/20 flex-shrink-0"
                                    style={{ backgroundColor: hexMatch[0] }}
                                  />
                                )}
                                <span className="text-gray-300 text-sm">{trimmedColor}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {project.target_audience && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Grupa docelowa
                        </h4>
                        <p className="text-gray-300 text-sm">{project.target_audience}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-2">
                      {project.is_responsive && (
                        <div className="flex items-center gap-2 text-green-400">
                          <Smartphone className="w-4 h-4" />
                          <span className="text-sm">Responsywny</span>
                        </div>
                      )}
                      {project.accessibility_features && (
                        <div className="flex items-center gap-2 text-blue-400">
                          <Target className="w-4 h-4" />
                          <span className="text-sm">Dostępny</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;