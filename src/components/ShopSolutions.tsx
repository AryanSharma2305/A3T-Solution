import React, { useState } from 'react';
import { Gem, Pill, Scissors, ShoppingCart, Sparkles, CheckCircle2, ArrowRight, MessageSquare, Smartphone, Laptop, BarChart3, Clock, ShieldCheck } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface ShopSolutionsProps {
  onOpenQuote: (shopType: string) => void;
}

export const ShopSolutions: React.FC<ShopSolutionsProps> = ({ onOpenQuote }) => {
  const { getWhatsAppUrl } = useContact();
  const [activeDemo, setActiveDemo] = useState<'jewellery' | 'medical' | 'salon' | 'general_store'>('jewellery');

  const shopTypes = [
    {
      id: 'jewellery' as const,
      title: 'Jewellery Showrooms',
      icon: Gem,
      color: 'amber',
      tagline: 'High-end digital catalog & live gold rate showcase',
      description: 'Transform your jewellery business with a luxury mobile-friendly website showcasing gold, diamond, and silver collections with direct WhatsApp inquiry.',
      features: [
        'Live 22k / 24k Gold & Silver Rate Daily Ticker',
        'High-Resolution Ornament Catalog & Collections',
        'One-Click "Order / Inquire on WhatsApp" per design',
        'Custom Bridal Jewellery Consultation Booking',
        'Customer Digital Certificate & Hallmarking verification',
        'Admin panel to easily upload new designs from mobile',
      ],
      deliverable: '5–7 Days Delivery',
    },
    {
      id: 'medical' as const,
      title: 'Medical Stores & Pharmacies',
      icon: Pill,
      color: 'emerald',
      tagline: 'Medicine inventory, expiry alerts & prescription upload',
      description: 'Run your chemist shop smoothly with automatic medicine stock alerts, digital prescription intake, and instant barcode billing.',
      features: [
        'Batch-wise Medicine Expiry Date Alerts (Zero stock wastage)',
        'Customer Prescription Photo Upload via Mobile Web',
        'Instant GST Barcode Billing with thermal printer support',
        'Low-Stock alerts for essential life-saving medicines',
        'Digital WhatsApp receipt delivery to patients',
        'Local Home Delivery order management portal',
      ],
      deliverable: '4–6 Days Delivery',
    },
    {
      id: 'salon' as const,
      title: 'Salons, Spas & Parlours',
      icon: Scissors,
      color: 'pink',
      tagline: '24/7 seat booking & automated client reminders',
      description: 'Say goodbye to missed phone calls and empty slots. Give your clients a sleek appointment booking link with stylist selection and package pricing.',
      features: [
        '24/7 Self-Service Slot & Stylist Booking System',
        'Full Service Menu with transparent pricing & packages',
        'Automated WhatsApp & SMS appointment reminders',
        'Stylist seat allocation & daily schedule organizer',
        'Before & After Portfolio gallery to attract bridal clients',
        'Client loyalty visit stamps & festival discounts',
      ],
      deliverable: '3–5 Days Delivery',
    },
    {
      id: 'general_store' as const,
      title: 'General Stores & Kirana',
      icon: ShoppingCart,
      color: 'blue',
      tagline: 'Digital Khata ledger & neighbourhood ordering app',
      description: 'Modernize your local grocery store with fast barcode scanning, digital customer credit ledger (khata), and WhatsApp order taking.',
      features: [
        'Fast 1-second Barcode POS billing on any laptop or phone',
        'Digital Customer Khata (Credit) ledger with SMS reminders',
        'WhatsApp Neighbourhood Order catalog with instant checkout',
        'Daily profit, loss, and cash collection summary reports',
        'Multi-lingual bill generation (English, Hindi, Regional)',
        'Cloud backup so your shop accounts are never lost',
      ],
      deliverable: '3–6 Days Delivery',
    },
  ];

  return (
    <section id="services-shop" className="relative py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>SHOP DIGITALIZATION SUITE</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Custom Crafted for Retailers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tech That Brings Customers & Sales to Your Shop.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Big software companies charge tens of thousands for complicated tools. A3T Solutions builds clean, ultra-fast websites and billing apps tailored specifically to your exact retail shop requirements.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => onOpenQuote('jewellery')}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/10"
            >
              <span>Get Shop Tech Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 4 Shop Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shopTypes.map((shop) => {
            const Icon = shop.icon;
            const isSelected = activeDemo === shop.id;

            return (
              <div
                key={shop.id}
                onClick={() => setActiveDemo(shop.id)}
                className={`cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500/70 bg-slate-900 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      shop.id === 'jewellery' ? 'bg-amber-500/10 text-amber-400' :
                      shop.id === 'medical' ? 'bg-emerald-500/10 text-emerald-400' :
                      shop.id === 'salon' ? 'bg-pink-500/10 text-pink-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{shop.deliverable}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{shop.title}</h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-3">{shop.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{shop.description}</p>
                </div>

                <div>
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3 mb-4">
                    {shop.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold pt-2">
                    <span className={isSelected ? 'text-amber-400' : 'text-slate-400'}>
                      {isSelected ? 'Viewing Live Preview ↓' : 'Click to Preview'}
                    </span>
                    <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-slate-400'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Interactive Prototype Simulation */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Live Functional Concept Preview</span>
              <h3 className="text-xl font-bold text-white mt-1">
                {activeDemo === 'jewellery' && 'Royal Gold & Diamond Showroom Interactive Portal'}
                {activeDemo === 'medical' && 'Apollo Care Medical & Pharmacy Management System'}
                {activeDemo === 'salon' && 'Luxe Salon & Spa 24/7 Seat Booking Engine'}
                {activeDemo === 'general_store' && 'Apna Kirana Digital POS & Neighbourhood Delivery'}
              </h3>
            </div>

            {/* Quick WhatsApp Inquiry for this prototype */}
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl(`Hi A3T Solutions! I like the ${activeDemo} shop system. Can you build this for my store?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenQuote(activeDemo)}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                Get Exact Price
              </button>
            </div>
          </div>

          {/* Prototype Display Screen */}
          {activeDemo === 'jewellery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-semibold text-amber-300">Live Gold Rate Today:</span>
                  </div>
                  <div className="font-mono text-slate-200">
                    22K: <span className="text-amber-400 font-bold">₹71,450 / 10g</span> · 24K: <span className="text-amber-400 font-bold">₹77,950</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white">What we build for your Jewellery Store:</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>High-Resolution Design Showroom:</strong> Categorized by Bridal Sets, Necklaces, Bangles, Rings, and Light-weight Daily Wear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Direct WhatsApp Order Button:</strong> Customers click on any ring or necklace, and it opens a WhatsApp message with the product image and code ready to order.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Custom Jewellery Calculator:</strong> Automatic estimation of Making Charges + Gold Weight + GST.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Simple Owner Mobile App:</strong> Click a photo from your phone camera, type the weight, and publish to your website in 10 seconds!</span>
                  </li>
                </ul>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><Laptop className="h-3.5 w-3.5 text-amber-400" /> Desktop & Mobile</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> SSL Secure & Fast Hosting</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                  <img
                    src="/src/assets/images/jewellery_retail_app_1791390860373.jpg"
                    alt="Jewellery showroom digital catalog app demo"
                    referrerPolicy="no-referrer"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4 bg-slate-950 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Royal Heritage Collection 2026</div>
                      <div className="text-[11px] text-slate-400">Auto-updating gold rates & WhatsApp catalog</div>
                    </div>
                    <span className="rounded-lg bg-amber-500/20 text-amber-300 px-2.5 py-1 text-xs font-semibold">
                      Sample Concept
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'medical' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-300">
                  <strong>Chemist Pharmacy Automation:</strong> Eliminates human errors in batch expiry and provides local home delivery ordering.
                </div>

                <h4 className="text-lg font-bold text-white">What we build for your Pharmacy:</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Automated Expiry Warning:</strong> Receive alerts 60 days before any medicine batch expires to return to distributors without loss.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Prescription Order Website:</strong> Local patients upload a photo of doctor prescription; you review, confirm medicine, and send bill via WhatsApp.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1-Click Barcode Billing:</strong> Compatible with USB/Bluetooth barcode scanners and thermal receipt printers.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-emerald-400 font-bold">PHARMACY INVENTORY MONITOR</span>
                    <span className="text-slate-400">ACTIVE: 1,420 ITEMS</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex justify-between items-center text-rose-300">
                      <div>
                        <div className="font-bold">Azithromycin 500mg (Batch #B92)</div>
                        <div className="text-[10px] text-rose-400">Expires in 28 Days · Stock: 42 Strips</div>
                      </div>
                      <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded">Action: Return to Vendor</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                      <div>
                        <div className="font-bold">Paracetamol 650mg Dolo (Batch #D14)</div>
                        <div className="text-[10px] text-emerald-400">Expiry 2028 · Stock: 310 Strips</div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded">Stock Healthy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'salon' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-pink-500/30 bg-pink-500/5 p-3 text-xs text-pink-300">
                  <strong>Zero Missed Appointments:</strong> Clients can book slots online 24/7 without calling, and get automated WhatsApp reminders.
                </div>

                <h4 className="text-lg font-bold text-white">What we build for your Salon & Spa:</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Interactive Booking Calendar:</strong> Select Haircut, Facial, Keratin, or Bridal Package, pick preferred stylist & available time-slot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Automated Reminders:</strong> Sends WhatsApp reminder 2 hours prior to the slot so customers never forget their appointment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Staff Schedule Manager:</strong> Prevent overlapping bookings; stylists see their daily client roster on their mobile phones.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-pink-400 font-bold text-xs uppercase">Client Booking Flow Preview</span>
                    <span className="text-xs text-slate-400 font-mono">10:00 AM - 08:00 PM</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-pink-500 text-slate-950 font-bold">11:00 AM (Selected)</div>
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">12:30 PM</div>
                    <div className="p-2 rounded-lg bg-slate-900/40 text-slate-600 line-through">02:00 PM (Booked)</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs space-y-1">
                    <div className="text-slate-400">Selected Service:</div>
                    <div className="text-white font-bold">Hair Spa + Deluxe Beard Styling · ₹850</div>
                    <div className="text-emerald-400 text-[11px]">Instant Confirmation via WhatsApp SMS</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'general_store' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs text-blue-300">
                  <strong>Digital Kirana Revolution:</strong> Super-fast billing on your existing laptop or mobile plus neighborhood home delivery web app.
                </div>

                <h4 className="text-lg font-bold text-white">What we build for your General Store:</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>1-Click Barcode Billing:</strong> Point barcode scanner, item adds instantly with price, quantity, and discount.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Digital Khata Ledger:</strong> Track customer credit accounts securely; send payment reminder WhatsApp messages with 1 click.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Neighbourhood Online Ordering:</strong> Local families can browse your grocery catalog and place order for 30-minute delivery.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-blue-400 font-bold">KIRANA RAPID BILLING POS</span>
                    <span className="text-emerald-400">BILL #2084</span>
                  </div>
                  <div className="space-y-1.5 text-slate-300">
                    <div className="flex justify-between"><span>Fortune Sunflower Oil 1L (x2)</span><span>₹290.00</span></div>
                    <div className="flex justify-between"><span>Aashirvaad Atta 5kg (x1)</span><span>₹245.00</span></div>
                    <div className="flex justify-between"><span>Tata Tea Gold 500g (x1)</span><span>₹210.00</span></div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                    <span>Total Amount (Incl. GST):</span>
                    <span className="text-amber-400 text-sm">₹745.00</span>
                  </div>
                  <div className="text-[10px] text-center text-slate-500">
                    Print Thermal Bill / Send WhatsApp Bill to +91 98*** ****
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
