import { create } from 'zustand';
import { Project, ProjectCategory } from '../types';
import { db } from '../lib/supabase';

interface ProjectStore {
  projects: Project[];
  filteredProjects: Project[];
  selectedCategory: ProjectCategory | 'all';
  searchQuery: string;
  loading: boolean;
  error: string | null;
  
  // Sync actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSelectedCategory: (category: ProjectCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  filterProjects: () => void;
  
  // Async actions
  fetchProjects: () => Promise<void>;
  fetchFeaturedProjects: () => Promise<void>;
  createProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProjectById: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProjectById: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  filteredProjects: [],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  
  setProjects: (projects) => {
    set({ projects });
    get().filterProjects();
  },
  
  addProject: (project) => {
    const { projects } = get();
    set({ projects: [project, ...projects] });
    get().filterProjects();
  },
  
  updateProject: (id, updatedProject) => {
    const { projects } = get();
    const updatedProjects = projects.map(p => 
      p.id === id ? { ...p, ...updatedProject } : p
    );
    set({ projects: updatedProjects });
    get().filterProjects();
  },
  
  deleteProject: (id) => {
    const { projects } = get();
    const filteredProjects = projects.filter(p => p.id !== id);
    set({ projects: filteredProjects });
    get().filterProjects();
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().filterProjects();
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterProjects();
  },
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  filterProjects: () => {
    const { projects, selectedCategory, searchQuery } = get();
    
    let filtered = projects;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        (p.detailed_description && p.detailed_description.toLowerCase().includes(query)) ||
        p.technologies?.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    set({ filteredProjects: filtered });
  },
  
  // Async actions
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.projects.getAll();
      if (error) throw error;
      
      const projects: Project[] = data?.map(project => ({
        id: project.id,
        title: project.title,
        short_description: project.short_description,
        detailed_description: project.detailed_description,
        technologies: project.technologies || [],
        frontend_technologies: project.frontend_technologies,
        backend_technologies: project.backend_technologies,
        tools_and_services: project.tools_and_services,
        images: project.images || [],
        project_url: project.project_url,
        repository_url: project.repository_url,
        category: project.category as ProjectCategory,
        project_type: project.project_type,
        project_status: project.project_status,
        completion_date: project.completion_date,
        hosting_platform: project.hosting_platform,
        target_audience: project.target_audience,
        key_features: project.key_features,
        design_style: project.design_style,
        color_palette: project.color_palette,
        is_responsive: project.is_responsive,
        accessibility_features: project.accessibility_features,
        main_challenge: project.main_challenge,
        innovation: project.innovation,
        project_result: project.project_result,
        performance_metrics: project.performance_metrics,
        success_metrics: project.success_metrics,
        user_feedback: project.user_feedback,
        technical_metrics: project.technical_metrics,
        featured: project.featured,
        created_at: project.created_at,
        updated_at: project.updated_at,
      })) || [];
      
      get().setProjects(projects);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch projects' });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchFeaturedProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.projects.getFeatured();
      if (error) throw error;
      
      const projects: Project[] = data?.map(project => ({
        id: project.id,
        title: project.title,
        short_description: project.short_description,
        detailed_description: project.detailed_description,
        technologies: project.technologies || [],
        frontend_technologies: project.frontend_technologies,
        backend_technologies: project.backend_technologies,
        tools_and_services: project.tools_and_services,
        images: project.images || [],
        project_url: project.project_url,
        repository_url: project.repository_url,
        category: project.category as ProjectCategory,
        project_type: project.project_type,
        project_status: project.project_status,
        completion_date: project.completion_date,
        hosting_platform: project.hosting_platform,
        target_audience: project.target_audience,
        key_features: project.key_features,
        design_style: project.design_style,
        color_palette: project.color_palette,
        is_responsive: project.is_responsive,
        accessibility_features: project.accessibility_features,
        main_challenge: project.main_challenge,
        innovation: project.innovation,
        project_result: project.project_result,
        performance_metrics: project.performance_metrics,
        success_metrics: project.success_metrics,
        user_feedback: project.user_feedback,
        technical_metrics: project.technical_metrics,
        featured: project.featured,
        created_at: project.created_at,
        updated_at: project.updated_at,
      })) || [];
      
      get().setProjects(projects);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch featured projects' });
    } finally {
      set({ loading: false });
    }
  },
  
  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.projects.create({
        title: projectData.title,
        short_description: projectData.short_description,
        detailed_description: projectData.detailed_description,
        technologies: projectData.technologies || [],
        frontend_technologies: projectData.frontend_technologies,
        backend_technologies: projectData.backend_technologies,
        tools_and_services: projectData.tools_and_services,
        images: projectData.images || [],

        project_url: projectData.project_url,
        repository_url: projectData.repository_url,
        category: projectData.category,
        project_type: projectData.project_type,
        project_status: projectData.project_status,
        completion_date: projectData.completion_date,
        hosting_platform: projectData.hosting_platform,
        key_features: projectData.key_features,
        design_style: projectData.design_style,
        color_palette: projectData.color_palette,
        target_audience: projectData.target_audience,
        is_responsive: projectData.is_responsive,
        accessibility_features: projectData.accessibility_features,
        main_challenge: projectData.main_challenge,
        innovation: projectData.innovation,
        project_result: projectData.project_result,
        performance_metrics: projectData.performance_metrics,
        success_metrics: projectData.success_metrics,
        user_feedback: projectData.user_feedback,
        technical_metrics: projectData.technical_metrics,
        featured: projectData.featured,
      });
      
      if (error) throw error;
      
      if (data) {
        const newProject: Project = {
          id: data.id,
          title: data.title,
          short_description: data.short_description,
          detailed_description: data.detailed_description,
          technologies: data.technologies || [],
          frontend_technologies: data.frontend_technologies,
          backend_technologies: data.backend_technologies,
          tools_and_services: data.tools_and_services,
          images: data.images || [],
          project_url: data.project_url,
          repository_url: data.repository_url,
          category: data.category as ProjectCategory,
          project_type: data.project_type,
          project_status: data.project_status,
          completion_date: data.completion_date,
          hosting_platform: data.hosting_platform,
          target_audience: data.target_audience,
          key_features: data.key_features,
          design_style: data.design_style,
          color_palette: data.color_palette,
          is_responsive: data.is_responsive,
          accessibility_features: data.accessibility_features,
          main_challenge: data.main_challenge,
          innovation: data.innovation,
          project_result: data.project_result,
          performance_metrics: data.performance_metrics,
          success_metrics: data.success_metrics,
          user_feedback: data.user_feedback,
          technical_metrics: data.technical_metrics,
          featured: data.featured,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        
        get().addProject(newProject);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create project' });
    } finally {
      set({ loading: false });
    }
  },
  
  updateProjectById: async (id: string, projectData) => {
    set({ loading: true, error: null });
    try {
      const updateData: Record<string, unknown> = {};
      if (projectData.title !== undefined) updateData.title = projectData.title;
      if (projectData.short_description !== undefined) updateData.short_description = projectData.short_description;
      if (projectData.detailed_description !== undefined) updateData.detailed_description = projectData.detailed_description;
      if (projectData.technologies !== undefined) updateData.technologies = projectData.technologies;
      if (projectData.frontend_technologies !== undefined) updateData.frontend_technologies = projectData.frontend_technologies;
      if (projectData.backend_technologies !== undefined) updateData.backend_technologies = projectData.backend_technologies;
      if (projectData.tools_and_services !== undefined) updateData.tools_and_services = projectData.tools_and_services;
      if (projectData.images !== undefined) updateData.images = projectData.images;

      if (projectData.project_url !== undefined) updateData.project_url = projectData.project_url;
      if (projectData.repository_url !== undefined) updateData.repository_url = projectData.repository_url;
      if (projectData.category !== undefined) updateData.category = projectData.category;
      if (projectData.project_type !== undefined) updateData.project_type = projectData.project_type;
      if (projectData.project_status !== undefined) updateData.project_status = projectData.project_status;
      if (projectData.completion_date !== undefined) updateData.completion_date = projectData.completion_date;
      if (projectData.hosting_platform !== undefined) updateData.hosting_platform = projectData.hosting_platform;
      if (projectData.key_features !== undefined) updateData.key_features = projectData.key_features;
      if (projectData.design_style !== undefined) updateData.design_style = projectData.design_style;
      if (projectData.color_palette !== undefined) updateData.color_palette = projectData.color_palette;
      if (projectData.target_audience !== undefined) updateData.target_audience = projectData.target_audience;
      if (projectData.is_responsive !== undefined) updateData.is_responsive = projectData.is_responsive;
      if (projectData.accessibility_features !== undefined) updateData.accessibility_features = projectData.accessibility_features;
      if (projectData.main_challenge !== undefined) updateData.main_challenge = projectData.main_challenge;
      if (projectData.innovation !== undefined) updateData.innovation = projectData.innovation;
      if (projectData.project_result !== undefined) updateData.project_result = projectData.project_result;
      if (projectData.performance_metrics !== undefined) updateData.performance_metrics = projectData.performance_metrics;
      if (projectData.success_metrics !== undefined) updateData.success_metrics = projectData.success_metrics;
      if (projectData.user_feedback !== undefined) updateData.user_feedback = projectData.user_feedback;
      if (projectData.technical_metrics !== undefined) updateData.technical_metrics = projectData.technical_metrics;
      if (projectData.featured !== undefined) updateData.featured = projectData.featured;
      
      const { data, error } = await db.projects.update(id, updateData);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const updatedData = data[0];
        const updatedProject: Project = {
          id: updatedData.id,
          title: updatedData.title,
          short_description: updatedData.short_description,
          detailed_description: updatedData.detailed_description,
          technologies: updatedData.technologies || [],
          frontend_technologies: updatedData.frontend_technologies,
          backend_technologies: updatedData.backend_technologies,
          tools_and_services: updatedData.tools_and_services,
          images: updatedData.images || [],
          project_url: updatedData.project_url,
          repository_url: updatedData.repository_url,
          category: updatedData.category as ProjectCategory,
          project_type: updatedData.project_type,
          project_status: updatedData.project_status,
          completion_date: updatedData.completion_date,
          hosting_platform: updatedData.hosting_platform,
          target_audience: updatedData.target_audience,
          key_features: updatedData.key_features,
          design_style: updatedData.design_style,
          color_palette: updatedData.color_palette,
          is_responsive: updatedData.is_responsive,
          accessibility_features: updatedData.accessibility_features,
          main_challenge: updatedData.main_challenge,
          innovation: updatedData.innovation,
          project_result: updatedData.project_result,
          performance_metrics: updatedData.performance_metrics,
          success_metrics: updatedData.success_metrics,
          user_feedback: updatedData.user_feedback,
          technical_metrics: updatedData.technical_metrics,
          featured: updatedData.featured,
          created_at: updatedData.created_at,
          updated_at: updatedData.updated_at,
        };
        
        get().updateProject(id, updatedProject);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
      set({ error: errorMessage });
      throw error; // Re-throw to be caught by the form
    } finally {
      set({ loading: false });
    }
  },
  
  deleteProjectById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await db.projects.delete(id);
      if (error) throw error;
      
      get().deleteProject(id);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete project' });
    } finally {
      set({ loading: false });
    }
  },

  toggleFeatured: async (id: string) => {
    const { projects } = get();
    const project = projects.find(p => p.id === id);
    if (!project) return;

    try {
      const { error } = await db.projects.update(id, { featured: !project.featured });
      if (error) throw error;
      
      get().updateProject(id, { featured: !project.featured, updated_at: new Date().toISOString() });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle featured status' });
    }
  },
}));