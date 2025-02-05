"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Pencil, Trash } from "lucide-react";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: number, status: "pending" | "completed") => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  low: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  high: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleStatusToggle = () => {
    onStatusChange(task.id, task.status === "completed" ? "pending" : "completed");
  };

  return (
    <>
      <Card className="bg-card dark:bg-gray-800 border-border dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-foreground dark:text-gray-100">{task.title}</h3>
            <Badge className={`${priorityColors[task.priority]} priority-${task.priority} w-fit`}>
              {task.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Due: {new Date(task.dueDate).toLocaleString()}
            </span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStatusToggle}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Check className={`h-4 w-4 ${
                  task.status === "completed" 
                    ? "text-green-500 dark:text-green-400" 
                    : "text-gray-500 dark:text-gray-400"
                }`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditDialogOpen(true)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingTask={task}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}
