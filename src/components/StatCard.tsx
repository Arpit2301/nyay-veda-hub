import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  accent?: boolean;
}

export default function StatCard({ title, value, icon: Icon, description, accent }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-6 ${accent ? "gradient-gold text-accent-foreground" : "bg-card text-card-foreground"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className={`text-sm font-medium ${accent ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{title}</p>
        <Icon className={`w-5 h-5 ${accent ? "text-accent-foreground/70" : "text-muted-foreground"}`} />
      </div>
      <p className="text-3xl font-display font-bold">{value}</p>
      {description && <p className={`text-xs mt-1 ${accent ? "text-accent-foreground/70" : "text-muted-foreground"}`}>{description}</p>}
    </motion.div>
  );
}
