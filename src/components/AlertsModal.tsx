import React from 'react';
import { X, AlertTriangle, CheckCircle2, Wrench, Bell } from 'lucide-react';
import { SystemAlert } from '../types';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: SystemAlert[];
  onAcknowledge: (id: string) => void;
  onRemediate: (id: string) => void;
  onClearAll: () => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onAcknowledge,
  onRemediate,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Pemberitahuan Sistem &amp; Status Infrastruktur
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium cursor-pointer"
            >
              Tandai Semua Dibaca
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* List of Alerts */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2 opacity-60" />
              <p>Tidak ada pemberitahuan baru. Semua sistem beroperasi secara optimal.</p>
            </div>
          ) : (
            alerts.map((alt) => (
              <div 
                key={alt.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  alt.severity === 'critical'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
                    : alt.severity === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-white/50 dark:bg-black/30 font-mono">
                      {alt.service}
                    </span>
                    <span className="text-[10px] text-slate-500">{alt.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-snug">{alt.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!alt.acknowledged && (
                    <button
                      onClick={() => onAcknowledge(alt.id)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium hover:bg-slate-100 cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={() => onRemediate(alt.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Wrench className="h-3 w-3" />
                    Auto-Remediate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Sinkronisasi Instan via WebSocket &amp; PagerDuty</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
