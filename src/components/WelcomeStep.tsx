import React from "react";
import { motion } from "motion/react";
import {
  Landmark,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";
import { Answers } from "../types";

interface WelcomeStepProps {
  onStart: () => void;
  answers: Answers;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  onStart,
  answers,
}) => {
  const satker = answers["entry_1063016371"] || answers.satker;
  const layanan = answers["entry_1627610245"] || answers.layanan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Survei Kepuasan Masyarakat
      </h1>
      <p className="mt-2 text-base font-semibold text-kpu-orange uppercase tracking-wider">
        KPU Se-Provinsi Papua Tengah
      </p>

      <p className="mt-4 text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
        Suara Anda sangat berarti bagi kelayakan dan perbaikan kualitas
        pelayanan publik di lingkungan Komisi Pemilihan Umum se-Provinsi Papua
        Tengah.
      </p>

      {/* Info Grid Card */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto">
        <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs flex flex-row sm:flex-col items-start gap-3 sm:gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Privasi Aman</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Identitas Anda dirahasiakan sepenuhnya.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs flex flex-row sm:flex-col items-start gap-3 sm:gap-2">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">± 5 Menit</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Pengisian singkat, hanya 3 bagian utama.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs flex flex-row sm:flex-col items-start gap-3 sm:gap-2">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Respon Instan</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tersinkronisasi otomatis ke google sheet.
            </p>
          </div>
        </div>
      </div>

      {/* Context info for prefilled links */}
      {(satker || layanan) && (
        <div className="mt-6 p-4 bg-kpu-red-light rounded-xl border border-kpu-red/10 text-left max-w-lg mx-auto">
          <p className="text-xs font-semibold text-kpu-red mb-1">
            Tautan Khusus Terdeteksi:
          </p>
          <div className="space-y-1 text-slate-700 text-xs text-slate-600">
            {satker && (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-kpu-orange flex-shrink-0"></span>
                <span className="break-all">
                  Satker: <strong>{satker}</strong>
                </span>
              </div>
            )}
            {layanan && (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-kpu-orange flex-shrink-0"></span>
                <span className="break-all">
                  Layanan: <strong>{layanan}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-kpu-red hover:bg-kpu-red/95 text-white font-semibold rounded-xl transition-all duration-150 shadow-md shadow-kpu-red/10 overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <ClipboardCheck className="w-5 h-5" />
          <span>Mulai Pengisian Survei</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
