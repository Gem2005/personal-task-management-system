import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">✨ Simplify your workflow</div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none xl:text-8xl/none">
              Manage Your Tasks{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                with Ease
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Stay organized, focused, and in control of your tasks. The perfect solution for personal task management.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/register">
              <Button size="lg" className="h-11 px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="h-11 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

