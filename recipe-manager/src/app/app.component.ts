import { Component } from '@angular/core';
import { RecipeListComponent } from './ui/recipe-list';
import { RecipeDetailComponent } from './ui/recipe-detail/';
import { RecipeModel } from './core/recipe/model';
import { RecipeTemplateFormComponent } from './ui/recipe-template-form/recipe-template-form.component';
import { MatButtonModule } from '@angular/material/button';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RecipeListComponent, RecipeDetailComponent, RecipeTemplateFormComponent, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';
  isLoading: boolean = false

  constructor(private router: Router) {
    this.router.events.subscribe(e => { // subskrybujemy się do strumienia events
      if (e instanceof NavigationStart) { // sprawdzamy instancje
        this.isLoading = true // gdy nawigacja startuje chcemy widzieć loader
      }
      if (e instanceof NavigationEnd) {
        this.isLoading = false // w każdym innym przypadku chcemy go wyłączyć
      }
      if (e instanceof NavigationCancel) {
        this.isLoading = false
      }
      if (e instanceof NavigationError) {
        this.isLoading = false
      }
    })
  }

}
