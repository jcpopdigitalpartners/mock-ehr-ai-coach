import React, { useCallback, useId, useMemo, useState } from "react";
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
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";

const styles = `
  :root {
    --bg: #f1f5f9;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #64748b;
    --muted-2: #94a3b8;
    --border: #e2e8f0;
    --border-soft: #f1f5f9;
    --slate-950: #020617;
    --slate-900: #0f172a;
    --blue-950: #172554;
    --blue-700: #1d4ed8;
    --blue-100: #dbeafe;
    --blue-50: #eff6ff;
    --emerald-700: #047857;
    --emerald-300: #6ee7b7;
    --emerald-200: #a7f3d0;
    --emerald-100: #d1fae5;
    --emerald-50: #ecfdf5;
    --amber-950: #451a03;
    --amber-900: #78350f;
    --amber-800: #92400e;
    --amber-700: #b45309;
    --amber-600: #d97706;
    --amber-200: #fde68a;
    --amber-100: #fef3c7;
    --amber-50: #fffbeb;
    --red-700: #b91c1c;
    --red-50: #fef2f2;
    --rose-700: #be123c;
    --rose-200: #fecdd3;
    --rose-50: #fff1f2;
    --yellow-800: #854d0e;
    --yellow-200: #fef08a;
    --yellow-50: #fefce8;
    --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
    --shadow-md: 0 8px 22px rgba(15, 23, 42, 0.10);
  }

  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
  button, input { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: 0.55; }

  .app-shell { min-height: 100vh; background: var(--bg); padding: 24px; color: var(--text); }
  .app-container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
  .app-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-icon { background: var(--slate-950); color: white; padding: 12px; border-radius: 18px; box-shadow: var(--shadow-sm); display: grid; place-items: center; }
  .brand-title-row { display: flex; align-items: center; gap: 8px; }
  .brand h1 { margin: 0; font-size: 26px; letter-spacing: -0.03em; }
  .brand p { margin: 3px 0 0; color: var(--muted); font-size: 14px; }
  .badge { display: inline-flex; align-items: center; border: 1px solid var(--border); background: white; color: var(--muted); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
  .header-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .layout { display: grid; grid-template-columns: 300px 1fr; gap: 16px; align-items: start; }
  .main-column, .sidebar-column { display: flex; flex-direction: column; gap: 16px; }

  .card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; box-shadow: var(--shadow-sm); overflow: hidden; }
  .card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px; border-bottom: 1px solid var(--border-soft); }
  .card-title-wrap { display: flex; align-items: flex-start; gap: 12px; }
  .card-icon { display: grid; place-items: center; border-radius: 12px; background: #f1f5f9; color: #334155; padding: 8px; }
  .card h3 { margin: 0; font-size: 16px; }
  .card-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; padding: 9px 14px; border: 0; font-size: 14px; font-weight: 700; transition: 150ms ease; }
  .btn-primary { background: var(--slate-950); color: white; }
  .btn-primary:hover { background: #1e293b; }
  .btn-secondary { background: white; color: var(--text); border: 1px solid var(--border); }
  .btn-secondary:hover { background: #f8fafc; }
  .btn-ghost { background: transparent; color: #334155; }
  .btn-ghost:hover { background: #f1f5f9; }
  .btn-warning { background: var(--amber-100); color: var(--amber-900); border: 1px solid var(--amber-200); }
  .btn-warning:hover { background: #fde68a; }
  .btn-full { width: 100%; }
  .link-button { background: transparent; border: 0; color: var(--blue-700); display: inline-flex; align-items: center; gap: 8px; border-radius: 12px; padding: 9px 14px; font-size: 14px; font-weight: 800; }
  .link-button:hover { background: var(--blue-50); text-decoration: underline; text-underline-offset: 4px; }
  .toggle-button { display: inline-flex; align-items: center; gap: 8px; border-radius: 12px; padding: 9px 14px; font-size: 14px; font-weight: 800; border: 1px solid var(--border); background: white; color: var(--muted); }
  .toggle-button.on { border-color: var(--emerald-200); background: var(--emerald-50); color: var(--emerald-700); }

  .training-strip { border: 1px solid var(--border); background: white; border-radius: 18px; padding: 12px; box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .training-main { display: flex; gap: 12px; align-items: center; }
  .training-icon { border-radius: 12px; background: var(--emerald-50); color: var(--emerald-700); padding: 8px; display: grid; place-items: center; }
  .training-strip p { margin: 0; }
  .training-title { font-size: 14px; font-weight: 800; }
  .training-copy { color: var(--muted); font-size: 12px; margin-top: 3px !important; }
  .chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .chip { background: #f1f5f9; color: var(--muted); border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 700; }

  .queue-body { padding: 12px; }
  .search-box { display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); background: #f8fafc; border-radius: 12px; padding: 9px 12px; margin-bottom: 12px; }
  .search-box input { width: 100%; border: 0; outline: 0; background: transparent; font-size: 14px; color: var(--text); }
  .search-box svg { color: var(--muted-2); }
  .queue-list { display: flex; flex-direction: column; gap: 8px; }
  .patient-button { width: 100%; text-align: left; border: 1px solid var(--border); background: white; border-radius: 18px; padding: 12px; transition: 150ms ease; color: var(--text); }
  .patient-button.queue-blocked { background: var(--red-50); border-color: #fecaca; }
  .patient-button.queue-ready { background: var(--emerald-50); border-color: var(--emerald-200); }
  .patient-button.queue-needs-info { background: var(--amber-50); border-color: var(--amber-200); }
  .patient-button:hover { filter: saturate(1.08); box-shadow: var(--shadow-sm); }
  .patient-button.selected { box-shadow: var(--shadow-md); outline: 1px solid currentColor; }
  .patient-button.queue-blocked.selected { color: var(--red-700); }
  .patient-button.queue-ready.selected { color: var(--emerald-700); }
  .patient-button.queue-needs-info.selected { color: var(--amber-800); }
  .patient-top { display: flex; justify-content: space-between; gap: 8px; align-items: flex-start; }
  .patient-name-row { display: flex; align-items: center; gap: 8px; }
  .patient-name { font-weight: 800; }
  .patient-age, .patient-med, .patient-time { color: var(--muted); font-size: 12px; }
  .patient-button.selected .patient-age, .patient-button.selected .patient-med, .patient-button.selected .patient-time, .patient-button.selected .chevron { color: currentColor; }
  .patient-med { margin-top: 4px; }
  .patient-bottom { margin-top: 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  .chevron { color: var(--muted-2); }

  .status-pill, .risk-pill { display: inline-flex; align-items: center; border-radius: 999px; font-size: 12px; font-weight: 800; white-space: nowrap; }
  .status-pill { padding: 5px 10px; border: 1px solid transparent; }
  .status-blocked { background: var(--red-50); color: var(--red-700); border-color: #fecaca; }
  .status-ready { background: var(--emerald-50); color: var(--emerald-700); border-color: var(--emerald-200); }
  .status-needs-info { background: var(--amber-50); color: var(--amber-800); border-color: var(--amber-200); }
  .risk-pill { padding: 3px 9px; border: 1px solid var(--border); }
  .risk-high { background: var(--rose-50); color: var(--rose-700); border-color: var(--rose-200); }
  .risk-medium { background: var(--yellow-50); color: var(--yellow-800); border-color: var(--yellow-200); }
  .risk-low { background: #f8fafc; color: var(--muted); border-color: var(--border); }

  .patient-banner { border-radius: 20px; overflow: hidden; background: white; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
  .banner-hero { background: linear-gradient(90deg, #020617, #0f172a, #1e293b); color: white; padding: 20px; }
  .banner-row { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .patient-identity { display: flex; gap: 16px; align-items: flex-start; }
  .identity-icon { border-radius: 18px; background: rgba(255,255,255,0.10); color: white; padding: 12px; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); display: grid; place-items: center; }
  .banner-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .banner-name-row h2 { margin: 0; font-size: 25px; letter-spacing: -0.02em; }
  .pronoun { border-radius: 999px; background: rgba(255,255,255,0.10); color: #f1f5f9; padding: 5px 10px; font-size: 12px; font-weight: 700; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); }
  .banner-meta { margin: 4px 0 0; color: #cbd5e1; font-size: 14px; }
  .banner-outcome { margin: 12px 0 0; max-width: 760px; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
  .banner-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px; border-top: 1px solid var(--border-soft); }
  .metric { background: #f8fafc; border: 1px solid var(--border); border-radius: 18px; padding: 12px; }
  .metric-label { display: flex; align-items: center; gap: 8px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; font-weight: 800; }
  .metric-value { margin: 8px 0 0; font-size: 14px; font-weight: 800; color: var(--text); }

  .coach-card { border-color: #bfdbfe; box-shadow: var(--shadow-md); font-size: 12px; }
  .coach-sidecar { position: fixed; top: 24px; right: 24px; bottom: 24px; z-index: 20; width: min(420px, calc(100vw - 32px)); display: flex; flex-direction: column; gap: 12px; overflow: auto; }
  .coach-sidecar .coach-card { flex: 0 0 auto; }
  .coach-header { background: var(--blue-950); color: white; padding: 16px; border-bottom: 1px solid var(--blue-100); }
  .coach-header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .coach-title-wrap { display: flex; align-items: center; gap: 12px; }
  .coach-icon { background: rgba(255,255,255,0.10); border-radius: 16px; padding: 8px; display: grid; place-items: center; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); }
  .coach-header h3 { margin: 0; font-size: 15px; }
  .coach-header p { margin: 4px 0 0; color: var(--blue-100); font-size: 12px; }
  .close-button { border: 0; background: transparent; color: var(--blue-100); border-radius: 12px; padding: 8px; display: grid; place-items: center; }
  .close-button:hover { background: rgba(255,255,255,0.10); color: white; }
  .coach-body { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
  .prompt-card { background: #f8fafc; border: 1px solid var(--border); border-radius: 18px; padding: 16px; }
  .prompt-title { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 12px; margin-bottom: 8px; }
  .prompt-card p { margin: 0; color: #475569; font-size: 12px; line-height: 1.6; }
  .assessment-card { display: flex; flex-direction: column; gap: 12px; border: 1px solid #bfdbfe; background: var(--blue-50); border-radius: 18px; padding: 16px; }
  .assessment-card.collapsed { padding: 12px 14px; gap: 4px; }
  .assessment-title { color: var(--blue-950); display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 13px; }
  .assessment-collapsed-copy { margin: 0; color: var(--blue-700); font-size: 12px; }
  .finding-label { color: #3b82f6; text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; font-weight: 900; margin: 0; }
  .finding-value { color: var(--blue-950); font-size: 12px; line-height: 1.6; margin: 4px 0 0; }
  .guidance-callout { border: 1px solid #bfdbfe; background: #eff6ff; color: var(--blue-950); border-radius: 18px; padding: 12px 14px; display: flex; gap: 10px; align-items: flex-start; box-shadow: var(--shadow-sm); }
  .guidance-callout p { margin: 0; }
  .guidance-title { font-size: 13px; font-weight: 900; }
  .guidance-copy { color: var(--blue-700); font-size: 12px; line-height: 1.5; margin-top: 3px !important; }
  .guidance-highlight { position: relative; z-index: 1; outline: 3px solid #3b82f6 !important; outline-offset: 3px; box-shadow: 0 0 0 7px rgba(59, 130, 246, 0.16), var(--shadow-md) !important; }
  .guidance-list { display: flex; flex-direction: column; gap: 8px; }
  .guidance-step { width: 100%; text-align: left; border: 1px solid var(--border); background: white; border-radius: 18px; padding: 12px; transition: border-color 150ms ease, box-shadow 150ms ease, background 150ms ease; color: var(--text); }
  .guidance-step:hover { border-color: #bfdbfe; background: #f8fbff; }
  .guidance-step.active { border-color: #93c5fd; box-shadow: 0 0 0 1px #bfdbfe; background: #f8fbff; }
  .guidance-step-row { display: flex; align-items: flex-start; gap: 12px; }
  .guidance-step-index { width: 28px; height: 28px; flex: 0 0 28px; border-radius: 999px; background: var(--slate-950); color: white; display: grid; place-items: center; font-size: 11px; font-weight: 900; }
  .guidance-step-title { margin: 0; font-weight: 900; font-size: 13px; }
  .guidance-step-hint { margin: 4px 0 0; color: #475569; font-size: 12px; line-height: 1.5; }
  .guidance-step-rationale { margin: 8px 0 0; color: var(--muted-2); font-size: 11px; line-height: 1.5; }
  .tabs { display: flex; flex-wrap: wrap; gap: 8px; background: white; border: 1px solid var(--border); border-radius: 18px; padding: 8px; box-shadow: var(--shadow-sm); }
  .tab { border: 0; background: transparent; color: #475569; padding: 9px 12px; border-radius: 12px; font-size: 14px; font-weight: 800; }
  .tab:hover { background: #f1f5f9; color: var(--text); }
  .tab.active { background: var(--slate-950); color: white; }
  .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .panel-body { padding: 16px; }
  .reason-box { border: 1px solid var(--amber-200); background: var(--amber-50); border-radius: 18px; padding: 16px; }
  .reason-row { display: flex; align-items: flex-start; gap: 12px; }
  .reason-row svg { color: var(--amber-700); flex: 0 0 auto; }
  .reason-title { margin: 0; font-weight: 900; color: var(--amber-950); }
  .reason-copy { color: var(--amber-900); font-size: 14px; line-height: 1.6; margin: 4px 0 0; }
  .facts-grid { margin-top: 16px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .fact { border: 1px solid var(--border); background: white; border-radius: 14px; padding: 12px; }
  .fact-label { margin: 0; color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; font-weight: 900; }
  .fact-value { margin: 4px 0 0; font-size: 14px; font-weight: 800; color: var(--text); }
  .vitals-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 16px; }
  .vital { background: #f8fafc; border: 1px solid var(--border); border-radius: 18px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .vital-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .vital-label { margin: 0; color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; font-weight: 900; }
  .vital-value { margin: 6px 0 0; font-size: 22px; font-weight: 900; line-height: 1; }
  .vital-range { margin: 4px 0 0; color: var(--muted); font-size: 12px; font-weight: 700; }
  .vital-trend-badge { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 800; white-space: nowrap; }
  .vital-trend-badge.worsening { background: var(--red-50); color: var(--red-700); border: 1px solid #fecaca; }
  .vital-trend-badge.improving { background: var(--emerald-50); color: var(--emerald-700); border: 1px solid var(--emerald-200); }
  .vital-trend-badge.stable { background: #f1f5f9; color: var(--muted); border: 1px solid var(--border); }
  .vital-trend-badge.pending { background: var(--amber-50); color: var(--amber-800); border: 1px solid var(--amber-200); }
  .vital-chart { height: 52px; min-height: 52px; flex-shrink: 0; width: 100%; position: relative; }
  .vital-chart.pending { display: grid; place-items: center; border: 1px dashed var(--border); border-radius: 12px; background: #f8fafc; color: var(--muted-2); font-size: 10px; font-weight: 800; min-height: 52px; }
  .vital-chart svg { display: block; width: 100%; height: 52px; overflow: visible; }
  .vital-chart-caption { display: flex; justify-content: space-between; color: var(--muted-2); font-size: 10px; font-weight: 700; letter-spacing: 0.02em; }
  .lab-trend-line { height: 58px; min-height: 58px; width: 100%; border-radius: 12px; background: white; border: 1px solid var(--border-soft); overflow: hidden; }
  .lab-trend-line svg { display: block; width: 100%; height: 58px; }
  .list { display: flex; flex-direction: column; }
  .list-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-top: 1px solid var(--border-soft); }
  .list-row:first-child { border-top: 0; }
  .list-title { margin: 0; font-weight: 900; }
  .list-copy { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
  .soft-pill { background: #f1f5f9; color: #334155; border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 800; white-space: nowrap; }
  .lab-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; padding: 16px; border-top: 1px solid var(--border-soft); }
  .lab-row:first-child { border-top: 0; }
  .lab-value { border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 900; }
  .lab-high { background: var(--red-50); color: var(--red-700); }
  .lab-warning { background: var(--amber-50); color: var(--amber-800); }
  .lab-normal { background: var(--emerald-50); color: var(--emerald-700); }
  .task-list, .notes-list { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .task-card { display: flex; align-items: flex-start; gap: 12px; border: 1px solid var(--border); background: #f8fafc; border-radius: 18px; padding: 12px; }
  .task-icon { background: white; border-radius: 999px; padding: 4px; display: grid; place-items: center; box-shadow: inset 0 0 0 1px var(--border); }
  .note { border: 1px solid var(--border); background: #f8fafc; border-radius: 18px; padding: 16px; }
  .note h4 { margin: 0; }
  .note-meta { color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; font-weight: 900; margin: 4px 0 0; }
  .note-text { color: #475569; line-height: 1.6; font-size: 14px; margin: 12px 0 0; }

  .telemetry-empty { margin: 16px; border: 1px dashed var(--border); background: #f8fafc; border-radius: 18px; padding: 16px; color: var(--muted); font-size: 14px; }
  .telemetry-list { max-height: 320px; overflow: auto; }
  .telemetry-event { display: grid; grid-template-columns: 180px 1fr; gap: 12px; padding: 16px; border-top: 1px solid var(--border-soft); }
  .telemetry-event:first-child { border-top: 0; }
  .event-type { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; font-weight: 900; }
  .event-time { margin: 4px 0 0; color: var(--muted-2); font-size: 12px; }
  .event-json { margin: 0; overflow: auto; background: var(--slate-950); color: #f1f5f9; border-radius: 12px; padding: 12px; font-size: 12px; line-height: 1.5; }

  @media (max-width: 1024px) {
    .layout { grid-template-columns: 1fr; }
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .content-grid { grid-template-columns: 1fr; }
    .coach-sidecar { top: auto; left: 16px; right: 16px; bottom: 16px; width: auto; max-height: calc(100vh - 32px); }
  }

  @media (max-width: 640px) {
    .app-shell { padding: 16px; }
    .metrics-grid, .facts-grid, .vitals-grid { grid-template-columns: 1fr; }
    .lab-row, .telemetry-event { grid-template-columns: 1fr; }
    .list-row { align-items: flex-start; flex-direction: column; }
  }
`;

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
    vitalHistory: {
      bp: [118, 121, 124, 126, 128, 130, 132],
      hr: [68, 69, 71, 72, 73, 75, 76],
      temp: [98.0, 98.1, 98.1, 98.2, 98.3, 98.3, 98.4],
      spo2: [99, 99, 98, 98, 98, 98, 98],
    },
    labs: [
      {
        name: "TB Quantiferon",
        value: "Pending",
        range: "Required before biologic start",
        flag: "warning",
        pending: true,
      },
      {
        name: "CRP",
        value: "18 mg/L",
        range: "< 8 mg/L",
        flag: "high",
        history: [8, 10, 11, 13, 14, 16, 18],
        worse: "up",
        unit: "mg/L",
        stableThreshold: 1,
      },
      {
        name: "AST",
        value: "24 U/L",
        range: "10–40 U/L",
        flag: "normal",
        history: [22, 23, 23, 24, 24, 24, 24],
        worse: "up",
        unit: "U/L",
        stableThreshold: 2,
      },
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
    notes: [
      {
        title: "Rheumatology follow-up",
        meta: "Dr. L. Morgan · 2026-05-14",
        text: "Patient has persistent inflammatory symptoms despite conventional therapy. Biologic start discussed pending payer authorization and safety screening.",
      },
      {
        title: "Access team note",
        meta: "Access coordinator · Today",
        text: "PA packet not yet submitted. Diagnosis support present. TB screening is pending and must be verified before packet completion.",
      },
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
    vitalHistory: {
      bp: [134, 132, 130, 129, 128, 127, 126],
      hr: [74, 73, 73, 72, 72, 72, 72],
      temp: [98.3, 98.2, 98.2, 98.1, 98.1, 98.1, 98.1],
      spo2: [98, 98, 99, 99, 99, 99, 99],
    },
    labs: [
      {
        name: "A1c",
        value: "8.2%",
        range: "< 7.0%",
        flag: "high",
        history: [9.1, 8.9, 8.7, 8.5, 8.4, 8.3, 8.2],
        worse: "up",
        unit: "%",
        stableThreshold: 0.2,
      },
      {
        name: "eGFR",
        value: "82",
        range: "> 60",
        flag: "normal",
        history: [84, 83, 83, 82, 82, 82, 82],
        worse: "down",
        unit: "mL/min",
        stableThreshold: 2,
      },
      {
        name: "ALT",
        value: "29 U/L",
        range: "7–56 U/L",
        flag: "normal",
        history: [30, 29, 29, 29, 29, 29, 29],
        worse: "up",
        unit: "U/L",
        stableThreshold: 2,
      },
    ],
    meds: [
      { name: "Metformin", dose: "1000 mg BID", status: "Active" },
      { name: "Semaglutide", dose: "0.25 mg weekly", status: "Ready for review" },
    ],
    tasks: ["Confirm dose start", "Route to pharmacist", "Send patient pickup instructions"],
    notes: [
      {
        title: "Endocrinology medication plan",
        meta: "Dr. A. Ruiz · 2026-05-21",
        text: "Semaglutide initiation approved after counseling on dose ramp, nausea precautions, and glucose monitoring. No renal contraindication documented.",
      },
      {
        title: "Access team note",
        meta: "Access coordinator · Today",
        text: "Copay assistance eligibility confirmed. Route prescription to pharmacist review and prepare pickup instructions without additional payer escalation.",
      },
    ],
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
    vitalHistory: {
      bp: [120, 119, 119, 118, 118, 118, 118],
      hr: [58, 59, 60, 61, 62, 63, 64],
      temp: [98.0, 98.0, 97.9, 97.9, 97.9, 97.9, 97.9],
      spo2: [98, 98, 97, 97, 96, 96, 96],
    },
    labs: [
      {
        name: "BNP",
        value: "421 pg/mL",
        range: "< 100",
        flag: "high",
        history: [280, 310, 340, 370, 390, 410, 421],
        worse: "up",
        unit: "pg/mL",
        stableThreshold: 15,
      },
      {
        name: "Creatinine",
        value: "1.1 mg/dL",
        range: "0.6–1.2",
        flag: "normal",
        history: [1.0, 1.0, 1.0, 1.05, 1.08, 1.1, 1.1],
        worse: "up",
        unit: "mg/dL",
        stableThreshold: 0.05,
      },
      {
        name: "Potassium",
        value: "4.8 mmol/L",
        range: "3.5–5.1",
        flag: "normal",
        history: [4.6, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8],
        worse: "up",
        unit: "mmol/L",
        stableThreshold: 0.2,
      },
    ],
    meds: [
      { name: "Carvedilol", dose: "12.5 mg BID", status: "Active" },
      { name: "Furosemide", dose: "20 mg daily", status: "Active" },
      { name: "Sacubitril/valsartan", dose: "24/26 mg BID", status: "Needs evidence" },
    ],
    tasks: ["Find latest echo", "Attach EF documentation", "Request prescriber clarification if absent"],
    notes: [
      {
        title: "Cardiology follow-up",
        meta: "Dr. S. Iyer · 2026-05-09",
        text: "Patient reports improved dyspnea on current regimen. Coverage for sacubitril/valsartan requires current ejection fraction documentation before submission.",
      },
      {
        title: "Access team note",
        meta: "Access coordinator · Today",
        text: "Latest echo is not attached to the packet. Locate EF documentation or request clarification from the prescriber before routing to payer review.",
      },
    ],
  },
];

const tabs = ["Overview", "Medications", "Labs", "Orders", "Notes"];

const VITAL_TREND_CONFIG = {
  bp: { label: "BP", worse: "up", unit: "mmHg sys", stableThreshold: 3 },
  hr: { label: "HR", worse: "up", unit: "bpm", stableThreshold: 2 },
  temp: { label: "Temp", worse: "up", unit: "°F", stableThreshold: 0.2 },
  spo2: { label: "SpO₂", worse: "down", unit: "%", stableThreshold: 0.5 },
};

function getTrendMeta(values, worseDirection, stableThreshold) {
  const first = values[0];
  const last = values[values.length - 1];
  const delta = last - first;
  const absDelta = Math.abs(delta);
  const pctChange = first === 0 ? 0 : (delta / first) * 100;

  let status = "stable";
  if (absDelta > stableThreshold) {
    const worsening = worseDirection === "up" ? delta > 0 : delta < 0;
    status = worsening ? "worsening" : "improving";
  }

  const deltaLabel = `${delta > 0 ? "+" : ""}${Number.isInteger(delta) ? delta : delta.toFixed(1)}`;

  return { status, delta, deltaLabel, pctChange, first, last };
}

function buildSparklinePath(values, width, height, padding = 6) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;

  const points = values.map((value, index) => {
    const x = padding + index * step;
    const normalized = range === 0 ? 0.5 : (value - min) / range;
    const y = padding + innerHeight - normalized * innerHeight;
    return { x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${(height - padding).toFixed(2)} L ${points[0].x.toFixed(2)} ${(height - padding).toFixed(2)} Z`;

  return { points, linePath, areaPath, min, max };
}

function TrendSparklineChart({ values, status, chartId }) {
  const uid = useId().replace(/:/g, "");
  const width = 240;
  const height = 52;
  const safeValues = Array.isArray(values) && values.length > 1 ? values : [0, 0];
  const { points, linePath, areaPath } = buildSparklinePath(safeValues, width, height);
  const stroke =
    status === "worsening" ? "#dc2626" : status === "improving" ? "#047857" : "#64748b";
  const fillId = `trend-fill-${chartId}-${uid}`;

  return (
    <div className="vital-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${chartId} trend`}
        style={{ width: "100%", height: "52px", display: "block" }}
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="rgba(248, 250, 252, 0.85)" rx="8" />
        <path d={areaPath} fill={`url(#${fillId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <circle
            key={`${chartId}-${index}`}
            cx={point.x}
            cy={point.y}
            r={index === points.length - 1 ? 3.5 : 2.25}
            fill={index === points.length - 1 ? stroke : "#ffffff"}
            stroke={stroke}
            strokeWidth={index === points.length - 1 ? 0 : 1.75}
          />
        ))}
      </svg>
    </div>
  );
}

function TrendMetricCard({ label, value, subtitle, history, worse, unit, stableThreshold, chartId, pending = false }) {
  if (pending) {
    return (
      <div className="vital">
        <div className="vital-head">
          <div>
            <p className="vital-label">{label}</p>
            <p className="vital-value">{value}</p>
            {subtitle ? <p className="vital-range">{subtitle}</p> : null}
          </div>
          <span className="vital-trend-badge pending">
            <AlertTriangle size={12} />
            Pending
          </span>
        </div>
        <div className="vital-chart pending">No trend until result posted</div>
        <div className="vital-chart-caption">
          <span>Ordered</span>
          <span>Awaiting</span>
        </div>
      </div>
    );
  }

  if (!Array.isArray(history) || history.length < 2) {
    return (
      <div className="vital">
        <div className="vital-head">
          <div>
            <p className="vital-label">{label}</p>
            <p className="vital-value">{value}</p>
            {subtitle ? <p className="vital-range">{subtitle}</p> : null}
          </div>
          <span className="vital-trend-badge pending">
            <AlertTriangle size={12} />
            No trend
          </span>
        </div>
        <div className="vital-chart pending">Insufficient history for trend line</div>
      </div>
    );
  }

  const trend = getTrendMeta(history, worse, stableThreshold);
  const TrendIcon =
    trend.status === "stable" ? Activity : trend.delta > 0 ? TrendingUp : TrendingDown;
  const trendText = trend.status === "stable" ? "Stable" : `${trend.deltaLabel} ${unit}`;

  return (
    <div className="vital">
      <div className="vital-head">
        <div>
          <p className="vital-label">{label}</p>
          <p className="vital-value">{value}</p>
          {subtitle ? <p className="vital-range">{subtitle}</p> : null}
        </div>
        <span className={`vital-trend-badge ${trend.status}`}>
          <TrendIcon size={12} />
          {trendText}
        </span>
      </div>
      <TrendSparklineChart values={history} status={trend.status} chartId={chartId} />
      <div className="vital-chart-caption">
        <span>6 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function Vital({ label, value, history, configKey }) {
  const config = VITAL_TREND_CONFIG[configKey];
  return (
    <TrendMetricCard
      label={label}
      value={value}
      history={history}
      worse={config.worse}
      unit={config.unit}
      stableThreshold={config.stableThreshold}
      chartId={`vital-${configKey}`}
    />
  );
}

function LabSparkline({ values, status }) {
  const width = 260;
  const height = 58;
  const { points, linePath, areaPath } = buildSparklinePath(values, width, height, 7);
  const stroke =
    status === "worsening" ? "#dc2626" : status === "improving" ? "#047857" : "#64748b";

  return (
    <div className="lab-trend-line" aria-label="Lab trend line">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d="M 7 29 L 253 29" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 5" />
        <path d={areaPath} fill={stroke} opacity="0.12" />
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => (
          <circle
            key={`${point.x}-${index}`}
            cx={point.x}
            cy={point.y}
            r={index === points.length - 1 ? 4 : 2.75}
            fill={index === points.length - 1 ? stroke : "#ffffff"}
            stroke={stroke}
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

function Lab({ lab, patientId }) {
  const chartKey = lab.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const chartId = `${patientId}-lab-${chartKey}`;

  if (lab.pending) {
    return (
      <TrendMetricCard
        label={lab.name}
        value={lab.value}
        subtitle={lab.range}
        history={lab.history}
        worse={lab.worse}
        unit={lab.unit}
        stableThreshold={lab.stableThreshold}
        chartId={chartId}
        pending
      />
    );
  }

  if (!Array.isArray(lab.history) || lab.history.length < 2) {
    return (
      <TrendMetricCard
        label={lab.name}
        value={lab.value}
        subtitle={lab.range}
        history={lab.history}
        worse={lab.worse}
        unit={lab.unit}
        stableThreshold={lab.stableThreshold}
        chartId={chartId}
      />
    );
  }

  const trend = getTrendMeta(lab.history, lab.worse, lab.stableThreshold);
  const TrendIcon =
    trend.status === "stable" ? Activity : trend.delta > 0 ? TrendingUp : TrendingDown;
  const trendText = trend.status === "stable" ? "Stable" : `${trend.deltaLabel} ${lab.unit}`;

  return (
    <div className="vital">
      <div className="vital-head">
        <div>
          <p className="vital-label">{lab.name}</p>
          <p className="vital-value">{lab.value}</p>
          <p className="vital-range">{lab.range}</p>
        </div>
        <span className={`vital-trend-badge ${trend.status}`}>
          <TrendIcon size={12} />
          {trendText}
        </span>
      </div>
      <LabSparkline values={lab.history} status={trend.status} />
      <div className="vital-chart-caption">
        <span>6 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function buildInAppGuidance(patient, correction) {
  const highOrPendingLab = patient.labs.find((lab) => lab.flag === "high" || lab.pending) || patient.labs[0];
  const accessNote = patient.notes.find((note) => note.title === "Access team note") || patient.notes[0];
  const sharedSteps = [
    {
      id: "queue",
      target: "queue",
      title: "Open the right case",
      hint: `Start with ${patient.name}'s current queue item.`,
      rationale: "The learner begins from the selected patient's operational state.",
    },
    {
      id: "state",
      target: "state",
      title: "Confirm current state",
      hint: `Confirm this is a ${patient.status} case before choosing a workflow action.`,
      rationale: "The next action depends on state, risk, payer requirements, and clinical context.",
    },
  ];

  if (patient.status === "Ready") {
    return [
      ...sharedSteps,
      {
        id: "medications",
        target: "medications",
        title: "Review medication readiness",
        hint: `Verify ${patient.medication} is ready for the next accountable reviewer.`,
        rationale: "A ready case should move forward without reopening payer work that has already been resolved.",
      },
      {
        id: "route-review",
        target: "action",
        title: "Route to pharmacist review",
        hint: "Choose the action that advances dispensing without adding friction.",
        rationale: "The learner should distinguish a ready case from a case that still requires evidence work.",
      },
    ];
  }

  if (patient.status === "Needs Info") {
    return [
      ...sharedSteps,
      {
        id: "labs",
        target: "labs",
        title: "Check evidence trend",
        hint: `Review ${highOrPendingLab.name} before routing the case.`,
        rationale: "Coverage logic depends on the specific evidence gap, not just a generic missing-document label.",
        lab: highOrPendingLab,
      },
      {
        id: "notes",
        target: "notes",
        title: "Find supporting note",
        hint: "Use the note text to identify the exact missing evidence or clarification.",
        rationale: "Patient-specific documentation keeps the action tied to the payer pathway.",
        note: accessNote,
      },
      {
        id: "request-clarification",
        target: "action",
        title: "Request clarification",
        hint: "Ask for the missing evidence before sending the case forward.",
        rationale: "This prevents avoidable denial and reduces downstream rework.",
      },
    ];
  }

  return [
    ...sharedSteps,
    {
      id: "overview",
      target: "overview",
      title: "Read access context",
      hint: "Read the reason before opening actions.",
      rationale: "The right next step depends on the blocker, not on the action menu.",
      correction,
    },
    {
      id: "notes",
      target: "notes",
      title: "Verify supporting documentation",
      hint: "Look for the evidence the payer is waiting on before submitting materials.",
      rationale: "This protects the patient from avoidable denial and rework.",
      note: accessNote,
    },
    {
      id: "request-evidence",
      target: "action",
      title: "Request missing evidence",
      hint: "Submit only when evidence is complete; otherwise request missing information.",
      rationale: "The learner should connect UI action to clinical and operational outcome.",
    },
  ];
}

function Button({ children, className = "", variant = "primary", disabled = false, ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} disabled={disabled} type="button" {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function CardHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="card-header">
      <div className="card-title-wrap">
        {Icon ? (
          <div className="card-icon">
            <Icon size={16} />
          </div>
        ) : null}
        <div>
          <h3>{title}</h3>
          {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {action || null}
    </div>
  );
}

function StatusPill({ status }) {
  const key = status === "Needs Info" ? "needs-info" : status.toLowerCase();
  return <span className={`status-pill status-${key}`}>{status}</span>;
}

function RiskPill({ risk }) {
  return <span className={`risk-pill risk-${risk.toLowerCase()}`}>{risk}</span>;
}

function getStatusKey(status) {
  return status === "Needs Info" ? "needs-info" : status.toLowerCase();
}

function PatientQueue({ selectedId, onSelect, guidanceStep }) {
  return (
    <Card>
      <CardHeader icon={ClipboardList} title="Patient Queue" subtitle="Synthetic medication access cases" />
      <div className="queue-body">
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search patients, MRN, medication" />
        </div>
        <div className="queue-list">
          {patients.map((patient) => {
            const active = patient.id === selectedId;
            const statusKey = getStatusKey(patient.status);
            const highlighted = guidanceStep?.target === "queue" && active;
            return (
              <button
                key={patient.id}
                type="button"
                className={`patient-button queue-${statusKey} ${active ? "selected" : ""} ${highlighted ? "guidance-highlight" : ""}`}
                onClick={() => onSelect(patient.id)}
              >
                <div className="patient-top">
                  <div>
                    <div className="patient-name-row">
                      <span className="patient-name">{patient.name}</span>
                      <span className="patient-age">{patient.age}</span>
                    </div>
                    <div className="patient-med">{patient.medication}</div>
                  </div>
                  <ChevronRight className="chevron" size={16} />
                </div>
                <div className="patient-bottom">
                  <StatusPill status={patient.status} />
                  <span className="patient-time">{patient.lastTouch}</span>
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
    <div className="metric">
      <div className="metric-label">
        <Icon size={14} />
        {label}
      </div>
      <p className="metric-value">{value}</p>
    </div>
  );
}

function PatientBanner({ patient, guidanceStep }) {
  return (
    <section className={`patient-banner ${guidanceStep?.target === "state" ? "guidance-highlight" : ""}`}>
      <div className="banner-hero">
        <div className="banner-row">
          <div className="patient-identity">
            <div className="identity-icon">
              <UserRound size={32} />
            </div>
            <div>
              <div className="banner-name-row">
                <h2>{patient.name}</h2>
                <span className="pronoun">{patient.pronouns}</span>
              </div>
              <p className="banner-meta">
                DOB {patient.dob} · {patient.mrn} · {patient.payer}
              </p>
              <p className="banner-outcome">{patient.outcome}</p>
            </div>
          </div>
          <div className="banner-pills">
            <StatusPill status={patient.status} />
            <RiskPill risk={patient.risk} />
          </div>
        </div>
      </div>
      <div className="metrics-grid">
        <Metric label="Condition" value={patient.condition} icon={Stethoscope} />
        <Metric label="Medication" value={patient.medication} icon={Pill} />
        <Metric label="Case state" value={patient.status} icon={Activity} />
        <Metric label="Primary outcome" value="Timely, safe access" icon={ShieldCheck} />
      </div>
    </section>
  );
}

function CoachFinding({ label, value }) {
  return (
    <div>
      <p className="finding-label">{label}</p>
      <p className="finding-value">{value}</p>
    </div>
  );
}

function AICoachPanel({ patient, onClose, onTelemetry, onGuidanceStepChange }) {
  const [assessment, setAssessment] = useState(false);
  const [guidanceStarted, setGuidanceStarted] = useState(false);
  const [activeGuidanceStep, setActiveGuidanceStep] = useState(0);

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

  const guidanceSteps = useMemo(
    () => buildInAppGuidance(patient, assessmentText.correction),
    [assessmentText.correction, patient]
  );

  const generateAssessment = () => {
    setAssessment(true);
    onTelemetry?.("ai.assessment.generated", {
      patientId: patient.id,
      patientStatus: patient.status,
      risk: patient.risk,
      workflowPhase: "mental_model_assessment",
    });
  };

  const startGuidance = () => {
    setGuidanceStarted(true);
    setActiveGuidanceStep(0);
    onGuidanceStepChange?.(guidanceSteps[0] || null);
    onTelemetry?.("guidance.started", {
      patientId: patient.id,
      patientStatus: patient.status,
      risk: patient.risk,
      stepCount: guidanceSteps.length,
      path: guidanceSteps.map((step) => step.id),
    });
  };

  const selectGuidanceStep = useCallback(
    (stepIndex) => {
      setActiveGuidanceStep(stepIndex);
      onGuidanceStepChange?.(guidanceSteps[stepIndex] || null);
      onTelemetry?.("guidance.step.selected", {
        patientId: patient.id,
        stepIndex,
        stepId: guidanceSteps[stepIndex]?.id,
      });
    },
    [guidanceSteps, onGuidanceStepChange, onTelemetry, patient.id]
  );

  return (
    <Card className="coach-card">
      <div className="coach-header">
        <div className="coach-header-row">
          <div className="coach-title-wrap">
            <div className="coach-icon">
              <Bot size={20} />
            </div>
            <div>
              <h3>AI Coach</h3>
              <p>Mental model → guided path</p>
            </div>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Remove AI Coach">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="coach-body">
        <div className="prompt-card">
          <div className="prompt-title">
            <MessageSquareText size={16} />
            Learner prompt
          </div>
          <p>“I need to resolve this medication access case. I think I should use the action menu and submit it.”</p>
        </div>

        <Button className="btn-full" onClick={generateAssessment}>
          <Sparkles size={16} />
          Generate Mental Model Assessment
        </Button>

        {assessment ? (
          <div className={`assessment-card ${guidanceStarted ? "collapsed" : ""}`}>
            <div className="assessment-title">
              <HelpCircle size={16} />
              {guidanceStarted ? "Assessment complete" : "Assessment"}
            </div>
            {guidanceStarted ? (
              <p className="assessment-collapsed-copy">Details collapsed while in-app guidance is active.</p>
            ) : (
              <>
                <CoachFinding label="Likely gap" value={assessmentText.gap} />
                <CoachFinding label="Correction" value={assessmentText.correction} />
                <CoachFinding label="Outcome context" value={assessmentText.outcome} />
                <Button variant="secondary" className="btn-full" onClick={startGuidance}>
                  <Sparkles size={16} />
                  Start In-App Guidance
                </Button>
              </>
            )}
          </div>
        ) : null}

        {guidanceStarted ? (
          <div className="guidance-list">
            {guidanceSteps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                className={`guidance-step ${index === activeGuidanceStep ? "active" : ""}`}
                onClick={() => selectGuidanceStep(index)}
              >
                <div className="guidance-step-row">
                  <div className="guidance-step-index">{index + 1}</div>
                  <div>
                    <p className="guidance-step-title">{step.title}</p>
                    <p className="guidance-step-hint">{step.hint}</p>
                    <p className="guidance-step-rationale">{step.rationale}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function ChartTabs({ activeTab, onTab }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button key={tab} type="button" className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => onTab(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function SmallFact({ label, value }) {
  return (
    <div className="fact">
      <p className="fact-label">{label}</p>
      <p className="fact-value">{value}</p>
    </div>
  );
}

function Note({ title, meta, text }) {
  return (
    <article className="note">
      <h4>{title}</h4>
      <p className="note-meta">{meta}</p>
      <p className="note-text">{text}</p>
    </article>
  );
}

function ChartContent({ patient, activeTab, guidanceStep }) {
  if (activeTab === "Medications") {
    return (
      <Card>
        <CardHeader icon={Pill} title="Medication List" subtitle="Current and pending therapies" />
        <div className="list">
          {patient.meds.map((med) => (
            <div
              key={med.name}
              className={`list-row ${guidanceStep?.target === "medications" && med.name === patient.medication ? "guidance-highlight" : ""}`}
            >
              <div>
                <p className="list-title">{med.name}</p>
                <p className="list-copy">{med.dose}</p>
              </div>
              <span className="soft-pill">{med.status}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activeTab === "Labs") {
    return (
      <Card>
        <CardHeader icon={HeartPulse} title="Recent Labs" subtitle="7-day trend · current reading" />
        <div className="vitals-grid">
          {patient.labs.map((lab) => (
            <div key={lab.name} className={guidanceStep?.target === "labs" && guidanceStep.lab?.name === lab.name ? "guidance-highlight" : ""}>
              <Lab lab={lab} patientId={patient.id} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activeTab === "Orders") {
    return (
      <Card>
        <CardHeader icon={ClipboardList} title="Access Tasks" subtitle="Operational checklist for this case" />
        <div className="task-list">
          {patient.tasks.map((task, index) => (
            <div key={task} className={`task-card ${guidanceStep?.target === "action" && index === 0 ? "guidance-highlight" : ""}`}>
              <div className="task-icon">
                {index === 0 ? <AlertTriangle size={16} color="#d97706" /> : <CheckCircle2 size={16} color="#94a3b8" />}
              </div>
              <div>
                <p className="list-title">{task}</p>
                <p className="list-copy">
                  {index === 0 ? "Recommended next step based on current blocker." : "Complete after the required evidence is verified."}
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
        <div className="notes-list">
          {patient.notes.map((note) => (
            <div key={`${patient.id}-${note.title}`} className={guidanceStep?.target === "notes" && guidanceStep.note?.title === note.title ? "guidance-highlight" : ""}>
              <Note title={note.title} meta={note.meta} text={note.text} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="content-grid">
      <Card>
        <CardHeader icon={Info} title="Reason Panel" subtitle="Why this case needs attention" />
        <div className="panel-body">
          <div className={`reason-box ${guidanceStep?.target === "overview" ? "guidance-highlight" : ""}`}>
            <div className="reason-row">
              <AlertTriangle size={20} />
              <div>
                <p className="reason-title">Access blocker</p>
                <p className="reason-copy">{patient.reason}</p>
              </div>
            </div>
          </div>
          <div className="facts-grid">
            <SmallFact label="Allergies" value={patient.allergies.join(", ")} />
            <SmallFact label="Payer" value={patient.payer} />
            <SmallFact label="Primary med" value={patient.medication} />
            <SmallFact label="Current risk" value={patient.risk} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader icon={Activity} title="Vitals Snapshot" subtitle="7-day trend · current reading" />
        <div className="vitals-grid">
          <Vital label="BP" value={patient.vitals.bp} history={patient.vitalHistory.bp} configKey="bp" />
          <Vital label="HR" value={patient.vitals.hr} history={patient.vitalHistory.hr} configKey="hr" />
          <Vital label="Temp" value={patient.vitals.temp} history={patient.vitalHistory.temp} configKey="temp" />
          <Vital label="SpO₂" value={patient.vitals.spo2} history={patient.vitalHistory.spo2} configKey="spo2" />
        </div>
      </Card>
    </div>
  );
}

function ComplianceStrip() {
  return (
    <div className="training-strip">
      <div className="training-main">
        <div className="training-icon">
          <Lock size={16} />
        </div>
        <div>
          <p className="training-title">Training mode</p>
          <p className="training-copy">All patients, notes, MRNs, and payer details are synthetic.</p>
        </div>
      </div>
      <div className="chip-row">
        <span className="chip">No PHI</span>
        <span className="chip">Sandbox UI</span>
        <span className="chip">Audit-friendly workflow</span>
      </div>
    </div>
  );
}

function TelemetryPanel({ events, onClear }) {
  return (
    <Card>
      <CardHeader
        icon={BarChart3}
        title="Telemetry Stream"
        subtitle="Client-side learning events emitted by the mock EHR"
        action={
          <Button variant="ghost" onClick={onClear} disabled={events.length === 0}>
            <Trash2 size={16} />
            Clear
          </Button>
        }
      />
      {events.length === 0 ? (
        <div className="telemetry-empty">
          No telemetry yet. Select a patient, insert the AI Coach, generate an assessment, or view a chart tab.
        </div>
      ) : (
        <div className="telemetry-list">
          {events.map((event) => (
            <div key={event.id} className="telemetry-event">
              <div>
                <p className="event-type">{event.type}</p>
                <p className="event-time">
                  {new Date(event.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
              <pre className="event-json">{JSON.stringify(event.payload, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function tabForGuidanceStep(step) {
  const tabByTarget = {
    queue: "Overview",
    state: "Overview",
    overview: "Overview",
    labs: "Labs",
    medications: "Medications",
    notes: "Notes",
    action: "Orders",
  };
  return tabByTarget[step?.target] || null;
}

export default function MockEHRFrontend() {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [coachInserted, setCoachInserted] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [telemetryEvents, setTelemetryEvents] = useState([]);
  const [guidanceStep, setGuidanceStep] = useState(null);

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
    setGuidanceStep(null);
    track("coach.removed", {
      patientId: patient.id,
      source: "panel_close",
    });
  }, [patient.id, track]);

  const handlePatientSelect = useCallback(
    (patientId) => {
      const nextPatient = patients.find((item) => item.id === patientId);
      setSelectedId(patientId);
      setGuidanceStep(null);
      track("patient.selected", {
        patientId,
        status: nextPatient?.status,
        risk: nextPatient?.risk,
        medication: nextPatient?.medication,
      });
    },
    [track]
  );

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      setGuidanceStep(null);
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

  const handleGuidanceStepChange = useCallback((step) => {
    setGuidanceStep(step);
    const nextTab = tabForGuidanceStep(step);
    if (nextTab) {
      setActiveTab(nextTab);
    }
  }, []);

  return (
    <div className="app-shell">
      <style>{styles}</style>
      <div className="app-container">
        <header className="app-header">
          <div className="brand">
            <div className="brand-icon">
              <Hospital size={24} />
            </div>
            <div>
              <div className="brand-title-row">
                <h1>CarePath EHR</h1>
                <span className="badge">Mock</span>
              </div>
              <p>Medication access training workspace with AI-guided remediation</p>
            </div>
          </div>

          <div className="header-actions">
            <Button variant="secondary">
              <CalendarClock size={16} />
              Today’s queue
            </Button>
            <Button variant="warning">
              <Layers size={16} />
              Simulation mode
            </Button>
            <button className="link-button" type="button" onClick={() => insertCoach("header_link")}>
              <Bot size={16} />
              Open AI Coach Sidecar
            </button>
            <button
              className={`toggle-button ${animationsEnabled ? "on" : ""}`}
              type="button"
              onClick={toggleAnimations}
              aria-pressed={animationsEnabled}
            >
              <Sparkles size={16} />
              Animation {animationsEnabled ? "on" : "off"}
            </button>
          </div>
        </header>

        <ComplianceStrip />

        <div className="layout">
          <aside className="sidebar-column">
            <PatientQueue selectedId={selectedId} onSelect={handlePatientSelect} guidanceStep={guidanceStep} />
          </aside>

          <main className="main-column">
            <PatientBanner patient={patient} guidanceStep={guidanceStep} />

            <ChartTabs activeTab={activeTab} onTab={handleTabChange} />
            <ChartContent key={`${patient.id}-${activeTab}`} patient={patient} activeTab={activeTab} guidanceStep={guidanceStep} />
          </main>
        </div>

        {animationsEnabled ? (
          <AnimatePresence>
            {coachInserted ? (
              <motion.aside
                key="ai-coach-sidecar"
                className="coach-sidecar"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                {guidanceStep ? (
                  <div className="guidance-callout">
                    <Sparkles size={16} />
                    <div>
                      <p className="guidance-title">{guidanceStep.title}</p>
                      <p className="guidance-copy">{guidanceStep.hint}</p>
                    </div>
                  </div>
                ) : null}
                <AICoachPanel
                  patient={patient}
                  onTelemetry={track}
                  onClose={removeCoach}
                  onGuidanceStepChange={handleGuidanceStepChange}
                />
              </motion.aside>
            ) : null}
          </AnimatePresence>
        ) : coachInserted ? (
          <aside className="coach-sidecar">
            {guidanceStep ? (
              <div className="guidance-callout">
                <Sparkles size={16} />
                <div>
                  <p className="guidance-title">{guidanceStep.title}</p>
                  <p className="guidance-copy">{guidanceStep.hint}</p>
                </div>
              </div>
            ) : null}
            <AICoachPanel
              patient={patient}
              onTelemetry={track}
              onClose={removeCoach}
              onGuidanceStepChange={handleGuidanceStepChange}
            />
          </aside>
        ) : null}

        <TelemetryPanel events={telemetryEvents} onClear={() => setTelemetryEvents([])} />
      </div>
    </div>
  );
}
