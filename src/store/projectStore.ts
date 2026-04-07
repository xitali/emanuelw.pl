import { create } from 'zustand';
import { Project, ProjectCategory } from '../types';
import { db } from '../lib/turso';
import type { ProjectRow } from '../lib/turso';

// ── Shared mapper ──────────────────────────────────────────────
const mapRowToProject = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  short_description: row.short_description,
  detailed_description: row.detailed_description,
  technologies: row.technologies || [],
  frontend_technologies: row.frontend_technologies,
  backend_technologies: row.backend_technologies,
  tools_and_services: row.tools_and_services,
  images: row.images || [],
  project_url: row.project_url,
  repository_url: row.repository_url,
  category: row.category as ProjectCategory,
  project_type: row.project_type,
  project_status: row.project_status as Project['project_status'],
  completion_date: row.completion_date,
  hosting_platform: row.hosting_platform,
  target_audience: row.target_audience,
  key_features: row.key_features,
  design_style: row.design_style,
  color_palette: row.color_palette,
  is_responsive: row.is_responsive,
  accessibility_features: row.accessibility_features,
  main_challenge: row.main_challenge,
  innovation: row.innovation,
  project_result: row.project_result,
  performance_metrics: row.performance_metrics,
  success_metrics: row.success_metrics,
  user_feedback: row.user_feedback,
  technical_metrics: row.technical_metrics,
  featured: row.featured,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

interface ProjectStore {
  projects: Project[];
  featuredProjects: Project[];
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
  featuredProjects: [],
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
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
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

  // ── Async ────────────────────────────────────────────────────

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.projects.getAll();
      if (error) throw error;
      get().setProjects((data ?? []).map(mapRowToProject));
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
      set({ featuredProjects: (data ?? []).map(mapRowToProject) });
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
        get().addProject(mapRowToProject(data));
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
      const { data, error } = await db.projects.update(id, projectData);
      if (error) throw error;
      if (data && data.length > 0) {
        get().updateProject(id, mapRowToProject(data[0]));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
      set({ error: errorMessage });
      throw error;
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
    const project = get().projects.find(p => p.id === id);
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
