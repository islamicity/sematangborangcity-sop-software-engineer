import React from 'react';
import { 
  ShieldCheck, 
  Moon, 
  Sun, 
  Bell, 
  Server, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  ChevronDown
} from 'lucide-react';
import { UserProfile, SystemAlert } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  users: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  alerts: SystemAlert[];
  onOpenAlerts: () => void;
  unacknowledgedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  users,
  onSelectUser,
  isDarkMode,
  onToggleDarkMode,
  alerts: _alerts,
  onOpenAlerts,
  unacknowledgedCount
}) => {
  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur-md' 
        : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                ISLAMICITY CLOUDOPS
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Enterprise v3.2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
              SOP Software Engineer &amp; Platform Infrastruktur Cerdas
            </p>
          </div>
        </div>

        {/* Global Cluster Status & Badges */}
        <div className="hidden xl:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>K8s Cluster: <strong>asia-se1-prod (99.98%)</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300">
            <Server className="h-3.5 w-3.5" />
            <span>Ledger: <strong>SHA-256 E2E Encrypted</strong></span>
          </div>
        </div>

        {/* Action Controls & User Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Button */}
          <button
            onClick={onOpenAlerts}
            className={`relative p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
            title="Pemberitahuan Sistem"
            aria-label="Pemberitahuan Sistem"
          >
            <Bell className="h-4 w-4" />
            {unacknowledgedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
                {unacknowledgedCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-amber-400' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Role Switcher Dropdown (Demonstrating RBAC & Roles) */}
          <div className="relative group">
            <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border cursor-pointer select-none transition-colors ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}>
              <div className="h-7 w-7 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {currentUser.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold leading-tight truncate max-w-[130px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium leading-none">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
            </div>

            {/* Dropdown Menu for RBAC Simulator */}
            <div className={`absolute right-0 mt-1 w-64 rounded-xl border p-2 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 ${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/50 mb-1 flex items-center justify-between">
                <span>Simulasi Peran RBAC</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <Lock className="h-2.5 w-2.5" /> 2FA Aktif
                </span>
              </div>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => onSelectUser(u)}
                  className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                    u.id === currentUser.id 
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold' 
                      : isDarkMode 
                        ? 'hover:bg-slate-800 text-slate-300' 
                        : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="h-6 w-6 rounded bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold">
                    {u.avatar}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="truncate font-medium">{u.name}</div>
                    <div className="text-[10px] text-slate-400">{u.role}</div>
                  </div>
                  {u.id === currentUser.id && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
