import React, { useState } from 'react';
import { X, Phone, MessageSquare, Instagram, Youtube, Mail, MapPin, CheckCircle, Save } from 'lucide-react';
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

  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  if (!isEditModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      setIsEditModalOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Configure Official Contact Numbers</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Updated by Aryan Sharma, Asad Qureshi, Ahmed Shaikh, and Taquee Shaikh.
            </p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
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
              Instagram Handle or Profile (e.g. a3tsolutions2305)
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

          {/* YouTube Channel (Replaced Facebook) */}
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
                placeholder="https://www.youtube.com/channel/..."
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

          <div className="mt-6 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
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
      </div>
    </div>
  );
};
