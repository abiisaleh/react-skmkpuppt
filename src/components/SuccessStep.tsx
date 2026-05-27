import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Answers } from '../types';
import { questions } from '../data/questionsData';
import { RotateCcw, Share2 } from 'lucide-react';

interface SuccessStepProps {
  answers: Answers;
  onReset: () => void;
  onShare: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ answers, onReset, onShare }) => {
  // Calculate average rating score
  const ratingMetrics = useMemo(() => {
    let sum = 0;
    let count = 0;

    // Get only the rating questions dynamically from our unified list
    const ratingQuestionKeys = questions
      .filter((q) => q.type === 'rating')
      .map((q) => q.id);

    ratingQuestionKeys.forEach((key) => {
      const val = answers[key];
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
          sum += num;
          count++;
        }
      }
    });

    const average = count > 0 ? sum / count : 0;
    return { average, count };
  }, [answers]);

  // Map average (1.0 to 4.0) to exactly one of 4 emojis
  const feedback = useMemo(() => {
    const avg = ratingMetrics.average;
    if (avg === 0) {
      return { emoji: '✨', text: 'Selesai', subtext: 'Terima kasih telah mengisi survei', bg: 'bg-slate-50', border: 'border-slate-100', textCol: 'text-slate-600' };
    }
    if (avg <= 1.5) {
      return { emoji: '😞', text: 'Sangat Tidak Puas', subtext: 'Tingkat kepuasan sangat rendah', bg: 'bg-rose-50/50', border: 'border-rose-100/50', textCol: 'text-rose-600' };
    } else if (avg <= 2.5) {
      return { emoji: '😐', text: 'Kurang Puas', subtext: 'Tingkat kepuasan di bawah rata-rata', bg: 'bg-amber-50/50', border: 'border-amber-100/50', textCol: 'text-amber-600' };
    } else if (avg <= 3.5) {
      return { emoji: '🙂', text: 'Puas / Baik', subtext: 'Pelayanan dirasakan sudah baik', bg: 'bg-emerald-50/50', border: 'border-emerald-100/50', textCol: 'text-emerald-600' };
    } else {
      return { emoji: '😄', text: 'Sangat Puas / Unggul', subtext: 'Pelayanan dirasakan sangat memuaskan', bg: 'bg-indigo-50/50', border: 'border-indigo-100/50', textCol: 'text-indigo-600' };
    }
  }, [ratingMetrics.average]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-2xl border border-slate-100 p-8 text-center kpu-card-glow max-w-lg mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Survei Selesai!
      </h2>
      <p className="mt-2 text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
        Terima kasih atas partisipasi aktif Anda. Tanggapan Anda telah dialirkan secara aman dan berhasil terkirim ke KPU.
      </p>

      {/* Modern, clean centered Emoji Feedback (One of 4 kinds based on average) */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className={`w-32 h-32 rounded-full ${feedback.bg} border ${feedback.border} flex items-center justify-center text-7xl shadow-xs transition-transform hover:scale-105 duration-300`}>
          {feedback.emoji}
        </div>
        <div className="mt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hasil Penilaian Anda</span>
          <h3 className={`text-xl font-bold mt-1 ${feedback.textCol}`}>
            {feedback.text}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{feedback.subtext}</p>
          {ratingMetrics.count > 0 && (
            <p className="text-[11px] font-mono font-medium text-slate-400 mt-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 inline-block">
              Rata-rata Skor: {ratingMetrics.average.toFixed(2)} / 4.00
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onShare}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-all duration-150 cursor-pointer w-full sm:w-auto"
        >
          <Share2 className="w-4 h-4" />
          <span>Bagikan Tautan</span>
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-kpu-red hover:bg-kpu-red/95 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all duration-150 shadow-sm cursor-pointer w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Isi Kuesioner Baru</span>
        </button>
      </div>
    </motion.div>
  );
};
