import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeListElementComponent } from '../recipe-list-element/recipe-list-element.component';
import { RecipeService } from '../../core/recipe/service/recipe.service';
import { RecipeModel } from '../../core/recipe/model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeListElementComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit{
  selectedRecipeTitle: string = '';
  recipes: RecipeModel[]  = [];

  @Output() recipeSelected = new EventEmitter<RecipeModel>();

  constructor(private recipeService: RecipeService) {

  }
  ngOnInit(): void {
    this.recipes =  this.recipeService.getRecipes();
  }

  onRecipeClick(listElement: RecipeModel & { selectedRecipeTitle: string }) {
    this.selectedRecipeTitle = listElement.selectedRecipeTitle;
    this.recipeSelected.emit(listElement);
  }

  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);  // Usuwanie przepisu
    this.recipes = this.recipeService.getRecipes();  // Odśwież listę
  }
}
