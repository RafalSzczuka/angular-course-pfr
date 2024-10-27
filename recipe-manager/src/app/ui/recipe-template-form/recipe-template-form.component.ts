import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RecipeModel } from '../../core/recipe/model';
import { RecipeService } from '../../core/recipe/service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './recipe-template-form.component.html',
  styleUrl: './recipe-template-form.component.scss'
})
export class RecipeTemplateFormComponent implements OnInit {
  // Normalnie moglibyśmy nie pisać tutaj typu bo po co
  // Robimy to explicite  w celach dydaktycznych
  showForm: boolean = false;

  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;

     // Lista popularnych składników
     popularIngredients: string[] = [
      'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
      'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
      'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
      'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
      'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
      'Corn', 'Chili powder'
    ];
  
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    if (this.currentRecipe) {
      // Jeśli edytujemy, wypełnij formularz danymi przepisu
    }
  }

  // Metoda do pokazania/ukrycia formularza
  toggleForm(): void {
      this.showForm = !this.showForm;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(),
        title: form.value.title,
        description: form.value.description,
        ingredients: form.value.ingredients,
        preparationTime: form.value.preparationTime,
        difficulty: form.value.difficulty
      };

      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }
      form.reset();
      this.showForm = false;
    }
  }
}
