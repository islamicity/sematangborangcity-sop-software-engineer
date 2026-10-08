import { SOPDocument } from '../types';

export const documentsData: SOPDocument[] = [
  // ==================== 1. SOP SDLC & ENGINEERING ====================
  {
    id: 'sop-sdlc-01',
    title: 'SOP Software Development Lifecycle (SDLC)',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'DevOps Engineer', 'Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v3.2.0',
    updatedAt: '2026-09-15',
    summary: 'Standar alur siklus hidup rekayasa perangkat lunak Islamicity dari perencanaan, arsitektur, implementasi, verifikasi QA, hingga perilisan produksi berdaya tinggi.',
    tags: ['SDLC', 'Agile', 'Engineering', 'Architecture', 'Governance'],
    content: `# SOP Software Development Lifecycle (SDLC) Islamicity

## 1. Tujuan
Menjamin proses rekayasa perangkat lunak berjalan sistematis, aman, terukur, dan selaras dengan prinsip integritas (Amanah) serta keunggulan teknis (Itqan).

## 2. Ruang Lingkup
Berlaku untuk seluruh tim engineering: Backend, Frontend, DevOps, QA, dan Cloud Architect dalam ekosistem produk digital Islamicity.

## 3. Tahapan Siklus Pengembangan
1. **Analisis Kebutuhan & Desain Solusi (Week 0-1)**
   - Product Requirement Document (PRD) disetujui.
   - Architecture Decision Record (ADR) dibuat oleh Lead Architect.
   - Analisis estimasi beban komputasi dan database schema blueprint.
2. **Sprint Planning & Task Breakdown**
   - User stories dipecah menjadi sub-task dengan estimasi story points.
   - Definisi 'Definition of Done' (DoD) disepakati bersama.
3. **Pengembangan & Peer Review**
   - Branching mengikuti pedoman Git Flow.
   - Wajib linting, passing unit test minimum 80% coverage.
   - Peer review oleh minimal 2 engineer senior.
4. **Automated CI/CD Verification**
   - SAST (SonarQube) lolos tanpa kerentanan kritis / OWASP Top 10.
   - Container vulnerability scan (Trivy) lolos zero high/critical.
5. **Staging & QA UAT**
   - Deploy otomatis ke cluster staging Kubernetes.
   - UAT oleh Product Owner & Security Auditor.
6. **Production Deployment & Monitoring**
   - Canary deployment 10% -> 50% -> 100%.
   - Pemantauan real-time Apdex score (>0.95) dan latensi p95 (<150ms).`
  },
  {
    id: 'sop-git-02',
    title: 'SOP Git & Version Control',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'DevOps Engineer', 'Cloud Architect'],
    version: 'v2.4.0',
    updatedAt: '2026-08-20',
    summary: 'Prosedur baku pengelolaan repository kode sumber, sinkronisasi branch, penandatanganan commit GPG, dan kebersihan riwayat Git.',
    tags: ['Git', 'VCS', 'Security', 'GPG'],
    content: `# SOP Git & Version Control

## 1. Prinsip Dasar
- Semua repositori berada di private cloud org terenkripsi.
- Direct push ke \`main\` atau \`staging\` dilarang keras (Branch Protection Enforced).
- Setiap commit wajib ditandatangani GPG key terverifikasi.

## 2. Alur Kerja Kontributor
1. Lakukan \`git pull --rebase origin main\` sebelum membuat branch baru.
2. Format penamaan branch: \`feat/MODUL-nama-fitur\`, \`fix/MODUL-deskripsi-bug\`, \`refactor/nama-refactor\`.
3. Commit secara atomik, gunakan Conventional Commits standard (\`feat:\`, \`fix:\`, \`perf:\`, \`docs:\`).
4. Hindari commit file credential (.env, pem, id_rsa, build artifacts). Wajib \`.gitignore\` mutlak.`
  },
  {
    id: 'sop-branching-pr-03',
    title: 'SOP Git Branching & Pull Request',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-08-22',
    summary: 'Aturan pembuatan PR, penugasan reviewer, templating deskripsi perubahan, dan validasi CI pipeline otomatis.',
    tags: ['Pull Request', 'Branching', 'Code Quality'],
    content: `# SOP Git Branching & Pull Request

## 1. Pembuatan Pull Request (PR)
- PR harus memiliki judul yang jelas merujuk pada tiket issue tracker.
- Deskripsi PR wajib mengisi checklist:
  - [x] Latar belakang perubahan
  - [x] Langkah testing manual & otomatis
  - [x] Tangkapan layar / bukti uji performa
  - [x] Dampak terhadap migrasi skema DB (bila ada)

## 2. Persyaratan Penggabungan (Merge Gate)
- Minimal 2 approval dari Code Reviewer.
- Semua GitHub Actions / GitLab CI pipeline berstatus green (passed).
- Tidak ada unresolved comments.
- Strategi merge: Squash and Merge untuk menjaga riwayat git tetap rapi.`
  },
  {
    id: 'sop-code-review-04',
    title: 'SOP Code Review',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'Backend Engineer', 'Frontend Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-07-10',
    summary: 'Tata krama dan standar teknis dalam melakukan tinjauan kode: efisiensi algoritma, keamanan, arsitektur, dan readability.',
    tags: ['Code Review', 'Best Practice', 'Security'],
    content: `# SOP Code Review Islamicity

## 1. Etika & Pola Komunikasi
- Berikan masukan yang membangun dengan prinsip saling mengingatkan dalam kebaikan (*Tawashau bil Haq*).
- Pisahkan antara preferensi pribadi (nitpick) dan isu arsitektural/keamanan (blocking). Gunakan tag \`[BLOCKER]\`, \`[PERF]\`, \`[SECURITY]\`, atau \`[NIT]\`.

## 2. Ceklis Peninjau (Reviewer Checklist)
1. **Keamanan:** Bebas SQL Injection, XSS, CSRF, insecure deserialization, dan eksposur data sensitif.
2. **Performa:** Kompleksitas waktu/ruang (Big-O), hindari query N+1, utilisasi indexing database, dan caching Redis.
3. **Robustness:** Error handling komprehensif, tidak ada empty catch block, graceful shutdown handling.
4. **Dokumentasi:** Swagger/OpenAPI updated, tipe TypeScript ketat tanpa 'any'.`
  },
  {
    id: 'sop-bug-reporting-05',
    title: 'SOP Bug Reporting & Tracking',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'DevOps Engineer', 'Security Auditor'],
    version: 'v1.9.0',
    updatedAt: '2026-07-14',
    summary: 'Protokol pelaporan, triase tingkat keparahan (P0/P1/P2/P3), reproduksi bug, dan verifikasi perbaikan issue.',
    tags: ['Bug Tracking', 'QA', 'SLA'],
    content: `# SOP Bug Reporting & Tracking

## 1. Klasifikasi Tingkat Keparahan
- **P0 (Kritis):** Sistem down, transaksi keuangan terhenti, kebocoran data. Respon: < 15 menit, perbaikan: < 2 jam.
- **P1 (Tinggi):** Fitur utama tidak berjalan (misal: webhook pembayaran gagal), tidak ada workaround. Respon: < 1 jam.
- **P2 (Sedang):** Masalah fungsional non-kritis dengan workaround sementara. Respon: < 4 jam.
- **P3 (Rendah):** Kosmetik UI/UX, typo teks, minor visual glitch.

## 2. Format Laporan
Laporan wajib menyertakan: Environment (Prod/Staging), Device/Browser/OS, Langkah Reproduksi terurut, Expected vs Actual Behavior, dan Log Error Trace ID.`
  },
  {
    id: 'sop-incident-mgmt-06',
    title: 'SOP Incident Management',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'DevOps Engineer', 'Backend Engineer'],
    version: 'v3.0.0',
    updatedAt: '2026-09-01',
    summary: 'Tata kelola tanggap darurat insiden sistem: pembentukan War Room, peran Incident Commander, mitigasi cepat, dan komunikasi stakeholder.',
    tags: ['Incident Response', 'SRE', 'War Room'],
    content: `# SOP Incident Management & War Room

## 1. Pembagian Peran
- **Incident Commander (IC):** Memimpin koordinasi, mengambil keputusan rilis darurat atau failover.
- **Ops Lead:** Menggali log Loki/Grafana, memeriksa utilisasi CPU/Memory cluster Kubernetes, eksekusi restart atau scale out pod.
- **Comms Lead:** Mengirim pembaruan status berkala ke internal manajemen dan publik via Status Page setiap 20 menit.

## 2. Fase Penanganan
1. **Identifikasi & Triage:** Alert Prometheus/PagerDuty terpicu.
2. **Mitigasi Cepat:** Prioritaskan pemulihan layanan (Rollback / Traffic shift / Rate limiting / Cache warmup) sebelum investigasi root cause mendalam.
3. **Stabilisasi:** Pantau metrik selama 30 menit setelah status kembali hijau.
4. **Penutupan Insiden:** Notifikasi resolved dan penjadwalan Post-Mortem.`
  },
  {
    id: 'sop-prod-deploy-07',
    title: 'SOP Production Deployment',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v3.1.0',
    updatedAt: '2026-09-10',
    summary: 'Prosedur perilisan ke lingkungan produksi: jadwal window maintenance, canary deployment, health check otomatis, dan verifikasi pasca rilis.',
    tags: ['Deployment', 'Kubernetes', 'Canary', 'CI/CD'],
    content: `# SOP Production Deployment

## 1. Waktu Rilis (Deployment Window)
- Rilis terjadwal hanya diperbolehkan Senin - Kamis antara pukul 10:00 - 15:00 WIB.
- Dilarang rilis produksi pada hari Jumat sore, akhir pekan, atau malam hari kecuali Emergency Hotfix P0.

## 2. Alur Pelaksanaan
1. Verifikasi Changelog dan persetujuan Lead Architect.
2. Buat snapshot database dan backup point.
3. Jalankan automated pipeline dengan strategi Canary (10% traffic -> 15 menit soak -> 100%).
4. Verifikasi Synthetic Monitoring: HTTP 200 pada health check endpoint \`/api/healthz\`.
5. Apdex score harus stabil >= 0.98.`
  },
  {
    id: 'sop-rollback-08',
    title: 'SOP Rollback Production',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['DevOps Engineer', 'Cloud Architect'],
    version: 'v2.2.0',
    updatedAt: '2026-08-11',
    summary: 'Mekanisme pembalikan versi aplikasi dan skema database secara instan jika terjadi anomali kritis pasca deployment.',
    tags: ['Rollback', 'Disaster Recovery', 'Safety'],
    content: `# SOP Rollback Production

## 1. Pemicu Rollback Otomatis & Manual
Rollback WAJIB dieksekusi jika dalam 10 menit pasca deployment:
- Error rate HTTP 5xx melonjak > 1.0%.
- Latensi API p99 meningkat > 300%.
- Terdapat crash loop backoff pada pod aplikasi.
- Ditemukan anomali integritas data pada transaksi.

## 2. Prosedur Eksekusi
1. Tekan tombol 'Trigger Immediate Rollback' pada dashboard CI/CD Islamicity.
2. ArgoCD / Kubernetes menunjuk kembali ke hash image Docker stabil sebelumnya.
3. Jalankan rollback skema database bila terdapat migrasi backward-incompatible.
4. Validasi kembali kesehatan endpoint utama dan catat kejadian di log audit.`
  },
  {
    id: 'sop-db-migration-09',
    title: 'SOP Database Change & Migration',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Backend Engineer', 'Cloud Architect', 'DevOps Engineer'],
    version: 'v2.5.0',
    updatedAt: '2026-07-28',
    summary: 'Standar perubahan skema basis data, zero-downtime migration (expand-contract pattern), dan verifikasi indeks.',
    tags: ['Database', 'Postgres', 'Migration', 'Zero-Downtime'],
    content: `# SOP Database Change & Migration

## 1. Pola Expand & Contract (Zero Downtime)
Dilarang langsung menghapus atau mengubah nama kolom aktif. Gunakan langkah berikut:
- **Langkah 1 (Expand):** Tambahkan kolom baru, aplikasi menulis ke kedua kolom (dual write).
- **Langkah 2 (Backfill):** Jalankan script background migration untuk menyalin data lama secara bertahap (batch size 1,000 baris).
- **Langkah 3 (Contract):** Ubah aplikasi hanya membaca/menulis ke kolom baru.
- **Langkah 4 (Cleanup):** Hapus kolom lama setelah rilis stabil minimal 1 sprint.

## 2. Review Kueri
Semua migrasi DDL yang menambahkan index pada tabel besar (>100k baris) wajib menggunakan klausa \`CONCURRENTLY\` agar tidak mengunci tabel produksi.`
  },
  {
    id: 'sop-backup-restore-10',
    title: 'SOP Backup & Restore Database',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['DevOps Engineer', 'Cloud Architect'],
    version: 'v2.8.0',
    updatedAt: '2026-08-05',
    summary: 'Jadwal pencadangan otomatis (WAL streaming, snapshot harian), enkripsi AES-256 data cadangan, dan drill simulasi pemulihan berkala.',
    tags: ['Backup', 'Disaster Recovery', 'RTO', 'RPO'],
    content: `# SOP Backup & Restore Database

## 1. Spesifikasi Target (RTO & RPO)
- **RPO (Recovery Point Objective):** Maksimal 5 menit (Point-In-Time Recovery / Continuous WAL Archiving).
- **RTO (Recovery Time Objective):** Maksimal 30 menit untuk pemulihan sistem penuh.

## 2. Jadwal & Enkripsi
- Backup snapshot harian otomatis setiap pukul 02:00 WIB.
- Data backup dienkripsi di rest menggunakan AES-256 dan disimpan di multi-region cloud bucket dengan Write-Once-Read-Many (WORM) policy.
- Simulasi uji pemulihan (Disaster Recovery Drill) wajib dilakukan setiap 3 bulan sekali.`
  },
  {
    id: 'sop-access-mgmt-11',
    title: 'SOP Access Management Engineering',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'Security Auditor', 'DevOps Engineer'],
    version: 'v2.3.0',
    updatedAt: '2026-09-02',
    summary: 'Tata kelola hak akses berbasis peran (RBAC), prinsip Least Privilege, audit berkala, dan penghapusan akses mantan personil.',
    tags: ['RBAC', 'Access Control', 'Security'],
    content: `# SOP Access Management Engineering

## 1. Prinsip Least Privilege
Engineer hanya diberikan hak akses yang secara spesifik dibutuhkan untuk fungsinya. Akses produksi dibatasi ketat dan membutuhkan Just-In-Time (JIT) access request dengan time-to-live (TTL) maksimal 2 jam.

## 2. Autentikasi Kuat
Wajib menggunakan Hardware Token (FIDO2/WebAuthn) atau Time-based One-Time Password (TOTP 2FA) pada semua akun cloud, repository, dan VPN internal.`
  },
  {
    id: 'sop-onboarding-12',
    title: 'SOP Onboarding Software Engineer',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'Backend Engineer', 'Frontend Engineer', 'DevOps Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-06-18',
    summary: 'Langkah orientasi 14 hari bagi engineer baru: provisioning laptop, security training, setup dev environment, dan rilis first PR.',
    tags: ['Onboarding', 'Team Culture', 'Productivity'],
    content: `# SOP Onboarding Software Engineer Baru

## Rencana 14 Hari Pertama
- **Hari 1:** Penyerahan credential aman via password manager, setup 2FA, penjelasan Piagam Etika Kerja Islamicity (Amanah & Profesional).
- **Hari 2-3:** Setup environment lokal menggunakan DevContainers / Docker Compose, verifikasi build berhasil.
- **Hari 4-7:** Bedah arsitektur sistem bersama mentor, pengerjaan tiket \`good-first-issue\`.
- **Hari 8-10:** Rilis PR pertama ke staging, review mendalam bersama Lead Architect.
- **Hari 11-14:** Mengikuti on-call shadowing bersama senior engineer.`
  },
  {
    id: 'sop-offboarding-13',
    title: 'SOP Offboarding Software Engineer',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'Security Auditor'],
    version: 'v1.8.0',
    updatedAt: '2026-06-20',
    summary: 'Protokol penonaktifan akun, rotasi API key dan secret yang pernah diakses, serta serah terima dokumentasi teknis.',
    tags: ['Offboarding', 'Security', 'Compliance'],
    content: `# SOP Offboarding Software Engineer

## Ceklis Keamanan Penonaktifan
1. Revoke akses GitHub Org, AWS/GCP IAM, VPN, Jira, Slack, dan Grafana tepat pada hari terakhir kerja pukul 17:00 WIB.
2. Rotasi database shared secrets dan production credentials yang pernah diakses engineer yang bersangkutan dalam 30 hari terakhir.
3. Serah terima repositori pribadi, dokumentasi arsitektur, dan password manager vault.
4. Penandatanganan berita acara serah terima aset digital.`
  },
  {
    id: 'sop-tech-doc-14',
    title: 'SOP Technical Documentation',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-07-29',
    summary: 'Standar penulisan README, Architecture Decision Records (ADR), spesifikasi OpenAPI 3.0, dan diagram C4 Model.',
    tags: ['Documentation', 'ADR', 'OpenAPI', 'C4Model'],
    content: `# SOP Technical Documentation

## 1. Docs-as-Code
Dokumentasi teknis disimpan di dalam repository yang sama dengan kode sumber menggunakan format Markdown.

## 2. Standar Struktur README.md
Setiap repositori wajib memiliki:
- Deskripsi & Arsitektur Singkat
- Prasyarat (Node.js, Docker, Go, DB version)
- Panduan Instalasi Lokal 3 Langkah
- Daftar Environment Variables beserta default aman
- Panduan Menjalankan Unit & Integration Test
- Link ke Swagger/OpenAPI UI`
  },
  {
    id: 'sop-hotfix-15',
    title: 'SOP Emergency Hotfix',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Backend Engineer', 'DevOps Engineer', 'Cloud Architect'],
    version: 'v2.4.0',
    updatedAt: '2026-08-30',
    summary: 'Jalur cepat (Fast-Track) perbaikan bug kritis P0 di lingkungan produksi tanpa mengorbankan keamanan dan integritas audit.',
    tags: ['Hotfix', 'Emergency', 'Production'],
    content: `# SOP Emergency Hotfix

## Kriteria Fast-Track Hotfix
Hanya diizinkan untuk masalah P0 (Layanan down, celah keamanan aktif dieksploitasi, kehilangan data finansial).

## Prosedur Fast-Track
1. Buat branch langsung dari tag produksi terakhir: \`hotfix/deskripsi-kritis\`.
2. Implementasikan solusi minimal tertarget (*patch* terisolasi).
3. Review darurat oleh minimal 1 Lead Architect atau Tech Lead yang sedang on-call.
4. Jalankan automated pipeline dengan bypass manual test tetapi WAJIB lulus SAST & Security Scan.
5. Deploy dan pantau ketat selama 60 menit. Backport perubahan ke branch \`develop\` dan \`main\` segera.`
  },
  {
    id: 'sop-postmortem-16',
    title: 'SOP Post-Incident Review (Blameless Post-Mortem)',
    category: 'SOP SDLC & Engineering',
    targetRoles: ['Cloud Architect', 'DevOps Engineer', 'Backend Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-09-08',
    summary: 'Format analisa retrospektif pasca insiden dengan budaya tanpa menyalahkan individu (Blameless), berfokus pada akar masalah sistem.',
    tags: ['PostMortem', 'Blameless', 'RootCause', 'SRE'],
    content: `# SOP Post-Incident Review (Blameless Post-Mortem)

## Prinsip Budaya Blameless
Asumsikan semua engineer bertindak dengan niat baik dan informasi terbaik yang mereka miliki saat insiden terjadi. Fokus adalah memperbaiki celah proses, otomasi, dan proteksi sistem.

## Elemen Wajib Dokumen Post-Mortem:
- **Ringkasan Insiden & Dampak:** Durasi downtime, jumlah pengguna terdampak, metrik finansial/transaksi tertunda.
- **Timeline Rinci:** Kronologi menit ke menit dari pemicu awal, alert berbunyi, respon tim, hingga recovery.
- **Analisis Akar Masalah (5 Whys Method):** Eksplorasi hingga ke penyebab struktural.
- **Action Items (Pencegahan Rekurensi):** Tiket perbaikan teknis dengan PIC dan deadline tegas.`
  },

  // ==================== 2. PANDUAN PENGEMBANGAN ====================
  {
    id: 'panduan-project-baru-17',
    title: 'Panduan Memulai Project Software Baru',
    category: 'Panduan Pengembangan',
    targetRoles: ['Cloud Architect', 'Full Stack Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-07-01',
    summary: 'Checklist inisialisasi project: pemilihan template boilerplate, setup monorepo/polyrepo, konfigurasi linter, dan pipeline template.',
    tags: ['Project Setup', 'Boilerplate', 'Standards'],
    content: `# Panduan Memulai Project Software Baru

1. Pilih enterprise starter kit resmi Islamicity (Next.js/React + Vite, Go Gin / Node.js Express/Fastify).
2. Tentukan domain model dan batas bounded context layanan (DDD).
3. Setup file \`.editorconfig\`, \`.prettierrc\`, dan \`eslint.config.js\`.
4. Buat file \`.env.example\` lengkap dengan placeholder aman.
5. Daftarkan repository ke CI/CD registry dan pasang branch protection default.`
  },
  {
    id: 'panduan-dev-env-18',
    title: 'Panduan Setup Development Environment',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-07-05',
    summary: 'Standardisasi lingkungan lokal menggunakan Docker Compose, DevContainers, nvm, dan mock service lokal.',
    tags: ['DevEnv', 'Docker', 'Containers'],
    content: `# Panduan Setup Development Environment

- Gunakan Docker Compose untuk menjalankan Postgres, Redis, dan MinIO lokal.
- Kloning repository lalu jalankan \`cp .env.example .env.local\` dan isi token dev lokal.
- Jalankan perintah \`npm install\` atau \`pnpm install\`.
- Jalankan migrasi dan seeding data demo: \`npm run db:migrate && npm run db:seed\`.`
  },
  {
    id: 'panduan-repo-structure-19',
    title: 'Panduan Struktur Repository Project',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Cloud Architect'],
    version: 'v2.2.0',
    updatedAt: '2026-07-12',
    summary: 'Arsitektur modular berlapis: src/domain, src/application, src/infrastructure, src/interfaces (Clean Architecture / Hexagonal).',
    tags: ['Repo Structure', 'Clean Architecture', 'Folder Layout'],
    content: `# Panduan Struktur Repository Project (Clean Architecture)

\`\`\`
src/
├── domain/            # Entities, Value Objects, Domain Exceptions (Murni bebas framework)
├── application/       # Use Cases, DTOs, Repository Interfaces
├── infrastructure/    # Database adapters, HTTP clients, Cache, Third-party SDKs
├── interfaces/        # HTTP Handlers, Express/Fastify Routers, CLI, Middleware
└── config/            # Environment variable validation & global constants
\`\`\``
  },
  {
    id: 'panduan-naming-20',
    title: 'Panduan Penamaan File, Variable & Function',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v1.7.0',
    updatedAt: '2026-06-15',
    summary: 'Standar camelCase, PascalCase, kebab-case, penamaan predikat boolean, dan hindari singkatan ambigu.',
    tags: ['Naming', 'Conventions', 'Clean Code'],
    content: `# Panduan Penamaan Kode

- **Komponen React & Class:** PascalCase (\`UserProfileCard.tsx\`, \`PaymentProcessor\`).
- **File Helper & Services:** kebab-case atau camelCase konsisten (\`auth-service.ts\`, \`formatCurrency.ts\`).
- **Variabel & Fungsi:** camelCase deskriptif (\`calculateNetIncome()\`, \`activeDonationTotal\`).
- **Boolean:** Awali dengan predikat (\`isActive\`, \`hasPermission\`, \`shouldRetry\`).`
  },
  {
    id: 'panduan-clean-code-21',
    title: 'Panduan Menulis Clean Code',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.3.0',
    updatedAt: '2026-07-20',
    summary: 'Prinsip SOLID, DRY, KISS, fungsi satu tanggung jawab (SRP), dan early exit return pattern.',
    tags: ['Clean Code', 'SOLID', 'Refactoring'],
    content: `# Panduan Menulis Clean Code Islamicity

1. **Single Responsibility (SRP):** Satu fungsi hanya melakukan satu tugas secara tuntas.
2. **Early Return:** Gunakan guard clause di awal fungsi untuk memvalidasi input sebelum eksekusi logika utama.
3. **Hindari Magic Numbers:** Gunakan konstanta bernama atau enum.
4. **Komentar:** Tulis kode yang cukup jelas berbicara sendiri (*self-documenting*). Komentar hanya untuk menjelaskan *alasan* (why), bukan *apa* (what).`
  },
  {
    id: 'panduan-pr-baik-22',
    title: 'Panduan Membuat Pull Request yang Baik',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v1.8.0',
    updatedAt: '2026-06-25',
    summary: 'Kunci PR yang mudah ditinjau: ukuran perubahan kecil (<300 baris), konteks yang lengkap, dan screenshot bukti.',
    tags: ['Pull Request', 'Efficiency', 'Workflow'],
    content: `# Panduan Membuat Pull Request yang Baik

- Jaga ukuran PR tetap terfokus: rekomendasi maksimal 300 baris perubahan. PR raksasa (>1000 baris) berisiko terlewat dari audit teliti.
- Sertakan link ke user story atau bug report.
- Tuliskan langkah spesifik bagi reviewer untuk menguji fitur secara mandiri.`
  },
  {
    id: 'panduan-code-review-conduct-23',
    title: 'Panduan Melakukan Code Review',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Cloud Architect'],
    version: 'v1.9.0',
    updatedAt: '2026-07-15',
    summary: 'Cara meninjau secara cepat dan konstruktif: automasi linter vs fokus manusia pada arsitektur dan security.',
    tags: ['Code Review', 'Guidance', 'Teamwork'],
    content: `# Panduan Melakukan Code Review

- Delegasikan masalah formatting spasi/tab ke ESLint & Prettier otomatis.
- Fokus review manusia: logika bisnis, edge case penanganan nilai null/undefined, skalabilitas kueri, dan keamanan otorisasi.`
  },
  {
    id: 'panduan-debugging-24',
    title: 'Panduan Debugging Application',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-01',
    summary: 'Metode pelacakan masalah: correlation ID, remote debugging, inspeksi trace distributed OpenTelemetry, dan memory leak profiling.',
    tags: ['Debugging', 'Profiling', 'Observability'],
    content: `# Panduan Debugging Terstruktur

1. Isolasi masalah: Replikasi kegagalan pada lingkungan lokal dengan data uji minimal.
2. Gunakan Correlation ID (Trace ID) untuk melacak perjalanan request dari API gateway hingga database.
3. Gunakan memory profiler Node.js / Go pprof jika terdeteksi kebocoran memori.`
  },
  {
    id: 'panduan-unit-test-25',
    title: 'Panduan Membuat Unit Test',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.4.0',
    updatedAt: '2026-08-15',
    summary: 'Standar penulisan pengujian unit: AAA Pattern (Arrange, Act, Assert), mocking dependency, dan isolasi fungsional murni.',
    tags: ['Testing', 'Unit Test', 'Vitest', 'Jest'],
    content: `# Panduan Membuat Unit Test (AAA Pattern)

- **Arrange:** Siapkan mock data dan stub dependensi eksternal.
- **Act:** Jalankan method/fungsi target pengujian.
- **Assert:** Validasi output, status, dan pemanggilan stub.
- Hindari test yang rapuh (flaky test) dengan tidak bergantung pada timing riil atau server eksternal.`
  },
  {
    id: 'panduan-integration-api-test-26',
    title: 'Panduan Integration & API Testing',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'QA Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-08-20',
    summary: 'Pengujian terintegrasi menggunakan testcontainers, validasi kontrak payload JSON, status code HTTP, dan rollback DB transaksi pengujian.',
    tags: ['Integration Test', 'API Testing', 'Postman', 'Testcontainers'],
    content: `# Panduan Integration & API Testing

- Gunakan Testcontainers untuk menjalankan database Postgres sementara selama pengetesan.
- Setiap suite tes wajib berjalan di database terisolasi atau di dalam transaction yang di-rollback otomatis pasca eksekusi.`
  },
  {
    id: 'panduan-logging-27',
    title: 'Panduan Logging Application',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'DevOps Engineer', 'Cloud Architect'],
    version: 'v2.3.0',
    updatedAt: '2026-09-01',
    summary: 'Format structured logging (JSON), penentuan level log (DEBUG, INFO, WARN, ERROR), dan sanitasi masking data sensitif PII.',
    tags: ['Logging', 'JSON', 'Winston', 'Pino', 'Observability'],
    content: `# Panduan Logging Application Terstruktur

- Output log wajib berupa baris JSON satu baris (*NDJSON*) ke \`stdout\` agar mudah diparsing oleh Fluentbit/Vector/Loki.
- Dilarang keras mencatat kata sandi, token otentikasi, nomor kartu kredit, atau NIK secara mentah. Wajib masking (misal: \`***4213\`).`
  },
  {
    id: 'panduan-error-handling-28',
    title: 'Panduan Error Handling',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-08-28',
    summary: 'Custom Error Class hierarchy, graceful degradation, sanitasi pesan error ke klien publik, dan stack trace internal logging.',
    tags: ['Error Handling', 'Reliability', 'Exceptions'],
    content: `# Panduan Error Handling & Resiliensi

- Pisahkan antara Operational Errors (input salah, data not found) dan Programmer Bugs (null pointer, syntax error).
- Jangan tampilkan database error mentah ke respon API publik untuk mencegah reconnaissance serangan.`
  },
  {
    id: 'panduan-rest-api-29',
    title: 'Panduan Membuat REST API',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Full Stack Engineer', 'Cloud Architect'],
    version: 'v2.5.0',
    updatedAt: '2026-09-05',
    summary: 'Desain RESTful yang konsisten: endpoint kata benda jamak, HTTP verbs yang tepat, paginasi berbasis cursor, dan idempotensi.',
    tags: ['REST API', 'API Design', 'HTTP'],
    content: `# Panduan Membuat REST API

- Endpoint berbasis kata benda jamak: \`/api/v1/donations\`, \`/api/v1/jamaah/:id\`.
- Gunakan HTTP method yang sesuai: GET (ambil), POST (buat), PUT/PATCH (perbarui), DELETE (hapus).
- Request mutasi finansial wajib mendukung \`Idempotency-Key\` header untuk mencegah transaksi ganda saat network timeout.`
  },
  {
    id: 'panduan-api-docs-30',
    title: 'Panduan API Documentation',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Full Stack Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-10',
    summary: 'Standar OpenAPI / Swagger 3.0: skema request, response sample sukses & gagal, penjelasan otorisasi Bearer token.',
    tags: ['OpenAPI', 'Swagger', 'API Docs'],
    content: `# Panduan API Documentation (OpenAPI 3.0)

- Setiap endpoint wajib memiliki dokumentasi skema payload, validasi tipe data, contoh respons sukses (200/201), dan respons error (400, 401, 403, 404, 422, 500).`
  },
  {
    id: 'panduan-tech-debt-31',
    title: 'Panduan Technical Debt Management',
    category: 'Panduan Pengembangan',
    targetRoles: ['Cloud Architect', 'Backend Engineer', 'DevOps Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-08-25',
    summary: 'Strategi pengelolaan utang teknis: alokasi 20% kapasitas sprint, katalog hutang teknis, dan audit ketergantungan usang.',
    tags: ['Technical Debt', 'Refactoring', 'Architecture'],
    content: `# Panduan Technical Debt Management

- Setiap sprint mengalokasikan 15-20% kapasitas untuk melunasi utang teknis prioritas tinggi.
- Catat utang teknis sebagai tiket Jira berlabel \`tech-debt\` dengan estimasi risiko dan cost of delay.`
  },
  {
    id: 'panduan-refactoring-32',
    title: 'Panduan Refactoring Code',
    category: 'Panduan Pengembangan',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-30',
    summary: 'Prinsip refactoring aman: pastikan unit test hijau sebelum memulai, lakukan perubahan kecil bertahap, dan uji regresi.',
    tags: ['Refactoring', 'Code Quality', 'Clean Code'],
    content: `# Panduan Refactoring Code Aman

- **Aturan Emas:** Jangan merefaktor kode yang belum memiliki unit test memadai. Tulis unit test karakterisasi terlebih dahulu sebelum mengubah struktur.`
  },

  // ==================== 3. PEDOMAN KODE & ARSITEKTUR ====================
  {
    id: 'pedoman-coding-style-33',
    title: 'Pedoman Coding Style',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.3.0',
    updatedAt: '2026-07-18',
    summary: 'Standarisasi formatting TypeScript/JavaScript, ESLint flat config, semicolons, quotes, dan import sorting.',
    tags: ['Coding Style', 'TypeScript', 'Prettier'],
    content: `# Pedoman Coding Style

- Gunakan TypeScript strict mode (\`strict: true\`).
- Indentasi 2 spasi, single quotes untuk string, semicolons selalu diaktifkan.
- Urutkan import: (1) Standard Node modules, (2) Third-party libraries, (3) Internal modules/components, (4) Types/interfaces.`
  },
  {
    id: 'pedoman-naming-convention-34',
    title: 'Pedoman Naming Convention',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-06-20',
    summary: 'Aturan konvensi nama variabel, interface (tanpa prefix I), tipe union, enum, dan konstanta UPPER_SNAKE_CASE.',
    tags: ['Naming', 'Conventions'],
    content: `# Pedoman Naming Convention

- Interface tanpa prefix \`I\` (contoh: \`UserProfile\` bukan \`IUserProfile\`).
- Konstanta global menggunakan \`UPPER_SNAKE_CASE\` (contoh: \`MAX_RETRY_ATTEMPTS = 3\`).`
  },
  {
    id: 'pedoman-commit-msg-35',
    title: 'Pedoman Git Commit Message',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'DevOps Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-07-22',
    summary: 'Format baku Conventional Commits (type(scope): subject) untuk otomatisasi changelog dan semantic versioning.',
    tags: ['Git', 'Commit', 'Semantic Versioning'],
    content: `# Pedoman Git Commit Message

\`\`\`
<type>(<scope>): <subject singkat dalam bentuk imperatif>

[body penjelasan alasan perubahan bila diperlukan]

[footer referensi issue tracker: Closes #123]
\`\`\`
Tipe yang diizinkan: \`feat\`, \`fix\`, \`docs\`, \`style\`, \`refactor\`, \`perf\`, \`test\`, \`chore\`, \`ci\`.`
  },
  {
    id: 'pedoman-branch-naming-36',
    title: 'Pedoman Branch Naming',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'DevOps Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-07-08',
    summary: 'Format penamaan branch Git berbasis fitur, bugfix, hotfix, dan release.',
    tags: ['Git', 'Branching'],
    content: `# Pedoman Branch Naming

- Fitur baru: \`feat/modul-deskripsi\` (contoh: \`feat/wa-reminder-engine\`)
- Bugfix biasa: \`fix/modul-deskripsi\` (contoh: \`fix/qris-webhook-timeout\`)
- Hotfix darurat: \`hotfix/deskripsi\` (contoh: \`hotfix/jwt-expiration-leak\`)
- Rilis: \`release/v2.4.0\``
  },
  {
    id: 'pedoman-pr-37',
    title: 'Pedoman Pull Request',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-07-25',
    summary: 'Pedoman kelengkapan review, automated bot feedback, dan integrasi sonar security badge.',
    tags: ['Pull Request', 'Quality'],
    content: `# Pedoman Pull Request

Setiap PR harus lolos automated checks sebelum dapat dimerge. Approval minimal dari satu Tech Lead dan satu peer engineer.`
  },
  {
    id: 'pedoman-code-review-38',
    title: 'Pedoman Code Review',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Cloud Architect', 'Backend Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-03',
    summary: 'Standardisasi proses verifikasi kode secara berkala dan terdokumentasi.',
    tags: ['Code Review', 'Standards'],
    content: `# Pedoman Code Review Terstruktur

Reviewer wajib memastikan kode telah memenuhi kriteria kinerja, tidak membebani memori server, dan bebas dari celah injeksi.`
  },
  {
    id: 'pedoman-unit-testing-39',
    title: 'Pedoman Unit Testing',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-08-12',
    summary: 'Pedoman penulisan unit test mandiri, deterministik, dan cepat (<50ms per test file).',
    tags: ['Testing', 'Unit Test'],
    content: `# Pedoman Unit Testing

Unit test tidak boleh melakukan panggilan jaringan sungguhan atau akses filesystem persisten; gunakan mock dan stub in-memory.`
  },
  {
    id: 'pedoman-api-design-40',
    title: 'Pedoman API Design',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Cloud Architect'],
    version: 'v2.4.0',
    updatedAt: '2026-08-29',
    summary: 'Desain API konsisten: standard amplop JSON (\`data\`, \`meta\`, \`error\`), idempotency, dan rate limiting.',
    tags: ['API Design', 'Architecture'],
    content: `# Pedoman API Design Islamicity

Format respon standar:
\`\`\`json
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "2026-10-07T23:00:00Z", "traceId": "req-98af3c" },
  "error": null
}
\`\`\``
  },
  {
    id: 'pedoman-database-design-41',
    title: 'Pedoman Database Design',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Cloud Architect'],
    version: 'v2.3.0',
    updatedAt: '2026-08-18',
    summary: 'Normalisasi 3NF, pemilihan tipe data hemat memori (UUIDv7, TIMESTAMPTZ, BigInt), dan foreign key constraints.',
    tags: ['Database', 'Postgres', 'Data Model'],
    content: `# Pedoman Database Design

- Primary key wajib menggunakan UUIDv7 atau BigInt bertanda tangan.
- Setiap tabel transaksional wajib memiliki kolom \`created_at\` dan \`updated_at\` dengan zona waktu UTC (\`TIMESTAMPTZ\`).`
  },
  {
    id: 'pedoman-db-query-42',
    title: 'Pedoman Database Query',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-08-21',
    summary: 'Optimasi query Postgres: hindari \`SELECT *\`, gunakan parameterized query, pantau \`EXPLAIN ANALYZE\`, dan indeks komposit.',
    tags: ['PostgreSQL', 'Performance', 'Query Tuning'],
    content: `# Pedoman Database Query

- Selalu gunakan parameterized queries untuk menghindari SQL Injection.
- Pantau waktu eksekusi kueri; semua kueri operasional harus selesai di bawah 50ms.`
  },
  {
    id: 'pedoman-error-exception-43',
    title: 'Pedoman Error & Exception Handling',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-24',
    summary: 'Pengelolaan exception terpusat di Express/React Error Boundary untuk mencegah blank screen.',
    tags: ['Error Handling', 'Exceptions'],
    content: `# Pedoman Error & Exception Handling

Gunakan global error handling middleware di backend dan React Error Boundary di frontend untuk menangani kegagalan tanpa crash aplikasi.`
  },
  {
    id: 'pedoman-app-logging-44',
    title: 'Pedoman Application Logging',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'DevOps Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-09-02',
    summary: 'Aturan log rotasi, retensi 90 hari di cold storage, dan integrasi ELK / Grafana Loki.',
    tags: ['Logging', 'Grafana', 'Loki'],
    content: `# Pedoman Application Logging

Log level disetel ke INFO di produksi. Debug log hanya diaktifkan secara dinamis saat investigasi terfokus.`
  },
  {
    id: 'pedoman-config-mgmt-45',
    title: 'Pedoman Configuration Management',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['DevOps Engineer', 'Cloud Architect'],
    version: 'v2.1.0',
    updatedAt: '2026-08-04',
    summary: 'Prinsip 12-Factor App: simpan konfigurasi dalam environment variables, validasi skema runtime dengan Zod/Joi.',
    tags: ['Configuration', '12Factor', 'Zod'],
    content: `# Pedoman Configuration Management

Semua konfigurasi divalidasi saat startup aplikasi menggunakan skema Zod ketat. Jika variabel penting tidak ada, aplikasi gagal start (*fail-fast*).`
  },
  {
    id: 'pedoman-third-party-lib-46',
    title: 'Pedoman Third-Party Library',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Security Auditor'],
    version: 'v2.0.0',
    updatedAt: '2026-07-30',
    summary: 'Kriteria adopsi pustaka pihak ketiga: reputasi maintainer, lisensi bebas (MIT/Apache 2.0), dan bebas CVE kritis.',
    tags: ['Libraries', 'Security', 'OpenSource'],
    content: `# Pedoman Third-Party Library

Setiap penambahan dependensi npm baru harus lolos audit \`npm audit\` dan disetujui Tech Lead.`
  },
  {
    id: 'pedoman-adr-47',
    title: 'Pedoman Architecture Decision Record (ADR)',
    category: 'Pedoman Kode & Arsitektur',
    targetRoles: ['Cloud Architect', 'Backend Engineer'],
    version: 'v2.3.0',
    updatedAt: '2026-08-16',
    summary: 'Format pencatatan keputusan arsitektur (Status, Konteks, Keputusan, Konsekuensi) untuk kejelasan riwayat desain.',
    tags: ['ADR', 'Architecture', 'Governance'],
    content: `# Pedoman Architecture Decision Record (ADR)

Setiap keputusan perubahan struktur utama (misal: migrasi ke microservices atau pemilihan database) wajib didokumentasikan dalam format ADR.`
  },

  // ==================== 4. KEBIJAKAN KEAMANAN & RILIS ====================
  {
    id: 'kebijakan-branch-protection-48',
    title: 'Kebijakan Branch Protection',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v3.0.0',
    updatedAt: '2026-09-01',
    summary: 'Kebijakan wajib proteksi branch \`main\` dan \`release/*\`: no force-push, signed commits only, required approvals.',
    tags: ['Security', 'Branch Protection', 'Governance'],
    content: `# Kebijakan Branch Protection

- Force push (\`git push -f\`) dan penghapusan branch \`main\` dinonaktifkan secara permanen.
- Penggabungan kode hanya diizinkan melalui Pull Request yang telah melewati semua status check otomatis.`
  },
  {
    id: 'kebijakan-password-secret-49',
    title: 'Kebijakan Password & Secret Management',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Security Auditor', 'DevOps Engineer', 'Cloud Architect'],
    version: 'v2.8.0',
    updatedAt: '2026-09-03',
    summary: 'Penyimpanan secret di Vault/KMS, larangan hardcode credential di kode, dan rotasi otomatis setiap 90 hari.',
    tags: ['Secrets', 'Vault', 'Security', 'Encryption'],
    content: `# Kebijakan Password & Secret Management

- Dilarang keras menuliskan password, private key, atau API token dalam source code.
- Gunakan HashiCorp Vault atau AWS Secrets Manager dengan akses terenkripsi.`
  },
  {
    id: 'kebijakan-dependency-mgmt-50',
    title: 'Kebijakan Dependency Management',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['DevOps Engineer', 'Backend Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-08-15',
    summary: 'Audit otomatis celah keamanan dependensi, Dependabot scanning, dan pembaruan patch berkala.',
    tags: ['Dependabot', 'Vulnerabilities', 'Security'],
    content: `# Kebijakan Dependency Management

Pembaruan patch keamanan harus diintegrasikan dalam kurun waktu 7 hari kerja sejak publikasi CVE.`
  },
  {
    id: 'kebijakan-production-access-51',
    title: 'Kebijakan Production Access',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Cloud Architect', 'DevOps Engineer', 'Security Auditor'],
    version: 'v3.0.0',
    updatedAt: '2026-09-12',
    summary: 'Akses SSH/Kubectl produksi hanya melalui Bastion host dengan MFA dan pencatatan sesi (session recording).',
    tags: ['Production', 'Bastion', 'Audit', 'MFA'],
    content: `# Kebijakan Production Access

Akses langsung ke server produksi hanya diizinkan untuk DevOps On-Call yang memiliki persetujuan tiket darurat aktif.`
  },
  {
    id: 'kebijakan-data-handling-52',
    title: 'Kebijakan Data Handling Developer',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Backend Engineer', 'Security Auditor'],
    version: 'v2.4.0',
    updatedAt: '2026-08-20',
    summary: 'Perlindungan data pribadi (PII): data produksi dilarang di-dump ke laptop lokal, wajib anonimisasi untuk data testing.',
    tags: ['Data Privacy', 'PII', 'Compliance'],
    content: `# Kebijakan Data Handling Developer

Data pengujian lokal wajib menggunakan data sintetik atau data produksi yang telah dianonimisasi penuh (*data masking*).`
  },
  {
    id: 'kebijakan-sec-vuln-reporting-53',
    title: 'Kebijakan Security Vulnerability Reporting',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Security Auditor', 'DevOps Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-08-22',
    summary: 'Responsible disclosure program, email kontak keamanan khusus (security@islamicity.org), dan SLA respon 24 jam.',
    tags: ['Vulnerability', 'BugBounty', 'Disclosure'],
    content: `# Kebijakan Pelaporan Celah Keamanan

Laporan celah keamanan ditangani secara rahasia dan diberi apresiasi melalui program Responsible Disclosure Islamicity.`
  },
  {
    id: 'kebijakan-dr-backup-54',
    title: 'Kebijakan Backup & Disaster Recovery',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v2.6.0',
    updatedAt: '2026-09-04',
    summary: 'Kesiapan bencana (DR): replikasi multi-cloud / cross-region, failover DNS otomatis, dan pengujian berkala.',
    tags: ['Disaster Recovery', 'High Availability'],
    content: `# Kebijakan Disaster Recovery

Infrastruktur cadangan di region sekunder harus siap menangani 100% beban produksi dalam waktu kurang dari 30 menit.`
  },
  {
    id: 'kebijakan-eol-tech-55',
    title: 'Kebijakan End-of-Life Technology',
    category: 'Kebijakan Keamanan & Rilis',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v1.9.0',
    updatedAt: '2026-07-10',
    summary: 'Proses migrasi dari framework, runtime, dan OS yang mendekati masa End-of-Life (EOL) minimal 6 bulan sebelum sunset.',
    tags: ['EOL', 'Lifecycle', 'Compliance'],
    content: `# Kebijakan End-of-Life Technology

Semua sistem wajib menggunakan runtime versi LTS (Long Term Support) yang masih didukung resmi oleh komunitas.`
  },

  // ==================== 5. STANDAR KUALITAS & SLA ====================
  {
    id: 'standar-code-quality-56',
    title: 'Standar Source Code Quality',
    category: 'Standar Kualitas & SLA',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Cloud Architect'],
    version: 'v2.5.0',
    updatedAt: '2026-08-10',
    summary: 'Parameter kualitas SonarQube: zero security hotspot, kompleksitas siklomatis <15 per fungsi, dan nol duplikasi besar.',
    tags: ['Code Quality', 'SonarQube', 'Metrics'],
    content: `# Standar Source Code Quality

- Quality Gate SonarQube: Nilai A untuk Reliability, Security, dan Maintainability.
- Kompleksitas siklomatis maksimal 15 per method/fungsi.`
  },
  {
    id: 'standar-code-coverage-57',
    title: 'Standar Code Coverage',
    category: 'Standar Kualitas & SLA',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.2.0',
    updatedAt: '2026-08-15',
    summary: 'Ambang batas minimum unit test coverage: 80% line coverage untuk core business domain & transactional modules.',
    tags: ['Coverage', 'Testing', 'QA'],
    content: `# Standar Code Coverage

Coverage minimal 80% untuk package domain dan aplikasi. Penurunan coverage pada PR baru akan menggagalkan status check CI.`
  },
  {
    id: 'standar-sla-slo-58',
    title: 'Standar Service Level & Reliability (SLA/SLO/SLI)',
    category: 'Standar Kualitas & SLA',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v3.1.0',
    updatedAt: '2026-09-12',
    summary: 'Target ketersediaan 99.95% (Three Nines and a Half), error budget 21.6 menit per bulan, latensi p95 < 120ms.',
    tags: ['SLA', 'SLO', 'SLI', 'Reliability'],
    content: `# Standar Service Level & Reliability (SLA/SLO/SLI)

- **SLA Eksternal:** 99.9% availability untuk API pembayaran dan iuran.
- **SLO Internal:** 99.95% uptime bulanan.
- **SLI Kunci:** Rasio HTTP non-5xx terhadap total request dan latensi p95 di bawah 120ms.`
  },
  {
    id: 'standar-monitoring-alerting-59',
    title: 'Standar Monitoring & Alerting',
    category: 'Standar Kualitas & SLA',
    targetRoles: ['DevOps Engineer', 'Cloud Architect'],
    version: 'v2.4.0',
    updatedAt: '2026-09-08',
    summary: 'Metrik 4 Golden Signals Google SRE: Latency, Traffic, Errors, Saturation dengan visualisasi Grafana.',
    tags: ['Monitoring', 'Prometheus', 'Grafana', 'SRE'],
    content: `# Standar Monitoring & Alerting (4 Golden Signals)

Setiap layanan mikro wajib mengekspos metrik Prometheus: Latency, Traffic (RPS), Errors (5xx), dan Saturation (CPU/RAM).`
  },
  {
    id: 'standar-prod-readiness-60',
    title: 'Standar Production Readiness',
    category: 'Standar Kualitas & SLA',
    targetRoles: ['Cloud Architect', 'DevOps Engineer'],
    version: 'v2.6.0',
    updatedAt: '2026-09-05',
    summary: 'Checklist kesiapan produksi (PRC): load testing, alert rules aktif, dashboard Grafana terpasang, dan runbook tersedia.',
    tags: ['Production Readiness', 'Checklist', 'Launch'],
    content: `# Standar Production Readiness Checklist

Sebelum go-live, layanan harus lulus:
- [x] Stress testing 3x perkiraan beban puncak
- [x] Runbook operasional di wiki
- [x] Healthcheck endpoint \`/healthz\` aktif
- [x] PagerDuty rotation ditugaskan`
  },

  // ==================== 6. HR, TIM & ORGANISASI ====================
  {
    id: 'hr-rekrutmen-61',
    title: 'SOP Rekrutmen Karyawan Lengkap',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-07-01',
    summary: 'Proses seleksi talent berbasis kompetensi teknis, live coding objektif, dan keselarasan nilai integritas Islamicity.',
    tags: ['HR', 'Recruitment', 'Hiring'],
    content: `# SOP Rekrutmen Karyawan Lengkap

Tahapan seleksi: Screening portofolio -> Tes logika & live coding arsitektur -> Wawancara nilai kerja & integritas -> Penawaran resmi.`
  },
  {
    id: 'hr-pelatihan-62',
    title: 'SOP Program Pelatihan Karyawan',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'DevOps Engineer'],
    version: 'v1.8.0',
    updatedAt: '2026-07-05',
    summary: 'Program upskilling berkala: sertifikasi cloud (AWS/GCP/Kubernetes CKA), workshop keamanan, dan sharing session dua mingguan.',
    tags: ['HR', 'Training', 'Upskilling'],
    content: `# SOP Program Pelatihan Karyawan

Setiap engineer berhak atas budget sertifikasi profesional tahunan dan sesi Tech Talk internal setiap Jumat siang.`
  },
  {
    id: 'hr-aktivitas-harian-63',
    title: 'SOP Aktivitas Kerja Harian Karyawan',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-07-15',
    summary: 'Ritme kerja remote/hybrid: Daily Standup 15 menit, fokus waktu deep work, dan pembaruan tiket papan kanban.',
    tags: ['HR', 'Daily Standup', 'Agile'],
    content: `# SOP Aktivitas Kerja Harian

- Daily Standup pukul 09:30 WIB: Apa yang diselesaikan kemarin, rencana hari ini, dan kendala (blocker).
- Waktu Deep Work terproteksi dari meeting: pukul 13:00 - 16:00 WIB.`
  },
  {
    id: 'hr-cuti-64',
    title: 'SOP Pengajuan & Persetujuan Cuti',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v1.9.0',
    updatedAt: '2026-06-10',
    summary: 'Alur permohonan cuti tahunan, cuti ibadah (Umrah/Haji), dan pendelegasian tanggung jawab on-call sebelum cuti.',
    tags: ['HR', 'Leave', 'OnCall'],
    content: `# SOP Pengajuan & Persetujuan Cuti

Pengajuan cuti minimal 3 hari sebelumnya untuk cuti reguler, dan memastikan adanya pengganti jadwal jaga (on-call backup).`
  },
  {
    id: 'hr-resign-64b',
    title: 'SOP Proses Pengunduran Diri Karyawan',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Pengurus Komunitas / DKM', 'Cloud Architect'],
    version: 'v2.0.0',
    updatedAt: '2026-07-10',
    summary: 'Standar serah terima tugas (handover), periode one-month notice, pengembalian aset perangkat keras & pencabutan akses sistem (offboarding checklist).',
    tags: ['HR', 'Resignation', 'Handover', 'Offboarding'],
    content: `# SOP Proses Pengunduran Diri Karyawan (Resignation & Handover)

## 1. Pemberitahuan Resmi (One-Month Notice)
Karyawan menyampaikan surat pengunduran diri tertulis kepada manajemen dan HR minimal 30 hari kalender sebelum tanggal efektif.

## 2. Penyusunan Dokumen Serah Terima Tugas (Handover Document)
- Dokumentasi seluruh proyek berjalan, status tiket Jira, dan dokumentasi arsitektur.
- Sesi transfer pengetahuan (*knowledge transfer*) kepada rekan satu squad/tim minimal 10 hari sebelum hari terakhir.
- Penyerahan kredensial repository pribadi, branch lokal, dan catatan operasional.

## 3. Exit Clearance & Penonaktifan Akses
- Pengembalian laptop inventaris perusahaan, kartu akses, dan token hardware FIDO2.
- Penonaktifan akses email korporat, Slack, GitHub Org, dan VPN tepat pada pukul 17:00 WIB hari terakhir kerja.
- Penyelesaian hak kompensasi, sisa cuti, dan surat pengalaman kerja resmi.`
  },
  {
    id: 'hr-disiplin-64c',
    title: 'Standar Disiplin & Tata Tertib Karyawan',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Pengurus Komunitas / DKM', 'Cloud Architect', 'DevOps Engineer', 'Backend Engineer'],
    version: 'v2.1.0',
    updatedAt: '2026-07-20',
    summary: 'Kode etik profesionalisme islami (Amanah, Fathonah, Shiddiq, Tabligh), jam kerja, kehadiran, dan sanksi pelanggaran kerahasiaan data.',
    tags: ['HR', 'Disiplin', 'TataTertib', 'EtikaKerja'],
    content: `# Standar Disiplin & Tata Tertib Karyawan Islamicity

## 1. Nilai Dasar Kerja Islami
- **Amanah:** Menjaga kerahasiaan data pengguna, jamaah, donatur, dan aset teknologi perusahaan.
- **Itqan:** Bekerja dengan standar kualitas terbaik, tidak asal selesai, dan mengutamakan ketelitian kode.
- **Shiddiq:** Jujur dalam pelaporan jam kerja, status penyelesaian tiket, dan eskalasi kendala teknis.

## 2. Kehadiran & Ritme Kolaborasi
- Kehadiran wajib pada jam inti kolaborasi (*Core Hours*): 10:00 - 16:00 WIB.
- Mengikuti Daily Standup dan Sprint Review tepat waktu.
- Larangan membagikan credential atau data transaksi finansial kepada pihak ketiga tanpa otorisasi tertulis.`
  },
  {
    id: 'hr-struktur-org-65',
    title: 'Template Struktur Organisasi Perusahaan',
    category: 'HR, Tim & Organisasi',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-08-01',
    summary: 'Matriks struktur organisasi rekayasa perangkat lunak: Squad model, Chapter Leads, dan tim Platform/SRE sentral.',
    tags: ['Organization', 'Squad', 'Leadership'],
    content: `# Template Struktur Organisasi Perusahaan

Struktur terbagi menjadi:
- **Core Engineering:** Squad Transaksi, Squad Komunitas & Jamaah, Squad Frontend/Mobile
- **Platform Engineering:** Cloud & SRE Chapter, Security Chapter, Data Engineering`
  },

  // ==================== 7. TEMPLATE BISNIS & OPERASIONAL ====================
  {
    id: 'biz-infografis-modern-66',
    title: 'Template SmartArt Infografis Modern',
    category: 'Template Bisnis & Operasional',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-07-20',
    summary: 'Pedoman visual presentasi diagram alir data, arsitektur microservices, dan laporan eksekutif berstandar modern.',
    tags: ['Design', 'SmartArt', 'Infographic'],
    content: `# Template SmartArt Infografis Modern

Gunakan palette warna Islamicity (Emerald, Deep Slate, Indigo, Cyan) dengan rasio kontras WCAG AAA untuk visualisasi alur sistem.`
  },
  {
    id: 'biz-seo-strategy-67',
    title: 'Template Presentasi Strategi SEO',
    category: 'Template Bisnis & Operasional',
    targetRoles: ['Frontend Engineer', 'Pengurus Komunitas / DKM'],
    version: 'v1.7.0',
    updatedAt: '2026-06-25',
    summary: 'Panduan optimasi SEO teknis aplikasi web: SSR/SSG, Core Web Vitals (LCP < 2.5s, CLS < 0.1), dan Schema.org JSON-LD.',
    tags: ['SEO', 'CoreWebVitals', 'WebPerformance'],
    content: `# Template Presentasi Strategi SEO

Prioritas teknis:
- Core Web Vitals Hijau (LCP < 2.2s, FID < 100ms, CLS < 0.05).
- Penerapan semantic HTML dan Rich Snippet OpenGraph.`
  },
  {
    id: 'biz-customer-persona-68',
    title: 'Template Customer Persona Profesional',
    category: 'Template Bisnis & Operasional',
    targetRoles: ['Pengurus Komunitas / DKM', 'Full Stack Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-07-15',
    summary: 'Profil pemangku kepentingan: Jamaah Masjid digital, Muzakki zakat online, Pengurus DKM, dan pelaku UMKM binaan.',
    tags: ['Persona', 'Product', 'UX'],
    content: `# Template Customer Persona Profesional

- **Persona 1: Jamaah Aktif (Ahmad, 38 th):** Ingin kemudahan sedekah subuh otomatis dan laporan transparan lewat WhatsApp.
- **Persona 2: Pengurus DKM (Ust. Mansur, 52 th):** Butuh rekap kas masjid yang mudah diekspor ke PDF tanpa repot pembukuan manual.`
  },
  {
    id: 'biz-alur-proses-69',
    title: 'Infografis Alur Proses Bisnis',
    category: 'Template Bisnis & Operasional',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.1.0',
    updatedAt: '2026-08-10',
    summary: 'Diagram alir end-to-end: dari donasi jamaah via QRIS -> webhook perbankan -> verifikasi kriptografis -> update saldo realtime.',
    tags: ['Workflow', 'BusinessProcess', 'Architecture'],
    content: `# Infografis Alur Proses Bisnis Terintegrasi

Alur transaksi otomatis:
1. Jamaah scan QRIS / transfer VA
2. Gateway Bank Syariah mengirim Webhook bertanda tangan HMAC
3. Backend memverifikasi hash dan mencatat transaksi ke encrypted ledger
4. Bot WhatsApp mengirim bukti tanda terima real-time ke nomor HP donatur.`
  },
  {
    id: 'biz-struktur-sdm-69b',
    title: 'Infografis Struktur Tim & SDM',
    category: 'Template Bisnis & Operasional',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-08-12',
    summary: 'Visualisasi hierarki rekayasa perangkat lunak: Squad Agile, Chapter Leads, Product Owners, SRE On-Call, dan Pengurus DKM.',
    tags: ['SDM', 'TeamStructure', 'Infographic', 'Leadership'],
    content: `# Infografis Struktur Tim & Sumber Daya Manusia (SDM)

## 1. Pembagian Squad Berbasis Domain
- **Squad Core Platform & Finansial:** Lead Backend + 2 Fullstack + 1 Database Administrator.
- **Squad Komunitas & Jamaah:** Frontend Lead + Mobile Dev + UI/UX Designer.
- **Squad SRE, Cloud & Keamanan:** Cloud Architect + 2 DevOps Engineers + Security Auditor.

## 2. Garis Koordinasi & Tanggung Jawab
- Chief Technology Officer & Pengurus DKM mengawasi kepatuhan syariah dan SLA ketersediaan 99.95%.
- Chapter Lead bertanggung jawab atas standarisasi kode dan mentoring anggota tim junior.`
  },

  // ==================== 8. KEUANGAN & PROFIT KONTROL ====================
  {
    id: 'fin-omzet-sales-70',
    title: 'Dashboard Rekap Omzet Tim Sales',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.2.0',
    updatedAt: '2026-08-25',
    summary: 'Format rekapitulasi performa penjualan unit usaha UMKM komunitas dan kemitraan amal.',
    tags: ['Finance', 'Sales', 'Dashboard'],
    content: `# Dashboard Rekap Omzet Tim Sales

Metrik utama: Target bulanan, realisasi omzet, rata-rata tiket transaksi, dan margin laba kotor unit usaha binaan.`
  },
  {
    id: 'fin-kalkulator-omzet-71',
    title: 'Kalkulator Total Omzet Sales Otomatis',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-09-01',
    summary: 'Alat bantu hitung omzet otomatis dengan akumulasi harian, diskon, dan kalkulasi PPN/Zakat perniagaan.',
    tags: ['Calculator', 'Omzet', 'Automation'],
    content: `# Panduan Kalkulator Total Omzet Otomatis

Formula:
\`\`\`
Total Omzet = (Kuantitas Terjual * Harga Satuan) - Diskon Promosi
Zakat Usaha (2.5%) = (Laba Bersih Tahunan >= Nishab 85g Emas) * 0.025
\`\`\``
  },
  {
    id: 'fin-stok-akhir-72',
    title: 'Kalkulator Stok Akhir Otomatis',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v1.9.0',
    updatedAt: '2026-08-18',
    summary: 'Perhitungan persediaan barang dagang, buffer stock, reorder point, dan valuasi FIFO/LIFO.',
    tags: ['Inventory', 'Stock', 'Calculator'],
    content: `# Kalkulator Stok Akhir Otomatis

\`\`\`
Stok Akhir = Stok Awal + Barang Masuk - Barang Keluar - Barang Rusak
Reorder Point = (Lead Time Hari * Rata-rata Penjualan Harian) + Safety Stock
\`\`\``
  },
  {
    id: 'fin-payroll-lembur-73',
    title: 'Kalkulator Upah & Lembur Karyawan',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.1.0',
    updatedAt: '2026-09-05',
    summary: 'Kalkulasi gaji pokok, insentif performa, perhitungan jam lembur sesuai regulasi, dan potongan iuran kesehatan.',
    tags: ['Payroll', 'Wages', 'HRFinance'],
    content: `# Kalkulator Upah & Lembur Karyawan

Perhitungan lembur:
- Jam pertama: 1.5x upah per jam
- Jam berikutnya: 2.0x upah per jam (Upah per jam = 1/173 x Gaji Pokok & Tunjangan Tetap)`
  },
  {
    id: 'fin-rekap-pengeluaran-73b',
    title: 'Template Rekap Pengeluaran Bisnis',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-09-08',
    summary: 'Klasifikasi beban operasional: Biaya Cloud (K8s/AWS), Bandwidth CDN, Domain SSL, Beban Utilitas, dan Logistik Kantor.',
    tags: ['Expense', 'FinOps', 'Accounting', 'CloudCosts'],
    content: `# Template Rekap Pengeluaran Bisnis & Usaha

## 1. Komponen Pengeluaran Operasional (OPEX)
- **Infrastruktur Komputasi Cloud:** Cluster Kubernetes GKE/EKS, Database HA, Redis Cache.
- **Biaya Jaringan & Lisensi:** Gateway WhatsApp API, Domain TLD, Lisensi Monitoring Sentry/Datadog.
- **Beban Umum:** Listrik, Air PDAM, Pemeliharaan Server On-Premise, Logistik.

## 2. Prosedur Verifikasi
Semua bukti pengeluaran di atas Rp 1.000.000 wajib dilampiri kuitansi sah atau invoice digital dan disetujui Bendahara DKM.`
  },
  {
    id: 'fin-laba-bersih-73c',
    title: 'Laporan Laba Bersih Bulanan',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.2.0',
    updatedAt: '2026-09-12',
    summary: 'Format ikhtisar rugi laba bulanan: Total Revenue, COGS/HPP, Gross Profit, Total OPEX, EBIT, dan Net Profit Margin.',
    tags: ['IncomeStatement', 'ProfitAndLoss', 'NetProfit', 'FinancialReport'],
    content: `# Laporan Laba Bersih Bulanan (Income Statement)

## Struktur Laporan Standar
\`\`\`
1. PENDAPATAN USAHA (REVENUE)
   - Penjualan Unit Usaha UMKM
   - Layanan Cloud Managed Service
   TOTAL PENDAPATAN: Rp [TOTAL_REVENUE]

2. BEBAN POKOK PENJUALAN (HPP/COGS): Rp [HPP]
   LABA KOTOR (GROSS PROFIT): Rp [GROSS_PROFIT]

3. BEBAN OPERASIONAL (OPEX):
   - Biaya Server Cloud & IT
   - Beban Gaji & Payroll
   - Operasional & Pemeliharaan
   TOTAL BEBAN OPERASIONAL: Rp [TOTAL_OPEX]

4. LABA BERSIH SEBELUM ZAKAT & PAJAK (EBIT): Rp [NET_INCOME]
   - Alokasi Zakat Perniagaan (2.5%): Rp [ZAKAT]
   LABA BERSIH TAHANAN: Rp [RETAINED_EARNINGS]
\`\`\``
  },
  {
    id: 'fin-rekap-jam-payroll-73d',
    title: 'Rekap Jam Kerja & Payroll Bulanan',
    category: 'Keuangan & Profit Kontrol',
    targetRoles: ['Pengurus Komunitas / DKM', 'Cloud Architect'],
    version: 'v2.1.0',
    updatedAt: '2026-09-15',
    summary: 'Rekapitulasi absensi finger/biometrik, jam on-call shift malam, total lembur, tunjangan kehadiran, dan slip gaji terenkripsi.',
    tags: ['Payroll', 'Timesheet', 'Attendance', 'Wages'],
    content: `# Rekap Jam Kerja & Payroll Bulanan

## 1. Komponen Timesheet Kerja
- Standar jam kerja: 40 jam per minggu (8 jam per hari kerja).
- Shift On-Call DevOps SRE: Insentif siaga malam Rp 150.000 per shift + upah lembur reguler bila menangani insiden P0.

## 2. Jadwal Cut-Off & Transfer
- Periode cut-off absensi: Tanggal 21 bulan lalu s/d tanggal 20 bulan berjalan.
- Penyaluran payroll ke rekening Bank Syariah (BSI) karyawan: Setiap tanggal 25.`
  },

  // ==================== 9. DAKWAH & MANAJEMEN MASJID ====================
  {
    id: 'dakwah-kas-masjid-74',
    title: 'SOP Pengelolaan Kas Masjid & Transparansi Donasi',
    category: 'Dakwah & Manajemen Masjid',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v3.0.0',
    updatedAt: '2026-09-10',
    summary: 'SOP tata kelola keuangan masjid syariah: pemisahan rekening Infaq, Zakat, dan Operasional, pencatatan encrypted ledger, dan rilis publik Jumat.',
    tags: ['Masjid', 'Syariah', 'Transparansi', 'Kas'],
    content: `# SOP Pengelolaan Kas Masjid & Transparansi Dana Umat

## 1. Pemisahan Dana Sesuai Syariat
- **Dana Infaq & Sedekah Terikat:** Wajib disalurkan sesuai akad wakif/donatur.
- **Dana Zakat (Fitrah & Mal):** Wajib didistribusikan kepada 8 asnaf yang berhak, tidak boleh dipakai operasional fisik masjid.
- **Kas Operasional Masjid:** Digunakan untuk listrik, kebersihan, muadzin, marbot, dan pemeliharaan fasilitas ibadah.

## 2. Pelaporan Digital Terbuka
- Laporan arus kas diperbarui secara real-time di layar monitor masjid dan portal publik Islamicity.
- Setiap penerimaan donasi langsung dicatat ke ledger terenkripsi hash SHA-256.`
  },
  {
    id: 'dakwah-wa-reminder-75',
    title: 'SOP Pengingat Iuran Jamaah via WhatsApp API',
    category: 'Dakwah & Manajemen Masjid',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.4.0',
    updatedAt: '2026-09-02',
    summary: 'Prosedur pengiriman notifikasi pengingat iuran bulanan dan agenda kajian mingguan menggunakan WhatsApp Cloud API resmi yang santun dan personal.',
    tags: ['WhatsApp', 'Notification', 'Jamaah', 'Automation'],
    content: `# SOP Notifikasi Pengingat Iuran Jamaah via WhatsApp API

## 1. Jadwal Pengiriman
- Pengingat ramah pertama dikirimkan setiap tanggal 25 bulan berjalan pukul 08:30 WIB.
- Pesan apresiasi tanda terima otomatis terkirim < 5 detik setelah pembayaran terverifikasi bank.

## 2. Bahasa & Etika Pesan
- Gunakan sapaan islami yang hangat (*Assalamu'alaikum Warahmatullahi Wabarakatuh*).
- Sertakan link pembayaran instan virtual account resmi dan tombol download bukti kuitansi PDF digital.`
  },
  {
    id: 'dakwah-bank-sync-76',
    title: 'SOP Integrasi Sinkronisasi Bank Syariah & QRIS',
    category: 'Dakwah & Manajemen Masjid',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.2.0',
    updatedAt: '2026-08-30',
    summary: 'Protokol integrasi API Open Banking dengan BSI, Bank Muamalat, dan BCA Syariah dengan enkripsi data end-to-end.',
    tags: ['Banking', 'API', 'Syariah', 'QRIS', 'Security'],
    content: `# SOP Integrasi Bank Syariah & QRIS

## 1. Keamanan Transaksi
- Setiap request webhook perbankan wajib diverifikasi signature HMAC-SHA256 menggunakan secret key khusus DKM.
- Tidak menyimpan nomor kartu atau PIN perbankan; integrasi murni mengandalkan Virtual Account dan QRIS Dinamis Bank Indonesia.`
  },
  {
    id: 'dakwah-agenda-mingguan-77',
    title: 'SOP Agenda Kegiatan Mingguan & Pengingat Kajian',
    category: 'Dakwah & Manajemen Masjid',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.0.0',
    updatedAt: '2026-08-15',
    summary: 'Manajemen jadwal salat berjamaah, kuliah subuh, kajian tematik akhir pekan, dan integrasi Google Calendar / Workspace.',
    tags: ['Kajian', 'Jadwal', 'GoogleWorkspace', 'Dakwah'],
    content: `# SOP Agenda Kegiatan Mingguan Masjid

Pengurus menyinkronkan agenda kegiatan dakwah ke Google Calendar bersama dan mendistribusikan broadcast jadwal ke grup jamaah 24 jam sebelum acara.`
  },
  {
    id: 'dakwah-profil-jamaah-78',
    title: 'SOP Manajemen Data Jamaah & Privasi Cloud',
    category: 'Dakwah & Manajemen Masjid',
    targetRoles: ['Pengurus Komunitas / DKM', 'Security Auditor'],
    version: 'v2.5.0',
    updatedAt: '2026-09-08',
    summary: 'Perlindungan basis data warga dan donatur tetap: enkripsi di database, hak akses pengurus, dan riwayat infaq terverifikasi.',
    tags: ['Jamaah', 'Privacy', 'Database', 'Security'],
    content: `# SOP Manajemen Data Jamaah

Data kontak jamaah hanya boleh digunakan untuk keperluan dakwah dan pelaporan transparansi kas. Dilarang diperjualbelikan atau dibagikan ke pihak ketiga mana pun.`
  }
];

// ==================== 10. 57+ TEMPLATE OPERASIONAL SIAP PAKAI ====================
const operational57Templates = [
  'Checklist Harian DevOps On-Call', 'Template Runbook Microservices Failover', 'Formulir Just-in-Time Production Access',
  'Formulir Pengajuan Perubahan Skema DDL', 'Template Security Assessment OWASP ASVS', 'Checklist Go-Live Launch Day Readiness',
  'Template Service Level Agreement (SLA) Mitra', 'Template Post-Mortem Incident Timeline', 'Matriks RACI Tim Rekayasa Perangkat Lunak',
  'Pedoman Konfigurasi ArgoCD GitOps', 'Panduan Deployment Kubernetes Helm Chart', 'Formulir Serah Terima Proyek Software',
  'Checklist Audit Akses Kuartalan (SOC2/ISO27001)', 'Template RFP (Request for Proposal) Cloud Provider', 'Formulir Berita Acara Migrasi Data',
  'Pedoman Penanganan Kebocoran Data (Data Breach)', 'Template Standar Dokumentasi API Swagger', 'Checklist Konfigurasi Bastion Host SSH',
  'Pedoman Enkripsi Data Rest & Transit', 'Template Kebijakan Password Korporat', 'Pedoman Rotasi Kunci SSH & TLS Certificate',
  'Format Laporan Audit Keamanan Kuartalan', 'Template Perjanjian Kerahasiaan (NDA) Engineer', 'Formulir Permintaan Server Baru',
  'Checklist Decommissioning Server Lama', 'Template Analisis Kapasitas Infrastruktur Cloud', 'Panduan Setup OpenTelemetry & Jaeger',
  'Pedoman Tuning Kernel Linux untuk High-Traffic', 'Template Kebijakan Remote Work & VPN', 'Formulir Permintaan Perangkat Lunak Berlisensi',
  'Template Evaluasi Kinerja Engineer (KPI/OKR)', 'Pedoman Penulisan RFC (Request for Comments)', 'Format Notifikasi Insiden ke Pengguna',
  'Template Berita Acara Rollback Rilis', 'Formulir Pengajuan Akun Cloud Developer', 'Panduan Konfigurasi Rate Limiting Envoy',
  'Checklist Verifikasi Backup Database Bulanan', 'Pedoman Penanganan DDOS Attack', 'Template Analisis Biaya Cloud FinOps',
  'Format Usulan Optimasi Query Database', 'Checklist QA UAT Fungsional Aplikasi', 'Template Kebijakan BYOD (Bring Your Own Device)',
  'Pedoman Penamaan Resource Cloud AWS/GCP', 'SOP Pemeliharaan Genset & UPS Data Center', 'Checklist Kesiapan Audit Sertifikasi Syariah',
  'Template Berita Acara Kerusakan Hardware', 'Formulir Izin Kerja Lembur Darurat', 'Panduan Setup GitLab Runner Dedicated',
  'Format Laporan Bug Bounty Program', 'Template Matrix Matriks Risiko TI (Risk Register)', 'SOP Penanganan False Positive Alert',
  'Checklist Sanitasi Data Pengujian Testing', 'Panduan Konfigurasi WAF Cloudflare', 'Format Surat Kuasa Akses Server Finansial',
  'Checklist Inspeksi Sanitasi AC Ruang Server', 'Template Logbook Kunjungan Data Center Fisik', 'SOP Rotasi Password Akun Root Multi-Cloud'
];

operational57Templates.forEach((title, idx) => {
  documentsData.push({
    id: `template-operasional-${idx + 101}`,
    title: title,
    category: 'Template Operasional Siap Pakai',
    targetRoles: ['DevOps Engineer', 'Cloud Architect', 'Backend Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-09-01',
    summary: `Dokumen template operasional terstandarisasi untuk ${title} dalam tata kelola infrastruktur dan rekayasa perangkat lunak enterprise Islamicity.`,
    tags: ['Operational', 'Template', 'Enterprise', 'Checklist', 'SRE'],
    content: `# ${title}

## 1. Tujuan & Sasaran Operasional
Dokumen ini merupakan panduan terstandarisasi bagi tim teknis untuk mengeksekusi '${title}' secara presisi, akuntabel, dan patuh terhadap tata kelola enterprise Islamicity.

## 2. Prosedur Kerja & Langkah Pelaksanaan
1. **Verifikasi Prasyarat:** Pastikan seluruh dependensi, izin akses JIT, dan rencana kontinjensi telah tervalidasi.
2. **Eksekusi Langkah:** Jalankan tahapan tugas sesuai spesifikasi teknis tanpa deviasi tanpa persetujuan Lead Architect.
3. **Pencatatan Audit:** Dokumentasikan hasil dan timestamp pelaksanaan ke dalam sistem audit trail kekal.
4. **Verifikasi Pasca Aksi:** Lakukan pengecekan kesehatan metrik sistem dan konfirmasi stabilitas operasional.

## 3. Otorisasi & Penanggung Jawab
- Disusun oleh: Tim Platform & SRE Islamicity
- Disahkan oleh: Chief Technology Officer & Pengurus DKM`
  });
});

// ==================== 11. 38+ DOKUMEN SISTEM BISNIS LENGKAP ====================
const business38Documents = [
  'Piagam Tata Kelola TI & Syariah (IT Governance Charter)', 'Kebijakan Keberlanjutan Bisnis (Business Continuity Plan - BCP)',
  'Matriks Kepatuhan Regulasi Finansial & OJK/BI', 'Pedoman Hubungan Kemitraan Strategis & Vendor SLA',
  'Kebijakan Kedaulatan & Lokalisasi Data (Data Sovereignty)', 'Pedoman Manajemen Perubahan Organisasi (Change Management)',
  'Perjanjian Kerahasiaan Mitra Pihak Ketiga (Vendor NDA)', 'Kebijakan Pengadaan Perangkat Keras & Lisensi Lunak',
  'Standar Etika Bisnis & Anti-Penyuapan Islami', 'Pedoman Komunikasi Krisis & Hubungan Masyarakat',
  'Kebijakan Manajemen Aset Digital & Intelektual', 'Standar Penjaminan Kualitas Layanan Pengguna (QoS)',
  'Pedoman Kemitraan Usaha Mikro & Binaan Dakwah', 'Prosedur Verifikasi Kelayakan Vendor Cloud',
  'Pedoman Penyelesaian Sengketa Kontrak Kerjasama', 'Kebijakan Hak Cipta Perangkat Lunak Internal',
  'Prosedur Pelaporan Gratifikasi & Benturan Kepentingan', 'Standar Penilaian Risiko Investasi Teknologi Baru',
  'Pedoman Penyelenggaraan Rapat Umum Pemegang Saham / Pengurus', 'Kebijakan Asuransi Aset Komputasi Kritis',
  'Standar Pengarsipan Dokumen Legal & Notarial', 'Pedoman Pengawasan Transaksi Keuangan Digital',
  'Kebijakan Transformasi Digital Unit Usaha Masjid', 'Standar Pelayanan Prima Jamaah & Muzakki',
  'Pedoman Audit Kepatuhan Syariah Tahunan', 'Kebijakan Retensi Rekam Jejak Transaksi Finansial',
  'Pedoman Manajemen Mutu ISO 9001 untuk Software', 'Pedoman Keamanan Informasi ISO 27001 Terpadu',
  'Pedoman Manajemen Privasi Data Pribadi (UU PDP)', 'Kebijakan Tanggung Jawab Sosial Perusahaan (CSR / ZIS)',
  'Standar Evaluasi Nilai Tambah Investasi TI (ROI/TCO)', 'Pedoman Program Loyalitas & Donatur Berkelanjutan',
  'Kebijakan Perlindungan Whistleblower Internal', 'Prosedur Mediasi Masalah Layanan Jamaah',
  'Standar Perizinan PSE Kominfo untuk Platform Dakwah', 'Pedoman Pemanfaatan Artificial Intelligence Beretika',
  'Kebijakan Zero Trust Architecture Korporat', 'Pedoman Suksesi Kepemimpinan Teknis & DKM'
];

business38Documents.forEach((title, idx) => {
  documentsData.push({
    id: `dokumen-bisnis-${idx + 201}`,
    title: title,
    category: 'Dokumen Sistem Bisnis Lengkap',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM'],
    version: 'v2.1.0',
    updatedAt: '2026-08-20',
    summary: `Dokumen kebijakan dan sistem bisnis terpadu '${title}' untuk menjamin kelangsungan, kepatuhan legal, dan tata kelola profesional.`,
    tags: ['Business', 'Governance', 'Compliance', 'Policy', 'Legal'],
    content: `# ${title}

## 1. Landasan Kebijakan & Prinsip Hukum
Kebijakan ini disusun berdasarkan regulasi perundang-undangan yang berlaku serta prinsip muamalah syariah yang menjunjung tinggi keadilan, transparansi, dan kemaslahatan bersama.

## 2. Ketentuan & Klausul Pokok
1. **Ruang Lingkup:** Mengikat seluruh pemangku kepentingan, jajaran direksi, komite pengawas syariah, pengurus DKM, dan staf engineering.
2. **Kepatuhan Wajib:** Pelanggaran terhadap klausul dalam dokumen ini dapat dikenakan sanksi administratif dan hukum sesuai ketentuan organisasi.
3. **Mekanisme Pengawasan:** Audit kepatuhan berkala dilakukan oleh Komite Audit Independen setiap kuartal.

## 3. Lembar Pengesahan
- Ditetapkan di: Jakarta, Indonesia
- Dewan Pengawas: Dewan Syariah & Direksi Yayasan Islamicity`
  });
});

// ==================== 12. 22+ TEMPLATE KEUANGAN & KONTROL PROFIT ====================
const finance22Templates = [
  'Buku Kas Harian Unit Usaha Komunitas', 'Jurnal Umum Transaksi Keuangan Masjid',
  'Format Rekonsiliasi Rekening Koran Bank Syariah', 'Laporan Arus Kas Bulanan Metode Langsung',
  'Format Neraca Saldo Keuangan Komunitas', 'Daftar Aset Tetap & Penyusutan Mesin/Server',
  'Kalkulator Break Even Point (BEP) Unit Usaha', 'Template Rencana Anggaran Biaya (RAB) Tahunan',
  'Formulir Pengajuan Dana Kas Kecil (Petty Cash)', 'Format Tanda Terima Zakat, Infaq & Sedekah (ZIS)',
  'Laporan Pertanggungjawaban Keuangan Qurban', 'Buku Piutang Anggota & Jadwal Pelunasan',
  'Daftar Utang Usaha & Tanggal Jatuh Tempo', 'Template Analisis Rasio Likuiditas & Solvabilitas',
  'Format Kuitansi Digital Bertanda Tangan QR Hash', 'Kalkulator Zakat Mal Emas, Tabungan & Saham',
  'Template Alokasi Dana Hak Amil Zakat 12.5%', 'Buku Kas Penyaluran Beasiswa Pendidikan Santri',
  'Format Laporan Donasi Tanggap Bencana Darurat', 'Template FinOps Optimasi Tagihan GCP/AWS Cloud',
  'Kalkulator Biaya Pokok Produksi (HPP) Kuliner Binaan', 'Format Laporan Audit Finansial Publik Hari Jumat'
];

finance22Templates.forEach((title, idx) => {
  documentsData.push({
    id: `template-keuangan-${idx + 301}`,
    title: title,
    category: 'Template Keuangan & Profit',
    targetRoles: ['Pengurus Komunitas / DKM'],
    version: 'v2.2.0',
    updatedAt: '2026-09-05',
    summary: `Format dan instrumen kontrol finansial '${title}' untuk akuntansi akurat, transparansi dana umat, dan optimalisasi profit UMKM.`,
    tags: ['Finance', 'Accounting', 'ProfitControl', 'Syariah', 'Audit'],
    content: `# ${title}

## 1. Maksud & Tujuan Pelaporan
Instrumen akuntansi standar untuk mencatat, mengklasifikasi, dan mengikhtisarkan transaksi moneter terkait '${title}' secara akurat dan transparan.

## 2. Format Tabel Pencatatan Baku
| No | Tanggal | Uraian Transaksi | Ref Bukti | Debet (IDR) | Kredit (IDR) | Saldo Berjalan (IDR) |
|---|---|---|---|---|---|---|
| 1 | 2026-10-01 | Saldo Awal Pembukuan | SA-001 | - | - | [SALDO_AWAL] |
| 2 | 2026-10-05 | Penerimaan Dana Terverifikasi | TR-102 | [NOMINAL_MASUK] | - | [SALDO_BARU] |

## 3. Ketentuan Verifikasi Syariah
- Seluruh dana non-halal (bila ada jasa bunga bank konvensional) wajib disendirikan ke pos kebajikan sosial umum.
- Tanda tangan verifikasi wajib diparaf oleh Bendahara dan Ketua DKM.`
  });
});

// ==================== 13. 16+ TEMPLATE BRIEFING, EVALUASI & MONITORING ====================
const evaluation16Templates = [
  'Template Agenda Briefing Harian Pagi (Daily Standup)', 'Format Notula Rapat Evaluasi Sprint Mingguan',
  'Template Evaluasi Kinerja OKR Kuartalan Engineer', 'Checklist Health Check Kesehatan Tim & Morale',
  'Format Rekomendasi Sprint Retrospektif (Start/Stop/Continue)', 'Template Evaluasi Vendor Cloud & Pihak Ketiga',
  'Format Briefing Tanggap Darurat Insiden P0 (War Room)', 'Template Evaluasi Efektivitas Pelatihan Karyawan',
  'Format Kuesioner Kepuasan Jamaah & Komunitas', 'Checklist Evaluasi Kesiapan Rilis Fitur Utama',
  'Template Review Arsitektur Teknis Sistem (Architecture Review)', 'Format Briefing Pengurus DKM Sebelum Shalat Jumat',
  'Template Evaluasi Manajemen Risiko Organisasi', 'Format Laporan Monitoring Ketersediaan SLA Bulanan',
  'Template Evaluasi Kepuasan Pelanggan UMKM Binaan', 'Format Sesi Refleksi & Muhasabah Kinerja Tahunan'
];

evaluation16Templates.forEach((title, idx) => {
  documentsData.push({
    id: `template-evaluasi-${idx + 401}`,
    title: title,
    category: 'Template Briefing, Evaluasi & Monitoring',
    targetRoles: ['Cloud Architect', 'Pengurus Komunitas / DKM', 'DevOps Engineer'],
    version: 'v2.0.0',
    updatedAt: '2026-08-28',
    summary: `Dokumen instrumen briefing terstruktur dan evaluasi monitoring '${title}' untuk memastikan continuous improvement (Kaizen/Itqan).`,
    tags: ['Briefing', 'Evaluation', 'Monitoring', 'Retro', 'Agile'],
    content: `# ${title}

## 1. Kerangka Pelaksanaan Briefing / Evaluasi
Fasilitasi komunikasi transparan, identifikasi kendala secara dini, dan pembentukan komitmen perbaikan berkelanjutan (*Continuous Improvement*).

## 2. Struktur Agenda & Lembar Penilaian
1. **Pembukaan & Doa:** Menyelaraskan niat kerja ikhlas dan fokus.
2. **Review Pencapaian:** Evaluasi metrik kuantitatif vs target yang ditetapkan.
3. **Pembahasan Kendala:** Analisis akar masalah tanpa budaya menyalahkan individu (*blameless culture*).
4. **Action Plan:** Rencana aksi konkret dengan PIC dan tenggat waktu tegas.

## 3. Distribusi Hasil Evaluasi
Dokumen ini diarsipkan di repositori dokumen bersama Google Workspace dan didistribusikan kepada seluruh peserta rapat.`
  });
});
