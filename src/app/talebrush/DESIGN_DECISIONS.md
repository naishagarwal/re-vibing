# TaleBrush - Design Decisions

## Original Design Decision
**Continuous Sketching for Fortune**: The user sketches a continuous 2D line graph (X = time, Y = fortune) to guide the protagonist's luck across the entire story arc before generation.

## 3 Alternate Possibilities
1. **Discrete Emotion Sliders**: Instead of drawing a continuous fortune line, the user sets specific sliders for multidimensional tones (e.g., Joy, Danger, Mystery) for the *next* sentence, generating the story iteratively step-by-step.
2. **Emoji Timeline**: The user drags and drops emoji icons onto a timeline track to dictate the plot beats.
3. **Branching Narrative**: At each step, the AI generates 3 different continuations and the user selects one, building a tree.

## New Implemented Decision
**Discrete Emotion Sliders**: We implemented `TaleBrush Sliders`. The user sets specific intensity levels for "Joy", "Danger", and "Mystery" to generate the story sentence-by-sentence. This shifts control from a holistic pre-planned arc to an iterative, multidimensional steering mechanism.
