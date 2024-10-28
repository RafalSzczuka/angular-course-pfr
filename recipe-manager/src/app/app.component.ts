import { Component } from '@angular/core';
import { RecipeListComponent } from './ui/recipe-list';
import { RecipeDetailComponent } from './ui/recipe-detail/';
import { RecipeModel } from './core/recipe/model';
import { RecipeTemplateFormComponent } from './ui/recipe-template-form/recipe-template-form.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipeListComponent, RecipeDetailComponent, RecipeTemplateFormComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';
}
