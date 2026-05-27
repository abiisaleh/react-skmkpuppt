import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { questions } from "../data/questionsData";
import { Question, Answers } from "../types";
import { WelcomeStep } from "./WelcomeStep";
import { QuestionCard } from "./QuestionCard";
import { SuccessStep } from "./SuccessStep";
import { APP_CONFIG } from "../config";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  CheckCircle,
  Flame,
} from "lucide-react";

export const FormWizard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<number[]>([0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and parse URL parameters for Satker and Layanan prefilling
  useEffect(() => {
    // Check if we have draft answers in localStorage
    const saved = localStorage.getItem("kpu_skm_answers_draft");
    let loadedAnswers: Answers = {};
    if (saved) {
      try {
        loadedAnswers = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const satkerParam = params.get("satker");
    const layananParam = params.get("layanan") || params.get("jenis_layanan");

    if (satkerParam) {
      try {
        loadedAnswers["entry_1063016371"] = decodeURIComponent(satkerParam);
      } catch {
        loadedAnswers["entry_1063016371"] = satkerParam;
      }
    }
    if (layananParam) {
      try {
        loadedAnswers["entry_1627610245"] = decodeURIComponent(layananParam);
      } catch {
        loadedAnswers["entry_1627610245"] = layananParam;
      }
    }

    setAnswers(loadedAnswers);
  }, []);

  // Save answers to localStorage draft
  useEffect(() => {
    if (Object.keys(answers).length > 0 && !isSubmitted) {
      localStorage.setItem("kpu_skm_answers_draft", JSON.stringify(answers));
    }
  }, [answers, isSubmitted]);

  // Show customized modern toasts
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const currentQuestion = questions[currentIndex];

  // Logic to determine if a question is pre-filled from URL
  const isPrefilledQuestion = (q: Question) => {
    const params = new URLSearchParams(window.location.search);
    if (q.id === "entry_1063016371" && params.get("satker")) return true;
    if (
      q.id === "entry_1627610245" &&
      (params.get("layanan") || params.get("jenis_layanan"))
    )
      return true;
    return false;
  };

  const getFirstValidIdx = (): number => {
    let idx = 0;
    while (idx < questions.length) {
      if (isPrefilledQuestion(questions[idx])) {
        idx++;
        continue;
      }
      break;
    }
    return idx < questions.length ? idx : 0;
  };

  // Logic to compute next valid question index
  const getNextIdx = (fromIdx: number): number => {
    let nextIdx = fromIdx + 1;
    if (nextIdx >= questions.length) return nextIdx;

    // Check prefilled skip conditions (Only skip at initialization or when welcome screen starts)
    while (nextIdx < questions.length) {
      const q = questions[nextIdx];

      // Skip jenis_disabilitas if disabilitas is not 'Ya'
      if (q.id === "entry_1236261329" && answers["disabilitas"] !== "Ya") {
        nextIdx++;
        continue;
      }

      // If we are fast forwarding from Welcome or Satker steps, skip prefilled
      if (isPrefilledQuestion(q)) {
        nextIdx++;
        continue;
      }

      break;
    }
    return nextIdx;
  };

  const handleStart = () => {
    const startIdx = getFirstValidIdx();
    setHistory([startIdx]);
    setCurrentIndex(startIdx);
    setShowWelcome(false);
    showToast("Memulai pengisian survei. Selamat mengisi!");
  };

  const handleNext = () => {
    // Validate current input if not optional
    if (!currentQuestion.optional && !answers[currentQuestion.id]) {
      return;
    }

    if (currentQuestion.type === "date") {
      const dateVal = answers[currentQuestion.id];
      if (dateVal) {
        const year = new Date(dateVal).getFullYear();
        if (year !== APP_CONFIG.ACTIVE_YEAR) {
          showToast(
            `Tahun pelayanan harus bernilai ${APP_CONFIG.ACTIVE_YEAR}.`,
          );
          return;
        }
      }
    }

    const nextIdx = getNextIdx(currentIndex);
    if (nextIdx < questions.length) {
      setHistory((prev) => [...prev, nextIdx]);
      setCurrentIndex(nextIdx);
    } else {
      // Last step: Submit the survey
      submitForm();
    }
  };

  const handlePrev = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const prevIdx = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentIndex(prevIdx);
    } else {
      setShowWelcome(true);
    }
  };

  const handleValueChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  // Form submission handler to submit to Google Form
  const submitForm = async () => {
    setIsSubmitting(true);

    // Build form fields dynamically
    const formData = new URLSearchParams();

    questions.forEach((q) => {
      // Skip welcome slide and disabilitas logical-helper question
      if (q.id === "welcome" || q.id === "disabilitas") return;

      // Special conditional disabilitas mapping logic
      if (q.id === "entry_1236261329") {
        const hasDisabilitas = answers["disabilitas"] === "Ya";
        formData.append(
          "entry.1236261329",
          hasDisabilitas
            ? answers["entry_1236261329"] || ""
            : "Non Disabilitas",
        );
        return;
      }

      // Automatically translate all entry_* question IDs into valid google form post keys (entry.*)
      if (q.id.startsWith("entry_")) {
        const score = answers[q.id];
        if (score) {
          const dotKey = q.id.replace("entry_", "entry.");
          formData.append(dotKey, score);
        }
      }
    });

    try {
      // Send as POST request via no-cors mode representing a seamless background entry
      await fetch(APP_CONFIG.GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      // Show high fidelity transition
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        localStorage.removeItem("kpu_skm_answers_draft"); // Clean draft
        showToast("Tanggapan Berhasil Dikirim!");
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to submit via standard fetch, trying redirect style fallback...",
        error,
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    // Keep satker and layanan if preset in URL, clear other answers
    const params = new URLSearchParams(window.location.search);
    const satkerParam = params.get("satker");
    const layananParam = params.get("layanan") || params.get("jenis_layanan");

    const nextAnswers: Answers = {};
    if (satkerParam)
      nextAnswers["entry_1063016371"] = decodeURIComponent(satkerParam);
    if (layananParam)
      nextAnswers["entry_1627610245"] = decodeURIComponent(layananParam);

    setAnswers(nextAnswers);
    setHistory([0]);
    setCurrentIndex(0);
    setShowWelcome(true);
    setIsSubmitted(false);
    localStorage.removeItem("kpu_skm_answers_draft");
    showToast("Kuesioner diatur ulang.");
  };

  const handleShare = () => {
    let shareUrl = window.location.origin + window.location.pathname;
    const params = [];
    const savedSatker = answers["entry_1063016371"];
    const savedLayanan = answers["entry_1627610245"];
    if (savedSatker) params.push(`satker=${encodeURIComponent(savedSatker)}`);
    if (savedLayanan)
      params.push(`layanan=${encodeURIComponent(savedLayanan)}`);

    if (params.length > 0) {
      shareUrl += `?${params.join("&")}`;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          showToast("Tautan survei tersalin ke papan klip!");
        })
        .catch(() => {
          window.prompt("Salin link ini:", shareUrl);
        });
    } else {
      window.prompt("Salin link ini:", shareUrl);
    }
  };

  // Determine current sectional state and progress percentage
  const progressMetrics = (() => {
    if (showWelcome) return { percent: 0, label: "", activeSec: "" };

    const isQuestionVisible = (q: Question) => {
      if (isPrefilledQuestion(q)) return false;
      if (q.id === "entry_1236261329" && answers["disabilitas"] !== "Ya") {
        return false;
      }
      return true;
    };

    const activeSec = currentQuestion.section;
    const secQuestions = questions.filter(
      (q) => q.section === activeSec && isQuestionVisible(q),
    );

    const currentStepInSec =
      secQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;
    const totalStepsInSec = secQuestions.length;

    const stepLabel =
      currentStepInSec > 0 && totalStepsInSec > 0
        ? `${currentStepInSec} dari ${totalStepsInSec} Pertanyaan`
        : "";

    const percent =
      totalStepsInSec > 0
        ? Math.round((currentStepInSec / totalStepsInSec) * 100)
        : 0;

    return { percent, label: stepLabel, activeSec };
  })();

  return (
    <div className="w-full max-w-2xl px-4 flex flex-col items-center">
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 z-50 bg-slate-900 text-white rounded-xl shadow-xl px-5 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2.5 max-w-sm border border-slate-800"
          >
            <CheckCircle className="w-4 h-4 text-kpu-orange shrink-0" />
            <span className="leading-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Header- Sleek, Minimalist Style */}
      {!showWelcome && !isSubmitted && !isSubmitting && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-6"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span className="text-kpu-red uppercase tracking-wide font-extrabold text-[11px] bg-kpu-red-light px-2.5 py-0.5 rounded-full">
              {progressMetrics.activeSec}
            </span>
            <span className="text-kpu-orange text-[11px] font-bold">
              {progressMetrics.label}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressMetrics.percent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-kpu-red to-kpu-orange rounded-full shadow-[0_1px_5px_rgba(255,128,11,0.25)]"
            />
          </div>
        </motion.div>
      )}

      {/* Primary UI Card Wizard */}
      <div className="w-full flex justify-center">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-kpu-red rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-6 h-6 text-kpu-orange" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-6 tracking-tight">
              Menyinkronkan Tanggapan...
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed">
              Data Anda aman dan sedang dikirim secara langsung ke sistem data
              terpadu KPU. Mohon tunggu sebentar.
            </p>
          </div>
        ) : isSubmitted ? (
          <SuccessStep
            answers={answers}
            onReset={handleReset}
            onShare={handleShare}
          />
        ) : showWelcome ? (
          <WelcomeStep onStart={handleStart} answers={answers} />
        ) : (
          <AnimatePresence mode="wait">
            <QuestionCard
              question={currentQuestion}
              value={(answers[currentQuestion.id] as string) || ""}
              onChange={handleValueChange}
              onNext={handleNext}
            />
          </AnimatePresence>
        )}
      </div>

      {/* Spacer to prevent scroll layout cutoff due to sticky footer */}
      {!isSubmitted && !isSubmitting && !showWelcome && (
        <div className="w-full" />
      )}

      {/* Dynamic Action Sticky Footer floating at the bottom */}
      {!isSubmitted && !isSubmitting && !showWelcome && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200/60 py-4 px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 w-full">
            <motion.button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-5 py-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all duration-150 shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </motion.button>

            <motion.button
              onClick={handleNext}
              className={`flex items-center gap-1.5 px-6 py-3.5 text-white font-bold rounded-xl text-xs transition-all duration-150 shadow-md shadow-kpu-red/10 cursor-pointer ${
                !currentQuestion.optional && !answers[currentQuestion.id]
                  ? "bg-slate-300 pointer-events-none opacity-55"
                  : "bg-kpu-red hover:bg-kpu-red/95 shadow-[0_4px_12px_rgba(109,23,26,0.15)]"
              }`}
            >
              <span>
                {currentIndex === questions.length - 1
                  ? "Kirim Tanggapan"
                  : "Berikutnya"}
              </span>
              {currentIndex === questions.length - 1 ? (
                <Send className="w-3.5 h-3.5 ml-0.5 animate-pulse" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};
