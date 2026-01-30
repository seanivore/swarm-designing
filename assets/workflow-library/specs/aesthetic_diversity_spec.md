# Aesthetic Diversity Specification

## Core Challenge
Create a **uniquely themed Concept Portal** for a Generative Design Agency.

The goal is NOT to build a standard website. The goal is to define a distinct **visual universe** that acts as a lens for viewing the specific content. Each iteration must feel like a completely different software product, art installation, or operating system.

## Output Requirements

**File Naming**: `concept_portal_[theme_slug].html`

**Content Structure**: A standalone High-Fidelity Prototype
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>[Theme Name] Concept</title>
    <!-- Use Tailwind via CDN for rapid styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* 
           CRITICAL: Custom CSS is required for advanced effects 
           that Tailwind cannot easily express 
           (e.g., custom scrollbars, specific glows, complex animations).
        */
    </style>
</head>
<body>
    <!-- 
       The interface should include:
       1. A Navigation System (novel interaction, not just a top bar)
       2. A Gallery/Grid of "Swarms" (the content)
       3. A Detail View Overlay (for viewing a specific swarm)
       4. 'About' section integrated into the experience.
    -->
</body>
</html>
```

## Design Dimensions

### **Aesthetic Lineages**
Do not default to "Clean SaaS". Choose or invent a specific design lineage:

#### **Lineage Categories**
- **Neo-Brutalism**: High contrast, raw borders, distinct lack of smoothing, large typography, "ugly-pretty".
- **Cyber-Noir / HUD**: glowing greens/ambers, scanlines, monospaced text, data-density, "terminal" feel.
- **Solarpunk / Organic**: Soft gradients, rounded corners, glass-morphism (evolved), mimicking nature, breathing animations.
- **Corporate Memphis (Subverted)**: Flat precision, high-geometry, pastel but with a sinister or "hyper-real" twist.
- **Apple/Braun Minimalist**: Absolute white/black/silver, Helvetica/Inter, grid perfection, zero clutter.
- **Retro-Skeuomorphic**: Real-world textures (leather, metal, paper), shadows, tactility, mechanical switches.
- **Spatial / AR**: Layouts that imply 3D depth, floating layers, Z-axis navigation (parallax).

### **Interaction Models**
How does the user explore?
- **The "OS"**: Windows, taskbars, draggable elements.
- **The "Deck"**: Spatial cards, swiping, physically tossing elements.
- **The "Terminal"**: Keyboard driven, command line inputs.
- **The "Canvas"**: Infinite panning, zooming into details (Miro-style).
- **The "Feed"**: Vertical velocity, snap-scrolling, high-speed consumption.

## Enhancement Principles

### **Thematic Commitment**
- **No Half-Measures**: If you choose "Retro", the scrollbar should look like a physical slider.
- **Typography as Voice**: The font choice is 50% of the vibe. (e.g., 'Share Tech Mono' vs 'Playfair Display' vs 'Inter').
- **Motion as Material**: How do things move? Heavy and industrial? Or light and instant?

### **Content Integration**
- **The "Metadata" problem**: You must display the Swarm Name (e.g., "CMY Cube"), Date, and Agent Count. How does your theme handle this text? (e.g., as a luggage tag? as a code comment? as a museum placard?)

## Iteration Evolution
*   **Level 1 (Safe)**: Polished version of a known style (e.g., really good Dark Mode).
*   **Level 2 (Bold)**: Mixing two styles (e.g., Brutalist + Glassmorphism).
*   **Level 3 (Avant-Garde)**: Inventing a new interface paradigm that defies standard web usability but increases *intrigue*.

## Ultra-Thinking Directive

**VARIANT ASSIGNMENTS (The split):**

*   **Agents 01, 02, 03 -> Lineage: CYBER-NOIR / HUD**
    *   **Agent 01:** Pure "Terminal". Monospace only. No images.
    *   **Agent 02:** "CCTV". Grainy video feeds. Red accents.
    *   **Agent 03:** "Dark Mode SaaS". Clean, professional, but data-dense.

*   **Agents 04, 05, 06 -> Lineage: SOLAR-PUNK / ORGANIC**
    *   **Agent 04:** "The Greenhouse". Glass, plants, breathing animations.
    *   **Agent 05:** "Biomimicry". Cellular shapes, Voronoi patterns.
    *   **Agent 06:** "Paper & Ink". Texture, serif fonts, warmth.

**Global Goal:**
We are building a **React Application**.
*   Use `framer-motion` for interactions.
*   Use `tailwindcss` for styling.
*   Ensure the "Swarm Gallery" is the core feature.

