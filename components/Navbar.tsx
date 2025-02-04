import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            TaskManager
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium transition-colors hover:text-primary" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-primary" href="/login">
            Sign In
          </Link>
          <Link href="/register">
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

