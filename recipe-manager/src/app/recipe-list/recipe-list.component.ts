import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes = [
    { title: 'Spaghetti Carbonara', description: 'Klasyczne włoskie danie.' },
    { title: 'Pancakes', description: 'Puszyste naleśniki z miodem.' },
    { title: 'Tacos', description: 'Meksykańskie tacos z wołowiną i salsą.' }
  ];

  @Output() recipeSelected = new EventEmitter<{ title: string, description: string }>();

  onRecipeClick(recipe: { title: string, description: string }) {
    this.recipeSelected.emit(recipe);
  }
}
