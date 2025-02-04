"use client";

import * as React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Badge } from "@/components/ui/Badge";
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

  const renderDay = (day: Date) => {
    const dayNumber = day.getDate();
    const tasksForDay = tasksByDate[day.toDateString()] || [];

    return (
      <div className="relative">
        <div className="text-center">{dayNumber}</div>
        {tasksForDay.length > 0 && (
          <Badge
            variant="secondary"
            className="absolute bottom-0 right-0 h-4 w-4 p-0 text-xs flex items-center justify-center bg-blue-500 text-white rounded-full"
          >
            {tasksForDay.length}
          </Badge>
        )}
      </div>
    );
  };

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
    <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="p-2 bg-gray-200 rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        showOutsideDays
        modifiers={{
          hasTasks: (day) => !!tasksByDate[day.toDateString()],
        }}
        modifiersClassNames={{
          hasTasks:
            "font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20",
        }}
        renderDay={renderDay}
      />

      {selectedDay && tasksByDate[selectedDay.toDateString()] && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">
            Tasks for {selectedDay.toDateString()}
          </h3>
          <ul className="list-disc list-inside">
            {tasksByDate[selectedDay.toDateString()].map((task) => (
              <li key={task.id} className="text-gray-600">
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
