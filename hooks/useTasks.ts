import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useTaskStore } from "@/store/useTaskStore";
import { fetchTasks, createTask, updateTask } from "@/utils/api";
import type { Task } from "@/types";

export function useTasks() {
  const queryClient = useQueryClient();
  const { setTasks, setIsLoading, setError } = useTaskStore();

  // Fetch tasks
  const { data: tasks = [] } = useQuery<Task[], Error, Task[], readonly unknown[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    onSuccess: (data: Task[]) => {
      setTasks(data);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  } as UseQueryOptions<Task[], Error>); // Cast to UseQueryOptions

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) => [...oldTasks, newTask]);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) =>
        oldTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const deleteTask = async (taskId: number): Promise<number> => {
    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    return taskId; // Ensure the function returns the task ID
  };

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedTaskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) =>
        oldTasks.filter((task) => task.id !== deletedTaskId)
      );
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return {
    tasks,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}
