# Selenite - Design Decisions

## Original Design Decision
**Text-based Comparison Matrix**: Generates a grid of options and criteria containing descriptive textual paragraphs to scaffold sensemaking before the user reads raw documents.

## 3 Alternate Possibilities
1. **Quantitative Scoring Matrix**: Instead of text, assign numerical scores (0-100) for each criterion to allow rapid, at-a-glance visual comparison using charts or progress bars.
2. **Interactive Decision Tree**: Ask the user a series of binary questions to narrow down the options dynamically.
3. **Conversational QA Bot**: A chatbot primed with the overview data that waits for the user to ask specific questions about the options.

## New Implemented Decision
**Quantitative Scoring Matrix**: We implemented `Selenite Scoring`, which instructs the LLM to output a numerical score (0-100) instead of text for each option/criterion intersection. The UI renders this as visual progress bars, radically speeding up the time it takes to compare options at a glance.
