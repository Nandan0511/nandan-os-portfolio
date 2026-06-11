'use client';

import React, { useState, useMemo } from 'react';
import { useOS } from '@/contexts/OSContext';
import { projects } from '@/data/projects';
import { Project } from '@/types';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import * as Lucide from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function ProjectsApp() {
  const { isMobile } = useOS();
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Active selected project for the details page
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // Filter and sort computation
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // 1. Folder filtration
    if (selectedFolder !== 'all') {
      result = result.filter((p) => p.category === selectedFolder);
    }

    // 2. Text query search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      // Date sort (descending: newer first)
      return b.date.localeCompare(a.date);
    });

    return result;
  }, [selectedFolder, searchQuery, sortBy]);

  const folders = [
    { id: 'all', label: 'All Projects', count: projects.length, icon: 'FolderArchive' },
    { id: 'generative-ai', label: 'Generative AI', count: projects.filter((p) => p.category === 'generative-ai').length, icon: 'Bot' },
    { id: 'machine-learning', label: 'Machine Learning', count: projects.filter((p) => p.category === 'machine-learning').length, icon: 'Brain' },
    { id: 'computer-vision', label: 'Computer Vision', count: projects.filter((p) => p.category === 'computer-vision').length, icon: 'Eye' },
    { id: 'future', label: 'Future Projects', count: projects.filter((p) => p.category === 'future').length, icon: 'Sparkles' }
  ];

  if (activeProject) {
    return (
      <ProjectDetailsView
        project={activeProject}
        onBack={() => setActiveProject(null)}
      />
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden text-white">
      {/* 1. Sidebar (Folder Tree) - Hidden on smaller mobile viewports for space */}
      {!isMobile && (
        <div className="w-56 border-r border-white/10 bg-black/20 p-4 space-y-4 flex-shrink-0">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500">Folders</div>
          <div className="space-y-1">
            {folders.map((folder) => {
              const FolderIcon = (Lucide as any)[folder.icon] || Lucide.Folder;
              const isActive = selectedFolder === folder.id;
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={cn(
                    'w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg text-left transition-colors',
                    isActive ? 'bg-blue-600/20 text-blue-400 font-medium' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <FolderIcon className={cn('h-4 w-4', isActive ? 'text-blue-400' : 'text-slate-500')} />
                    {folder.label}
                  </span>
                  <Badge variant="secondary" className="bg-white/5 text-slate-400 border-none font-normal text-[10px]">
                    {folder.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Main Content Explorer */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="border-b border-white/10 p-3 bg-black/10 flex flex-wrap items-center gap-3 justify-between flex-shrink-0">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Lucide.Search className="h-4 w-4 text-slate-500 absolute ml-3" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder-slate-500 focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Toggle */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs outline-none focus:border-blue-500/50 cursor-pointer"
              >
                <option value="date" className="bg-[#0c1020]">Latest Date</option>
                <option value="name" className="bg-[#0c1020]">File Name</option>
                <option value="status" className="bg-[#0c1020]">Status</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center border border-white/10 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-1.5 text-slate-400 hover:text-white', viewMode === 'grid' && 'bg-white/10 text-white')}
                aria-label="Grid view"
              >
                <Lucide.LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn('p-1.5 text-slate-400 hover:text-white', viewMode === 'list' && 'bg-white/10 text-white')}
                aria-label="List view"
              >
                <Lucide.List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile quick category badges */}
        {isMobile && (
          <div className="flex gap-2 overflow-x-auto p-3 border-b border-white/10 flex-shrink-0 scrollbar-none">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={cn(
                  'whitespace-nowrap px-3 py-1 text-xs rounded-full border border-white/10',
                  selectedFolder === folder.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                )}
              >
                {folder.label}
              </button>
            ))}
          </div>
        )}

        {/* Folder items panel */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4">
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <Lucide.FolderOpen className="h-12 w-12 text-slate-600 animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-white">No files found</h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    Try adjusting your keyword query search or selecting another catalog folder.
                  </p>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <GlassCard
                    key={project.id}
                    as="div"
                    onClick={() => setActiveProject(project)}
                    className="p-0 flex flex-col group overflow-hidden h-72 border-white/[0.08]"
                  >
                    {/* Simulated Project Thumbnail (Gradient matching category) */}
                    <div className="relative h-36 w-full overflow-hidden border-b border-white/5">
                     <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                     <Badge
                     className={cn(
                     'absolute top-2 right-2 text-[9px] uppercase border-none tracking-widest',
                     project.status === 'completed' && 'bg-green-500/20 text-green-400',
                     project.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400',
                     project.status === 'planned' && 'bg-slate-500/30 text-slate-400'
                   )}
                  >
                      {project.status}
                      </Badge>
                    </div>
                    {/* Card details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                          {project.category.replace('-', ' ')}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 pt-2 max-h-12 overflow-hidden">
                        {project.techStack.slice(0, 3).map((t, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-white/5 text-slate-300 text-[9px] font-normal border-none">
                            {t}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[9px] text-slate-500 pt-0.5">+{project.techStack.length - 3} more</span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                       <Button
                       size="sm"
                       variant="outline"
                       className="flex-1 text-xs"
                       onClick={(e) => {
                         e.stopPropagation();
                          setPreviewProject(project);
                         }}
                        >
                        <Lucide.Image className="mr-1.5 h-3.5 w-3.5" />
                             Preview
                         </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              // List View Mode
              <div className="border border-white/10 rounded-lg overflow-hidden divide-y divide-white/10 bg-white/[0.01]">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="w-full flex items-center justify-between text-left p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Lucide.FileCode className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{project.title}</h4>
                        <p className="text-xs text-slate-400 truncate">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 flex-shrink-0 text-xs ml-4">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px] hidden md:inline">
                        {project.category.replace('-', ' ')}
                      </span>
                      <span className={cn(
                        'uppercase text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wider',
                        project.status === 'completed' && 'bg-green-500/10 text-green-400',
                        project.status === 'in-progress' && 'bg-yellow-500/10 text-yellow-400',
                        project.status === 'planned' && 'bg-slate-500/20 text-slate-400'
                      )}>
                        {project.status}
                      </span>
                      <span className="text-slate-500 whitespace-nowrap hidden sm:inline">{project.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        {previewProject && (
           <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
             <div className="bg-[#0c1020] border border-white/10 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-auto">

                 <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="font-bold text-white">
                      {previewProject.title}
                    </h3>

                    <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setPreviewProject(null)}
                    >
                    <Lucide.X className="h-4 w-4" />
                   </Button>
                  </div>

                  <div className="p-4">
                   <Image
                      src={previewProject.image}
                      alt={previewProject.title}
                      width={1600}
                      height={1000}
                      className="max-h-[80vh] max-w-full object-contain rounded-lg mx-auto"
                    />
                  </div>
                </div>
             </div>
          )}
      </div>
    </div>
  );
}

// Inline details component to keep app structured cleanly
interface ProjectDetailsViewProps {
  project: Project;
  onBack: () => void;
}

function ProjectDetailsView({ project, onBack }: ProjectDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'lessons'>('overview');

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white">
      {/* 1. Header Toolbar */}
      <div className="border-b border-white/10 p-3 bg-black/20 flex items-center justify-between flex-shrink-0">
        <Button onClick={onBack} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
          <Lucide.ArrowLeft className="mr-2 h-4 w-4" /> Back to Files
        </Button>
        <div className="flex items-center gap-2">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
            <Button size="sm" className="bg-white/5 border border-white/10 hover:bg-white/10 text-white">
              <FaGithub className="mr-1.5 h-4 w-4" /> GitHub
            </Button>
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
              <Lucide.ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
            </Button>
          </a>
        </div>
      </div>

      {/* 2. Project Contents scroll pane */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Main Hero Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest text-[9px]">
                {project.category.replace('-', ' ')}
              </Badge>
              <Badge className={cn(
                'border-none uppercase tracking-wider text-[9px]',
                project.status === 'completed' && 'bg-green-500/20 text-green-400',
                project.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400',
                project.status === 'planned' && 'bg-slate-500/30 text-slate-400'
              )}>
                {project.status}
              </Badge>
              <span className="text-xs text-slate-500 font-medium ml-1">{project.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Tech stack badge list */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <Badge key={i} className="bg-white/5 hover:bg-white/10 text-blue-200 border-white/5 py-1 px-2.5 font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dynamic Tabs */}
          <div className="border-b border-white/10 flex gap-4 text-sm font-semibold select-none pt-2">
            {[
              { id: 'overview', label: 'Overview & Solution' },
              { id: 'architecture', label: 'Architecture & Flow' },
              { id: 'lessons', label: 'Challenges & Lessons' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'pb-2 border-b-2 px-1 transition-all',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content panel */}
          <div className="space-y-6 pt-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lucide.Info className="h-5 w-5 text-blue-400" /> Project Overview
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <GlassCard hover={false} className="border-red-500/10 bg-red-950/5">
                    <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5 mb-2">
                      <Lucide.AlertCircle className="h-4 w-4" /> The Problem
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{project.problem}</p>
                  </GlassCard>

                  <GlassCard hover={false} className="border-green-500/10 bg-green-950/5">
                    <h4 className="text-sm font-bold text-green-400 flex items-center gap-1.5 mb-2">
                      <Lucide.CheckCircle className="h-4 w-4" /> The Solution
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{project.solution}</p>
                  </GlassCard>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lucide.Trophy className="h-4 w-4 text-yellow-400" /> Key Results
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    {project.results}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lucide.GitFork className="h-5 w-5 text-blue-400" /> Architecture Details
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.architecture}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Lucide.Activity className="h-4 w-4 text-green-400" /> Data Pipeline & Workflow
                  </h4>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-xs text-slate-300 whitespace-pre-line">
                    {project.workflow}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Lucide.Database className="h-4 w-4 text-blue-400" /> Dataset Specifications
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.dataset}</p>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <GlassCard hover={false} className="border-amber-500/10">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                      <Lucide.ShieldAlert className="h-4 w-4" /> Technical Challenges
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{project.challenges}</p>
                  </GlassCard>

                  <GlassCard hover={false} className="border-purple-500/10">
                    <h4 className="text-sm font-bold text-purple-400 flex items-center gap-1.5 mb-2">
                      <Lucide.BookOpen className="h-4 w-4" /> Lessons Learned
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{project.lessonsLearned}</p>
                  </GlassCard>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lucide.Sparkles className="h-4 w-4 text-blue-400" /> Future Improvements
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    {project.futureImprovements}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </ScrollArea>
    </div>
  );
  
}
export default ProjectsApp;
