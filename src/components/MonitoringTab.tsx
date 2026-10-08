import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Flame, 
  ShieldAlert,
  Wrench,
  Radio,
  ArrowDown
} from 'lucide-react';
import { SystemAlert, AuditLog, UserProfile } from '../types';

interface MonitoringTabProps {
  alerts: SystemAlert[];
  onAcknowledgeAlert: (id: string) => void;
  onRemediateAlert: (id: string) => void;
  onAddAlert: (alert: SystemAlert) => void;
  onAddAuditLog: (log: AuditLog) => void;
  currentUser: UserProfile;
}

export const MonitoringTab: React.FC<MonitoringTabProps> = ({
  alerts,
  onAcknowledgeAlert,
  onRemediateAlert,
  onAddAlert,
  onAddAuditLog,
  currentUser
}) => {
  // Live metric state with periodic subtle heartbeat oscillations
  const [cpuUsage, setCpuUsage] = useState<number>(34);
  const [memoryUsage, setMemoryUsage] = useState<number>(48);
  const [activePods, setActivePods] = useState<number>(6);
  const [latencyP95, setLatencyP95] = useState<number>(38);
  const [rps, setRps] = useState<number>(1420);
  const [isSimulatingSpike, setIsSimulatingSpike] = useState<boolean>(false);

  // Subtle real-time oscillation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSimulatingSpike) {
        setCpuUsage(prev => Math.min(85, Math.max(25, prev + (Math.random() * 4 - 2))));
        setLatencyP95(prev => Math.min(70, Math.max(28, prev + (Math.random() * 4 - 2))));
        setRps(prev => Math.floor(Math.min(2200, Math.max(1100, prev + (Math.random() * 60 - 30)))));
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [isSimulatingSpike]);

  // Simulate Traffic Spike Action
  const triggerTrafficSpike = () => {
    setIsSimulatingSpike(true);
    setCpuUsage(89);
    setMemoryUsage(84);
    setActivePods(14);
    setLatencyP95(165);
    setRps(5800);

    const newAlert: SystemAlert = {
      id: `ALT-${Date.now().toString().slice(-3)}`,
      severity: 'warning',
      service: 'K8s-AutoScaler-HPA',
      message: 'Lonjakan Traffic Terdeteksi: CPU melonjak ke 89%, HPA menaikkan pod dari 6 ke 14 replika.',
      timestamp: 'Baru saja',
      acknowledged: false,
      autoRemediated: false
    };

    onAddAlert(newAlert);
    onAddAuditLog({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'INFRA_SPIKE_SIMULATION',
      module: 'Performance Monitoring',
      ipAddress: '103.144.12.89',
      status: 'Warning',
      details: 'Simulasi traffic spike 5x dipicu untuk validasi autoscaling'
    });

    // Auto-normalize after 7 seconds
    setTimeout(() => {
      setIsSimulatingSpike(false);
      setCpuUsage(41);
      setMemoryUsage(52);
      setActivePods(8);
      setLatencyP95(42);
      setRps(1650);
    }, 7000);
  };

  // Simulate Pod Crash & Self-Healing Action
  const triggerPodCrash = () => {
    setActivePods(prev => Math.max(2, prev - 3));
    const crashAlert: SystemAlert = {
      id: `ALT-${Date.now().toString().slice(-3)}`,
      severity: 'critical',
      service: 'Kube-Worker-Node-2',
      message: 'Node OOM-Kill: Pod islamicity-core-api-98f crashed (Memory Limit Exceeded). Memulai evakuasi pod.',
      timestamp: 'Baru saja',
      acknowledged: false,
      autoRemediated: false
    };

    onAddAlert(crashAlert);
    onAddAuditLog({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'POD_FAILURE_SIMULATED',
      module: 'Cluster Watcher',
      ipAddress: '103.144.12.89',
      status: 'Warning',
      details: 'Crash simulasi pod diaktifkan untuk pengujian self-healing K8s'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header section with simulation trigger buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-500" />
            Pemantauan Infrastruktur &amp; Performa Real-Time
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Dasbor telemetri 4 Golden Signals SRE, status pod Kubernetes, dan peringatan instan terpadu dengan penyembuhan otomatis (Self-Healing).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerTrafficSpike}
            disabled={isSimulatingSpike}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Uji ketahanan HPA autoscaling dengan menyimulasikan beban tinggi"
          >
            <Flame className="h-4 w-4" />
            {isSimulatingSpike ? 'Simulasi Berjalan...' : 'Simulasi Lonjakan Traffic (5x)'}
          </button>
          
          <button
            onClick={triggerPodCrash}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Simulasikan kegagalan container untuk melihat mekanisme self-healing K8s"
          >
            <ShieldAlert className="h-4 w-4" />
            Simulasi Pod Crash
          </button>
        </div>
      </div>

      {/* 4 Golden Signals + Cluster Resource Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: CPU Util */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">CPU Utilization</span>
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>{cpuUsage.toFixed(1)}%</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              cpuUsage > 80 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
            }`}>
              {cpuUsage > 80 ? 'HIGH' : 'NORMAL'}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                cpuUsage > 80 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, cpuUsage)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono flex justify-between">
            <span>Quota: 16 vCPU</span>
            <span>Throttle: 0%</span>
          </div>
        </div>

        {/* Metric 2: Memory RAM */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cluster Memory</span>
            <HardDrive className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>{memoryUsage.toFixed(1)}%</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500">
              {(32 * (memoryUsage / 100)).toFixed(1)} / 32 GB
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div 
              className="h-full bg-cyan-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, memoryUsage)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2 font-mono flex justify-between">
            <span>Buffer Cache: 4.2 GB</span>
            <span>Swap: Disabled</span>
          </div>
        </div>

        {/* Metric 3: Pods & HPA Replicas */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Pods (HPA)</span>
            <Server className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>{activePods} Pods</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">
              Ready 100%
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
            <span>Target Min: 4 &bull; Max: 20 Pods</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">
            RollingUpdate MaxSurge: 25%
          </div>
        </div>

        {/* Metric 4: Latency & RPS */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Throughput &amp; Latency</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>{latencyP95} ms</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
              p95 SLA
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            Traffic: <strong>{rps.toLocaleString()} RPS</strong>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono flex justify-between">
            <span>Error Rate: 0.01%</span>
            <span>Apdex: 0.99</span>
          </div>
        </div>

      </div>

      {/* Grid: Alert Feed & Node Hardware Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real-time Incident & Alert Center */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Pusat Pemberitahuan Status &amp; Insiden Sistem
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Auto-Notification: Webhook + WA DKM
            </span>
          </div>

          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs italic">
                Tidak ada alert aktif. Semua node dan microservices beroperasi normal.
              </div>
            ) : (
              alerts.map((alt) => (
                <div
                  key={alt.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    alt.severity === 'critical'
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-200'
                      : alt.severity === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-200'
                        : 'bg-blue-500/10 border-blue-500/40 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        alt.severity === 'critical' ? 'bg-rose-500 text-white' : alt.severity === 'warning' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {alt.severity}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{alt.service}</span>
                      <span className="text-[10px] text-slate-500 font-mono">&bull; {alt.timestamp}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                      {alt.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!alt.acknowledged && (
                      <button
                        onClick={() => onAcknowledgeAlert(alt.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    )}
                    <button
                      onClick={() => onRemediateAlert(alt.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Wrench className="h-3 w-3" />
                      Auto-Remediate
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Cluster Nodes Health Table */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-500" />
              Node Cluster K8s
            </h3>
            <span className="text-[11px] text-emerald-500 font-medium">5 Nodes Up</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { node: 'worker-node-1', cpu: '32%', ram: '4.8 GB', os: 'Container-Optimized', status: 'Ready' },
              { node: 'worker-node-2', cpu: cpuUsage > 75 ? '88%' : '38%', ram: '5.2 GB', os: 'Container-Optimized', status: 'Ready' },
              { node: 'worker-node-3', cpu: '28%', ram: '4.1 GB', os: 'Container-Optimized', status: 'Ready' },
              { node: 'postgres-db-ha-primary', cpu: '22%', ram: '8.4 GB', os: 'Debian 12 HA', status: 'Master Sync' },
              { node: 'redis-cache-sentinel', cpu: '12%', ram: '2.1 GB', os: 'Alpine Linux', status: 'Active' }
            ].map((n, i) => (
              <div 
                key={i} 
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">{n.node}</div>
                  <div className="text-[10px] text-slate-400">CPU: {n.cpu} | RAM: {n.ram}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {n.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between">
            <span>SLA Uptime Bulan Ini:</span>
            <strong className="text-emerald-500">99.98% (Passed)</strong>
          </div>
        </div>

      </div>

    </div>
  );
};
