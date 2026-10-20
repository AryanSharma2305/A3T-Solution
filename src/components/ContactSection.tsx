import React, { useState } from 'react';
import { Phone, MessageSquare, Instagram, Youtube, Mail, MapPin, Send, CheckCircle2, Copy, Check, Settings2, ExternalLink, Shield } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface ContactSectionProps {
  onOpenAdminConfig: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAdminConfig }) => {
  const {
    contactInfo,
    getWhatsAppUrl,
    getInstagramUrl,
    getYoutubeUrl,
    getPhoneUrl,
    registerUser,
  } = useContact();

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('shop');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({
      name: formName,
      phone: formContact,
      email: formEmail,
      role: formService.startsWith('student') ? 'student' : 'shop',
      businessOrCollege: formService.startsWith('student') ? 'College Student' : 'Retail Shop Owner',
      projectTitle:
        formService === 'shop'
          ? 'Retail Shop Website & POS App'
          : formService === 'student_major'
          ? 'College Final Year Major Project'
          : 'College Minor Semester Project',
      notes: formMessage,
    });
    setFormStatus('success');
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OFFICIAL CONTACT CHANNELS</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Connect Directly with Our Core Technical Team</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get In Touch. Our Engineering Team is Ready.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Reach us directly through Phone Call, WhatsApp, Instagram, or YouTube. All inquiries are saved to our central project desk and reviewed by the co-founders.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={onOpenAdminConfig}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            >
              <Shield className="h-4 w-4 text-cyan-400" />
              <span>Admin: Configure Official Numbers</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Contact Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 text-left">
          {/* 1. Phone Number */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Phone className="h-6 w-6" />
                </div>
                <button
                  onClick={() => handleCopy(contactInfo.phone, 'phone')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">Phone Number</h3>
              <p className="text-xs text-slate-400 mb-2">Direct call to our technical desk</p>
              <div className="font-mono text-base font-bold text-cyan-400 mb-4">{contactInfo.phone}</div>
            </div>

            <a
              href={getPhoneUrl()}
              className="w-full rounded-xl bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 py-2.5 text-xs font-bold text-center text-white transition-colors"
            >
              Call Us Now
            </a>
          </div>

          {/* 2. WhatsApp */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <button
                  onClick={() => handleCopy(contactInfo.whatsapp, 'whatsapp')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy WhatsApp"
                >
                  {copiedField === 'whatsapp' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">WhatsApp Chat</h3>
              <p className="text-xs text-slate-400 mb-2">Fastest reply · Instant consultations</p>
              <div className="font-mono text-base font-bold text-emerald-400 mb-4">{contactInfo.whatsapp}</div>
            </div>

            <a
              href={getWhatsAppUrl("Hello A3T Solutions! I have an inquiry regarding a software project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-center text-white transition-colors shadow-md shadow-emerald-600/20"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* 3. Instagram */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-pink-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                  <Instagram className="h-6 w-6" />
                </div>
                <button
                  onClick={() => handleCopy(`@${contactInfo.instagram.replace(/^@/, '')}`, 'instagram')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy Instagram handle"
                >
                  {copiedField === 'instagram' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">Instagram</h3>
              <p className="text-xs text-slate-400 mb-2">Follow our work &amp; DM us</p>
              <div className="font-mono text-base font-bold text-pink-400 mb-4">@{contactInfo.instagram.replace(/^@/, '')}</div>
            </div>

            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white py-2.5 text-xs font-bold text-center text-white transition-all flex items-center justify-center gap-1.5"
            >
              <span>Visit Instagram</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* 4. YouTube */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-red-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <Youtube className="h-6 w-6" />
                </div>
                <button
                  onClick={() => handleCopy(contactInfo.youtube, 'youtube')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy YouTube Link"
                >
                  {copiedField === 'youtube' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">YouTube Channel</h3>
              <p className="text-xs text-slate-400 mb-2">Watch video demos &amp; launches</p>
              <div className="font-mono text-xs font-bold text-red-400 mb-4 truncate">A3T Solutions Official</div>
            </div>

            <a
              href={getYoutubeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white py-2.5 text-xs font-bold text-center text-white transition-all flex items-center justify-center gap-1.5"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Secondary Info & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Quick Details Box */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">A3T Solutions Technical Desk</h3>
              <p className="text-xs text-slate-400">
                Directly overseen by the founding partners and engineering team.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Direct Email</div>
                  <div className="text-slate-400">{contactInfo.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-red-400 shrink-0">
                  <Youtube className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">YouTube Demos</div>
                  <a
                    href={getYoutubeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-red-400 truncate block"
                  >
                    Subscribe to A3T Solutions Channel
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Service Coverage</div>
                  <div className="text-slate-400">{contactInfo.location}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-5">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs">
                <div className="font-bold text-cyan-400 mb-1">Direct Team Hotline:</div>
                <div className="text-slate-300">
                  Call / WhatsApp: <strong className="text-white font-mono">{contactInfo.phone}</strong>
                </div>
                <div className="text-slate-400 text-[11px] mt-1">
                  Active 7 days a week. All inquiries recorded in our secure central database.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact / Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Send a Message to Our Engineering Team</h3>
            <p className="text-xs text-slate-400 mb-6">
              Your inquiry is saved directly to our database so our developers can assess your requirements.
            </p>

            {formStatus === 'success' ? (
              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-6 text-center text-xs text-cyan-300">
                <CheckCircle2 className="h-10 w-10 text-cyan-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">Inquiry Received &amp; Recorded!</h4>
                <p className="mt-1 text-slate-300 max-w-sm mx-auto">
                  Thank you, {formName}. Our team will review your project requirements and message you on {formContact}.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(`Hi A3T Solutions! I just submitted an inquiry for: ${formService} - ${formMessage}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-white font-bold text-xs"
                  >
                    Open in WhatsApp Now
                  </a>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahul Sharma or Shop Name"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      placeholder="+91 8976121102"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">What can we build for you?</label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="shop">Jewellery / Medical / Salon / General Store Website &amp; App</option>
                    <option value="student_major">College Final Year Major Project (Code + Report + PPT)</option>
                    <option value="student_minor">College Minor Semester Project</option>
                    <option value="custom">Custom Web or Mobile Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details / Requirements</label>
                  <textarea
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your business or your college project requirements, deadlines, or preferred tech stack..."
                    rows={4}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Recorded in central database · 100% confidential</span>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry to Team</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
