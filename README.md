# DreamAI 🎨

A modern, free AI Image Generator built with **Next.js 16**, **Shadcn UI**, and **Stable Diffusion XL** (via Hugging Face).

## ✨ Features

- **🤖 Text-to-Image:** Generate high-quality images using the SDXL model.
- **🎲 Surprise Me:** Stuck for ideas? Click the refresh icon for a random, creative prompt.
- **🎨 Style Presets:** Quickly apply styles like *Cyberpunk*, *Anime*, *3D Render*, and more with one click.
- **💾 Download Art:** Save your generated masterpieces directly to your device.
- **⚡ Modern UI:** Built with Shadcn UI, featuring gradients, loading states, and responsive design.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI (Radix Primitives)
- **AI Model:** Stable Diffusion XL (via Hugging Face Inference API)
- **Icons:** Lucide React

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone [https://github.com/Fivkas/dream-ai.git](https://github.com/Fivkas/dream-ai.git)
cd dream-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Hugging Face Access Token:

```env
HUGGING_FACE_TOKEN=hf_your_token_here
```
*(You can get a free token from [Hugging Face Settings](https://huggingface.co/settings/tokens))*

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start creating art!

## 📂 Project Structure

- `app/actions`: Server Actions handling the API communication (hiding the API key).
- `components/ui`: Shadcn UI components (Buttons, Inputs, Cards).
- `app/page.tsx`: The main frontend logic and UI.