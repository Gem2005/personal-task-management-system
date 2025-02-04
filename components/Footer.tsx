import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container flex h-16 items-center">
        <div className="flex flex-col items-center justify-between gap-4 w-full md:h-24 md:flex-row md:py-0">
          <p className="text-sm text-muted-foreground">© 2024 TaskManager. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

