# Atna sidebar navigation

Date: 2026-07-14

## Goal
Replace the dummy pastel icon rail with the real Atna product sidebar and route map.

## Navigation
- Header: Atna logo (`/assets/logo-hex.svg`) + org name **QA Testing**
- **TRACKER** → Tracker `/`
- **GENERAL** → Customer Management `/customers`
- **INTELLI SUITE**
  - Intelli Hire `/hyre`
  - Case Management `/cases`
  - Workflow Builder `/workflows`
  - Support `/support`

## Shell
- `PastelShell` uses `AtnaSidebar` with ~240px left rail (md+)
- Dummy `PastelSidebar` removed
- Theme toggle retained at bottom of sidebar

## Out of scope (follow-ups)
Module page content from product pastes (org overview, fraud detector, workflows templates, etc.)
