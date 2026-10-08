import React from 'react';
import { Users, Code, Smartphone, Database, Cpu, Sparkles, MessageSquare, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export const TeamSection: React.FC = () => {
  const { getWhatsAppUrl } = useContact();

  const founders = [
    {
      name: 'Aryan Sharma',
      letter: 'A',
      title: 'Co-Founder & CEO',
      bio: 'Works end-to-end across full-stack engineering, mobile development, client consultation, and system deployment for shops and students.',
      capabilities: ['Full-Stack Development', 'Mobile Apps', 'Client Solutions', 'System Architecture'],
    },
    {
      name: 'Asad Qureshi',
      letter: 'A',
      title: 'Co-Founder & CEO',
      bio: 'Works end-to-end across web platforms, database models, frontend experiences, shop digitalization, and college project deliverables.',
      capabilities: ['Web Applications', 'Database Systems', 'UI/UX Design', 'Academic Projects'],
    },
    {
      name: 'Ahmed Shaikh',
      letter: 'A',
      title: 'Co-Founder & CEO',
      bio: 'Works end-to-end across backend services, POS barcode billing, API integrations, testing, and full software lifecycle.',
      capabilities: ['Backend APIs', 'Billing & POS', 'Cloud Hosting', 'Testing & QA'],
    },
    {
      name: 'Taquee Shaikh',
      letter: 'T',
      title: 'Co-Founder & CEO',
      bio: 'Works end-to-end across algorithms, AI/ML models, college IEEE documentation, mobile responsiveness, and client project delivery.',
      capabilities: ['AI & Python Models', 'IEEE Reports & Viva', 'App Development', 'Sprint Execution'],
    },
  ];

  return (
    <section id="team" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <Users className="h-4 w-4 text-amber-400" />
            <span>THE 4 FOUNDERS · ALL EQUAL CEOs</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-normal">Aryan · Asad · Ahmed · Taquee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Meet the Team: 4 Equal CEOs, 100% Dedicated.
          </h2>

          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            At <strong>A3T Solutions</strong>, there is no single boss or corporate hierarchy—all four of us are <strong>CEOs and Co-Founders</strong>. We don&apos;t restrict ourselves to narrow tasks: all 4 of us work on every aspect of your project together—from UI/UX and full-stack coding to database architecture, mobile apps, and direct client support.
          </p>

          {/* Name Origin Highlight: A + A + A + T = A3T */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-300">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              <strong>The A3T Origin:</strong> <strong>A</strong>ryan + <strong>A</strong>sad + <strong>A</strong>hmed + <strong>T</strong>aquee = <strong>A3T Solutions</strong> (3 As & 1 T).
            </span>
          </div>
        </div>

        {/* 4 Equal CEOs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Distinctive Monogram Badge */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-slate-950 border border-amber-500/40 text-amber-400 font-extrabold text-lg font-mono group-hover:scale-105 transition-transform">
                    {founder.letter}
                  </div>
                  <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                    {founder.title}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-0.5">{founder.name}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-3">Equal Partner & Full-Stack Builder</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{founder.bio}</p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Hands-on Expertise:</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {founder.capabilities.map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="rounded-md bg-slate-950 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <a
                  href={getWhatsAppUrl(`Hi ${founder.name}! I would like to consult on a website/app project with A3T Solutions.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 py-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Message {founder.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <HeartHandshake className="h-4 w-4" />
                <span>NO FREELANCER FLAKINESS · 4 MINDS ON EVERY BUILD</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                You Get 4 Experienced Engineers Committed to Your Success.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you hire A3T Solutions, you aren&apos;t dealing with an overloaded agency or a single freelancer who might disappear. Aryan, Asad, Ahmed, and Taquee review and build your solution together, ensuring lightning-fast turnaround and round-the-clock support.
              </p>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <a
                href={getWhatsAppUrl("Hi Aryan, Asad, Ahmed & Taquee! We want to discuss a new software project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat with the 4 CEOs on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
