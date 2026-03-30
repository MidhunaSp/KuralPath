import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Hash } from "lucide-react";

export default function KuralCard({ kural, isBookmarked, onToggleBookmark, showBookmark = true }) {
  if (!kural) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Hash size={12} />
            <span>{kural.number}</span>
          </div>
          {kural.chapter && (
            <span className="text-xs text-muted-foreground font-tamil">{kural.chapter}</span>
          )}
        </div>
        {showBookmark && (
          <button
            onClick={() => onToggleBookmark?.(kural.number)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck size={18} className="text-primary" />
            ) : (
              <Bookmark size={18} className="text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {/* Section badge */}
      {kural.section && (
        <div className="px-6 pb-3">
          <span className="text-[11px] font-tamil text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            {kural.section}
          </span>
        </div>
      )}

      {/* Kural Text */}
      <div className="px-6 py-5 border-t border-border/50 bg-gradient-to-b from-secondary/30 to-transparent">
        <p className="font-tamil text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-line text-center">
          {kural.kural_tamil}
        </p>
      </div>

      {/* Explanation */}
      <div className="px-6 py-5 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">பொருள் (Meaning)</p>
          <p className="font-tamil text-sm leading-relaxed text-foreground/80">
            {kural.explanation_tamil}
          </p>
        </div>
        {kural.explanation_english && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">English</p>
            <p className="text-sm leading-relaxed text-foreground/70 italic">
              {kural.explanation_english}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}