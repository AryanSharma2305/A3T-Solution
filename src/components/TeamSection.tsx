import React from 'react';
import { Users, Code, Smartphone, Database, Cpu, Sparkles, MessageSquare, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export const TeamSection: React.FC = () => {
  const { getWhatsAppUrl } = useContact();

  const founders = [
    {
      name: 'Aryan Sharma',
      letter: 'A',
      title: 'Co-Founder',
      role: 'Lead Systems Architect & Full-Stack Lead',
      bio: 'Architects end-to-end web applications, mobile platforms, and high-velocity cloud deployments with focus on security and reliability.',
      capabilities: ['Full-Stack Systems', 'Cloud Architecture', 'Mobile Applications', 'Production CI/CD'],
    },
    {
      name: 'Asad Qureshi',
      letter: 'A',
      title: 'Co-Founder',
      role: 'Frontend Engineering & UI Systems Lead',
      bio: 'Specializes in reactive frontend design systems, database schema design, retail workflows, and university capstone implementations.',
      capabilities: ['Modern Web Apps', 'Database Design', 'Interactive UI/UX', 'Academic Engineering'],
    },
    {
      name: 'Ahmed Shaikh',
      letter: 'A',
      title: 'Co-Founder',
      role: 'Backend Infrastructure & POS Systems Lead',
      bio: 'Leads backend microservices, real-time POS barcode billing infrastructure, automated payment webhooks, and comprehensive software QA.',
      capabilities: ['Backend APIs', 'POS & Barcode Billing', 'Database Optimization', 'System Reliability'],
    },
    {
      name: 'Taquee Shaikh',
      letter: 'T',
      title: 'Co-Founder',
      role: 'AI / ML & Academic Research Lead',
      bio: 'Specializes in computer vision models, NLP pipelines, academic project structuring, synopsis documentation, and student viva coaching.',
      capabilities: ['AI & Python Pipelines', 'Computer Vision (OpenCV)', 'Project Documentation', 'Defense Preparation'],
    },
  ];

  return (
    <section id="team" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
            <Users className="h-4 w-4 text-cyan-400" />
            <span>FOUNDING TEAM &amp; LEADERSHIP</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-normal">Technical Co-Founders</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Meet the Co-Founders.
          </h2>

          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            At <strong>A3T Solutions</strong>, our leadership is hands-on. Founded by four technical partners—Aryan Sharma, Asad Qureshi, Ahmed Shaikh, and Taquee Shaikh—our multidisciplinary team works collaboratively across every phase of your software build, from initial architecture and UI to cloud deployment and ongoing support.
          </p>

          {/* Name Origin Highlight: A + A + A + T = A3T */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>
              <strong>The A3T Origin:</strong> <strong>A</strong>ryan + <strong>A</strong>sad + <strong>A</strong>hmed + <strong>T</strong>aquee = <strong>A3T Solutions</strong> (3 As &amp; 1 T).
            </span>
          </div>
        </div>

        {/* The 4 Co-Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Monogram Badge */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-950 border border-cyan-500/40 text-cyan-400 font-extrabold text-lg font-mono group-hover:scale-105 transition-transform">
                    {founder.letter}
                  </div>
                  <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
                    {founder.title}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-0.5">{founder.name}</h3>
                <p className="text-xs font-semibold text-cyan-400/90 mb-3">{founder.role}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{founder.bio}</p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Hands-on Expertise:</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {founder.capabilities.map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="rounded-md bg-slate-950 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <a
                  href={getWhatsAppUrl(`Hi ${founder.name}! I would like to consult on a web/app software project with A3T Solutions.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Connect with {founder.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <HeartHandshake className="h-4 w-4" />
                <span>COLLABORATIVE ENGINEERING · DEDICATED BUILD SPECIALISTS</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Technical Mastery Backed by Direct Founder Attention.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you partner with A3T Solutions, you deal directly with experienced engineers who write the code and manage the infrastructure. We eliminate bureaucratic agency layers to deliver high-velocity turnarounds, transparent communication, and dependable long-term support.
              </p>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <a
                href={getWhatsAppUrl("Hi A3T Solutions! We would like to discuss our software requirements with the founding team.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 text-xs font-bold text-slate-950 hover:from-cyan-300 hover:to-blue-500 transition-all shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat with our Co-Founders on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
