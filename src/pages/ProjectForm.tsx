import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Upload, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { Project, ProjectCategory, ProjectStatus } from '../types';

interface ProjectFormData {
  title: string;
  short_description: string;
  detailed_description: string;
  frontend_technologies: string;
  backend_technologies: string;
  tools_and_services: string;
  images: string;
  repository_url?: string;
  project_url?: string;
  category: ProjectCategory;
  project_type?: string;
  project_status?: string;
  completion_date?: string;
  hosting_platform?: string;
  key_features: string;
  design_style?: string;
  color_palette?: string;
  target_audience?: string;
  is_responsive: boolean;
  accessibility_features?: string;
  main_challenge?: string;
  innovation?: string;
  project_result?: string;
  performance_metrics?: string;
  success_metrics?: string;
  user_feedback?: string;
  technical_metrics?: string;
  featured: boolean;
}

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuthStore();
  const { projects, createProject, updateProjectById, loading, fetchProjects } = useProjectStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(new Set());
  const [uploadErrors, setUploadErrors] = useState<Record<number, string>>({});
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    short_description: '',
    detailed_description: '',
    frontend_technologies: '',
    backend_technologies: '',
    tools_and_services: '',
    images: '',
    repository_url: '',
    project_url: '',
    category: 'web',
    project_type: '',
    project_status: 'active',
    completion_date: '',
    hosting_platform: '',
    key_features: '',
    design_style: '',
    color_palette: '',
    target_audience: '',
    is_responsive: true,
    accessibility_features: '',
    main_challenge: '',
    innovation: '',
    project_result: '',
    performance_metrics: '',
    success_metrics: '',
    user_feedback: '',
    technical_metrics: '',
    featured: false
  });
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});
  
  const isEditing = Boolean(id && id !== 'new');
  const existingProject = isEditing ? projects.find(p => p.id === id) : null;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Fetch projects if not loaded yet
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [isAuthenticated, navigate, fetchProjects, projects.length]);

  useEffect(() => {
    if (isEditing && existingProject) {
      
      const formattedData = {
        title: existingProject.title,
        short_description: existingProject.short_description || '',
        detailed_description: existingProject.detailed_description || '',
        frontend_technologies: existingProject.frontend_technologies?.join(', ') || '',
        backend_technologies: existingProject.backend_technologies?.join(', ') || '',
        tools_and_services: existingProject.tools_and_services?.join(', ') || '',
        images: existingProject.images?.join('\n') || '',
        repository_url: existingProject.repository_url || '',
        project_url: existingProject.project_url || '',
        category: existingProject.category as ProjectCategory,
        project_type: existingProject.project_type || '',
        project_status: (['active', 'archived', 'in-development'].includes(existingProject.project_status as string) ? existingProject.project_status as ProjectStatus : 'active'),
        completion_date: existingProject.completion_date ? existingProject.completion_date.substring(0, 7) : '',
        hosting_platform: existingProject.hosting_platform || '',
        key_features: existingProject.key_features?.join('\n') || '',
        design_style: existingProject.design_style || '',
        color_palette: existingProject.color_palette ? existingProject.color_palette.join(', ') : '',
        target_audience: existingProject.target_audience || '',
        is_responsive: existingProject.is_responsive ?? true,
        accessibility_features: existingProject.accessibility_features || '',
        main_challenge: existingProject.main_challenge || '',
        innovation: existingProject.innovation || '',
        project_result: existingProject.project_result || '',
        performance_metrics: existingProject.performance_metrics ? existingProject.performance_metrics.join(', ') : '',
        success_metrics: existingProject.success_metrics ? existingProject.success_metrics.join(', ') : '',
        user_feedback: existingProject.user_feedback ? existingProject.user_feedback.join('\n') : '',
        technical_metrics: existingProject.technical_metrics ? existingProject.technical_metrics.join(', ') : '',
        featured: existingProject.featured
      };
      
      setFormData(formattedData);
      setImageUrls(existingProject.images && existingProject.images.length > 0 ? existingProject.images : ['']);
    }
  }, [isEditing, existingProject, projects]);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
    }
    
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Krótki opis jest wymagany';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ProjectFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onSubmit(formData);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    // Clear broken image flag when URL is changed
    setBrokenImages(prev => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const uploadImage = async (index: number, file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadErrors(prev => ({ ...prev, [index]: 'Dozwolone formaty: JPG, PNG, WebP, GIF' }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadErrors(prev => ({ ...prev, [index]: 'Maksymalny rozmiar pliku to 10 MB' }));
      return;
    }

    setUploadErrors(prev => { const next = { ...prev }; delete next[index]; return next; });
    setUploadingIndices(prev => new Set(prev).add(index));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Upload nie powiódł się');
      }

      updateImageUrl(index, data.url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Błąd podczas uploadu';
      setUploadErrors(prev => ({ ...prev, [index]: message }));
      toast.error(message);
    } finally {
      setUploadingIndices(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };



  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    
    try {
      // Automatycznie generuj technologies z frontend i backend technologies
      const frontendTechs = data.frontend_technologies ? data.frontend_technologies.split(',').map(t => t.trim()).filter(t => t !== '') : [];
      const backendTechs = data.backend_technologies ? data.backend_technologies.split(',').map(t => t.trim()).filter(t => t !== '') : [];
      const combinedTechnologies = [...frontendTechs, ...backendTechs];
      
      // Przygotuj tablice z walidacją
      const toolsAndServices = data.tools_and_services ? data.tools_and_services.split(',').map(t => t.trim()).filter(t => t !== '') : [];
      const keyFeatures = data.key_features ? data.key_features.split('\n').map(f => f.trim()).filter(f => f !== '') : [];
      const colorPalette = data.color_palette ? data.color_palette.split(',').map(c => c.trim()).filter(c => c !== '') : [];
      const performanceMetrics = data.performance_metrics ? data.performance_metrics.split(',').map(p => p.trim()).filter(p => p !== '') : [];
      const successMetrics = data.success_metrics ? data.success_metrics.split(',').map(s => s.trim()).filter(s => s !== '') : [];
      const userFeedback = data.user_feedback ? data.user_feedback.split('\n').map(f => f.trim()).filter(f => f !== '') : [];
      const technicalMetrics = data.technical_metrics ? data.technical_metrics.split(',').map(t => t.trim()).filter(t => t !== '') : [];
      const filteredImages = imageUrls.filter(url => url.trim() !== '');
      
      const projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
        title: data.title,
        short_description: data.short_description || undefined,
        detailed_description: data.detailed_description || undefined,
        technologies: combinedTechnologies.length > 0 ? combinedTechnologies : undefined,
        frontend_technologies: frontendTechs.length > 0 ? frontendTechs : undefined,
        backend_technologies: backendTechs.length > 0 ? backendTechs : undefined,
        tools_and_services: toolsAndServices.length > 0 ? toolsAndServices : undefined,
        images: filteredImages.length > 0 ? filteredImages : undefined,
        repository_url: data.repository_url || undefined,
        project_url: data.project_url || undefined,
        category: data.category,
        project_type: data.project_type || undefined,
        project_status: (['active', 'archived', 'in-development'].includes(data.project_status as string) ? data.project_status as ProjectStatus : 'active'),
        completion_date: data.completion_date ? `${data.completion_date}-01` : undefined,
        hosting_platform: data.hosting_platform || undefined,
        key_features: keyFeatures.length > 0 ? keyFeatures : undefined,
        design_style: data.design_style || undefined,
        color_palette: colorPalette.length > 0 ? colorPalette : undefined,
        target_audience: data.target_audience || undefined,
        is_responsive: data.is_responsive,
        accessibility_features: data.accessibility_features || undefined,
        main_challenge: data.main_challenge || undefined,
        innovation: data.innovation || undefined,
        project_result: data.project_result || undefined,
        performance_metrics: performanceMetrics.length > 0 ? performanceMetrics : undefined,
        success_metrics: successMetrics.length > 0 ? successMetrics : undefined,
        user_feedback: userFeedback.length > 0 ? userFeedback : undefined,
        technical_metrics: technicalMetrics.length > 0 ? technicalMetrics : undefined,
        featured: data.featured
      };
      
      if (isEditing && id) {
        await updateProjectById(id, projectData);
        toast.success('Projekt został zaktualizowany!');
      } else {
        await createProject(projectData);
        toast.success('Projekt został dodany!');
      }
      
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Wystąpił błąd podczas zapisywania projektu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/5 dark:bg-white/5 light:bg-gray-100 border-b border-white/10 dark:border-white/10 light:border-gray-200 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/projects">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Powrót
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                {isEditing ? 'Edytuj projekt' : 'Dodaj nowy projekt'}
              </h1>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                {isEditing ? 'Zaktualizuj informacje o projekcie' : 'Wypełnij formularz aby dodać projekt'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Tytuł projektu *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Wprowadź tytuł projektu"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Krótki opis *
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="1-2 zdania o głównym celu projektu"
                />
                {errors.short_description && (
                  <p className="mt-1 text-sm text-red-400">{errors.short_description}</p>
                )}
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Szczegółowy opis
                </label>
                <textarea
                  name="detailed_description"
                  value={formData.detailed_description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="3-5 zdań o funkcjonalności, unikalnych cechach i wartości dla użytkowników"
                />
              </div>



              {/* Frontend Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Technologie Frontend
                </label>
                <input
                  type="text"
                  name="frontend_technologies"
                  value={formData.frontend_technologies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="React, TypeScript, Tailwind CSS, Vite (oddziel przecinkami)"
                />
              </div>

              {/* Backend Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Technologie Backend
                </label>
                <input
                  type="text"
                  name="backend_technologies"
                  value={formData.backend_technologies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Node.js, Express, PostgreSQL (oddziel przecinkami)"
                />
              </div>

              {/* Tools and Services */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Narzędzia i Usługi
                </label>
                <input
                  type="text"
                  name="tools_and_services"
                  value={formData.tools_and_services}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Stripe API, Google Maps, SendGrid (oddziel przecinkami)"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Zdjęcia projektu *
                </label>
                {/* aria-live region announces upload status to screen readers */}
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {uploadingIndices.size > 0 ? 'Przesyłanie zdjęcia…' : ''}
                </div>
                <div className="space-y-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex gap-2 items-start">
                        {/* Image preview */}
                        {url && !brokenImages.has(index) && (
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                              src={url}
                              alt={`Podgląd ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={() => setBrokenImages(prev => new Set(prev).add(index))}
                            />
                          </div>
                        )}
                        <div className="flex-1 flex gap-2">
                          <input
                            value={url}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                            placeholder="URL do zdjęcia projektu"
                            disabled={uploadingIndices.has(index)}
                          />
                          {/* Hidden file input */}
                          <input
                            ref={(el) => { fileInputRefs.current[index] = el; }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(index, file);
                              e.target.value = '';
                            }}
                          />
                          {/* Upload button */}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            icon={uploadingIndices.has(index) ? Loader2 : Upload}
                            onClick={() => fileInputRefs.current[index]?.click()}
                            disabled={uploadingIndices.has(index)}
                            aria-busy={uploadingIndices.has(index)}
                            title="Prześlij plik"
                          >
                            {uploadingIndices.has(index) ? 'Przesyłanie…' : 'Prześlij'}
                          </Button>
                          {imageUrls.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              icon={X}
                              onClick={() => removeImageUrl(index)}
                              className="text-red-400 hover:text-red-300"
                              disabled={uploadingIndices.has(index)}
                            >
                              Usuń
                            </Button>
                          )}
                        </div>
                      </div>
                      {uploadErrors[index] && (
                        <p className="text-xs text-red-400 pl-1">{uploadErrors[index]}</p>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={Plus}
                    onClick={addImageUrl}
                  >
                    Dodaj zdjęcie
                  </Button>
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Repository URL
                  </label>
                  <input
                    name="repository_url"
                    value={formData.repository_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://github.com/username/repository"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Project URL
                  </label>
                  <input
                    name="project_url"
                    value={formData.project_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Kategoria *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  <option value="web" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Web</option>
                  <option value="mobile" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Mobile</option>
                  <option value="desktop" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Desktop</option>
                  <option value="other" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Inne</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">{errors.category}</p>
                )}
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Kluczowe funkcje
                </label>
                <textarea
                  name="key_features"
                  value={formData.key_features}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="System płatności online\nResponsywny design\nPanel administratora\nIntegracja z API (każda funkcja w nowej linii)"
                />
              </div>

              {/* Design Style */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Styl designu
                </label>
                <input
                  type="text"
                  name="design_style"
                  value={formData.design_style}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="minimalistyczny, nowoczesny, kolorowy"
                />
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Paleta kolorów
                </label>
                <input
                  type="text"
                  name="color_palette"
                  value={formData.color_palette}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="#główny-kolor, #akcentowy-kolor"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Grupa docelowa
                </label>
                <input
                  type="text"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="małe firmy/freelancerzy/korporacje"
                />
              </div>

              {/* Is Responsive */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_responsive"
                  name="is_responsive"
                  checked={formData.is_responsive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-white/5 dark:bg-white/5 light:bg-white border-white/10 dark:border-white/10 light:border-gray-300 rounded focus:ring-primary/50 focus:ring-2"
                />
                <label htmlFor="is_responsive" className="text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700">
                  Responsywny design (mobile-first)
                </label>
              </div>

              {/* Accessibility Features */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Funkcje dostępności
                </label>
                <input
                  type="text"
                  name="accessibility_features"
                  value={formData.accessibility_features}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="ARIA labels, keyboard navigation, screen reader support"
                />
              </div>

              {/* Main Challenge */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Główne wyzwanie
                </label>
                <textarea
                  name="main_challenge"
                  value={formData.main_challenge}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="Główne wyzwanie techniczne które zostało rozwiązane"
                />
              </div>

              {/* Innovation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Innowacja
                </label>
                <textarea
                  name="innovation"
                  value={formData.innovation}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="Unikalne rozwiązanie zastosowane w projekcie"
                />
              </div>

              {/* Project Result */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Rezultat projektu
                </label>
                <input
                  type="text"
                  name="project_result"
                  value={formData.project_result}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="40% wzrost konwersji, 1000+ użytkowników"
                />
              </div>

              {/* Performance Metrics */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Metryki wydajności
                </label>
                <input
                  type="text"
                  name="performance_metrics"
                  value={formData.performance_metrics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Szybkość ładowania, optymalizacje (oddziel przecinkami)"
                />
              </div>

              {/* Success Metrics */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Metryki sukcesu
                </label>
                <input
                  type="text"
                  name="success_metrics"
                  value={formData.success_metrics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Konkretne dane o sukcesie projektu (oddziel przecinkami)"
                />
              </div>

              {/* User Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Opinie użytkowników
                </label>
                <textarea
                  name="user_feedback"
                  value={formData.user_feedback}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                  placeholder="Pozytywne opinie i feedback od użytkowników"
                />
              </div>

              {/* Technical Metrics */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Metryki techniczne
                </label>
                <input
                  type="text"
                  name="technical_metrics"
                  value={formData.technical_metrics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Lighthouse score, Core Web Vitals (oddziel przecinkami)"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-white/5 dark:bg-white/5 light:bg-white border-white/10 dark:border-white/10 light:border-gray-300 rounded focus:ring-primary/50 focus:ring-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700">
                  Wyróżniony projekt
                </label>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Typ projektu
                </label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  <option value="" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Wybierz typ</option>
                  <option value="e-commerce" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">E-commerce</option>
                  <option value="landing-page" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Landing Page</option>
                  <option value="web-app" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Aplikacja webowa</option>
                  <option value="portfolio" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Portfolio</option>
                  <option value="blog" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Blog</option>
                  <option value="dashboard" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Dashboard</option>
                  <option value="api" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">API</option>
                  <option value="other" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Inne</option>
                </select>
              </div>

              {/* Project Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Status projektu
                </label>
                <select
                  name="project_status"
                  value={formData.project_status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  <option value="active" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Aktywny</option>
                  <option value="in-development" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">W rozwoju</option>
                  <option value="archived" className="bg-gray-800 dark:bg-gray-800 light:bg-white light:text-gray-900">Zakończony</option>
                </select>
              </div>

              {/* Completion Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Data ukończenia
                </label>
                <input
                  type="month"
                  name="completion_date"
                  value={formData.completion_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>

              {/* Hosting Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                  Platforma hostingowa
                </label>
                <input
                  type="text"
                  name="hosting_platform"
                  value={formData.hosting_platform}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Vercel + Supabase"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                <Link to="/admin/projects">
                  <Button variant="ghost">
                    Anuluj
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  icon={Save}
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting ? 'Zapisywanie...' : isEditing ? 'Zaktualizuj' : 'Dodaj projekt'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectForm;