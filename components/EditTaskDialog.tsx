"use client";

import { useEffect, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
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
  editingTask: Task;
  onClose: () => void;
}

export function EditTaskDialog({ open, onOpenChange, editingTask, onClose }: EditTaskDialogProps) {
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(editingTask.dueDate));
  const [dateInputValue, setDateInputValue] = useState(format(new Date(editingTask.dueDate), "MM/dd/yyyy"));
  const [month, setMonth] = useState(new Date(editingTask.dueDate));

  const [formData, setFormData] = useState({
    title: editingTask.title,
    description: editingTask.description,
    priority: editingTask.priority,
    dueHour: format(new Date(editingTask.dueDate), "hh"),
    dueMinute: format(new Date(editingTask.dueDate), "mm"),
    dueAmPm: format(new Date(editingTask.dueDate), "a"),
  });

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isDatePickerOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isDatePickerOpen]);

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setDateInputValue(format(date, "MM/dd/yyyy"));
    setIsDatePickerOpen(false);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    }
  };

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

    if (!formData.dueHour || !formData.dueMinute || !formData.dueAmPm) {
      alert("Please fill in all date and time fields.");
      return;
    }

    const dueDateStr = `${dateInputValue} ${formData.dueHour.padStart(2, "0")}:${formData.dueMinute.padStart(2, "0")} ${formData.dueAmPm}`;

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
            <Label htmlFor="date-input">Due Date</Label>
            <div className="flex items-center gap-2">
              <Input
                id="date-input"
                type="text"
                value={dateInputValue}
                placeholder="MM/dd/yyyy"
                onChange={handleDateInputChange}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsDatePickerOpen(true)}
                aria-label="Open calendar"
              >
                📅
              </Button>
            </div>
          </div>

          <dialog
            ref={dialogRef}
            className="p-0 rounded-lg shadow-xl backdrop:bg-black/50"
            onClose={() => setIsDatePickerOpen(false)}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDaySelect}
              month={month}
              onMonthChange={setMonth}
              className="p-4"
            />
          </dialog>
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