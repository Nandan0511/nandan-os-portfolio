'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { skillCategories } from '@/data/skills';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Variants } from "framer-motion";
import { Badge } from '@/components/ui/badge';
import { SkillRadar } from '@/components/charts/SkillRadar';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';

export function SkillsApp() {
  const { isReducedMotion } = useOS();

  // Create tag cloud items
  const allTags = React.useMemo(() => {
    const tags: Array<{ name: string; color: string; level: number }> = [];
    skillCategories.forEach((cat) => {
      cat.skills.forEach((s) => {
        tags.push({ name: s.name, color: cat.color, level: s.level });
      });
    });
    // Shuffle tags
    return tags.sort(() => Math.random() - 0.5);
  }, []);

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
    <ScrollArea className="h-full w-full text-white">
      <motion.div
        className="p-6 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white">Skills & Technical Expertise</h2>
          <p className="text-slate-400 text-xs">
            A breakdown of my technical capability, proficiency levels, and tools in AI and data analysis.
          </p>
        </motion.div>

        {/* 1. Skill Radar Chart */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false} className="p-5 flex flex-col items-center">
            <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider self-start">Proficiency Radar</h3>
            <p className="text-slate-500 text-xs mb-6 self-start">Average competence mapped across core categories.</p>
            <div className="w-full max-w-md">
              <SkillRadar />
            </div>
          </GlassCard>
        </motion.div>

        {/* 2. Skill Categories Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const CatIcon = (Lucide as any)[category.icon] || Lucide.Code2;
            return (
              <GlassCard
                key={category.id}
                hover={false}
                className="p-5 space-y-4 border-white/[0.08]"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5" style={{ color: category.color }}>
                    <CatIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{category.title}</h3>
                    <span className="text-[10px] text-slate-500">
                      Average: {Math.round(category.skills.reduce((sum, s) => sum + s.level, 0) / category.skills.length)}%
                    </span>
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="space-y-3 pt-2">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-slate-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* 3. Floating Technology Cloud */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false} className="p-5">
            <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Technology Cloud</h3>
            <p className="text-slate-500 text-xs mb-6">Familiar tools and frameworks scaled by confidence index.</p>
            <div className="flex flex-wrap gap-2 justify-center py-4">
              {allTags.map((tag, i) => {
                // Determine badge sizing based on proficiency level
                const sizeClass = cn(
                  tag.level >= 85 && 'text-sm px-3.5 py-1.5 font-bold',
                  tag.level >= 75 && tag.level < 85 && 'text-xs px-2.5 py-1 font-semibold',
                  tag.level < 75 && 'text-[10px] px-2 py-0.5 font-normal'
                );

                // Inline hover translation float simulation
                const floatAnimation = !isReducedMotion ? {
                     animate: {
                     y: [0, -3, 0],
                   },
                  }
             : {};

                return (
                  <motion.div
                    key={i}
                    {...floatAnimation}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="cursor-default"
                  >
                    <Badge
                      variant="secondary"
                      className={cn(
                        'bg-white/5 border border-white/10 text-white rounded-full transition-colors hover:bg-white/10',
                        sizeClass
                      )}
                      style={{ borderLeftColor: tag.color, borderLeftWidth: '3px' }}
                    >
                      {tag.name}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
}
export default SkillsApp;
