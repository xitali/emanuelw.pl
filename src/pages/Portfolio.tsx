import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, Eye, Calendar, Globe, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useProjectStore } from '../store/projectStore';
import { Project, ProjectCategory } from '../types';

const Portfolio: React.FC = () => {
  const {
    filteredProjects,
    selectedCategory,
    searchQuery,
    loading,
    setSelectedCategory,
    setSearchQuery,
  } = useProjectStore();
  
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories: { value: ProjectCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Wszystkie' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'other', label: 'Inne' },
  ];
  
  const { fetchProjects } = useProjectStore();

  // Load projects from database
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  const handleProjectClick = (project: Project) => {
    navigate(`/portfolio/${project.id}`);
  };
  
  const handleQuickView = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  
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
            Moje <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kolekcja projektów, które stworzyłem używając najnowszych technologii
          </p>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Szukaj projektów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2 text-white">Brak projektów</h3>
            <p className="text-gray-400">Nie znaleziono projektów spełniających kryteria wyszukiwania.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden cursor-pointer group" onClick={() => handleProjectClick(project)}>
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images?.[0] || '/placeholder-image.jpg'} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl opacity-50">🚀</span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={(e) => handleQuickView(e, project)}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <span className="text-white font-medium">Zobacz szczegóły</span>
                    </div>
                    {/* Status Badge */}
                    {project.project_status && (
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          project.project_status === 'active' ? 'bg-green-500/20 text-green-400' :
                          project.project_status === 'in-development' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {project.project_status === 'active' ? 'Aktywny' :
                           project.project_status === 'in-development' ? 'W rozwoju' : 'Zakończony'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
                        {project.project_type && (
                          <span className="text-sm text-primary font-medium">{project.project_type}</span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {project.featured && (
                          <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-medium flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Wyróżniony
                          </span>
                        )}
                        {project.completion_date && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(project.completion_date).toLocaleDateString('pl-PL', { month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.short_description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      {project.frontend_technologies && project.frontend_technologies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {project.frontend_technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/20 text-primary text-sm rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.backend_technologies && project.backend_technologies.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-secondary/20 text-secondary text-sm rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {(project.frontend_technologies.length + (project.backend_technologies?.length || 0)) > 5 && (
                            <span className="px-2 py-1 bg-gray-600 text-gray-300 text-sm rounded">
                              +{(project.frontend_technologies.length + (project.backend_technologies?.length || 0)) - 5}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/20 text-primary text-sm rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600 text-gray-300 text-sm rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.repository_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Github}
                          onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                            e?.stopPropagation();
                            window.open(project.repository_url, '_blank');
                          }}
                        >
                          Code
                        </Button>
                      )}
                      {project.project_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Globe}
                          onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                            e?.stopPropagation();
                            window.open(project.project_url, '_blank');
                          }}
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
        )}
      </div>
      
      {/* Project Quick View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center overflow-hidden">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <img 
                  src={selectedProject.images?.[0] || '/placeholder-image.jpg'} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl opacity-50">🚀</span>
              )}
            </div>
            
            {/* Project Details */}
            <div>
              {/* Project Info */}
              <div className="flex items-center gap-4 mb-4">
                {selectedProject.project_type && (
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                    {selectedProject.project_type}
                  </span>
                )}
                {selectedProject.project_status && (
                  <span className={`px-3 py-1 text-sm rounded-lg font-medium ${
                    selectedProject.project_status === 'active' ? 'bg-green-500/20 text-green-400' :
                    selectedProject.project_status === 'in-development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedProject.project_status === 'active' ? 'Aktywny' :
                     selectedProject.project_status === 'in-development' ? 'W rozwoju' : 'Archiwum'}
                  </span>
                )}
                {selectedProject.completion_date && (
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProject.completion_date).toLocaleDateString('pl-PL')}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedProject.detailed_description || selectedProject.short_description}
              </p>
              
              {/* Key Features */}
              {selectedProject.key_features && selectedProject.key_features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Kluczowe funkcje:</h4>
                  <ul className="space-y-2">
                    {selectedProject.key_features.map((feature, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Stack technologiczny:</h4>
                <div className="space-y-3">
                  {selectedProject.frontend_technologies && selectedProject.frontend_technologies.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">Frontend:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.frontend_technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-primary/20 text-primary rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedProject.backend_technologies && selectedProject.backend_technologies.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">Backend:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.backend_technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-secondary/20 text-secondary rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(!selectedProject.frontend_technologies || selectedProject.frontend_technologies.length === 0) && 
                   (!selectedProject.backend_technologies || selectedProject.backend_technologies.length === 0) && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 text-primary rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                {selectedProject.repository_url && (
                  <Button
                    variant="outline"
                    icon={Github}
                    onClick={() => window.open(selectedProject.repository_url, '_blank')}
                  >
                    Zobacz kod
                  </Button>
                )}
                {selectedProject.project_url && (
                  <Button
                    variant="outline"
                    icon={Globe}
                    onClick={() => window.open(selectedProject.project_url, '_blank')}
                  >
                    Zobacz live
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    handleCloseModal();
                    navigate(`/portfolio/${selectedProject.id}`);
                  }}
                >
                  Pełne szczegóły
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Portfolio;