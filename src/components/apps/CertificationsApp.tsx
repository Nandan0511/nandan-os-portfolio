// 'use client';

// import React from 'react';
// import { certifications } from '@/data/certifications';
// import { GlassCard } from '@/components/shared/GlassCard';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import * as Lucide from 'lucide-react';

// export function CertificationsApp() {
//   const totalCerts = certifications.length;

//   // Count unique credential issuers
//   const issuers = new Set(certifications.map((c) => c.issuer)).size;

//   return (
//     <div className="h-full w-full flex flex-col text-white bg-black/10 overflow-hidden">
//       {/* Summary Stats Header */}
//       <div className="border-b border-white/10 p-4 bg-black/20 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
//         <div>
//           <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
//             <Lucide.Award className="h-5 w-5 text-amber-500" /> Certifications
//           </h2>
//           <p className="text-xs text-slate-400 mt-0.5">
//             Professional development, university certifications, and validated course achievements.
//           </p>
//         </div>

//         <div className="flex gap-4 text-xs font-semibold text-slate-400">
//           <div>
//             Total Credentials: <span className="text-white font-bold">{totalCerts}</span>
//           </div>
//           <div className="border-l border-white/10 pl-4">
//             Institutions: <span className="text-white font-bold">{issuers}</span>
//           </div>
//         </div>
//       </div>

//       {/* Grid List */}
//       <ScrollArea className="flex-grow">
//         <div className="p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {certifications.map((cert) => (
//               <GlassCard
//                 key={cert.id}
//                 hover={true}
//                 className="flex flex-col justify-between p-5 border-white/[0.08] hover:border-amber-500/20"
//               >
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-start gap-4">
//                     <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
//                       <Lucide.Award className="h-6 w-6" />
//                     </div>
//                     <Badge variant="outline" className="text-[9px] border-white/10 text-slate-400 uppercase font-bold tracking-wider">
//                       {cert.category}
//                     </Badge>
//                   </div>

//                   <div className="space-y-1">
//                     <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{cert.title}</h3>
//                     <p className="text-xs text-slate-400 font-semibold">{cert.issuer}</p>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
//                   <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
//                     <Lucide.Calendar className="h-3.5 w-3.5" /> Issued: {cert.date}
//                   </span>

//                   <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
//                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
//                     <Lucide.Calendar className="h-3.5 w-3.5" />
//                       Issued: {cert.date}
//                    </span>

//                    <a
//                     href={cert.image}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex"
//                    >
//                    <Button
//                      size="sm"
//                      variant="ghost"
//                      className="text-xs text-slate-400 hover:text-white px-2"
//                    >
//                   View Certificate
//                    <Lucide.Image className="ml-1 h-3 w-3" />
//                     </Button>
//                   </a>
//                  </div>
//                 </div>
//               </GlassCard>
//             ))}
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }
// export default CertificationsApp;

'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { certifications } from '@/data/certifications';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as Lucide from 'lucide-react';

export function CertificationsApp() {
const totalCerts = certifications.length;
const issuers = new Set(certifications.map((c) => c.issuer)).size;

const [selectedCert, setSelectedCert] = useState<any>(null);

return ( <div className="h-full w-full flex flex-col text-white bg-black/10 overflow-hidden">

  {/* Header */}
  <div className="border-b border-white/10 p-4 bg-black/20 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
    <div>
      <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
        <Lucide.Award className="h-5 w-5 text-amber-500" />
        Certifications
      </h2>

      <p className="text-xs text-slate-400 mt-0.5">
        Professional development, university certifications, and validated course achievements.
      </p>
    </div>

    <div className="flex gap-4 text-xs font-semibold text-slate-400">
      <div>
        Total Credentials:{' '}
        <span className="text-white font-bold">
          {totalCerts}
        </span>
      </div>

      <div className="border-l border-white/10 pl-4">
        Institutions:{' '}
        <span className="text-white font-bold">
          {issuers}
        </span>
      </div>
    </div>
  </div>

  {/* Certifications Grid */}
  <ScrollArea className="flex-1 min-h-0 ">
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {certifications.map((cert) => (
          <GlassCard
            key={cert.id}
            hover
            className="flex flex-col justify-between p-5 border-white/[0.08] hover:border-amber-500/20"
          >
            <div className="space-y-3">

              <div className="flex justify-between items-start gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <Lucide.Award className="h-6 w-6" />
                </div>

                <Badge
                  variant="outline"
                  className="text-[9px] border-white/10 text-slate-400 uppercase font-bold tracking-wider"
                >
                  {cert.category}
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 font-semibold">
                  {cert.issuer}
                </p>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-4">

              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <Lucide.Calendar className="h-3.5 w-3.5" />
                Issued: {cert.date}
              </span>

              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-slate-400 hover:text-white px-2"
                onClick={() => setSelectedCert(cert)}
              >
                View Certificate
                <Lucide.Image className="ml-1 h-3 w-3" />
              </Button>

            </div>
          </GlassCard>
        ))}

      </div>
    </div>
  </ScrollArea>

  {/* Certificate Modal */}
  {selectedCert && (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl">

        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-slate-900">

          <h3 className="text-white font-bold text-lg">
            {selectedCert.title}
          </h3>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCert(null)}
          >
            Close
          </Button>

        </div>

        <div className="p-4">
          <Image
            src={selectedCert.image}
            alt={selectedCert.title}
            width= {1200}
            height={750}
            className="max-h-[75vh] max-w-full object-contain rounded-lg"
          />
        </div>

      </div>

    </div>
  )}

</div>


);
}

export default CertificationsApp;
