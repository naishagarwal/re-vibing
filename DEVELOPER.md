# Developer Guide for Misty

This document provides a detailed walkthrough for developers to understand, install, and run the Misty UI Prototyping system.

## Overview
Misty is a UI prototyping tool based on the concept of "Interactive Conceptual Blending". It allows developers to blend visual aspects from example reference images (like screenshots or sketches) into a work-in-progress React UI.

### Architecture
- **Frontend Framework**: Next.js 14 (App Router) + React + Tailwind CSS
- **Live Code Execution**: `react-live` is used to dynamically render the generated React component directly in the browser.
- **Generative AI Backend**: Uses OpenAI's `gpt-4o` (or equivalent Vision-Language Model) to parse the provided UI code, analyze the reference image, and generate updated code along with "Semantic Diffs".
- **Image Manipulation**: `react-image-crop` is used to allow users to select specific sections of the reference image for Drag-and-Drop blending.

## Requirements
- Node.js (v18+)
- npm or yarn
- An OpenAI API Key (with access to `gpt-4o` or similar vision models).

## Setup Instructions

1. **Clone/Navigate to the Repository**
   Ensure you are in the `misty-app` directory.

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root of the project with the following:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   *Note: If you do not have an API key configured, the app will not be able to perform AI blending operations.*

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure
- `src/app/page.tsx`: The main application page containing the UI for uploading images, writing code, and viewing the blended output.
- `src/app/api/blend/route.ts`: The Next.js API route that communicates with OpenAI. It constructs the Global and Drag-and-Drop blending prompts based on the research paper.
- `src/components/`: Reusable components, including the Semantic Diff toggler and the Live Code preview pane.

## Modifying the Prompts
The blending instructions provided to the AI are based on the original Misty paper. You can find and tweak these prompts in `src/app/api/blend/route.ts` if you want to experiment with different prompt engineering techniques.
