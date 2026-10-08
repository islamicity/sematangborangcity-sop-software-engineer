import React from 'react';
import { 
  Activity, 
  GitBranch, 
  Server, 
  HeartHandshake, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  MessageSquare,
  FileSpreadsheet
} from 'lucide-react';
import { ActiveTab, UserProfile, FinancialTransaction, PipelineRun, SystemAlert } from '../types';
import { formatRupiah } from '../utils/exportUtils';

interface OverviewTabProps {
  onNavigateTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  transactions: FinancialTransaction[];
  pipelines: PipelineRun[];
  alerts: SystemAlert[];
  sopCount: number;
  jamaahCount: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigateTab,
  currentUser: _currentUser,
  transactions,
  pipelines,
  alerts,
  sopCount,
  jamaahCount
}) => {
  // Financial computations
  const totalIncome = transactions
    .filter(t => t.type === 'Pemasukan' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Pengeluaran' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.amount, 0);

  const kasBalance = totalIncome - totalExpense;

  const latestPipeline = pipelines[0];
  const unreadAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome & Quick Alert Banner if any */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-teal-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              SOP Software Engineer Islamicity &bull; Cloud Infrastructure Platform
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Infrastruktur Cerdas &amp; Tata Kelola Berdaya Tinggi
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Otomatisasi alur kerja CI/CD berdaya enterprise, pemantauan performa real-time, akses kontrol RBAC terperinci, repositori cloud terlindungi, serta 120+ SOP lengkap terintegrasi dengan modul keuangan dakwah dan WhatsApp reminder.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:shrink-0">
            <button
              onClick={() => onNavigateTab('cicd')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-all shadow-md hover:shadow-emerald-500/25 cursor-pointer"
            >
              <GitBranch className="h-4 w-4" />
              Jalankan CI/CD Pipeline
            </button>
            <button
              onClick={() => onNavigateTab('sop-library')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all border border-white/20 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              Buka 120+ SOP &amp; Berkas
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: CI/CD Pipeline Status */}
        <div 
          onClick={() => onNavigateTab('cicd')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">CI/CD Automation</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              <GitBranch className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              99.8%
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">
                Canary OK
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span>Rilis Terakhir:</span>
              <strong className="text-slate-700 dark:text-slate-300 font-mono truncate">{latestPipeline?.commitHash || '8f3e2b9'}</strong>
            </div>
          </div>
        </div>

        {/* KPI 2: Uptime & SLO */}
        <div 
          onClick={() => onNavigateTab('monitoring')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Availability &amp; SLO</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              99.98%
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-500">
                Apdex 0.99
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Error Budget sisa <strong>94.2%</strong> bulan ini
            </div>
          </div>
        </div>

        {/* KPI 3: Kas Masjid & Transparansi Keuangan */}
        <div 
          onClick={() => onNavigateTab('dakwah-finance')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Saldo Kas Transparan</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              <HeartHandshake className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 truncate">
              {formatRupiah(kasBalance)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span>{jamaahCount} Jamaah</span> &bull; 
              <span className="text-emerald-500 font-medium">SHA-256 E2E Verified</span>
            </div>
          </div>
        </div>

        {/* KPI 4: 120+ SOP & Templates */}
        <div 
          onClick={() => onNavigateTab('sop-library')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">SOP &amp; Berkas Resmi</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              {sopCount}+
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500">
                Lengkap
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              SDLC, Git, Keamanan, HR &amp; Dakwah
            </div>
          </div>
        </div>

      </div>

      {/* Grid Section: Live Microservices Health + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Live Microservices & Infrastructure Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Matriks Kesehatan Infrastruktur &amp; Layanan Mikro
                </h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                All Healthy
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Kubernetes Production Cluster',
                  endpoint: 'k8s-cluster.asia-southeast1.gcp',
                  status: 'Active (6/6 Pods)',
                  latency: '24ms',
                  uptime: '99.99%',
                  icon: <Server className="h-4 w-4 text-emerald-500" />
                },
                {
                  name: 'PostgreSQL High-Availability (PgBouncer)',
                  endpoint: 'db-ha-primary.internal:5432',
                  status: 'In Sync (0 lag)',
                  latency: '4ms',
                  uptime: '99.99%',
                  icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                },
                {
                  name: 'WhatsApp Cloud API Gateway',
                  endpoint: 'api.whatsapp.com/v20.0/messages',
                  status: 'Connected (Webhook 200)',
                  latency: '142ms',
                  uptime: '99.95%',
                  icon: <MessageSquare className="h-4 w-4 text-teal-500" />
                },
                {
                  name: 'Open Banking Syariah Connector',
                  endpoint: 'bsi-muamalat-bca.islamicity.org',
                  status: 'HMAC Verified',
                  latency: '88ms',
                  uptime: '99.92%',
                  icon: <Zap className="h-4 w-4 text-cyan-500" />
                },
                {
                  name: 'Cryptographic Ledger & E2E Tamper Guard',
                  endpoint: 'ledger-sha256.islamicity.org',
                  status: 'Hash Chaining Valid',
                  latency: '12ms',
                  uptime: '100%',
                  icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                }
              ].map((srv, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                      {srv.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{srv.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{srv.endpoint}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:text-right shrink-0">
                    <div>
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400">{srv.status}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Latensi: {srv.latency}</div>
                    </div>
                    <div className="hidden sm:block border-l pl-4 border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-700 dark:text-slate-300">{srv.uptime}</div>
                      <div className="text-[10px] text-slate-400">SLA 30d</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Quick Operational Triggers & Alerts */}
        <div className="space-y-4">
          
          {/* Quick Triggers Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Pintasan Aksi Cepat</span>
              <span className="text-[10px] text-slate-400 font-mono">Role Aware</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('cicd')}
                className="w-full text-left p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-emerald-500" />
                  Jalankan Canary Deploy Produksi
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab('dakwah-finance')}
                className="w-full text-left p-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-cyan-500" />
                  Kirim Pengingat Iuran via WA API
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab('calculators')}
                className="w-full text-left p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-amber-500" />
                  Kalkulator Omzet &amp; Stok Bisnis
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab('security-audit')}
                className="w-full text-left p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-700 dark:text-purple-300 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  Buka Vault Secret &amp; Audit Log
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active Notifications & Alerts Summary */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Pemberitahuan Sistem Terkini
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {unreadAlerts.length} Belum Dibaca
              </span>
            </div>

            <div className="space-y-2">
              {alerts.slice(0, 3).map((a) => (
                <div 
                  key={a.id}
                  className={`p-3 rounded-xl border text-xs ${
                    a.severity === 'critical'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                      : a.severity === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="uppercase text-[10px]">{a.service}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{a.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-snug">{a.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
