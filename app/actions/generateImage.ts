'use server'

import { InferenceClient } from '@huggingface/inference'; 

export async function generateImage(prompt: string) {
  const token = process.env.HUGGING_FACE_TOKEN;
  if (!token) {
    throw new Error("Missing Hugging Face Token");
  }

  // 2. Use of new client
  const client = new InferenceClient(token);

  try {
    const response = await client.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted",
      }
    });

    // "Forget what you think it is (unknown) and treat it as a Blob"
    const resultBlob = response as unknown as Blob;
    
    const arrayBuffer = await resultBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    return `data:image/png;base64,${base64}`;

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to generate image");
  }
}