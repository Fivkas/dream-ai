'use server'

import { HfInference } from '@huggingface/inference';

export async function generateImage(prompt: string) {
  // 1. Ελέγχουμε αν υπάρχει το κλειδί
  const token = process.env.HUGGING_FACE_TOKEN;
  if (!token) {
    throw new Error("Missing Hugging Face Token");
  }

  const hf = new HfInference(token);

  try {
    // 2. Ζητάμε από το AI (Stable Diffusion XL) να φτιάξει την εικόνα
    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted", // Τι ΔΕΝ θέλουμε
      }
    });

    // 3. Η εικόνα έρχεται ως "Blob" (raw data). 
    // Πρέπει να τη μετατρέψουμε σε Buffer και μετά σε Base64 string
    // για να μπορεί να εμφανιστεί στο <img src="..." />
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    // Επιστρέφουμε το string έτοιμο για χρήση
    return `data:image/png;base64,${base64}`;

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to generate image");
  }
}
