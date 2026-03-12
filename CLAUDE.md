# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**auxiliary-ds** is the official design system for Auterion products. Built with Vue 3 (Composition API, `<script setup>`) and Vite.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally

## Architecture

- **Vue 3** with Composition API only (no Options API, no TypeScript, no JSX)
- **Vite** for bundling and dev server
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`)
- Entry point: `src/main.js` → mounts `App.vue` to `#app` in `index.html`
- Tailwind imported via `@import "tailwindcss"` in `src/style.css`
- Static assets in `public/` (served at root) and `src/assets/` (processed by Vite)

## Component Categories

Components are organized into four categories:

- **Foundation** — Primitives (buttons, inputs, typography, icons). The base building blocks shared across all other categories.
- **Marketing** — Brand and website components (hero sections, feature cards, CTAs). Designed for public-facing pages.
- **Application** — Conventional product UI components (dashboards, data tables, forms, navigation). Standard SaaS/product interfaces.
- **Operational** — Aerospace mission-critical interfaces following OpenBridge standards. Built for high-stakes environments requiring strict usability and safety conventions.
