import React, { useState } from 'react';
import { Calculator, Store, GraduationCap, CheckCircle2, MessageSquare, Send, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface QuoteCalculatorProps {
  initialMode?: 'shop' | 'student';
  initialShopType?: string;
  initialTopic?: string;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  initialMode = 'shop',
  initialShopType = 'jewellery',
  initialTopic = '',
}) => {
  const { getWhatsAppUrl, saveCustomerLogin } = useContact();

  const [mode, setMode] = useState<'shop' | 'student'>(initialMode);

  // Shop configuration state
  const [shopType, setShopType] = useState(initialShopType || 'jewellery');
  const [shopFeatures, setShopFeatures] = useState<string[]>([
    'catalog',
    'whatsapp_orders',
    'hosting_domain',
  ]);
  const [shopTimeline, setShopTimeline] = useState<'normal' | 'express'>('normal');

  // Student configuration state
  const [degree, setDegree] = useState('btech');
  const [projectType, setProjectType] = useState<'major' | 'minor'>('major');
  const [studentDomain, setStudentDomain] = useState('fullstack');
  const [studentDeliverables, setStudentDeliverables] = useState<string[]>([
    'code',
    'report',
    'ppt',
    'viva',
  ]);
  const [studentUrgency, setStudentUrgency] = useState<'normal' | 'express'>('normal');
  const [customTopic, setCustomTopic] = useState(initialTopic);

  // User contact submission form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');

  // Shop Features Options
  const shopFeatureOptions = [
    { id: 'catalog', label: 'Online Product / Design Catalog', price: 2500 },
    { id: 'whatsapp_orders', label: 'One-Click WhatsApp Order / Inquiries', price: 1000 },
    { id: 'billing_pos', label: 'Barcode Billing & GST Invoice System', price: 3500 },
    { id: 'booking', label: '24/7 Appointment Slot Booking', price: 2000 },
    { id: 'khata', label: 'Digital Customer Credit (Khata) Ledger', price: 1500 },
    { id: 'mobile_app', label: 'Dedicated Android APK / Mobile App', price: 4500 },
    { id: 'hosting_domain', label: 'Free Domain + High-Speed Cloud Hosting', price: 1200 },
  ];

  // Student Deliverables Options
  const studentDeliverableOptions = [
    { id: 'code', label: '100% Tested Bug-Free Source Code', price: 2200 },
    { id: 'report', label: 'Full IEEE University Project Report (60-100 pgs)', price: 1500 },
    { id: 'ppt', label: 'Professional Presentation Deck (PPT)', price: 600 },
    { id: 'viva', label: '1-on-1 Line-by-Line Viva Coaching & Demo prep', price: 800 },
    { id: 'setup', label: 'Remote AnyDesk Installation on Laptop', price: 500 },
  ];

  const calculateShopPrice = () => {
    let base = 3500; // Base professional website
    if (shopType === 'jewellery') base += 1000;
    if (shopType === 'medical') base += 1500;
    
    shopFeatures.forEach((fid) => {
      const opt = shopFeatureOptions.find((o) => o.id === fid);
      if (opt) base += opt.price;
    });

    if (shopTimeline === 'express') base += 1200;
    return base;
  };

  const calculateStudentPrice = () => {
    let base = projectType === 'major' ? 2500 : 1800;
    if (studentDomain === 'aiml') base += 800;
    if (studentDomain === 'mobile') base += 600;

    studentDeliverables.forEach((did) => {
      const opt = studentDeliverableOptions.find((o) => o.id === did);
      if (opt) base += opt.price;
    });

    if (studentUrgency === 'express') base += 1000;
    return base;
  };

  const currentPrice = mode === 'shop' ? calculateShopPrice() : calculateStudentPrice();
  const currentTimeline = mode === 'shop' 
    ? (shopTimeline === 'express' ? '3–4 Days Delivery' : '5–7 Days Delivery')
    : (studentUrgency === 'express' ? '48 Hours Express' : '4–5 Days Delivery');

  const toggleShopFeature = (id: string) => {
    setShopFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStudentDeliverable = (id: string) => {
    setStudentDeliverables((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generateWhatsAppMessage = () => {
    if (mode === 'shop') {
      const selectedFeatureLabels = shopFeatureOptions
        .filter((o) => shopFeatures.includes(o.id))
        .map((o) => o.label)
        .join(', ');

      return `Hello A3T Solutions! I calculated an estimate for my Shop:\n- Shop Type: ${shopType.toUpperCase()}\n- Features Needed: ${selectedFeatureLabels}\n- Timeline: ${currentTimeline}\n- Estimated Price: ₹${currentPrice.toLocaleString()}\nMy Name: ${clientName || 'Store Owner'}\nPhone: ${clientPhone || 'N/A'}\nPlease confirm quotation and start date!`;
    } else {
      const selectedDeliverableLabels = studentDeliverableOptions
        .filter((o) => studentDeliverables.includes(o.id))
        .map((o) => o.label)
        .join(', ');

      return `Hello A3T Solutions! I need a college project:\n- Degree: ${degree.toUpperCase()}\n- Project Type: ${projectType === 'major' ? 'Final Year Major' : 'Semester Minor'}\n- Domain: ${studentDomain.toUpperCase()}\n- Topic: ${customTopic || 'Need suggestions'}\n- Deliverables: ${selectedDeliverableLabels}\n- Timeline: ${currentTimeline}\n- Estimated Cost: ₹${currentPrice.toLocaleString()}\nMy Name: ${clientName || 'Student'}\nPhone: ${clientPhone || 'N/A'}\nPlease help me finalize!`;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && clientPhone) {
      saveCustomerLogin({
        name: clientName,
        phone: clientPhone,
        email: `${clientPhone.replace(/\D/g, '')}@estimate.a3tsolutions.com`,
        role: mode === 'shop' ? 'shop' : 'student',
        businessOrCollege: mode === 'shop' ? `${shopType} Store` : `${degree.toUpperCase()} Student`,
        projectTitle: mode === 'shop' ? `${shopType.toUpperCase()} Website & POS System` : (customTopic || `${studentDomain.toUpperCase()} College Project`),
        notes: `Estimated Budget: ₹${currentPrice.toLocaleString()} (${currentTimeline})\nNotes: ${clientNotes || 'Instant Quote Calculated'}`,
        budgetEstimated: currentPrice,
      });
    }
    setSubmissionStatus('success');
  };

  return (
    <section id="estimator" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <Calculator className="h-4 w-4" />
            <span>INTERACTIVE ESTIMATE CALCULATOR</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-normal">Transparent Pricing · No Hidden Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Instant Project Cost & Timeline Calculator.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Configure exactly what features you need for your shop or your college submission. Get an instant quote and connect with our 4 engineers immediately.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mb-8">
          <button
            onClick={() => setMode('shop')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'shop'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Store className="h-4 w-4" />
            <span>Local Shop / Business</span>
          </button>

          <button
            onClick={() => setMode('student')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>College Student Project</span>
          </button>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            {mode === 'shop' ? (
              <>
                {/* Shop Type Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    1. Select Shop / Retail Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'jewellery', label: 'Jewellery Showroom' },
                      { id: 'medical', label: 'Medical Pharmacy' },
                      { id: 'salon', label: 'Salon & Spa' },
                      { id: 'general_store', label: 'General / Kirana' },
                      { id: 'boutique', label: 'Boutique / Garments' },
                      { id: 'other_retail', label: 'Other Retail Store' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setShopType(st.id)}
                        className={`rounded-xl p-2.5 text-xs font-semibold border text-left transition-all ${
                          shopType === st.id
                            ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    2. Select Required Features & Add-ons
                  </label>
                  <div className="space-y-2">
                    {shopFeatureOptions.map((opt) => {
                      const isChecked = shopFeatures.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleShopFeature(opt.id)}
                          className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                            isChecked
                              ? 'border-amber-500/60 bg-amber-500/5 text-white'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-600'
                            }`}>
                              {isChecked && <CheckCircle2 className="h-3 w-3" />}
                            </div>
                            <span className="font-medium">{opt.label}</span>
                          </div>
                          <span className="font-mono text-slate-400">+₹{opt.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    3. Delivery Speed
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setShopTimeline('normal')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        shopTimeline === 'normal'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">Standard Delivery</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">5 to 7 Days (Included)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShopTimeline('express')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        shopTimeline === 'express'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">Express Launch</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">3 to 4 Days (+₹1,200)</div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Degree & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Course / Degree
                    </label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="btech">B.Tech / B.E (CSE / IT / ECE)</option>
                      <option value="bca">BCA (Bachelor Computer Apps)</option>
                      <option value="mca">MCA (Master Computer Apps)</option>
                      <option value="diploma">Polytechnic / Diploma CS/IT</option>
                      <option value="bsc_cs">B.Sc / M.Sc Computer Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Project Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setProjectType('major')}
                        className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                          projectType === 'major'
                            ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        Major (Final Year)
                      </button>

                      <button
                        type="button"
                        onClick={() => setProjectType('minor')}
                        className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                          projectType === 'minor'
                            ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        Minor Semester
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tech Domain */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Technical Domain
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'fullstack', label: 'Full Stack Web (MERN)' },
                      { id: 'aiml', label: 'AI / ML & Python' },
                      { id: 'mobile', label: 'Mobile App (Flutter/React)' },
                      { id: 'iot_cloud', label: 'Cloud / IoT / Security' },
                    ].map((dom) => (
                      <button
                        key={dom.id}
                        type="button"
                        onClick={() => setStudentDomain(dom.id)}
                        className={`rounded-xl p-2.5 text-xs font-semibold border text-left transition-all ${
                          studentDomain === dom.id
                            ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {dom.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Project Topic Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Assigned College Topic (Optional)
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="e.g. Smart Healthcare System or leave empty for suggestions"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Deliverables Checklist */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Included Deliverables
                  </label>
                  <div className="space-y-2">
                    {studentDeliverableOptions.map((opt) => {
                      const isChecked = studentDeliverables.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleStudentDeliverable(opt.id)}
                          className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                            isChecked
                              ? 'border-blue-500/60 bg-blue-500/5 text-white'
                              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600'
                            }`}>
                              {isChecked && <CheckCircle2 className="h-3 w-3" />}
                            </div>
                            <span className="font-medium">{opt.label}</span>
                          </div>
                          <span className="font-mono text-slate-400">+₹{opt.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Deadline Urgency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setStudentUrgency('normal')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        studentUrgency === 'normal'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">Standard Timeline</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">4 to 5 Days (Included)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudentUrgency('express')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        studentUrgency === 'express'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">48-Hour Urgent Delivery</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Emergency Defense (+₹1,000)</div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Calculated Quote Summary & WhatsApp Dispatch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estimated Total
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <ShieldCheck className="h-3 w-3" /> All-Inclusive
                </span>
              </div>

              {/* Huge Price Display */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                    ₹{currentPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">INR</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-amber-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Estimated Completion: {currentTimeline}</span>
                </div>
              </div>

              {/* What's Guaranteed */}
              <div className="space-y-2 border-t border-slate-800 pt-4 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Direct access to the 4 founders throughout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero hidden agency fees or maintenance traps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100% money-back satisfaction guarantee</span>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <a
                href={getWhatsAppUrl(generateWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 mb-3"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Send Estimate to WhatsApp (Fastest Response)</span>
              </a>

              {/* Quick Inquiry Form */}
              <div className="border-t border-slate-800 pt-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Or Request Instant Callback:
                </h4>

                {submissionStatus === 'success' ? (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center text-xs text-emerald-300">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                    <div className="font-bold text-sm">Request Received!</div>
                    <p className="mt-1 text-slate-300">Aryan or one of our co-founders will call/WhatsApp you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name (or Shop Name)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone / WhatsApp Number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      required
                    />
                    <textarea
                      placeholder="Any specific questions or custom requirements..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      rows={2}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Details for Callback</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
