import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { OSProvider } from '@/contexts/OSContext';
import { WindowManagerProvider } from '@/contexts/WindowManagerContext';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nandanos.vercel.app'),

  title: 'NandanOS — Nandan Patel | Data Science Portfolio',
  description:
    'A premium, interactive portfolio operating system designed for Data Science & AI recruiters. Explore projects, analytics, Tableau dashboards, and chat with the AI assistant.',

  keywords: [
    'Data Science Portfolio',
    'Nandan Patel',
    'Machine Learning Engineer',
    'AI Developer',
    'Next.js OS Portfolio',
    'Tableau Dashboard Gallery',
    'RAG Chatbot Portfolio'
  ],

  authors: [{ name: 'Nandan Patel' }],

  openGraph: {
    title: 'NandanOS — Nandan Patel Portfolio',
    description:
      'Data Science & AI undergraduate student portfolio styled as a futuristic web operating system.',
    url: 'https://nandanos.vercel.app',
    siteName: 'NandanOS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NandanOS Desktop Environment Mockup'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'NandanOS — Nandan Patel Portfolio',
    description:
      'Recruiter-friendly portfolio OS designed for Data Science & AI engineering showcases.',
    images: ['/og-image.png']
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-[#080B12] text-white flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
        <OSProvider>
          <WindowManagerProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </WindowManagerProvider>
        </OSProvider>
      </body>
    </html>
  );
}
export type { Metadata };
