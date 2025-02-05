import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme?: 'default' | 'blue' | 'purple' | 'pink' | 'green' | 'orange';
}

interface ColorScheme {
  gradient: string;
  icon: string;
  iconBg: string;
  text: string;
  glow: string;
  border: string;
}

const colorSchemes: Record<string, ColorScheme> = {
  default: {
    gradient: "from-primary/5 via-purple-500/5 to-pink-500/5",
    icon: "text-primary",
    iconBg: "bg-primary/10",
    text: "from-primary via-purple-500 to-pink-500",
    glow: "via-primary/50",
    border: "border-primary/10"
  },
  blue: {
    gradient: "from-blue-500/5 via-cyan-500/5 to-primary/5",
    icon: "text-blue-500",
    iconBg: "bg-blue-500/10",
    text: "from-blue-500 via-cyan-500 to-primary",
    glow: "via-blue-500/50",
    border: "border-blue-500/10"
  },
  purple: {
    gradient: "from-purple-500/5 via-indigo-500/5 to-violet-500/5",
    icon: "text-purple-500",
    iconBg: "bg-purple-500/10",
    text: "from-purple-500 via-indigo-500 to-violet-500",
    glow: "via-purple-500/50",
    border: "border-purple-500/10"
  },
  pink: {
    gradient: "from-pink-500/5 via-rose-500/5 to-red-500/5",
    icon: "text-pink-500",
    iconBg: "bg-pink-500/10",
    text: "from-pink-500 via-rose-500 to-red-500",
    glow: "via-pink-500/50",
    border: "border-pink-500/10"
  },
  green: {
    gradient: "from-green-500/5 via-emerald-500/5 to-teal-500/5",
    icon: "text-green-500",
    iconBg: "bg-green-500/10",
    text: "from-green-500 via-emerald-500 to-teal-500",
    glow: "via-green-500/50",
    border: "border-green-500/10"
  },
  orange: {
    gradient: "from-orange-500/5 via-amber-500/5 to-yellow-500/5",
    icon: "text-orange-500",
    iconBg: "bg-orange-500/10",
    text: "from-orange-500 via-amber-500 to-yellow-500",
    glow: "via-orange-500/50",
    border: "border-orange-500/10"
  }
};

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  colorScheme = 'default' 
}: FeatureCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-lg border ${colors.border} bg-gradient-to-br from-background to-muted/50 p-8 transition-all hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />

      <div className="relative flex flex-col items-center space-y-4 text-center">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`rounded-xl ${colors.iconBg} p-4 transition-colors`}
        >
          <Icon className={`h-10 w-10 ${colors.icon} stroke-[1.5]`} />
        </motion.div>

        <h3 className={`text-2xl font-bold bg-gradient-to-br ${colors.text} bg-clip-text text-transparent`}>
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed max-w-[280px]">
          {description}
        </p>

        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${colors.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
      </div>
    </motion.div>
  );
}
