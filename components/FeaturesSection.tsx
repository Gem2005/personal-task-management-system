"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, Users, Bell, Clock, Shield } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

interface Feature {
  icon: typeof LayoutDashboard;
  title: string;
  description: string;
}

export function FeaturesSection() {
  const features: Feature[] = [
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
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated with timely reminders and notifications.",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor time spent on tasks and improve productivity.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected at all times.",
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-purple-500/10 animate-gradient" />
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-primary/10">
            ✨ Features
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight bg-gradient-to-br from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your tasks effectively
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
