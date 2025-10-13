// Validation utilities
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRecipe = (recipe: any): boolean => {
  return (
    recipe &&
    typeof recipe === "object" &&
    typeof recipe.name === "string" &&
    Array.isArray(recipe.ingredients) &&
    Array.isArray(recipe.directions) &&
    recipe.ingredients.length > 0 &&
    recipe.directions.length > 0
  );
};

export const sanitizeFilename = (filename: string): string => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
