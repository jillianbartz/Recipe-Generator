import "dotenv/config";
import express from "express";
import cors from "cors";
import geminiRouter from "./src/server/gemini.js";
import exportPdfRouter from "./src/server/pdf.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/gemini", geminiRouter);
app.use("/api/pdf", exportPdfRouter);

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
