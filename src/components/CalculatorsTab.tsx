import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Package, 
  Clock, 
  TrendingUp, 
  PieChart, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { formatRupiah } from '../utils/exportUtils';

export const CalculatorsTab: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<'omzet' | 'stok' | 'payroll' | 'profit'>('omzet');

  // ================= 1. Kalkulator Omzet & Analisis Harian =================
  const [dailySales, setDailySales] = useState<number[]>([
    4500000, 6200000, 5800000, 8900000, 12500000, 15400000, 9800000
  ]);
  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat (Barokah)', 'Sabtu', 'Ahad'];

  const handleSaleChange = (index: number, val: string) => {
    const num = Number(val) || 0;
    const updated = [...dailySales];
    updated[index] = num;
    setDailySales(updated);
  };

  const totalOmzet = dailySales.reduce((a, b) => a + b, 0);
  const avgOmzet = totalOmzet / dailySales.length;
  const maxSale = Math.max(...dailySales);
  const maxDayIndex = dailySales.indexOf(maxSale);
  const maxDayName = daysOfWeek[maxDayIndex];
  const zakatUsaha = totalOmzet * 0.025; // 2.5% estimasi zakat perniagaan

  // ================= 2. Kalkulator Stok Akhir Otomatis =================
  const [stokAwal, setStokAwal] = useState<number>(500);
  const [barangMasuk, setBarangMasuk] = useState<number>(350);
  const [barangKeluar, setBarangKeluar] = useState<number>(420);
  const [barangRusak, setBarangRusak] = useState<number>(15);
  const [safetyStock, setSafetyStock] = useState<number>(150);

  const stokAkhir = stokAwal + barangMasuk - barangKeluar - barangRusak;
  const needRestock = stokAkhir <= safetyStock;

  // ================= 3. Kalkulator Upah & Lembur =================
  const [gajiPokok, setGajiPokok] = useState<number>(8500000);
  const [tunjangan, setTunjangan] = useState<number>(2000000);
  const [jamLembur, setJamLembur] = useState<number>(14);

  // Regulasi upah lembur per jam = 1/173 x (Gaji Pokok + Tunjangan Tetap)
  const upahPerJam = Math.round((gajiPokok + tunjangan) / 173);
  // Asumsi jam lembur: 1 jam pertama (1.5x), sisanya 2.0x
  const totalUpahLembur = jamLembur > 0 
    ? Math.round((1 * 1.5 * upahPerJam) + (Math.max(0, jamLembur - 1) * 2.0 * upahPerJam))
    : 0;

  const potonganBPJS = Math.round((gajiPokok + tunjangan) * 0.03); // 3% potongan jaminan sosial
  const takeHomePay = gajiPokok + tunjangan + totalUpahLembur - potonganBPJS;

  // ================= 4. Laporan Laba Bersih Bulanan =================
  const [omzetBulanan, setOmzetBulanan] = useState<number>(120000000);
  const [hpp, setHpp] = useState<number>(55000000);
  const [biayaServerCloud, setBiayaServerCloud] = useState<number>(8500000);
  const [biayaGajiKaryawan, setBiayaGajiKaryawan] = useState<number>(28000000);
  const [biayaOperasionalLain, setBiayaOperasionalLain] = useState<number>(6500000);

  const labaKotor = omzetBulanan - hpp;
  const totalBebanOperasional = biayaServerCloud + biayaGajiKaryawan + biayaOperasionalLain;
  const labaBersih = labaKotor - totalBebanOperasional;
  const profitMarginPercent = omzetBulanan > 0 ? ((labaBersih / omzetBulanan) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-500" />
          Kalkulator Finansial &amp; Kontrol Profit Bisnis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Formula otomatis rekap omzet sales harian, stok akhir pergudangan, upah &amp; lembur sesuai regulasi, dan margin laba bersih.
        </p>
      </div>

      {/* Calculator Mode Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        {[
          { id: 'omzet' as const, label: 'Kalkulator & Analisis Omzet Sales', icon: <DollarSign className="h-4 w-4" /> },
          { id: 'stok' as const, label: 'Kalkulator Stok Akhir Otomatis', icon: <Package className="h-4 w-4" /> },
          { id: 'payroll' as const, label: 'Kalkulator Upah & Lembur Karyawan', icon: <Clock className="h-4 w-4" /> },
          { id: 'profit' as const, label: 'Laporan Laba Bersih Bulanan', icon: <PieChart className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCalculator(tab.id)}
            className={`flex-1 min-w-[200px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeCalculator === tab.id
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ==================== 1. KALKULATOR OMZET ==================== */}
      {activeCalculator === 'omzet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                Input Penjualan / Omzet Harian (Minggu Berjalan)
              </h2>
              <button
                onClick={() => setDailySales([5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000])}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Reset Rata
              </button>
            </div>

            <div className="space-y-3">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-36">
                    {day}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Rp</span>
                    <input
                      type="number"
                      value={dailySales[idx]}
                      onChange={(e) => handleSaleChange(idx, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Hasil Rekapitulasi &amp; Analisis Omzet
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Total Omzet Mingguan</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {formatRupiah(totalOmzet)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Rata-Rata Harian:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{formatRupiah(avgOmzet)}</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Hari Omzet Terbesar:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{maxDayName} ({formatRupiah(maxSale)})</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1.5 border-t border-slate-200 dark:border-slate-700">
                  <span>Potensi Zakat Usaha (2.5%):</span>
                  <strong className="text-amber-600 dark:text-amber-400">{formatRupiah(zakatUsaha)}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                💡 <strong>Rekomendasi Strategis:</strong> Penjualan tertinggi terjadi pada <strong>{maxDayName}</strong>. Maksimalkan alokasi stok dan diskon kilat di hari tersebut untuk meningkatkan omzet hingga 25%.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. KALKULATOR STOK AKHIR ==================== */}
      {activeCalculator === 'stok' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-500" />
              Komponen Perhitungan Mutasi Persediaan Barang
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Stok Awal Periode (Unit)
                </label>
                <input
                  type="number"
                  value={stokAwal}
                  onChange={(e) => setStokAwal(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Barang Masuk / Pembelian Baru (Unit)
                </label>
                <input
                  type="number"
                  value={barangMasuk}
                  onChange={(e) => setBarangMasuk(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Barang Keluar / Terjual (Unit)
                </label>
                <input
                  type="number"
                  value={barangKeluar}
                  onChange={(e) => setBarangKeluar(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Barang Rusak / Retur / Kadaluarsa (Unit)
                </label>
                <input
                  type="number"
                  value={barangRusak}
                  onChange={(e) => setBarangRusak(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Batas Aman Persediaan (Safety Stock Buffer)
                </label>
                <input
                  type="number"
                  value={safetyStock}
                  onChange={(e) => setSafetyStock(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Stok Result Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Status Stok Akhir &amp; Reorder Point
            </h2>

            <div className={`p-4 rounded-xl border ${
              needRestock 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
            }`}>
              <div className="text-xs font-semibold uppercase tracking-wider">
                Stok Akhir Tersedia
              </div>
              <div className="text-3xl font-black mt-1">
                {stokAkhir} <span className="text-sm font-normal">Unit</span>
              </div>
              <div className="text-xs font-bold mt-2">
                {needRestock ? '⚠️ PERLU RESTOCK SEGERA (Di Bawah Safety Stock)' : '✅ KONDISI STOK AMAN'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Total Tersedia:</span>
                <span>{stokAwal + barangMasuk} Unit</span>
              </div>
              <div className="flex justify-between">
                <span>Total Terpakai:</span>
                <span>{barangKeluar + barangRusak} Unit</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-bold">
                <span>Rasio Turn-Over:</span>
                <span className="text-emerald-500">{((barangKeluar / (stokAwal || 1)) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. KALKULATOR PAYROLL ==================== */}
      {activeCalculator === 'payroll' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              Parameter Kompensasi &amp; Jam Lembur
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gaji Pokok Bulanan (IDR)
                </label>
                <input
                  type="number"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tunjangan Tetap (IDR)
                </label>
                <input
                  type="number"
                  value={tunjangan}
                  onChange={(e) => setTunjangan(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Akumulasi Jam Lembur
                </label>
                <input
                  type="number"
                  value={jamLembur}
                  onChange={(e) => setJamLembur(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              ℹ️ Menggunakan formula Kepmenakertrans: Upah per jam = 1/173 &times; (Gaji Pokok + Tunjangan Tetap). Jam ke-1 dibayar 1.5x dan jam berikutnya dibayar 2.0x.
            </div>
          </div>

          {/* Payroll Summary Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Slip Gaji Bersih (Take Home Pay)
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Gaji Pokok:</span>
                <span>{formatRupiah(gajiPokok)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tunjangan Tetap:</span>
                <span>{formatRupiah(tunjangan)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Upah Lembur ({jamLembur} Jam):</span>
                <span>+{formatRupiah(totalUpahLembur)}</span>
              </div>
              <div className="flex justify-between text-rose-500 font-semibold">
                <span>Potongan BPJS &amp; Iuran (3%):</span>
                <span>-{formatRupiah(potonganBPJS)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 pt-3 mt-3">
              <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase">
                Take Home Pay Bersih
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatRupiah(takeHomePay)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 4. LAPORAN LABA BERSIH ==================== */}
      {activeCalculator === 'profit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-emerald-500" />
              Laporan Laba Rugi &amp; Kontrol Margin Usaha
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pendapatan / Omzet Kotor (IDR)
                </label>
                <input
                  type="number"
                  value={omzetBulanan}
                  onChange={(e) => setOmzetBulanan(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  HPP (Harga Pokok Penjualan)
                </label>
                <input
                  type="number"
                  value={hpp}
                  onChange={(e) => setHpp(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Biaya Server Cloud &amp; Infra
                </label>
                <input
                  type="number"
                  value={biayaServerCloud}
                  onChange={(e) => setBiayaServerCloud(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Beban Payroll Gaji Karyawan
                </label>
                <input
                  type="number"
                  value={biayaGajiKaryawan}
                  onChange={(e) => setBiayaGajiKaryawan(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Biaya Operasional Umum &amp; Listrik
                </label>
                <input
                  type="number"
                  value={biayaOperasionalLain}
                  onChange={(e) => setBiayaOperasionalLain(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Profit Result */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Analisis Margin &amp; Profitabilitas
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Laba Kotor (Gross Profit):</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatRupiah(labaKotor)}</span>
              </div>
              <div className="flex justify-between text-rose-500 font-semibold">
                <span>Total Beban Operasional:</span>
                <span>-{formatRupiah(totalBebanOperasional)}</span>
              </div>
              <div className="flex justify-between text-cyan-600 dark:text-cyan-400 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Net Margin:</span>
                <span>{profitMarginPercent}%</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border mt-3 ${
              labaBersih >= 0
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
            }`}>
              <div className="text-[11px] font-semibold uppercase tracking-wider">
                Laba Bersih Bulanan
              </div>
              <div className="text-2xl font-black mt-1">
                {formatRupiah(labaBersih)}
              </div>
              <div className="text-[11px] mt-1 font-medium">
                {labaBersih >= 0 ? '🟢 Operasional Sehat & Profitabel' : '🔴 Perlu Efisiensi Biaya Operasional'}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
