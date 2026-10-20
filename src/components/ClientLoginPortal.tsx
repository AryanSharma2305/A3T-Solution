import React, { useState } from 'react';
import { 
  X, LogIn, Lock, Mail, Store, GraduationCap, CheckCircle2, 
  Download, AlertCircle, MessageSquare, ChevronRight, Code2, 
  ShieldCheck, RefreshCw, Phone, Users, Trash2, Edit3, ArrowRight, 
  Sparkles, UserPlus, Database, Search, Shield, Settings2, Save, FileSpreadsheet
} from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { A3TLogo } from './A3TLogo';
import { CustomerAccount } from '../types';

interface ClientLoginPortalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAdminMode?: boolean;
}

export const ClientLoginPortal: React.FC<ClientLoginPortalProps> = ({ 
  isOpen, 
  onClose,
  defaultAdminMode = false,
}) => {
  const { 
    contactInfo,
    getWhatsAppUrl, 
    activeCustomer, 
    isAdminLoggedIn,
    adminPin,
    loginDatabase,
    registeredCustomers,
    isLoadingLogs,
    loginAsUser, 
    registerUser, 
    updateUserPhoneNumber,
    logoutUser, 
    loginAsAdmin, 
    logoutAdmin,
    updateOfficialContact,
    refreshLoginDatabase,
    updateCustomerStatus,
  } = useContact();

  const [portalTab, setPortalTab] = useState<'user' | 'admin'>(
    defaultAdminMode || isAdminLoggedIn ? 'admin' : (activeCustomer ? 'user' : 'user')
  );

  // User Login & Registration form state
  const [userMode, setUserMode] = useState<'signin' | 'signup'>(activeCustomer ? 'signin' : 'signin');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [userLoginError, setUserLoginError] = useState('');
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  // New Registration state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<'shop' | 'student'>('shop');
  const [regBusinessOrCollege, setRegBusinessOrCollege] = useState('');
  const [regProjectTitle, setRegProjectTitle] = useState('');
  const [regNotes, setRegNotes] = useState('');

  // User Profile Phone Edit state
  const [isEditingUserPhone, setIsEditingUserPhone] = useState(false);
  const [newUserPhoneInput, setNewUserPhoneInput] = useState('');
  const [userPhoneUpdateMsg, setUserPhoneUpdateMsg] = useState('');

  // Revision request state
  const [revisionNote, setRevisionNote] = useState('');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);

  // Admin PIN Login state
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminPinError, setAdminPinError] = useState('');
  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'database' | 'official_numbers' | 'clients'>('database');

  // Admin Official Contact Edit form state
  const [adminContactForm, setAdminContactForm] = useState({
    phone: contactInfo.phone,
    whatsapp: contactInfo.whatsapp,
    instagram: contactInfo.instagram,
    youtube: contactInfo.youtube,
    email: contactInfo.email,
    location: contactInfo.location,
  });
  const [adminSaveSuccess, setAdminSaveSuccess] = useState(false);

  // Database search / filter
  const [dbSearch, setDbSearch] = useState('');
  const [dbRoleFilter, setDbRoleFilter] = useState<'all' | 'user' | 'admin'>('all');

  if (!isOpen) return null;

  // Handle User Sign In
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserLoginError('');
    if (!userIdentifier.trim()) return;

    setIsSubmittingUser(true);
    const result = await loginAsUser(userIdentifier.trim());
    setIsSubmittingUser(false);

    if (!result.success) {
      setUserLoginError(result.error || 'Account not found. Please register as a new client below.');
    }
  };

  // Handle User Registration
  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;

    setIsSubmittingUser(true);
    const result = await registerUser({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      role: regRole,
      businessOrCollege: regBusinessOrCollege.trim(),
      projectTitle: regProjectTitle.trim(),
      notes: regNotes.trim(),
    });
    setIsSubmittingUser(false);

    if (!result.success) {
      setUserLoginError(result.error || 'Registration failed');
    }
  };

  // 1-Click Quick Demo for client testing
  const handleDemoUser = async (demoTargetPhone: string) => {
    setUserLoginError('');
    setIsSubmittingUser(true);
    await loginAsUser(demoTargetPhone);
    setIsSubmittingUser(false);
  };

  // Handle User Updating Their Personal Phone Number
  const handleSaveUserPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserPhoneInput.trim()) return;

    const result = await updateUserPhoneNumber(newUserPhoneInput.trim());
    if (result.success) {
      setUserPhoneUpdateMsg('Your phone number has been updated!');
      setIsEditingUserPhone(false);
      setTimeout(() => setUserPhoneUpdateMsg(''), 3000);
    } else {
      setUserPhoneUpdateMsg(result.error || 'Failed to update phone number');
    }
  };

  // Handle Admin PIN Unlock
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPinError('');
    if (!adminPinInput.trim()) return;

    setIsSubmittingAdmin(true);
    const result = await loginAsAdmin(adminPinInput.trim());
    setIsSubmittingAdmin(false);

    if (!result.success) {
      setAdminPinError(result.error || 'Access Denied. Incorrect Admin PIN.');
    } else {
      // Sync form with current contactInfo
      setAdminContactForm({
        phone: contactInfo.phone,
        whatsapp: contactInfo.whatsapp,
        instagram: contactInfo.instagram,
        youtube: contactInfo.youtube,
        email: contactInfo.email,
        location: contactInfo.location,
      });
    }
  };

  // Handle Admin Saving Official Business Contact Numbers
  const handleSaveOfficialNumbers = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateOfficialContact(adminContactForm, adminPinInput || adminPin || 'A3T BEST');
    if (result.success) {
      setAdminSaveSuccess(true);
      setTimeout(() => setAdminSaveSuccess(false), 2500);
    }
  };

  // Filter login database
  const filteredLogins = loginDatabase.filter((record) => {
    const matchesRole = dbRoleFilter === 'all' || record.role === dbRoleFilter;
    const query = dbSearch.toLowerCase();
    const matchesSearch =
      !query ||
      record.identifier.toLowerCase().includes(query) ||
      (record.clientName && record.clientName.toLowerCase().includes(query)) ||
      record.action.toLowerCase().includes(query) ||
      (record.ip && record.ip.includes(query));
    return matchesRole && matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'Role', 'Identifier', 'Client Name', 'IP', 'Action'];
    const rows = filteredLogins.map((l) => [
      l.id,
      l.timestamp,
      l.role,
      `"${l.identifier}"`,
      `"${l.clientName || 'N/A'}"`,
      `"${l.ip || '127.0.0.1'}"`,
      `"${l.action.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `a3t_login_database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadDeliverable = (fileName: string) => {
    const blob = new Blob([
      `A3T Solutions Official Production Deliverable\nProject: ${activeCustomer?.projectTitle}\nClient: ${activeCustomer?.name}\nFile: ${fileName}\n\nEngineered by A3T Solutions Core Technical Team.\nOfficial Support WhatsApp: ${contactInfo.whatsapp}`,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-auto text-left">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <A3TLogo size="sm" showText={false} />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>A3T Solutions Access Gateway</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {portalTab === 'admin' ? 'Admin Portal' : 'User / Client Portal'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {portalTab === 'admin'
                  ? 'Founding Team Management & Login Database'
                  : activeCustomer
                  ? `Active Client: ${activeCustomer.name}`
                  : 'Track project milestones, download deliverables, or submit updates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Top Switcher: User Login vs Admin Login */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setPortalTab('user')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  portalTab === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>User Login</span>
              </button>

              <button
                onClick={() => setPortalTab('admin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  portalTab === 'admin'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin Login</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: USER / CLIENT PORTAL */}
        {/* ============================================================== */}
        {portalTab === 'user' && (
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {/* If Client is Logged In -> Show Dashboard */}
            {activeCustomer ? (
              <div className="space-y-6">
                {/* User Top Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{activeCustomer.id}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-400">
                        {activeCustomer.role === 'shop' ? 'Shop Retail System' : 'Academic Capstone Project'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{activeCustomer.projectTitle}</h3>
                    <div className="text-xs text-slate-400">
                      Organization: <strong className="text-slate-200">{activeCustomer.businessOrCollege}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:border-l sm:border-slate-800 sm:pl-5">
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                        {activeCustomer.progressPercentage}%
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{activeCustomer.status}</div>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="text-xs text-slate-400 hover:text-rose-400 border border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-900 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>

                {/* USER NUMBER EDIT SECTION: "in user edit number" */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-cyan-400" />
                        <span>Your Contact Phone Number (For Project Updates & SMS Alerts)</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Update your personal phone number where our team sends milestone notifications. (Official company numbers are configured in Admin Login).
                      </p>
                    </div>

                    {!isEditingUserPhone && (
                      <button
                        onClick={() => {
                          setNewUserPhoneInput(activeCustomer.phone);
                          setIsEditingUserPhone(true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors shrink-0"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit My Number</span>
                      </button>
                    )}
                  </div>

                  {userPhoneUpdateMsg && (
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-2 text-xs text-cyan-300 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                      <span>{userPhoneUpdateMsg}</span>
                    </div>
                  )}

                  {isEditingUserPhone ? (
                    <form onSubmit={handleSaveUserPhone} className="flex flex-col sm:flex-row gap-2.5 items-center">
                      <div className="relative flex-1 w-full">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={newUserPhoneInput}
                          onChange={(e) => setNewUserPhoneInput(e.target.value)}
                          placeholder="+91 98200 12345"
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                          autoFocus
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="submit"
                          className="flex-1 sm:flex-none rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors"
                        >
                          Save New Number
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingUserPhone(false)}
                          className="rounded-xl border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-slate-500">Current Registered Phone:</span>
                      <span className="font-mono font-bold text-cyan-300">{activeCustomer.phone}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">Email: {activeCustomer.email}</span>
                    </div>
                  )}
                </div>

                {/* Build Status Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Overall Project Completion</span>
                    <span className="font-mono text-cyan-400">{activeCustomer.progressPercentage}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${activeCustomer.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Deliverables Section */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                    <span>Deliverables &amp; Code Packages:</span>
                    <span className="text-[11px] text-cyan-400 font-mono">Ready For Download</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { name: `${activeCustomer.name.replace(/\s+/g, '_')}_Source_Code.zip`, type: 'Project Source Code', size: '24.2 MB' },
                      { name: 'System_Architecture_Specs.pdf', type: 'Design & Database Models', size: '2.1 MB' },
                      { name: 'Deployment_Credentials_Setup.txt', type: 'Hosting Access Guide', size: '45 KB' },
                      { name: 'A3T_Invoice_TaxReceipt.pdf', type: 'Official Project Invoice', size: '380 KB' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Code2 className="h-4 w-4 text-cyan-400 shrink-0" />
                          <div className="truncate">
                            <div className="font-semibold text-white truncate">{item.name}</div>
                            <div className="text-[10px] text-slate-400">{item.type} · {item.size}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadDeliverable(item.name)}
                          className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-slate-300 transition-colors"
                          title="Download Deliverable"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Team WhatsApp Chat */}
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 block">Direct Channel with the Engineering Team:</span>
                    <p className="text-[11px] text-slate-300">
                      Need live assistance or have milestone feedback? Message us directly anytime.
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Hi A3T Solutions! I am checking my active project ${activeCustomer.id} (${activeCustomer.projectTitle}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-all shadow flex items-center gap-1.5 shrink-0"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp Our Team</span>
                  </a>
                </div>

                {/* Submit Revision */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Submit Revision or Feature Request:
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Need design tweaks, extra fields, or faculty feedback incorporated into your build?
                  </p>

                  {revisionSubmitted ? (
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-3 text-xs text-cyan-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                      <span>Revision request logged directly for the engineering team!</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!revisionNote.trim()) return;
                        setRevisionSubmitted(true);
                        setTimeout(() => {
                          setRevisionNote('');
                          setRevisionSubmitted(false);
                        }, 2500);
                      }}
                      className="space-y-3"
                    >
                      <textarea
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        placeholder="Detail the exact modifications or features you need..."
                        rows={2}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        required
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors"
                        >
                          Submit Revision Note
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : userMode === 'signin' ? (
              /* User Sign In Screen */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">Client Project Sign In</h4>
                    <p className="text-xs text-slate-400">
                      Sign in with your registered phone number or email to access your live build.
                    </p>
                  </div>
                  <button
                    onClick={() => setUserMode('signup')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>New Client? Register Here</span>
                  </button>
                </div>

                {/* Instant 1-Click Demo Buttons */}
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4">
                  <span className="text-xs font-bold text-cyan-400 block mb-2">
                    1-Click Instant Demo Login:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleDemoUser('+91 98200 12345')}
                      className="flex items-center justify-between p-3 rounded-xl border border-cyan-500/30 bg-slate-950 hover:bg-slate-900 text-xs text-left text-cyan-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-cyan-400" />
                        <div>
                          <div className="font-bold">Royal Heritage Jewellers</div>
                          <div className="text-[10px] text-slate-400">Shop System (In-Progress 80%)</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDemoUser('+91 97654 32109')}
                      className="flex items-center justify-between p-3 rounded-xl border border-blue-500/30 bg-slate-950 hover:bg-slate-900 text-xs text-left text-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        <div>
                          <div className="font-bold">Rahul Sharma (B.Tech AI)</div>
                          <div className="text-[10px] text-slate-400">Academic Project (Completed 100%)</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Enter Your Phone Number or Client Email
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        value={userIdentifier}
                        onChange={(e) => setUserIdentifier(e.target.value)}
                        placeholder="e.g. +91 98200 12345 or client@example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  {userLoginError && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{userLoginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingUser}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 text-xs font-bold text-slate-950 hover:from-cyan-300 hover:to-blue-500 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>{isSubmittingUser ? 'Signing In...' : 'Sign In to Project Tracker'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* User Sign Up Screen */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white">Create New Client Account</h4>
                    <p className="text-xs text-slate-400">
                      Your details are recorded in our central database for our development team.
                    </p>
                  </div>
                  <button
                    onClick={() => setUserMode('signin')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Already registered? Sign In
                  </button>
                </div>

                <form onSubmit={handleUserRegister} className="space-y-3.5">
                  <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setRegRole('shop')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        regRole === 'shop' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Retail Shop Owner
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        regRole === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      College Student
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {regRole === 'shop' ? 'Shop / Business Name' : 'College / University'}
                      </label>
                      <input
                        type="text"
                        value={regBusinessOrCollege}
                        onChange={(e) => setRegBusinessOrCollege(e.target.value)}
                        placeholder={regRole === 'shop' ? 'e.g. New Fashion Boutique' : 'e.g. Mumbai Technical College'}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
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
                      placeholder={regRole === 'shop' ? 'e.g. Retail POS & WhatsApp Showroom' : 'e.g. AI Deep Learning Classifier with Complete Report'}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingUser}
                    className="w-full rounded-xl bg-cyan-400 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isSubmittingUser ? 'Saving...' : 'Register Account & Enter Portal'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ADMIN PORTAL (PROTECTED BY PIN) */}
        {/* ============================================================== */}
        {portalTab === 'admin' && (
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {!isAdminLoggedIn ? (
              /* Admin PIN Gate */
              <div className="max-w-md mx-auto py-8 text-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto border border-cyan-500/20">
                  <Lock className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Administrator Secure Gate</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter the Founders Security PIN to access the Login Database and Official Numbers configuration.
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter Admin Security Passkey"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full text-center tracking-widest text-base font-mono rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    autoFocus
                    required
                  />

                  {adminPinError && (
                    <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
                      {adminPinError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingAdmin}
                    className="w-full rounded-xl bg-cyan-400 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow"
                  >
                    {isSubmittingAdmin ? 'Verifying...' : 'Unlock Admin Console'}
                  </button>
                </form>

                <p className="text-[11px] text-slate-500">
                  Protected system route · Activity logged in central database
                </p>
              </div>
            ) : (
              /* Admin Unlocked Management Console */
              <div className="space-y-6">
                {/* Admin Subnav */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdminActiveTab('database')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        adminActiveTab === 'database'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Database className="h-3.5 w-3.5" />
                      <span>Access Login Database ({loginDatabase.length})</span>
                    </button>

                    <button
                      onClick={() => setAdminActiveTab('official_numbers')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        adminActiveTab === 'official_numbers'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Settings2 className="h-3.5 w-3.5" />
                      <span>Configure Official Numbers</span>
                    </button>

                    <button
                      onClick={() => setAdminActiveTab('clients')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        adminActiveTab === 'clients'
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span>Clients &amp; Inquiries ({registeredCustomers.length})</span>
                    </button>
                  </div>

                  <button
                    onClick={logoutAdmin}
                    className="text-xs text-rose-400 hover:text-white px-3 py-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500/20"
                  >
                    Lock Admin
                  </button>
                </div>

                {/* ========================================================= */}
                {/* SUBTAB A: ACCESS LOGIN DATABASE */}
                {/* ========================================================= */}
                {adminActiveTab === 'database' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Database className="h-4 w-4 text-cyan-400" />
                          <span>Persistent Authentication &amp; Audit Log Database</span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          Records who is logging in, IP, device user-agent, and activity across user and admin sessions.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={refreshLoginDatabase}
                          className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                          title="Refresh Database"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${isLoadingLogs ? 'animate-spin' : ''}`} />
                          <span>Refresh</span>
                        </button>

                        <button
                          onClick={handleExportCsv}
                          className="flex items-center gap-1 rounded-lg bg-cyan-400 text-slate-950 px-3 py-1.5 text-xs font-bold hover:bg-cyan-300"
                        >
                          <FileSpreadsheet className="h-3.5 w-3.5" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                        <input
                          type="text"
                          value={dbSearch}
                          onChange={(e) => setDbSearch(e.target.value)}
                          placeholder="Search logins by phone, email, client name, or IP..."
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        {(['all', 'user', 'admin'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setDbRoleFilter(r)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize ${
                              dbRoleFilter === r
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Log Database Records Table */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                          <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 font-mono border-b border-slate-800">
                            <tr>
                              <th className="py-2.5 px-3">Timestamp</th>
                              <th className="py-2.5 px-3">Role</th>
                              <th className="py-2.5 px-3">Identifier / Client</th>
                              <th className="py-2.5 px-3">Action Details</th>
                              <th className="py-2.5 px-3">IP Address</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-sans">
                            {filteredLogins.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-500">
                                  No login records match the search filter.
                                </td>
                              </tr>
                            ) : (
                              filteredLogins.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-900/40 transition-colors">
                                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                    {new Date(record.timestamp).toLocaleString('en-IN', {
                                      dateStyle: 'short',
                                      timeStyle: 'short',
                                    })}
                                  </td>
                                  <td className="py-2.5 px-3 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                        record.role === 'admin'
                                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                                      }`}
                                    >
                                      {record.role}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="font-semibold text-white">
                                      {record.clientName || record.identifier}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-mono">
                                      {record.identifier}
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate">
                                    {record.action}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                    {record.ip || '127.0.0.1'}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* SUBTAB B: CONFIGURE OFFICIAL NUMBERS & HANDLES */}
                {/* ========================================================= */}
                {adminActiveTab === 'official_numbers' && (
                  <form onSubmit={handleSaveOfficialNumbers} className="space-y-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Settings2 className="h-4 w-4 text-cyan-400" />
                        <span>Official Business Contact Numbers &amp; Social Channels</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Changes made here update the official contact info across the entire website and are stored in the server database.
                      </p>
                    </div>

                    {adminSaveSuccess && (
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Official company numbers and social handles updated successfully!</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Official Call Phone Number
                        </label>
                        <input
                          type="text"
                          value={adminContactForm.phone}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Official WhatsApp Number (with country code)
                        </label>
                        <input
                          type="text"
                          value={adminContactForm.whatsapp}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, whatsapp: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Instagram */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Instagram Handle
                        </label>
                        <input
                          type="text"
                          value={adminContactForm.instagram}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, instagram: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                        />
                      </div>

                      {/* YouTube */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          YouTube Channel Link
                        </label>
                        <input
                          type="url"
                          value={adminContactForm.youtube}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, youtube: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Business Inquiries Email
                        </label>
                        <input
                          type="email"
                          value={adminContactForm.email}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, email: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                          required
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Coverage Area / Operational Base
                        </label>
                        <input
                          type="text"
                          value={adminContactForm.location}
                          onChange={(e) => setAdminContactForm({ ...adminContactForm, location: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save &amp; Broadcast Official Numbers</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* ========================================================= */}
                {/* SUBTAB C: CLIENTS & INQUIRIES */}
                {/* ========================================================= */}
                {adminActiveTab === 'clients' && (
                  <div className="space-y-3">
                    {registeredCustomers.map((cust) => (
                      <div
                        key={cust.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-cyan-400 font-bold">{cust.id}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-xs font-bold text-white">{cust.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300">
                              {cust.role === 'shop' ? 'Shop' : 'Student'}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                              {cust.status} ({cust.progressPercentage}%)
                            </span>
                          </div>
                          <div className="text-xs text-slate-300">{cust.projectTitle}</div>
                          <div className="text-[11px] text-slate-500">
                            {cust.businessOrCollege} · Phone: <strong className="text-slate-300 font-mono">{cust.phone}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`https://wa.me/${cust.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hello ${cust.name}! This is the A3T Solutions technical team regarding your project ${cust.id}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition-all"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <select
                            value={cust.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as CustomerAccount['status'];
                              const newProg =
                                newStatus === 'Completed'
                                  ? 100
                                  : newStatus === 'Delivered'
                                  ? 90
                                  : newStatus === 'In Progress'
                                  ? 60
                                  : 15;
                              updateCustomerStatus(cust.id, newStatus, newProg);
                            }}
                            className="rounded-xl border border-slate-700 bg-slate-900 text-xs py-1.5 px-2 text-slate-200"
                          >
                            <option value="New Inquiry">New Inquiry</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
