# Misty - Design Decisions

## Original Design Decision
**Semantic Diff UI**: The system presents a single blended output and visualizes changes using a "Semantic Diff" (categorizing code changes like "Color", "Layout"). Users refine the design by toggling these specific categories on or off.

## 3 Alternate Possibilities
1. **Multiple Variations (A/B/C Testing)**: Instead of granular toggles on one output, generate 3 completely distinct aesthetic variations (e.g., Minimal, Playful, Corporate) for the user to pick from.
2. **Chat-based Iteration**: A conversational sidebar where the user types "Make it more like the reference image's borders" to iteratively refine.
3. **Visual Node Graph**: Connecting specific UI elements from the reference image directly to DOM nodes in the code via a drag-and-drop wire interface.

## New Implemented Decision
**Multiple Variations**: We implemented a new version called `Misty Variants` that takes the reference image and WIP code, and immediately generates 3 distinct aesthetic interpretations of the blend, allowing the user to view and compare completely different design directions side-by-side.
