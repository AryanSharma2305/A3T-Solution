import React, { useState } from 'react';
import { ContactProvider, useContact } from './context/ContactContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Solutions3DCarousel } from './components/Solutions3DCarousel';
import { A3TVideoShowcase } from './components/A3TVideoShowcase';
import { ShopSolutions } from './components/ShopSolutions';
import { StudentProjectHub } from './components/StudentProjectHub';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClientLoginPortal } from './components/ClientLoginPortal';
import { EditContactModal } from './components/EditContactModal';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { MessageSquare, LogIn, Sparkles, Shield, Layers } from 'lucide-react';

function MainAppContent() {
  const { getWhatsAppUrl, setIsEditModalOpen, activeCustomer, isAdminLoggedIn } = useContact();

  // Modals state
  const [isLoginPortalOpen, setIsLoginPortalOpen] = useState(false);
  const [loginPortalDefaultAdmin, setLoginPortalDefaultAdmin] = useState(false);
  const [isProjectRequestOpen, setIsProjectRequestOpen] = useState(false);
  const [selectedStudentTopic, setSelectedStudentTopic] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  const handleOpenUserLogin = () => {
    setLoginPortalDefaultAdmin(false);
    setIsLoginPortalOpen(true);
  };

  const handleOpenAdminLogin = () => {
    setLoginPortalDefaultAdmin(true);
    setIsLoginPortalOpen(true);
  };

  const handleOpenStudentProjectModal = (topic?: string) => {
    setSelectedStudentTopic(topic || '');
    setIsProjectRequestOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Banner Notice: Clean and professional without personal name clutter or CEO labels */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-blue-950/60 py-1.5 px-4 text-center text-[11px] text-cyan-300 font-medium">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            ⚡ A3T Solutions: High-performance software, web and academic engineering by our dedicated team · Fast 3–7 day delivery
          </span>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenUserLogin={handleOpenUserLogin}
        onOpenAdminLogin={handleOpenAdminLogin}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onConsultClick={() => handleScrollToSection('contact')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToCarousel={() => handleScrollToSection('solutions-carousel')}
          onScrollToShops={() => handleScrollToSection('services-shop')}
          onScrollToStudents={() => handleScrollToSection('services-student')}
          onScrollToVideo={() => handleScrollToSection('video-showcase')}
        />

        {/* 3D Sliding Card Carousel Showcase */}
        <Solutions3DCarousel />

        {/* Video Showcase Section: Embedding the user's uploaded 3D video & concept transformation */}
        <section id="video-showcase" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>OFFICIAL VIDEO SHOWCASE</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                A3T Solutions in Motion
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Explore our Google search discovery, official 3D brand film, and turnkey build workflow.
              </p>
            </div>

            <A3TVideoShowcase onConsultClick={() => handleScrollToSection('contact')} />
          </div>
        </section>

        {/* Local Retail & Shop Solutions */}
        <ShopSolutions onConsultShop={() => handleScrollToSection('contact')} />

        {/* College & University Student Project Hub */}
        <StudentProjectHub onOpenProjectRequest={handleOpenStudentProjectModal} />

        {/* The 4 Co-Founders & Multidisciplinary Technical Team (Without CEO title, with proper names and roles) */}
        <TeamSection />

        {/* Contact Us: Direct hotline, WhatsApp, Instagram, YouTube & Inquiry Form */}
        <ContactSection onOpenAdminConfig={() => setIsEditModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenUserLogin={handleOpenUserLogin}
        onOpenAdminLogin={handleOpenAdminLogin}
      />

      {/* Floating Action Quick Access (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Admin Login Quick Floating Button */}
        <button
          onClick={handleOpenAdminLogin}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md transition-all ${
            isAdminLoggedIn
              ? 'border-cyan-500/60 bg-cyan-950/90 text-cyan-300'
              : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
          }`}
          title="Access Admin Console & Login Database"
        >
          <Shield className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{isAdminLoggedIn ? 'Admin Active' : 'Admin Login'}</span>
        </button>

        {/* Client Portal quick floating pill */}
        <button
          onClick={handleOpenUserLogin}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md transition-all ${
            activeCustomer
              ? 'border-emerald-500/50 bg-emerald-950/90 text-emerald-300'
              : 'border-slate-800 bg-slate-900/90 text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800'
          }`}
        >
          <LogIn className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {activeCustomer ? `${activeCustomer.name.split(' ')[0]} (Project)` : 'Client Portal'}
          </span>
        </button>

        {/* WhatsApp Direct Floating Button */}
        <a
          href={getWhatsAppUrl("Hi A3T Solutions! I want to consult on a web/app software project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-2xl hover:bg-emerald-500 hover:scale-105 transition-all group"
          title="Direct WhatsApp"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5 fill-current" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
            </span>
          </div>
          <span className="font-sans">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Global Modals */}
      <ClientLoginPortal
        isOpen={isLoginPortalOpen}
        onClose={() => setIsLoginPortalOpen(false)}
        defaultAdminMode={loginPortalDefaultAdmin}
      />

      <EditContactModal />

      <ProjectRequestModal
        isOpen={isProjectRequestOpen}
        onClose={() => setIsProjectRequestOpen(false)}
        initialTopic={selectedStudentTopic}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <MainAppContent />
    </ContactProvider>
  );
}
