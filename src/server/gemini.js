import { GoogleGenAI } from "@google/genai";
import express from "express";

// Gemini Configuration
const GEMINI_CONFIG = {
  MODEL: "gemini-2.5-pro",
  API_VERSION: "v1beta1",
};

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION;

if (!GOOGLE_CLOUD_PROJECT || !GOOGLE_CLOUD_LOCATION) {
  console.error(
    "Missing required environment variables: GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION"
  );
  process.exit(1);
}

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const result = await generateContent(url);
    res.json({ reply: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

async function generateContent(
  url,
  projectId = GOOGLE_CLOUD_PROJECT,
  location = GOOGLE_CLOUD_LOCATION
) {
  try {
    const ai = new GoogleGenAI({
      project: projectId,
      location: location,
      httpOptions: {
        apiVersion: GEMINI_CONFIG.API_VERSION,
      },
    });

    const content = await ai.models.generateContent({
      model: GEMINI_CONFIG.MODEL,
      contents: `Extract the recipe data from the provided URL and return it as a single JSON object.
Do not include any extra text or explanations.
If a field is not found, its value should be null.

URL: <url>${url}</url>

JSON Format:
{
  "name": "string",
  "prepTime": "integer",
  "cookTime": "integer",
  "servings": "integer",
  "ingredients": ["string"],
  "directions": ["string"]
}`,
      config: { tools: [{ urlContext: {} }] },
    });

    let recipe;
    try {
      const cleaned = content.text
        .trim()
        .replace(/^```json\s*/, "")
        .replace(/```$/, "");
      recipe = JSON.parse(cleaned);
    } catch (parseError) {
      console.warn(
        "Failed to parse JSON response, returning raw text:",
        parseError
      );
      recipe = { raw: content.text.trim() };
    }
    return recipe;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export default router;
