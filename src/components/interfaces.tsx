import type { ReactNode } from "react";

export interface RecipeProps {
  recipe: Recipe | null;
}

export interface Recipe {
  name: string[];
  ingredients: string[];
  directions: string[];
  prepTime: string[];
  cookTime: string[];
  servings: string[];
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface CardProps {
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
