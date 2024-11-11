**Moduł 8: Filtrowanie i wyszukiwanie**
Filtrowanie przepisów według poziomu trudności wykonania (łatwe, trudne, średnio trudne).
Wyszukiwanie przepisów na podstawie nazwy.


1. Na początek, rozszerzmy trochę zakres naszych przepsów.
   * Przejdź do `component-code.ts`
   * Podmień zawartość pliku `db.json` na kod z `component-code.ts` - krok 1.

2. Dodanie funkcji filtrowania
   * przejdź do `recipe-list.component.ts`
   * dodaj dwie zmienne
   > `filteredRecipes: RecipeModel[] = []; // przechowuje liste przefiltrowanych przepisów wg trudności wykonania`
   > `selectedDifficulty: string = '';  // informacja o aktualnie wybranym poziomie trudności.`

   * Stwórz funkcję filterRecipes() - ta funkcja sprawdzi, czy użytkownik wybrał konkretny poziom trudności.
     Jeśli tak, to wyświetli przepisy o tej trudności, a jeśli nie, to pokaże wszystkie przepisy

      > `//Gdy przepisy zostaną pobrane z serwera, funkcja getRecipes() zapisze je w recipes,`
      > `// a następnie wywoła filterRecipes(), by zastosować filtr (jeśli jest ustawiony).`
      > `filterRecipes(): void {`
      > `  if (this.selectedDifficulty) {`
      > `    this.filteredRecipes = this.recipes.filter(recipe => recipe.difficulty === this.selectedDifficulty);`
      > `  } else {`
      > `    this.filteredRecipes = this.recipes;  // Bez filtra pokazujemy wszystkie przepisy`
      > `  }`
      > `}`

   * Zmień istniejącą funkcję `getRecipes()`, by uwzględniała automatyczne filtrowanie po pobraniu przepisów:
   > `private getRecipes(): void {`
   > `  this.recipeService.getRecipes().pipe(`
   > `    tap((recipesFromGetRecipesMethod: RecipeModel[]) => {`
   > `      this.recipes = recipesFromGetRecipesMethod;`
   > `      this.filterRecipes(); // Inicjalne filtrowanie przy pobraniu przepisów`
   > `    })`
   > `  ).subscribe();`
   > `}`

   * Dodaj do listy importów dwa moduły `MatSelectModule` i `FormsModule`
      **MatSelectModule** jest potrzebny, aby móc używać elementu `<mat-select>`, który pozwala na wybór poziomu trudności.
      **FormsModule** jest potrzebny, aby poprawnie działało dwukierunkowe bindowanie danych, dzięki któremu wybrana trudność automatycznie zapisze się w zmiennej `selectedDifficulty`.


   * przejdź do `recipe-list.component.html`.
   * Wstaw poniższy kod na początku pliku:
   > ` <mat-form-field>`
   > `  <mat-label>Filtruj wg trudności wykonania</mat-label>`
   > `  <mat-select [(ngModel)]="selectedDifficulty" (selectionChange)="filterRecipes()">`
   > `    <mat-option value="">Wszystkie</mat-option>`
   > `    <mat-option value="easy">Łatwy</mat-option>`
   > `    <mat-option value="medium">Średni</mat-option>`
   > `    <mat-option value="hard">Trudny</mat-option>`
   > `  </mat-select>`
   > `</mat-form-field>`

   **(ngModel)** wiąże zmienną selectedDifficulty z wybraną wartością w `<mat-select>`.
   **(selectionChange)="filterRecipes()"** wywołuje funkcję `filterRecipes()`, gdy użytkownik zmieni poziom trudności, dzięki czemu lista przepisów zostanie automatycznie przefiltrowana.


   * Znajdź pętlę `*ngFor="let recipe of recipes"` i zmień ją na: `*ngFor="let recipe of filteredRecipes"`
   * na koniec dorzuć drobne style do pliku `recipe-list.component.scss`
   > ` mat-form-field {`
   > `  width: 100%;`
   > `  border-radius: 12px;`
   > `}`


3. Dodanie funkcji wyszukiwania po nazwie.
   * Przejdź do `recipe-list.component.ts`
   * Dodaj zmienną `searchTerm`, która będzie przechowywać tekst wpisany przez użytkownika w polu wyszukiwania.
   > `searchTerm: string = ''; // Tekst wpisany przez użytkownika do wyszukiwania`

   * Zaktualizuj funkcję `filterRecipes()`, by uwzględniała wyszukiwanie po nazwie
   > `filterRecipes(): void {`
   > `  // Filtrowanie według trudności`
   > `  let filteredByDifficulty = this.selectedDifficulty ? this.recipes.filter(recipe => recipe.difficulty === this.selectedDifficulty) : this.recipes;`
   > 
   > `  // Dodatkowe filtrowanie według nazwy przepisu`
   > `  if (this.searchTerm) {`
   > `    this.filteredRecipes = filteredByDifficulty.filter(recipe => recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()));`
   > `  } else {`
   > `    this.filteredRecipes = filteredByDifficulty; // Bez filtra wyszukiwania pokazujemy przepisy przefiltrowane według trudności`
   > `  }`
   > `}`

   * dodaj `MatInputModule` do listy importów.

   * następnie przejdź do `recipe-list.component.html` i dodaj na samej górze naszej strony input, który będzie wyszukiwarką przepisów
   > `  <!-- Pole wyboru przepisu po nazwie -->`
   > `<mat-form-field>`
   > `  <input matInput placeholder="Wyszukaj przepis" [(ngModel)]="searchTerm"`
   > `    (input)="filterRecipes()" />`
   > `</mat-form-field>`



W tym module:
   * Dodaliśmy funkcjonalność filtrowania listy przepisów po poziomie trudności oraz po nazwie.