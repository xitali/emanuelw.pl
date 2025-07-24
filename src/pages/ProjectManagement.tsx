import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  ArrowLeft,
  Grid,
  List
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { ProjectCategory } from '../types';


const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { projects, loading, deleteProjectById, toggleFeatured, fetchProjects } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    // Pobierz projekty z bazy danych
    fetchProjects();
  }, [isAuthenticated, navigate, fetchProjects]);

  const categories: (ProjectCategory | 'all')[] = ['all', 'web', 'mobile', 'desktop', 'other'];
  
  const categoryLabels = {
    all: 'Wszystkie',
    web: 'Web',
    mobile: 'Mobile',
    desktop: 'Desktop',
    other: 'Inne'
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć projekt "${title}"?`)) {
      await deleteProjectById(id);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    await toggleFeatured(id);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/5 dark:bg-white/5 light:bg-white border-b border-white/10 dark:border-white/10 light:border-gray-200 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" icon={ArrowLeft}>
                  Powrót
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Zarządzanie projektami</h1>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Dodawaj, edytuj i zarządzaj swoimi projektami</p>
              </div>
            </div>
            <Link to="/admin/projects/new">
              <Button variant="primary" icon={Plus}>
                Dodaj projekt
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Szukaj projektów..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'all')}
                  className="px-4 py-2 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800 dark:bg-gray-800 light:bg-white">
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={Grid}
                  onClick={() => setViewMode('grid')}
                >
                  Siatka
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={List}
                  onClick={() => setViewMode('list')}
                >
                  Lista
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
              <span>Znaleziono: {filteredProjects.length} projektów</span>
              <span>•</span>
              <span>Wyróżnione: {filteredProjects.filter(p => p.featured).length}</span>
            </div>
          </Card>
        </motion.div>

        {/* Projects */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="dark:text-white light:text-gray-900">Ładowanie projektów...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Card className="p-12">
              <div className="dark:text-gray-400 light:text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Nie znaleziono projektów spełniających kryteria'
                  : 'Brak projektów'
                }
              </div>
              <Link to="/admin/projects/new">
                <Button variant="primary" icon={Plus}>
                  Dodaj pierwszy projekt
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {viewMode === 'grid' ? (
                  <Card className="overflow-hidden group hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <img
                        src={project.images?.[0] || '/placeholder-image.jpg'}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      {project.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                            Wyróżniony
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white light:text-gray-900 mb-1">{project.title}</h3>
                          <span className="text-sm text-primary capitalize">{project.category}</span>
                        </div>
                        <button
                          onClick={() => handleToggleFeatured(project.id)}
                          className={`p-1 rounded transition-colors ${
                            project.featured 
                              ? 'text-yellow-400 hover:text-yellow-300' 
                              : 'text-gray-400 hover:text-yellow-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <p className="dark:text-gray-400 light:text-gray-600 text-sm mb-4 line-clamp-2">{project.short_description}</p>
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/projects/${project.id}/edit`}>
                          <Button variant="outline" size="sm" icon={Edit}>
                            Edytuj
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Eye}
                          onClick={() => window.open(project.project_url, '_blank')}
                        >
                          Zobacz
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Trash2}
                          onClick={() => handleDelete(project.id, project.title)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Usuń
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={project.images?.[0] || '/placeholder-image.jpg'}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold dark:text-white light:text-gray-900">{project.title}</h3>
                            <span className="text-sm text-primary capitalize">{project.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {project.featured && (
                              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                                Wyróżniony
                              </span>
                            )}
                            <button
                              onClick={() => handleToggleFeatured(project.id)}
                              className={`p-1 rounded transition-colors ${
                                project.featured 
                                  ? 'text-yellow-400 hover:text-yellow-300' 
                                  : 'text-gray-400 hover:text-yellow-400'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                        <p className="dark:text-gray-400 light:text-gray-600 text-sm mb-3">{project.short_description}</p>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/projects/${project.id}/edit`}>
                            <Button variant="outline" size="sm" icon={Edit}>
                              Edytuj
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={Eye}
                            onClick={() => window.open(project.project_url, '_blank')}
                          >
                            Zobacz
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            icon={Trash2}
                            onClick={() => handleDelete(project.id, project.title)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Usuń
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;