import { Injectable } from '@angular/core';
import { RecipeModel } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeModel[] = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Klasyczne włoskie danie.',
      ingredients: ['makaron', 'jajka', 'boczek', 'ser', 'pieprz'],
      preparationTime: 30,
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Pancakes',
      description: 'Puszyste naleśniki z syropem klonowym.',
      ingredients: ['mąka', 'mleko', 'jajka', 'syrop klonowy'],
      preparationTime: 20,
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Tacos',
      description: 'Meksykańskie tacos z wołowiną i salsą.',
      ingredients: ['mąka', 'mleko', 'jajka', 'wołowina', 'salsa'],
      preparationTime: 60,
      difficulty: 'hard'
    }
  ];

  popularIngredients: string[] = [
    'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
    'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
    'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
    'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
    'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
    'Corn', 'Chili powder'
  ];

  constructor() {}

  // Metoda pobierająca wszystkie przepisy
  getRecipes(): RecipeModel[] {
    return this.recipes;
  }

  // Metoda usuwająca przepis
  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
  }

  // Metoda dodająca nowy przepis
  addRecipe(recipe: RecipeModel): void {
    recipe.id = this.recipes.length + 1;  // Automatyczne przypisanie ID
    this.recipes.push(recipe);
  }

  // Metoda edytująca istniejący przepis
  editRecipe(updatedRecipe: RecipeModel): void {
    const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
    }
  }

   // Metoda pobierająca wszystkie popularne składniki
   getPopularIngredients(): string[] {
    return this.popularIngredients;
  }
}
