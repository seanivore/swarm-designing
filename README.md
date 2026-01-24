# Homepage Light Experience

## Quick Start

```bash
npm install
npm run dev
```

Preview at http://localhost:3000

## The Spec

**Read `SWARM_SPEC.md` completely before starting.**

It contains:
- The design challenge
- Hard constraints
- Phase-by-phase tasks
- Cull criteria
- Running the swarm workflow

## Files to Edit

- `src/index.tsx` - Main component
- `src/index.css` - Global styles (if needed)
- `tailwind.config.js` - Custom utilities (if needed)

## Phase Markers

After completing each phase, create a marker:

```bash
touch .phase_1_complete  # After Foundation
touch .phase_2_complete  # After Interaction
touch .phase_3_complete  # After Material
touch .phase_4_complete  # After Polish
```

Human marks survivors between phases:

```bash
touch .survived_phase_1  # This agent continues to Phase 2
```

## Assets

- `/assets/media/pdf-viewer-bg-art-*.webp` - Background art options
- `/assets/font/AgencyFB-*.otf` - Custom font
