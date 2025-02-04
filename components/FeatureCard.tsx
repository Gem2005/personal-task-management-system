import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full border bg-muted p-3 transition-colors group-hover:border-primary">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

