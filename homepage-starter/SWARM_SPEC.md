# Homepage Light Experience - Swarm Design Spec

A phased parallel design exploration with human curation gates.

---

## The Challenge

Create a login page where **light is the main character**.

Not a glow effect. Not a hover state. Not glassmorphism with blur.

A **light experience** that happens to contain a login form.

---

## Hard Constraints

### Form Structure (Do Not Change)
```
Title: "Horvath Payments"
Subtitle: "Login to access your contract and invoices."
Input: Last Name
Input: Project Keyword
Helper: "Use the keyword from your notification email."
Button: "Access Portal"
Footer: "Need help? Contact sean@august.style"
```

### Technical
- React + Tailwind + TypeScript
- 60fps performance
- Keyboard accessible
- Reduced-motion fallback

### Color Palette
- Mauve: `#C99CAD`
- Blue: `#8FA9B3`
- Terracotta: `#C9A68A`
- Deep Pink: `#9C528B`
- Dark: `#0f0f0f` to `#1f1f1f`

### Assets Available
- `/assets/media/pdf-viewer-bg-art-1.webp`
- `/assets/media/pdf-viewer-bg-art-2.webp`
- `/assets/media/pdf-viewer-bg-art-3.webp`
- Agency FB font (configured)

---

## What Light Can Do

Light is physics, emotion, revelation.

**Light travels** - beams, rays, paths through space
**Light refracts** - bends through materials, splits into spectrum
**Light reflects** - bounces off surfaces, creates mirrors and glare
**Light reveals** - shows form, creates shadow, exposes depth
**Light glows** - soft halos, atmospheric fog, bloom
**Light trails** - motion blur, persistence of vision, ribbons
**Light pulses** - rhythm, breath, heartbeat
**Light floods** - washes of color, gradients through space
**Light pierces** - single point cutting through darkness

Your cursor is a light source. What does YOUR light do?

---

## What Makes Light Interesting

**Earned Complexity** - A single beam refracting through a prism = interesting. Rainbow vomit everywhere = boring.

**Physical Plausibility** - Light that behaves like light reads as intentional.

**Interaction with Material** - Light alone is invisible. What surfaces catch it?

**Restraint** - The best light installations use minimal elements.

**The Unexpected** - Same but different. Twist ONE thing.

---

## Reference Energy

Think light installations, not web design:
- James Turrell - light as physical presence
- Dan Flavin - fluorescent tubes as sculpture
- Olafur Eliasson - immersive environments
- teamLab - interactive, responsive
- Anthony McCall - light beams as solid objects

---

## The Phases

Each phase has ONE goal. Complete the phase, then STOP for human review.

---

### PHASE 1: Foundation

**Goal**: Light follows cursor. Card exists. Nothing else.

**Task**:
1. Implement cursor-following light effect
   - The light must MOVE with the cursor
   - The light must feel like LIGHT (not just a colored div)
   - Keep it simple - no complex effects yet

2. Create the login card
   - Basic card structure with required form fields
   - Functional - inputs work, button works
   - No fancy styling - just structure

3. Dark background
   - Simple dark background
   - Light should be visible against it

**Do Not**:
- Add card styling beyond basic structure
- Add interaction between light and card
- Add colors beyond functional contrast
- Add animations beyond cursor-follow

**Deliverable**: Working page with cursor-following light and functional card

**When Done**: Create `.phase_1_complete` file, then STOP

**Cull Criteria**: Does the light feel like light? Or a CSS trick?

---

### PHASE 2: Interaction

**Goal**: Light and card respond to each other. Still minimal styling.

**Task**:
1. Light must respond to card proximity
   - Something CHANGES when light is near/over the card
   - The change should feel physical, not like a hover state
   - Consider: intensity, size, color shift, behavior change

2. Card must respond to light
   - Edges, surfaces, or shadows react to light position
   - Response should be LOCALIZED (not whole-card glow)
   - Consider: edge highlights, surface reflections, shadow casting

3. The interaction must feel like physics
   - Light affects what it's near, not what it's "hovering"
   - The card is a material that light interacts with

**Do Not**:
- Add decorative styling yet
- Add colors beyond what's needed for the effect
- Make it "pretty" - make it WORK

**Deliverable**: Light and card that interact in a physically-plausible way

**When Done**: Create `.phase_2_complete` file, then STOP

**Cull Criteria**: Does it feel like a hover state? Or light hitting a surface?

---

### PHASE 3: Material

**Goal**: Card becomes a material. Light gets its character. Atmosphere emerges.

**Task**:
1. Card Material Treatment
   - Card must feel like a MATERIAL (glass, metal, fog, etc.)
   - Surface treatment, depth, texture, optical properties
   - Material should be consistent with how it interacts with light

2. Light Character
   - Give the light its full visual treatment
   - Color, bloom, softness, behavior
   - Use the palette: Mauve, Blue, Pink
   - Light character should match the card material

3. Background Atmosphere
   - Develop the background environment
   - Use provided art assets or create your own treatment
   - Support the light and card without competing

4. Visual Cohesion
   - Everything should feel like ONE design
   - Palette should feel intentional, not random
   - Restraint over excess

**Do Not**:
- Add every effect you can think of
- Use all the colors at once
- Prioritize "cool" over "cohesive"
- Lose the interaction quality from Phase 2

**Deliverable**: Complete visual treatment with material, light, and atmosphere

**When Done**: Create `.phase_3_complete` file, then STOP

**Cull Criteria**: Trendy or intentional? Designed or decorated?

---

### PHASE 4: Polish

**Goal**: The 10% that makes it 100%.

**Task**:
1. Micro-Details
   - Small touches that show craft
   - Transitions, timing, easing curves
   - Hover states on form elements
   - Focus states, error states
   - Details nobody asked for but everyone notices

2. Performance Optimization
   - 60fps cursor tracking
   - No jank, no stutter
   - Efficient rendering

3. Accessibility
   - Keyboard navigation works perfectly
   - Focus states are clear
   - Reduced motion preference respected
   - Color contrast meets standards

4. The Unexpected
   - One thing that makes someone say "oh!"
   - The same-but-different moment
   - The detail that elevates good to memorable

5. Touch Fallback
   - Graceful behavior on touch devices

**Deliverable**: Production-ready, polished, performant, memorable

**When Done**: Create `.phase_4_complete` file, then STOP

**Cull Criteria**: Pick the winner.

---

## Running the Swarm

### Setup

```bash
# From swarm-designing directory
# Create agents by copying the starter
for i in {01..16}; do
  cp -r homepage-starter agent-$i
done

# Install dependencies
for dir in agent-*/; do
  (cd "$dir" && npm install) &
done
wait
```

### Preview Agents

```bash
# Run each on different ports
cd agent-01 && npm run dev -- --port 3001
cd agent-02 && npm run dev -- --port 3002
# etc.
```

### Phase Flow

1. **Run Phase 1** on all agents
2. **Preview** each agent's work
3. **Cull** - mark survivors: `touch agent-XX/.survived_phase_1`
4. **Run Phase 2** only on survivors
5. **Preview**, **Cull**, mark survivors
6. **Repeat** for Phases 3-4
7. **Pick winner**: `touch agent-XX/.winner`

### Cross-Pollination

If a culled agent had a good idea:
```bash
# Copy the good bit to a survivor
cp agent-02/src/cool-effect.tsx agent-03/src/
echo "Borrowed from agent-02" >> agent-03/NOTES.md
```

### Bring Winner Home

```bash
cp agent-XX/src/index.tsx ~/Development/freelance-payments/src/index.tsx
cp agent-XX/src/index.css ~/Development/freelance-payments/src/index.css
```

---

## Evaluation

**Concept Clarity** - Is there ONE clear idea about what the light does?
**Execution Quality** - Is that idea executed with craft and polish?
**Interaction Design** - Does the light respond in interesting ways?
**Material Believability** - Does the card feel like a real material?
**Restraint** - One thing well, not many things okay?
**The Wow** - Does it make someone want to play with it?

---

## This Is Not A Race 

**One part design exploration**

- Take your time. Explore. Discover.
- Create something that makes us say "oh, I wouldn't have thought of that."

**One part perfection**

- Step back. Look at the big picture.
- Review your work. perfect it. 
- If it isn't working, don't force, it, trash it and start again. 
- You are an artist, not a machine.

**Start by picking one trick you're great at and then make it the best it can be** 

---

## What NOT To Do

- Don't add effects just because you can
- Don't use every color in the palette
- Don't make the form hard to use
- Don't copy glassmorphism tutorials
- Don't make it look like every other dark mode landing page
- Don't prioritize complexity over clarity

---

## Your Interpretation

This spec does not tell you exactly what to build.

You have constraints (form, colors, tech).
You have a direction (light as main character).
You have quality bars (restraint, craft, interaction).
You have phases (foundation → interaction → material → polish).

The specific interpretation is yours to discover.

Make something that makes us say "oh, I wouldn't have thought of that."
