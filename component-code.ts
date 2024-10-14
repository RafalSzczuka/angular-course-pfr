import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes = [
    { title: 'Spaghetti Carbonara', description: 'Klasyczne włoskie danie.' },
    { title: 'Pancakes', description: 'Puszyste naleśniki z syropem klonowym.' },
    { title: 'Tacos', description: 'Meksykańskie tacos z wołowiną i salsą.' }
  ];

  // ####################  TAKE THIS (step 6)
  @Output() recipeSelected = new EventEmitter<{ title: string, description: string }>();

  onRecipeClick(recipe: { title: string, description: string }) {
    this.recipeSelected.emit(recipe);
  }

  // ####################
}



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
  // ####################  TAKE THIS (step 7)
  selectedRecipe: { title: string, description: string } | null = null;

  onRecipeSelected(recipe: { title: string, description: string }) {
    this.selectedRecipe = recipe;
  }
  // ####################
}