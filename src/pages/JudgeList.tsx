import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { judges, caseTypeLabels } from "@/data/mockData";

export default function JudgeList() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Judges</h1>
        <p className="text-muted-foreground mt-1">View judge profiles, specializations, and workload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {judges.map((j, i) => {
          const load = Math.round((j.activeCases / j.maxCases) * 100);
          return (
            <motion.div key={j.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-sm font-bold text-primary-foreground">{j.avatar}</div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{j.name}</h3>
                  <p className="text-xs text-muted-foreground">{j.experience} years experience</p>
                </div>
                <div className="ml-auto">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${j.available ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                    {j.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Caseload</span>
                  <span className="font-medium text-card-foreground">{j.activeCases}/{j.maxCases}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${load > 85 ? "bg-destructive" : load > 60 ? "bg-warning" : "bg-success"}`} style={{ width: `${load}%` }} />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.specialization.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{caseTypeLabels[s]}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}
