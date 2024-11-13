export interface RecipeModel {
    id?: number;
    title: string;
    description: string;
    ingredients: string[];
    preparationTime?: number;  // w minutach
    difficulty?: 'easy' | 'medium' | 'hard';
    imageBase64?: string; // nowe pole na obraz w formacie base64
}
