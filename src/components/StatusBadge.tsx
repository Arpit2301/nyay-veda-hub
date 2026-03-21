import { CaseStatus, statusLabels } from "@/data/mockData";

const statusStyles: Record<CaseStatus, string> = {
  open: "bg-info/15 text-info border-info/30",
  "in-progress": "bg-warning/15 text-warning border-warning/30",
  hearing: "bg-accent/15 text-accent-foreground border-accent/30",
  resolved: "bg-success/15 text-success border-success/30",
  dismissed: "bg-muted text-muted-foreground border-border",
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
