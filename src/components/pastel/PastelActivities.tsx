const ACTIVITIES = [
  {
    time: "10:30 AM",
    ago: "40 Mins Ago",
    title: "Task Updated",
    detail: "Nicole marked Stage 2 complete.",
    color: "bg-[#f0b6c8] text-[#c97a92]",
    icon: "check",
  },
  {
    time: "11:15 AM",
    ago: "28 Mins Ago",
    title: "Deal Added",
    detail: "New partnership deal with Acme.",
    color: "bg-[#d4c4f0] text-[#8b6fc2]",
    icon: "deal",
  },
  {
    time: "12:05 PM",
    ago: "18 Mins Ago",
    title: "Published Article",
    detail: "Q3 product roadmap is live.",
    color: "bg-[#9fd9c8] text-[#4f9a86]",
    icon: "doc",
  },
] as const;

function ActIcon({ name }: { name: string }) {
  if (name === "check") {
    return (
      <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 7.5 5.5 10l5.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "deal") {
    return (
      <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 8c1.5 2 6.5 2 8 0M4 5.5a2 2 0 1 1 0-.1M10 5.5a2 2 0 1 1 0-.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M4 2h5l3 3v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function PastelActivities() {
  return (
    <section className="pastel-card flex h-full flex-col p-6">
      <h2 className="text-base font-semibold text-pastel-text">Recent Activities</h2>

      <ul className="mt-5 flex flex-col gap-5">
        {ACTIVITIES.map((a) => (
          <li key={a.title} className="flex gap-3">
            <div className="flex w-16 shrink-0 flex-col">
              <span className="text-xs font-semibold text-pastel-text">{a.time}</span>
              <span className="text-[10px] text-pastel-muted">{a.ago}</span>
            </div>
            <div className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${a.color}`}>
              <ActIcon name={a.icon} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-pastel-text">{a.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-pastel-muted">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
