import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { RecipeModel } from '../../core/recipe/model';
import { RecipeService } from '../../core/recipe/service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './recipe-reactive-form.component.html',
  styleUrl: './recipe-reactive-form.component.scss'
})
export class RecipeReactiveFormComponent {
  isEditMode = false;
  currentRecipe: RecipeModel | undefined;
  recipeFormGroup!: FormGroup;
  popularIngredients: string[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      ingredients: [[], Validators.required],
      preparationTime: ['', Validators.required],
      difficulty: ['', Validators.required]
    });

    this.popularIngredients = this.recipeService.getPopularIngredients();

    // jeżeli istnieje przepis to go ustawiamy - tryb edycji
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // ustawiamy edit mode
      this.isEditMode = true;
      this.currentRecipe = this.recipeService.getRecipeById(+id);
      if (this.currentRecipe) {
        this.currentRecipe.id = +id;
      }
    }

    // jeżeli jest przepis, ustawiamy obecne wartości w formularzu
    if (this.currentRecipe) {
      // zadziała dla niemal wszystkich typów kontrolek, nie zadziała dla formArray
      this.recipeFormGroup.patchValue(this.currentRecipe);
    }
  }

  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza
      if (this.isEditMode) {
        if (this.currentRecipe) {
          recipe.id = this.currentRecipe?.id;
        }
        this.recipeService.editRecipe(recipe) // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu
      } else {
      this.recipeService.addRecipe(recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu
      }

      this.router.navigate(['/recipes']); // Powrót do listy przepisów
    }
  }
}