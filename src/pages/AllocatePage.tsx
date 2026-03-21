import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { cases, judges, caseTypeLabels, LegalCase, Judge } from "@/data/mockData";
import { toast } from "sonner";

export default function AllocatePage() {
  const unassigned = cases.filter((c) => !c.assignedJudge && c.status !== "resolved" && c.status !== "dismissed");
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(unassigned[0] || null);
  const [allocations, setAllocations] = useState<Record<string, string>>({});

  const getRecommendedJudges = (caseItem: LegalCase): (Judge & { score: number })[] => {
    return judges
      .filter((j) => j.available && j.activeCases < j.maxCases)
      .map((j) => {
        let score = 0;
        if (j.specialization.includes(caseItem.type)) score += 50;
        score += ((j.maxCases - j.activeCases) / j.maxCases) * 30;
        score += Math.min(j.experience, 25) * 0.8;
        return { ...j, score: Math.round(score) };
      })
      .sort((a, b) => b.score - a.score);
  };

  const handleAllocate = (caseId: string, judgeId: string, judgeName: string) => {
    setAllocations((prev) => ({ ...prev, [caseId]: judgeId }));
    toast.success(`Case assigned to ${judgeName}`);
  };

  const recommended = selectedCase ? getRecommendedJudges(selectedCase) : [];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Allocate Cases</h1>
        <p className="text-muted-foreground mt-1">Assign judges to unassigned cases based on specialization & availability</p>
      </div>

      {unassigned.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-xl">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
          <p className="font-semibold text-card-foreground">All cases are assigned!</p>
          <p className="text-sm text-muted-foreground mt-1">No pending allocations at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Unassigned Cases */}
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-lg font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Unassigned ({unassigned.length})
            </h2>
            <div className="space-y-2">
              {unassigned.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedCase?.id === c.id ? "border-accent bg-accent/10" : "border-transparent hover:bg-muted/50"
                  } ${allocations[c.id] ? "opacity-50" : ""}`}
                >
                  <p className="text-sm font-medium text-card-foreground">{c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{caseTypeLabels[c.type]}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  {allocations[c.id] && <p className="text-xs text-success mt-1 font-medium">✓ Assigned</p>}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Judges */}
          <div className="lg:col-span-2 bg-card border rounded-xl p-6">
            {selectedCase ? (
              <>
                <h2 className="text-lg font-display font-semibold text-card-foreground mb-1">
                  Recommended for: <span className="text-accent">{selectedCase.title}</span>
                </h2>
                <p className="text-xs text-muted-foreground mb-4">Type: {caseTypeLabels[selectedCase.type]} · Ranked by specialization & availability</p>

                <div className="space-y-3">
                  {recommended.map((j, i) => {
                    const load = Math.round((j.activeCases / j.maxCases) * 100);
                    const isAllocated = allocations[selectedCase.id] === j.id;
                    return (
                      <motion.div key={j.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`flex items-center gap-4 p-4 rounded-lg border ${isAllocated ? "border-success bg-success/10" : "hover:border-accent/40"} transition-all`}>
                        <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-xs font-bold text-primary-foreground">{j.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-card-foreground text-sm">{j.name}</p>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent-foreground font-medium">{j.score}% match</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">{j.experience}y exp</span>
                            <span className="text-xs text-muted-foreground">{j.activeCases}/{j.maxCases} cases</span>
                            <div className="flex flex-wrap gap-1">
                              {j.specialization.map((s) => (
                                <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded ${s === selectedCase.type ? "bg-accent/20 text-accent-foreground font-medium" : "bg-secondary text-secondary-foreground"}`}>{caseTypeLabels[s]}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAllocate(selectedCase.id, j.id, j.name)}
                          disabled={!!allocations[selectedCase.id]}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            isAllocated
                              ? "bg-success text-success-foreground"
                              : allocations[selectedCase.id]
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "gradient-gold text-accent-foreground hover:opacity-90"
                          }`}
                        >
                          {isAllocated ? "Assigned ✓" : "Assign"}
                        </button>
                      </motion.div>
                    );
                  })}
                  {recommended.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">No available judges found for this case type.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-sm">Select a case to see recommendations</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
