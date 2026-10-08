import React, { useState } from 'react';
import { 
  Users, 
  GitBranch, 
  ShieldCheck, 
  Lock, 
  Key, 
  UserPlus, 
  Check, 
  X, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, UserRole, AuditLog } from '../types';

interface RbacTabProps {
  users: UserProfile[];
  onAddUser: (user: UserProfile) => void;
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  onAddAuditLog: (log: AuditLog) => void;
  currentUser: UserProfile;
}

export const RbacTab: React.FC<RbacTabProps> = ({
  users,
  onAddUser,
  onUpdateUserRole,
  onAddAuditLog,
  currentUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('Backend Engineer');

  // Branch Protection Rules State
  const [branchRules, setBranchRules] = useState({
    requireReviews: true,
    minReviewers: 2,
    requireStatusChecks: true,
    requireSignedCommits: true,
    blockForcePush: true,
    dismissStaleReviews: true
  });

  const toggleBranchRule = (key: keyof typeof branchRules) => {
    if (typeof branchRules[key] === 'boolean') {
      const updated = { ...branchRules, [key]: !branchRules[key] };
      setBranchRules(updated);
      onAddAuditLog({
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'BRANCH_PROTECTION_TOGGLE',
        module: 'Repository RBAC',
        ipAddress: '103.144.12.89',
        status: 'Success',
        details: `Aturan branch ${key} diubah menjadi ${updated[key]} oleh ${currentUser.name}`
      });
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const initials = newName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-3)}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: initials,
      twoFactorEnabled: true,
      permissions: ['repo:write', 'cicd:trigger']
    };

    onAddUser(newUser);
    onAddAuditLog({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'TEAM_MEMBER_CREATED',
      module: 'RBAC Access Management',
      ipAddress: '103.144.12.89',
      status: 'Success',
      details: `Anggota baru ${newName} ditambahkan dengan peran ${newRole}`
    });

    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-500" />
            Kolaborasi Tim &amp; Kontrol Akses Berbasis Peran (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manajemen hak akses granular, proteksi branch repositori cloud, dan audit kebijakan keamanan least-privilege.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Tambah Anggota Tim
        </button>
      </div>

      {/* Cloud Repository Branch Protection Rules */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-emerald-500" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Aturan Proteksi Branch Repositori Cloud (\`main\` &amp; \`release/*\`)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mencegah perubahan langsung (direct push) tanpa review dan memverifikasi integritas build.
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            Protected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {[
            {
              key: 'requireReviews' as const,
              title: 'Wajib Pull Request Code Review',
              desc: 'Membutuhkan minimal 2 persetujuan dari Senior Reviewer sebelum merge.'
            },
            {
              key: 'requireSignedCommits' as const,
              title: 'Wajib Commit Bertanda Tangan GPG',
              desc: 'Menolak semua commit yang tidak memiliki signature GPG/SSH terverifikasi.'
            },
            {
              key: 'requireStatusChecks' as const,
              title: 'Lolos Semua CI Status Checks',
              desc: 'SonarQube SAST, Unit Test 80% coverage & Trivy Scan harus passed.'
            },
            {
              key: 'blockForcePush' as const,
              title: 'Blokir Force Push Permanen',
              desc: 'Mencegah penimpaan riwayat commit git push --force di branch produksi.'
            },
            {
              key: 'dismissStaleReviews' as const,
              title: 'Batalkan Review Usang Otomatis',
              desc: 'Persetujuan review otomatis dibatalkan jika ada commit baru didorong.'
            }
          ].map((item) => (
            <div 
              key={item.key}
              onClick={() => toggleBranchRule(item.key)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                branchRules[item.key]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-800 dark:text-slate-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className={`h-4 w-4 ${branchRules[item.key] ? 'text-emerald-500' : 'text-slate-400'}`} />
                  {item.title}
                </div>
                <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </div>
              </div>
              <div className={`mt-0.5 p-1 rounded-full ${
                branchRules[item.key] ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
              }`}>
                {branchRules[item.key] ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members & Role Matrix */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Daftar Anggota &amp; Penugasan Peran Teknis
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, email, peran..."
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
                <th className="pb-3 font-semibold">Pengguna</th>
                <th className="pb-3 font-semibold">Email &amp; ID</th>
                <th className="pb-3 font-semibold">Peran Terkini (Role)</th>
                <th className="pb-3 font-semibold">Otentikasi 2FA</th>
                <th className="pb-3 font-semibold">Izin Akses Utama</th>
                <th className="pb-3 font-semibold text-right">Ubah Peran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-slate-600 dark:text-slate-400">
                    {user.email}
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Lock className="h-3 w-3" />
                      Aktif (FIDO2)
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-400">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {user.permissions.slice(0, 3).map((p, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-mono">
                          {p}
                        </span>
                      ))}
                      {user.permissions.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          +{user.permissions.length - 3} lagi
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateUserRole(user.id, e.target.value as UserRole)}
                      className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Cloud Architect">Cloud Architect</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Full Stack Engineer">Full Stack Engineer</option>
                      <option value="Security Auditor">Security Auditor</option>
                      <option value="Pengurus Komunitas / DKM">Pengurus Komunitas / DKM</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix Reference */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Key className="h-4 w-4 text-emerald-500" />
          Matriks Otorisasi Peran Sistem (Least-Privilege Enforcement)
        </h2>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 text-[11px] uppercase">
                <th className="text-left py-2">Hak Akses / Kemampuan</th>
                <th className="py-2">Cloud Architect</th>
                <th className="py-2">DevOps Engineer</th>
                <th className="py-2">Backend Lead</th>
                <th className="py-2">Frontend</th>
                <th className="py-2">Pengurus DKM</th>
                <th className="py-2">Security Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-[11px]">
              {[
                { perm: 'Deploy ke Cluster Produksi (Canary/Rollback)', a: true, d: true, b: false, f: false, m: false, s: false },
                { perm: 'Modifikasi Konfigurasi Kubernetes & Bastion', a: true, d: true, b: false, f: false, m: false, s: false },
                { perm: 'Migrasi Skema Basis Data DDL', a: true, d: false, b: true, f: false, m: false, s: false },
                { perm: 'Push Kode & Trigger CI Pipeline', a: true, d: true, b: true, f: true, m: false, s: false },
                { perm: 'Kelola Kas Masjid & Broadcast WA Jamaah', a: false, d: false, b: false, f: false, m: true, s: false },
                { perm: 'Audit Secret Vault & Inspeksi Compliance', a: true, d: false, b: false, f: false, m: false, s: true }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="text-left py-2.5 font-medium text-slate-800 dark:text-slate-200">{row.perm}</td>
                  <td className="py-2.5">{row.a ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-2.5">{row.d ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-2.5">{row.b ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-2.5">{row.f ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-2.5">{row.m ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-2.5">{row.s ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-emerald-500" />
              Tambah Personil / Anggota Tim Baru
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap &amp; Gelar
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham, S.Kom."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Korporat / Organisasi
                </label>
                <input
                  type="email"
                  required
                  placeholder="ilham@islamicity.cloud"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Peran (Role) &amp; Tanggung Jawab
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Cloud Architect">Cloud Architect</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Security Auditor">Security Auditor</option>
                  <option value="Pengurus Komunitas / DKM">Pengurus Komunitas / DKM</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cursor-pointer"
                >
                  Simpan &amp; Undang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
