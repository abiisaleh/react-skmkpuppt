import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Question } from "../types";
import { APP_CONFIG } from "../config";
import { Calendar, Check, AlertCircle, Info, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  onNext,
}) => {
  const [dateError, setDateError] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (val) {
      const year = new Date(val).getFullYear();
      if (year !== APP_CONFIG.ACTIVE_YEAR) {
        setDateError(
          `Tanggal penerimaan layanan harus berada pada tahun ${APP_CONFIG.ACTIVE_YEAR}.`,
        );
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  };

  const selectOptionWithDelay = (optVal: string) => {
    onChange(optVal);
    // Instant feedback then slide to next
    setTimeout(() => {
      onNext();
    }, 280);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 kpu-card-glow">
      {/* Category Header (Optional indicator only) */}
      {question.optional && (
        <div className="flex justify-end mb-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400">
            Opsional
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-800 leading-snug">
        {question.title}
      </h3>

      {/* Description */}
      {question.description && (
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {question.description}
        </p>
      )}

      {/* Inputs Logic */}
      <div className="mt-8">
        {question.type === "select" && (
          <div className="relative">
            <select
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-kpu-red focus:bg-white text-slate-700 font-medium rounded-xl px-4 py-4 pr-10 focus:outline-none transition-all text-sm scrollbar-thin scrollbar-thumb-slate-200"
            >
              <option value="" disabled>
                -- Silakan Pilih Satuan Kerja --
              </option>
              {question.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>
          </div>
        )}

        {question.type === "radio" && (
          <div className="max-h-[260px] sm:max-h-[340px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
            {question.options?.map((opt) => {
              const isSelected = value === opt;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onChange(opt)}
                  className={`w-full text-left flex items-center justify-between p-4 rounded-xl border font-medium text-sm transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-kpu-red bg-kpu-red-light/60 text-kpu-red shadow-sm"
                      : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 text-slate-700"
                  }`}
                >
                  <span className={isSelected ? "font-semibold" : ""}>
                    {opt}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "border-kpu-red bg-kpu-red text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {question.type === "rating" && (
          <div className="max-h-[260px] sm:max-h-[340px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
            {question.options?.map((opt, idx) => {
              const score = String(idx + 1);
              const isSelected = value === score;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onChange(score)}
                  className={`w-full text-left flex items-center justify-between px-4 py-2 rounded-xl border text-sm transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-kpu-orange bg-amber-50/60 text-kpu-red shadow-sm"
                      : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[15px] ${isSelected ? "font-bold text-slate-900" : "text-slate-800"}`}
                    >
                      {opt}
                    </span>
                  </div>
                  <div
                    className={`min-w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
                      isSelected
                        ? "bg-kpu-orange text-white border-kpu-orange shadow-xs"
                        : "bg-slate-100/50 border-slate-200 text-slate-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {question.type === "date" && (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="date"
                min={`${APP_CONFIG.ACTIVE_YEAR}-01-01`}
                max={`${APP_CONFIG.ACTIVE_YEAR}-12-31`}
                value={value || ""}
                onChange={handleDateChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-kpu-red focus:bg-white text-slate-700 font-medium rounded-xl px-4 py-4 pl-12 focus:outline-none transition-all text-sm scrollbar-thin scrollbar-thumb-slate-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <AnimatePresence>
              {dateError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 mt-1 pl-1"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{dateError}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {question.type === "text" && (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-kpu-red focus:bg-white text-slate-700 font-semibold rounded-xl px-4 py-4 focus:outline-none transition-all text-sm scrollbar-thin scrollbar-thumb-slate-200"
            placeholder="Tuliskan di sini..."
          />
        )}
      </div>
    </div>
  );
};
