import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRecipeModel, RecipeModel } from '../../core/recipe/model';

@Component({
  selector: 'app-recipe-list-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list-element.component.html',
  styleUrl: './recipe-list-element.component.scss',
})
export class RecipeListElementComponent {
  @Input() recipe: RecipeModel | undefined = undefined;
  @Output() recipeSelected = new EventEmitter<EventRecipeModel | null>();
  @Output() recipeRemoved = new EventEmitter<number>();

  onRecipeClick(recipe: RecipeModel) {
    const toEmit: EventRecipeModel = { ...recipe, selectedRecipeTitle: recipe.title,  };
    this.recipeSelected.emit(toEmit);
  }

  onDeleteRecipe(recipe: RecipeModel): void {
    this.recipeRemoved.emit(recipe.id);
    this.recipeSelected.emit(null);
  }
}
