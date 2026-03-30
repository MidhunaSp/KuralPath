import { useState, useEffect } from "react";
import { Bookmark, Loader2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import KuralCard from "../Components/KuralCard.jsx";
import useUserProgress from "../hooks/useUserProgress";
import { getKuralByNumber } from "../lib/kuralData";

export default function Bookmarks() {
  const { progress, loading, updateProgress } = useUserProgress();
  const [kurals, setKurals] = useState([]);
  const [loadingKurals, setLoadingKurals] = useState(true);

  useEffect(() => {
    if (!progress) return;
    loadBookmarkedKurals();
  }, [progress]);

  const loadBookmarkedKurals = async () => {
    const bookmarkNumbers = progress?.bookmarked_kurals || [];
    if (bookmarkNumbers.length === 0) {
      setKurals([]);
      setLoadingKurals(false);
      return;
    }

    const loaded = [];
    for (const num of bookmarkNumbers) {
      const kural = await getKuralByNumber(num);
      if (kural) loaded.push(kural);
    }
    setKurals(loaded.sort((a, b) => a.number - b.number));
    setLoadingKurals(false);
  };

  const toggleBookmark = async (kuralNumber) => {
    const bookmarks = progress?.bookmarked_kurals || [];
    const newBookmarks = bookmarks.filter(n => n !== kuralNumber);
    await updateProgress({ bookmarked_kurals: newBookmarks });
    setKurals(prev => prev.filter(k => k.number !== kuralNumber));
  };

  if (loading || loadingKurals) {
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
          புத்தகக்குறிகள்
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your bookmarked Thirukkurals — {kurals.length} saved
        </p>
      </div>

      {/* Bookmarks List */}
      {kurals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 space-y-4"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={28} className="text-primary" />
          </div>
          <div>
            <p className="font-tamil text-foreground font-medium">புத்தகக்குறி இல்லை</p>
            <p className="text-sm text-muted-foreground mt-1">
              Bookmark kurals while reading to find them here
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {kurals.map((kural, i) => (
            <motion.div
              key={kural.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <KuralCard
                kural={kural}
                isBookmarked={true}
                onToggleBookmark={toggleBookmark}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}