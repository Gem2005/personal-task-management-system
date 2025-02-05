"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { TaskCard } from "@/components/TaskCard";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { fetchProjectTasks, deleteTask, updateTask } from "@/utils/api";
import type { Task} from "@/types";

export default function ProjectTasks() {
  const params = useParams<{ project_id: string }>();
  const project_id = params.project_id ? parseInt(params.project_id) : null;
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  // Dialog states
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch project and tasks for the given project
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks", project_id],
    queryFn: () => fetchProjectTasks(Number(project_id)),
    enabled: Boolean(project_id),
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", project_id] });
      },
    });

  // Update task mutation
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", project_id] });
      setIsEditTaskDialogOpen(false);
      setTaskToEdit(null);
    },
  });

  if (!isClient) {
    return null;
  }

  // Derived stats
  const totalTasks = tasks.length;
  const pendingTasksCount = tasks.filter((t: Task) => t.status === "pending").length;
  const completedTasksCount = tasks.filter((t: Task) => t.status === "completed").length;
  const completionRate = totalTasks ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  return (
    <div className="container mx-auto p-4">
      {/* Header Cards */}
      <div className="flex-1 space-y-4 p-4 md:p-8 bg-background dark:bg-gray-900 transition-colors">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card dark:bg-gray-800 border-border dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-gray-100">{totalTasks}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-gray-800 border-border dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-gray-100">{pendingTasksCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-gray-800 border-border dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-gray-100">{completedTasksCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-gray-800 border-border dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-gray-100">{completionRate}%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Button onClick={() => setIsCreateTaskDialogOpen(true)}>Add Task</Button>
        </div>
        <div className="space-y-4">
          {tasks.map((task: Task) => (
            <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(id: number, status: "pending" | "completed") => 
              updateMutation.mutate({ id, data: { status } })
            }
            onDelete={() => deleteMutation.mutate(task.id)}
          />
          ))}
        </div>
      <CreateTaskDialog
        open={isCreateTaskDialogOpen}
        onOpenChange={setIsCreateTaskDialogOpen}
        onClose={() => setIsCreateTaskDialogOpen(false)}
        onSuccess={async () => {
          await queryClient.invalidateQueries({ queryKey: ["tasks", project_id] });
        }}
      />

      {isEditTaskDialogOpen && taskToEdit && (
        <EditTaskDialog
          open={isEditTaskDialogOpen}
          onOpenChange={setIsEditTaskDialogOpen}
          editingTask={taskToEdit}
          onClose={() => {
            queryClient.invalidateQueries({ queryKey: ["tasks", project_id] });
            setIsEditTaskDialogOpen(false);
            setTaskToEdit(null);
          }}
        />
      )}
    </div>
    </div>
  );
}
