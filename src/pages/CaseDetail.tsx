import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Scale, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { cases, judges, caseTypeLabels } from "@/data/mockData";

export default function CaseDetail() {
  const { id } = useParams();
  const caseData = cases.find((c) => c.id === id);

  if (!caseData) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Case not found.</p>
          <Link to="/cases" className="text-accent hover:underline text-sm mt-2 inline-block">← Back to cases</Link>
        </div>
      </Layout>
    );
  }

  const judge = judges.find((j) => j.id === caseData.assignedJudge);

  return (
    <Layout>
      <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Cases
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-muted-foreground">{caseData.caseNumber}</p>
              <h1 className="text-2xl font-display font-bold text-card-foreground mt-1">{caseData.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{caseTypeLabels[caseData.type]}</span>
                <StatusBadge status={caseData.status} />
                <PriorityBadge priority={caseData.priority} />
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{caseData.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoBlock icon={User} label="Plaintiff" value={caseData.plaintiff} />
            <InfoBlock icon={User} label="Defendant" value={caseData.defendant} />
            <InfoBlock icon={Calendar} label="Filing Date" value={new Date(caseData.filingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
            <InfoBlock icon={Calendar} label="Next Hearing" value={caseData.nextHearing ? new Date(caseData.nextHearing).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not scheduled"} />
          </div>
        </div>

        {/* Judge Info */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-display font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" /> Assigned Judge
          </h2>
          {judge ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-sm font-bold text-primary-foreground">{judge.avatar}</div>
              <div>
                <p className="font-semibold text-card-foreground">{judge.name}</p>
                <p className="text-xs text-muted-foreground">{judge.experience} years experience · {judge.activeCases} active cases</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
              <p className="text-sm text-destructive font-medium">No judge assigned to this case</p>
              <Link to="/allocate" className="text-sm text-accent hover:underline font-medium">Assign now →</Link>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}

function InfoBlock({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
