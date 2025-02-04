"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTask } from "@/utils/api";
import type { Task } from "@/types";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTask: Task | null;
  onClose: () => void;
}

export function EditTaskDialog({ open, onOpenChange, editingTask, onClose }: EditTaskDialogProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "medium" | "low" | "high";
    dueDay: string;
    dueMonth: string;
    dueYear: string;
    dueHour: string;
    dueMinute: string;
    dueAmPm: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    dueDay: "",
    dueMonth: "",
    dueYear: "",
    dueHour: "",
    dueMinute: "",
    dueAmPm: "",
  });

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    if (editingTask) {
      const dueDate = new Date(editingTask.dueDate);
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "medium",
        dueDay: String(dueDate.getDate()),
        dueMonth: String(dueDate.getMonth() + 1),
        dueYear: String(dueDate.getFullYear()),
        dueHour: String(dueDate.getHours() % 12 || 12),
        dueMinute: String(dueDate.getMinutes()).padStart(2, "0"),
        dueAmPm: dueDate.getHours() >= 12 ? "PM" : "AM",
      });
    }
  }, [editingTask]);

  useEffect(() => {
    const year = parseInt(formData.dueYear, 10);
    const month = parseInt(formData.dueMonth, 10);
    if (!isNaN(year) && !isNaN(month)) {
      const days = new Date(year, month, 0).getDate();
      setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    }
  }, [formData.dueYear, formData.dueMonth]);

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dueDay || !formData.dueMonth || !formData.dueYear || !formData.dueHour || !formData.dueMinute || !formData.dueAmPm) {
      alert("Please fill in all date and time fields.");
      return;
    }

    const dueDateStr = `${formData.dueYear}-${formData.dueMonth.padStart(2, "0")}-${formData.dueDay.padStart(2, "0")} ${formData.dueHour.padStart(2, "0")}:${formData.dueMinute.padStart(2, "0")} ${formData.dueAmPm === "PM" ? " PM" : " AM"}`;

    const dueDate = new Date(dueDateStr);
    if (isNaN(dueDate.getTime())) {
      alert("Invalid date or time value.");
      return;
    }

    const formattedData: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority as "medium" | "low" | "high",
      dueDate: dueDate.toISOString(),
    };

    updateMutation.mutate({
      id: editingTask!.id,
      data: formattedData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <div className="flex space-x-2">
              <Select
                value={formData.dueDay}
                onValueChange={(value) => setFormData({ ...formData, dueDay: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {daysInMonth.map((day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.dueMonth}
                onValueChange={(value) => setFormData({ ...formData, dueMonth: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={String(month)}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="due-year"
                placeholder="Year"
                value={formData.dueYear}
                onChange={(e) => setFormData({ ...formData, dueYear: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-time">Due Time</Label>
            <div className="flex space-x-2">
              <Select
                value={formData.dueHour}
                onValueChange={(value) => setFormData({ ...formData, dueHour: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <SelectItem key={hour} value={String(hour)}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.dueMinute}
                onValueChange={(value) => setFormData({ ...formData, dueMinute: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.dueAmPm}
                onValueChange={(value) => setFormData({ ...formData, dueAmPm: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}