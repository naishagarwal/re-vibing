# VideoDiff - Design Decisions

## Original Design Decision
**Parallel Alternatives**: The system presents 3 entirely separate video editing timelines/transcripts side-by-side. The user compares these parallel alternatives to find the one they like best.

## 3 Alternate Possibilities
1. **Inline Accept/Reject (Merge UI)**: Present a single transcript containing *all* suggested edits highlighted inline. The user clicks individual edits to accept or reject them, much like resolving a Git merge conflict.
2. **Timeline-centric NLE View**: Focus entirely on a traditional video timeline block representation rather than a text transcript.
3. **Rule-based Constraints**: Instead of generating alternatives, the user specifies rules ("Cut all pauses", "Add B-roll every 10 seconds") and the system applies them deterministically.

## New Implemented Decision
**Inline Accept/Reject (Merge UI)**: We implemented `VideoDiff Merge`. It generates one highly-edited transcript where every AI suggestion (cuts, B-roll, text) is togglable inline. This changes the paradigm from "choosing a path" to "curating a single path".
