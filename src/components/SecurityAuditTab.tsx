import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Key, 
  RotateCw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check,
  Server,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { AuditLog, UserProfile } from '../types';

interface SecurityAuditTabProps {
  auditLogs: AuditLog[];
  currentUser: UserProfile;
  onAddAuditLog: (log: AuditLog) => void;
}

export const SecurityAuditTab: React.FC<SecurityAuditTabProps> = ({
  auditLogs,
  currentUser,
  onAddAuditLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 2FA TOTP Simulation (6 digits with 30s timer)
  const [totpCode, setTotpCode] = useState('841 902');
  const [timerSeconds, setTimerSeconds] = useState(24);

  // Secret Management Vault
  const [secrets, setSecrets] = useState([
    { id: '1', name: 'BSI_OPEN_BANKING_HMAC_SECRET', value: 'bsi_sec_99af28174092bba71490214812f', masked: true },
    { id: '2', name: 'WHATSAPP_CLOUD_API_ACCESS_TOKEN', value: 'EAAG98a7cfb0129481b7a209f8812c339', masked: true },
    { id: '3', name: 'POSTGRES_PROD_DATABASE_URL', value: 'postgresql://islamicity_admin:SuperSecret2026!@10.0.1.15:5432/islamicity_ledger', masked: true },
    { id: '4', name: 'JWT_ASYMMETRIC_PRIVATE_KEY', value: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0...\n-----END RSA PRIVATE KEY-----', masked: true }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          // Generate new 6-digit code
          const code1 = Math.floor(100 + Math.random() * 900);
          const code2 = Math.floor(100 + Math.random() * 900);
          setTotpCode(`${code1} ${code2}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSecretMask = (id: string) => {
    setSecrets(secrets.map(s => s.id === id ? { ...s, masked: !s.masked } : s));
  };

  const handleRotateSecret = (secretName: string) => {
    const newRandomHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSecrets(secrets.map(s => s.name === secretName ? { ...s, value: `sec_rotated_${newRandomHash}` } : s));

    onAddAuditLog({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'SECRET_ROTATION_TRIGGERED',
      module: 'Security Vault',
      ipAddress: '103.144.12.89',
      status: 'Success',
      details: `Kunci ${secretName} dirotasi oleh ${currentUser.name} (${currentUser.role})`
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-emerald-500" />
          Pusat Keamanan, 2FA &amp; Log Audit Aktivitas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Otentikasi dua faktor (2FA TOTP), brankas rahasia (Secret Vault KMS), enkripsi data, dan catatan audit mutlak (Immutable Audit Trail).
        </p>
      </div>

      {/* Grid: 2FA Simulator & Secret Management Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2FA TOTP Authenticator Card */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-500" />
              Otentikasi Dua Faktor (2FA)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
              RFC 6238 TOTP
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2 border border-slate-800 shadow-inner">
            <div className="text-[11px] text-slate-400 font-medium">
              Kode Otentikator Pengurus &amp; Engineer
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-emerald-400 select-all">
              {totpCode}
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${(timerSeconds / 30) * 100}%` }}
                />
              </div>
              <span>Berganti dalam {timerSeconds}s</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Perlindungan akses perbankan &amp; deploy cluster produksi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Mendukung Google Authenticator, YubiKey FIDO2 &amp; Duo</span>
            </div>
          </div>
        </div>

        {/* Secret Management Vault */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Key className="h-4 w-4 text-emerald-500" />
              Brankas Rahasia &amp; Kredensial (Secret Vault)
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">
              Enkripsi AES-256 KMS
            </span>
          </div>

          <div className="space-y-2.5">
            {secrets.map((sec) => (
              <div 
                key={sec.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {sec.name}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 max-w-sm truncate">
                    {sec.masked ? '••••••••••••••••••••••••••••••••' : sec.value}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleSecretMask(sec.id)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                    title={sec.masked ? 'Tampilkan Nilai' : 'Sembunyikan'}
                  >
                    {sec.masked ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    onClick={() => copyToClipboard(sec.value, sec.id)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                    title="Salin Kunci"
                  >
                    {copiedKey === sec.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    onClick={() => handleRotateSecret(sec.name)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Rotasi Kunci Secara Otomatis"
                  >
                    <RotateCw className="h-3 w-3" />
                    Rotasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Activity Audit Log Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-500" />
              Catatan Audit Aktivitas &amp; Integritas Sistem (Audit Trail)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Setiap mutasi data, rilis CI/CD, otorisasi RBAC, dan perubahan kas dicatat secara kekal (immutable).
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter aksi, modul, user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Audit ID &amp; Waktu</th>
                <th className="pb-3 font-semibold">Pelaksana (User)</th>
                <th className="pb-3 font-semibold">Aksi (Action Code)</th>
                <th className="pb-3 font-semibold">Modul</th>
                <th className="pb-3 font-semibold">IP Address</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Rincian Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-mono">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{log.id}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                  </td>
                  <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                    {log.userName}
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-400 font-medium">
                    {log.module}
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {log.ipAddress}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'Success'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : log.status === 'Warning'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-700 dark:text-slate-300 max-w-sm truncate text-[11px]">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
