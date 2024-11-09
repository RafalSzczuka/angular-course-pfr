import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeModel } from '@core/recipe/model';
import { RecipeService } from '@core/recipe/service';

@Component({
  selector: 'app-recipe-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './recipe-template-form.component.html',
  styleUrl: './recipe-template-form.component.scss'
})
export class RecipeTemplateFormComponent implements OnInit {
  isEditMode = false;
  popularIngredients: string[] = [];
  currentRecipe: RecipeModel | undefined;
  recipe: RecipeModel = {
    id: undefined,
    title: '',
    description: '',
    ingredients: [''],
    preparationTime: undefined,
    difficulty: undefined
  };

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.getPopularIngredients().subscribe(result => {
      this.popularIngredients = result;
    });

    // jeżeli istnieje przepis to go ustawiamy - tryb edycji
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // ustawiamy edit mode
      this.isEditMode = true;
      // pobieramy edytowany przepis
      this.recipeService.getRecipeById(+id).subscribe(result => {
        this.currentRecipe = result;
      });

      // jeżeli jest przepis, ustawiamy obecne wartości w formularzu
      if (this.currentRecipe) {
        this.currentRecipe.id = +id;
        this.recipe = this.currentRecipe;
      }
    }


  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditMode) {
        this.recipeService.editRecipe(this.recipe); // Wysyłanie danych do serwisu w postaci edycji istniejącego
      } else {
        this.recipeService.addRecipe(this.recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu
      }
      this.router.navigate(['/recipes']); // Powrót do listy przepisów
    }
  }
}
