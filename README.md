# MedEx Nexus: Knowledge Graph & Clinical Architecture

![GHBanner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

MedEx Nexus is a high-fidelity, offline-first, locally-hosted progressive web application designed for senior medical staff, registrars, and fellowship candidates (e.g., CICM, ANZCA, RACP, ACEM). It serves as a dynamic, layered clinical repository, rendering granular medical knowledge—from biophysical receptor mechanics to critical care physiological extremes—through a heavily optimized React/Vite architecture.

## Table of Contents

- [Application Architecture](#application-architecture)
- [The 5 Vertical Knowledge Layers](#the-5-vertical-knowledge-layers)
- [Knowledge Graph Integration](#knowledge-graph-integration)
- [Data Pipeline & Healing Engine](#data-pipeline--healing-engine)
- [Local Development & Usage](#local-development--usage)

---

## Application Architecture

MedEx Nexus is built to run entirely locally using an offline-first strategy. It uses **IndexedDB** for persistent data storage on the client side, meaning once data is loaded, the application operates with zero latency and requires zero network requests.

### Tech Stack

- **Frontend Framework**: React 18 / Vite 6
- **Routing**: `react-router-dom` (Native URL-based routing)
- **State Management**: `Zustand` (Global persistent state, UI state, and sync status)
- **Styling**: Vanilla CSS (`index.css`) + TailwindCSS (for utility classes), emphasizing a Modern Web aesthetic using deep glassmorphism and ambient CSS mesh-gradients.
- **Data Visualisation**: `react-force-graph-2d` (D3 Physics + Canvas Rendering)
- **Background Automation**: Google Gemini 2.5 Flash API (for automated batch content generation)

---

## The 5 Vertical Knowledge Layers

To prevent data truncation and ensure complete coverage, the clinical sciences are built recursively in five distinct vertical layers. Every module (e.g., Cardiovascular System) contains these 5 layers in interconnected JSON files:

1. **Layer 1 (Applied Clinical Anatomy & Histology)**: Complete boundaries, micro-architecture (e.g., Remak bundles), and structural relations.
2. **Layer 2 (Biophysical & Cellular Mechanics)**: Receptor stoichiometry, ion channels (TRPV1, NMDA), and intracellular kinase cascades.
3. **Layer 3 (Integrative Organ Physiology)**: Macroscopic organ function, compliance loops, and systemic autoregulation.
4. **Layer 4 (Physiological Extremes & Stress)**: Pathophysiology, systemic shock, and compensatory exhaustion.
5. **Layer 5 (Anaesthetic Implications & Pharmacology)**: Regional blockade mechanics, pharmacokinetics, and surgical interactions.

---

## Knowledge Graph Integration

One of the defining features of MedEx Nexus is the **Level of Detail (LOD) Knowledge Graph Explorer**.

### How It Works:

Instead of relying on a heavy database like Neo4j, the application compiles all static JSON data into a unified, flat `graph_index.json` during the `npm run build` process (via `scripts/compile_graph.cjs`).

This index is fed directly into `react-force-graph-2d`. The visualization uses **D3 physics** and **Quadtree LOD Culling** to prevent the "hairball" effect:

- **Locked Roots**: The primary Anatomical/System modules (Layer 1) have mathematically fixed coordinates in a circle.
- **Dynamic Edges**: The granular concepts and clinical correlations float via repulsive forces around their parent modules.
- **LOD Camera**: As the user zooms in, dense minor nodes and text labels fade into view perfectly, ensuring smooth performance even with thousands of nodes.

---

## Data Pipeline & Healing Engine

Because data is heavily nested JSON containing complex mathematical formulae (`KaTeX` strings) and hierarchical arrays, data integrity is critical.

### Batch Generation

You can backfill missing topics automatically using the batch generation script. It respects the Gemini rate limits via an adjustable delay flag:

```bash
npm run generate:batch -- --delay 60000
```

This script recursively parses `data/generation_queue.json`, pings the Gemini API, and writes the output directly to the localized `data/` directories.

### Healing Engine (`scripts/healData.ts`)

During generation, AI models occasionally output damaged JSON, unescaped `KaTeX` strings (e.g., single `\` instead of `\\`), or malformed arrays.
The application features a built-in pre-flight healing script that scans the database:

1. Detects and repairs broken JSON syntax.
2. Fixes unescaped LaTeX control sequences (`\frac` -> `\\frac`).
3. Standardizes data arrays.

```bash
npm run heal
```

_Note: This script runs automatically before the app starts._

---

## Local Development & Usage

### Prerequisites

- **Node.js** (v18+)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Gemini API Key. Create a `.env.local` file in the root directory:

   ```bash
   GEMINI_API_KEY=your_key_here
   ```

   _(Note: There is a fallback API key embedded in `vite.config.ts` for local offline use. **Do not deploy this application to a public server without removing it first.**)_

3. Run the development server (This will automatically trigger `compile_graph.cjs` and `healData.ts`):

   ```bash
   npm run dev
   ```

4. Build for Production:
   ```bash
   npm run build
   ```
