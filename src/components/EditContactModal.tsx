import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Instagram, Youtube, Mail, MapPin, CheckCircle, Save, Lock, ShieldAlert } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export const EditContactModal: React.FC = () => {
  const { contactInfo, updateOfficialContact, isEditModalOpen, setIsEditModalOpen, isAdminLoggedIn, loginAsAdmin } = useContact();

  const [formData, setFormData] = useState({
    phone: contactInfo.phone,
    whatsapp: contactInfo.whatsapp,
    instagram: contactInfo.instagram,
    youtube: contactInfo.youtube,
    email: contactInfo.email,
    location: contactInfo.location,
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
      setPinInput('');
      setPinError('');
    }
  }, [isEditModalOpen, contactInfo]);

  if (!isEditModalOpen) return null;

  const handleAdminVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    const res = await loginAsAdmin(pinInput.trim());
    setIsVerifying(false);
    if (!res.success) {
      setPinError('Access Denied. Only Admin can configure official company numbers.');
    } else {
      setPinError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateOfficialContact(formData, pinInput || 'A3T BEST');
    if (res.success) {
      setShowSavedFeedback(true);
      setTimeout(() => {
        setShowSavedFeedback(false);
        setIsEditModalOpen(false);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isAdminLoggedIn ? 'Configure Official Company Numbers' : 'Admin Authorization Required'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAdminLoggedIn
                  ? 'Broadcasts official contact across the website'
                  : 'Restricted to Admin Login'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* If Admin is NOT logged in -> Show PIN prompt */}
        {!isAdminLoggedIn ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Admin Security Verification</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                Enter your Admin PIN to configure official company numbers. (Users can update personal numbers in the User Portal).
              </p>
            </div>

            <form onSubmit={handleAdminVerify} className="space-y-3 max-w-sm mx-auto">
              <div>
                <input
                  type="password"
                  placeholder="Enter Admin Security Passkey"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  className="w-full text-center tracking-widest text-base font-mono rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  autoFocus
                  required
                />
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-xl">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full rounded-xl bg-cyan-400 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow"
              >
                {isVerifying ? 'Verifying...' : 'Unlock Official Configuration'}
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED FORM */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left max-h-[68vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 rounded-xl text-xs text-cyan-300 font-medium">
              <span>Admin credentials active · Modifying official channels</span>
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Instagram Handle
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="a3tsolutions2305"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                YouTube Channel Link
              </label>
              <div className="relative">
                <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-red-500" />
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder="https://www.youtube.com/channel/..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Business Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aryanmsharma23@gmail.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                {showSavedFeedback ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-slate-950" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Official Numbers</span>
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
