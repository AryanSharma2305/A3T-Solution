import React, { useState } from 'react';
import { Phone, LogIn, Menu, X, Settings2, UserCheck, Shield } from 'lucide-react';
import { A3TLogo } from './A3TLogo';
import { useContact } from '../context/ContactContext';

interface NavbarProps {
  onOpenUserLogin: () => void;
  onOpenAdminLogin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onConsultClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUserLogin,
  onOpenAdminLogin,
  activeSection,
  setActiveSection,
  onConsultClick,
}) => {
  const { contactInfo, getPhoneUrl, activeCustomer, isAdminLoggedIn } = useContact();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'solutions-carousel', label: '3D Solutions' },
    { id: 'services-shop', label: 'Shop Systems' },
    { id: 'services-student', label: 'College Projects' },
    { id: 'video-showcase', label: 'Video Showcase' },
    { id: 'team', label: 'Co-Founders' },
    { id: 'contact', label: 'Contact' },
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
        {/* Zone 1: Single element brand wordmark with new 3D logo */}
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
              className={`text-sm font-medium transition-colors hover:text-cyan-300 relative py-1 ${
                activeSection === link.id ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Direct Phone Call */}
          <a
            href={getPhoneUrl()}
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-colors px-2 py-1"
          >
            <Phone className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono tabular-nums">{contactInfo.phone}</span>
          </a>

          {/* Admin Login Button */}
          <button
            onClick={onOpenAdminLogin}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
              isAdminLoggedIn
                ? 'border-cyan-500/60 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-cyan-400 hover:border-slate-700'
            }`}
            title="Founders Admin Portal (Login Database & Official Numbers)"
          >
            <Shield className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Admin Active' : 'Admin Login'}</span>
          </button>

          {/* User / Client Login Button */}
          <button
            onClick={onOpenUserLogin}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeCustomer
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/60'
            }`}
          >
            {activeCustomer ? (
              <>
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="max-w-[110px] truncate">{activeCustomer.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5" />
                <span>User Login</span>
              </>
            )}
          </button>

          {/* Consult Team CTA */}
          <button
            onClick={onConsultClick}
            className="hidden sm:inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/15 hover:from-cyan-300 hover:to-blue-500 transition-all whitespace-nowrap"
          >
            Consult Team
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
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-fade-in text-left">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 px-3 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-900 flex flex-col gap-2.5">
            <a
              href={getPhoneUrl()}
              className="flex items-center gap-2 text-xs font-semibold text-cyan-400 p-2 rounded-lg bg-slate-900"
            >
              <Phone className="h-4 w-4" />
              <span>Call Us: {contactInfo.phone}</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUserLogin();
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 py-2.5 text-xs font-semibold text-cyan-300"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>User Login</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-xs font-semibold text-slate-200"
              >
                <Shield className="h-3.5 w-3.5 text-cyan-400" />
                <span>Admin Login</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onConsultClick();
              }}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-2.5 text-xs font-bold text-slate-950 shadow"
            >
              Consult Engineering Team
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
