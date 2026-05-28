import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Pause,
  Play,
  PlayCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  UserRound,
  Video,
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
  .patient-button:hover { background: #f8fafc; border-color: #cbd5e1; }
  .patient-button.selected { border-color: var(--emerald-300); background: var(--emerald-50); box-shadow: var(--shadow-md); outline: 1px solid var(--emerald-200); }
  .patient-top { display: flex; justify-content: space-between; gap: 8px; align-items: flex-start; }
  .patient-name-row { display: flex; align-items: center; gap: 8px; }
  .patient-name { font-weight: 800; }
  .patient-age, .patient-med, .patient-time { color: var(--muted); font-size: 12px; }
  .patient-button.selected .patient-age, .patient-button.selected .patient-med, .patient-button.selected .patient-time, .patient-button.selected .chevron { color: var(--emerald-700); }
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

  .coach-placeholder { border: 1px dashed #bfdbfe; background: rgba(239, 246, 255, 0.70); border-radius: 20px; padding: 16px; }
  .coach-placeholder-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .coach-placeholder-title { margin: 0; color: var(--blue-950); font-weight: 900; }
  .coach-placeholder-copy { margin: 5px 0 0; color: var(--blue-700); font-size: 14px; }
  .coach-card { border-color: #bfdbfe; box-shadow: var(--shadow-md); font-size: 12px; }
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
  .assessment-title { color: var(--blue-950); display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 13px; }
  .finding-label { color: #3b82f6; text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; font-weight: 900; margin: 0; }
  .finding-value { color: var(--blue-950); font-size: 12px; line-height: 1.6; margin: 4px 0 0; }
  .storyboard-card { border: 1px solid var(--border); border-radius: 18px; background: white; padding: 16px; }
  .storyboard-title-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .storyboard-title { margin: 0; font-weight: 900; font-size: 13px; }
  .storyboard-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
  .video-player { margin-top: 16px; overflow: hidden; border-radius: 18px; border: 1px solid var(--border); background: var(--slate-950); padding: 12px; color: white; }
  .video-frame { aspect-ratio: 16 / 9; border-radius: 14px; position: relative; overflow: hidden; background: var(--bg); color: var(--text); }
  .video-scene { position: absolute; inset: 0; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  .video-scene-label { position: absolute; top: 10px; left: 10px; z-index: 3; background: rgba(2, 6, 23, 0.82); color: white; border-radius: 999px; padding: 4px 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
  .video-caption { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; padding: 10px 12px 12px; background: linear-gradient(transparent, rgba(2, 6, 23, 0.92)); }
  .video-caption p { margin: 0; color: #e2e8f0; font-size: 11px; line-height: 1.5; }
  .video-caption strong { color: white; font-size: 11px; }
  .video-cursor { position: absolute; z-index: 4; width: 14px; height: 14px; border-radius: 999px; background: white; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.9), 0 4px 12px rgba(15, 23, 42, 0.35); pointer-events: none; }
  .video-highlight { position: relative; z-index: 2; box-shadow: 0 0 0 2px #3b82f6, 0 0 0 6px rgba(59, 130, 246, 0.22); border-radius: inherit; animation: videoPulse 1.4s ease-in-out infinite; }
  @keyframes videoPulse { 0%, 100% { box-shadow: 0 0 0 2px #3b82f6, 0 0 0 6px rgba(59, 130, 246, 0.22); } 50% { box-shadow: 0 0 0 2px #60a5fa, 0 0 0 10px rgba(59, 130, 246, 0.12); } }
  .video-mini-layout { display: grid; grid-template-columns: 34% 1fr; gap: 8px; flex: 1; min-height: 0; }
  .video-mini-panel { background: white; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; font-size: 10px; }
  .video-mini-panel-header { padding: 8px 10px; border-bottom: 1px solid var(--border-soft); font-weight: 800; color: var(--text); }
  .video-mini-queue-item { padding: 8px 10px; border-bottom: 1px solid var(--border-soft); }
  .video-mini-queue-item:last-child { border-bottom: 0; }
  .video-mini-queue-item.dim { opacity: 0.45; }
  .video-mini-queue-name { font-weight: 800; font-size: 10px; }
  .video-mini-queue-med { color: var(--muted); margin-top: 2px; font-size: 9px; }
  .video-mini-banner { background: linear-gradient(90deg, #020617, #0f172a); color: white; padding: 10px; border-radius: 12px; }
  .video-mini-banner h4 { margin: 0; font-size: 12px; }
  .video-mini-banner p { margin: 4px 0 0; color: #cbd5e1; font-size: 9px; line-height: 1.4; }
  .video-mini-pills { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
  .video-mini-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
  .video-mini-tab { border: 1px solid var(--border); background: white; color: #475569; border-radius: 8px; padding: 4px 8px; font-size: 9px; font-weight: 800; }
  .video-mini-tab.active { background: var(--slate-950); color: white; border-color: var(--slate-950); }
  .video-mini-reason { border: 1px solid var(--amber-200); background: var(--amber-50); border-radius: 10px; padding: 10px; }
  .video-mini-reason p { margin: 0; color: var(--amber-900); font-size: 9px; line-height: 1.5; }
  .video-mini-note { border: 1px solid var(--border); background: #f8fafc; border-radius: 10px; padding: 10px; }
  .video-mini-note h5 { margin: 0; font-size: 10px; }
  .video-mini-note p { margin: 4px 0 0; color: #475569; font-size: 9px; line-height: 1.45; }
  .video-mini-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto; }
  .video-mini-action { border-radius: 10px; padding: 10px; text-align: center; font-size: 9px; font-weight: 800; border: 1px solid var(--border); }
  .video-mini-action.wrong { background: #fff1f2; color: #be123c; border-color: #fecdd3; opacity: 0.55; text-decoration: line-through; }
  .video-mini-action.right { background: var(--emerald-50); color: var(--emerald-700); border-color: var(--emerald-200); }
  .video-controls { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .video-control-btn { border: 0; background: rgba(255,255,255,0.10); color: white; border-radius: 10px; padding: 7px 10px; display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; }
  .video-control-btn:hover { background: rgba(255,255,255,0.16); }
  .video-progress-wrap { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .video-progress-bar { height: 4px; border-radius: 999px; background: rgba(255,255,255,0.15); overflow: hidden; }
  .video-progress-fill { height: 100%; background: #60a5fa; border-radius: inherit; transition: width 120ms linear; }
  .video-progress-meta { display: flex; justify-content: space-between; color: #94a3b8; font-size: 10px; font-weight: 700; }
  .walkthrough-list { display: flex; flex-direction: column; gap: 8px; }
  .walkthrough-step { border: 1px solid var(--border); background: white; border-radius: 18px; padding: 12px; transition: border-color 150ms ease, box-shadow 150ms ease; }
  .walkthrough-step.active { border-color: #93c5fd; box-shadow: 0 0 0 1px #bfdbfe; background: #f8fbff; }
  .walkthrough-step-row { display: flex; align-items: flex-start; gap: 12px; }
  .step-index { width: 28px; height: 28px; flex: 0 0 28px; border-radius: 999px; background: var(--slate-950); color: white; display: grid; place-items: center; font-size: 11px; font-weight: 900; }
  .step-title { margin: 0; font-weight: 900; font-size: 13px; }
  .step-hint { margin: 4px 0 0; color: #475569; font-size: 12px; }
  .step-rationale { margin: 8px 0 0; color: var(--muted-2); font-size: 11px; line-height: 1.5; }

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
  .vital { background: #f8fafc; border: 1px solid var(--border); border-radius: 18px; padding: 16px; }
  .vital-label { margin: 0; color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; font-weight: 900; }
  .vital-value { margin: 8px 0 0; font-size: 22px; font-weight: 900; }
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

function PatientQueue({ selectedId, onSelect }) {
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
            return (
              <button
                key={patient.id}
                type="button"
                className={`patient-button ${active ? "selected" : ""}`}
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

function PatientBanner({ patient }) {
  return (
    <section className="patient-banner">
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

function CoachPlaceholder({ onInsert }) {
  return (
    <div className="coach-placeholder">
      <div className="coach-placeholder-row">
        <div>
          <p className="coach-placeholder-title">Need help interpreting the workflow?</p>
          <p className="coach-placeholder-copy">
            Insert the AI Coach here to assess the learner’s mental model in the context of this patient case.
          </p>
        </div>
        <button className="btn btn-secondary" type="button" onClick={onInsert}>
          <Bot size={16} />
          Insert AI Coach
        </button>
      </div>
    </div>
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

const WALKTHROUGH_STEP_MS = 4500;

function CorrectionWalkthroughVideo({ patient, steps, correction, onStepChange }) {
  const [playing, setPlaying] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const rafRef = useRef(null);
  const lastTickRef = useRef(null);

  const totalMs = steps.length * WALKTHROUGH_STEP_MS;
  const derivedStep = Math.min(steps.length - 1, Math.floor(elapsedMs / WALKTHROUGH_STEP_MS));

  useEffect(() => {
    onStepChange?.(derivedStep);
  }, [derivedStep, onStepChange]);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTickRef.current = null;
      return undefined;
    }

    const tick = (timestamp) => {
      if (lastTickRef.current == null) {
        lastTickRef.current = timestamp;
      }
      const delta = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;
      setElapsedMs((current) => {
        const next = current + delta;
        return next >= totalMs ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [playing, totalMs]);

  const stepProgress = ((elapsedMs % WALKTHROUGH_STEP_MS) / WALKTHROUGH_STEP_MS) * 100;
  const totalProgress = (elapsedMs / totalMs) * 100;
  const currentStep = steps[derivedStep];
  const cursorTargets = [
    { x: "18%", y: "28%" },
    { x: "62%", y: "22%" },
    { x: "58%", y: "52%" },
    { x: "58%", y: "58%" },
    { x: "72%", y: "82%" },
  ];
  const cursor = cursorTargets[derivedStep] || cursorTargets[0];

  const restart = () => {
    setElapsedMs(0);
    setPlaying(true);
    lastTickRef.current = null;
  };

  const seekToStep = (index) => {
    setElapsedMs(index * WALKTHROUGH_STEP_MS);
    setPlaying(true);
    lastTickRef.current = null;
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `0:${String(seconds).padStart(2, "0")}`;
  };

  const blockedPatient = patient.status === "Blocked" ? patient : patients.find((item) => item.status === "Blocked") || patient;
  const queuePreview = useMemo(() => {
    const blocked = patients.find((item) => item.status === "Blocked");
    const others = patients.filter((item) => item.id !== blocked?.id).slice(0, 2);
    return blocked ? [blocked, ...others] : patients.slice(0, 3);
  }, []);

  const renderScene = () => {
    if (derivedStep === 0) {
      return (
        <div className="video-mini-layout">
          <div className="video-mini-panel">
            <div className="video-mini-panel-header">Patient Queue</div>
            {queuePreview.map((item) => {
              const isTarget = item.id === blockedPatient.id;
              return (
                <div key={item.id} className={`video-mini-queue-item ${isTarget ? "video-highlight" : "dim"}`}>
                  <div className="video-mini-queue-name">{item.name}</div>
                  <div className="video-mini-queue-med">{item.medication}</div>
                  <div className="video-mini-pills" style={{ marginTop: 6 }}>
                    <StatusPill status={item.status} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="video-mini-panel" style={{ display: "grid", placeItems: "center", color: "var(--muted)", padding: 16 }}>
            Select the blocked case with the highest access risk.
          </div>
        </div>
      );
    }

    if (derivedStep === 1) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
          <div className={`video-mini-banner video-highlight`}>
            <h4>{blockedPatient.name}</h4>
            <p>{blockedPatient.outcome}</p>
            <div className="video-mini-pills">
              <StatusPill status={blockedPatient.status} />
              <RiskPill risk={blockedPatient.risk} />
            </div>
          </div>
          <div className="video-mini-panel" style={{ padding: 10 }}>
            <div className="video-mini-queue-name">Case state: {blockedPatient.status}</div>
            <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 9, lineHeight: 1.5 }}>
              Blocked means evidence review is required before any submit or escalate action.
            </p>
          </div>
        </div>
      );
    }

    if (derivedStep === 2) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
          <div className="video-mini-tabs">
            <span className="video-mini-tab active">Overview</span>
            <span className="video-mini-tab">Medications</span>
            <span className="video-mini-tab">Orders</span>
          </div>
          <div className={`video-mini-reason video-highlight`}>
            <p><strong>Access blocker:</strong> {blockedPatient.reason}</p>
          </div>
          <div className="video-mini-panel" style={{ padding: 10, marginTop: "auto" }}>
            <p style={{ margin: 0, fontSize: 9, color: "#334155", lineHeight: 1.5 }}>{correction}</p>
          </div>
        </div>
      );
    }

    if (derivedStep === 3) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
          <div className="video-mini-tabs">
            <span className="video-mini-tab">Overview</span>
            <span className="video-mini-tab">Labs</span>
            <span className="video-mini-tab active">Notes</span>
          </div>
          <div className={`video-mini-note video-highlight`}>
            <h5>Access team note</h5>
            <p>PA packet not yet submitted. Diagnosis support present. TB screening is pending and must be verified before packet completion.</p>
          </div>
          <div className="video-mini-panel" style={{ padding: 10 }}>
            <div className="video-mini-queue-name">Evidence checklist</div>
            <p style={{ margin: "6px 0 0", fontSize: 9, color: "var(--muted)" }}>Diagnosis support · TB screening · Payer pathway</p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
        <div className="video-mini-panel" style={{ padding: 10 }}>
          <div className="video-mini-queue-name">Safest next action</div>
          <p style={{ margin: "6px 0 0", fontSize: 9, color: "var(--muted)", lineHeight: 1.5 }}>
            Submit only when evidence is complete; otherwise request missing information.
          </p>
        </div>
        <div className="video-mini-actions">
          <div className="video-mini-action wrong">Submit PA packet</div>
          <div className={`video-mini-action right video-highlight`}>Request missing evidence</div>
        </div>
      </div>
    );
  };

  return (
    <div className="video-player">
      <div className="video-frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={derivedStep}
            className="video-scene"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <span className="video-scene-label">Step {derivedStep + 1} · {currentStep.title}</span>
            {renderScene()}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="video-cursor"
          animate={{ left: cursor.x, top: cursor.y }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />

        <div className="video-caption">
          <p><strong>{currentStep.hint}</strong></p>
          <p>{currentStep.rationale}</p>
        </div>
      </div>

      <div className="video-controls">
        <button className="video-control-btn" type="button" onClick={() => setPlaying((value) => !value)}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? "Pause" : "Play"}
        </button>
        <button className="video-control-btn" type="button" onClick={restart}>
          <RotateCcw size={14} />
          Restart
        </button>
        <div className="video-progress-wrap">
          <div className="video-progress-bar">
            <div className="video-progress-fill" style={{ width: `${totalProgress}%` }} />
          </div>
          <div className="video-progress-meta">
            <span>{formatTime(elapsedMs)} / {formatTime(totalMs)}</span>
            <span>{Math.round(stepProgress)}% of step</span>
          </div>
        </div>
      </div>

      <div className="video-mini-tabs" style={{ marginTop: 10 }}>
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            className={`video-mini-tab ${index === derivedStep ? "active" : ""}`}
            onClick={() => seekToStep(index)}
          >
            {index + 1}. {step.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function AICoachPanel({ patient, onClose, onTelemetry }) {
  const [assessment, setAssessment] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);
  const [activeVideoStep, setActiveVideoStep] = useState(0);

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
    onTelemetry?.("ai.assessment.generated", {
      patientId: patient.id,
      patientStatus: patient.status,
      risk: patient.risk,
      workflowPhase: "mental_model_assessment",
    });
  };

  const generateWalkthrough = () => {
    setWalkthrough(true);
    setActiveVideoStep(0);
    onTelemetry?.("walkthrough.storyboard.generated", {
      patientId: patient.id,
      patientStatus: patient.status,
      risk: patient.risk,
      workflowPhase: "outcome_guided_walkthrough",
      stepCount: walkthroughSteps.length,
    });
  };

  const handleVideoStepChange = useCallback((stepIndex) => {
    setActiveVideoStep(stepIndex);
  }, []);

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
          <div className="assessment-card">
            <div className="assessment-title">
              <HelpCircle size={16} />
              Assessment
            </div>
            <CoachFinding label="Likely gap" value={assessmentText.gap} />
            <CoachFinding label="Correction" value={assessmentText.correction} />
            <CoachFinding label="Outcome context" value={assessmentText.outcome} />
            <Button variant="secondary" className="btn-full" onClick={generateWalkthrough}>
              <Video size={16} />
              Generate Outcome-Guided Walkthrough
            </Button>
          </div>
        ) : null}

        {walkthrough ? (
          <div className="coach-body" style={{ padding: 0 }}>
            <div className="storyboard-card">
              <div className="storyboard-title-row">
                <div>
                  <p className="storyboard-title">Video storyboard</p>
                  <p className="storyboard-subtitle">Generated from parsed AI feedback</p>
                </div>
                <PlayCircle size={32} />
              </div>
              <div className="video-player-wrap">
                <CorrectionWalkthroughVideo
                  patient={patient}
                  steps={walkthroughSteps}
                  correction={assessmentText.correction}
                  onStepChange={handleVideoStepChange}
                />
              </div>
            </div>
            <div className="walkthrough-list">
              {walkthroughSteps.map((step, index) => (
                <div key={step.title} className={`walkthrough-step ${index === activeVideoStep ? "active" : ""}`}>
                  <div className="walkthrough-step-row">
                    <div className="step-index">{index + 1}</div>
                    <div>
                      <p className="step-title">{step.title}</p>
                      <p className="step-hint">{step.hint}</p>
                      <p className="step-rationale">{step.rationale}</p>
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

function Vital({ label, value }) {
  return (
    <div className="vital">
      <p className="vital-label">{label}</p>
      <p className="vital-value">{value}</p>
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

function ChartContent({ patient, activeTab }) {
  if (activeTab === "Medications") {
    return (
      <Card>
        <CardHeader icon={Pill} title="Medication List" subtitle="Current and pending therapies" />
        <div className="list">
          {patient.meds.map((med) => (
            <div key={med.name} className="list-row">
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
        <CardHeader icon={HeartPulse} title="Recent Labs" subtitle="Evidence used for clinical and access decisions" />
        <div className="list">
          {patient.labs.map((lab) => (
            <div key={lab.name} className="lab-row">
              <p className="list-title">{lab.name}</p>
              <span className={`lab-value lab-${lab.flag}`}>{lab.value}</span>
              <p className="list-copy">{lab.range}</p>
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
            <div key={task} className="task-card">
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
    <div className="content-grid">
      <Card>
        <CardHeader icon={Info} title="Reason Panel" subtitle="Why this case needs attention" />
        <div className="panel-body">
          <div className="reason-box">
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
        <CardHeader icon={Activity} title="Vitals Snapshot" subtitle="Mock clinical status" />
        <div className="vitals-grid">
          <Vital label="BP" value={patient.vitals.bp} />
          <Vital label="HR" value={patient.vitals.hr} />
          <Vital label="Temp" value={patient.vitals.temp} />
          <Vital label="SpO₂" value={patient.vitals.spo2} />
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
              Insert AI Coach into workflow
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
            <PatientQueue selectedId={selectedId} onSelect={handlePatientSelect} />
          </aside>

          <main className="main-column">
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
