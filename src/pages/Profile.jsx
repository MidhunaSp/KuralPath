import { motion } from "framer-motion";
import { User, Mail, BookOpen, Flame, Bookmark, Calendar, Award } from "lucide-react";
import { Loader2 } from "lucide-react";
import useUserProgress from "../hooks/useUserProgress";
import { TOTAL_KURALS } from "../lib/kuralData";

export default function Profile() {
  const { progress, user, loading } = useUserProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const read = progress?.last_read_index || 0;
  const streak = progress?.streak_days || 0;
  const bookmarks = (progress?.bookmarked_kurals || []).length;
  const readDates = progress?.read_dates || [];
  const uniqueDays = new Set(readDates.map(r => r.date)).size;
  const percentage = ((read / TOTAL_KURALS) * 100).toFixed(1);

  // Determine milestone
  const getMilestone = () => {
    if (read >= 1330) return { label: "திருக்குறள் முனிவர்", sublabel: "Thirukkural Master", icon: "🏆" };
    if (read >= 1000) return { label: "அறிவாளர்", sublabel: "Scholar", icon: "🎓" };
    if (read >= 500) return { label: "கற்றவர்", sublabel: "Learner", icon: "📖" };
    if (read >= 100) return { label: "பயிற்சியாளர்", sublabel: "Practitioner", icon: "🌱" };
    if (read >= 10) return { label: "தொடக்கம்", sublabel: "Beginner", icon: "✨" };
    return { label: "புதியவர்", sublabel: "Newcomer", icon: "🌟" };
  };

  const milestone = getMilestone();

  const stats = [
    { icon: BookOpen, label: "Kurals Read", value: read },
    { icon: Flame, label: "Day Streak", value: streak },
    { icon: Bookmark, label: "Bookmarked", value: bookmarks },
    { icon: Calendar, label: "Active Days", value: uniqueDays },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-tamil text-2xl md:text-3xl font-bold text-foreground">
          சுயவிவரம்
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your profile and reading statistics
        </p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl overflow-hidden"
      >
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10" />

        {/* User Info */}
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg border-4 border-card">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={28} />}
          </div>
          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-bold text-foreground">{user?.full_name || "User"}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} />
              <span>{user?.email}</span>
            </div>
          </div>

          {/* Milestone Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-secondary border border-border"
          >
            <span className="text-2xl">{milestone.icon}</span>
            <div>
              <p className="font-tamil font-semibold text-sm text-foreground">{milestone.label}</p>
              <p className="text-xs text-muted-foreground">{milestone.sublabel} · {percentage}% complete</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Award size={16} className="text-primary" />
          Milestones
        </h3>
        <div className="space-y-3">
          {[
            { count: 10, label: "தொடக்கம்", sublabel: "First 10 Kurals", icon: "✨" },
            { count: 100, label: "பயிற்சியாளர்", sublabel: "100 Kurals", icon: "🌱" },
            { count: 500, label: "கற்றவர்", sublabel: "500 Kurals", icon: "📖" },
            { count: 1000, label: "அறிவாளர்", sublabel: "1000 Kurals", icon: "🎓" },
            { count: 1330, label: "முனிவர்", sublabel: "All 1330 Kurals", icon: "🏆" },
          ].map((m) => (
            <div
              key={m.count}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                read >= m.count ? "bg-primary/10" : "bg-secondary/50 opacity-50"
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              <div className="flex-1">
                <p className="font-tamil text-sm font-medium text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.sublabel}</p>
              </div>
              {read >= m.count && (
                <span className="text-xs text-primary font-semibold">✓ Achieved</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}