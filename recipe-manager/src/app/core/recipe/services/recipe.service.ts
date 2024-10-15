import { Injectable } from '@angular/core';
import { RecipeModel } from '../models';

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

  constructor() {}

  // Metoda pobierająca wszystkie przepisy
  getRecipes(): RecipeModel[] {
    return this.recipes;
  }

  // Metoda usuwająca przepis
  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
  }
}
