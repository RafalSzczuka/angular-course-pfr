// Krok 1 - Aktualizacja modelu RecipeModel
export interface RecipeModel {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  preparationTime: number;  // w minutach
  difficulty: 'easy' | 'medium' | 'hard';
}

// Krok 2 - Tworzenie serwisu RecipeService
import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeModel[] = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Klasyczne włoskie danie.',
      ingredients: ['Pasta', 'Eggs', 'Pork', 'Cheese', 'Pepper'],
      preparationTime: 30,
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Pancakes',
      description: 'Puszyste naleśniki z miodem.',
      ingredients: ['Flour', 'Milk', 'Eggs', 'Honey'],
      preparationTime: 20,
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Tacos',
      description: 'Meksykańskie tacos z wołowiną i salsą.',
      ingredients: ['Flour', 'Milk', 'Eggs', 'Beef', 'Salt'],
      preparationTime: 60,
      difficulty: 'hard'
    }
  ];

  constructor() {}

  // Metoda pobierająca wszystkie przepisy
  getRecipes(): RecipeModel[] {
    return this.recipes;
  }
}

// Krok 5 - recipe-list-element.component.ts emitowanie zdarzenia usunięcia przepisu
// ...
export class RecipeListComponent implements OnInit {
  // ...
  @Output() recipeRemoved = new EventEmitter<number>();
// ...
  onDeleteRecipe(id: number): void {
    this.recipeRemoved.emit(id);
  }
}



// Krok 5 - recipe.service.ts

// ...
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
// ...

  // Metoda usuwająca przepis
  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
  }
}

// Krok 5 - recipe-list.component usuwanie przepisu

// ...
export class RecipeListComponent implements OnInit{
// ...
  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);  // Usuwanie przepisu
    this.recipes = this.recipeService.getRecipes();  // Odśwież listę
  }
}