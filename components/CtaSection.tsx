import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div 
            className="space-y-4 max-w-3xl mx-auto"
            style={{
              background: "radial-gradient(circle at center, transparent, white 70%)",
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-lg md:text-xl text-muted-foreground">
              Join thousands of users who are already managing their tasks more efficiently.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/register">
              <Button 
                className="h-12 px-8 text-lg font-medium transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500/90 hover:scale-105"
              >
                Start Now
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </Button>
            </Link>
            <Link href="/features">
              <Button 
                variant="outline"
                className="h-12 px-8 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Decorative dots */}
          <div className="absolute left-4 top-4 h-72 w-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute right-4 bottom-4 h-72 w-72 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
