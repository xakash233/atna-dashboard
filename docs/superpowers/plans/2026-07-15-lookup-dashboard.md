# Lookup Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace home page (`/`) Tracker content with a static digital look-up dashboard matching the product screenshot, inside the existing PastelShell.

**Architecture:** One client component `LookupDashboard` holds layout + mock data inline. `src/app/page.tsx` renders it instead of `TrackerPage`. Shell (sidebar/top bar) and other routes stay unchanged. No API wiring in this plan.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, existing pastel design tokens (`pastel-card`, `pastel-text`, etc.), optional `FadeIn`/`Stagger` from `@/components/ui/Motion`.

## Global Constraints

- Home page only — do not delete or blank other routes
- Keep `PastelShell` / sidebar / top bar
- Static/mock data only — buttons and date picker are non-functional (`type="button"`, no navigation)
- Match screenshot copy exactly (titles, activities, rules text)
- Do not repurpose `PastelDashboard` / `TrackerPage` widgets
- No new test framework — verify with content checks, `npm run lint`, and `npm run build`
- Prefer existing tokens: `bg-pastel-bg`, `text-pastel-text`, `text-pastel-muted`, `pastel-card`, `--bolt-positive-*`, `--bolt-negative-*`

## File Structure

| File | Responsibility |
|------|----------------|
| `src/components/dashboard/LookupDashboard.tsx` | Full dashboard UI + inline mock data + section helpers |
| `src/app/page.tsx` | Renders `<LookupDashboard />` (no Tracker fetch) |

Unchanged: `PastelShell`, sidebar, top bar, other `src/app/**` routes, Tracker components (leave on disk).

---

### Task 1: Scaffold LookupDashboard and wire home page

**Files:**
- Create: `src/components/dashboard/LookupDashboard.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: none
- Produces: `export function LookupDashboard(): JSX.Element`

- [ ] **Step 1: Create the dashboard component with header + hero**

Create `src/components/dashboard/LookupDashboard.tsx`:

```tsx
"use client";

import { FadeIn } from "@/components/ui/Motion";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h10M10 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LookupDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-pastel-muted">
              Monitor your system performance and key metrics
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-[rgba(17,24,39,0.08)] bg-pastel-card px-3 py-2 text-sm text-pastel-text shadow-sm"
          >
            <CalendarIcon className="size-4 text-pastel-muted" />
            Current month
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="rounded-2xl bg-gradient-to-r from-[#d8f5f0] via-[#c8f0ef] to-[#b8ebea] p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-pastel-text sm:text-2xl">
            Start your digital look up
          </h2>
          <p className="mt-2 text-sm text-pastel-muted">
            <span className="cursor-pointer font-medium text-[#1e75ff] underline underline-offset-2">
              Click here
            </span>{" "}
            to download template for bulk upload.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-pastel-text px-5 py-2.5 text-sm font-medium text-white"
            >
              Single look up
              <span className="grid size-6 place-items-center rounded-full bg-white/15">
                <ArrowRightIcon className="size-3.5" />
              </span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-pastel-text/20 bg-white px-5 py-2.5 text-sm font-medium text-pastel-text"
            >
              Bulk look up
              <ArrowRightIcon className="size-3.5" />
            </button>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
```

- [ ] **Step 2: Wire the home page**

Replace `src/app/page.tsx` entirely with:

```tsx
import { LookupDashboard } from "@/components/dashboard/LookupDashboard";

export default function HomePage() {
  return <LookupDashboard />;
}
```

- [ ] **Step 3: Verify home page no longer fetches Tracker**

Run: `rg "TrackerPage|fetchTrackerDashboard" src/app/page.tsx`
Expected: no matches

Run: `rg "LookupDashboard|Start your digital look up" src/app/page.tsx src/components/dashboard/LookupDashboard.tsx`
Expected: matches in both files for `LookupDashboard`; hero title in the component file

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/LookupDashboard.tsx src/app/page.tsx
git commit -m "$(cat <<'EOF'
Replace home Tracker page with lookup dashboard scaffold.

EOF
)"
```

---

### Task 2: Metric cards row

**Files:**
- Modify: `src/components/dashboard/LookupDashboard.tsx`

**Interfaces:**
- Consumes: `LookupDashboard` from Task 1
- Produces: metrics section inside `LookupDashboard` with labels Total look ups, Safe signals found, Mid signals found, Risk signals found

- [ ] **Step 1: Add metrics mock data and TrendBadge helper**

Above `export function LookupDashboard`, add:

```tsx
const METRICS = [
  {
    label: "Total look ups",
    value: "0",
    delta: "0",
    direction: "up" as const,
    tone: "positive" as const,
    icon: "search" as const,
  },
  {
    label: "Safe signals found",
    value: "0",
    delta: "0",
    direction: "down" as const,
    tone: "negative" as const,
    icon: "shield" as const,
  },
  {
    label: "Mid signals found",
    value: "0",
    delta: "0",
    direction: "down" as const,
    tone: "negative" as const,
    icon: "alert" as const,
  },
  {
    label: "Risk signals found",
    value: "0",
    delta: "0",
    direction: "up" as const,
    tone: "positive" as const,
    icon: "risk" as const,
  },
] as const;

function TrendBadge({
  delta,
  direction,
  tone,
}: {
  delta: string;
  direction: "up" | "down";
  tone: "positive" | "negative";
}) {
  const isPositive = tone === "positive";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
        isPositive
          ? "bg-[var(--bolt-positive-bg)] text-[var(--bolt-positive-text)]"
          : "bg-[var(--bolt-negative-bg)] text-[var(--bolt-negative-text)]"
      }`}
    >
      {delta} {direction === "up" ? "↑" : "↓"}
    </span>
  );
}

function MetricIcon({ name }: { name: (typeof METRICS)[number]["icon"] }) {
  const c = "size-4";
  if (name === "search") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 2.5 15.5 5v4.5c0 3.5-2.3 5.8-5.5 7-3.2-1.2-5.5-3.5-5.5-7V5L10 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (name === "alert") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 3 17.5 16.5h-15L10 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Render the metrics row under the hero**

Inside `LookupDashboard`, after the hero `</FadeIn>`, add:

```tsx
      <FadeIn delay={0.08}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((m) => (
            <article key={m.label} className="pastel-card p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-pastel-muted">{m.label}</p>
                <span className="grid size-8 place-items-center rounded-full bg-[#eef7f5] text-[#0d9488]">
                  <MetricIcon name={m.icon} />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <p className="text-[28px] font-bold tracking-tight text-pastel-text">{m.value}</p>
                <TrendBadge delta={m.delta} direction={m.direction} tone={m.tone} />
              </div>
              <p className="mt-2 text-xs text-pastel-muted">Compared to previous month</p>
            </article>
          ))}
        </div>
      </FadeIn>
```

- [ ] **Step 3: Verify metric copy**

Run: `rg "Total look ups|Safe signals found|Mid signals found|Risk signals found|Compared to previous month" src/components/dashboard/LookupDashboard.tsx`
Expected: all five strings present

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/LookupDashboard.tsx
git commit -m "$(cat <<'EOF'
Add lookup dashboard metric cards with static trends.

EOF
)"
```

---

### Task 3: Main grid — region, type, branch, activities, rules

**Files:**
- Modify: `src/components/dashboard/LookupDashboard.tsx`

**Interfaces:**
- Consumes: `LookupDashboard` with header/hero/metrics
- Produces: complete screenshot layout sections inside one main grid

- [ ] **Step 1: Add mock data for activities, rules, and remaining helpers**

Above `export function LookupDashboard`, add:

```tsx
const ACTIVITIES = [
  {
    title: "Tru-Doc look up completed",
    description: "Document look up has been processed and marked complete.",
    kind: "success" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up has been processed and marked complete.",
    kind: "success" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up has been processed and marked complete.",
    kind: "success" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up has been processed and marked complete.",
    kind: "success" as const,
  },
  {
    title: "New user added",
    description: "santhoshatna@yopmail.com has been added to your organization workspace.",
    kind: "user" as const,
  },
] as const;

const RULES = [
  "When email_is_disposable is equal to tr...",
  "When email_parsed_name_is_valid is e...",
  "When email_parsed_name_is_valid is e...",
  "When email_has_company is equal to tr...",
  "When email_education is equal to true, ...",
] as const;

function RegionMapPlaceholder() {
  return (
    <div className="relative mt-4 h-[220px] overflow-hidden rounded-xl bg-[#f3faf8] sm:h-[260px]">
      <svg viewBox="0 0 560 280" className="size-full opacity-80" aria-hidden>
        <path
          fill="#c5ddd6"
          d="M180 40c40-20 90-10 120 20 40 40 30 90 10 130-15 30-50 50-90 45-50-5-90-40-100-85-10-40 10-90 60-110Z"
        />
        <path
          fill="#b4d2c9"
          d="M300 70c35-15 80 0 100 35 25 45 10 95-20 120-25 20-65 25-95 10-40-20-50-70-30-110 10-20 25-40 45-55Z"
        />
        <path
          fill="#a8c9bf"
          d="M120 150c30-25 70-20 95 5 20 20 25 55 5 80-25 30-75 35-105 10-25-20-30-55-10-80 5-5 10-10 15-15Z"
        />
        <circle cx="250" cy="140" r="5" fill="#0d9488" />
        <circle cx="320" cy="120" r="4" fill="#0d9488" />
        <circle cx="200" cy="180" r="3.5" fill="#0d9488" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Render the two-column main grid after metrics**

Append after the metrics `</FadeIn>`:

```tsx
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="flex flex-col gap-5 xl:col-span-8">
            <article className="pastel-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-pastel-text">Look up by region</h3>
              <RegionMapPlaceholder />
            </article>

            <article className="pastel-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-pastel-text">Look up by type</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-[#f3faf8] px-4 py-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m3.5 6.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <p className="text-sm text-pastel-text">
                    Email has <span className="font-semibold">0</span> look ups
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#f3faf8] px-4 py-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#e0f2fe] text-[#0284c7]">
                    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M6.5 3.5h2l1 4-2 1.5a10 10 0 0 0 4.5 4.5l1.5-2 4 1v2a2 2 0 0 1-2 2A12.5 12.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-sm text-pastel-text">
                    Phone has <span className="font-semibold">0</span> look ups
                  </p>
                </div>
              </div>
            </article>

            <article className="pastel-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-pastel-text">Look up by Branch</h3>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[rgba(17,24,39,0.06)] pt-4">
                <p className="text-sm font-medium text-pastel-text">QAAA QA Testing</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-pastel-text">0</span>
                  <span className="inline-flex items-center rounded-full bg-[var(--bolt-negative-bg)] px-2 py-0.5 text-xs font-medium text-[var(--bolt-negative-text)]">
                    -4 ↓
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="flex flex-col gap-5 xl:col-span-4">
            <article className="pastel-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-pastel-text">Recent activities</h3>
              <ul className="mt-4 flex flex-col gap-4">
                {ACTIVITIES.map((a, i) => (
                  <li key={`${a.title}-${i}`} className="flex gap-3">
                    <span
                      className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${
                        a.kind === "success"
                          ? "bg-[var(--bolt-positive-bg)] text-[var(--bolt-positive-text)]"
                          : "bg-[#eef2ff] text-[#4f46e5]"
                      }`}
                    >
                      {a.kind === "success" ? (
                        <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path
                            d="M5 10.5 8.5 14 15 6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M4.5 16.5c1.5-3 9.5-3 11 0"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-pastel-text">{a.title}</p>
                      <p className="mt-0.5 text-xs text-pastel-muted">{a.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <article className="pastel-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-pastel-text">Rules list</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {RULES.map((rule, i) => (
                  <li
                    key={`${rule}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(17,24,39,0.06)] px-3 py-2.5"
                  >
                    <p className="truncate text-sm text-pastel-text">{rule}</p>
                    <span className="shrink-0 text-sm font-medium text-[var(--bolt-negative-text)]">↓</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </FadeIn>
```

- [ ] **Step 3: Verify all screenshot section titles exist**

Run:

```bash
rg "Look up by region|Look up by type|Look up by Branch|Recent activities|Rules list|QAAA QA Testing|Tru-Doc look up completed|email_is_disposable|santhoshatna@yopmail.com" src/components/dashboard/LookupDashboard.tsx
```

Expected: all listed strings present

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/LookupDashboard.tsx
git commit -m "$(cat <<'EOF'
Add lookup dashboard region, type, branch, activities, and rules.

EOF
)"
```

---

### Task 4: Lint, build, and visual smoke check

**Files:**
- Verify only (no intended code changes unless lint/build fails)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: exit 0 (fix any new issues in `LookupDashboard.tsx` / `page.tsx` only)

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: successful Next.js production build; `/` route compiles

- [ ] **Step 3: Visual checklist against screenshot (dev server)**

Run: `npm run dev` and open `http://localhost:3000`

Confirm on `/`:
1. Header: Dashboard + subtitle + Current month
2. Teal hero with Single / Bulk look up
3. Four metric cards at 0
4. Region map placeholder, Email/Phone type rows, Branch QAAA QA Testing
5. Recent activities (4 Tru-Doc + New user) and Rules list with ↓
6. Sidebar / top bar still present; `/customers` still loads

- [ ] **Step 4: Commit only if fixes were needed**

If Step 1–3 required code fixes:

```bash
git add src/components/dashboard/LookupDashboard.tsx src/app/page.tsx
git commit -m "$(cat <<'EOF'
Fix lookup dashboard lint/build and visual polish.

EOF
)"
```

If no fixes, skip this commit.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Header + Current month | Task 1 |
| Hero CTA + buttons (visual only) | Task 1 |
| Four metric cards | Task 2 |
| Look up by region / type / branch | Task 3 |
| Recent activities + Rules list | Task 3 |
| Wire `page.tsx`, keep shell/other routes | Task 1 + Task 4 checklist |
| Static only / no APIs | All tasks |
| Follow existing pastel tokens | Tasks 1–3 |

No placeholders left. Types consistent (`METRICS`/`ACTIVITIES`/`RULES` const arrays). Tracker components intentionally left unused on disk.
