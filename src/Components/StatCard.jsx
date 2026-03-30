import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, sublabel, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
    >
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground/70 mt-0.5">{sublabel}</p>}
      </div>
    </motion.div>
  );
}