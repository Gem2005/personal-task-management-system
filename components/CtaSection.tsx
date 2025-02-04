import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              Join thousands of users who are already managing their tasks more efficiently.
            </p>
          </div>
          <Link href="/register">
            <Button className="h-11 px-8">
              Start Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

