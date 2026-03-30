import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import KuralCard from "../Components/KuralCard";
import useUserProgress from "../hooks/useUserProgress";
import { getKuralByNumber, TOTAL_KURALS } from "../lib/kuralData";

export default function Generate() {
  const { progress, loading, updateProgress } = useUserProgress();
  const [currentKural, setCurrentKural] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [showKural, setShowKural] = useState(false);

  useEffect(() => {
    if (progress && progress.last_read_index > 0) {
      loadKural(progress.last_read_index);
    }
  }, [progress]);

  const loadKural = async (number) => {
    const kural = await getKuralByNumber(number);
    if (kural) setCurrentKural(kural);
  };

  const handleGenerate = async () => {
    if (!progress) return;
    if (progress.last_read_index >= TOTAL_KURALS) return;

    setGenerating(true);
    setShowKural(false);

    const nextIndex = progress.last_read_index + 1;
    const today = new Date().toISOString().split("T")[0];
    
    // Calculate streak
    let newStreak = progress.streak_days || 0;
    const lastDate = progress.last_read_date;
    if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newReadDates = [
      ...(progress.read_dates || []).slice(-99),
      { kural_number: nextIndex, date: today }
    ];

    await updateProgress({
      last_read_index: nextIndex,
      read_dates: newReadDates,
      streak_days: newStreak,
      last_read_date: today,
    });

    await loadKural(nextIndex);

    setTimeout(() => {
      setGenerating(false);
      setShowKural(true);
    }, 600);
  };

  const toggleBookmark = async (kuralNumber) => {
    if (!progress) return;
    const bookmarks = progress.bookmarked_kurals || [];
    const isBookmarked = bookmarks.includes(kuralNumber);
    const newBookmarks = isBookmarked
      ? bookmarks.filter(n => n !== kuralNumber)
      : [...bookmarks, kuralNumber];
    await updateProgress({ bookmarked_kurals: newBookmarks });
  };

  const isBookmarked = currentKural && (progress?.bookmarked_kurals || []).includes(currentKural.number);
  const isComplete = progress?.last_read_index >= TOTAL_KURALS;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-tamil text-2xl md:text-3xl font-bold text-foreground">
          திருக்குறள் பயணம்
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your Thirukkural journey — one kural at a time
        </p>
      </div>

      {/* Progress mini bar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">
            Progress: {progress?.last_read_index || 0} / {TOTAL_KURALS}
          </span>
          <span className="text-xs text-primary font-semibold">
            {((progress?.last_read_index || 0) / TOTAL_KURALS * 100).toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((progress?.last_read_index || 0) / TOTAL_KURALS) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: isComplete ? 1 : 1.02 }}
          whileTap={{ scale: isComplete ? 1 : 0.98 }}
          onClick={handleGenerate}
          disabled={generating || isComplete}
          className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-medium text-base transition-all duration-300 shadow-lg ${
            isComplete
              ? "bg-secondary text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:shadow-xl"
          }`}
        >
          {generating ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Sparkles size={20} />
          )}
          <span className="font-tamil">
            {isComplete
              ? "அனைத்தும் படித்தாயிற்று! 🎉"
              : generating
              ? "குறள் உருவாகிறது..."
              : progress?.last_read_index === 0
              ? "முதல் குறளைப் பெறுக"
              : "அடுத்த குறளைப் பெறுக"}
          </span>
          {!isComplete && !generating && <ChevronRight size={18} />}
        </motion.button>
      </div>

      {/* Kural Display */}
      <AnimatePresence mode="wait">
        {currentKural && (showKural || progress?.last_read_index > 0) && (
          <KuralCard
            key={currentKural.number}
            kural={currentKural}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!currentKural && !generating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={28} className="text-primary" />
          </div>
          <div>
            <p className="font-tamil text-foreground font-medium">உங்கள் பயணம் தொடங்குகிறது</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the button above to receive your first Thirukkural
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}