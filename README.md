# Design Swarms Studio

**Run parallel AI agents to generate genuinely diverse, high-quality design outputs at scale.**

Like hiring 50 creative agencies, but for the cost of context tokens.

---

## The Big Idea

Different LLM instances traverse different paths when solving the same problem. These paths diverge further with each creative decision. By running multiple agents in parallel from identical specs, you get truly diverse results — not slight variations of the same idea.

---

## Quick Start

```bash
# Clone and enter the repo
git clone https://github.com/seanivore/swarm-designing.git
cd swarm-designing

# Create a new swarm with 6 agents
./scripts/setup.sh my-project assets/templates/standard-starter 6

# Install dependencies
./scripts/install.sh my-project

# Run each agent on different ports
./scripts/dev.sh my-project agent-01 3001
./scripts/dev.sh my-project agent-02 3002
# ... etc
```

---

## What You Get

  + **Genuine diversity** — 6 agents, 6 genuinely different solutions
  + **Quality guarantee** — at least one will be bug-free and excellent
  + **Unexpected discoveries** — interpretations you'd never think of
  + **Portfolio-worthy artifacts** — showcase-quality outputs

---

## Project Structure

```
swarm-designing/
├── scripts/              # Swarm management (setup, install, dev, snapshot)
├── assets/
│   ├── workflow-library/ # Reusable commands and specs
│   ├── templates/        # Starter templates
│   └── docs/             # Full documentation
└── swarms/               # Active and completed swarms
```

---

## Documentation

| Document                                                         | Description                   |
|------------------------------------------------------------------|-------------------------------|
| [SWARM_DESIGNING.md](./assets/docs/SWARM_DESIGNING.md)           | Complete studio documentation |
| [Workflow Library](./assets/workflow-library/README.md)          | Commands and specs reference  |
| [GALLERY_ARCHITECTURE.md](./assets/docs/GALLERY_ARCHITECTURE.md) | Showcase website architecture |

---

## Showcases

  + **[payments-site-homepage](./swarms/payments-site-homepage/)** — Login where light is the main character
  + **[infinite-ui-gen](./swarms/infinite-ui-gen/)** — 53+ themed UI components

---

## About

**Design Swarms Studio** was created to leverage AI path divergence for creative design work.

  + [august.style](https://august.style)
