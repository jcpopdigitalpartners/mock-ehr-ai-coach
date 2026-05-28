import React, { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  HeartPulse,
  HelpCircle,
  Hospital,
  Info,
  Layers,
  Lock,
  MessageSquareText,
  Pill,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  UserRound,
  Video,
  X,
} from "lucide-react";

function createTelemetryEvent(type, payload = {}) {
  const now = new Date();
  const fallbackId = `${now.getTime()}-${Math.random().toString(16).slice(2)}`;
  const id =
    typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.randomUUID
      ? globalThis.crypto.randomUUID()
      : fallbackId;

  return {
    id,
    type,
    timestamp: now.toISOString(),
    payload,
  };
}

const patients = [
  {
    id: "P-1048",
    name: "Maya Chen",
    age: 67,
    pronouns: "she/her",
    dob: "1958-04-12",
    mrn: "MRN-802194",
    status: "Blocked",
    risk: "High",
    condition: "Rheumatoid arthritis",
    medication: "Adalimumab",
    payer: "Northstar Medicare Advantage",
    lastTouch: "12 min ago",
    reason: "Prior authorization requires diagnosis evidence and recent TB screening.",
    outcome: "Avoid therapy delay while preserving payer and safety requirements.",
    allergies: ["Penicillin", "Sulfa"],
    vitals: { bp: "132/78", hr: "76", temp: "98.4°F", spo2: "98%" },
    labs: [
      { name: "TB Quantiferon", value: "Pending", range: "Required before biologic start", flag: "warning" },
      { name: "CRP", value: "18 mg/L", range: "< 8 mg/L", flag: "high" },
      { name: "AST", value: "24 U/L", range: "10–40 U/L", flag: "normal" },
    ],
    meds: [
      { name: "Methotrexate", dose: "15 mg weekly", status: "Active" },
      { name: "Folic acid", dose: "1 mg daily", status: "Active" },
      { name: "Adalimumab", dose: "40 mg every 2 weeks", status: "Pending access" },
    ],
    tasks: [
      "Verify diagnosis support in rheumatology note",
      "Check TB screening status",
      "Submit PA packet or request missing evidence",
    ],
  },
  {
    id: "P-1172",
    name: "Owen Patel",
    age: 54,
    pronouns: "he/him",
    dob: "1971-09-30",
    mrn: "MRN-782410",
    status: "Ready",
    risk: "Medium",
    condition: "Type 2 diabetes",
    medication: "Semaglutide",
    payer: "Cascade Commercial",
    lastTouch: "31 min ago",
    reason: "Copay assistance eligibility confirmed. Prescription ready for pharmacist review.",
    outcome: "Move patient to dispense review without adding avoidable friction.",
    allergies: ["None documented"],
    vitals: { bp: "126/74", hr: "72", temp: "98.1°F", spo2: "99%" },
    labs: [
      { name: "A1c", value: "8.2%", range: "< 7.0%", flag: "high" },
      { name: "eGFR", value: "82", range: "> 60", flag: "normal" },
      { name: "ALT", value: "29 U/L", range: "7–56 U/L", flag: "normal" },
    ],
    meds: [
      { name: "Metformin", dose: "1000 mg BID", status: "Active" },
      { name: "Semaglutide", dose: "0.25 mg weekly", status: "Ready for review" },
    ],
    tasks: ["Confirm dose start", "Route to pharmacist", "Send patient pickup instructions"],
  },
  {
    id: "P-1309",
    name: "Elena Garcia",
    age: 72,
    pronouns: "she/her",
    dob: "1953-01-22",
    mrn: "MRN-665201",
    status: "Needs Info",
    risk: "Medium",
    condition: "Heart failure",
    medication: "Sacubitril/valsartan",
    payer: "Evergreen Medicaid",
    lastTouch: "1 hr ago",
    reason: "Coverage pathway depends on updated ejection fraction documentation.",
    outcome: "Prevent avoidable denial by attaching current cardiac evidence.",
    allergies: ["Codeine"],
    vitals: { bp: "118/68", hr: "64", temp: "97.9°F", spo2: "96%" },
    labs: [
      { name: "BNP", value: "421 pg/mL", range: "< 100", flag: "high" },
      { name: "Creatinine", value: "1.1 mg/dL", range: "0.6–1.2", flag: "normal" },
      { name: "Potassium", value: "4.8 mmol/L", range: "3.5–5.1", flag: "normal" },
    ],
    meds: [
      { name: "Carvedilol", dose: "12.5 mg BID", status: "Active" },
      { name: "Furosemide", dose: "20 mg daily", status: "Active" },
      { name: "Sacubitril/valsartan", dose: "24/26 mg BID", status: "Needs evidence" },
    ],
    tasks: ["Find latest echo", "Attach EF documentation", "Request prescriber clarification if absent"],
  },
];

const tabs = ["Overview", "Medications", "Labs", "Orders", "Notes"];

const walkthroughSteps = [
  {
    title: "Start with the blocked case",
    hint: "Choose the item with the highest access risk, not the newest item.",
    rationale: "The operational goal is to prevent therapy delay while protecting compliance requirements.",
  },
  {
    title: "Confirm the workflow state",
    hint: "Blocked means the case needs evidence review before action.",
    rationale: "This prevents premature escalation or submission with an incomplete packet.",
  },
  {
    title: "Read the reason before opening actions",
    hint: "The reason tells you what evidence the payer is waiting on.",
    rationale: "The right next step depends on the blocker, not on the action menu.",
  },
  {
    title: "Verify supporting documentation",
    hint: "Look for diagnosis support and TB screening before submitting PA materials.",
    rationale: "This protects the patient from avoidable denial and rework.",
  },
  {
    title: "Choose the safest next action",
    hint: "Submit only when evidence is complete; otherwise request missing information.",
    rationale: "The learner should connect UI action to clinical and operational outcome.",
  },
];

function Button({ children, className = "", variant = "primary", disabled = false, ...props }) {
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    warning: "bg-amber-100 text-amber-900 border border-amber-200 hover:bg-amber-200",
  };

  const disabledClasses = disabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : "";

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${variants[variant]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

function StatusPill({ status }) {
  const styles = {
    Blocked: "bg-red-50 text-red-700 ring-red-200",
    Ready: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "Needs Info": "bg-amber-50 text-amber-800 ring-amber-200",
  };

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>{status}</span>;
}

function RiskPill({ risk }) {
  const styles = {
    High: "bg-rose-50 text-rose-700 border-rose-200",
    Medium: "bg-yellow-50 text-yellow-800 border-yellow-200",
    Low: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${styles[risk]}`}>{risk}</span>;
}

function Card({ children, className = "" }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

function CardHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div>
          <h3 className="font-semibold text-slate-950">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      {action || null}
    </div>
  );
}

function PatientQueue({ selectedId, onSelect }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={ClipboardList} title="Patient Queue" subtitle="Synthetic medication access cases" />
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search patients, MRN, medication"
          />
        </div>
        <div className="space-y-2">
          {patients.map((patient) => {
            const active = patient.id === selectedId;
            const activeTextClass = active ? "text-emerald-700" : "text-slate-500";
            const buttonClass = active
              ? "border-emerald-300 bg-emerald-50 text-slate-950 shadow-md ring-1 ring-emerald-200"
              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";

            return (
              <button
                key={patient.id}
                type="button"
                onClick={() => onSelect(patient.id)}
                className={`w-full rounded-2xl border p-3 text-left transition ${buttonClass}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{patient.name}</p>
                      <span className={`text-xs ${activeTextClass}`}>{patient.age}</span>
                    </div>
                    <p className={`mt-1 text-xs ${activeTextClass}`}>{patient.medication}</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${active ? "text-emerald-700" : "text-slate-400"}`} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <StatusPill status={patient.status} />
                  <span className={`text-xs ${active ? "text-emerald-700" : "text-slate-400"}`}>{patient.lastTouch}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function PatientBanner({ patient }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
              <UserRound className="h-8 w-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{patient.name}</h1>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-100 ring-1 ring-white/15">
                  {patient.pronouns}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">
                DOB {patient.dob} · {patient.mrn} · {patient.payer}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200">{patient.outcome}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={patient.status} />
            <RiskPill risk={patient.risk} />
          </div>
        </div>
      </div>
      <div className="grid gap-3 border-t border-slate-100 bg-white p-4 sm:grid-cols-4">
        <Metric label="Condition" value={patient.condition} icon={Stethoscope} />
        <Metric label="Medication" value={patient.medication} icon={Pill} />
        <Metric label="Case state" value={patient.status} icon={Activity} />
        <Metric label="Primary outcome" value="Timely, safe access" icon={ShieldCheck} />
      </div>
    </Card>
  );
}

function ChartTabs({ activeTab, onTab }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {tabs.map((tab) => {
        const selected = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTab(tab)}
            className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
              selected ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function Note({ title, meta, text }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h4 className="font-semibold text-slate-950">{title}</h4>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{meta}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function SmallFact({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function Vital({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ChartContent({ patient, activeTab }) {
  if (activeTab === "Medications") {
    return (
      <Card>
        <CardHeader icon={Pill} title="Medication List" subtitle="Current and pending therapies" />
        <div className="divide-y divide-slate-100">
          {patient.meds.map((med) => (
            <div key={med.name} className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold text-slate-950">{med.name}</p>
                <p className="text-sm text-slate-500">{med.dose}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{med.status}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activeTab === "Labs") {
    return (
      <Card>
        <CardHeader icon={HeartPulse} title="Recent Labs" subtitle="Evidence used for clinical and access decisions" />
        <div className="divide-y divide-slate-100">
          {patient.labs.map((lab) => {
            const flagClass =
              lab.flag === "high"
                ? "bg-red-50 text-red-700"
                : lab.flag === "warning"
                  ? "bg-amber-50 text-amber-800"
                  : "bg-emerald-50 text-emerald-700";

            return (
              <div key={lab.name} className="grid gap-3 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <p className="font-semibold text-slate-950">{lab.name}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${flagClass}`}>{lab.value}</span>
                <p className="text-sm text-slate-500">{lab.range}</p>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  if (activeTab === "Orders") {
    return (
      <Card>
        <CardHeader icon={ClipboardList} title="Access Tasks" subtitle="Operational checklist for this case" />
        <div className="space-y-3 p-4">
          {patient.tasks.map((task, index) => (
            <div key={task} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="mt-0.5 rounded-full bg-white p-1 ring-1 ring-slate-200">
                {index === 0 ? (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-slate-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-950">{task}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {index === 0
                    ? "Recommended next step based on current blocker."
                    : "Complete after the required evidence is verified."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activeTab === "Notes") {
    return (
      <Card>
        <CardHeader icon={FileText} title="Clinical Notes" subtitle="Mock evidence excerpts" />
        <div className="space-y-3 p-4">
          <Note
            title="Rheumatology follow-up"
            meta="Dr. L. Morgan · 2026-05-14"
            text="Patient has persistent inflammatory symptoms despite conventional therapy. Biologic start discussed pending payer authorization and safety screening."
          />
          <Note
            title="Access team note"
            meta="Access coordinator · Today"
            text="PA packet not yet submitted. Diagnosis support present. TB screening is pending and must be verified before packet completion."
          />
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader icon={Info} title="Reason Panel" subtitle="Why this case needs attention" />
        <div className="p-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
              <div>
                <p className="font-semibold text-amber-950">Access blocker</p>
                <p className="mt-1 text-sm leading-6 text-amber-900">{patient.reason}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <SmallFact label="Allergies" value={patient.allergies.join(", ")} />
            <SmallFact label="Payer" value={patient.payer} />
            <SmallFact label="Primary med" value={patient.medication} />
            <SmallFact label="Current risk" value={patient.risk} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader icon={Activity} title="Vitals Snapshot" subtitle="Mock clinical status" />
        <div className="grid grid-cols-2 gap-3 p-4">
          <Vital label="BP" value={patient.vitals.bp} />
          <Vital label="HR" value={patient.vitals.hr} />
          <Vital label="Temp" value={patient.vitals.temp} />
          <Vital label="SpO₂" value={patient.vitals.spo2} />
        </div>
      </Card>
    </div>
  );
}

function CoachFinding({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-blue-950">{value}</p>
    </div>
  );
}

function AICoachPanel({ patient, onClose, onTelemetry }) {
  const [assessment, setAssessment] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);

  const assessmentText = useMemo(() => {
    if (patient.status === "Blocked") {
      return {
        gap: "Learner may jump to Submit or Escalate before confirming the payer blocker and clinical evidence.",
        correction: "First verify the reason code and supporting evidence, especially diagnosis support and TB screening.",
        outcome: patient.outcome,
      };
    }

    if (patient.status === "Needs Info") {
      return {
        gap: "Learner may treat this as a generic missing-document issue rather than evidence needed for coverage logic.",
        correction: "Find the exact clinical evidence required by the payer pathway before routing the case.",
        outcome: patient.outcome,
      };
    }

    return {
      gap: "Learner may over-review a case that is already operationally ready.",
      correction: "Confirm readiness, then route to the next accountable reviewer without adding friction.",
      outcome: patient.outcome,
    };
  }, [patient]);

  const generateAssessment = () => {
    setAssessment(true);
    if (onTelemetry) {
      onTelemetry("ai.assessment.generated", {
        patientId: patient.id,
        patientStatus: patient.status,
        risk: patient.risk,
        workflowPhase: "mental_model_assessment",
      });
    }
  };

  const generateWalkthrough = () => {
    setWalkthrough(true);
    if (onTelemetry) {
      onTelemetry("walkthrough.storyboard.generated", {
        patientId: patient.id,
        patientStatus: patient.status,
        risk: patient.risk,
        workflowPhase: "outcome_guided_walkthrough",
        stepCount: walkthroughSteps.length,
      });
    }
  };

  return (
    <Card className="overflow-hidden border-blue-200 shadow-md">
      <div className="border-b border-blue-100 bg-blue-950 p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/15">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Coach</h3>
              <p className="text-sm text-blue-100">Mental model → guided path</p>
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-blue-100 transition hover:bg-white/10 hover:text-white"
              aria-label="Remove AI Coach"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-950">
            <MessageSquareText className="h-4 w-4" />
            Learner prompt
          </div>
          <p className="text-sm leading-6 text-slate-600">
            “I need to resolve this medication access case. I think I should use the action menu and submit it.”
          </p>
        </div>

        <Button className="w-full" onClick={generateAssessment}>
          <Sparkles className="h-4 w-4" />
          Generate Mental Model Assessment
        </Button>

        {assessment ? (
          <div className="space-y-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-blue-950">
              <HelpCircle className="h-4 w-4" />
              Assessment
            </div>
            <CoachFinding label="Likely gap" value={assessmentText.gap} />
            <CoachFinding label="Correction" value={assessmentText.correction} />
            <CoachFinding label="Outcome context" value={assessmentText.outcome} />
            <Button variant="secondary" className="w-full" onClick={generateWalkthrough}>
              <Video className="h-4 w-4" />
              Generate Outcome-Guided Walkthrough
            </Button>
          </div>
        ) : null}

        {walkthrough ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">Video storyboard</p>
                  <p className="mt-1 text-sm text-slate-500">Generated from parsed AI feedback</p>
                </div>
                <PlayCircle className="h-8 w-8 text-slate-900" />
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 text-white">
                <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
                  <div className="text-center">
                    <Video className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-2 text-sm font-semibold">Correct Path Simulation</p>
                    <p className="text-xs text-slate-400">Hints · narration · checkpoints</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {walkthroughSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{step.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{step.hint}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{step.rationale}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function TelemetryPanel({ events, onClear }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        icon={BarChart3}
        title="Telemetry Stream"
        subtitle="Client-side learning events emitted by the mock EHR"
        action={
          <Button variant="ghost" className="px-2.5" onClick={onClear} disabled={events.length === 0}>
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        }
      />

      {events.length === 0 ? (
        <div className="p-4">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No telemetry yet. Select a patient, insert the AI Coach, generate an assessment, or view a chart tab.
          </div>
        </div>
      ) : (
        <div className="max-h-80 divide-y divide-slate-100 overflow-auto">
          {events.map((event) => (
            <div key={event.id} className="grid gap-3 p-4 md:grid-cols-[180px_1fr]">
              <div>
                <p className="font-mono text-xs font-semibold text-slate-950">{event.type}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(event.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
              <pre className="overflow-auto rounded-xl bg-slate-950 p-3 text-xs leading-5 text-slate-100">
                {JSON.stringify(event.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function ComplianceStrip() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Training mode</p>
            <p className="text-xs text-slate-500">All patients, notes, MRNs, and payer details are synthetic.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1">No PHI</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1">Sandbox UI</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1">Audit-friendly workflow</span>
        </div>
      </div>
    </div>
  );
}

function CoachPlaceholder({ onInsert }) {
  return (
    <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-blue-950">Need help interpreting the workflow?</p>
          <p className="mt-1 text-sm text-blue-700">
            Insert the AI Coach here to assess the learner’s mental model in the context of this patient case.
          </p>
        </div>
        <button
          type="button"
          onClick={onInsert}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-200 transition hover:bg-blue-100"
        >
          <Bot className="h-4 w-4" />
          Insert AI Coach
        </button>
      </div>
    </div>
  );
}

export default function MockEHRFrontend() {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [coachInserted, setCoachInserted] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [telemetryEvents, setTelemetryEvents] = useState([]);

  const patient = patients.find((item) => item.id === selectedId) || patients[0];

  const track = useCallback((type, payload = {}) => {
    setTelemetryEvents((currentEvents) => [createTelemetryEvent(type, payload), ...currentEvents].slice(0, 24));
  }, []);

  const insertCoach = useCallback(
    (source) => {
      setCoachInserted(true);
      track("coach.inserted", {
        source,
        patientId: patient.id,
        animationEnabled: animationsEnabled,
      });
    },
    [animationsEnabled, patient.id, track]
  );

  const removeCoach = useCallback(() => {
    setCoachInserted(false);
    track("coach.removed", {
      patientId: patient.id,
      source: "panel_close",
    });
  }, [patient.id, track]);

  const handlePatientSelect = useCallback(
    (patientId) => {
      const nextPatient = patients.find((item) => item.id === patientId);
      setSelectedId(patientId);
      track("patient.selected", {
        patientId,
        status: nextPatient ? nextPatient.status : undefined,
        risk: nextPatient ? nextPatient.risk : undefined,
        medication: nextPatient ? nextPatient.medication : undefined,
      });
    },
    [track]
  );

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      track("chart.tab_viewed", {
        patientId: patient.id,
        tab,
        patientStatus: patient.status,
      });
    },
    [patient.id, patient.status, track]
  );

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((currentValue) => {
      const nextValue = !currentValue;
      track("settings.animation_toggled", { enabled: nextValue });
      return nextValue;
    });
  }, [track]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-950 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-950 p-3 text-white shadow-sm">
              <Hospital className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">CarePath EHR</h1>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                  Mock
                </span>
              </div>
              <p className="text-sm text-slate-500">Medication access training workspace with AI-guided remediation</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">
              <CalendarClock className="h-4 w-4" />
              Today’s queue
            </Button>
            <Button variant="warning">
              <Layers className="h-4 w-4" />
              Simulation mode
            </Button>
            <button
              type="button"
              onClick={() => insertCoach("header_link")}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-blue-700 underline-offset-4 transition hover:bg-blue-50 hover:underline"
            >
              <Bot className="h-4 w-4" />
              Insert AI Coach into workflow
            </button>
            <button
              type="button"
              onClick={toggleAnimations}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition ${
                animationsEnabled
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
              aria-pressed={animationsEnabled}
            >
              <Sparkles className="h-4 w-4" />
              Animation {animationsEnabled ? "on" : "off"}
            </button>
          </div>
        </header>

        <ComplianceStrip />

        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4">
            <PatientQueue selectedId={selectedId} onSelect={handlePatientSelect} />
          </aside>

          <main className="space-y-4">
            <PatientBanner patient={patient} />

            {animationsEnabled ? (
              <AnimatePresence initial={false} mode="popLayout">
                {!coachInserted ? (
                  <motion.div
                    key="coach-placeholder"
                    layout
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <CoachPlaceholder onInsert={() => insertCoach("inline_placeholder")} />
                  </motion.div>
                ) : null}

                {coachInserted ? (
                  <motion.div
                    key="ai-coach-panel"
                    layout
                    initial={{ opacity: 0, y: -18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  >
                    <AICoachPanel patient={patient} onTelemetry={track} onClose={removeCoach} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : (
              <>
                {!coachInserted ? <CoachPlaceholder onInsert={() => insertCoach("inline_placeholder")} /> : null}
                {coachInserted ? <AICoachPanel patient={patient} onTelemetry={track} onClose={removeCoach} /> : null}
              </>
            )}

            <ChartTabs activeTab={activeTab} onTab={handleTabChange} />
            <ChartContent patient={patient} activeTab={activeTab} />
          </main>
        </div>

        <TelemetryPanel events={telemetryEvents} onClear={() => setTelemetryEvents([])} />
      </div>
    </div>
  );
}
