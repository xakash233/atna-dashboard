"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { CustomerMgmtData, CustomerMgmtOrg, CustomerMgmtTab } from "@/lib/api/customerManagement";
import { cn } from "@/lib/cn";

const TABS: { id: CustomerMgmtTab; label: string }[] = [
  { id: "overview", label: "Organization overview" },
  { id: "branch", label: "Manage branch" },
  { id: "users", label: "Manage users" },
  { id: "roles", label: "Manage roles" },
];

const MOCK_BRANCHES = [
  { name: "Central HQ", code: "CHQ-01", location: "Pandharpur, MH", manager: "Santhosh Kumar" },
  { name: "Pune Tech Lab", code: "PTL-02", location: "Pune, MH", manager: "Rohan K." },
  { name: "Mumbai Ops Hub", code: "MOH-03", location: "Mumbai, MH", manager: "Sneha A." },
];

const MOCK_USERS = [
  { name: "Santhosh Kumar", email: "santhoshatna@yopmail.com", role: "QA SuperAdmin" },
  { name: "Rohan K.", email: "rohan@yopmail.com", role: "QA Engineer" },
  { name: "Sneha A.", email: "sneha@yopmail.com", role: "Operations Lead" },
  { name: "Amit S.", email: "amit@yopmail.com", role: "Viewer" },
];

const MOCK_ROLES = [
  { name: "QA SuperAdmin", users: 1, permissions: "Full Access (All Modules)" },
  { name: "QA Engineer", users: 5, permissions: "Read/Write Cases, Tracker" },
  { name: "Operations Lead", users: 2, permissions: "Read/Write Customers" },
  { name: "Viewer", users: 4, permissions: "Read-only access" },
];

const cardShell =
  "rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300";

/** Dodger blue hover on grey surfaces */
const indigoHover =
  "hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:shadow-[0_8px_20px_-10px_rgba(30,144,255,0.35)]";
const indigoHoverShadowSoft =
  "hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16)]";
const indigoBar = "bg-[#1E90FF]";
const indigoLabelHover = "group-hover:text-[#1E90FF]";
const indigoActiveBorder = "border-[#1E90FF]/40 bg-white";
const indigoFocusRow =
  "translate-x-1 border-[#1E90FF]/40 bg-[#E8F4FF] shadow-[0_8px_20px_-10px_rgba(30,144,255,0.35)]";
const indigoUnderline =
  "absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-300 group-hover:scale-x-100";

function SummaryCards() {
  const items = [
    {
      id: "overview",
      label: "Organization",
      value: "1",
      hint: "Central level",
    },
    {
      id: "branch",
      label: "Branches",
      value: String(MOCK_BRANCHES.length),
      hint: "Registered sites",
    },
    {
      id: "users",
      label: "Users",
      value: String(MOCK_USERS.length),
      hint: "Workspace members",
    },
    {
      id: "roles",
      label: "Roles",
      value: String(MOCK_ROLES.length),
      hint: "Permission scopes",
    },
  ];

  return (
    <Stagger className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <StaggerItem key={item.id}>
          <article
            className={cn(
              cardShell,
              "group relative h-full w-full overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1",
              indigoHoverShadowSoft,
            )}
          >
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                indigoBar,
              )}
            />
            <p className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">{item.label}</p>
            <p className="mt-2 font-sans text-[22px] font-semibold leading-none text-[#0f172a] transition-transform duration-300 group-hover:scale-105">
              {item.value}
            </p>
            <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">{item.hint}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function OrganizationOverview({ org }: { org: CustomerMgmtOrg }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const fields = [
    { key: "name", label: "Organization name", value: org.name },
    { key: "code", label: "Organization code", value: org.code },
    { key: "level", label: "Organization level", value: org.level },
    { key: "parent", label: "Parent organization", value: org.parentOrganization },
    { key: "address", label: "Address", value: org.address, wide: true },
    { key: "date", label: "Created date", value: org.createdDate, wide: true },
  ];

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-3">
      <section className={cn(cardShell, "flex min-h-0 flex-1 flex-col p-4 sm:p-5")}>
        <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
              Organization overview
            </h2>
            <p className="mt-0.5 text-[9px] font-medium text-[#64748b]">
              Core identity and hierarchy details
            </p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-2.5 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.key}
              onMouseEnter={() => setHovered(field.key)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "group cursor-default rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5",
                indigoHover,
                field.wide && "sm:col-span-2",
                hovered === field.key && indigoActiveBorder,
              )}
            >
              <p className={cn("text-[9px] font-semibold uppercase tracking-wide text-[#94a3b8] transition-colors", indigoLabelHover)}>
                {field.label}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold text-[#0f172a]">{field.value}</p>
            </div>
          ))}

          <div
            onMouseEnter={() => setHovered("creator")}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "group cursor-default rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 sm:col-span-2",
              indigoHover,
              hovered === "creator" && indigoActiveBorder,
            )}
          >
            <p className={cn("text-[9px] font-semibold uppercase tracking-wide text-[#94a3b8] transition-colors", indigoLabelHover)}>
              Created by
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-[#1E90FF] text-[11px] font-bold text-white transition-transform duration-300 group-hover:scale-110">
                {org.createdByInitial}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#0f172a]">{org.createdByName}</p>
                <p className="text-[10px] font-medium text-[#64748b]">{org.createdByEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BranchPanel() {
  const [selected, setSelected] = useState<string | null>(MOCK_BRANCHES[0]?.code ?? null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className={cn(cardShell, "flex h-full min-h-0 flex-1 flex-col p-4 sm:p-5")}>
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Branches</h2>
          <p className="mt-0.5 text-[9px] font-medium text-[#64748b]">Select a branch to highlight details</p>
        </div>
        <button
          type="button"
          className="overflow-hidden rounded-full border-0 bg-[#1E90FF] px-4 py-2 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95"
        >
          + Add Branch
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-2.5 md:grid-cols-3">
        {MOCK_BRANCHES.map((b) => {
          // Hover wins: only one card highlighted at a time
          const active = (hovered ?? selected) === b.code;
          return (
            <button
              key={b.code}
              type="button"
              onClick={() => setSelected(b.code)}
              onMouseEnter={() => setHovered(b.code)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-1",
                active
                  ? "border-[#1E90FF]/50 bg-[#E8F4FF]/60 shadow-[0_10px_24px_-12px_rgba(30,144,255,0.35)]"
                  : "border-[#e2e8f0] bg-[#f8fafc]",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] font-semibold text-[#0f172a]">{b.name}</p>
              </div>
              <p className="mt-2 font-mono text-[10px] font-semibold text-[#1E90FF]">{b.code}</p>
              <p className="mt-2 text-[10px] font-medium text-[#64748b]">{b.location}</p>
              <p className="mt-1 text-[10px] font-semibold text-[#0f172a]">Mgr · {b.manager}</p>
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-300",
                  active && "scale-x-100",
                )}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function UsersPanel() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section className={cn(cardShell, "flex h-full min-h-0 flex-1 flex-col p-4 sm:p-5")}>
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
            Organization users
          </h2>
          <p className="mt-0.5 text-[9px] font-medium text-[#64748b]">Hover a row to spotlight the member</p>
        </div>
        <button
          type="button"
          className="overflow-hidden rounded-full border-0 bg-[#1E90FF] px-4 py-2 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95"
        >
          + Invite User
        </button>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col gap-2">
        {MOCK_USERS.map((u) => {
          const on = focused === u.email;
          return (
            <li
              key={u.email}
              onMouseEnter={() => setFocused(u.email)}
              onMouseLeave={() => setFocused(null)}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition-all duration-300",
                on
                  ? indigoFocusRow
                  : cn("border-[#e2e8f0] bg-[#f8fafc]", indigoHover),
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid size-8 place-items-center rounded-full text-[10px] font-bold transition-all duration-300",
                    on
                      ? "scale-110 bg-[#1E90FF] text-white"
                      : "bg-[#e2e8f0] text-[#475569]",
                  )}
                >
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f172a]">{u.name}</p>
                  <p className="text-[10px] font-medium text-[#64748b]">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#e2e8f0] bg-white px-2 py-0.5 text-[9px] font-semibold text-[#475569]">
                  {u.role}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function RolesPanel() {
  return (
    <section className={cn(cardShell, "flex h-full min-h-0 flex-1 flex-col p-4 sm:p-5")}>
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
            Role management
          </h2>
          <p className="mt-0.5 text-[9px] font-medium text-[#64748b]">Permission scopes across the workspace</p>
        </div>
        <button
          type="button"
          className="overflow-hidden rounded-full border-0 bg-[#1E90FF] px-4 py-2 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95"
        >
          + New Role
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-2.5 sm:grid-cols-2">
        {MOCK_ROLES.map((r) => (
            <article
              key={r.name}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 transition-all duration-300 hover:-translate-y-1",
                indigoHover,
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[12px] font-semibold text-[#0f172a]">{r.name}</p>
                <span className="rounded-full border border-[#e2e8f0] bg-white px-2 py-0.5 text-[9px] font-semibold text-[#475569]">
                  {r.users} users
                </span>
              </div>
              <p className="mt-2 text-[10px] font-medium leading-relaxed text-[#64748b]">{r.permissions}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", indigoBar)}
                  style={{ width: `${Math.min(r.users * 18, 100)}%` }}
                />
              </div>
              <div className={indigoUnderline} />
            </article>
          ))}
      </div>
    </section>
  );
}

export function CustomerManagementPage({ data }: { data: CustomerMgmtData }) {
  const [tab, setTab] = useState<CustomerMgmtTab>("overview");

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">General</p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Customer management
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#64748b]">
              Manage organization, user, roles
            </p>
          </div>
          <button
            type="button"
            className="inline-flex self-start items-center overflow-hidden rounded-full border-0 bg-[#1E90FF] px-5 py-2.5 text-[10px] font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95 sm:self-center"
          >
            Modify Settings
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <SummaryCards />
      </FadeIn>

      <FadeIn delay={0.08} className="flex min-h-0 flex-1 flex-col gap-3">
        <div
          role="tablist"
          aria-label="Customer management sections"
          className="grid w-full grid-cols-2 gap-1 rounded-xl border border-white/40 bg-white/25 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md sm:grid-cols-4"
        >
          {TABS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative z-10 w-full rounded-lg px-3 py-2.5 text-center text-[11px] font-semibold transition-colors duration-200",
                  active ? "text-[#0f172a]" : "text-[#64748b] hover:text-[#1E90FF]",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="customer-tab-pill"
                    className="absolute inset-0 -z-10 rounded-lg border border-white/50 bg-white/35 shadow-[0_4px_16px_-6px_rgba(15,23,42,0.12)] backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            {tab === "overview" && <OrganizationOverview org={data.org} />}
            {tab === "branch" && <BranchPanel />}
            {tab === "users" && <UsersPanel />}
            {tab === "roles" && <RolesPanel />}
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </div>
  );
}
