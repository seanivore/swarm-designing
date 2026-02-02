# Swarm Design Portfolio - Design Specification

## Objective
Design the "Swarm Designing" portfolio website. This site must showcase the "swarms" (generative design sessions) as premium art pieces.

## Aesthetic Direction
*   **Keywords:** Futuristic, Premium, Cinema, "007 GoldenEye" Interface, Data-Visualization, Dark Mode.
*   **Vibe:** You are logging into a high-tech mainframe to view secret design files.
*   **Navigation:** Keyboard-driven (Arrow keys), HUD (Heads Up Display) elements, smooth transitions.
*   **Anti-Pattern:** Do NOT make a standard "Marketing Landing Page". No big hero text with a "Get Started" button. This is a *tool* and a *gallery*.

## Core Components
1.  **The Grid:** A visual index of all swarm projects. Not just text lists. Maybe 3D cards, or a data-table that looks like a terminal.
2.  **The Stage:** A detail view for a specific swarm. Needs to show the metadata (Date, Agents, Workflow) and the Artifacts (Images/IFrames).
3.  **The Manifesto:** An "About" modal or overlay explaining "Swarm Designing".

## Technical Constraints
*   **Framework:** React + Tailwind CSS.
*   **Input:** The app will read from `swarms/*/swarm.json`.
*   **Output:** Single Page Application (SPA).

## Deliverable
A single `index.html` (or React component tree) that visualizes this concept.
