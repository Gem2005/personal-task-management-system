"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTask } from "@/utils/api";
import type { Task } from "@/types";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTaskDialog({ open, onOpenChange, onClose }: CreateTaskDialogProps) {
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateInputValue, setDateInputValue] = useState("");
  const [month, setMonth] = useState(new Date());
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueHour: "12",
    dueMinute: "00",
    dueAmPm: "PM",
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
    if (!date) {
      setDateInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setDateInputValue(format(date, "MM/dd/yyyy"));
    }
    setIsDatePickerOpen(false);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    // Parse time
    let hours = parseInt(formData.dueHour);
    if (formData.dueAmPm === "PM" && hours !== 12) hours += 12;
    if (formData.dueAmPm === "AM" && hours === 12) hours = 0;

    // Set time on selected date
    const dueDate = new Date(selectedDate);
    dueDate.setHours(hours);
    dueDate.setMinutes(parseInt(formData.dueMinute));

    // Create task
    const formattedData: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority as "medium" | "low" | "high",
      dueDate: dueDate.toISOString(),
    };

    createMutation.mutate(formattedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
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
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>Hour</Label>
              <Select 
                value={formData.dueHour}
                onValueChange={(value) => setFormData({...formData, dueHour: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                    <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Minute</Label>
              <Select
                value={formData.dueMinute}
                onValueChange={(value) => setFormData({...formData, dueMinute: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 60}, (_, i) => i).map(minute => (
                    <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>AM/PM</Label>
              <Select
                value={formData.dueAmPm}
                onValueChange={(value) => setFormData({...formData, dueAmPm: value})}
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
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
