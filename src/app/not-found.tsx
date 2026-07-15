import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold text-fg">404</h1>
      <p className="text-fg-muted">This page could not be found.</p>
      <Link
        href="/"
        className="rounded-xl bg-accent px-4 py-2 text-accent-fg transition hover:brightness-110"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
