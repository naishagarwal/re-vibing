# Misty: UI Prototyping Through Interactive Conceptual Blending

Misty is an experimental web application inspired by the research paper "Misty: UI Prototyping Through Interactive Conceptual Blending". It provides a novel UI workflow that allows developers to rapidly incorporate diverse aspects (like layout, color, and style) from design examples into work-in-progress UIs.

## Features

- **Global Blending**: Upload an example UI screenshot and blend its layout or style directly into your current work-in-progress React code.
- **Drag-and-Drop Blending**: Select a specific cropped region of an example image to blend into your code.
- **Semantic Diff**: Instead of just giving you the final code, Misty categorizes the AI's changes (e.g., "Color Changes", "Layout Changes"). You can toggle these categories on and off to tweak the final design.
- **Live Preview**: Your work-in-progress React and Tailwind CSS code is rendered in real-time in the browser.

## How to Launch

1. Navigate to the project directory:
   ```bash
   cd misty-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your OpenAI API key:
   Create a `.env.local` file in the root directory and add your key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:3000`.

## Usage Guide

1. **Write WIP Code**: On the left pane, write or paste your work-in-progress React component. Use Tailwind CSS for styling. (Note: imports are not supported in the live editor; use global React and LucideIcons).
2. **Upload Reference Image**: Upload a screenshot, sketch, or design mockup that you want to draw inspiration from.
3. **Select Region (Optional)**: If you want to use the entire image, you can leave it as is. If you want to perform a specific "Drag-and-Drop" blend, crop the relevant region of the image.
4. **Choose Aspect**: Select whether you want to blend the "Layout", "Visual Style", or "Color Theme" from the reference image.
5. **Blend**: Click "Global Blend" or "Blend Cropped Area" to trigger the conceptual blending via AI.
6. **Review Changes**: Once the AI finishes, it will present the updated code and a "Semantic Diff" panel. Toggle specific categories (like Font or Color changes) to fine-tune the design.
