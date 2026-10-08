import React, { useState } from 'react';
import { Phone, LogIn, Menu, X, Settings2, UserCheck } from 'lucide-react';
import { A3TLogo } from './A3TLogo';
import { useContact } from '../context/ContactContext';

interface NavbarProps {
  onOpenLogin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  activeSection,
  setActiveSection,
  onOpenQuote,
}) => {
  const { contactInfo, getPhoneUrl, setIsEditModalOpen, activeCustomer } = useContact();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'services-shop', label: 'Shop Solutions' },
    { id: 'services-student', label: 'College Projects' },
    { id: 'estimator', label: 'Cost Calculator' },
    { id: 'team', label: 'Our 4 Founders' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center transition-opacity hover:opacity-95"
        >
          <A3TLogo size="sm" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium transition-colors hover:text-amber-300 relative py-1 ${
                activeSection === link.id ? 'text-amber-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick contact edit trigger button for owners */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-400 hover:text-amber-300 hover:border-slate-700 transition-colors"
            title="Configure Contact Numbers & Handles"
          >
            <Settings2 className="h-3.5 w-3.5" />
            <span className="text-[11px]">Edit Numbers</span>
          </button>

          {/* Direct Phone Call */}
          <a
            href={getPhoneUrl()}
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-amber-400 transition-colors px-2 py-1"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono tabular-nums">{contactInfo.phone}</span>
          </a>

          {/* Login / Client & Student Portal Button */}
          <button
            onClick={onOpenLogin}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeCustomer
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50'
            }`}
          >
            {activeCustomer ? (
              <>
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="max-w-[120px] truncate">{activeCustomer.name.split(' ')[0]} (Portal)</span>
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5" />
                <span>Portal / Login</span>
              </>
            )}
          </button>

          {/* Request Quote Button */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/10 hover:from-amber-400 hover:to-amber-500 transition-all whitespace-nowrap"
          >
            Get Quote
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 px-3 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-900 flex flex-col gap-2.5">
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-2 text-xs font-semibold text-amber-400 p-2 rounded-lg bg-slate-900"
            >
              <Phone className="h-4 w-4" />
              <span>Call Us: {contactInfo.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEditModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 py-2 text-xs text-slate-300"
            >
              <Settings2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Configure Phone / Social Handles</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 shadow"
            >
              Request Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
