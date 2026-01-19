'use client'

import { useState } from "react";
import { generateImage } from "./actions/generateImage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles, RefreshCcw, Wand2 } from "lucide-react";

// 1. List of ready-made Prompts for "Surprise Me"
const RANDOM_PROMPTS = [
  "A futuristic city floating in the clouds, golden hour, cinematic lighting",
  "A cute robot gardening in a greenhouse, detailed, 8k render",
  "An astronaut riding a horse on Mars, digital art, synthwave style",
  "A magical library with flying books, fantasy art, warm colors",
  "Portrait of a cat wearing a king's crown, oil painting style"
];

// 2. List of styles for quick selection
const ART_STYLES = [
  "Cyberpunk",
  "Anime",
  "3D Render",
  "Oil Painting",
  "Watercolor",
  "Pixel Art",
  "Cinematic"
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageParam, setImageParam] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    setImageParam(null);

    try {
      const result = await generateImage(prompt);
      setImageParam(result);
    } catch (error) {
      alert("Κάτι πήγε στραβά! Δοκίμασε ξανά.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!imageParam) return;
    const link = document.createElement("a");
    link.href = imageParam;
    link.download = `dream-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 3. "Surprise Me" functionality
  function handleSurprise() {
    const randomPrompt = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(randomPrompt);
  }

  // 4. Add style function
  function applyStyle(style: string) {
    if (prompt.includes(style)) return; // If it already exists, don't upload it again.
    setPrompt((prev) => prev ? `${prev}, ${style}` : style);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      
      <div className="max-w-xl w-full space-y-8">
        
        {/* HEADER: With Gradient Text */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              DreamAI
            </span>
            <span className="ml-2">🎨</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Generate stunning images using <span className="font-semibold text-slate-700">Stable Diffusion XL</span>
          </p>
        </div>

        {/* CONTROLS SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input 
                placeholder="Describe your dream..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="pr-10 h-12 text-base shadow-sm" // Bigger Input
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
              {/* Surprise button inside the Input */}
              <button 
                onClick={handleSurprise}
                className="absolute right-3 top-3 text-slate-400 hover:text-violet-600 transition"
                title="Surprise Me"
              >
                <RefreshCcw className="h-5 w-5" />
              </button>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !prompt}
              className="h-12 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md transition-all active:scale-95"
            >
              {loading ? <RefreshCcw className="animate-spin h-5 w-5" /> : <Wand2 className="h-5 w-5 mr-2" />}
              {loading ? "" : "Generate"}
            </Button>
          </div>

          {/* STYLE CHIPS */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider self-center mr-2">
              Styles:
            </span>
            {ART_STYLES.map((style) => (
              <Badge 
                key={style} 
                variant="secondary" 
                className="cursor-pointer hover:bg-violet-100 hover:text-violet-700 transition px-3 py-1"
                onClick={() => applyStyle(style)}
              >
                + {style}
              </Badge>
            ))}
          </div>

        </div>

        {/* IMAGE DISPLAY CARD */}
        <Card className="overflow-hidden border-slate-200 shadow-xl rounded-2xl">
          <CardContent className="p-0 min-h-[400px] flex items-center justify-center bg-slate-50 relative group">
            
            {loading && (
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin mx-auto"></div>
                  <Sparkles className="h-6 w-6 text-violet-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">Designing your masterpiece...</p>
              </div>
            )}

            {!loading && !imageParam && (
              <div className="text-center text-slate-400 p-10">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="h-10 w-10 text-slate-300" />
                </div>
                <p>Enter a prompt above or pick a style to start.</p>
              </div>
            )}

            {imageParam && (
              <img 
                src={imageParam} 
                alt="Generated AI Art" 
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            )}
          </CardContent>

          {imageParam && (
            <CardFooter className="p-4 bg-white border-t flex justify-between items-center">
              <span className="text-xs text-slate-400">Generated with SDXL</span>
              <Button onClick={handleDownload} variant="outline" className="gap-2 hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          )}
        </Card>

      </div>
    </main>
  );
}