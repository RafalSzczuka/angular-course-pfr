import { RecipeModel } from "./recipe.model";

export type EventRecipeModel = RecipeModel & { selectedRecipeTitle: string | null };