import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RecipeListElementComponent } from '@ui/recipe-list-element';
import { RecipeModel } from '@core/recipe/model';
import { RecipeService } from '@core/recipe/service';
import { tap } from 'rxjs';
import { HighlightOnHoverDirective } from '@core/recipe/directives/highlight-on-hover.directive';
import { DifficultyPipe } from '@core/recipe/pipes/difficulty.pipe';
import { IngredientPipe } from '@core/recipe/pipes/ingredient.pipe';
import { PreparationTimePipe } from '@core/recipe/pipes/preparation-time.pipe';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeListElementComponent, RouterLink, MatCardModule, MatButtonModule, HighlightOnHoverDirective, PreparationTimePipe, DifficultyPipe, IngredientPipe, MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipeListComponent implements OnInit {
  selectedRecipeTitle: string | null = '';
  recipes: RecipeModel[] = [];
  filteredRecipes: RecipeModel[] = []; // przechowuje liste przefiltrowanych przepisów wg trudności wykonania
  selectedDifficulty: string = '';  // informacja o aktualnie wybranym poziomie trudności.
  searchTerm: string = ''; // Tekst wpisany przez użytkownika do wyszukiwania


  @Output() recipeSelected = new EventEmitter<RecipeModel | null>();

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.getRecipes();
  }

  onDeleteRecipe(id: number | undefined): void {
    if (id) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.getRecipes();  // Odśwież listę

      });  // Usuwanie przepisu
    }
  }

  private getRecipes(): void {
    // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"
    this.recipeService.getRecipes().pipe(
      // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model
      tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
        //przypisanie modelu do zmiennej
        this.recipes = recipesFromGetRecipesMethod;
        this.filterRecipes(); // Inicjalne filtrowanie przy pobraniu przepisów
      })
      // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne
    ).subscribe();
  }

  //Gdy przepisy zostaną pobrane z serwera, funkcja getRecipes() zapisze je w recipes,
  // a następnie wywoła filterRecipes(), by zastosować filtr (jeśli jest ustawiony).
  filterRecipes(): void {
    // Filtrowanie według trudności
    let filteredByDifficulty = this.selectedDifficulty ? this.recipes.filter(recipe => recipe.difficulty === this.selectedDifficulty) : this.recipes;
  
    // Dodatkowe filtrowanie według nazwy przepisu
    if (this.searchTerm) {
      this.filteredRecipes = filteredByDifficulty.filter(recipe => recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredRecipes = filteredByDifficulty; // Bez filtra wyszukiwania pokazujemy przepisy przefiltrowane według trudności
    }
  }
}
