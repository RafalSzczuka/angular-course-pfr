import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeListElementComponent } from '../recipe-list-element/recipe-list-element.component';
import { RecipeModel } from '../core/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeListElementComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  selectedRecipeTitle: string = '';
  recipes = [
    { title: 'Spaghetti Carbonara', description: 'Klasyczne włoskie danie.' },
    { title: 'Pancakes', description: 'Puszyste naleśniki z syropem klonowym.' },
    { title: 'Tacos', description: 'Meksykańskie tacos z wołowiną i salsą.' }
  ];

  @Output() recipeSelected = new EventEmitter<RecipeModel>();

  onRecipeClick(listElement: { title: string, description: string, selectedRecipeTitle: string }) {
    this.selectedRecipeTitle = listElement.selectedRecipeTitle;
    const toEmit: RecipeModel = { title: listElement.title, description: listElement.description };
    this.recipeSelected.emit(toEmit);
  }
}
