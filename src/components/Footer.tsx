import React from 'react';
import { Phone, MessageSquare, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { A3TLogo } from './A3TLogo';
import { useContact } from '../context/ContactContext';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin, onOpenQuote }) => {
  const { contactInfo, getPhoneUrl, getWhatsAppUrl, getInstagramUrl, getYoutubeUrl } = useContact();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-14 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <A3TLogo size="md" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A3T Solutions is an engineering company founded by 4 equal CEOs: Aryan Sharma, Asad Qureshi, Ahmed Shaikh, and Taquee Shaikh. We deliver modern websites, mobile apps, and billing software for retail shops and college semester projects.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={getPhoneUrl()}
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors"
                title="Call Phone"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href={getInstagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={getYoutubeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                title="YouTube Channel"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Solutions */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Retail Shop Tech</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services-shop" className="hover:text-amber-400 transition-colors">Jewellery Showrooms</a></li>
              <li><a href="#services-shop" className="hover:text-amber-400 transition-colors">Medical Pharmacies</a></li>
              <li><a href="#services-shop" className="hover:text-amber-400 transition-colors">Salons & Spas</a></li>
              <li><a href="#services-shop" className="hover:text-amber-400 transition-colors">General Stores & Kirana</a></li>
              <li><a href="#services-shop" className="hover:text-amber-400 transition-colors">Barcode Billing POS</a></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">College Projects</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services-student" className="hover:text-blue-400 transition-colors">Final Year Major Projects</a></li>
              <li><a href="#services-student" className="hover:text-blue-400 transition-colors">B.Tech / BCA / MCA</a></li>
              <li><a href="#services-student" className="hover:text-blue-400 transition-colors">Full-Stack MERN & Python</a></li>
              <li><a href="#services-student" className="hover:text-blue-400 transition-colors">IEEE Reports & Synopsis</a></li>
              <li><a href="#services-student" className="hover:text-blue-400 transition-colors">Viva Defense Preparation</a></li>
            </ul>
          </div>

          {/* Direct Access */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Quick Actions</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenLogin} className="hover:text-amber-400 transition-colors text-left">
                  Client &amp; Student Portal Login
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-amber-400 transition-colors text-left">
                  Instant Cost Calculator
                </button>
              </li>
              <li><a href="#team" className="hover:text-amber-400 transition-colors">Meet the 4 Equal CEOs</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Information</a></li>
              <li className="pt-2">
                <span className="font-mono text-amber-400">{contactInfo.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} A3T Solutions. All rights reserved. Aryan Sharma, Asad Qureshi, Ahmed Shaikh &amp; Taquee Shaikh.
          </div>

          <div className="flex items-center gap-4">
            <a href={getYoutubeUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
              YouTube Channel
            </a>
            <span>·</span>
            <a href={getInstagramUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              Instagram @{contactInfo.instagram.replace(/^@/, '')}
            </a>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
