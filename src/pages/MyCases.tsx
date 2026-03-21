import { motion } from "framer-motion";
import { Clock, Calendar, FileText, Scale, CheckCircle, AlertCircle, ArrowRight, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { useAuth } from "@/context/AuthContext";
import { cases, judges, caseTypeLabels, CaseStatus } from "@/data/mockData";
import { Link } from "react-router-dom";

const timelineEvents: Record<string, { date: string; event: string; detail: string }[]> = {
  c1: [
    { date: "2025-01-15", event: "Case Filed", detail: "Complaint registered at Maharashtra High Court" },
    { date: "2025-02-01", event: "Judge Assigned", detail: "Allocated to Hon. Justice Gupta" },
    { date: "2025-02-20", event: "First Hearing", detail: "Arguments from both sides heard" },
    { date: "2025-04-10", event: "Next Hearing", detail: "Scheduled for cross-examination" },
  ],
  c2: [
    { date: "2025-02-03", event: "Case Filed", detail: "Petition filed at Family Court Delhi" },
    { date: "2025-02-10", event: "Judge Assigned", detail: "Allocated to Hon. Justice Reddy" },
    { date: "2025-03-15", event: "Mediation Attempt", detail: "Court-ordered mediation session" },
    { date: "2025-03-28", event: "Next Hearing", detail: "Custody arguments scheduled" },
  ],
  c3: [
    { date: "2024-11-20", event: "Case Filed", detail: "FIR lodged and chargesheet filed" },
    { date: "2024-12-05", event: "Judge Assigned", detail: "Allocated to Hon. Justice Patel" },
    { date: "2025-01-10", event: "Bail Hearing", detail: "Bail denied by the court" },
    { date: "2025-02-15", event: "Evidence Presented", detail: "Prosecution submitted financial records" },
    { date: "2025-03-25", event: "Next Hearing", detail: "Defense witness examination" },
  ],
  c6: [
    { date: "2025-01-25", event: "PIL Filed", detail: "Public Interest Litigation submitted" },
    { date: "2025-02-05", event: "Admitted", detail: "Court admitted the PIL for hearing" },
    { date: "2025-03-01", event: "Judge Assigned", detail: "Allocated to Hon. Justice Singh" },
    { date: "2025-04-15", event: "Next Hearing", detail: "Government response expected" },
  ],
};

const statusTimeline: Record<CaseStatus, number> = {
  open: 1,
  "in-progress": 2,
  hearing: 3,
  resolved: 4,
  dismissed: 4,
};

const steps = ["Filed", "In Progress", "Hearing", "Resolved"];

export default function MyCases() {
  const { user } = useAuth();
  
  // For demo, show cases with assigned judges as "user's cases"
  const userCases = user?.role === "admin" ? cases : cases.filter((c) => c.assignedJudge);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">My Cases</h1>
        <p className="text-muted-foreground mt-1">
          {user?.role === "admin" ? "Full case overview with transparent tracking" : "Track your case progress in real-time"}
        </p>
      </div>

      <div className="space-y-6">
        {userCases.map((c, idx) => {
          const judge = judges.find((j) => j.id === c.assignedJudge);
          const events = timelineEvents[c.id] || [];
          const progress = statusTimeline[c.status];

          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="bg-card border rounded-2xl overflow-hidden">
              {/* Case Header */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{c.caseNumber}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{caseTypeLabels[c.type]}</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-card-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.plaintiff} <span className="text-accent">vs</span> {c.defendant}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PriorityBadge priority={c.priority} />
                    <StatusBadge status={c.status} />
                    <Link to={`/cases/${c.id}`} className="flex items-center gap-1 text-sm text-accent font-medium hover:underline">
                      <Eye className="w-4 h-4" /> Details
                    </Link>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i < progress ? "gradient-gold text-accent-foreground" : i === progress && c.status === "dismissed" ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground"
                        }`}>
                          {i < progress ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        <span className={`text-xs hidden sm:block ${i < progress ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(progress / 4) * 100}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} className={`h-full rounded-full ${c.status === "dismissed" ? "bg-destructive" : "gradient-gold"}`} />
                  </div>
                </div>
              </div>

              {/* Info Row */}
              <div className="px-6 py-3 bg-muted/30 flex flex-wrap gap-4 text-xs">
                {judge && (
                  <div className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-accent" />
                    <span className="text-muted-foreground">Judge:</span>
                    <span className="font-medium text-card-foreground">{judge.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">Filed:</span>
                  <span className="font-medium text-card-foreground">{new Date(c.filingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                {c.nextHearing && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-warning" />
                    <span className="text-muted-foreground">Next Hearing:</span>
                    <span className="font-medium text-card-foreground">{new Date(c.nextHearing).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {events.length > 0 && (
                <div className="p-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Case Timeline</p>
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
                    {events.map((ev, i) => {
                      const isPast = new Date(ev.date) <= new Date();
                      return (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 + i * 0.08 }} className="relative mb-4 last:mb-0">
                          <div className={`absolute -left-4 top-1 w-4 h-4 rounded-full border-2 ${isPast ? "bg-gold border-gold" : "bg-card border-muted-foreground/30"}`} />
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                              {!isPast && <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/15 text-warning font-medium">Upcoming</span>}
                            </div>
                            <p className="text-sm font-semibold text-card-foreground">{ev.event}</p>
                            <p className="text-xs text-muted-foreground">{ev.detail}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}
