# Design Swarms Studio

Complete documentation for running parallel design swarms — leveraging AI path divergence to create genuinely diverse, high-quality design outputs at scale.

---

## What Are Design Swarms?

  * **Core insight**: different LLM instances traverse conceptually distinct pathways when solving the same problem
  * **The value**: this divergence compounds over iterations, producing results you'd never get from a single agent

  + Like hiring 50 creative agencies, but for the cost of context tokens
  + Always produces at least one bug-free, high-quality result
  + Reveals interpretations and approaches you'd never think of yourself
  + Creates artifacts worthy of portfolio display

### Why This Wasn't Possible Before AI

A traditional design agency exploring 6 directions in parallel would cost tens of thousands and take weeks. Even then, human designers anchor on similar references, share the same training, and influence each other's work.

LLMs don't share "training" in real-time. Each instance starts fresh, makes different early decisions, and those decisions compound through the creative process. By the end, 6 agents working from identical spec produce 6 genuinely different solutions — not 6 slight variations of the same idea.

### Real Example: Light Experience Login

We ran 6 agents on a spec to create "a login page where light is the main character." Every agent interpreted this differently:

  + **Agent 01**: Prismatic beams refracting through a glass card
  + **Agent 02**: Soft bloom trails following cursor movement
  + **Agent 03**: Volumetric light rays in fog with 3D card
  + **Agent 04**: Spotlight casting dynamic shadows
  + **Agent 05**: Particle field responding to cursor proximity
  + **Agent 06**: Iridescent surface reflections

Each was technically excellent. The winner combined physical plausibility with visual restraint — a breakthrough we wouldn't have discovered through iteration on a single direction.

---

## Quick Start: Running Your First Swarm

### Prerequisites

  + Node.js and npm installed
  + Claude Code or similar AI coding assistant
  + This repository cloned locally

### 1. Set Up the Swarm

```bash
cd /path/to/swarm-designing

# Create a new swarm with 6 agents from a template
./scripts/setup.sh my-swarm assets/templates/standard-starter 6
```

This creates:

```
swarms/my-swarm/
├── starter/           # Template (don't edit directly)
├── agent-01/          # First agent's workspace
├── agent-02/
├── agent-03/
├── agent-04/
├── agent-05/
└── agent-06/
```

### 2. Install Dependencies

```bash
./scripts/install.sh my-swarm
```

Runs `npm install` in parallel across all agent directories.

### 3. Write Your Spec

Edit `swarms/my-swarm/starter/SWARM_SPEC.md` (then propagate to agents or edit per-agent). See [Writing Great Specs](#the-swarm-spec) below.

### 4. Run the Swarm

Open 6 terminal windows/tabs and run each agent:

```bash
# Terminal 1
./scripts/dev.sh my-swarm agent-01 3001

# Terminal 2
./scripts/dev.sh my-swarm agent-02 3002

# ...and so on through agent-06 on port 3006
```

### 5. Give Each Agent the Same Prompt

In each Claude Code session:

```
Read SWARM_SPEC.md and implement Phase 1. 
When done, create a .phase_1_complete marker file.
```

### 6. Curate Between Phases

  1. Review all agents at their respective localhost ports
  2. Mark survivors with `.survived_phase_1` marker
  3. Copy good ideas to surviving agents (cross-pollinate)
  4. Instruct surviving agents to proceed to Phase 2

Repeat until one remains.

---

## The Swarm Spec

The spec is everything. A great spec produces diverse, high-quality outputs. A weak spec produces 6 variations of the same mediocre idea.

### Anatomy of a Great Spec

Use the [payments-site-homepage SWARM_SPEC.md](file:///Users/seanivore/Development/swarm-designing/swarms/payments-site-homepage/homepage-starter/SWARM_SPEC.md) as reference.

  * **The challenge** — one clear, inspiring constraint
  * **Hard constraints** — non-negotiable requirements (form fields, tech stack, colors)
  * **What <X> can do** — expansive exploration of the design space
  * **What makes <X> interesting** — principles that elevate beyond obvious
  * **Reference energy** — inspiration sources (not for copying, for mindset)
  * **Phases with cull criteria** — clear gates with reasons to eliminate

### The Layered Options Approach

Give CATEGORIES, not prescriptions. See [ui_component_spec.md](file:///Users/seanivore/Development/swarm-designing/assets/workflow-library/specs/ui_component_spec.md) for this pattern:

  + **Themes as categories** — "nature metaphors" not "an oak tree"
  + **Principles not examples** — "physical plausibility" not "add a shadow"
  + **Stack the choices** — theme × component × interaction × animation
  + **Ultra-thinking directive** — explicit prompt to think deeply before executing

### What NOT To Do In Specs

  * Don't list specific implementations — agents will copy them verbatim
  * Don't provide only one example — it becomes THE answer
  * Don't be too short — insufficient context produces generic outputs
  * Don't be too long — agents anchor on early content

---

## Directory Structure

```
swarm-designing/
├── scripts/                  # Swarm management tools
│   ├── setup.sh              # Scaffold new swarms
│   ├── install.sh            # Parallel npm install
│   ├── dev.sh                # Run agent preview
│   └── snapshot.sh           # Archive swarm state
│
├── assets/
│   ├── workflow-library/     # Reusable commands and specs
│   │   ├── commands/         # Workflow orchestration
│   │   └── specs/            # Design specifications
│   ├── templates/            # Starter templates
│   └── docs/                 # Documentation
│
├── swarms/                   # Active and completed swarms
│   ├── [swarm-name]/
│   │   ├── starter/          # Template (reference)
│   │   ├── agent-01/         # Agent workspaces
│   │   ├── agent-02/
│   │   └── ...
│   └── ...
```

---

## Best Practices

### How Many Agents?

  + **6** — standard for most design swarms, good diversity
  + **3-4** — for simpler challenges or faster iteration
  + **8-12** — for complex challenges with lots of design space
  + **16+** — only for truly open-ended exploration

### When to Phase-Gate vs. Single-Round

  * **Phase-gate** when: complex build-up required, early decisions matter, you want to cross-pollinate
  * **Single-round** when: outputs are self-contained, quick turnaround, less curation time available

### Cross-Pollination Techniques

  1. **Direct copy** — take a specific implementation from Agent A, add to Agent B
  2. **Principle extraction** — identify WHY something works, communicate the principle
  3. **Constraint sharing** — "Agent 02 discovered the card works better at 400px, apply this"
  4. **Reference pointing** — "Look at Agent 04's light behavior for inspiration"

### When to Cull

  + No clear direction or identity
  + Technically broken (won't run, major bugs)
  + Violates hard constraints
  + Generic/boring — could have come from any template
  + Wrong interpretation of the challenge

---

## Scripts Reference

### setup.sh

```bash
./scripts/setup.sh <swarm_name> <template_path> [agent_count]

# Example
./scripts/setup.sh portfolio-v2 assets/templates/vite-starter 6
```

  + Creates `swarms/<swarm_name>/` directory
  + Copies template to `starter/`
  + Creates `agent-01` through `agent-XX` directories

### install.sh

```bash
./scripts/install.sh <swarm_name>

# Example
./scripts/install.sh portfolio-v2
```

  + Runs `npm install` in all agent directories in parallel

### dev.sh

```bash
./scripts/dev.sh <swarm_name> <agent_id> [port]

# Example
./scripts/dev.sh portfolio-v2 agent-03 3003
```

  + Starts development server for specified agent
  + Default port: 3000 + agent number

### snapshot.sh

```bash
./scripts/snapshot.sh <swarm_name> [tag]

# Example
./scripts/snapshot.sh portfolio-v2 phase-2-complete
```

  + Archives the current swarm state to `snapshots/`
  + Useful for checkpointing before risky experiments

---

## Next Swarm: CMY Cube

The next swarm to run is **CMY Cube** — an exploration of the CMY (Cyan-Magenta-Yellow) color cube aesthetic for UI design.

  + **Location**: `swarms/cmy-cube-ui/`
  + **Status**: Spec stub ready, needs full spec
  + **Approach**: Use `payments-site-homepage` framework as template

---

## Future Swarm Ideas

  * **Landing page variations** — seed from `landing-page-jump-starts/`
  * **User login screens** — universal need, great showcase
  * **Mobile app user profiles** — iOS/Android profile screens
  * **Visual design exploration** — abstract aesthetic investigations
  * **The gallery website itself** — meta: design the showcase as a swarm

---

## Workflow Library

For reusable command workflows and spec templates, see: [assets/workflow-library/README.md](file:///Users/seanivore/Development/swarm-designing/assets/workflow-library/README.md)