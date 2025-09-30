import { Router } from "express";
import puppeteer from "puppeteer";
import { getPdfStyles } from "./pdf-styles.js";

const router = Router();

router.post("/export-pdf", async (req, res) => {
  const { recipe } = req.body;

  if (!recipe || !recipe.name || !recipe.ingredients || !recipe.directions) {
    return res.status(400).send("Invalid recipe data");
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        ${getPdfStyles()}
      </head>
      <body>
        <div class="header">
          <div class="header-content">
            <h1>${recipe.name}</h1>
            <div class="meta-info">
              ${
                recipe.prepTime
                  ? `<div class="meta-item"><span>⏱️</span><span>Prep Time: ${recipe.prepTime}</span></div>`
                  : ""
              }
              ${
                recipe.cookTime
                  ? `<div class="meta-item"><span>⏱️</span><span>Cook Time: ${recipe.cookTime}</span></div>`
                  : ""
              }
              ${
                recipe.servings
                  ? `<div class="meta-item"><span>👥</span><span>Serves: ${recipe.servings}</span></div>`
                  : ""
              }
            </div>
          </div>
        </div>
        <div class="content">
          <div class="grid">
            <div class="card card-ingredients">
              <div class="card-header"><h2>🛒 Ingredients</h2><div class="underline"></div></div>
              <ul class="ingredients-list">
                ${recipe.ingredients
                  .map(
                    (ing) =>
                      `<li><span class="bullet">•</span><span>${ing}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="card card-directions">
              <div class="card-header"><h2>👨‍🍳 Directions</h2><div class="underline"></div></div>
              <ol class="directions-list">
                ${recipe.directions
                  .map(
                    (dir) =>
                      `<li><span class="step-number"></span><span>${dir}</span></li>`
                  )
                  .join("")}
              </ol>
            </div>
          </div>
          <div class="footer">Happy cooking!</div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", pdfBuffer.length);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="recipe-${recipe.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.pdf"`
    );
    res.end(pdfBuffer, "binary");
  } catch (err) {
    console.error("PDF Generation Error:", err);
    if (browser) await browser.close();
    res.status(500).send("Failed to generate PDF");
  }
});

export default router;
