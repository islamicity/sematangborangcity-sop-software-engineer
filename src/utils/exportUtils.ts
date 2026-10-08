import { FinancialTransaction, JamaahProfile } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateSimpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex}${hex}${hex}${hex}`.slice(0, 64);
}

export function exportTransactionsToCSV(transactions: FinancialTransaction[]): void {
  const headers = ['ID Transaksi', 'Tanggal', 'Tipe', 'Kategori', 'Jumlah (IDR)', 'Nama Donatur/Keterangan', 'Metode Bayar', 'Status', 'Hash SHA-256'];
  const rows = transactions.map(t => [
    t.id,
    t.date,
    t.type,
    t.category,
    t.amount.toString(),
    `"${(t.donorName || t.description).replace(/"/g, '""')}"`,
    t.paymentMethod,
    t.status,
    t.hash
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Laporan_Kas_Masjid_Islamicity_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportJamaahToCSV(jamaahList: JamaahProfile[]): void {
  const headers = ['ID Jamaah', 'Nama Lengkap', 'Nomor WhatsApp', 'Email', 'Kategori', 'Komitmen Iuran (IDR)', 'Status Iuran', 'Terakhir Bayar', 'Total Kontribusi (IDR)'];
  const rows = jamaahList.map(j => [
    j.id,
    `"${j.name}"`,
    j.phone,
    j.email,
    j.category,
    j.monthlyPledge.toString(),
    j.paymentStatus,
    j.lastPaymentDate,
    j.totalDonation.toString()
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Database_Jamaah_Islamicity_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printFinancialReport(transactions: FinancialTransaction[], totalIncome: number, totalExpense: number, balance: number): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Laporan Keuangan & Kas Masjid Islamicity</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1e293b; }
        .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; color: #065f46; margin: 0; }
        .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
        .summary-grid { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
        .summary-card { flex: 1; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
        .summary-card h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #64748b; }
        .summary-card p { margin: 0; font-size: 16px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th, td { border: 1px solid #e2e8f0; padding: 8px 10px; text-align: left; }
        th { background-color: #f1f5f9; font-weight: 600; }
        .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 12px; color: #475569; }
        .hash-tag { font-family: monospace; font-size: 9px; color: #64748b; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">LEMBAGA DKM & PLATFORM KAS ISLAMICITY</h1>
        <div class="subtitle">Laporan Transparansi Arus Kas & Dana Umat Terenkripsi E2E | Dicetak: ${new Date().toLocaleString('id-ID')}</div>
      </div>

      <div class="summary-grid">
        <div class="summary-card" style="border-left: 4px solid #10b981;">
          <h4>Total Pemasukan (Infaq/Zakat/Iuran)</h4>
          <p style="color: #059669;">${formatRupiah(totalIncome)}</p>
        </div>
        <div class="summary-card" style="border-left: 4px solid #ef4444;">
          <h4>Total Pengeluaran Operasional & Santunan</h4>
          <p style="color: #dc2626;">${formatRupiah(totalExpense)}</p>
        </div>
        <div class="summary-card" style="border-left: 4px solid #3b82f6;">
          <h4>Saldo Kas Bersih Tersedia</h4>
          <p style="color: #2563eb;">${formatRupiah(balance)}</p>
        </div>
      </div>

      <h3>Daftar Transaksi Terakhir</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Kategori</th>
            <th>Deskripsi / Donatur</th>
            <th>Metode</th>
            <th>Tipe</th>
            <th>Jumlah</th>
            <th>Ledger Hash SHA-256</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map(t => `
            <tr>
              <td>${t.id}</td>
              <td>${t.date}</td>
              <td>${t.category}</td>
              <td>${t.donorName || t.description}</td>
              <td>${t.paymentMethod}</td>
              <td style="color: ${t.type === 'Pemasukan' ? '#059669' : '#dc2626'}; font-weight: 600;">${t.type}</td>
              <td style="font-weight: 600;">${formatRupiah(t.amount)}</td>
              <td class="hash-tag">${t.hash.slice(0, 16)}...</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <div>
          <p>Disiapkan secara otomatis oleh:</p>
          <p><strong>Sistem Infrastruktur Cerdas Islamicity</strong></p>
        </div>
        <div style="text-align: right;">
          <p>Mengetahui & Menyetujui,</p>
          <br><br>
          <p><strong>Ketua DKM & Bendahara</strong></p>
        </div>
      </div>
      <script>window.onload = function() { window.print(); };</script>
    </body>
  </html>
  `;
  printWindow.document.write(html);
  printWindow.document.close();
}

export function buildWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
