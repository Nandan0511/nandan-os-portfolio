'use client';

import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Programming', A: 73, fullMark: 100 },
  { subject: 'Data Analytics', A: 80, fullMark: 100 },
  { subject: 'Libraries & Frameworks', A: 80, fullMark: 100 },
  { subject: 'AI & ML', A: 74, fullMark: 100 },
  { subject: 'Tools & Platforms', A: 77, fullMark: 100 }
];

export function SkillRadar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center text-slate-500">
        Loading charts...
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#ffffff15" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={9} tickCount={6} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default SkillRadar;
