import { Routes } from '@angular/router';
import { recipePageResolver } from '@core/recipe/resolvers/recipe-page.resolver';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';
import { RecipeReactiveFormComponent } from './features/recipe-reactive-form/recipe-reactive-form.component';


export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // domyślna ścieżka, która przekierowuje na /recipes jeśli nie ma podanej innej ścieżki.
    { path: 'recipes', component: RecipeListComponent }, // ścieżka do widoku listy przepisów.
    { path: 'recipe/add', component: RecipeReactiveFormComponent, resolve: { recipePageResolver } }, // ścieżka do formularza dodawania nowego przepisu.
    { path: 'recipe/edit/:id', component: RecipeReactiveFormComponent }, // ścieżka do formularza edycji przepisu, gdzie :id jest dynamicznym parametrem.
    { path: 'recipe/:id', component: RecipeDetailComponent } //  ścieżka do szczegółów wybranego przepisu.
];