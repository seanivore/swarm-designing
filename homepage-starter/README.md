# Horvath Payments Homepage Design Starter

A minimal, self-contained React + Tailwind + Vite setup for designing the Horvath Payments login homepage.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## What to Design

You are redesigning the **login homepage** for a freelance payments portal. The current design is functional but needs to be elevated to an immersive, premium experience.

### Design Goal

**James Turrell-inspired immersive light experience** - Think of stepping into a dark, minimal room where there's a single glass panel floating in space, and your cursor is the moving light source.

### Key Design Elements

1. **Background Treatment**
   - Abstract art images available in `/assets/media/`
   - Should be heavily tinted, blurred, acting as atmospheric color
   - Deep, dark base (charcoal/near-black)

2. **Cursor Glow Effect** (THE MAIN CHARACTER)
   - Cursor carries a strong, soft-edged light blob
   - Brightest element on screen
   - Localized lighting - only parts near cursor glow intensely
   - Should feel liquid, jelly-like, with soft bloom

3. **Login Card**
   - Boxy, squarish, chunky glass frame
   - Post-glassmorphism: thick, reflective, refractive glass slab
   - Borders should refract light when glow passes behind
   - Heavy glare across surfaces

4. **Color Palette**
   - Mauve: `#C99CAD` (primary accent, glow core)
   - Blue: `#8FA9B3` (secondary, glow falloff)
   - Terracotta: `#C9A68A` (tertiary)
   - Primary: `#9C528B` (deep pink/purple)

### Files to Edit

- `src/index.tsx` - Main component (all design code lives here)
- `src/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind customizations

### Available Assets

- `/assets/media/pdf-viewer-bg-art-1.webp` - Background art option 1
- `/assets/media/pdf-viewer-bg-art-2.webp` - Background art option 2
- `/assets/media/pdf-viewer-bg-art-3.webp` - Background art option 3
- Agency FB font (already configured in CSS)

### Form Fields (Do Not Change Functionality)

- Last Name input
- Project Keyword input
- Submit button ("Access Portal")
- Help link at bottom

The form is mocked for design preview - it won't actually log in anywhere.

## Design Requirements

- The visual complexity should come from **light and material**, not layout
- Layout remains minimal: one card, headline, two fields, one button
- The experience before typing anything should already communicate care and craft
- Should feel like a small "infinite room" of light built solely around this payment moment

## Stack

- React 19
- Tailwind CSS 3.4
- Vite 7
- TypeScript
