const priorityStyles = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export default function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${priorityStyles[priority]}`}>
      {priority}
    </span>
  );
}
