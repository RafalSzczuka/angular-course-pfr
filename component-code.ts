// ######################### app.routes.ts - krok 3 #########################

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/recipes', pathMatch: 'full'
  }, // domyślna ścieżka, która przekierowuje na /recipes jeśli nie ma podanej innej ścieżki.
  {
      path: 'recipes',
      loadChildren: () => import('./feature/recipe-list/recipe-list.routes').then(c => c.RECIPE_LIST_ROUTES)
  }, // ścieżka do widoku listy przepisów.
  {
      path: 'recipe/add',
      loadChildren: () => import('./feature/recipe-reactive-form/recipe-reactive-form.routes').then(c => c.RECIPE_REACTIVE_FORM_ROUTES), resolve: { recipePageResolver }
  }, // ścieżka do formularza dodawania nowego przepisu.
  {
      path: 'recipe/edit/:id',
      loadChildren: () => import('./feature/recipe-reactive-form/recipe-reactive-form.routes').then(c => c.RECIPE_REACTIVE_FORM_ROUTES)
  }, // ścieżka do formularza edycji przepisu, gdzie :id jest dynamicznym parametrem.
  {
      path: 'recipe/:id',
      loadChildren: () => import('./feature/recipe-detail/recipe-detail.routes').then(c => c.RECIPE_DETAILS_ROUTES)
  } //  ścieżka do szczegółów wybranego przepisu.
];

// ######################### #########################