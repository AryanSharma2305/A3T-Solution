import React, { useState } from 'react';
import { ContactProvider, useContact } from './context/ContactContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { A3TVideoShowcase } from './components/A3TVideoShowcase';
import { ShopSolutions } from './components/ShopSolutions';
import { StudentProjectHub } from './components/StudentProjectHub';
import { QuoteCalculator } from './components/QuoteCalculator';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClientLoginPortal } from './components/ClientLoginPortal';
import { EditContactModal } from './components/EditContactModal';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { Phone, MessageSquare, LogIn, Sparkles } from 'lucide-react';

function MainAppContent() {
  const { contactInfo, getPhoneUrl, getWhatsAppUrl } = useContact();

  // Modal visibility states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProjectRequestOpen, setIsProjectRequestOpen] = useState(false);
  const [selectedStudentTopic, setSelectedStudentTopic] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Calculator preselection states
  const [calculatorShopType, setCalculatorShopType] = useState('jewellery');

  const handleOpenQuoteForShop = (shopType: string) => {
    setCalculatorShopType(shopType);
    const element = document.getElementById('estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Notice: Highlighting direct contact with 4 equal CEOs */}
      <div className="border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 py-1.5 px-4 text-center text-[11px] text-amber-300 font-medium">
        <span>🚀 A3T Solutions: Aryan Sharma, Asad Qureshi, Ahmed Shaikh &amp; Taquee Shaikh (4 Equal CEOs) · Fast 3–7 day delivery!</span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenQuote={() => handleScrollToSection('estimator')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToShops={() => handleScrollToSection('services-shop')}
          onScrollToStudents={() => handleScrollToSection('services-student')}
          onOpenQuote={() => handleScrollToSection('estimator')}
          onScrollToVideo={() => handleScrollToSection('video-showcase')}
        />

        {/* Video Showcase Section: Interactive reproduction of user's uploaded Google Search Video */}
        <section id="video-showcase" className="relative py-12 sm:py-20 border-t border-slate-900 bg-slate-950/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>OFFICIAL VIDEO SHOWCASE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Search is Over: A3T Solutions
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Watch how clients search on Google for the best tech partner and discover A3T Solutions.
              </p>
            </div>

            <A3TVideoShowcase onGetQuoteClick={() => handleScrollToSection('estimator')} />
          </div>
        </section>

        {/* Local Retail & Shop Solutions */}
        <ShopSolutions onOpenQuote={handleOpenQuoteForShop} />

        {/* College & University Student Project Hub */}
        <StudentProjectHub onOpenProjectRequest={handleOpenStudentProjectModal} />

        {/* Interactive Cost & Timeline Calculator */}
        <QuoteCalculator initialShopType={calculatorShopType} initialTopic={selectedStudentTopic} />

        {/* The 4 Founders / Engineering Team */}
        <TeamSection />

        {/* Contact Us: Phone, WhatsApp, Instagram, Facebook */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuote={() => handleScrollToSection('estimator')}
      />

      {/* Floating Action Quick Access (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Client Portal quick floating pill */}
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-xl backdrop-blur-md hover:border-amber-500/50 hover:bg-slate-800 transition-all"
        >
          <LogIn className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Project Portal</span>
        </button>

        {/* WhatsApp Direct Floating Button */}
        <a
          href={getWhatsAppUrl("Hi A3T Solutions! I want to discuss a project.")}
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
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
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
