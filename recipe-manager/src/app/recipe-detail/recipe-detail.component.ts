import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: { title: string, description: string } | null = null;
}
