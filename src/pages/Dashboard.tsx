import { Briefcase, Scale, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { cases, judges, caseTypeLabels } from "@/data/mockData";

export default function Dashboard() {
  const openCases = cases.filter((c) => c.status === "open").length;
  const inProgress = cases.filter((c) => ["in-progress", "hearing"].includes(c.status)).length;
  const resolved = cases.filter((c) => c.status === "resolved").length;
  const unassigned = cases.filter((c) => !c.assignedJudge).length;
  const recentCases = [...cases].sort((a, b) => b.filingDate.localeCompare(a.filingDate)).slice(0, 5);
  const availableJudges = judges.filter((j) => j.available);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of legal case management system</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Cases" value={cases.length} icon={Briefcase} description="All registered cases" />
        <StatCard title="Open Cases" value={openCases} icon={Clock} description={`${unassigned} unassigned`} />
        <StatCard title="In Progress" value={inProgress} icon={TrendingUp} description="Active hearings" accent />
        <StatCard title="Resolved" value={resolved} icon={CheckCircle} description="Successfully closed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-card-foreground">Recent Cases</h2>
            <Link to="/cases" className="text-sm text-accent hover:underline font-medium">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentCases.map((c) => (
              <Link key={c.id} to={`/cases/${c.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.caseNumber} · {caseTypeLabels[c.type]}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <PriorityBadge priority={c.priority} />
                  <StatusBadge status={c.status} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Judge Availability */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-card-foreground">Judges</h2>
            <Link to="/judges" className="text-sm text-accent hover:underline font-medium">View all →</Link>
          </div>
          <div className="space-y-3">
            {availableJudges.slice(0, 5).map((j) => (
              <div key={j.id} className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-full gradient-navy flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                  {j.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{j.name}</p>
                  <p className="text-xs text-muted-foreground">{j.activeCases}/{j.maxCases} cases</p>
                </div>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(j.activeCases / j.maxCases) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {unassigned > 0 && (
            <Link to="/allocate" className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              {unassigned} case{unassigned > 1 ? "s" : ""} need assignment
            </Link>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
