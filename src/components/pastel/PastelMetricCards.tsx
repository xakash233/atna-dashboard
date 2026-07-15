const METRICS = [
  {
    label: "Save Products",
    value: "178+",
    icon: "heart",
    gradient: "from-[#e8d9f8] via-[#ddd0f5] to-[#d4c4f0]",
    iconBg: "bg-white/55 text-[#8b6fc2]",
  },
  {
    label: "Stock Products",
    value: "20+",
    icon: "stock",
    gradient: "from-[#d4e6f8] via-[#c8daf5] to-[#b8d4f0]",
    iconBg: "bg-white/55 text-[#5f8fc4]",
  },
  {
    label: "Sales Products",
    value: "190+",
    icon: "bag",
    gradient: "from-[#f8d6de] via-[#f2c8d4] to-[#f0b6c8]",
    iconBg: "bg-white/55 text-[#c97a92]",
  },
  {
    label: "Job Application",
    value: "12+",
    icon: "case",
    gradient: "from-[#f8e4c8] via-[#f5d9b4] to-[#f5c4a8]",
    iconBg: "bg-white/55 text-[#c48a5a]",
  },
] as const;

function MetricIcon({ name }: { name: string }) {
  const c = "size-5";
  if (name === "heart") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 17s-6-3.8-6-8a3.5 3.5 0 0 1 6-2.4A3.5 3.5 0 0 1 16 9c0 4.2-6 8-6 8Z" />
      </svg>
    );
  }
  if (name === "stock") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M3 7.5 10 4l7 3.5v7L10 18 3 14.5v-7Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 10v8M3 7.5l7 3.5 7-3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "bag") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M5 7h10l-.8 8.2A1.5 1.5 0 0 1 12.7 16.5H7.3a1.5 1.5 0 0 1-1.5-1.3L5 7Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="4" y="6" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6V5a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PastelMetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {METRICS.map((m) => (
        <article
          key={m.label}
          className={`pastel-metric relative overflow-hidden bg-gradient-to-br ${m.gradient} p-5`}
        >
          <div className="absolute -right-4 -top-4 size-20 rounded-full bg-white/25 blur-xl" />
          <div className="relative flex items-start justify-between">
            <div className={`grid size-10 place-items-center rounded-full ${m.iconBg}`}>
              <MetricIcon name={m.icon} />
            </div>
          </div>
          <p className="relative mt-8 text-[28px] font-bold tracking-tight text-pastel-text">
            {m.value}
          </p>
          <p className="relative mt-1 text-sm font-medium text-pastel-text/70">{m.label}</p>
        </article>
      ))}
    </div>
  );
}
