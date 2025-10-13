import { useState } from "react";
import type { Recipe } from "./components/interfaces";
import { API_ENDPOINTS } from "./constants/api";
import { validateUrl, validateRecipe } from "./utils/validation";
import LoadingPage from "./pages/loading-page";
import RecipePage from "./pages/recipe-page";
import LandingPage from "./pages/landing-page";

export const App = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [currentView, setCurrentView] = useState<
    "landing" | "loading" | "recipe"
  >("landing");

  const handleBack = () => {
    setCurrentView("landing");
    setRecipe(null);
  };

  const sendURL = async (url: string) => {
    if (!validateUrl(url)) {
      console.error("Invalid URL provided");
      return;
    }

    setCurrentView("loading");

    try {
      const response = await fetch(API_ENDPOINTS.GEMINI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { reply } = await response.json();

      if (validateRecipe(reply)) {
        setRecipe(reply);
        setCurrentView("recipe");
      } else {
        throw new Error("Invalid recipe format received");
      }
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
      setCurrentView("landing");
    }
  };

  if (currentView === "recipe" && recipe) {
    return <RecipePage recipe={recipe} onBack={handleBack} />;
  }

  if (currentView === "loading") {
    return <LoadingPage />;
  }

  return <LandingPage sendURL={sendURL} />;
};
