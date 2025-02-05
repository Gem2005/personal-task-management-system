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
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <Badge className={`${priorityColors[task.priority]} priority-${task.priority} w-fit`}>
              {task.priority}
              </Badge>
            </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{task.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleString()}</span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange(task.id, task.status === "completed" ? "pending" : "completed")}
              >
                <Check className={`h-4 w-4 ${task.status === "completed" ? "text-green-500" : "text-gray-500"}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
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
