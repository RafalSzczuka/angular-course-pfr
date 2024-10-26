import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeModel } from '../../core/recipe/model';
import { RecipeService } from '../../core/recipe/service';

@Component({
  selector: 'app-recipe-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-reactive-form.component.html',
  styleUrl: './recipe-reactive-form.component.scss'
})
export class RecipeReactiveFormComponent {
  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;
  showForm = false;
  recipeFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      ingredients: ['', Validators.required]
    });

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
        ingredients: this.recipeFormGroup.value.ingredients.split(','), // metoda pomocnicza split(',') znajduje w ciągu znaków ',' i na tej podstawie rozdziela ciąg na części
        preparationTime: 30,
        difficulty: 'easy'
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