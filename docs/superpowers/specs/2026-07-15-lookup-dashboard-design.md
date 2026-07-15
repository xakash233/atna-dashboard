# Lookup dashboard (home)

Date: 2026-07-15

## Goal
Replace the home page (`/`) Tracker content with the Atna **digital look-up dashboard** UI from the product screenshot. Keep the existing app shell and all other routes unchanged. Layout-first with static/mock data; wire APIs and interactions in a follow-up.

## Scope
- **In:** Home page only — visual match of screenshot sections (header, hero CTA, metrics, region, type, branch, recent activities, rules)
- **Out:** Real APIs, button navigation, date filtering, map interaction, changes to sidebar/top bar, deletion of other routes

## Approach
Single dedicated component (`LookupDashboard`) rendered from `src/app/page.tsx` inside existing `PastelShell`. Mock data inline. Do not repurpose Pastel/Tracker widgets.

## Layout
1. **Header** — Title “Dashboard”, subtitle “Monitor your system performance and key metrics”, “Current month” date control (non-functional)
2. **Hero CTA** — Teal/cyan gradient card: “Start your digital look up”, template download link text, “Single look up” and “Bulk look up” buttons (visual only)
3. **Metric row** — Four cards: Total look ups, Safe signals found, Mid signals found, Risk signals found — values `0`, trend badges, “Compared to previous month”
4. **Main grid**
   - **Left (~70%):** Look up by region (South Asia–focused map placeholder), Look up by type (Email / Phone), Look up by Branch (QAAA QA Testing, `0`, `-4 ↓`)
   - **Right (~30%):** Recent activities, Rules list

## Static content (from screenshot)
- **Activities:** Tru-Doc look up completed (×4); New user added (`santhoshatna@yopmail.com`)
- **Rules:** email_is_disposable, email_parsed_name_is_valid (×2), email_has_company, email_education — each with red down indicator

## Files
- **New:** `src/components/dashboard/LookupDashboard.tsx` (section helpers co-located as needed)
- **Change:** `src/app/page.tsx` — render `LookupDashboard` instead of `TrackerPage`
- **Unchanged:** `PastelShell`, sidebar, top bar, other routes (`/customers`, `/hyre/*`, `/cases`, etc.)

## Visual
Match screenshot: light gray page background, white cards with subtle shadow/border and ~8–12px radius, teal hero gradient, green/red trend badges, thin-stroke icons. Preserve existing shell chrome (sidebar + top bar) even though the screenshot shows a minimal header.

## Follow-ups
- Hook metrics, region, type, branch, activities, and rules to APIs
- Wire Single/Bulk look up and template download actions
- Enable date range filtering
