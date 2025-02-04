import type { Task, Project } from "@/types";

const API_URL ="/api";

// Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

// Fetch all projects
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

// Fetch tasks for a specific project by projectId
export async function fetchProjectTasks(project_id: number): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks?projectId=${project_id}`);
  if (!res.ok) throw new Error("Failed to fetch tasks for the project");
  return res.json(); // Returns an array of tasks
}


// Create a new task
export async function createTask(data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

// Update an existing task by ID
export async function updateTask({ id, data }: { id: number; data: Partial<Task> }): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

// Delete a task by ID
export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

// Create a new project
export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject({
  id,
  data,
}: {
  id: number;
  data: Partial<Project>;
}): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

export async function updateProfile(data: {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<{ message?: string; error?: string }> {
  const res = await fetch(`${API_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    return { error: error.message };
  }

  return res.json();
}
