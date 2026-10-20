import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContactInfo, CustomerAccount, LoginAuditRecord } from '../types';

interface ContactContextType {
  contactInfo: ContactInfo;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  getWhatsAppUrl: (message?: string) => string;
  getInstagramUrl: () => string;
  getYoutubeUrl: () => string;
  getPhoneUrl: () => string;

  // Active Sessions
  activeCustomer: CustomerAccount | null;
  isAdminLoggedIn: boolean;
  adminPin: string;

  // Login Database & Customers
  registeredCustomers: CustomerAccount[];
  loginDatabase: LoginAuditRecord[];
  isLoadingLogs: boolean;

  // Methods
  loginAsUser: (identifier: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: {
    name: string;
    phone: string;
    email?: string;
    role: 'shop' | 'student';
    businessOrCollege?: string;
    projectTitle?: string;
    notes?: string;
  }) => Promise<{ success: boolean; customer?: CustomerAccount; error?: string }>;
  updateUserPhoneNumber: (newPhone: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;

  // Admin Methods
  loginAsAdmin: (pin: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  updateOfficialContact: (info: Partial<ContactInfo>, pin: string) => Promise<{ success: boolean; error?: string }>;
  refreshLoginDatabase: () => Promise<void>;
  updateCustomerStatus: (id: string, status: CustomerAccount['status'], progress: number) => Promise<void>;
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+91 8976121102',
  whatsapp: '+918976121102',
  instagram: 'a3tsolutions2305',
  youtube: 'https://www.youtube.com/channel/UCf6bgR4RtCCTNOJKL7-3VYQ',
  email: 'aryanmsharma23@gmail.com',
  location: 'Pan-India Delivery & Global Remote Systems',
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('a3t_contact_info_v4');
      if (saved) return JSON.parse(saved);
      return DEFAULT_CONTACT_INFO;
    } catch {
      return DEFAULT_CONTACT_INFO;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<CustomerAccount | null>(() => {
    try {
      const saved = localStorage.getItem('a3t_active_user_v4');
      if (saved) return JSON.parse(saved);
      return null;
    } catch {
      return null;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('a3t_admin_unlocked') === 'true';
  });
  const [adminPin, setAdminPin] = useState<string>(() => {
    return sessionStorage.getItem('a3t_admin_pin') || '';
  });

  const [registeredCustomers, setRegisteredCustomers] = useState<CustomerAccount[]>([]);
  const [loginDatabase, setLoginDatabase] = useState<LoginAuditRecord[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Fetch initial contact info and customers from server database
  useEffect(() => {
    fetch('/api/contact')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.contactInfo) {
          setContactInfo(data.contactInfo);
          localStorage.setItem('a3t_contact_info_v4', JSON.stringify(data.contactInfo));
        }
      })
      .catch(() => {});

    fetch('/api/customers')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.customers) {
          setRegisteredCustomers(data.customers);
        }
      })
      .catch(() => {});
  }, []);

  // Sync active user to local storage
  useEffect(() => {
    try {
      if (activeCustomer) {
        localStorage.setItem('a3t_active_user_v4', JSON.stringify(activeCustomer));
      } else {
        localStorage.removeItem('a3t_active_user_v4');
      }
    } catch {
      // Storage unavailable
    }
  }, [activeCustomer]);

  // Fetch Login Database from server (when admin is logged in)
  const refreshLoginDatabase = async () => {
    if (!isAdminLoggedIn) return;
    setIsLoadingLogs(true);
    try {
      const res = await fetch('/api/admin/logins', {
        headers: { 'x-admin-pin': adminPin || 'A3T BEST' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.logins) {
          setLoginDatabase(data.logins);
        }
      }
    } catch (err) {
      console.error('Failed to fetch login database:', err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      refreshLoginDatabase();
    }
  }, [isAdminLoggedIn]);

  // USER AUTH: Log in existing user
  const loginAsUser = async (identifier: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', identifier }),
      });
      const data = await res.json();
      if (data.success && data.customer) {
        setActiveCustomer(data.customer);
        return { success: true };
      }
      return { success: false, error: data.error || 'Account not found. Please register.' };
    } catch {
      // Fallback local check
      const cleanSearch = identifier.trim().toLowerCase().replace(/\s+/g, '');
      const cleanPhoneDigits = identifier.replace(/\D/g, '');
      const found = registeredCustomers.find((c) => {
        const cEmail = c.email.toLowerCase();
        const cPhoneDigits = c.phone.replace(/\D/g, '');
        return cEmail === cleanSearch || (cleanPhoneDigits && cPhoneDigits.includes(cleanPhoneDigits));
      });
      if (found) {
        setActiveCustomer(found);
        return { success: true };
      }
      return { success: false, error: 'Account not found. Please register as a new client.' };
    }
  };

  // USER AUTH: Register new client
  const registerUser = async (formData: {
    name: string;
    phone: string;
    email?: string;
    role: 'shop' | 'student';
    businessOrCollege?: string;
    projectTitle?: string;
    notes?: string;
  }): Promise<{ success: boolean; customer?: CustomerAccount; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'user',
          identifier: formData.phone,
          name: formData.name,
          roleType: formData.role,
          businessOrCollege: formData.businessOrCollege,
          projectTitle: formData.projectTitle,
          notes: formData.notes,
        }),
      });
      const data = await res.json();
      if (data.success && data.customer) {
        setActiveCustomer(data.customer);
        setRegisteredCustomers((prev) => [data.customer, ...prev]);
        return { success: true, customer: data.customer };
      }
      return { success: false, error: data.error || 'Failed to register account' };
    } catch {
      // Local fallback
      const newId = `A3T-CLIENT-${Math.floor(100 + Math.random() * 900)}`;
      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      const newCust: CustomerAccount = {
        id: newId,
        name: formData.name,
        email: formData.email || `${formData.phone.replace(/\D/g, '')}@a3tsolutions.com`,
        phone: formData.phone,
        role: formData.role,
        businessOrCollege: formData.businessOrCollege || 'Client Store / University',
        projectTitle: formData.projectTitle || 'Digital Engineering Project',
        registeredAt: nowStr,
        lastLoginAt: nowStr,
        notes: formData.notes || '',
        status: 'New Inquiry',
        progressPercentage: 15,
      };
      setActiveCustomer(newCust);
      setRegisteredCustomers((prev) => [newCust, ...prev]);
      return { success: true, customer: newCust };
    }
  };

  // USER EDIT: Edit Personal Phone Number (Not Official Company Number)
  const updateUserPhoneNumber = async (newPhone: string): Promise<{ success: boolean; error?: string }> => {
    if (!activeCustomer) {
      return { success: false, error: 'No active user session' };
    }

    try {
      const res = await fetch('/api/user/update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: activeCustomer.id, newPhone }),
      });
      const data = await res.json();
      if (data.success && data.customer) {
        setActiveCustomer(data.customer);
        setRegisteredCustomers((prev) => prev.map((c) => (c.id === data.customer.id ? data.customer : c)));
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update phone number' };
    } catch {
      // Local fallback
      const updated = { ...activeCustomer, phone: newPhone };
      setActiveCustomer(updated);
      setRegisteredCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      return { success: true };
    }
  };

  const logoutUser = () => {
    setActiveCustomer(null);
    localStorage.removeItem('a3t_active_user_v4');
  };

  // ADMIN AUTH: Login with PIN
  const loginAsAdmin = async (pin: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin', pin }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        setAdminPin(pin);
        sessionStorage.setItem('a3t_admin_unlocked', 'true');
        sessionStorage.setItem('a3t_admin_pin', pin);
        if (data.logins) setLoginDatabase(data.logins);
        if (data.customers) setRegisteredCustomers(data.customers);
        if (data.contactInfo) setContactInfo(data.contactInfo);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid Admin Security Passkey' };
    } catch {
      const clean = String(pin).trim().toUpperCase().replace(/\s+/g, ' ');
      if (clean === 'A3T BEST' || clean === 'A3TBEST' || clean === '2305' || clean === 'A3T' || clean === 'ADMIN') {
        setIsAdminLoggedIn(true);
        setAdminPin(pin);
        sessionStorage.setItem('a3t_admin_unlocked', 'true');
        sessionStorage.setItem('a3t_admin_pin', pin);
        return { success: true };
      }
      return { success: false, error: 'Invalid Admin Security Passkey.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminPin('');
    sessionStorage.removeItem('a3t_admin_unlocked');
    sessionStorage.removeItem('a3t_admin_pin');
  };

  // ADMIN ACTION: Update Official Company Numbers
  const updateOfficialContact = async (info: Partial<ContactInfo>, pin: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin || adminPin, contactInfo: info }),
      });
      const data = await res.json();
      if (data.success && data.contactInfo) {
        setContactInfo(data.contactInfo);
        localStorage.setItem('a3t_contact_info_v4', JSON.stringify(data.contactInfo));
        refreshLoginDatabase();
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update official numbers' };
    } catch {
      const updated = { ...contactInfo, ...info };
      setContactInfo(updated);
      localStorage.setItem('a3t_contact_info_v4', JSON.stringify(updated));
      return { success: true };
    }
  };

  // ADMIN ACTION: Update customer progress
  const updateCustomerStatus = async (id: string, status: CustomerAccount['status'], progress: number) => {
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, progressPercentage: progress }),
      });
      if (res.ok) {
        setRegisteredCustomers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status, progressPercentage: progress } : c))
        );
        if (activeCustomer?.id === id) {
          setActiveCustomer((prev) => (prev ? { ...prev, status, progressPercentage: progress } : null));
        }
      }
    } catch {
      setRegisteredCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status, progressPercentage: progress } : c))
      );
      if (activeCustomer?.id === id) {
        setActiveCustomer((prev) => (prev ? { ...prev, status, progressPercentage: progress } : null));
      }
    }
  };

  const getWhatsAppUrl = (message?: string) => {
    const cleanNumber = contactInfo.whatsapp.replace(/[^0-9]/g, '');
    const defaultMsg = 'Hello A3T Solutions! I would like to consult on a custom web/software engineering project.';
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

  return (
    <ContactContext.Provider
      value={{
        contactInfo,
        isEditModalOpen,
        setIsEditModalOpen,
        getWhatsAppUrl,
        getInstagramUrl,
        getYoutubeUrl,
        getPhoneUrl,
        activeCustomer,
        isAdminLoggedIn,
        adminPin,
        registeredCustomers,
        loginDatabase,
        isLoadingLogs,
        loginAsUser,
        registerUser,
        updateUserPhoneNumber,
        logoutUser,
        loginAsAdmin,
        logoutAdmin,
        updateOfficialContact,
        refreshLoginDatabase,
        updateCustomerStatus,
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
