import React, { useState } from 'react';
import { 
  GitBranch, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Box, 
  Check, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { PipelineRun, UserProfile, AuditLog } from '../types';

interface CicdTabProps {
  pipelines: PipelineRun[];
  onAddPipeline: (newRun: PipelineRun) => void;
  onAddAuditLog: (log: AuditLog) => void;
  currentUser: UserProfile;
}

export const CicdTab: React.FC<CicdTabProps> = ({
  pipelines,
  onAddPipeline,
  onAddAuditLog,
  currentUser
}) => {
  const [selectedBranch, setSelectedBranch] = useState<'main' | 'develop' | 'feat/wa-gateway' | 'hotfix/p0-patch'>('main');
  const [selectedEnv, setSelectedEnv] = useState<'development' | 'staging' | 'production'>('production');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(-1);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [rollbackSuccessMsg, setRollbackSuccessMsg] = useState<string | null>(null);

  const canDeployProd = currentUser.permissions.includes('prod:deploy') || currentUser.role === 'Cloud Architect' || currentUser.role === 'DevOps Engineer';

  // Interactive CI/CD runner simulation
  const handleTriggerPipeline = () => {
    if (selectedEnv === 'production' && !canDeployProd) {
      alert(`Izin Ditolak: Peran '${currentUser.role}' tidak memiliki kewenangan 'prod:deploy'. Silakan beralih ke peran 'Cloud Architect' atau 'DevOps Engineer' di pojok kanan atas.`);
      return;
    }

    setIsRunning(true);
    setActiveStageIdx(0);
    setLiveLogs([
      `[${new Date().toLocaleTimeString()}] Pipeline dipicu oleh ${currentUser.name} (${currentUser.role})`,
      `[${new Date().toLocaleTimeString()}] Target Environment: ${selectedEnv.toUpperCase()} | Branch: ${selectedBranch}`,
      `[${new Date().toLocaleTimeString()}] Memeriksa signature commit GPG & Branch Protection rules... Validated.`
    ]);

    const stages = [
      {
        name: 'Lint & SonarQube Quality Gate',
        logs: ['Menjalankan ESLint flat config...', 'SonarQube static analysis: 0 Security Hotspots, 0 Blocker Bugs', 'Kompleksitas siklomatis aman (<12)']
      },
      {
        name: 'Unit & Contract Test Execution',
        logs: ['Menjalankan 412 unit tests dengan Vitest...', 'Semua test pass! Code coverage 88.6% (Target minimum 80% terpenuhi)', 'Kontrak API OpenAPI 3.0 terverifikasi']
      },
      {
        name: 'SAST & Trivy Container Scan',
        logs: ['Trivy scanner memindai base image Alpine 3.20...', '0 Critical, 0 High vulnerabilities ditemukan', 'Secret scanner: Tidak ada API keys atau password yang bocor']
      },
      {
        name: 'Docker Image Build & Push to Registry',
        logs: ['Multi-stage Dockerfile build selesai (ukuran 84 MB)', 'Image di-tag: registry.islamicity.cloud/core-engine:v3.2.1', 'Image digest ditandatangani Cosign/Sigstore']
      },
      {
        name: 'Kubernetes Canary Deployment & Health Gate',
        logs: ['ArgoCD sync dimulai pada cluster k8s-asia-se1-prod', 'Traffic routing: 10% canary pods aktif', 'Synthetics health check /api/healthz mengembalikan HTTP 200 OK', 'Promoted ke 100% produksi. Uptime stabil.']
      }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < stages.length) {
        setActiveStageIdx(current);
        const stage = stages[current];
        setLiveLogs(prev => [...prev, `\n>>> [STAGE: ${stage.name}]`, ...stage.logs.map(l => `  [+] ${l}`)]);
        current++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setActiveStageIdx(stages.length);
        const newRunId = `RUN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const commitHash = Math.random().toString(16).substring(2, 9);
        
        const newRun: PipelineRun = {
          id: newRunId,
          branch: selectedBranch,
          commitHash: commitHash,
          commitMessage: `deploy(${selectedBranch}): automated pipeline rilis ${selectedEnv}`,
          author: currentUser.name,
          status: 'success',
          startedAt: 'Baru saja',
          environment: selectedEnv,
          stages: stages.map((s, idx) => ({
            id: String(idx + 1),
            name: s.name,
            status: 'success',
            duration: `${Math.floor(20 + Math.random() * 30)}s`,
            logs: s.logs
          }))
        };

        onAddPipeline(newRun);
        onAddAuditLog({
          id: `AUD-${Date.now().toString().slice(-4)}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          userId: currentUser.id,
          userName: currentUser.name,
          action: 'CI_PIPELINE_EXECUTION',
          module: 'CI/CD Engine',
          ipAddress: '103.144.12.89',
          status: 'Success',
          details: `Pipeline ${newRunId} sukses dideploy ke ${selectedEnv} oleh ${currentUser.name}`
        });
      }
    }, 1200);
  };

  const handleRollback = () => {
    if (!canDeployProd) {
      alert(`Izin Ditolak: Peran '${currentUser.role}' tidak memiliki kewenangan rollback produksi.`);
      return;
    }

    const confirmRollback = window.confirm(
      'PERINGATAN ROLLBACK PRODUKSI:\nApakah Anda yakin ingin memutar balik (rollback) image produksi ke versi stabil sebelumnya (v3.1.9)? ArgoCD akan mengalihkan 100% traffic secara seketika.'
    );

    if (confirmRollback) {
      setRollbackSuccessMsg('Rollback Berhasil! Cluster produksi berhasil dipulihkan ke versi stabil image registry.islamicity.cloud/core-engine:v3.1.9.');
      onAddAuditLog({
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'PRODUCTION_ROLLBACK',
        module: 'CI/CD Engine',
        ipAddress: '103.144.12.89',
        status: 'Success',
        details: `Emergency Rollback dieksekusi oleh ${currentUser.name} (${currentUser.role})`
      });
      setTimeout(() => setRollbackSuccessMsg(null), 8000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-emerald-500" />
            Otomatisasi CI/CD &amp; Deployment Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pipeline terotomatisasi enterprise: lint, coverage, SAST Trivy, Docker multi-stage, dan Canary Kubernetes dengan Zero Downtime.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRollback}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Rollback Produksi
          </button>
        </div>
      </div>

      {rollbackSuccessMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
          <span>{rollbackSuccessMsg}</span>
        </div>
      )}

      {/* Pipeline Trigger & Configuration Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Play className="h-3.5 w-3.5 text-emerald-500" />
          Konfigurasi &amp; Eksekusi Pipeline Otomatis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Pilih Target Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value as any)}
              disabled={isRunning}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="main">main (Protected - Production Ready)</option>
              <option value="develop">develop (Staging Integration)</option>
              <option value="feat/wa-gateway">feat/wa-gateway (WhatsApp Engine)</option>
              <option value="hotfix/p0-patch">hotfix/p0-patch (Fast-track Urgent)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Lingkungan (Environment)
            </label>
            <select
              value={selectedEnv}
              onChange={(e) => setSelectedEnv(e.target.value as any)}
              disabled={isRunning}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="production">Production Cluster (Multi-Region Canary)</option>
              <option value="staging">Staging QA Cluster</option>
              <option value="development">Dev Sandbox Cluster</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleTriggerPipeline}
              disabled={isRunning}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isRunning 
                  ? 'bg-slate-500 cursor-not-allowed opacity-75' 
                  : 'bg-emerald-600 hover:bg-emerald-500 active:scale-98 shadow-emerald-600/25'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Sedang Menjalankan Pipeline...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  Mulai Pipeline Otomatis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Pipeline Stages Graph */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3 flex items-center justify-between">
            <span>Visualisasi Tahapan Eksekusi CI/CD:</span>
            <span className="text-[11px] font-mono text-emerald-500">
              {isRunning ? `Tahap ${activeStageIdx + 1} dari 5 aktif` : 'Status: Siap / Idling'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              { title: '1. Lint & SonarQube', icon: <Layers className="h-4 w-4" /> },
              { title: '2. Unit & Contract', icon: <CheckCircle2 className="h-4 w-4" /> },
              { title: '3. SAST & Security', icon: <ShieldCheck className="h-4 w-4" /> },
              { title: '4. Docker Build', icon: <Box className="h-4 w-4" /> },
              { title: '5. Canary Deploy', icon: <GitBranch className="h-4 w-4" /> }
            ].map((stg, idx) => {
              const isStageActive = isRunning && activeStageIdx === idx;
              const isStageDone = activeStageIdx > idx || (!isRunning && activeStageIdx === 5);
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs transition-all flex flex-col items-center text-center gap-1.5 ${
                    isStageActive 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400 shadow-md ring-2 ring-amber-500/20' 
                      : isStageDone 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                    {isStageDone ? <Check className="h-4 w-4 text-emerald-500" /> : isStageActive ? <RefreshCw className="h-4 w-4 animate-spin text-amber-500" /> : stg.icon}
                  </div>
                  <div className="font-semibold text-[11px] leading-tight">{stg.title}</div>
                  <div className="text-[10px] font-mono">
                    {isStageActive ? 'Running...' : isStageDone ? 'Passed' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Pipeline Terminal Console Logs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 p-4 shadow-xl font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="font-bold text-slate-100">Live CI/CD Console Output</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              STREAMING
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </div>
        </div>

        <div className="h-44 overflow-y-auto space-y-1 text-slate-300 text-[11px] pr-2 selection:bg-emerald-500 selection:text-black">
          {liveLogs.length === 0 ? (
            <div className="text-slate-600 italic py-4">
              [Menunggu trigger] Tekan tombol 'Mulai Pipeline Otomatis' di atas untuk memulai build, verifikasi keamanan SAST, dan canary deployment ke Kubernetes.
            </div>
          ) : (
            liveLogs.map((log, i) => (
              <div 
                key={i} 
                className={log.startsWith('>>>') ? 'text-emerald-400 font-bold mt-2' : log.includes('Pass') || log.includes('pass') ? 'text-teal-300' : 'text-slate-300'}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Deployment History Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-500" />
            Riwayat Eksekusi Deployment
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {pipelines.length} Deployment Tercatat
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Run ID</th>
                <th className="pb-3 font-semibold">Branch &amp; Commit</th>
                <th className="pb-3 font-semibold">Pesan &amp; Perubahan</th>
                <th className="pb-3 font-semibold">Author</th>
                <th className="pb-3 font-semibold">Environment</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {pipelines.map((run) => (
                <tr key={run.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {run.id}
                  </td>
                  <td className="py-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <GitBranch className="h-3 w-3 text-slate-400" />
                      {run.branch}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{run.commitHash}</div>
                  </td>
                  <td className="py-3 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                    {run.commitMessage}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-400 font-medium">
                    {run.author}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase font-mono ${
                      run.environment === 'production'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                        : run.environment === 'staging'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                    }`}>
                      {run.environment}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Success
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 text-[11px]">
                    {run.startedAt}
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
