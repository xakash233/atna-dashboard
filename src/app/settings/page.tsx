import { CURRENT_USER, ORGANIZATION } from "@/lib/constants";

export default function SettingsPage() {
  return (
    <section className="rounded-[22px] border border-border bg-surface p-10 backdrop-blur-xl">
      <h1 className="text-xl text-fg">Settings</h1>
      <p className="mt-2 text-fg-muted">
        Profile and organization metadata from content source.
      </p>
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-fg-muted">User</dt>
          <dd className="text-fg">
            {CURRENT_USER.displayName} · {CURRENT_USER.role}
          </dd>
        </div>
        <div>
          <dt className="text-fg-muted">Email</dt>
          <dd className="text-fg">{CURRENT_USER.email}</dd>
        </div>
        <div>
          <dt className="text-fg-muted">Organization</dt>
          <dd className="text-fg">
            {ORGANIZATION.name} ({ORGANIZATION.code})
          </dd>
        </div>
        <div>
          <dt className="text-fg-muted">Country</dt>
          <dd className="text-fg">{ORGANIZATION.country}</dd>
        </div>
      </dl>
    </section>
  );
}
