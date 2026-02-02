# Workflow Library

Reusable command workflows and design specifications for running design swarms and agentic creative processes.

---

## Commands

Workflow commands for orchestrating AI agents. Use these with Claude Code's `/project:command` pattern.

| Command                                                   | Purpose                                | Best For                           |
|-----------------------------------------------------------|----------------------------------------|------------------------------------|
| [infinite.md](./commands/infinite.md)                     | Parallel generation with sub-agents    | Generating many spec variations    |
| [parallel_volley.md](./commands/parallel_volley.md)       | 3-phase volley across parallel batches | Bulk implementation, quality gates |
| [para-volley-funnel.md](./commands/para-volley-funnel.md) | Evolutionary many-to-one refinement    | Design swarms with culling         |
| [sequential_volley.md](./commands/sequential_volley.md)   | Sequential item-by-item processing     | Careful single-item implementations|
| [multistage.md](./commands/multistage.md)                 | Adaptive multi-stage orchestration     | Complex projects with dependencies |
| [dual_spec.md](./commands/dual_spec.md)                   | Foundation + advanced two-phase        | Layered feature implementation     |
| [agent_pair_collab.md](./commands/agent_pair_collab.md)   | Paired agents volleying ideas          | Creative ideation with validation  |
| [prime.md](./commands/prime.md)                           | Context priming helper                 | Project initialization             |
| [docs-verify-code.md](./commands/docs-verify-code.md)     | Documentation-driven verification      | Quality auditing                   |

---

## Specs

Design specifications that define what agents should create. The key to great swarm output.

| Spec                                                               | Purpose                      | Output Type |
|--------------------------------------------------------------------|------------------------------|-------------|
| [ui_component_spec.md](./specs/ui_component_spec.md)               | Themed hybrid UI components  | HTML/CSS/JS |
| [chat_ui_spec.md](./specs/chat_ui_spec.md)                         | Chat interface designs       | iOS/Web UI  |
| [ios_ui_spec.md](./specs/ios_ui_spec.md)                           | iOS application screens      | iOS UI      |
| [workflow_ios_spec.md](./specs/workflow_ios_spec.md)               | iOS workflow interfaces      | iOS UI      |
| [aesthetic_diversity_spec.md](./specs/aesthetic_diversity_spec.md) | Visual diversity exploration | Various     |
| [ui-revamp.md](./specs/ui-revamp.md)                               | UI modernization             | Web UI      |
| [lightweight_audit_spec.md](./specs/lightweight_audit_spec.md)     | Quick quality audits         | Reports     |
| [CLAUDE_CODE_DOC_SPEC.md](./specs/CLAUDE_CODE_DOC_SPEC.md)         | Documentation standards      | Docs        |

---

## Writing Great Specs

The `ui_component_spec.md` exemplifies the "layered options" approach that creates genuine diversity:

  * **Categories over prescriptions** — provide theme categories, not specific themes
  * **Principles over examples** — give design principles, let agents derive examples
  * **Options in layers** — stack choices (theme × component × interaction × animation)
  * **Ultra-thinking directive** — explicit prompt to think deeply before executing
  * **Quality standards** — clear criteria for what constitutes success
  * **No easy outs** — language that prevents defaulting to generic solutions

See [spec_template.md](/assets/templates/spec_template.md) for a template.

---

## Usage Examples

### Basic Generation

```bash
# Generate 6 UI components
/project:infinite specs/ui_component_spec.md src_output 6

# Generate continuously until context limit
/project:infinite specs/ui_component_spec.md src_output infinite
```

### Design Swarm (Phased)

```bash
# Set up a swarm with the payments-site-homepage pattern
cp -r swarms/payments-site-homepage/homepage-starter swarms/my-project/starter
for i in {01..06}; do cp -r swarms/my-project/starter swarms/my-project/agent-$i; done

# Run each agent in separate terminal
cd swarms/my-project/agent-01 && npm run dev -- --port 3001
```

### Evolutionary Funnel

```bash
# Start with 20, evolve to 1 optimal solution
/project:parallel_volley_funnel specs/aesthetic_diversity_spec.md 20 5
```
