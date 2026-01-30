# Swarm Designing Studio

This directory is the "Factory" for running generative design swarms.

## 🛠 The Rig (CLI Tools)

We use a set of scripts in `./scripts/` to automate the workflow. run them from the root.

### 1. Setup (Scaffolding)
Propagates a template to N agents.
```bash
./scripts/setup.sh <swarm_name> <template_path> <count>
# Example:
./scripts/setup.sh portfolio-concept-v3 assets/templates/standard-starter 6
```

### 2. Install (Dependencies)
Runs `npm install` for all agents in parallel.
```bash
./scripts/install.sh <swarm_name>
```

### 3. Dev (Preview)
Runs a specific agent locally.
```bash
./scripts/dev.sh <swarm_name> <agent_name> <port>
# Example:
./scripts/dev.sh portfolio-concept-v3 agent-01 3001
```

### 4. Snapshot (Archive)
Captures the current state of the swarm for the Gallery.
**Note:** Snapshots are "cold" (no `node_modules`). Use them for history/hosting, not development.
```bash
./scripts/snapshot.sh <swarm_name> [label]
```

## 📂 Directory Structure

*   `swarms/<name>/starter`: The seed/template for this specific swarm. modify this to propagate changes.
*   `swarms/<name>/agent-XX`: **The Live Agents.** Work happens here. They have `node_modules` and are ready to run.
*   `swarms/<name>/snapshots/`: **The Archives.** Clean copies of the output.

##  Workflow

1.  **Define:** Create a new folder or use `setup.sh` to scaffold.
2.  **Generate:** AI Agents modify the code in `agent-XX`.
3.  **Preview:** Human uses `./scripts/dev.sh` to view results.
4.  **Curate:** Human decides which ideas survive.
5.  **Snapshot:** Save the run using `./scripts/snapshot.sh`.
