import { Component } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';

  selectedRecipe: { title: string, description: string } | null = null;

  onRecipeSelected(recipe: { title: string, description: string }) {
    this.selectedRecipe = recipe;
  }
}
