import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContactInfo, CustomerAccount } from '../types';

interface ContactContextType {
  contactInfo: ContactInfo;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  getWhatsAppUrl: (message?: string) => string;
  getInstagramUrl: () => string;
  getYoutubeUrl: () => string;
  getPhoneUrl: () => string;

  // Customer Authentication & Founders' Registry
  registeredCustomers: CustomerAccount[];
  activeCustomer: CustomerAccount | null;
  saveCustomerLogin: (data: {
    name: string;
    email: string;
    phone: string;
    role: 'shop' | 'student';
    businessOrCollege?: string;
    projectTitle?: string;
    notes?: string;
    budgetEstimated?: number;
  }) => CustomerAccount;
  loginExistingCustomer: (emailOrPhone: string) => CustomerAccount | null;
  logoutCustomer: () => void;
  deleteCustomer: (id: string) => void;
  updateCustomerProgress: (id: string, status: CustomerAccount['status'], progress: number) => void;
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+91 8976121102',
  whatsapp: '+918976121102',
  instagram: 'a3tsolutions2305',
  youtube: 'https://www.youtube.com/channel/UCf6bgR4RtCCTNOJKL7-3VYQ',
  email: 'aryanmsharma23@gmail.com',
  location: 'Tech Hub / Available Pan-India & Remote',
};

const INITIAL_SEEDED_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'A3T-CLIENT-101',
    name: 'Royal Heritage Jewellers',
    email: 'royaljewels@gmail.com',
    phone: '+91 98200 12345',
    role: 'shop',
    businessOrCollege: 'Royal Gold & Diamond Showroom',
    projectTitle: 'E-Commerce Showroom & Daily Gold Rate Live Ticker Website',
    registeredAt: '2026-10-06 14:30',
    lastLoginAt: '2026-10-07 19:15',
    notes: 'Needs daily 22k/24k gold ticker and catalog with WhatsApp order booking.',
    budgetEstimated: 8500,
    status: 'In Progress',
    progressPercentage: 80,
  },
  {
    id: 'A3T-CLIENT-102',
    name: 'Rahul Sharma',
    email: 'rahul.btech26@gmail.com',
    phone: '+91 97654 32109',
    role: 'student',
    businessOrCollege: 'B.Tech CSE - Final Year',
    projectTitle: 'Driver Drowsiness & Yawn Detection System using OpenCV & CNN',
    registeredAt: '2026-10-05 11:20',
    lastLoginAt: '2026-10-07 20:45',
    notes: 'Complete source code + 85-page IEEE report + PPT + 1-on-1 viva coaching defense prep.',
    budgetEstimated: 4500,
    status: 'Completed',
    progressPercentage: 100,
  },
  {
    id: 'A3T-CLIENT-103',
    name: 'Sanjeevani Chemist & Care',
    email: 'care@sanjeevanimedical.in',
    phone: '+91 91234 56780',
    role: 'shop',
    businessOrCollege: 'Medical Store & Pharmacy',
    projectTitle: 'Medicine Inventory, Expiry Alert & Barcode Billing POS Web App',
    registeredAt: '2026-10-07 09:10',
    lastLoginAt: '2026-10-07 16:00',
    notes: 'Wants 60-day expiry warning alerts and customer prescription photo upload.',
    budgetEstimated: 9200,
    status: 'In Progress',
    progressPercentage: 55,
  },
];

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Contact Info state
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('a3t_contact_info_v3');
      if (saved) return JSON.parse(saved);
      return DEFAULT_CONTACT_INFO;
    } catch {
      return DEFAULT_CONTACT_INFO;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Registered Customers List
  const [registeredCustomers, setRegisteredCustomers] = useState<CustomerAccount[]>(() => {
    try {
      const saved = localStorage.getItem('a3t_customers_list_v3');
      if (saved) return JSON.parse(saved);
      return INITIAL_SEEDED_CUSTOMERS;
    } catch {
      return INITIAL_SEEDED_CUSTOMERS;
    }
  });

  // Active Customer Session (currently logged in user)
  const [activeCustomer, setActiveCustomer] = useState<CustomerAccount | null>(() => {
    try {
      const saved = localStorage.getItem('a3t_active_customer_session_v3');
      if (saved) return JSON.parse(saved);
      return null;
    } catch {
      return null;
    }
  });

  // Sync Contact Info
  useEffect(() => {
    try {
      localStorage.setItem('a3t_contact_info_v3', JSON.stringify(contactInfo));
    } catch {
      // Storage unavailable
    }
  }, [contactInfo]);

  // Sync Customers List
  useEffect(() => {
    try {
      localStorage.setItem('a3t_customers_list_v3', JSON.stringify(registeredCustomers));
    } catch {
      // Storage unavailable
    }
  }, [registeredCustomers]);

  // Sync Active Session
  useEffect(() => {
    try {
      if (activeCustomer) {
        localStorage.setItem('a3t_active_customer_session_v3', JSON.stringify(activeCustomer));
      } else {
        localStorage.removeItem('a3t_active_customer_session_v3');
      }
    } catch {
      // Storage unavailable
    }
  }, [activeCustomer]);

  const updateContactInfo = (newInfo: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }));
  };

  const getWhatsAppUrl = (message?: string) => {
    const cleanNumber = contactInfo.whatsapp.replace(/[^0-9]/g, '');
    const defaultMsg = "Hello A3T Solutions! I would like to inquire about a website/app project.";
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  const getInstagramUrl = () => {
    const handle = contactInfo.instagram.replace(/^@/, '');
    return `https://www.instagram.com/${handle}/`;
  };

  const getYoutubeUrl = () => {
    return contactInfo.youtube;
  };

  const getPhoneUrl = () => {
    return `tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`;
  };

  // Save new or existing customer login
  const saveCustomerLogin = (data: {
    name: string;
    email: string;
    phone: string;
    role: 'shop' | 'student';
    businessOrCollege?: string;
    projectTitle?: string;
    notes?: string;
    budgetEstimated?: number;
  }): CustomerAccount => {
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    
    // Check if user with same phone or email exists
    const existingIndex = registeredCustomers.findIndex(
      (c) => (data.phone && c.phone.replace(/\D/g, '') === data.phone.replace(/\D/g, '')) ||
             (data.email && c.email.toLowerCase() === data.email.toLowerCase())
    );

    let customerToSet: CustomerAccount;

    if (existingIndex >= 0) {
      const existing = registeredCustomers[existingIndex];
      customerToSet = {
        ...existing,
        name: data.name || existing.name,
        businessOrCollege: data.businessOrCollege || existing.businessOrCollege,
        projectTitle: data.projectTitle || existing.projectTitle,
        lastLoginAt: nowStr,
        notes: data.notes ? `${existing.notes || ''}\n[Update]: ${data.notes}` : existing.notes,
        budgetEstimated: data.budgetEstimated || existing.budgetEstimated,
      };
      const updatedList = [...registeredCustomers];
      updatedList[existingIndex] = customerToSet;
      setRegisteredCustomers(updatedList);
    } else {
      const newId = `A3T-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      customerToSet = {
        id: newId,
        name: data.name,
        email: data.email || 'customer@a3tsolutions.com',
        phone: data.phone,
        role: data.role,
        businessOrCollege: data.businessOrCollege || (data.role === 'shop' ? 'Retail Store' : 'College University'),
        projectTitle: data.projectTitle || 'New Custom Software Project',
        registeredAt: nowStr,
        lastLoginAt: nowStr,
        notes: data.notes || '',
        budgetEstimated: data.budgetEstimated || 5000,
        status: 'New Inquiry',
        progressPercentage: 15,
      };
      setRegisteredCustomers([customerToSet, ...registeredCustomers]);
    }

    setActiveCustomer(customerToSet);
    return customerToSet;
  };

  const loginExistingCustomer = (emailOrPhone: string): CustomerAccount | null => {
    const cleanSearch = emailOrPhone.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPhoneSearch = emailOrPhone.replace(/\D/g, '');

    const found = registeredCustomers.find((c) => {
      const cEmail = c.email.toLowerCase();
      const cPhoneDigits = c.phone.replace(/\D/g, '');
      const cId = c.id.toLowerCase();
      return (
        cEmail === cleanSearch ||
        (cleanPhoneSearch && cPhoneDigits.includes(cleanPhoneSearch)) ||
        cId === cleanSearch
      );
    });

    if (found) {
      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      const updated = { ...found, lastLoginAt: nowStr };
      setActiveCustomer(updated);
      setRegisteredCustomers((prev) => prev.map((c) => (c.id === found.id ? updated : c)));
      return updated;
    }

    return null;
  };

  const logoutCustomer = () => {
    setActiveCustomer(null);
  };

  const deleteCustomer = (id: string) => {
    setRegisteredCustomers((prev) => prev.filter((c) => c.id !== id));
    if (activeCustomer?.id === id) {
      setActiveCustomer(null);
    }
  };

  const updateCustomerProgress = (id: string, status: CustomerAccount['status'], progress: number) => {
    setRegisteredCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, progressPercentage: progress } : c))
    );
    if (activeCustomer?.id === id) {
      setActiveCustomer((prev) => (prev ? { ...prev, status, progressPercentage: progress } : null));
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactInfo,
        updateContactInfo,
        isEditModalOpen,
        setIsEditModalOpen,
        getWhatsAppUrl,
        getInstagramUrl,
        getYoutubeUrl,
        getPhoneUrl,
        registeredCustomers,
        activeCustomer,
        saveCustomerLogin,
        loginExistingCustomer,
        logoutCustomer,
        deleteCustomer,
        updateCustomerProgress,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
