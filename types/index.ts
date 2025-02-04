export interface User {
    id: number
    email: string
    name: string
  }
  
  export interface Task {
    id: number
    title: string
    description?: string
    status: "pending" | "completed"
    priority: "low" | "medium" | "high"
    dueDate: string
    projectId?: number
    userId: number
    createdAt: string
    updatedAt: string
  }
  
  export interface Project {
    id: number
    name: string
    description?: string
    userId: number
    createdAt: string
    updatedAt: string
    tasks?: Task[]
  }
  
  export interface Category {
    id: number
    name: string
    userId: number
    createdAt: string
  }
  
  