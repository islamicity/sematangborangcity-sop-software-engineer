import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Eye, 
  Tag, 
  Calendar, 
  ShieldCheck, 
  X,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SOPDocument, UserRole } from '../types';

interface SopLibraryTabProps {
  documents: SOPDocument[];
}

export const SopLibraryTab: React.FC<SopLibraryTabProps> = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');
  const [activeDoc, setActiveDoc] = useState<SOPDocument | null>(null);
  const [copied, setCopied] = useState(false);
  const [customOrgName, setCustomOrgName] = useState('Yayasan Islamicity Digital Indonesia');

  const categories = [
    'Semua',
    'SOP SDLC & Engineering',
    'Panduan Pengembangan',
    'Pedoman Kode & Arsitektur',
    'Kebijakan Keamanan & Rilis',
    'Standar Kualitas & SLA',
    'HR, Tim & Organisasi',
    'Template Bisnis & Operasional',
    'Keuangan & Profit Kontrol',
    'Dakwah & Manajemen Masjid',
    'Template Operasional Siap Pakai',
    'Dokumen Sistem Bisnis Lengkap',
    'Template Keuangan & Profit',
    'Template Briefing, Evaluasi & Monitoring'
  ];

  const roles = [
    'Semua',
    'Cloud Architect',
    'DevOps Engineer',
    'Backend Engineer',
    'Frontend Engineer',
    'Full Stack Engineer',
    'QA Engineer',
    'Security Auditor',
    'Pengurus Komunitas / DKM'
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;
    const matchesRole = selectedRole === 'Semua' || doc.targetRoles.includes(selectedRole as UserRole);

    return matchesSearch && matchesCategory && matchesRole;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = (doc: SOPDocument) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const contentWithCustomOrg = doc.content.replace(/Islamicity/g, customOrgName);

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${doc.title} - ${customOrgName}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          .header { border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 24px; }
          .title { font-size: 22px; font-weight: bold; color: #065f46; margin: 0; }
          .meta { font-size: 12px; color: #64748b; margin-top: 6px; }
          pre, code { background: #f1f5f9; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
          pre { padding: 12px; overflow-x: auto; }
          h2 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${doc.title}</h1>
          <div class="meta">
            Dokumen Resmi: ${customOrgName} &bull; Kategori: ${doc.category} &bull; Versi: ${doc.version} &bull; Tanggal: ${doc.updatedAt}
          </div>
        </div>
        <div>
          ${contentWithCustomOrg.replace(/\n/g, '<br/>')}
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
    </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownloadMarkdown = (doc: SOPDocument) => {
    const customizedContent = doc.content.replace(/Islamicity/g, customOrgName);
    const blob = new Blob([customizedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-500" />
            120+ SOP, Panduan, Pedoman &amp; Berkas Engineering
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Repositori dokumen terlengkap: SDLC, Git Flow, Keamanan, SLA/SLO, HR Tim, Infografis, Finansial, hingga SOP Dakwah &amp; Kas Masjid.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            Total {documents.length} Dokumen Aktif
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari SOP, panduan, kode, kebijakan, atau tag (misal: 'Rollback', 'Git', 'Kas', 'Zakat')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Role Filter */}
          <div className="w-full md:w-56 flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Peran Engineer</option>
              {roles.slice(1).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            Tidak ditemukan dokumen yang cocok dengan kata kunci "{searchTerm}".
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActiveDoc(doc)}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                    {doc.version}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {doc.updatedAt}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {doc.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {doc.category}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {doc.tags.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Buka &amp; Salin Dokumen
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Document Reader & Customizer Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {activeDoc.version}
                  </span>
                  <span className="text-xs text-slate-400">{activeDoc.category}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  {activeDoc.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveDoc(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Variable Injector Bar */}
            <div className="px-5 py-2.5 bg-emerald-500/5 border-b border-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Kustomisasi Variabel Organisasi:
                </span>
                <input
                  type="text"
                  value={customOrgName}
                  onChange={(e) => setCustomOrgName(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Nama Lembaga/Masjid/Perusahaan"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(activeDoc.content.replace(/Islamicity/g, customOrgName))}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Tersalin!' : 'Salin Markdown'}
                </button>

                <button
                  onClick={() => handleDownloadMarkdown(activeDoc)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Unduh .md
                </button>

                <button
                  onClick={() => handlePrint(activeDoc)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Cetak / PDF
                </button>
              </div>
            </div>

            {/* Document Body View */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <div className="whitespace-pre-wrap bg-slate-50 dark:bg-slate-950/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
                {activeDoc.content.replace(/Islamicity/g, customOrgName)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Dokumen resmi terakreditasi enterprise standar ISO 27001 &amp; Prinsip Amanah</span>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
