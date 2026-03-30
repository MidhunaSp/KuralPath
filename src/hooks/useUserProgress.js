import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export default function useUserProgress() {
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    const me = await base44.auth.me();
    setUser(me);
    
    const records = await base44.entities.UserProgress.filter({ user_email: me.email });
    if (records.length > 0) {
      setProgress(records[0]);
    } else {
      // Create initial progress
      const newProgress = await base44.entities.UserProgress.create({
        user_email: me.email,
        last_read_index: 0,
        bookmarked_kurals: [],
        read_dates: [],
        streak_days: 0,
        last_read_date: "",
      });
      setProgress(newProgress);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = useCallback(async (data) => {
    if (!progress) return;
    const updated = await base44.entities.UserProgress.update(progress.id, data);
    setProgress(updated);
    return updated;
  }, [progress]);

  return { progress, user, loading, updateProgress, refetch: fetchProgress };
}