import { useEffect, useState } from "react";
import { Button } from "./components/button";
import backdropImage from "./components/img/landing-backdrop.jpg";
import { Input } from "./components/input";
import type { Recipe } from "./components/interfaces";
import LoadingPage from "./pages/loading-page";
import RecipePage from "./pages/recipe-page";
import LandingPage from "./pages/landing-page";

const tempData = {
  name: ["Pie"],
  prepTime: ["12 minutes"],
  cookTime: ["20 minutes"],
  servings: ["24"],
  ingredients: [
    "2 ½ cups all-purpose flour",
    "1 teaspoon salt",
    "1 cup (2 sticks) unsalted butter, cold and cut into ½-inch pieces",
    "½ cup ice water",
    "6-8 medium apples (preferably a mix of sweet and tart, like Honeycrisp, Granny Smith, Fuji, or Gala), peeled, cored, and sliced ¼-inch thick",
    "½ cup granulated sugar (adjust to apple sweetness)",
    "¼ cup packed light brown sugar",
    "2 tablespoons all-purpose flour",
    "1 teaspoon ground cinnamon",
    "¼ teaspoon ground nutmeg",
    "⅛ teaspoon ground cloves (optional)",
    "1 tablespoon fresh lemon juice",
    "1 tablespoon unsalted butter, cut into small pieces",
    "1 large egg, beaten",
    "1 tablespoon turbinado sugar (for sprinkling)",
  ],
  directions: [
    "In a large bowl, whisk together the flour and salt. Add the cold butter pieces and cut them into the flour using a pastry blender or your fingertips until the mixture resembles coarse crumbs with some pea-sized butter chunks remaining.",
    "Gradually add the ice water, 1 tablespoon at a time, mixing until the dough just comes together. Be careful not to overmix. Divide the dough in half, flatten each half into a disk, wrap tightly in plastic wrap, and refrigerate for at least 30 minutes (or up to 2 days).",
    "Preheat your oven to 425°F (220°C).",
    "In a large bowl, combine the sliced apples, granulated sugar, brown sugar, flour, cinnamon, nutmeg, cloves (if using), and lemon juice. Toss gently until the apples are evenly coated.",
    "On a lightly floured surface, roll out one disk of dough into a 12-inch circle. Carefully transfer the dough to a 9-inch pie plate. Trim the edges, leaving about a 1-inch overhang.",
    "Pour the apple filling into the pie crust, mounding it slightly in the center. Dot the top of the filling with the small pieces of butter.",
    "Roll out the second disk of dough into another 12-inch circle. You can place this over the filling as a solid top crust, cut it into strips for a lattice top, or cut out decorative shapes.",
    "If making a solid top crust, place it over the filling. Trim the edges, leaving about a 1-inch overhang. Press the top and bottom crusts together to seal, then crimp the edges decoratively using your fingers or a fork. Cut several slits in the top crust to allow steam to escape.",
    "If making a lattice top, cut the dough into 1-inch wide strips. Weave them over the apples in a lattice pattern. Trim the ends and press them to the bottom crust, crimping the edges.",
    "In a small bowl, whisk the egg with 1 teaspoon of water to create an egg wash. Brush the top crust evenly with the egg wash and sprinkle with turbinado sugar.",
    "Place the pie on a baking sheet (to catch any drips). Bake for 15 minutes at 425°F (220°C).",
    "Reduce the oven temperature to 375°F (190°C) and continue baking for another 45-60 minutes, or until the crust is golden brown and the filling is bubbly and tender when pierced with a knife. If the crust starts browning too quickly, loosely tent the pie with aluminum foil.",
    "Remove the pie from the oven and let it cool on a wire rack for at least 2-3 hours before slicing and serving. This allows the filling to set properly.",
  ],
};

export const App = () => {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [readyForDisplay, setReadyForDisplay] = useState(false);
  const [landingPageVisible, setLandingPageVisible] = useState(true);
  // useEffect(() => {
  //   setRecipe(tempData);
  // }, []);

  //debounce set url
  function handleChange(inputURL: string) {
    const handler = setTimeout(() => {
      console.log("set url");
      setUrl(inputURL);
    }, 200);
    return () => clearTimeout(handler);
  }

  const handleBack = () => {
    setLandingPageVisible(true);
    setReadyForDisplay(false);
    setIsLoading(false);
  };

  const sendURL = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting URL:", url);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        console.error("Backend returned error:", response.status);
        return;
      }

      const recipeText = await response.json();

      if (recipeText.reply.ingredients && recipeText.reply.directions) {
        setRecipe(recipeText.reply);
      }
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
    setIsLoading(false);
    setReadyForDisplay(true);
  };

  //   const sendURL = async (e: React.FormEvent) => {
  //     e.preventDefault();
  // console.log("HERE")
  //       setIsLoading(true);

  //     const handler = setTimeout(() => {
  //     setIsLoading(false);
  //       setReadyForDisplay(true);
  //     }, 2000);
  //     console.log("got here")
  //     return () => clearTimeout(handler);
  //   };

  if (readyForDisplay) {
    return <RecipePage recipe={recipe} onBack={handleBack} />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  if (landingPageVisible) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(232, 157, 88, 0.9), rgba(232, 131, 88, 0.9)), url(${backdropImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-2xl w-full text-center animate-fade-in">
          <div className="mb-12">
            <h1 className="font-sofia text-6xl md:text-7xl text-white mb-4 drop-shadow-lg">
              Sweet Recipes
            </h1>
            <p className="font-nunito text-xl md:text-2xl text-white/90 font-light">
              Transform any recipe URL into a beautiful, organized format
            </p>
          </div>

          <form onSubmit={sendURL} className="space-y-6">
            <div className="relative">
              <Input
                type="url"
                placeholder="Paste your recipe URL here..."
                className="w-full h-16 text-lg font-nunito px-6 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-soft focus:shadow-glow focus:bg-white transition-all duration-300 placeholder:text-muted-foreground/70"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto px-12 py-4 text-lg font-nunito font-semibold bg-accent hover:bg-accent/90 text-white rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Parse My Recipe
            </Button>
          </form>

          <div className="mt-16 text-white/70 font-nunito">
            <p className="text-sm">
              Supports most popular recipe websites including AllRecipes, Food
              Network, Tasty, and more!
            </p>
          </div>
        </div>
      </div>
    );
  }
};
