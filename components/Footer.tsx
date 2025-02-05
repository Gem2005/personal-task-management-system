import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-slate-50 dark:bg-slate-900/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  className="fill-primary/20 stroke-primary"
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                TaskManager
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Simplify your workflow, amplify your productivity
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Features</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Pricing</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">About</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Contact</Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Privacy Policy</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Terms of Service</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Cookie Policy</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="max-w-[200px]"
              />
              <Button variant="default" size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskManager. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
