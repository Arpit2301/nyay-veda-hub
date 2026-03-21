import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { cases, caseTypeLabels, statusLabels, judges, CaseType, CaseStatus } from "@/data/mockData";

export default function CaseList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CaseType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<CaseStatus | "all">("all");

  const filtered = cases.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.caseNumber.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || c.type === typeFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Cases</h1>
        <p className="text-muted-foreground mt-1">Browse and manage all legal cases</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-card text-card-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as CaseType | "all")}
          className="px-4 py-2.5 rounded-lg border bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Types</option>
          {Object.entries(caseTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CaseStatus | "all")}
          className="px-4 py-2.5 rounded-lg border bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Case Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c, i) => {
          const judge = judges.find((j) => j.id === c.assignedJudge);
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/cases/${c.id}`} className="block bg-card border rounded-xl p-5 hover:shadow-md hover:border-accent/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{c.caseNumber}</p>
                    <h3 className="text-sm font-semibold text-card-foreground mt-0.5">{c.title}</h3>
                  </div>
                  <PriorityBadge priority={c.priority} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{caseTypeLabels[c.type]}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  {judge ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full gradient-navy flex items-center justify-center text-[9px] font-bold text-primary-foreground">{judge.avatar}</div>
                      <span className="text-xs text-muted-foreground">{judge.name.split(" ").pop()}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-destructive font-medium">Unassigned</span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Filter className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No cases match your filters</p>
        </div>
      )}
    </Layout>
  );
}
