"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import { motion } from "motion/react";
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
  { name: "Central HQ", code: "CHQ-01", location: "Pandharpur, MH", manager: "Santhosh Kumar", status: "Active" },
  { name: "Pune Tech Lab", code: "PTL-02", location: "Pune, MH", manager: "Rohan K.", status: "Active" },
  { name: "Mumbai Ops Hub", code: "MOH-03", location: "Mumbai, MH", manager: "Sneha A.", status: "Active" }
];

const MOCK_USERS = [
  { name: "Santhosh Kumar", email: "santhoshatna@yopmail.com", role: "QA SuperAdmin", status: "Active" },
  { name: "Rohan K.", email: "rohan@yopmail.com", role: "QA Engineer", status: "Active" },
  { name: "Sneha A.", email: "sneha@yopmail.com", role: "Operations Lead", status: "Active" },
  { name: "Amit S.", email: "amit@yopmail.com", role: "Viewer", status: "Inactive" }
];

const MOCK_ROLES = [
  { name: "QA SuperAdmin", users: 1, permissions: "Full Access (All Modules)" },
  { name: "QA Engineer", users: 5, permissions: "Read/Write Cases, Tracker" },
  { name: "Operations Lead", users: 2, permissions: "Read/Write Customers" },
  { name: "Viewer", users: 4, permissions: "Read-only access" }
];

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 border-b border-[rgba(180,168,204,0.2)] py-4 last:border-0 sm:border-0 sm:py-0">
      <p className="text-xs font-medium text-pastel-muted">{label}</p>
      <div className="text-sm font-semibold text-pastel-text">{children}</div>
    </div>
  );
}

function OrganizationOverview({ org }: { org: CustomerMgmtOrg }) {
  return (
    <section className="pastel-card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-pastel-text">Organization overview</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DetailField label="Organization name">{org.name}</DetailField>
        <DetailField label="Organization code">{org.code}</DetailField>
        <DetailField label="Organization level">{org.level}</DetailField>
        <DetailField label="Parent organization">{org.parentOrganization}</DetailField>
        <div className="sm:col-span-2">
          <DetailField label="Address">{org.address}</DetailField>
        </div>
        <DetailField label="Created by">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-pastel-lavender/50 text-sm font-bold text-pastel-text">
              {org.createdByInitial}
            </div>
            <div>
              <p className="font-semibold text-pastel-text">{org.createdByName}</p>
              <p className="text-xs font-normal text-pastel-muted">{org.createdByEmail}</p>
            </div>
          </div>
        </DetailField>
        <DetailField label="Created date">{org.createdDate}</DetailField>
      </div>
    </section>
  );
}

export function CustomerManagementPage({ data }: { data: CustomerMgmtData }) {
  const [tab, setTab] = useState<CustomerMgmtTab>("overview");

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
              General
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              Customer management
            </h1>
            <p className="mt-1 text-sm text-pastel-muted">Manage organization, user, roles</p>
          </div>
          <AnimatedButton type="button" className="btn-premium px-4 py-2.5 text-xs font-semibold self-start sm:self-center">
            Modify Settings
          </AnimatedButton>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div
            role="tablist"
            aria-label="Customer management sections"
            className="flex flex-wrap gap-2 rounded-xl bg-surface-muted/50 p-1 border border-border/10 w-fit"
          >
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <AnimatedButton
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer z-10",
                    active ? "text-pastel-text" : "text-pastel-muted hover:text-pastel-text",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="customer-tab-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm dark:bg-pastel-card"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </AnimatedButton>
              );
            })}
          </div>
        </StaggerItem>

        <StaggerItem>
          {tab === "overview" && <OrganizationOverview org={data.org} />}
          
          {tab === "branch" && (
            <section className="pastel-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-pastel-text">Branches</h2>
                <AnimatedButton type="button" className="rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">
                  + Add Branch
                </AnimatedButton>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/15 text-pastel-muted">
                      <th className="pb-3 font-semibold">Name</th>
                      <th className="pb-3 font-semibold">Code</th>
                      <th className="pb-3 font-semibold">Location</th>
                      <th className="pb-3 font-semibold">Manager</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/10">
                    {MOCK_BRANCHES.map((b) => (
                      <tr key={b.code} className="table-row-premium">
                        <td className="py-3 font-medium text-pastel-text">{b.name}</td>
                        <td className="py-3 font-mono text-xs text-pastel-muted">{b.code}</td>
                        <td className="py-3 text-pastel-text">{b.location}</td>
                        <td className="py-3 text-pastel-text">{b.manager}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === "users" && (
            <section className="pastel-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-pastel-text">Organization Users</h2>
                <AnimatedButton type="button" className="rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">
                  + Invite User
                </AnimatedButton>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/15 text-pastel-muted">
                      <th className="pb-3 font-semibold">Name</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/10">
                    {MOCK_USERS.map((u) => (
                      <tr key={u.email} className="table-row-premium">
                        <td className="py-3 font-medium text-pastel-text">{u.name}</td>
                        <td className="py-3 text-pastel-muted">{u.email}</td>
                        <td className="py-3 text-pastel-text">{u.role}</td>
                        <td className="py-3">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                            u.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400"
                          )}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === "roles" && (
            <section className="pastel-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-pastel-text">Role Management</h2>
                <AnimatedButton type="button" className="rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">
                  + New Role
                </AnimatedButton>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/15 text-pastel-muted">
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Assigned Users</th>
                      <th className="pb-3 font-semibold">Scope / Permissions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/10">
                    {MOCK_ROLES.map((r) => (
                      <tr key={r.name} className="table-row-premium">
                        <td className="py-3 font-medium text-pastel-text">{r.name}</td>
                        <td className="py-3 text-pastel-text">{r.users} users</td>
                        <td className="py-3 text-pastel-muted">{r.permissions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </StaggerItem>
      </Stagger>
    </div>
  );
}
