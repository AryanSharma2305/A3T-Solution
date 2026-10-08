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
  budgetEstimated?: number;
  status: 'New Inquiry' | 'In Progress' | 'Delivered' | 'Completed';
  progressPercentage: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  description: string;
  skills: string[];
}

export interface ProjectMilestone {
  title: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: string;
}

export interface ClientProject {
  id: string;
  clientName: string;
  projectType: 'shop' | 'student';
  title: string;
  status: 'In Progress' | 'Under Review' | 'Completed' | 'Delivered';
  progressPercentage: number;
  startDate: string;
  expectedDelivery: string;
  milestones: ProjectMilestone[];
  deliverables: {
    name: string;
    type: string;
    size: string;
  }[];
}
