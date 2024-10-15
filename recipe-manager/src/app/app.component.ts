import { Component } from '@angular/core';

import { RecipeDetailComponent } from './ui/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './ui/recipe-list';
import { RecipeModel } from './core/recipe/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';

  selectedRecipe: Partial<RecipeModel> | null = null;

  onRecipeSelected(recipe: Partial<RecipeModel>) {
    this.selectedRecipe = recipe;
  }
}
