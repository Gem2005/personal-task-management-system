import { LayoutDashboard, Calendar, Users } from "lucide-react"
import { FeatureCard } from "./FeatureCard"

export function FeaturesSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description: "Get a clear overview of your tasks and projects at a glance.",
    },
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Schedule and track your tasks with an integrated calendar view.",
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Organize tasks into projects and track progress effectively.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Everything you need to manage your tasks effectively
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

