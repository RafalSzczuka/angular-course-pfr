import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';
  isLoading = false

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
