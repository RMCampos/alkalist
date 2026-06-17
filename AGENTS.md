# AGENTS.md - AlkaList Project Guide

This document helps AI agents work effectively in the AlkaList codebase.

## Project Overview

AlkaList is a Portuguese-language web application for tracking alkaline and acidic foods for the alkaline diet. It's a single-page Next.js app with a searchable food database and filtering capabilities.

**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

---

## Essential Commands

```bash
# Development
npm run dev              # Start development server on localhost:3000

# Build & Deploy
npm run build            # Build static export to ./out (GitHub Pages)
npm run start            # Serve production build locally

# Linting
npm run lint             # Run Next.js ESLint
```

**Build Configuration:**
- Static export enabled (`output: 'export'` in `next.config.ts`)
- Production URLs are prefixed with `/alkalist` (for GitHub Pages hosting)
- Static assets served from `/alkalist/` in production

---

## Code Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main search/filter page (client component)
│   ├── layout.tsx         # Root layout with Geist fonts, dark mode
│   ├── globals.css        # Tailwind v4 theme tokens (CSS-first config)
│   └── food-complete-list.ts  # Food data array (extends over time)
├── components/ui/         # shadcn/ui components (auto-generated)
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── radio-group.tsx
│   └── separator.tsx
├── lib/
│   └── utils.ts           # cn() helper for Tailwind class merging
└── types/
    └── food.ts            # Food type definitions

public/
├── icons/                 # UI icons
└── alkalist/             # Static assets (favicon, manifest, OG image)
```

---

## Architecture & Patterns

### App Structure
- **Single-page application** - All functionality in `page.tsx` (search, filter, modal dialog)
- **Client-side rendering** - `page.tsx` uses `'use client'` for React state/interactivity
- **Static data** - Food list lives in `food-complete-list.ts`, imported directly

### Data Model
```typescript
type FoodType = 'alkaline' | 'acid' | 'treatment'

type Food = {
  name: string
  type: FoodType
  comment: string           // Health benefits/description
  link?: string            // Optional external reference link
}
```

- `alkaline` - Foods to encourage (green text in UI)
- `acid` - Foods to limit (red text in UI)
- `treatment` - Foods to avoid during "cleanse/limpeza" period

### UI Patterns
- **shadcn/ui components** - Accesible, unstyled primitives (Radix-based)
- **Tailwind v4** - CSS-first configuration via `@theme` in `globals.css`
- **Dark mode** - Hardcoded in `layout.tsx`: `<html className="dark">` (no toggle)
- **CSS variables** - Theme tokens defined in `:root` and `.dark` blocks

### Base Path Handling
When referencing images or assets in production, use pattern from `page.tsx:34`:
```typescript
const basePath = process.env.NODE_ENV === 'production' ? '/alkalist' : ''
// Then: `${basePath}/icons/info-icon.png`
```

---

## Component Conventions

### shadcn/ui Components
- Generated via CLI (not hand-written)
- Use `cn()` from `@/lib/utils` for class merging
- Follow compound component pattern (e.g., `Card`, `CardContent`, `CardHeader`)
- Props use `React.ComponentProps<"div">` pattern

### Adding New shadcn Components
```bash
# Example: npx shadcn@latest add button
# This updates components.json and creates src/components/ui/button.tsx
```

### Class Variance Authority (CVA)
Used in UI components for variant styling. See `card.tsx` for example usage.

---

## Styling System

### Tailwind v4 Setup
- Config is **CSS-first** - no `tailwind.config.js` needed
- Theme tokens defined in `globals.css` using `@theme inline`
- Colors use OKLCH format (e.g., `oklch(0.145 0 0)`)

### Key Classes
- `bg-background` / `text-foreground` - Root theme colors
- `text-green-600` - Alkaline food indicators
- `text-red-500` - Acid food indicators
- `text-muted-foreground` - Secondary text

### Custom Variants
- `@custom-variant dark (&:is(.dark *))` - Dark mode selector

---

## State Management

Simple React state (no external libraries):

```typescript
const [query, setQuery] = useState<string>("")           // Search text
const [filter, setFilter] = useState<string>("everything") // Radio filter
const [selectedFood, setSelectedFood] = useState<Food | null>(null) // Modal
```

---

## Testing Approach

**No test suite currently configured.** Project is small and manually tested.

If adding tests:
- Use Vitest or Jest with React Testing Library
- Test filtering logic in `page.tsx` (primary business logic)
- Test food data structure compliance

---

## CI/CD & Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Triggers on `main` branch push
- Node.js 20
- Deploys to GitHub Pages using `peaceiris/actions-gh-pages@v4`
- Output directory: `./out`

### Critical Deployment Notes
- `basePath`, `assetPrefix`, and `images.unoptimized` are set in `next.config.ts`
- Static assets must be in `public/alkalist/` for production paths to work
- Repository must have GitHub Pages enabled

---

## Common Tasks

### Adding New Foods
Edit `src/app/food-complete-list.ts`:
```typescript
{ name: "Food Name", type: "alkaline", comment: "Description", link: "https://..." }
```

### Adding New UI Components
```bash
npx shadcn@latest add [component-name]
# Refer to https://ui.shadcn.com/docs/components
```

### Updating Theme Colors
Modify `globals.css` `:root` and `.dark` blocks. Colors cascade automatically via CSS variables.

### Updating Metadata
Edit `layout.tsx` `metadata` object for SEO, Open Graph, icons, and manifest.

---

## Gotchas & Notes

1. **Static Export Only** - Cannot use API routes or server-side features. Everything is pre-rendered at build time.

2. **Image Optimization** - Disabled (`images.unoptimized: true`). Images served as-is from `public/`.

3. **Portuguese Content** - UI text and food data are in Portuguese.

4. **Hardcoded Dark Mode** - No theme toggle. Always uses `.dark` class.

5. **Food Data Duplication** - Some foods appear in both `treatment` and `acid` categories (e.g., coffee, alcohol). This is intentional for the diet logic.

6. **No Backend** - This is a purely client-side application. No database, no auth, no API calls.

7. **Path Aliases** - Use `@/` prefix for imports (configured in `tsconfig.json`)

---

## Dependencies to Know

| Package | Purpose |
|---------|---------|
| `next` | Framework (v15 with App Router) |
| `react` | UI library (v19) |
| `tailwindcss` | Styling (v4, CSS-first) |
| `@radix-ui/*` | Headless UI primitives (via shadcn) |
| `lucide-react` | Icons |
| `class-variance-authority` | Component variant styling |
| `clsx` + `tailwind-merge` | Conditional class names |

---

## File Templates

### New shadcn Component
Components follow this structure (auto-generated):
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

function Component({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="component-name"
      className={cn("base-classes", className)}
      {...props}
    />
  )
}

export { Component }
```

### New Food Type Extension
If adding fields to `Food` type, update:
1. `src/types/food.ts` - Type definition
2. `src/app/food-complete-list.ts` - All entries
3. `src/app/page.tsx` - UI to display new field (if needed)
