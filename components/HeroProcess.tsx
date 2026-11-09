import { CircleDollarSign, Clock, ListChecks } from "lucide-react";
import type { ReactNode } from "react";

const inputs = [
  {
    label: "Time",
    icon: <Clock aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />,
    pose: "-rotate-3",
    motion: "hero-drift",
  },
  {
    label: "Money",
    icon: (
      <CircleDollarSign
        aria-hidden="true"
        className="h-5 w-5"
        strokeWidth={1.75}
      />
    ),
    pose: "translate-y-2",
    motion: "hero-drift hero-drift-late",
  },
  {
    label: "Manual",
    icon: (
      <ListChecks aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
    ),
    pose: "rotate-[2.5deg]",
    motion: "hero-drift hero-drift-later",
  },
] as const;

const outcomes = [
  {
    label: "Time saved",
    icon: <Clock aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />,
    motion: "hero-outcome hero-outcome-1",
  },
  {
    label: "Money saved",
    icon: (
      <CircleDollarSign
        aria-hidden="true"
        className="h-4 w-4"
        strokeWidth={1.75}
      />
    ),
    motion: "hero-outcome hero-outcome-2",
  },
  {
    label: "Manual work eliminated",
    icon: (
      <ListChecks aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
    ),
    motion: "hero-outcome hero-outcome-3",
  },
] as const;

function Beam({ late = false }: { late?: boolean }) {
  const delay = late ? "hero-beam-late" : "";

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 40 68" className="h-16 w-10 overflow-visible">
        <path
          d="M20 2 V66"
          stroke="rgba(139,92,246,0.45)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M20 2 V66"
          pathLength={100}
          className={`hero-beam-glow ${delay}`}
          stroke="#8B5CF6"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 2 V66"
          pathLength={100}
          className={`hero-beam ${delay}`}
          stroke="#f5f3ff"
          strokeWidth="2.25"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function ProcessLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">
      {children}
    </p>
  );
}

export default function HeroProcess() {
  return (
    <div
      aria-hidden="true"
      className="relative min-w-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#101012] shadow-[0_24px_80px_-36px_rgba(139,92,246,0.55)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-[46%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/30 blur-3xl" />

      <div className="relative px-4 py-6 sm:px-7 sm:py-8">
        <ProcessLabel>Bottlenecks</ProcessLabel>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          {inputs.map((item) => (
            <div key={item.label} className={item.motion}>
              <div
                className={`flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-brand-black/85 px-2 py-3 text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${item.pose}`}
              >
                {item.icon}
                <span className="text-xs font-medium text-zinc-200 sm:text-sm">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Beam />

        <div className="hero-node relative mx-auto w-fit rounded-2xl border border-brand-purple/70 bg-[#161222] px-7 py-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200">
            Behind the scenes
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-white">
            AI + cloud
          </p>
        </div>

        <Beam late />

        <ProcessLabel>Delivered outcomes</ProcessLabel>
        <ul className="mt-4 space-y-2.5">
          {outcomes.map((item) => (
            <li
              key={item.label}
              className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 ${item.motion}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-white">
                {item.icon}
              </span>
              <span className="text-sm font-semibold text-white sm:text-base">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
