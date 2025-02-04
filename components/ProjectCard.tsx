import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import type { Project } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          <Link href={`/projects/${project.id}`} className="hover:underline">
            {project.name}
          </Link>
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{project.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Created: {formatDate(project.createdAt)}</span>
          <span className="text-sm text-gray-500">{project.tasks?.length || 0} tasks</span>
        </div>
      </CardContent>
    </Card>
  )
}

