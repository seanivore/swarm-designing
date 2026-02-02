# Gallery Website Architecture

Architecture documentation for `swarms.august.style` — a showcase website for curated design swarm outputs.

---

## Overview

  * **Purpose**: display the best outputs from design swarms as an interactive gallery
  * **Pattern**: similar to `august.style` portfolio — JSON-driven, 404-routed, minimal infrastructure

  + No build step required
  + Add batches by creating JSON files
  + Deliverables served directly from swarm directories

---

## URL Structure

```
swarms.august.style/                       → Homepage (all batches)
swarms.august.style/<batch>/               → Batch view (all agents in batch)
swarms.august.style/<batch>/<agent>/       → Agent deliverable (iframe or redirect)
```

  * **Homepage**: grid of batch thumbnails, each with random agent preview cycling
  * **Batch view**: all agents from a swarm displayed, with winner featured
  * **Agent view**: the actual deliverable rendered or redirected to

---

## JSON Schemas

### SWARM_BATCH.json (Per Batch)

Each batch gets a JSON file in `/data/batches/<batch-id>.json`:

```json
{
  "batch_id": "payments-site-homepage",
  "name": "Homepage Light Experience",
  "date": "2026-01-29",
  "spec_summary": "Login page where light is the main character",
  "spec_path": "swarms/payments-site-homepage/homepage-starter/SWARM_SPEC.md",
  "seo_title": "Light Experience Login - Design Swarm",
  "seo_description": "Six AI agents explore cursor-following light as the hero of a login page.",
  "color_scheme": {
    "primary": "#9C528B",
    "secondary": "#8FA9B3",
    "background": "#1f1f1f"
  },
  "tags": ["interactive", "light", "login", "cursor-follow"],
  "agents": [
    {
      "id": "agent-01",
      "status": "winner",
      "teaser": "Prismatic light beams refract through glass card",
      "deliverable": {
        "type": "react",
        "entry": "dist/index.html"
      },
      "preview_image": "preview.webp",
      "thumbnail": "thumb.webp",
      "alt_text_preview": "Full-page view of agent-01 light experience design",
      "alt_text_thumb": "Thumbnail of prismatic light login concept"
    },
    {
      "id": "agent-03",
      "status": "finalist",
      "teaser": "Soft bloom trails follow cursor movement",
      "deliverable": {
        "type": "react",
        "entry": "dist/index.html"
      },
      "preview_image": "preview.webp",
      "thumbnail": "thumb.webp",
      "alt_text_preview": "Full-page view of agent-03 bloom trail design",
      "alt_text_thumb": "Thumbnail of soft bloom login concept"
    }
  ]
}
```

### Agent Status Values

| Status | Meaning | Display Behavior |
|--------|---------|------------------|
| `winner` | Selected as final deliverable | ⭐ Featured prominently, always shown |
| `finalist` | Made it to final round, high quality | ✓ Shown in showcase |
| `honorable` | Interesting ideas, worth displaying | ✓ Shown if curated |
| `eliminated` | Culled in earlier phases | Hidden by default |

### Deliverable Types

| Type | Entry Pattern | Notes |
|------|---------------|-------|
| `html` | `index.html` | Simple static HTML |
| `react` | `dist/index.html` | Vite/React build output |
| `ios` | `preview.html` | Screenshot/iframe fallback |

---

### SWARM_DESIGNS.json (Master Curation Manifest)

Central manifest at `/data/SWARM_DESIGNS.json`:

```json
{
  "featured_batches": [
    {
      "batch": "payments-site-homepage",
      "agents": ["agent-01", "agent-03"]
    },
    {
      "batch": "infinite-ui-gen",
      "agents": ["src_agent_3", "src_agent_4"]
    }
  ],
  "homepage_rotation": {
    "max_per_batch": 3,
    "refresh_interval_ms": 5000
  }
}
```

---

## Preview Image Handling

### Aspect Ratios

  * **Desktop deliverables**: 16:9 preview, square thumbnail
  * **Mobile/iOS deliverables**: 9:16 preview, square thumbnail
  * **Thumbnails**: always square (1:1), cropped from preview center

### CSS Strategy

```css
.preview-image {
  object-fit: cover;
  aspect-ratio: 16/9;  /* or 9/16 for mobile */
}

.thumbnail {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 200px;
  height: 200px;
}
```

---

## Routing Strategy

Uses 404-based routing (same pattern as `august.style`):

### How It Works

  1. User visits `swarms.august.style/payments-site-homepage/agent-01`
  2. GitHub Pages returns `404.html` for unknown paths
  3. `404.html` contains redirect script
  4. Redirects to `index.html` with path as query param
  5. `index.html` JavaScript parses path and loads appropriate content

### 404.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    // Redirect to index.html with path preserved
    const path = window.location.pathname;
    window.location.replace('/?p=' + encodeURIComponent(path));
  </script>
</head>
<body>Redirecting...</body>
</html>
```

### index.html (Router Logic)

```javascript
// Parse path from query param
const params = new URLSearchParams(window.location.search);
const path = params.get('p') || '/';
const segments = path.split('/').filter(Boolean);

if (segments.length === 0) {
  // Homepage: show all batches
  loadHomepage();
} else if (segments.length === 1) {
  // Batch view
  loadBatchView(segments[0]);
} else if (segments.length === 2) {
  // Agent view
  loadAgentView(segments[0], segments[1]);
}
```

---

## Homepage Random Selection

Reference: `360-design/assets/js/homepage-controller.js`

  * **Pattern**: select random thumbnail/teaser combos from `winner` and `finalist` agents
  * **Cycle**: fade transition every 4-5 seconds
  * **Shuffle on load**: different arrangement each visit

```javascript
function selectRandomPreviews(batches, count) {
  const eligible = batches.flatMap(batch => 
    batch.agents
      .filter(a => ['winner', 'finalist'].includes(a.status))
      .map(a => ({ batch: batch.batch_id, agent: a }))
  );
  
  // Shuffle and take count
  return shuffleArray(eligible).slice(0, count);
}
```

---

## Adding a New Batch

  1. Create `/data/batches/<batch-id>.json` with batch schema
  2. Add batch to `featured_batches` in `/data/SWARM_DESIGNS.json`
  3. Ensure preview images exist in agent directories
  4. No file copying — deliverables served from `/swarms/` path

---

## File Structure

```
swarms.august.style/
├── index.html              # Main entry point
├── 404.html                # Redirect handler
├── data/
│   ├── SWARM_DESIGNS.json  # Master curation manifest
│   └── batches/
│       ├── payments-site-homepage.json
│       ├── infinite-ui-gen.json
│       └── ...
├── assets/
│   ├── css/
│   │   └── gallery.css
│   └── js/
│       ├── router.js
│       ├── homepage-controller.js
│       └── batch-renderer.js
└── swarms/                 # Symlink or hosted from repo
    ├── payments-site-homepage/
    └── infinite-ui-gen/
```
