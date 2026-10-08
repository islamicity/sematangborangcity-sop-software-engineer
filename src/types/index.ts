export type ActiveTab = 
  | 'overview'
  | 'cicd'
  | 'monitoring'
  | 'rbac'
  | 'sop-library'
  | 'calculators'
  | 'dakwah-finance'
  | 'security-audit';

export type UserRole = 
  | 'Cloud Architect'
  | 'DevOps Engineer'
  | 'Backend Engineer'
  | 'Frontend Engineer'
  | 'Full Stack Engineer'
  | 'QA Engineer'
  | 'Security Auditor'
  | 'Pengurus Komunitas / DKM';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  twoFactorEnabled: boolean;
  permissions: string[];
}

export interface SOPDocument {
  id: string;
  title: string;
  category: 
    | 'SOP SDLC & Engineering' 
    | 'Panduan Pengembangan' 
    | 'Pedoman Kode & Arsitektur' 
    | 'Kebijakan Keamanan & Rilis' 
    | 'Standar Kualitas & SLA' 
    | 'HR, Tim & Organisasi' 
    | 'Template Bisnis & Operasional' 
    | 'Keuangan & Profit Kontrol' 
    | 'Dakwah & Manajemen Masjid'
    | 'Template Operasional Siap Pakai'
    | 'Dokumen Sistem Bisnis Lengkap'
    | 'Template Keuangan & Profit'
    | 'Template Briefing, Evaluasi & Monitoring';
  targetRoles: UserRole[];
  version: string;
  updatedAt: string;
  summary: string;
  content: string;
  tags: string[];
  templateVariables?: { [key: string]: string };
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: string;
  logs: string[];
}

export interface PipelineRun {
  id: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  author: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  startedAt: string;
  environment: 'development' | 'staging' | 'production';
  stages: PipelineStage[];
}

export interface InfraMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  podCount: number;
  latencyMs: number;
  apdex: number;
  errorRate: number;
}

export interface SystemAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  service: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  autoRemediated?: boolean;
}

export interface JamaahProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  category: 'Warga Tetap' | 'Donatur Tetap' | 'Pengurus DKM' | 'Simpatisan';
  monthlyPledge: number;
  lastPaymentDate: string;
  paymentStatus: 'Lunas' | 'Tertunggak' | 'Sebagian';
  totalDonation: number;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'Pemasukan' | 'Pengeluaran';
  category: 'Infaq Jumat' | 'Sedekah Subuh' | 'Zakat Mal' | 'Iuran Bulanan' | 'Operasional Listrik/Air' | 'Santunan Yatim' | 'Bantuan UMKM' | 'Pemeliharaan Server';
  amount: number;
  donorName?: string;
  description: string;
  paymentMethod: 'BSI Virtual Account' | 'Bank Muamalat' | 'BCA Syariah' | 'QRIS Dinamis' | 'Tunai';
  status: 'Berhasil' | 'Menunggu' | 'Dibatalkan';
  hash: string;
  previousHash: string;
  encryptedSignature: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  ipAddress: string;
  status: 'Success' | 'Denied' | 'Warning';
  details: string;
}
