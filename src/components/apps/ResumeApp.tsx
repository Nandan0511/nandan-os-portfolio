'use client';

import React, { useRef } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/certifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useOS } from '@/contexts/OSContext';
import * as Lucide from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export function ResumeApp() {
  const { theme } = useOS();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Portfolio URL copied to clipboard! You can share this live resume page.');
  };

  return (
    <div className="h-full w-full flex flex-col text-white overflow-hidden bg-black/10">
      {/* Resume Control Bar */}
      <div className="border-b border-white/10 p-3 bg-black/20 flex flex-wrap items-center justify-between gap-3 flex-shrink-0 print:hidden">
        <div className="flex items-center gap-1.5">
          <Lucide.FileText className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CV Reader</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Print Action */}
          <Button onClick={handlePrint} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <Lucide.Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>

          {/* Share Action */}
          <Button onClick={handleCopyLink} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <Lucide.Share2 className="mr-1.5 h-4 w-4" /> Share Link
          </Button>

          {/* Download Simulation */}
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Mock download: In production, place resume.pdf inside public/ folder."); }} className="inline-flex">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white shadow">
              <Lucide.Download className="mr-1.5 h-4 w-4" /> Download PDF
            </Button>
          </a>
        </div>
      </div>

      {/* Scrollable Document area */}
      <ScrollArea className="flex-1 p-4 md:p-6 print:p-0 h-0">
        <div 
          ref={resumeRef}
          className="mx-auto max-w-3xl bg-white text-slate-800 p-6 md:p-10 rounded-xl shadow-2xl space-y-6 print:shadow-none print:rounded-none print:p-0 print:my-0 text-xs sm:text-sm"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-5 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
              <p className="text-base text-blue-600 font-bold mt-1">{profile.role}</p>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-1 max-w-md">{profile.tagline}</p>
            </div>
            
            <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-semibold md:text-right">
              <span className="flex items-center md:justify-end gap-1.5">
                <Lucide.MapPin className="h-3.5 w-3.5 text-slate-400" /> {profile.location}
              </span>
              <span className="flex items-center md:justify-end gap-1.5">
                <Lucide.Mail className="h-3.5 w-3.5 text-slate-400" /> {profile.email}
              </span>
              <span className="flex items-center md:justify-end gap-1.5">
                <FaGithub className="h-3.5 w-3.5 text-slate-400" /> github.com/Nandan0511
              </span>
              <span className="flex items-center md:justify-end gap-1.5">
                <FaLinkedin  className="h-3.5 w-3.5 text-slate-400" /> https://www.linkedin.com/in/nandan0601
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Lucide.GraduationCap className="h-4 w-4 text-slate-600" /> Education
            </h3>
            {profile.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-slate-600 font-semibold">{edu.institution}</p>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">{edu.description}</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap pt-0.5">{edu.year}</span>
              </div>
            ))}
          </div>

          {/* Experience / Projects summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Lucide.FolderGit2 className="h-4 w-4 text-slate-600" /> Core Projects & Experience
            </h3>
            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{proj.date}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{proj.description}</p>
                  
                  {/* Bulleted summary results */}
                  <div className="pl-4 border-l-2 border-slate-200 text-[11px] text-slate-500 space-y-0.5 mt-1 leading-relaxed">
                    <div><span className="font-bold text-slate-600">Overview:</span> {proj.overview}</div>
                    <div><span className="font-bold text-slate-600">Results:</span> {proj.results}</div>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 pt-1 font-semibold">
                    Technologies: <span className="text-blue-600 font-normal">{proj.techStack.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills categorizations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Lucide.Code className="h-4 w-4 text-slate-600" /> Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
              {skillCategories.map((cat, i) => (
                <div key={i} className="flex justify-between items-start gap-3">
                  <span className="font-bold text-slate-700 min-w-28">{cat.title}:</span>
                  <span className="text-slate-600 text-right">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications and credentials */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Lucide.Award className="h-4 w-4 text-slate-600" /> Certifications & Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between gap-2 border-l-2 border-blue-500/30 pl-2">
                  <div>
                    <h4 className="font-bold text-slate-800">{cert.title}</h4>
                    <p className="text-slate-500">{cert.issuer}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
export default ResumeApp;
