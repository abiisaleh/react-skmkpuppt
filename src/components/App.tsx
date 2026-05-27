import { useState, useEffect } from 'react';
import { FormWizard } from './components/FormWizard';
import { Landmark, Share2, HelpCircle, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from './config';
import { ENTRY_MAPPING } from './data/questionsData';

export default function App() {
  const [headerSatker, setHeaderSatker] = useState<string>('');
  const [headerLayanan, setHeaderLayanan] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Synchronize Satker & Layanan header labels from state or URL
  useEffect(() => {
    const updateHeaderLabels = () => {
      // Look at localStorage draft or active URL params
      const saved = localStorage.getItem('kpu_skm_answers_draft');
      let satkerVal = '';
      let layananVal = '';

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Support both entry ID mapping and semantic key fallback
          satkerVal = parsed[ENTRY_MAPPING.satker] || parsed.satker || '';
          layananVal = parsed[ENTRY_MAPPING.layanan] || parsed.layanan || '';
        } catch {}
      }


      const params = new URLSearchParams(window.location.search);
      const satkerParam = params.get('satker');
      const layananParam = params.get('layanan') || params.get('jenis_layanan');

      if (satkerParam) satkerVal = decodeURIComponent(satkerParam);
      if (layananParam) layananVal = decodeURIComponent(layananParam);

      setHeaderSatker(satkerVal);
      setHeaderLayanan(layananVal);
    };

    updateHeaderLabels();

    // Listen to changes (e.g. interval check or custom events, simple interval is robust on state changes)
    const interval = setInterval(updateHeaderLabels, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    let shareUrl = window.location.origin + window.location.pathname;
    const params = [];
    if (headerSatker) params.push(`satker=${encodeURIComponent(headerSatker)}`);
    if (headerLayanan) params.push(`layanan=${encodeURIComponent(headerLayanan)}`);
    
    if (params.length > 0) {
      shareUrl += `?${params.join('&')}`;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        window.prompt('Salin link ini:', shareUrl);
      });
    } else {
      window.prompt('Salin link ini:', shareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Premium KPU Dual-Stripe Navbar Layout */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        {/* Top orange brand stripe decoration */}
        <div className="h-1 bg-gradient-to-r from-kpu-red to-kpu-orange w-full" />
        
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Column 1: KPU Emblem Logo */}
          <div className="flex items-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-kpu-red flex items-center justify-center text-white shadow-md shadow-kpu-red/10 border border-kpu-red/20">
              <Landmark className="w-5 h-5 text-amber-100" />
            </div>
          </div>

          {/* Column 2: Header Dynamic Headings & Subtexts (Full text displayed without cutoffs) */}
          <div className="flex-1 text-center min-w-0">
            <h1 className="text-sm font-extrabold text-kpu-red tracking-tight break-words uppercase">
              {APP_CONFIG.SURVEY_TITLE}
            </h1>
            
            <div className="mt-1.5 text-[11px] sm:text-xs text-slate-500 font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5">
              {headerSatker || headerLayanan ? (
                <div className="flex flex-col gap-1 w-full max-w-full items-center justify-center">
                  {headerSatker && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 text-center font-bold text-[10px] sm:text-xs w-full break-words">
                      {headerSatker}
                    </span>
                  )}
                  {headerLayanan && (
                    <span className="bg-amber-50 px-2 py-0.5 rounded text-kpu-orange text-center font-bold text-[10px] sm:text-xs w-full break-words">
                      {headerLayanan}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-400">{APP_CONFIG.SUB_TITLE}</span>
              )}
            </div>
          </div>

          {/* Column 3: Copy / Share button */}
          <div className="shrink-0">
            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                copied
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 hover:border-slate-350 bg-white text-slate-600 hover:bg-slate-50'
              }`}
              title="Salin link khusus Satker & Layanan saat ini"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Bagikan'}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-6 max-w-4xl w-full mx-auto pb-24">
        <FormWizard />
      </main>

      {/* Styled Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-slate-400 text-xs font-medium">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="tracking-tight text-slate-500">
            &copy; {new Date().getFullYear()} Komisi Pemilihan Umum Provinsi Papua Tengah.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Sertifikasi SSL
            </span>
            <span>v2.1 Premium Redesign</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
