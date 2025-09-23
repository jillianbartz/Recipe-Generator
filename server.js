import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Backend running!"));

app.post("/", async (req, res) => {
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
      vertexai: true,
      project: projectId,
      location: location,
    });

    const content = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Extract only the preparation time (in minutes), cook time (in minutes), serving amount, ingredients and directions from this recipe page.
Format it as JSON with keys "prepTime", "cookTime", "servings", "ingredients" and "directions".
<url>${url}</url>`,
    });

    var recipe;
    try {
      var cleaned = content.text
        .trim()
        .replace(/^```json\s*/, "")
        .replace(/```$/, "");
      recipe = JSON.parse(cleaned);
    } catch {
      recipe = { raw: content.text.trim() };
    }
    return recipe;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
