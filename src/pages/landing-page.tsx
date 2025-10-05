import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import type { LandingPageProps } from "../components/interfaces";
import backdropImage from "../components/img/landing-backdrop.jpg";

const LandingPage = ({ sendURL }: LandingPageProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      sendURL(url);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your recipe URL here..."
              className="w-full h-16 text-lg font-nunito px-6 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-soft focus:shadow-glow focus:bg-white transition-all duration-300 placeholder:text-muted-foreground/70"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
};

export default LandingPage;
