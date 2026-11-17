const fs = require('fs');
const path = require('path');

function write(p, content) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content.trim() + '\n');
}

write('/Users/naishaagarwal/vibe-coding/showcase/src/app/misty/DESIGN_DECISIONS.md', `
# Misty - Design Decisions

## Original Design Decision
**Semantic Diff UI**: The system presents a single blended output and visualizes changes using a "Semantic Diff" (categorizing code changes like "Color", "Layout"). Users refine the design by toggling these specific categories on or off.

## 3 Alternate Possibilities
1. **Multiple Variations (A/B/C Testing)**: Instead of granular toggles on one output, generate 3 completely distinct aesthetic variations (e.g., Minimal, Playful, Corporate) for the user to pick from.
2. **Chat-based Iteration**: A conversational sidebar where the user types "Make it more like the reference image's borders" to iteratively refine.
3. **Visual Node Graph**: Connecting specific UI elements from the reference image directly to DOM nodes in the code via a drag-and-drop wire interface.

## New Implemented Decision
**Multiple Variations**: We implemented a new version called \`Misty Variants\` that takes the reference image and WIP code, and immediately generates 3 distinct aesthetic interpretations of the blend, allowing the user to view and compare completely different design directions side-by-side.
`);

write('/Users/naishaagarwal/vibe-coding/showcase/src/app/selenite/DESIGN_DECISIONS.md', `
# Selenite - Design Decisions

## Original Design Decision
**Text-based Comparison Matrix**: Generates a grid of options and criteria containing descriptive textual paragraphs to scaffold sensemaking before the user reads raw documents.

## 3 Alternate Possibilities
1. **Quantitative Scoring Matrix**: Instead of text, assign numerical scores (0-100) for each criterion to allow rapid, at-a-glance visual comparison using charts or progress bars.
2. **Interactive Decision Tree**: Ask the user a series of binary questions to narrow down the options dynamically.
3. **Conversational QA Bot**: A chatbot primed with the overview data that waits for the user to ask specific questions about the options.

## New Implemented Decision
**Quantitative Scoring Matrix**: We implemented \`Selenite Scoring\`, which instructs the LLM to output a numerical score (0-100) instead of text for each option/criterion intersection. The UI renders this as visual progress bars, radically speeding up the time it takes to compare options at a glance.
`);

write('/Users/naishaagarwal/vibe-coding/showcase/src/app/videodiff/DESIGN_DECISIONS.md', `
# VideoDiff - Design Decisions

## Original Design Decision
**Parallel Alternatives**: The system presents 3 entirely separate video editing timelines/transcripts side-by-side. The user compares these parallel alternatives to find the one they like best.

## 3 Alternate Possibilities
1. **Inline Accept/Reject (Merge UI)**: Present a single transcript containing *all* suggested edits highlighted inline. The user clicks individual edits to accept or reject them, much like resolving a Git merge conflict.
2. **Timeline-centric NLE View**: Focus entirely on a traditional video timeline block representation rather than a text transcript.
3. **Rule-based Constraints**: Instead of generating alternatives, the user specifies rules ("Cut all pauses", "Add B-roll every 10 seconds") and the system applies them deterministically.

## New Implemented Decision
**Inline Accept/Reject (Merge UI)**: We implemented \`VideoDiff Merge\`. It generates one highly-edited transcript where every AI suggestion (cuts, B-roll, text) is togglable inline. This changes the paradigm from "choosing a path" to "curating a single path".
`);

write('/Users/naishaagarwal/vibe-coding/showcase/src/app/talebrush/DESIGN_DECISIONS.md', `
# TaleBrush - Design Decisions

## Original Design Decision
**Continuous Sketching for Fortune**: The user sketches a continuous 2D line graph (X = time, Y = fortune) to guide the protagonist's luck across the entire story arc before generation.

## 3 Alternate Possibilities
1. **Discrete Emotion Sliders**: Instead of drawing a continuous fortune line, the user sets specific sliders for multidimensional tones (e.g., Joy, Danger, Mystery) for the *next* sentence, generating the story iteratively step-by-step.
2. **Emoji Timeline**: The user drags and drops emoji icons onto a timeline track to dictate the plot beats.
3. **Branching Narrative**: At each step, the AI generates 3 different continuations and the user selects one, building a tree.

## New Implemented Decision
**Discrete Emotion Sliders**: We implemented \`TaleBrush Sliders\`. The user sets specific intensity levels for "Joy", "Danger", and "Mystery" to generate the story sentence-by-sentence. This shifts control from a holistic pre-planned arc to an iterative, multidimensional steering mechanism.
`);

console.log("Markdown generation complete.");
