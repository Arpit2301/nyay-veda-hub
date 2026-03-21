export type CaseStatus = "open" | "in-progress" | "hearing" | "resolved" | "dismissed";
export type CaseType = "civil" | "criminal" | "family" | "corporate" | "constitutional" | "labor";

export interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  type: CaseType;
  status: CaseStatus;
  filingDate: string;
  nextHearing?: string;
  description: string;
  plaintiff: string;
  defendant: string;
  assignedJudge?: string;
  priority: "high" | "medium" | "low";
}

export interface Judge {
  id: string;
  name: string;
  specialization: CaseType[];
  activeCases: number;
  maxCases: number;
  available: boolean;
  experience: number;
  avatar: string;
}

export const judges: Judge[] = [
  { id: "j1", name: "Hon. Justice Sharma", specialization: ["civil", "constitutional"], activeCases: 12, maxCases: 20, available: true, experience: 22, avatar: "JS" },
  { id: "j2", name: "Hon. Justice Patel", specialization: ["criminal", "labor"], activeCases: 18, maxCases: 20, available: true, experience: 15, avatar: "JP" },
  { id: "j3", name: "Hon. Justice Reddy", specialization: ["family", "civil"], activeCases: 8, maxCases: 15, available: true, experience: 18, avatar: "JR" },
  { id: "j4", name: "Hon. Justice Gupta", specialization: ["corporate", "civil"], activeCases: 14, maxCases: 15, available: false, experience: 25, avatar: "JG" },
  { id: "j5", name: "Hon. Justice Singh", specialization: ["criminal", "constitutional"], activeCases: 10, maxCases: 20, available: true, experience: 12, avatar: "AS" },
  { id: "j6", name: "Hon. Justice Verma", specialization: ["family", "labor"], activeCases: 6, maxCases: 15, available: true, experience: 20, avatar: "VV" },
];

export const cases: LegalCase[] = [
  { id: "c1", caseNumber: "NV-2025-001", title: "State vs. Mehta Industries", type: "corporate", status: "open", filingDate: "2025-01-15", nextHearing: "2025-04-10", description: "Corporate fraud allegations involving falsified financial statements and insider trading.", plaintiff: "State of Maharashtra", defendant: "Mehta Industries Pvt. Ltd.", assignedJudge: "j4", priority: "high" },
  { id: "c2", caseNumber: "NV-2025-002", title: "Kumar vs. Kumar", type: "family", status: "in-progress", filingDate: "2025-02-03", nextHearing: "2025-03-28", description: "Divorce proceedings with child custody dispute.", plaintiff: "Anita Kumar", defendant: "Rajesh Kumar", assignedJudge: "j3", priority: "medium" },
  { id: "c3", caseNumber: "NV-2025-003", title: "State vs. Rajan", type: "criminal", status: "hearing", filingDate: "2024-11-20", nextHearing: "2025-03-25", description: "Charges of embezzlement from public funds.", plaintiff: "State of Delhi", defendant: "Vikram Rajan", assignedJudge: "j2", priority: "high" },
  { id: "c4", caseNumber: "NV-2025-004", title: "Workers Union vs. TechCorp", type: "labor", status: "open", filingDate: "2025-03-01", description: "Unfair labor practices and wage theft allegations.", plaintiff: "National Workers Union", defendant: "TechCorp India Ltd.", priority: "medium" },
  { id: "c5", caseNumber: "NV-2025-005", title: "Sharma vs. Municipal Corp", type: "civil", status: "resolved", filingDate: "2024-08-10", description: "Property dispute regarding land acquisition by municipal corporation.", plaintiff: "Ramesh Sharma", defendant: "Delhi Municipal Corporation", assignedJudge: "j1", priority: "low" },
  { id: "c6", caseNumber: "NV-2025-006", title: "Citizens Forum vs. State", type: "constitutional", status: "in-progress", filingDate: "2025-01-25", nextHearing: "2025-04-15", description: "PIL challenging constitutionality of recent data privacy amendments.", plaintiff: "Citizens Digital Forum", defendant: "State of India", assignedJudge: "j5", priority: "high" },
  { id: "c7", caseNumber: "NV-2025-007", title: "Desai vs. Desai", type: "family", status: "open", filingDate: "2025-03-10", description: "Inheritance dispute over ancestral property.", plaintiff: "Meera Desai", defendant: "Arun Desai", priority: "medium" },
  { id: "c8", caseNumber: "NV-2025-008", title: "State vs. Logistics Co.", type: "criminal", status: "dismissed", filingDate: "2024-06-15", description: "Smuggling charges dismissed due to insufficient evidence.", plaintiff: "State of Gujarat", defendant: "FastTrack Logistics", assignedJudge: "j2", priority: "low" },
];

export const caseTypeLabels: Record<CaseType, string> = {
  civil: "Civil",
  criminal: "Criminal",
  family: "Family",
  corporate: "Corporate",
  constitutional: "Constitutional",
  labor: "Labor",
};

export const statusLabels: Record<CaseStatus, string> = {
  open: "Open",
  "in-progress": "In Progress",
  hearing: "Hearing",
  resolved: "Resolved",
  dismissed: "Dismissed",
};
