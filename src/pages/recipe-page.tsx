import { ChefHat, Clock, Download, ShoppingCart, Users } from "lucide-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import type { RecipeProps } from "../components/interfaces";
import { API_ENDPOINTS } from "../constants/api";

const RecipePage = ({
  recipe,
  onBack,
}: RecipeProps & { onBack: () => void }) => {
  const handleDownloadPDF = async () => {
    if (!recipe) return;

    console.log("Starting PDF download for:", recipe.name);

    try {
      // Send recipe data to backend
      const response = await fetch(API_ENDPOINTS.PDF, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe }),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response Content-Type:",
        response.headers.get("Content-Type")
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to generate PDF: ${response.status} - ${errorText}`
        );
      }

      // CRITICAL: Get the PDF as arrayBuffer first, then create blob
      // This prevents text encoding corruption
      const arrayBuffer = await response.arrayBuffer();
      console.log("ArrayBuffer size:", arrayBuffer.byteLength);

      // Create blob from arrayBuffer with explicit type
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);

      // Verify blob is not empty
      if (blob.size === 0) {
        throw new Error("Received empty PDF");
      }

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recipe.name}.pdf`;
      document.body.appendChild(a);

      console.log("Triggering download...");
      a.click();

      // Cleanup after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log("Download complete");
      }, 100);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Check console for details.");
    }
  };

  return (
    <>
      {recipe && (
        <div className="recipe-content min-h-screen bg-gradient-to-br from-secondary via-background to-muted">
          {/* Header */}
          <div className="bg-gradient-accent p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h1 className="font-sofia text-3xl md:text-4xl text-white mb-4 animate-fade-in">
                    {recipe?.name}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-white/90 font-nunito">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-white" />
                      <span className="font-medium">
                        Prep Time: {recipe?.prepTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-white" />
                      <span className="font-medium">
                        Cook Time: {recipe?.cookTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-white" />
                      <span className="font-medium">
                        Serves: {recipe?.servings}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownloadPDF}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-nunito font-medium px-6"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                  <Button
                    onClick={onBack}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-nunito font-medium px-6"
                  >
                    Parse New Recipe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="max-w-6xl mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients - Left Side */}
              <Card className="p-6 shadow-soft animate-slide-up bg-white/80 backdrop-blur-sm border-warmPeach/20 !h-auto">
                <div className="mb-6">
                  <h2 className="font-sofia text-2xl md:text-3xl text-primary mb-2 flex items-center gap-3">
                    <ShoppingCart className="w-7 h-7 text-primary" />
                    Ingredients
                  </h2>
                  <div className="h-1 w-16 bg-gradient-primary rounded-full"></div>
                </div>

                <ul className="space-y-3">
                  {recipe?.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="font-nunito text-foreground flex items-start gap-3 p-3 rounded-lg hover:bg-warmPeach/10 transition-colors duration-200 border-l-2 border-warmPeach/30"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-primary font-bold text-lg leading-none mt-1">
                        •
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Directions - Right Side */}
              <Card
                className="p-6 shadow-soft animate-slide-up bg-white/80 backdrop-blur-sm border-coral/20"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="mb-6">
                  <h2 className="font-sofia text-2xl md:text-3xl text-primary mb-2 flex items-center gap-3">
                    <ChefHat className="w-7 h-7 text-primary" />
                    Directions
                  </h2>
                  <div className="h-1 w-16 bg-gradient-primary rounded-full"></div>
                </div>

                <ol className="space-y-4">
                  {recipe?.directions.map((direction, index) => (
                    <li
                      key={index}
                      className="font-nunito text-foreground flex gap-4 p-4 rounded-lg hover:bg-coral/10 transition-colors duration-200 border-l-2 border-coral/30"
                      style={{
                        animationDelay: `${
                          (index + recipe.ingredients.length) * 0.1
                        }s`,
                      }}
                    >
                      <span className="bg-gradient-primary text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {direction}
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 p-6">
              <p className="font-nunito text-muted-foreground mb-4 flex items-center justify-center gap-2">
                Happy cooking!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
