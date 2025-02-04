"use client";

import { useQuery } from "@tanstack/react-query"
import { Calendar } from "@/components/Calender"
import { Card } from "@/components/ui/card"
import { fetchTasks } from "@/utils/api"

export default function CalendarPage() {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      </div>
      <Card className="p-4">
        <Calendar tasks={tasks} />
      </Card>
    </div>
  );
}

