import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeModel } from '../../core/recipe/models';

@Component({
  selector: 'app-recipe-list-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list-element.component.html',
  styleUrl: './recipe-list-element.component.scss',
})
export class RecipeListElementComponent {
  @Input() recipe: RecipeModel | undefined = undefined;
  @Output() recipeSelected = new EventEmitter<RecipeModel & { selectedRecipeTitle: string }>();
  @Output() recipeRemoved = new EventEmitter<number>();

  onRecipeClick(recipe: RecipeModel) {
    const toEmit = { ...recipe, selectedRecipeTitle: recipe.title };
    this.recipeSelected.emit(toEmit);
  }

  onDeleteRecipe(id: number): void {
    this.recipeRemoved.emit(id);
  }
}
