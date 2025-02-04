import { SiteHeader } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CTASection } from "@/components/CtaSection"
import { SiteFooter } from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}

