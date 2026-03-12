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
- Entry point: `src/main.js` → mounts `App.vue` to `#app` in `index.html`
- Components live in `src/components/`
- Static assets in `public/` (served at root) and `src/assets/` (processed by Vite)
