export type CustomerType = 'shop' | 'student';

export type ShopCategory = 
  | 'jewellery' 
  | 'medical' 
  | 'salon' 
  | 'general_store' 
  | 'boutique' 
  | 'other_retail';

export type StudentDegree = 
  | 'btech' 
  | 'bca' 
  | 'mca' 
  | 'diploma' 
  | 'bsc_cs' 
  | 'mtech';

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  email: string;
  location: string;
}

export interface LoginAuditRecord {
  id: string;
  timestamp: string;
  role: 'user' | 'admin';
  identifier: string;
  clientName?: string;
  ip?: string;
  userAgent?: string;
  action: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'shop' | 'student';
  businessOrCollege: string;
  projectTitle: string;
  registeredAt: string;
  lastLoginAt: string;
  notes?: string;
  status: 'New Inquiry' | 'In Progress' | 'Delivered' | 'Completed';
  progressPercentage: number;
}

export interface CoFounder {
  name: string;
  letter: string;
  title: string;
  leadDomain: string;
  bio: string;
  capabilities: string[];
}
