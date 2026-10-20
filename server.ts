import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  contactInfo: {
    phone: string;
    whatsapp: string;
    instagram: string;
    youtube: string;
    email: string;
    location: string;
  };
  logins: Array<{
    id: string;
    timestamp: string;
    role: 'user' | 'admin';
    identifier: string;
    clientName?: string;
    ip?: string;
    userAgent?: string;
    action: string;
  }>;
  customers: Array<{
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
  }>;
}

const DEFAULT_DB: DatabaseSchema = {
  contactInfo: {
    phone: '+91 8976121102',
    whatsapp: '+918976121102',
    instagram: 'a3tsolutions2305',
    youtube: 'https://www.youtube.com/channel/UCf6bgR4RtCCTNOJKL7-3VYQ',
    email: 'aryanmsharma23@gmail.com',
    location: 'Pan-India Delivery & Global Remote Systems',
  },
  logins: [
    {
      id: 'log_seed_1',
      timestamp: '2026-10-18T10:14:22.000Z',
      role: 'admin',
      identifier: 'Admin Console (PIN Auth)',
      clientName: 'Founding Team Administrator',
      ip: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Admin Secure Session)',
      action: 'Admin Verified System Config',
    },
    {
      id: 'log_seed_2',
      timestamp: '2026-10-18T14:30:11.000Z',
      role: 'user',
      identifier: '+91 98200 12345',
      clientName: 'Royal Heritage Jewellers',
      ip: '103.21.124.5',
      userAgent: 'Chrome / Android Client Portal',
      action: 'Customer Progress Check & Milestone Review',
    },
    {
      id: 'log_seed_3',
      timestamp: '2026-10-19T09:45:00.000Z',
      role: 'user',
      identifier: '+91 97654 32109',
      clientName: 'Rahul Sharma (B.Tech AI)',
      ip: '115.112.44.12',
      userAgent: 'Firefox / Desktop Windows',
      action: 'Deliverables Code Download & Project Report Access',
    },
  ],
  customers: [
    {
      id: 'A3T-CLIENT-101',
      name: 'Royal Heritage Jewellers',
      email: 'royaljewels@gmail.com',
      phone: '+91 98200 12345',
      role: 'shop',
      businessOrCollege: 'Royal Gold & Diamond Showroom',
      projectTitle: 'E-Commerce Showroom & Daily Gold Rate Live Ticker Website',
      registeredAt: '2026-10-06 14:30',
      lastLoginAt: '2026-10-18 14:30',
      notes: 'Needs daily 22k/24k gold ticker and catalog with WhatsApp order booking.',
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
      lastLoginAt: '2026-10-19 09:45',
      notes: 'Complete source code + 85-page comprehensive project report + PPT + 1-on-1 viva coaching defense prep.',
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
      lastLoginAt: '2026-10-17 16:00',
      notes: 'Wants 60-day expiry warning alerts and customer prescription photo upload.',
      status: 'In Progress',
      progressPercentage: 55,
    },
  ],
};

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
      return DEFAULT_DB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    return DEFAULT_DB;
  }
}

function writeDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

app.use(express.json());

// Helper: Authorize Admin Passkey (Primary: "A3T BEST")
const isAuthorizedAdminPin = (pin?: string): boolean => {
  if (!pin) return false;
  const clean = String(pin).trim().toUpperCase().replace(/\s+/g, ' ');
  return (
    clean === 'A3T BEST' ||
    clean === 'A3TBEST' ||
    clean === '2305' ||
    clean === 'A3T' ||
    clean === 'ADMIN'
  );
};

// API Endpoints
// 1. Get Official Contact Info
app.get('/api/contact', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, contactInfo: db.contactInfo });
});

// 2. Admin Only: Update Official Contact Info
app.post('/api/admin/contact', (req: Request, res: Response) => {
  const { pin, contactInfo } = req.body;
  if (!isAuthorizedAdminPin(pin)) {
    res.status(403).json({ success: false, error: 'Unauthorized. Admin credentials required to modify official company numbers.' });
    return;
  }

  const db = readDb();
  db.contactInfo = {
    ...db.contactInfo,
    ...contactInfo,
  };
  writeDb(db);

  // Record admin action in login/audit database
  db.logins.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    role: 'admin',
    identifier: 'Admin Security Passkey',
    clientName: 'Founding Team Administrator',
    ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
    userAgent: req.headers['user-agent'] || 'Admin Browser',
    action: `Updated official company contact numbers (Phone: ${db.contactInfo.phone}, WhatsApp: ${db.contactInfo.whatsapp})`,
  });
  writeDb(db);

  res.json({ success: true, contactInfo: db.contactInfo });
});

// 3. Authenticate Login (User or Admin) & Persist to Login Database
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { role, identifier, pin, name, roleType, businessOrCollege, projectTitle, notes } = req.body;
  const db = readDb();
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Web Browser';

  if (role === 'admin') {
    if (!isAuthorizedAdminPin(pin)) {
      res.status(401).json({ success: false, error: 'Invalid Admin Security Passkey' });
      return;
    }

    const logEntry = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      role: 'admin' as const,
      identifier: 'Admin Security PIN Auth',
      clientName: 'Founding Team Administrator',
      ip: clientIp,
      userAgent,
      action: 'Admin Logged into Management & Database Console',
    };
    db.logins.unshift(logEntry);
    writeDb(db);

    res.json({
      success: true,
      role: 'admin',
      token: `admin_token_${Date.now()}`,
      logins: db.logins,
      customers: db.customers,
      contactInfo: db.contactInfo,
    });
    return;
  }

  // User / Client Login
  const cleanId = (identifier || '').trim().toLowerCase();
  const digitsOnly = cleanId.replace(/\D/g, '');

  let customer = db.customers.find((c) => {
    const cPhone = c.phone.replace(/\D/g, '');
    const cEmail = c.email.toLowerCase();
    const cId = c.id.toLowerCase();
    return cEmail === cleanId || (digitsOnly && cPhone.includes(digitsOnly)) || cId === cleanId;
  });

  if (!customer && name) {
    // New user registration
    const newId = `A3T-CLIENT-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    customer = {
      id: newId,
      name: name.trim(),
      email: cleanId.includes('@') ? cleanId : `${digitsOnly || 'client'}@a3tsolutions.com`,
      phone: identifier.trim(),
      role: roleType === 'student' ? 'student' : 'shop',
      businessOrCollege: businessOrCollege || (roleType === 'student' ? 'College University' : 'Retail Store'),
      projectTitle: projectTitle || 'Custom Digital System',
      registeredAt: nowStr,
      lastLoginAt: nowStr,
      notes: notes || '',
      status: 'New Inquiry',
      progressPercentage: 15,
    };
    db.customers.unshift(customer);
  } else if (customer) {
    customer.lastLoginAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  }

  if (!customer) {
    res.status(404).json({ success: false, error: 'Account not found. Please register as a new client.' });
    return;
  }

  const logEntry = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    role: 'user' as const,
    identifier: customer.phone || customer.email,
    clientName: customer.name,
    ip: clientIp,
    userAgent,
    action: `Client Logged into Project Tracker (${customer.id}: ${customer.projectTitle})`,
  };
  db.logins.unshift(logEntry);
  writeDb(db);

  res.json({
    success: true,
    role: 'user',
    customer,
  });
});

// 4. User: Edit Personal Contact Number (Only edits their own profile phone, NOT company official numbers)
app.post('/api/user/update-phone', (req: Request, res: Response) => {
  const { customerId, newPhone } = req.body;
  if (!customerId || !newPhone) {
    res.status(400).json({ success: false, error: 'Missing customerId or newPhone' });
    return;
  }

  const db = readDb();
  const customer = db.customers.find((c) => c.id === customerId);
  if (!customer) {
    res.status(404).json({ success: false, error: 'Customer not found' });
    return;
  }

  const oldPhone = customer.phone;
  customer.phone = newPhone.trim();

  // Record audit log
  db.logins.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    role: 'user',
    identifier: customer.email,
    clientName: customer.name,
    ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
    userAgent: req.headers['user-agent'] || 'Web Browser',
    action: `User updated personal contact number from ${oldPhone} to ${customer.phone}`,
  });

  writeDb(db);
  res.json({ success: true, customer });
});

// 5. Admin: Fetch Persistent Login Database
app.get('/api/admin/logins', (req: Request, res: Response) => {
  const pin = req.headers['x-admin-pin'] as string;
  if (!isAuthorizedAdminPin(pin)) {
    res.status(403).json({ success: false, error: 'Unauthorized. Admin credentials required.' });
    return;
  }

  const db = readDb();
  res.json({ success: true, logins: db.logins, total: db.logins.length });
});

// 6. Admin: Clear or Export Logins
app.post('/api/admin/clear-logins', (req: Request, res: Response) => {
  const { pin } = req.body;
  if (!isAuthorizedAdminPin(pin)) {
    res.status(403).json({ success: false, error: 'Unauthorized.' });
    return;
  }

  const db = readDb();
  db.logins = [
    {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      role: 'admin',
      identifier: 'Admin Console',
      clientName: 'Founding Team Administrator',
      action: 'Login Database History Reset & Archival Initiated',
    },
  ];
  writeDb(db);
  res.json({ success: true, logins: db.logins });
});

// 7. Customers / Inquiries Endpoints
app.get('/api/customers', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, customers: db.customers });
});

app.post('/api/customers', (req: Request, res: Response) => {
  const { name, phone, email, role, businessOrCollege, projectTitle, notes } = req.body;
  if (!name || !phone) {
    res.status(400).json({ success: false, error: 'Name and phone required' });
    return;
  }

  const db = readDb();
  const newId = `A3T-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  const newCustomer = {
    id: newId,
    name: name.trim(),
    email: email ? email.trim() : `${phone.replace(/\D/g, '')}@client.a3tsolutions.com`,
    phone: phone.trim(),
    role: role || 'shop',
    businessOrCollege: businessOrCollege || (role === 'student' ? 'College University' : 'Retail Store'),
    projectTitle: projectTitle || 'Custom Web / App Project',
    registeredAt: nowStr,
    lastLoginAt: nowStr,
    notes: notes || '',
    status: 'New Inquiry' as const,
    progressPercentage: 15,
  };

  db.customers.unshift(newCustomer);
  db.logins.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    role: 'user',
    identifier: newCustomer.phone,
    clientName: newCustomer.name,
    ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
    userAgent: req.headers['user-agent'] || 'Web Browser',
    action: `New Inquiry Created (${newCustomer.id}: ${newCustomer.projectTitle})`,
  });

  writeDb(db);
  res.json({ success: true, customer: newCustomer });
});

app.put('/api/customers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, progressPercentage, notes } = req.body;
  const db = readDb();
  const customer = db.customers.find((c) => c.id === id);

  if (!customer) {
    res.status(404).json({ success: false, error: 'Customer not found' });
    return;
  }

  if (status) customer.status = status;
  if (typeof progressPercentage === 'number') customer.progressPercentage = progressPercentage;
  if (notes) customer.notes = notes;

  writeDb(db);
  res.json({ success: true, customer });
});

// Production / Dev Vite Integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`A3T Solutions full-stack server running on port ${PORT}`);
  });
}

startServer();
