// ############ recipe.model.ts - krok 1 ############

export interface RecipeModel {
  id?: number;
  title: string;
  description?: string;
  ingredients?: string[];
  preparationTime?: number;  // w minutach
  difficulty?: 'easy' | 'medium' | 'hard';
}

// ############ ############



// ############ recipe.service.ts - krok 2 ############
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

  constructor() { }

  // Metoda pobierająca wszystkie przepisy
  getRecipes(): RecipeModel[] {
    return this.recipes;
  }
}

// ############ ############



// ############ recipe-list-element.component.ts - krok 5 ############
// ...
export class RecipeListComponent implements OnInit {
  constructor(private recipeService: RecipeService) { }

  selectedRecipeTitle: string = '';
  recipes: RecipeModel[] = [];

  @Output() recipeSelected = new EventEmitter<RecipeModel>();

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
// 

// ############ recipe-list-element.component.ts ############
// ...
export class RecipeListElementComponent implements OnInit {
  // ...
  @Output() recipeRemoved = new EventEmitter<number>();
  // ...
  onDeleteRecipe(id: number): void {
    this.recipeRemoved.emit(id);
  }
}

//  ############ ############



// ############ recipe.service.ts - krok 5 ############

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

// ############ ############



// ############ recipe-list.component - krok 5 ############

// ...
export class RecipeListComponent implements OnInit {
  // ...
  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);  // Usuwanie przepisu
    this.recipes = this.recipeService.getRecipes();  // Odśwież listę
  }
}

// ############ ############