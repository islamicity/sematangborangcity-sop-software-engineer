import { JamaahProfile, FinancialTransaction, PipelineRun, SystemAlert, AuditLog, UserProfile } from '../types';

export const initialUsers: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Ir. Ahmad Fauzan, M.T.',
    email: 'ahmad.fauzan@islamicity.cloud',
    role: 'Cloud Architect',
    avatar: 'AF',
    twoFactorEnabled: true,
    permissions: ['prod:deploy', 'infra:modify', 'rbac:admin', 'secrets:read', 'db:migrate', 'audit:view']
  },
  {
    id: 'usr-2',
    name: 'Zulkipli DevOps, CKA',
    email: 'zulkipli.devops@islamicity.cloud',
    role: 'DevOps Engineer',
    avatar: 'ZD',
    twoFactorEnabled: true,
    permissions: ['prod:deploy', 'infra:modify', 'cicd:trigger', 'secrets:read', 'monitoring:manage']
  },
  {
    id: 'usr-3',
    name: 'Siti Sarah Backend Lead',
    email: 'sarah.siti@islamicity.cloud',
    role: 'Backend Engineer',
    avatar: 'SS',
    twoFactorEnabled: true,
    permissions: ['cicd:trigger', 'db:migrate', 'repo:write', 'audit:view']
  },
  {
    id: 'usr-4',
    name: 'Rian Pratama UI/UX Tech',
    email: 'rian.pratama@islamicity.cloud',
    role: 'Frontend Engineer',
    avatar: 'RP',
    twoFactorEnabled: true,
    permissions: ['repo:write', 'cicd:trigger']
  },
  {
    id: 'usr-5',
    name: 'H. Lukman Hakim, S.E. (DKM)',
    email: 'lukman.dkm@islamicity.org',
    role: 'Pengurus Komunitas / DKM',
    avatar: 'LH',
    twoFactorEnabled: true,
    permissions: ['finance:manage', 'jamaah:manage', 'wa:broadcast', 'audit:view', 'reports:export']
  },
  {
    id: 'usr-6',
    name: 'Farhan Security Officer, CISSP',
    email: 'farhan.sec@islamicity.cloud',
    role: 'Security Auditor',
    avatar: 'FS',
    twoFactorEnabled: true,
    permissions: ['audit:view', 'security:audit', 'rbac:audit', 'secrets:audit']
  }
];

export const initialJamaah: JamaahProfile[] = [
  {
    id: 'JMH-001',
    name: 'H. Ridwan Kamiludin',
    phone: '6281234567890',
    email: 'ridwan.k@gmail.com',
    address: 'Jl. Masjid Al-Ikhlas No. 12, Jakarta',
    category: 'Donatur Tetap',
    monthlyPledge: 500000,
    lastPaymentDate: '2026-10-01',
    paymentStatus: 'Lunas',
    totalDonation: 12500000
  },
  {
    id: 'JMH-002',
    name: 'Bambang Sutrisno',
    phone: '6281398765432',
    email: 'bambang.s@yahoo.com',
    address: 'Komplek Permata Hijau Blok C-4',
    category: 'Warga Tetap',
    monthlyPledge: 150000,
    lastPaymentDate: '2026-09-02',
    paymentStatus: 'Tertunggak',
    totalDonation: 1800000
  },
  {
    id: 'JMH-003',
    name: 'Hj. Fatimah Zahra',
    phone: '6281809112233',
    email: 'fatimah.z@outlook.com',
    address: 'Jl. Melati Putih No. 45',
    category: 'Donatur Tetap',
    monthlyPledge: 1000000,
    lastPaymentDate: '2026-10-05',
    paymentStatus: 'Lunas',
    totalDonation: 24000000
  },
  {
    id: 'JMH-004',
    name: 'Ust. Mansur Hidayat',
    phone: '6282112344321',
    email: 'mansur.h@islamicity.org',
    address: 'Rumah Dinas Imam Masjid',
    category: 'Pengurus DKM',
    monthlyPledge: 200000,
    lastPaymentDate: '2026-10-02',
    paymentStatus: 'Lunas',
    totalDonation: 3600000
  },
  {
    id: 'JMH-005',
    name: 'Agus Hendrawan, S.Kom.',
    phone: '6285712398765',
    email: 'agus.h@techstartup.id',
    address: 'Jl. Mawar Asri No. 8',
    category: 'Simpatisan',
    monthlyPledge: 250000,
    lastPaymentDate: '2026-08-28',
    paymentStatus: 'Tertunggak',
    totalDonation: 1500000
  },
  {
    id: 'JMH-006',
    name: 'Dewi Anggraini',
    phone: '6287888776655',
    email: 'dewi.ang@gmail.com',
    address: 'Jl. Dahlia No. 19',
    category: 'Warga Tetap',
    monthlyPledge: 100000,
    lastPaymentDate: '2026-10-04',
    paymentStatus: 'Lunas',
    totalDonation: 1200000
  }
];

export const initialTransactions: FinancialTransaction[] = [
  {
    id: 'TXN-202610-001',
    date: '2026-10-06 14:32:10',
    type: 'Pemasukan',
    category: 'Infaq Jumat',
    amount: 14850000,
    donorName: 'Jamaah Shalat Jumat Barokah',
    description: 'Kotak Infaq Jumat & QRIS Shalat Berjamaah',
    paymentMethod: 'QRIS Dinamis',
    status: 'Berhasil',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    encryptedSignature: 'ECDSA-SHA256-SIG-98a7c2b5f10'
  },
  {
    id: 'TXN-202610-002',
    date: '2026-10-05 09:15:42',
    type: 'Pemasukan',
    category: 'Iuran Bulanan',
    amount: 1000000,
    donorName: 'Hj. Fatimah Zahra',
    description: 'Iuran Bulanan Warga & Donasi Kas Masjid Oktober',
    paymentMethod: 'BSI Virtual Account',
    status: 'Berhasil',
    previousHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    hash: '7d5a99f603f231d539f4b677283e017a8b161f76f4ec363f7941b156101144d2',
    encryptedSignature: 'ECDSA-SHA256-SIG-44d288a10cc'
  },
  {
    id: 'TXN-202610-003',
    date: '2026-10-04 19:40:00',
    type: 'Pengeluaran',
    category: 'Operasional Listrik/Air',
    amount: 2850000,
    description: 'Tagihan Listrik PLN Daya 13000 VA & Air PDAM Masjid',
    paymentMethod: 'Bank Muamalat',
    status: 'Berhasil',
    previousHash: '7d5a99f603f231d539f4b677283e017a8b161f76f4ec363f7941b156101144d2',
    hash: 'bc49bc67e2a9b3438e78457fb053457a41441b1a78fdc5f0b5434d288b502c3d',
    encryptedSignature: 'ECDSA-SHA256-SIG-71a09bbce3e'
  },
  {
    id: 'TXN-202610-004',
    date: '2026-10-03 11:20:15',
    type: 'Pemasukan',
    category: 'Zakat Mal',
    amount: 25000000,
    donorName: 'H. Ridwan Kamiludin',
    description: 'Penyaluran Zakat Harta Perdagangan Tahunan',
    paymentMethod: 'BCA Syariah',
    status: 'Berhasil',
    previousHash: 'bc49bc67e2a9b3438e78457fb053457a41441b1a78fdc5f0b5434d288b502c3d',
    hash: '9128fef59123847ab591029348123019827361a781b293847192837461928374',
    encryptedSignature: 'ECDSA-SHA256-SIG-19283746192'
  },
  {
    id: 'TXN-202610-005',
    date: '2026-10-02 16:00:00',
    type: 'Pengeluaran',
    category: 'Santunan Yatim',
    amount: 6000000,
    description: 'Penyaluran Santunan Bulanan 12 Anak Yatim Sekitar Masjid',
    paymentMethod: 'Tunai',
    status: 'Berhasil',
    previousHash: '9128fef59123847ab591029348123019827361a781b293847192837461928374',
    hash: 'a9b8c7d6e5f41234567890abcdef1234567890abcdef1234567890abcdef1234',
    encryptedSignature: 'ECDSA-SHA256-SIG-90abcdef123'
  },
  {
    id: 'TXN-202610-006',
    date: '2026-10-01 10:00:00',
    type: 'Pengeluaran',
    category: 'Pemeliharaan Server',
    amount: 1450000,
    description: 'Biaya Cloud Cluster K8s & Domain SSL Islamicity Platform',
    paymentMethod: 'BSI Virtual Account',
    status: 'Berhasil',
    previousHash: 'a9b8c7d6e5f41234567890abcdef1234567890abcdef1234567890abcdef1234',
    hash: '887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa99',
    encryptedSignature: 'ECDSA-SHA256-SIG-eeddccbbaa9'
  }
];

export const initialPipelines: PipelineRun[] = [
  {
    id: 'RUN-2026-1092',
    branch: 'main',
    commitHash: '8f3e2b9',
    commitMessage: 'feat(wa-gateway): automated payment receipt & instant webhook dispatcher',
    author: 'Ahmad Fauzan',
    status: 'success',
    startedAt: '12 menit yang lalu',
    environment: 'production',
    stages: [
      { id: '1', name: 'Lint & SonarQube', status: 'success', duration: '28s', logs: ['ESLint flat config verified', '0 security hotspot found', 'Cyclomatic complexity passed'] },
      { id: '2', name: 'Unit & Contract Test', status: 'success', duration: '45s', logs: ['382 unit tests passed', 'Coverage: 87.4% line coverage', 'Integration DB assertions passed'] },
      { id: '3', name: 'SAST & Trivy Security Scan', status: 'success', duration: '32s', logs: ['Trivy container scan: 0 critical, 0 high', 'Secret scanning: clean, no leaks found'] },
      { id: '4', name: 'Docker Build & Push', status: 'success', duration: '1m 12s', logs: ['Multi-stage build complete', 'Pushed to registry.islamicity.cloud/core-api:v3.2.0'] },
      { id: '5', name: 'Canary Deploy (10% -> 100%)', status: 'success', duration: '2m 04s', logs: ['ArgoCD sync started', 'Pod replica 6/6 ready', 'Health check HTTP 200 OK', 'Traffic 100% promoted'] }
    ]
  },
  {
    id: 'RUN-2026-1091',
    branch: 'feat/qris-webhook',
    commitHash: '3c19a4e',
    commitMessage: 'fix(crypto): verify bank HMAC signature using constant time comparison',
    author: 'Siti Sarah',
    status: 'success',
    startedAt: '45 menit yang lalu',
    environment: 'staging',
    stages: [
      { id: '1', name: 'Lint & SonarQube', status: 'success', duration: '25s', logs: ['Code style verified'] },
      { id: '2', name: 'Unit & Contract Test', status: 'success', duration: '41s', logs: ['HMAC timing attack test passed'] },
      { id: '3', name: 'SAST & Trivy Security Scan', status: 'success', duration: '29s', logs: ['Clean'] },
      { id: '4', name: 'Docker Build & Push', status: 'success', duration: '1m 05s', logs: ['Image built'] },
      { id: '5', name: 'Canary Deploy (Staging)', status: 'success', duration: '45s', logs: ['Staging cluster deployed'] }
    ]
  }
];

export const initialAlerts: SystemAlert[] = [
  {
    id: 'ALT-101',
    severity: 'warning',
    service: 'WA-Gateway-Service',
    message: 'Rate limit WhatsApp Cloud API mendekati 82% kuota menit ini',
    timestamp: '5 menit yang lalu',
    acknowledged: false,
    autoRemediated: false
  },
  {
    id: 'ALT-102',
    severity: 'info',
    service: 'Kube-Cluster-Worker-2',
    message: 'Horizontal Pod Autoscaler (HPA) menambah 2 pod baru untuk beban solat subuh',
    timestamp: '18 menit yang lalu',
    acknowledged: true,
    autoRemediated: true
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'AUD-991',
    timestamp: '2026-10-07 22:45:10',
    userId: 'usr-1',
    userName: 'Ir. Ahmad Fauzan',
    action: 'PROD_DEPLOY_TRIGGER',
    module: 'CI/CD Engine',
    ipAddress: '103.144.12.89',
    status: 'Success',
    details: 'Deployment v3.2.0 canary ke Kubernetes cluster produksi'
  },
  {
    id: 'AUD-992',
    timestamp: '2026-10-07 22:30:00',
    userId: 'usr-5',
    userName: 'H. Lukman Hakim',
    action: 'TRANSACTION_RECORD',
    module: 'Kas Komunitas Masjid',
    ipAddress: '182.253.90.14',
    status: 'Success',
    details: 'Penerimaan Infaq Digital TXN-202610-001 tercatat dengan SHA-256 hash chaining'
  },
  {
    id: 'AUD-993',
    timestamp: '2026-10-07 21:12:44',
    userId: 'usr-2',
    userName: 'Zulkipli DevOps',
    action: 'BRANCH_PROTECTION_UPDATE',
    module: 'Repository RBAC',
    ipAddress: '36.88.21.104',
    status: 'Success',
    details: 'Wajib 2 review approval & signed commits diaktifkan pada branch main'
  },
  {
    id: 'AUD-994',
    timestamp: '2026-10-07 20:05:19',
    userId: 'usr-6',
    userName: 'Farhan Security',
    action: 'SECRET_ROTATION_AUDIT',
    module: 'Security Vault',
    ipAddress: '114.122.33.10',
    status: 'Success',
    details: 'Verifikasi kepatuhan rotasi kunci API Bank Syariah 90-hari'
  }
];
