import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Instagram, Youtube, Mail, MapPin, CheckCircle, Save, Lock, KeyRound, ShieldAlert } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export const EditContactModal: React.FC = () => {
  const { contactInfo, updateContactInfo, isEditModalOpen, setIsEditModalOpen } = useContact();

  const [formData, setFormData] = useState({
    phone: contactInfo.phone,
    whatsapp: contactInfo.whatsapp,
    instagram: contactInfo.instagram,
    youtube: contactInfo.youtube,
    email: contactInfo.email,
    location: contactInfo.location,
  });

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // Sync form data whenever modal opens
  useEffect(() => {
    if (isEditModalOpen) {
      setFormData({
        phone: contactInfo.phone,
        whatsapp: contactInfo.whatsapp,
        instagram: contactInfo.instagram,
        youtube: contactInfo.youtube,
        email: contactInfo.email,
        location: contactInfo.location,
      });
      setIsUnlocked(false);
      setPasswordInput('');
      setPasswordError('');
    }
  }, [isEditModalOpen, contactInfo]);

  if (!isEditModalOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toUpperCase() === 'A3T') {
      setIsUnlocked(true);
      setPasswordError('');
    } else {
      setPasswordError('Access Denied. Incorrect password! Only the 4 CEOs can edit numbers.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      setIsEditModalOpen(false);
      setIsUnlocked(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              {isUnlocked ? <KeyRound className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-white">
                {isUnlocked ? 'Edit Official Numbers & Handles' : 'Founders Security Verification'}
              </h3>
              <p className="text-xs text-slate-400">
                {isUnlocked ? 'Aryan Sharma · Asad Qureshi · Ahmed Shaikh · Taquee Shaikh' : 'Protected by CEOs Password'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              setIsUnlocked(false);
            }}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* STEP 1: PASSWORD GATE (Password: A3T) */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Enter Founders Password</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                Only the 4 CEOs (A3T) have permission to change the business phone number and social media channels.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 max-w-sm mx-auto">
              <div>
                <input
                  type="password"
                  placeholder="Enter Password (A3T)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full text-center tracking-widest text-base font-mono rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  autoFocus
                  required
                />
              </div>

              {passwordError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-xl">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/10"
              >
                Verify &amp; Unlock Editor
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* STEP 2: UNLOCKED EDIT FORM */
          /* ========================================================= */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left max-h-[68vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-xs text-emerald-400 font-medium">
              <span>Password verified (A3T) · Access Granted</span>
              <button
                type="button"
                onClick={() => setIsUnlocked(false)}
                className="text-[11px] underline hover:text-white"
              >
                Lock Again
              </button>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Phone Number (Click-to-Call)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 8976121102"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Number (with country code)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-emerald-400" />
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+918976121102"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Instagram Handle (e.g. a3tsolutions2305)
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="a3tsolutions2305"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* YouTube Channel */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                YouTube Channel URL
              </label>
              <div className="relative">
                <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-red-500" />
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="https://www.youtube.com/channel/UCf6bgR4RtCCTNOJKL7-3VYQ"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aryanmsharma23@gmail.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Base Location / Service Coverage
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Pan-India / Remote & On-Site Consultation"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsUnlocked(false);
                }}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                {showSavedFeedback ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-slate-950" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Contact Details</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
