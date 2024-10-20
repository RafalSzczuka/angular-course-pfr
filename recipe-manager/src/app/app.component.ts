import { Component } from '@angular/core';
import { RecipeListComponent } from './ui/recipe-list';
import { RecipeDetailComponent } from './ui/recipe-detail/';
import { RecipeModel } from './core/recipe/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';

  selectedRecipe: RecipeModel | null = null;

  onRecipeSelected(recipe: RecipeModel) {
    this.selectedRecipe = recipe;
  }
}
