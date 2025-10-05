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
    await page.setViewport({ width: 1200, height: 800 });

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
                  ? `<div class="meta-item"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg><span>Prep Time: ${recipe.prepTime}</span></div>`
                  : ""
              }
              ${
                recipe.cookTime
                  ? `<div class="meta-item"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg><span>Cook Time: ${recipe.cookTime}</span></div>`
                  : ""
              }
              ${
                recipe.servings
                  ? `<div class="meta-item"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Serves: ${recipe.servings}</span></div>`
                  : ""
              }
            </div>
          </div>
        </div>
        <div class="content">
          <div class="recipe-section">
            <div class="card card-ingredients">
              <div class="card-header"><h2><svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Ingredients</h2><div class="underline"></div></div>
              <ul class="ingredients-list">
                ${recipe.ingredients
                  .map(
                    (ing) =>
                      `<li><span class="bullet">•</span><span>${ing}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
          <div class="recipe-section">
            <div class="card card-directions">
              <div class="card-header"><h2><svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Directions</h2><div class="underline"></div></div>
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
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Get the content height to avoid blank pages
    const contentHeight = await page.evaluate(() => {
      const content = document.querySelector(".content");
      return content ? content.offsetHeight : 0;
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
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
