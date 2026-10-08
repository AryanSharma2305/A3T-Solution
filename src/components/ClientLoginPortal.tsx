import React, { useState } from 'react';
import { 
  X, LogIn, Lock, Mail, Store, GraduationCap, CheckCircle2, Clock, 
  Download, AlertCircle, MessageSquare, ChevronRight, FileText, Code2, 
  ShieldCheck, RefreshCw, Phone, Users, Trash2, Edit3, ArrowRight, Sparkles, UserPlus 
} from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { A3TLogo } from './A3TLogo';
import { CustomerAccount } from '../types';

interface ClientLoginPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientLoginPortal: React.FC<ClientLoginPortalProps> = ({ isOpen, onClose }) => {
  const { 
    getWhatsAppUrl, 
    registeredCustomers, 
    activeCustomer, 
    saveCustomerLogin, 
    loginExistingCustomer, 
    logoutCustomer, 
    deleteCustomer, 
    updateCustomerProgress 
  } = useContact();

  const [portalMode, setPortalMode] = useState<'client_login' | 'client_register' | 'client_dashboard' | 'ceos_admin'>(
    activeCustomer ? 'client_dashboard' : 'client_login'
  );

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<'shop' | 'student'>('shop');
  const [regBusinessOrCollege, setRegBusinessOrCollege] = useState('');
  const [regProjectTitle, setRegProjectTitle] = useState('');
  const [regNotes, setRegNotes] = useState('');

  // Sign In Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginError, setLoginError] = useState('');

  // Revision Request State
  const [revisionNote, setRevisionNote] = useState('');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);

  // Founders Admin Access
  const [adminPin, setAdminPin] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');

  if (!isOpen) return null;

  // Handle Client Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;

    const newCust = saveCustomerLogin({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim() || `${regPhone.replace(/\D/g, '')}@client.a3tsolutions.com`,
      role: regRole,
      businessOrCollege: regBusinessOrCollege.trim(),
      projectTitle: regProjectTitle.trim() || (regRole === 'shop' ? 'Shop Digital Platform' : 'College Academic Project'),
      notes: regNotes.trim(),
    });

    setPortalMode('client_dashboard');
  };

  // Handle Client Sign In
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier.trim()) return;

    const found = loginExistingCustomer(loginIdentifier);
    if (found) {
      setPortalMode('client_dashboard');
    } else {
      setLoginError('No matching account found with that phone or email. Please register below.');
    }
  };

  // 1-Click Demo Login for quick testing
  const handleQuickDemo = (role: 'shop' | 'student') => {
    const demoTarget = registeredCustomers.find((c) => c.role === role);
    if (demoTarget) {
      loginExistingCustomer(demoTarget.phone);
      setPortalMode('client_dashboard');
    }
  };

  // Handle Founders Admin Unlock
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 2305 (matching Instagram a3tsolutions2305) or 'admin' or 'a3t'
    if (adminPin.trim() === '2305' || adminPin.trim().toLowerCase() === 'admin' || adminPin.trim().toLowerCase() === 'a3t') {
      setIsAdminUnlocked(true);
      setAdminError('');
    } else {
      setAdminError('Incorrect PIN. (Hint: 2305)');
    }
  };

  const handleDownloadDemo = (fileName: string) => {
    const blob = new Blob([
      `A3T Solutions Official Project Deliverable\nProject: ${activeCustomer?.projectTitle}\nClient: ${activeCustomer?.name}\nFile: ${fileName}\n\nBuilt by A3T Solutions (Aryan Sharma, Asad Qureshi, Ahmed Shaikh & Taquee Shaikh - 4 CEOs).\nSupport WhatsApp: +91 8976121102`,
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.(zip|docx|pptx)/, '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    setRevisionSubmitted(true);
    setTimeout(() => {
      setRevisionNote('');
      setRevisionSubmitted(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <A3TLogo size="sm" showText={false} />
            <div className="text-left">
              <h3 className="text-base font-bold text-white">
                {portalMode === 'ceos_admin'
                  ? 'CEOs Project Master Desk (Founders Only)'
                  : activeCustomer && portalMode === 'client_dashboard'
                  ? `Client Project Tracker: ${activeCustomer.id}`
                  : 'A3T Solutions Client & Student Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {portalMode === 'ceos_admin'
                  ? 'Aryan · Asad · Ahmed · Taquee'
                  : activeCustomer && portalMode === 'client_dashboard'
                  ? activeCustomer.name
                  : 'Track your live project or log in to view active progress'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch to Founders Admin Desk */}
            <button
              onClick={() => {
                if (portalMode === 'ceos_admin') {
                  setPortalMode(activeCustomer ? 'client_dashboard' : 'client_login');
                } else {
                  setPortalMode('ceos_admin');
                }
              }}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                portalMode === 'ceos_admin'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-500/50'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>{portalMode === 'ceos_admin' ? 'Back to Portal' : '4 CEOs Admin Desk'}</span>
            </button>

            {activeCustomer && portalMode === 'client_dashboard' && (
              <button
                onClick={() => {
                  logoutCustomer();
                  setPortalMode('client_login');
                }}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800"
              >
                Log Out
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: CEOs ADMIN MASTER DESK (Aryan, Asad, Ahmed, Taquee) */}
        {/* ============================================================== */}
        {portalMode === 'ceos_admin' && (
          <div className="p-6 sm:p-8 text-left space-y-6 max-h-[75vh] overflow-y-auto">
            {!isAdminUnlocked ? (
              <div className="max-w-md mx-auto py-8 text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mx-auto">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">CEOs Secure Dashboard</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your Founders PIN to view all client registrations and saved customer data.
                  </p>
                </div>

                <form onSubmit={handleUnlockAdmin} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter PIN (Default: 2305)"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full text-center rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    autoFocus
                  />
                  {adminError && <p className="text-xs text-rose-400">{adminError}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    Unlock Founders View
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Header Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400">LOGGED-IN &amp; SAVED CUSTOMER DATABASE</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      Total Inquiries &amp; Clients: {registeredCustomers.length}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-400">
                    Visible to Aryan, Asad, Ahmed &amp; Taquee anywhere on any device.
                  </div>
                </div>

                {/* Customers Table / List */}
                <div className="space-y-3">
                  {registeredCustomers.map((cust) => (
                    <div
                      key={cust.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                    >
                      <div className="space-y-1.5 flex-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-amber-400 font-bold">{cust.id}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs font-bold text-white">{cust.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cust.role === 'shop' ? 'bg-amber-500/10 text-amber-300' : 'bg-blue-500/10 text-blue-300'
                          }`}>
                            {cust.role === 'shop' ? 'Shop Owner' : 'College Student'}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                            {cust.status} ({cust.progressPercentage}%)
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 font-medium">{cust.projectTitle}</div>
                        <div className="text-[11px] text-slate-400">
                          {cust.businessOrCollege} · Registered: {cust.registeredAt}
                        </div>

                        {cust.notes && (
                          <div className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 p-2 rounded-lg mt-1 italic">
                            &quot;{cust.notes}&quot;
                          </div>
                        )}
                      </div>

                      {/* Right Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Direct WhatsApp Call/Chat to Customer */}
                        <a
                          href={`https://wa.me/${cust.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello ${cust.name}! This is Aryan/Asad/Ahmed/Taquee from A3T Solutions regarding your project (${cust.projectTitle}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition-all shadow"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        {/* Direct Call */}
                        <a
                          href={`tel:${cust.phone.replace(/\D/g, '')}`}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1.5 text-xs font-semibold transition-all"
                        >
                          <Phone className="h-3.5 w-3.5 text-amber-400" />
                          <span>Call</span>
                        </a>

                        {/* Status Updater */}
                        <select
                          value={cust.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as CustomerAccount['status'];
                            const newProg = newStatus === 'Completed' ? 100 : newStatus === 'Delivered' ? 90 : newStatus === 'In Progress' ? 50 : 15;
                            updateCustomerProgress(cust.id, newStatus, newProg);
                          }}
                          className="rounded-xl border border-slate-700 bg-slate-900 text-[11px] py-1.5 px-2 text-slate-200"
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                        </select>

                        {/* Delete Action */}
                        <button
                          onClick={() => deleteCustomer(cust.id)}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: CLIENT / STUDENT SIGN IN */}
        {/* ============================================================== */}
        {portalMode === 'client_login' && (
          <div className="p-6 sm:p-8 text-left">
            {/* Quick Toggle to Register */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Client &amp; Student Sign In</h4>
                <p className="text-xs text-slate-400">Access your live development tracker and project files.</p>
              </div>
              <button
                onClick={() => setPortalMode('client_register')}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <UserPlus className="h-4 w-4" />
                <span>New Client? Register Here</span>
              </button>
            </div>

            {/* Quick 1-Click Demo Buttons */}
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
              <span className="text-xs font-bold text-amber-400 block mb-2">Instant 1-Click Demo Login:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('shop')}
                  className="flex items-center justify-between p-3 rounded-xl border border-amber-500/30 bg-slate-950 hover:bg-slate-900 text-xs text-left text-amber-300"
                >
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-amber-400" />
                    <div>
                      <div className="font-bold">Royal Jewellers Showroom</div>
                      <div className="text-[10px] text-slate-400">Shop Client (In-Progress 80%)</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="flex items-center justify-between p-3 rounded-xl border border-blue-500/30 bg-slate-950 hover:bg-slate-900 text-xs text-left text-blue-300"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <div>
                      <div className="font-bold">Rahul Sharma (B.Tech AI)</div>
                      <div className="text-[10px] text-slate-400">Student Project (Completed 100%)</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enter Your Registered Phone Number or Email
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. +91 98200 12345 or your email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {loginError && <p className="text-xs text-rose-400">{loginError}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In &amp; View Project Status</span>
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: NEW CLIENT REGISTRATION (SAVED DIRECTLY FOR FOUNDERS) */}
        {/* ============================================================== */}
        {portalMode === 'client_register' && (
          <div className="p-6 sm:p-8 text-left max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Create New Client Account</h4>
                <p className="text-xs text-slate-400">
                  Your project details will be saved into our database for Aryan, Asad, Ahmed, and Taquee.
                </p>
              </div>
              <button
                onClick={() => setPortalMode('client_login')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Already registered? Sign In
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 mb-3">
                <button
                  type="button"
                  onClick={() => setRegRole('shop')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    regRole === 'shop' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Shop / Business Client
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('student')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    regRole === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  College Student Project
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 8976121102"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {regRole === 'shop' ? 'Shop / Business Name' : 'College / University Name'}
                  </label>
                  <input
                    type="text"
                    value={regBusinessOrCollege}
                    onChange={(e) => setRegBusinessOrCollege(e.target.value)}
                    placeholder={regRole === 'shop' ? 'e.g. Royal Jewellery Showroom' : 'e.g. Delhi Technical Campus'}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title / Required Website or App
                </label>
                <input
                  type="text"
                  value={regProjectTitle}
                  onChange={(e) => setRegProjectTitle(e.target.value)}
                  placeholder={regRole === 'shop' ? 'e.g. Jewellery Live Gold Rate & Catalog App' : 'e.g. AI Attendance System with IEEE Report'}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Requirements or Deadline
                </label>
                <textarea
                  value={regNotes}
                  onChange={(e) => setRegNotes(e.target.value)}
                  placeholder="Tell us what you need..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Save Account &amp; Access Dashboard</span>
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: ACTIVE CLIENT PROJECT DASHBOARD */}
        {/* ============================================================== */}
        {portalMode === 'client_dashboard' && activeCustomer && (
          <div className="p-6 sm:p-8 space-y-6 text-left max-h-[75vh] overflow-y-auto">
            {/* Top Status Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 font-bold">{activeCustomer.id}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400">
                    {activeCustomer.role === 'shop' ? 'Shop Retail System' : 'Academic Project'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{activeCustomer.projectTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">Client: {activeCustomer.name} ({activeCustomer.businessOrCollege})</p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-5">
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  {activeCustomer.progressPercentage}%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{activeCustomer.status}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Overall Build Status</span>
                <span className="font-mono text-amber-400">{activeCustomer.progressPercentage}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${activeCustomer.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Deliverables Section */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                <span>Deliverables &amp; Code Archives:</span>
                <span className="text-[11px] text-emerald-400 font-mono">Ready For Download</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: `${activeCustomer.name.replace(/\s+/g, '_')}_Source_Code.zip`, type: 'Project Source Code', size: '24.2 MB' },
                  { name: 'Official_Project_Specification.pdf', type: 'Architecture & Credentials', size: '2.1 MB' },
                  { name: 'A3T_Invoice_TaxReceipt.pdf', type: 'Official Invoice', size: '380 KB' },
                  { name: 'Deployment_Guide_Readme.txt', type: 'Setup Instructions', size: '45 KB' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Code2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-white truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.type} · {item.size}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDemo(item.name)}
                      className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
                      title="Download Deliverable"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact with the 4 CEOs */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">Direct Line to Aryan, Asad, Ahmed &amp; Taquee:</span>
                <p className="text-[11px] text-slate-300">Have questions about your project progress? Message us anytime.</p>
              </div>

              <a
                href={getWhatsAppUrl(`Hi Aryan, Asad, Ahmed & Taquee! I am checking my project ${activeCustomer.id} (${activeCustomer.projectTitle}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-all shadow flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp the 4 CEOs</span>
              </a>
            </div>

            {/* Revision Request Form */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Request a Revision or Modification:
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">
                Need color changes, extra fields, or faculty feedback incorporated?
              </p>

              {revisionSubmitted ? (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Revision request sent to the 4 CEOs!</span>
                </div>
              ) : (
                <form onSubmit={handleSendRevision} className="space-y-3">
                  <textarea
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Describe the exact changes you want..."
                    rows={2}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                    required
                  />
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                    >
                      Submit Revision
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
