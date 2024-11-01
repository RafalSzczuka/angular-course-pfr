import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeModel } from '../../core/recipe/model';
import { RecipeService } from '../../core/recipe/service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './recipe-reactive-form.component.html',
  styleUrl: './recipe-reactive-form.component.scss'
})
export class RecipeReactiveFormComponent {
  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;
  showForm = false;
  recipeFormGroup!: FormGroup;
  popularIngredients: string[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationTime: ['', Validators.required],
      difficulty: ['', Validators.required]
    });

    this.popularIngredients = this.recipeService.getPopularIngredients();

    if (this.currentRecipe) {
      this.recipeFormGroup.patchValue(this.currentRecipe);
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(),
        ...this.recipeFormGroup.value,
      };

      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      this.recipeFormGroup.reset();
      this.showForm = false;
    }
  }
}