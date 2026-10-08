import React, { useState } from 'react';
import { GraduationCap, Code2, FileText, Presentation, HelpCircle, CheckCircle2, ArrowRight, MessageSquare, Laptop, ShieldCheck, Download, Sparkles, BookOpen } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface StudentProjectHubProps {
  onOpenProjectRequest: (domain?: string) => void;
}

export const StudentProjectHub: React.FC<StudentProjectHubProps> = ({ onOpenProjectRequest }) => {
  const { getWhatsAppUrl } = useContact();
  const [selectedDomain, setSelectedDomain] = useState<string>('fullstack');

  const domains = [
    {
      id: 'fullstack',
      title: 'Full-Stack Web Apps',
      badge: 'MERN · Python · Next.js',
      popularTopics: [
        'Healthcare Telemedicine & Doctor Appointment Portal with Video Chat',
        'Smart Inventory & Billing ERP with Multi-Role Access Control',
        'E-Learning LMS with Quiz Engine & Certificate Generation',
        'Crowdfunding Platform with Razorpay / Stripe Payment Integration',
      ],
    },
    {
      id: 'aiml',
      title: 'AI, Machine Learning & Python',
      badge: 'TensorFlow · OpenCV · Flask',
      popularTopics: [
        'Real-time Driver Drowsiness & Yawn Detection using OpenCV & CNN',
        'Fake News & Sentiment Analysis with NLP & Transformers',
        'Skin Disease & Leaf Disease Classifier using Deep Learning',
        'Stock Market Trend Forecasting using LSTM Recurrent Networks',
      ],
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      badge: 'Flutter · React Native · Android',
      popularTopics: [
        'Campus Event Management & Student Club Social App',
        'Smart Personal Expense & Split-wise Finance Tracker',
        'Blood Bank Emergency Finder with Geolocation & Push Alerts',
        'Food Wastage Reduction & Local NGO Donation App',
      ],
    },
    {
      id: 'iot_cloud',
      title: 'IoT, Cloud & Cyber Security',
      badge: 'Firebase · AWS · Arduino · Python',
      popularTopics: [
        'Smart Agriculture Soil Moisture & Automated Irrigation System',
        'Encrypted Cloud File Storage with AES-256 Multi-Factor Auth',
        'Intrusion Detection System using Network Packet Sniffing',
        'Smart Garbage Monitoring System with Real-Time Bin Levels',
      ],
    },
  ];

  const deliverables = [
    {
      icon: Code2,
      title: '100% Tested Source Code',
      description: 'Clean, well-commented code that runs without bugs. No missing modules, complete with database seed files.',
    },
    {
      icon: FileText,
      title: 'Complete IEEE Project Report',
      description: '60–100+ pages structured according to your university format, including UML diagrams, DFDs, ERDs, and test cases.',
    },
    {
      icon: Presentation,
      title: 'Presentation Slides (PPT)',
      description: 'Professionally styled presentation deck ready for your internal reviews and final semester presentation.',
    },
    {
      icon: HelpCircle,
      title: '1-on-1 Viva & Demo Coaching',
      description: 'Our engineers personally walk you through every module so you can confidently answer questions from examiners.',
    },
  ];

  return (
    <section id="services-student" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>ACADEMIC PROJECT SUITE</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">For B.Tech · BCA · MCA · Diploma · BSc/MSc</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              College Projects Made Easy. From Code to Viva Defense.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Need a Minor or Major Final Year Project? Don&apos;t stress about tight deadlines or broken copy-pasted code. A3T Solutions builds your project from scratch as per your exact college syllabus requirements.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <a
              href={getWhatsAppUrl("Hi A3T Solutions! I need a college project for my semester. Can you share topic options?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Discuss via WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenProjectRequest('academic')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/10"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 4 Pillars of Every Project Deliverable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 text-left">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Bento: Domains & Interactive Topic Selector + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Domain & Topic Selector */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl text-left">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Select Academic Domain</h3>
                <p className="text-xs text-slate-400">Choose your subject area to see popular project topics</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                Custom Topics Welcome
              </span>
            </div>

            {/* Domain Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {domains.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(d.id)}
                  className={`rounded-xl p-2.5 text-left border transition-all text-xs font-semibold ${
                    selectedDomain === d.id
                      ? 'border-blue-500 bg-blue-600/15 text-blue-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="truncate">{d.title}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{d.badge}</div>
                </button>
              ))}
            </div>

            {/* Topics for selected domain */}
            {domains
              .filter((d) => d.id === selectedDomain)
              .map((d) => (
                <div key={d.id} className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Recommended Project Topics ({d.title}):</span>
                    <span className="text-[11px] text-amber-400 font-mono">Guaranteed Unique Implementations</span>
                  </div>

                  <div className="space-y-2.5">
                    {d.popularTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3.5 hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-medium text-slate-200 block">{topic}</span>
                            <span className="text-[10px] text-slate-500">Includes: Source Code · IEEE Report · PPT · Viva Prep</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenProjectRequest(topic)}
                          className="shrink-0 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-[11px] font-semibold text-blue-300 hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
                        >
                          Book Topic →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Custom Syllabus Note */}
            <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white block mb-0.5">Have your own teacher-assigned topic or problem statement?</span>
                We can build your exact custom project specification with custom algorithms, database schemas, and college-specific documentation formats.
              </div>
            </div>
          </div>

          {/* Right Column: Visual and Fast Delivery Guarantee */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/src/assets/images/students_college_project_1791390871391.jpg"
                  alt="College engineering students discussing project software architecture"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-semibold text-blue-300">Fast 3 to 5 Days Delivery</div>
                  <div className="text-[11px] text-slate-400">Emergency 48-hour delivery available for approaching deadlines</div>
                </div>
              </div>

              <div className="p-5 space-y-3 bg-slate-950">
                <div className="text-xs font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>How We Work With Students:</span>
                  <span className="font-mono text-emerald-400 text-[11px]">4 Simple Steps</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold shrink-0">1</span>
                    <span>Send us your college requirements or syllabus problem statement.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold shrink-0">2</span>
                    <span>We assign 1-2 dedicated engineers from our 4-person team to start building.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold shrink-0">3</span>
                    <span>We do a live screen-share demo of the working project for your approval.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold shrink-0">4</span>
                    <span>Receive complete code zip, report PDF/Word, PPT + 1-on-1 viva session!</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenProjectRequest()}
                  className="mt-3 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
                >
                  Request Student Project Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
