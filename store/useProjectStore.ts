import { create } from "zustand"
import type { Project } from "@/types"

interface ProjectState {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: number, project: Partial<Project>) => void
  deleteProject: (id: number) => void
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      selectedProject: state.selectedProject?.id === id ? null : state.selectedProject,
    })),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}))

