export interface RecipeModel {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    preparationTime: number;  // w minutach
    difficulty: 'easy' | 'medium' | 'hard';
}
