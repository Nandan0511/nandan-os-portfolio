'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useOS } from '@/contexts/OSContext';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/certifications';
import { profile } from '@/data/profile';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { StatusIndicator } from '@/components/shared/StatusIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { TechDistribution } from '@/components/charts/TechDistribution';
import { ProjectCategories } from '@/components/charts/ProjectCategories';
import { cn } from '@/lib/utils';
import { Variants } from "framer-motion";
import * as Lucide from 'lucide-react';

export function DashboardApp() {
  const { openWindow } = useWindowManager();
  const { isReducedMotion } = useOS();

  // Compute stat counts
  const totalProjects = projects.length;
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  
  // Unique technology items
  const uniqueTech = new Set<string>();
  projects.forEach((p) => p.techStack.forEach((t) => uniqueTech.add(t)));
  skillCategories.forEach((c) => c.skills.forEach((s) => uniqueTech.add(s.name)));
  const totalTech = uniqueTech.size;

  const totalCerts = certifications.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.08
      }
    }
  };

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

  return (
    <ScrollArea className="h-full w-full">
      <motion.div
        className="p-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Hero Section */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false} className="flex flex-col md:flex-row justify-between gap-6 p-6">
            <div className="space-y-3 max-w-xl">
              <StatusIndicator status="online" label="Recruiter Friendly / Available for Work" />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Hello, I'm {profile.name}
              </h1>
              <p className="text-xl text-blue-200 font-semibold">{profile.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{profile.tagline}</p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => openWindow('projects')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg hover:shadow-blue-500/20"
                >
                  <Lucide.FolderOpen className="mr-2 h-4 w-4" /> View Projects
                </Button>
                <Button
                  onClick={() => openWindow('resume')}
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 text-white font-medium"
                >
                  <Lucide.FileText className="mr-2 h-4 w-4" /> Resume Reader
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-slate-400 justify-end md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-slate-500 block text-xs uppercase font-bold tracking-wider">Location</span>
                <span className="text-white font-medium">{profile.location}</span>
              </div>
              <div className="mt-2">
                <span className="text-slate-500 block text-xs uppercase font-bold tracking-wider">Email</span>
                <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">{profile.email}</a>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* 2. Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Projects', val: totalProjects, icon: 'FolderOpen', color: 'text-blue-400', appId: 'projects' },
            { label: 'Skills Mastered', val: totalSkills, icon: 'Code2', color: 'text-green-400', appId: 'skills' },
            { label: 'Technologies', val: totalTech, icon: 'Cpu', color: 'text-purple-400', appId: 'skills' },
            { label: 'Certifications', val: totalCerts, icon: 'Award', color: 'text-amber-400', appId: 'certifications' }
          ].map((stat, i) => {
            const Icon = (Lucide as any)[stat.icon] || Lucide.HelpCircle;
            return (
              <GlassCard
                key={i}
                as="button"
                onClick={() => openWindow(stat.appId)}
                className="flex items-center gap-4 p-4 hover:shadow-lg transition-all"
              >
                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-slate-500 text-xs font-semibold block uppercase">{stat.label}</span>
                  <span className="text-2xl font-bold">
                    <AnimatedCounter value={stat.val} />
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* 3. Charts Area */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard hover={false} className="p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Technology Distribution</h3>
              <p className="text-slate-500 text-xs mb-4">Focus distribution across core data science domains.</p>
            </div>
            <TechDistribution />
          </GlassCard>

          <GlassCard hover={false} className="p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Project Categories</h3>
              <p className="text-slate-500 text-xs mb-4">Classification of projects in Nandan\'s portfolio.</p>
            </div>
            <ProjectCategories />
          </GlassCard>
        </motion.div>

        {/* 4. Quick Launch Grid */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-lg font-bold text-white">Quick Launch Apps</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { id: 'projects', title: 'Projects Explorer', icon: 'FolderOpen', color: 'hover:shadow-blue-500/10' },
              { id: 'skills', title: 'Skills Center', icon: 'Code2', color: 'hover:shadow-green-500/10' },
              { id: 'analytics', title: 'Analytics Center', icon: 'BarChart3', color: 'hover:shadow-purple-500/10' },
              { id: 'resume', title: 'Resume Reader', icon: 'FileText', color: 'hover:shadow-red-500/10' },
              { id: 'certifications', title: 'Certifications', icon: 'Award', color: 'hover:shadow-amber-500/10' },
              { id: 'contact', title: 'Contact Hub', icon: 'Mail', color: 'hover:shadow-cyan-500/10' }
            ].map((app) => {
              const Icon = (Lucide as any)[app.icon] || Lucide.HelpCircle;
              return (
                <GlassCard
                  key={app.id}
                  as="button"
                  onClick={() => openWindow(app.id)}
                  className={`flex flex-col items-center justify-center p-4 gap-2 text-center h-28 ${app.color}`}
                >
                  <Icon className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-semibold text-slate-300">{app.title}</span>
                </GlassCard>
              );
            })}
          </div>
        </motion.div>

        {/* 5. Recent Activity Feed */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false} className="p-5">
            <h3 className="text-lg font-bold text-white mb-4">Recent System Logs / Activity</h3>
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-5">
              {[
                { title: 'Completed PDF Chatbot RAG Pipeline', desc: 'Integrated vector stores and LLM parsing.', date: 'Nov 2024', icon: 'Bot' },
                { title: 'Obtained Google Data Analytics Credentials', desc: 'Completed 8-course statistical analysis specialization.', date: 'Aug 2024', icon: 'Award' },
                { title: 'Created Smart Garbage Segregator CNN', desc: 'Trained model on 2,500+ object frames.', date: 'May 2024', icon: 'FolderOpen' },
                { title: 'Deployed NandanOS Interface', desc: 'Engineered web OS interface using Next.js 15.', date: 'Present', icon: 'Monitor' }
              ].map((act, idx) => {
                const Icon = (Lucide as any)[act.icon] || Lucide.HelpCircle;
                return (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[32px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#080B12] border border-blue-500/50 text-blue-400">
                      <Icon className="h-2 w-2" />
                    </span>
                    <div>
                      <div className="flex justify-between gap-4">
                        <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{act.title}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider whitespace-nowrap">{act.date}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{act.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
}
export default DashboardApp;
