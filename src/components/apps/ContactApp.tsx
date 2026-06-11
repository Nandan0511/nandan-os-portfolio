'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validators';
import { useOS } from '@/contexts/OSContext';
import { profile } from '@/data/profile';
import { GlassCard } from '@/components/shared/GlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { sanitizeInput, sanitizeEmail } from '@/utils/sanitize';
import * as Lucide from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
export function ContactApp() {
  const { isMobile } = useOS();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });



const onSubmit = async (data: ContactFormData) => {
  setFormState('loading');

  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeEmail(data.email),
    subject: sanitizeInput(data.subject),
    message: sanitizeInput(data.message)
  };

  try {
    await emailjs.send(
      'service_bqql0th',
      'template_6026vuy',
      {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
      },
      '1nQ9Riza9y_N7KVKk'
    );

    setFormState('success');
    reset();

  } catch (error) {
    console.error(error);
    setFormState('error');
  }
};

  return (
    <ScrollArea className="h-full w-full text-white bg-black/10">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Lucide.Mail className="h-6 w-6 text-blue-400" /> Contact Hub
          </h2>
          <p className="text-xs text-slate-400">
            Reach out directly for recruiting inquiries, collaboration opportunities, or general questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column: Direct Connections */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500">Direct Contact Details</h3>
            
            {/* Email Card */}
            <GlassCard
              as="button"
              onClick={() => { window.location.href = `mailto:${profile.email}`; }}
              className="p-4 flex items-center gap-3 border-white/[0.08] hover:border-blue-500/20"
            >
              <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                <Lucide.Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Email Address</span>
                <span className="text-xs font-semibold text-white truncate block">{profile.email}</span>
              </div>
            </GlassCard>

            {/* LinkedIn Card */}
            <GlassCard
              as="button"
              onClick={() => window.open(profile.socialLinks.find((l) => l.platform === 'LinkedIn')?.url, '_blank')}
              className="p-4 flex items-center gap-3 border-white/[0.08] hover:border-blue-500/20"
            >
              <div className="p-2.5 bg-[#0A66C2]/10 rounded-lg text-[#0A66C2]">
                <FaLinkedin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">LinkedIn Profile</span>
                <span className="text-xs font-semibold text-white truncate block">linkedin.com/in/nandan0601</span>
              </div>
            </GlassCard>

            {/* GitHub Card */}
            <GlassCard
              as="button"
              onClick={() => window.open(profile.socialLinks.find((l) => l.platform === 'GitHub')?.url, '_blank')}
              className="p-4 flex items-center gap-3 border-white/[0.08] hover:border-blue-500/20"
            >
              <div className="p-2.5 bg-slate-300/10 rounded-lg text-white">
                <FaGithub className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">GitHub Repository</span>
                <span className="text-xs font-semibold text-white truncate block">github.com/Nandan0511</span>
              </div>
            </GlassCard>

            {/* Location Card */}
            <GlassCard hover={false} className="p-4 flex items-center gap-3 border-white/[0.08]">
              <div className="p-2.5 bg-green-500/10 rounded-lg text-green-400">
                <Lucide.MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Primary Location</span>
                <span className="text-xs font-semibold text-white block">{profile.location}</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-3">
            <GlassCard hover={false} className="p-5 border-white/[0.08]">
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="p-4 bg-green-500/10 text-green-400 rounded-full animate-bounce">
                    <Lucide.CheckCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Transmission Successful</h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                      Thank you! Your message has been sent successfully. Nandan will get back to you shortly.
                    </p>
                  </div>
                  <Button
                    onClick={() => setFormState('idle')}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-2">Send Secure Message</h3>

                  {/* Name field */}
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-slate-400 text-xs font-semibold">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      className="bg-white/5 border-white/10 text-white placeholder-slate-600 focus-visible:ring-blue-500/50"
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 font-semibold block">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-slate-400 text-xs font-semibold">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      className="bg-white/5 border-white/10 text-white placeholder-slate-600 focus-visible:ring-blue-500/50"
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 font-semibold block">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-slate-400 text-xs font-semibold">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Recruiting / Query"
                      className="bg-white/5 border-white/10 text-white placeholder-slate-600 focus-visible:ring-blue-500/50"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-400 font-semibold block">{errors.subject.message}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-slate-400 text-xs font-semibold">Message Payload</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Write your transmission contents here..."
                      className="bg-white/5 border-white/10 text-white placeholder-slate-600 focus-visible:ring-blue-500/50 resize-none"
                      {...register('message')}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-400 font-semibold block">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Lucide.Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Lucide.Send className="h-4 w-4" />
                        Send Transmission
                      </>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
export default ContactApp;
