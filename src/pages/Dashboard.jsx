import { BookOpen, Flame, Bookmark, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProgressRing from "../Components/ProgressRing.jsx";
import StatCard from "../Components/StatCard.jsx";
import useUserProgress from "../hooks/useUserProgress";
import { TOTAL_KURALS } from "../lib/kuralData";

export default function Dashboard() {
  const { progress, loading } = useUserProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const read = progress?.last_read_index || 0;
  const remaining = TOTAL_KURALS - read;
  const percentage = (read / TOTAL_KURALS) * 100;
  const streak = progress?.streak_days || 0;
  const bookmarks = (progress?.bookmarked_kurals || []).length;

  // Calculate days since start
  const readDates = progress?.read_dates || [];
  const uniqueDays = new Set(readDates.map(r => r.date)).size;

  // Section breakdown
  const getSectionProgress = () => {
    if (read <= 380) {
      return [
        { name: "அறத்துப்பால்", sublabel: "Virtue", total: 380, read: Math.min(read, 380), color: "bg-primary" },
        { name: "பொருட்பால்", sublabel: "Wealth", total: 700, read: 0, color: "bg-chart-2" },
        { name: "இன்பத்துப்பால்", sublabel: "Love", total: 250, read: 0, color: "bg-chart-3" },
      ];
    } else if (read <= 1080) {
      return [
        { name: "அறத்துப்பால்", sublabel: "Virtue", total: 380, read: 380, color: "bg-primary" },
        { name: "பொருட்பால்", sublabel: "Wealth", total: 700, read: Math.min(read - 380, 700), color: "bg-chart-2" },
        { name: "இன்பத்துப்பால்", sublabel: "Love", total: 250, read: 0, color: "bg-chart-3" },
      ];
    } else {
      return [
        { name: "அறத்துப்பால்", sublabel: "Virtue", total: 380, read: 380, color: "bg-primary" },
        { name: "பொருட்பால்", sublabel: "Wealth", total: 700, read: 700, color: "bg-chart-2" },
        { name: "இன்பத்துப்பால்", sublabel: "Love", total: 250, read: Math.min(read - 1080, 250), color: "bg-chart-3" },
      ];
    }
  };

  const sections = getSectionProgress();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-tamil text-2xl md:text-3xl font-bold text-foreground">
          முன்னேற்றம்
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your reading progress and statistics
        </p>
      </div>

      {/* Main Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <ProgressRing progress={percentage} size={140} strokeWidth={10} />
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            {read} <span className="text-lg text-muted-foreground font-normal">/ {TOTAL_KURALS}</span>
          </h2>
          <p className="font-tamil text-muted-foreground">குறள்கள் படிக்கப்பட்டன</p>
          <p className="text-sm text-muted-foreground">
            {remaining > 0
              ? `${remaining} kurals remaining in your journey`
              : "🎉 Congratulations! You've completed all 1330 Thirukkurals!"}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Kurals Read" value={read} sublabel="" delay={0} />
        <StatCard icon={Flame} label="Day Streak" value={streak} sublabel="consecutive days" delay={0.1} />
        <StatCard icon={Bookmark} label="Bookmarked" value={bookmarks} sublabel="" delay={0.2} />
        <StatCard icon={Calendar} label="Active Days" value={uniqueDays} sublabel="" delay={0.3} />
      </div>

      {/* Section Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h3 className="font-medium text-foreground mb-5 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          Section Progress
        </h3>
        <div className="space-y-5">
          {sections.map((section) => {
            const pct = section.total > 0 ? (section.read / section.total) * 100 : 0;
            return (
              <div key={section.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-tamil text-sm font-medium text-foreground">{section.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({section.sublabel})</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {section.read} / {section.total}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${section.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}