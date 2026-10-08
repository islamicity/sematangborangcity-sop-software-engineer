import React from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  Activity, 
  Users, 
  FileText, 
  Calculator, 
  HeartHandshake, 
  ShieldAlert,
  Terminal,
  Zap,
  BookOpen
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  currentUser: UserProfile;
  sopCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isDarkMode,
  currentUser: _currentUser,
  sopCount
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; desc: string }[] = [
    {
      id: 'overview',
      label: 'Ringkasan Ekosistem',
      icon: <LayoutDashboard className="h-4 w-4" />,
      desc: 'Status sistem, cluster & indikator utama'
    },
    {
      id: 'cicd',
      label: 'CI/CD & Deployment',
      icon: <GitBranch className="h-4 w-4" />,
      badge: 'Live Auto',
      desc: 'Pipeline otomatis, build, canary & rollback'
    },
    {
      id: 'monitoring',
      label: 'Infrastruktur & Metrik',
      icon: <Activity className="h-4 w-4" />,
      badge: 'Real-time',
      desc: 'CPU, RAM, K8s Pods, latensi & incident'
    },
    {
      id: 'rbac',
      label: 'Repositori & RBAC',
      icon: <Users className="h-4 w-4" />,
      desc: 'Akses kontrol peran & proteksi branch'
    },
    {
      id: 'sop-library',
      label: '120+ SOP & Berkas',
      icon: <FileText className="h-4 w-4" />,
      badge: `${sopCount}+ Dok`,
      desc: 'SOP SDLC, Pedoman, Kebijakan & Standar'
    },
    {
      id: 'calculators',
      label: 'Kalkulator Bisnis & Tim',
      icon: <Calculator className="h-4 w-4" />,
      desc: 'Hitung omzet otomatis, stok & payroll'
    },
    {
      id: 'dakwah-finance',
      label: 'Kas Masjid & WhatsApp',
      icon: <HeartHandshake className="h-4 w-4" />,
      badge: 'E2E Hash',
      desc: 'Arus kas transparan, jamaah, iuran & WA API'
    },
    {
      id: 'security-audit',
      label: 'Security & Log Audit',
      icon: <ShieldAlert className="h-4 w-4" />,
      desc: '2FA TOTP, secret vault & catatan audit'
    }
  ];

  return (
    <aside className={`w-full md:w-64 shrink-0 border-r md:min-h-[calc(100vh-4rem)] p-3 flex flex-col justify-between transition-colors ${
      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
    }`}>
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Modul Platform Cerdas
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 group relative ${
                isActive 
                  ? isDarkMode 
                    ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 shadow-xs' 
                    : 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <div className={`mt-0.5 ${isActive ? (isDarkMode ? 'text-emerald-400' : 'text-white') : 'text-slate-400 group-hover:text-emerald-500'}`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isActive 
                        ? isDarkMode ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-700 text-emerald-100'
                        : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className={`text-[10px] truncate ${isActive ? (isDarkMode ? 'text-emerald-300/80' : 'text-emerald-100') : 'text-slate-400'}`}>
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mini System Info Footer */}
      <div className={`mt-6 p-3 rounded-xl border text-[11px] space-y-2 ${
        isDarkMode ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-emerald-500" />
            <span>Infra Runtime</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-500 text-[10px]">
            <Zap className="h-3 w-3 fill-emerald-500" /> Aktif
          </span>
        </div>
        <div className="text-[10px] space-y-1 font-mono">
          <div className="flex justify-between">
            <span>Cluster:</span>
            <span className="text-slate-800 dark:text-slate-200">K8s v1.31 HA</span>
          </div>
          <div className="flex justify-between">
            <span>Encryption:</span>
            <span className="text-slate-800 dark:text-slate-200">AES-256 + SHA256</span>
          </div>
          <div className="flex justify-between">
            <span>Standar Syariah:</span>
            <span className="text-emerald-500 font-semibold">Tercatat Transparan</span>
          </div>
        </div>
        <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>Islamicity Foundation</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> 120+ SOPs
          </span>
        </div>
      </div>
    </aside>
  );
};
