// ######################### recipe-detail.component.ts - krok 6 #########################

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes = [
    { title: 'Spaghetti Carbonara', description: 'Klasyczne włoskie danie.' },
    { title: 'Pancakes', description: 'Puszyste naleśniki z miodem.' },
    { title: 'Tacos', description: 'Meksykańskie tacos z wołowiną i salsą.' }
  ];

  // ####################  krok 6
  @Output() recipeSelected = new EventEmitter<{ title: string, description: string }>();

  onRecipeClick(recipe: { title: string, description: string }) {
    this.recipeSelected.emit(recipe);
  }

  // ####################
}

// ######################### #########################



// ######################### app.component.ts - krok 7 #########################

import { Component } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';
  // ####################  krok 7
  selectedRecipe: { title: string, description: string } | null = null;

  onRecipeSelected(recipe: { title: string, description: string }) {
    this.selectedRecipe = recipe;
  }
  // ####################
}

// ######################### #########################