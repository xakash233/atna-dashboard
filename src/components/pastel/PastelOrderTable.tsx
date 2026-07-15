"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const ORDERS = [
  {
    invoice: "#12304",
    customer: "Johan Deo",
    from: "London UK",
    price: "$123.00",
    status: "Process",
  },
  {
    invoice: "#12305",
    customer: "Emma Clarke",
    from: "Berlin DE",
    price: "$89.50",
    status: "Open",
  },
  {
    invoice: "#12306",
    customer: "Noah Kim",
    from: "Seoul KR",
    price: "$241.20",
    status: "Process",
  },
  {
    invoice: "#12307",
    customer: "Ava Patel",
    from: "Mumbai IN",
    price: "$66.00",
    status: "Open",
  },
] as const;

export function PastelOrderTable() {
  const [page, setPage] = useState(2);
  const [query, setQuery] = useState("");

  const filtered = ORDERS.filter(
    (o) =>
      o.customer.toLowerCase().includes(query.toLowerCase()) ||
      o.invoice.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="pastel-card flex h-full flex-col overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-[rgba(180,168,204,0.25)] p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-pastel-text">
          Order Status — Overview of latest month
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-xl bg-[#f0b6c8] px-3 py-2 text-xs font-semibold text-[#a85f76] shadow-sm transition hover:brightness-105"
          >
            Add
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-xl bg-[#f3eef9] text-pastel-muted transition hover:text-pastel-text"
            aria-label="Delete"
          >
            <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 4.5h10M6 4.5V3.5h4v1M5.5 4.5l.5 8h4l.5-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-xl bg-[#f3eef9] text-pastel-muted transition hover:text-pastel-text"
            aria-label="Info"
          >
            <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <label className="relative ml-1 min-w-[160px] flex-1 sm:flex-none">
            <span className="sr-only">Search orders</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-[rgba(180,168,204,0.4)] bg-[#faf8fc] px-3 py-2 text-sm text-pastel-text outline-none placeholder:text-pastel-muted focus:ring-2 focus:ring-pastel-lavender/40"
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-[#f7f3fb] text-[11px] font-semibold uppercase tracking-wide text-pastel-muted dark:bg-white/5">
              {["Invoice", "Customers", "From", "Price", "Status"].map((h) => (
                <th key={h} className="px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.invoice}
                className="table-row-premium border-t border-[rgba(180,168,204,0.2)]"
              >
                <td className="px-5 py-4 text-sm font-medium text-pastel-text">{row.invoice}</td>
                <td className="px-5 py-4 text-sm text-pastel-text">{row.customer}</td>
                <td className="px-5 py-4 text-sm text-pastel-muted">{row.from}</td>
                <td className="px-5 py-4 text-sm font-semibold text-pastel-text">{row.price}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold",
                      row.status === "Process"
                        ? "bg-[#f0b6c8]/45 text-[#a85f76]"
                        : "bg-[#d4c4f0]/55 text-[#6b4fa8]",
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex items-center justify-end gap-1.5 border-t border-[rgba(180,168,204,0.25)] px-5 py-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            className={cn(
              "grid size-8 place-items-center rounded-lg text-xs font-semibold transition",
              page === n
                ? "bg-[#f0b6c8] text-[#a85f76] shadow-sm"
                : "text-pastel-muted hover:bg-[#f3eef9] hover:text-pastel-text",
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}
