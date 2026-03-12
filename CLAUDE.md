# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds** is the official design system for Auterion products. Built with Vue 3 (Composition API, `<script setup>`) and Vite.

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build locally

## Architecture

- **Vue 3** with Composition API only (no Options API, no TypeScript, no JSX)
- **Vite** for bundling and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`)
- **Vue Router** for docs app navigation (`src/router/index.js`)
- **Fonts:** Inter Variable (UI), JetBrains Mono (code/data) via Google Fonts
- Entry point: `src/main.js` → mounts `App.vue` to `#app` in `index.html`
- Tailwind imported via `@import "tailwindcss"` in `src/style.css`
- Dark mode is primary, controlled via `data-theme="dark"` on `<html>`
- Docs app: `src/docs/DocsLayout.vue` (sidebar + content), pages in `src/docs/pages/`
- Static assets in `public/` (served at root) and `src/assets/` (processed by Vite)

## Component Categories

Components are organized into four categories:

- **Foundation** — Primitives (buttons, inputs, typography, icons). The base building blocks shared across all other categories.
- **Marketing** — Brand and website components (hero sections, feature cards, CTAs). Designed for public-facing pages.
- **Application** — Conventional product UI components (dashboards, data tables, forms, navigation). Standard SaaS/product interfaces.
- **Operational** — Aerospace mission-critical interfaces following OpenBridge standards. Built for high-stakes environments requiring strict usability and safety conventions.
