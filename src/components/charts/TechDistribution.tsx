'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const defaultData = [
  { name: 'AI & Machine Learning', value: 35, color: '#3B82F6' },
  { name: 'Data Analytics', value: 25, color: '#22C55E' },
  { name: 'Libraries & Frameworks', value: 20, color: '#A855F7' },
  { name: 'Software Engineering', value: 20, color: '#F59E0B' }
];

export function TechDistribution() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[280px] w-full items-center justify-center text-slate-500">
        Loading charts...
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={defaultData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
          >
            {defaultData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0c1020',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default TechDistribution;
