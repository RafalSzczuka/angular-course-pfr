import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeListElementComponent } from '../recipe-list-element/recipe-list-element.component';
import { RecipeService } from '../../core/recipe/service/recipe.service';
import { EventRecipeModel, RecipeModel } from '../../core/recipe/model';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeListElementComponent, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit{
  selectedRecipeTitle: string | null = '';
  recipes: RecipeModel[]  = [];

  @Output() recipeSelected = new EventEmitter<RecipeModel | null>();

  constructor(private recipeService: RecipeService) {

  }
  ngOnInit(): void {
    this.recipes =  this.recipeService.getRecipes();
  }

  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);  // Usuwanie przepisu
    this.recipes = this.recipeService.getRecipes();  // Odśwież listę
  }
}
