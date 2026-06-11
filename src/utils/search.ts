import { SearchResult } from '@/types';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/certifications';
import { analyticsDashboards } from '@/data/analytics';
import { appRegistry } from '@/data/apps';

export function searchAll(query: string): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResult[] = [];

  // 1. Search projects
  projects.forEach((proj) => {
    if (
      proj.title.toLowerCase().includes(cleanQuery) ||
      proj.description.toLowerCase().includes(cleanQuery) ||
      proj.techStack.some((t) => t.toLowerCase().includes(cleanQuery))
    ) {
      results.push({
        id: `proj-${proj.id}`,
        title: proj.title,
        description: proj.description,
        category: 'project',
        appId: 'projects',
        icon: 'FolderOpen'
      });
    }
  });

  // 2. Search skills
  skillCategories.forEach((cat) => {
    // Check category name
    if (cat.title.toLowerCase().includes(cleanQuery)) {
      results.push({
        id: `skillcat-${cat.id}`,
        title: cat.title,
        description: `Explore skills under ${cat.title}.`,
        category: 'skill',
        appId: 'skills',
        icon: 'Code2'
      });
    }
    // Check individual skills
    cat.skills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(cleanQuery)) {
        results.push({
          id: `skill-${cat.id}-${skill.name.replace(/\s+/g, '-').toLowerCase()}`,
          title: `${skill.name} (${cat.title})`,
          description: `Proficiency level: ${skill.level}%. Click to view details.`,
          category: 'skill',
          appId: 'skills',
          icon: 'Code2'
        });
      }
    });
  });

  // 3. Search certifications
  certifications.forEach((cert) => {
    if (
      cert.title.toLowerCase().includes(cleanQuery) ||
      cert.issuer.toLowerCase().includes(cleanQuery)
    ) {
      results.push({
        id: `cert-${cert.id}`,
        title: cert.title,
        description: `Certified by ${cert.issuer} (${cert.date}).`,
        category: 'certification',
        appId: 'certifications',
        icon: 'Award'
      });
    }
  });

  // 4. Search Tableau dashboards
  analyticsDashboards.forEach((dash) => {
    if (
      dash.title.toLowerCase().includes(cleanQuery) ||
      dash.description.toLowerCase().includes(cleanQuery) ||
      dash.insights.some((ins) => ins.toLowerCase().includes(cleanQuery))
    ) {
      results.push({
        id: `dash-${dash.id}`,
        title: dash.title,
        description: dash.description,
        category: 'analytics',
        appId: 'analytics',
        icon: 'BarChart3'
      });
    }
  });

  // 5. Search apps themselves
  appRegistry.forEach((app) => {
    if (
      app.title.toLowerCase().includes(cleanQuery) ||
      app.description.toLowerCase().includes(cleanQuery)
    ) {
      // Avoid duplication with category apps if already added, but allow opening directly
      if (!results.some((r) => r.appId === app.id && r.category === 'page')) {
        results.push({
          id: `app-${app.id}`,
          title: `Open ${app.title}`,
          description: app.description,
          category: 'page',
          appId: app.id,
          icon: app.icon
        });
      }
    }
  });

  // Limit to 10 results
  return results.slice(0, 10);
}
