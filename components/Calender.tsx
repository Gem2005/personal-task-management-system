"use client";

import * as React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";
import type { Task } from "@/types";

interface CalendarProps {
  tasks: Task[];
}

export function Calendar({ tasks }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(new Date(month));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(newYear);
    setCurrentMonth(newMonth);
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
      <select
        value={currentMonth.getFullYear()}
        onChange={handleYearChange}
        className="p-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {years.map((year) => (
        <option key={year} value={year}>{year}</option>
        ))}
      </select>
      </div>

      <div className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        showOutsideDays
        className="dark:bg-gray-800"
        modifiers={{
        hasFewTasks: (date) => {
          const tasks = tasksByDate[date.toDateString()] || [];
          return tasks.length > 0 && tasks.length <= 3;
        },
        hasSomeTasks: (date) => {
          const tasks = tasksByDate[date.toDateString()] || [];
          return tasks.length > 3 && tasks.length <= 7;
        },
        hasManyTasks: (date) => {
          const tasks = tasksByDate[date.toDateString()] || [];
          return tasks.length > 7;
        }
        }}
        modifiersStyles={{
        hasFewTasks: { color: '#3b82f6', fontWeight: 'bold' },   // Blue
        hasSomeTasks: { color: '#eab308', fontWeight: 'bold' },  // Yellow
        hasManyTasks: { color: '#ef4444', fontWeight: 'bold' }   // Red
        }}
        classNames={{
        day: cn("dark:hover:bg-gray-700", "dark:focus:bg-gray-700"),
        caption: "dark:text-gray-200",
        head_cell: "dark:text-gray-400"
        }}
      />
      </div>

      {selectedDay && tasksByDate[selectedDay.toDateString()] && (
      <div className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
      Tasks for {selectedDay.toDateString()}
      </h3>
      <ul className="mt-2 space-y-2">
      {tasksByDate[selectedDay.toDateString()]
        .sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
        })
        .map((task) => (
        <li 
        key={task.id} 
        className="p-3 rounded-md border dark:border-gray-700"
        >
        <div className="flex justify-between items-start">
        <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {task.title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {task.description}
        </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
        task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
        {task.priority}
        </span>
        </div>
        </li>
      ))}
      </ul>
      </div>
      )}
    </div>
  );
}
