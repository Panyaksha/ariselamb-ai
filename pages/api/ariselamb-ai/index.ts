// @/pages/api/ariselamb-ai/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";
import { enableCors } from "@/middleware/enableCors";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY!,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = req.headers["uid"] as string;
    const { message } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required in headers" });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

    const riwayatResponse = await fetch(
      `${baseUrl}/api/ringkasan-gejala-user?uid=${uid}`
    );

    if (!riwayatResponse.ok) {
      return res.status(500).json({ error: "Failed to fetch user summary" });
    }

    const riwayatData = await riwayatResponse.json();
    const ringkasan_text = riwayatData.ringkasan_text || "";

    const prompt = `
Kamu adalah asisten kesehatan lambung. Gunakan data riwayat pasien berikut:

RIWAYAT:
${ringkasan_text}

Pertanyaan user:
${message}

Berikan jawaban yang singkat, jelas, dan aman untuk kesehatan.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      reply: response.text,
      used_uid: uid,
      used_context: ringkasan_text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export default enableCors(handler);