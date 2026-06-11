'use client';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { useOS } from '@/contexts/OSContext';
import { analyticsDashboards } from '@/data/analytics';
import { AnalyticsDashboard } from '@/types';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function AnalyticsApp() {
  const { isMobile } = useOS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dashboard details modal trigger state
  const [activeDashboard, setActiveDashboard] = useState<AnalyticsDashboard | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<AnalyticsDashboard | null>(null);
  const [liveDashboard, setLiveDashboard] = useState<AnalyticsDashboard | null>(null);

  const categories = ['all', 'Sales', 'Marketing', 'Operation' ,'HR', 'Health', 'Finance'];

  const filteredDashboards = useMemo(() => {
    if (selectedCategory === 'all') return analyticsDashboards;
    return analyticsDashboards.filter((d) => d.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  return (
    <div className="h-full w-full flex flex-col text-white bg-black/10 overflow-hidden">
      {/* Category header filters */}
      <div className="border-b border-white/10 p-4 bg-black/20 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Lucide.BarChart3 className="h-5 w-5 text-blue-400" /> Analytics Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tableau dashboards, data warehouse modeling reports, and business intelligence.
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3.5 py-1 text-xs rounded-full border transition-all uppercase tracking-wider font-semibold text-[10px]',
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid gallery content */}
      <ScrollArea className="flex-1 h-0">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDashboards.map((dash) => (
              <GlassCard
                key={dash.id}
                hover={false}
                className="flex flex-col h-[380px] p-0 overflow-hidden border-white/[0.08]"
              >
                {/* Simulated Tableau Dashboard Image (Interactive Gradient mockup) */}
                <div className="relative h-52 w-full overflow-hidden border-b border-white/5">
  <Image
  src={dash.image}
  alt={dash.title}
  fill
  className="object-cover transition-transform duration-500 hover:scale-105"
/>

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute top-3 left-3">
    <Badge className="bg-black/40 border border-white/10 text-white text-[9px] uppercase font-bold tracking-wider">
      {dash.category}
    </Badge>
  </div>
</div>

                {/* Dashboard Details info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-1">{dash.title}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">{dash.description}</p>
                  </div>

                 <div className="flex gap-2 pt-2">
  <Button
    onClick={() => setActiveDashboard(dash)}
    size="sm"
    className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs"
  >
    <Lucide.Eye className="mr-1.5 h-3.5 w-3.5" />
    Insights
  </Button>

  <Button
    onClick={() => setSelectedDashboard(dash)}
    size="sm"
    className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs"
  >
    <Lucide.Image className="mr-1.5 h-3.5 w-3.5" />
    Preview
  </Button>

  <a
    href={dash.externalUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1"
  >
    <Button
      size="sm"
      className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs"
    >
      <Lucide.ExternalLink className="mr-1.5 h-3.5 w-3.5" />
      Live
    </Button>
  </a>
</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ScrollArea>

      {selectedDashboard && (
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-[#0c1020] border border-white/10 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-auto">

      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-bold text-white">
          {selectedDashboard.title}
        </h3>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedDashboard(null)}
        >
          <Lucide.X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <Image
          src={selectedDashboard.image}
          alt={selectedDashboard.title}
          width={1400}
          height={900}
          className="max-h-[75vh] max-w-full object-contain rounded-lg mx-auto"
        />
      </div>
    </div>
  </div>
)}
{liveDashboard && (
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-[#0c1020] border border-white/10 rounded-xl w-full max-w-7xl h-[90vh] flex flex-col">

      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-bold text-white">
          {liveDashboard.title}
        </h3>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLiveDashboard(null)}
        >
          <Lucide.X className="h-4 w-4" />
        </Button>
      </div>

      <iframe
        src={liveDashboard.externalUrl}
        className="flex-1 w-full"
      />
    </div>
  </div>
)}
      {/* Insights Drawer / Modal overlay */}
      {activeDashboard && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-[#0c1020]/95 border border-white/15 rounded-xl overflow-hidden shadow-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <Badge className="bg-blue-500/10 text-blue-400 border-none uppercase tracking-wider text-[9px] mb-1">
                  {activeDashboard.category} Insights
                </Badge>
                <h3 className="text-base font-extrabold text-white">{activeDashboard.title}</h3>
              </div>
              <Button
                onClick={() => setActiveDashboard(null)}
                size="icon"
                variant="ghost"
                className="text-slate-400 hover:text-white rounded-full h-8 w-8"
              >
                <Lucide.X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">{activeDashboard.description}</p>

            <div className="space-y-2.5">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500">Key Analytical Findings</span>
              <ul className="space-y-2">
                {activeDashboard.insights.map((ins, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                    <Lucide.ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setActiveDashboard(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs"
              >
                Close Insights
              </Button>
              <a href={activeDashboard.externalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex">
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs">
                  <Lucide.ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Launch Tableau
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
export default AnalyticsApp;
