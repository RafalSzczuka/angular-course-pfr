**Moduł 5: Routing i nawigacja**
* Routing: tworzenie wielostronicowej aplikacji.
* Dodanie widoków dla różnych części aplikacji, takich jak: lista przepisów, szczegóły przepisu, formularz dodawania/edycji przepisu.
* Widok szczegółowy przepisu: wyświetlanie składników i instrukcji po kliknięciu na dany przepis.
  
_Moduł 5 jest ważnym krokiem w zrozumieniu, jak organizować wielostronicową aplikację w Angularze za pomocą routingu, co pozwala użytkownikom przemieszczać się między różnymi sekcjami aplikacji. W ramach tego modułu uczestnicy dowiedzą się, jak ustawić routing dla listy przepisów, widoku szczegółowego oraz formularza dodawania/edycji przepisów._


1. Konfiguracja Angular Router
   * Angular Router to narzędzie, które umożliwia nawigację między widokami w aplikacji. Najpierw zainstalujemy podstawową konfigurację routingu w głównym module aplikacji.
   Przejdź do `app.config.ts` i upewnij się że masz `provideRouter(routes)` w liście providers.
   * Przejdź do `app.routes.ts` i zdefiuniuj tablice routingu tak:
    > `export const routes: Routes = [`
    > `  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // domyślna ścieżka, która przekierowuje na /recipes jeśli nie ma podanej innej ścieżki.`
    > `  { path: 'recipes', component: RecipeListComponent }, // ścieżka do widoku listy przepisów.`
    > `  { path: 'recipe/add', component: RecipeTemplateFormComponent }, // ścieżka do formularza dodawania nowego przepisu.`
    > `  { path: 'recipe/edit/:id', component: RecipeTemplateFormComponent }, // ścieżka do formularza edycji przepisu, gdzie :id jest dynamicznym parametrem.`
    > `  { path: 'recipe/:id', component: RecipeDetailComponent } //  ścieżka do szczegółów wybranego przepisu.`
    > `];`

2. Tworzenie Linków do Nawigacji Między Widokami
   Teraz utworzymy linki w menu, które umożliwią użytkownikowi nawigację po aplikacji

    * Przejdź do `app.component.html` i zastąp obecny kod tym:
      > `<section class="container">`
      > `    <nav>`
      > `        <span><strong>Recipe Manager</strong></span>`
      > `        <ul>`
      > `            <!-- dyrektywa Angulara, która ustawia trasę na odpowiedni widok. -->`
      > `            <li><a routerLink="/recipes">Lista Przepisów</a></li>`
      > `            <li><a routerLink="/recipe/add">Dodaj Nowy Przepis</a></li>`
      > `        </ul>`
      > `    </nav>`
      > `    <main>`
      > `        <!-- miejsce w szablonie, gdzie Angular Router ładuje komponenty zależnie od bieżącej ścieżki. -->`
      > `        <router-outlet></router-outlet>`
      > `    </main>`
      > `    <footer>`
      > `        &reg;Angular - poziom podstawowy`
      > `    </footer>`
      > `</section>`

    * Następnie przejdź do `app.component.ts` i pozbądź się niepotrzebnego kodu:
        > `selectedRecipe: RecipeModel | null = null;`
        >
        > `onRecipeSelected(recipe: RecipeModel | null) {`
        > `  this.selectedRecipe = recipe;`
        > `}`

    * Przejdź teraz do `app.component.scss` i dodaj style:
      > `/* Styl kontenera głównego */`
      > `.container {`
      > `    min-height: 100vh; /*  zapewnia, że kontener rozciąga się na całą wysokość okna przeglądarki. */`
      > `    display: flex; /* flexbox layout by poukładać elementy na stronie */`
      > `    flex-direction: column; /* kierunek układania się elementów */`
      > `  }`
      > 
      > `  /* Styl nawigacji */`
      > `  nav {`
      > `    width: 100%;`
      > `    padding: 2rem 0;`
      > `    display: flex;`
      > `    justify-content: flex-start; /* Wyśrodkowanie elementów w poziomie */`
      > `    gap: 8rem; /* przerwa między blokami */`
      > 
      > `    span {`
      > `        margin: 0;`
      > `        padding: 0;`
      > `        text-decoration: none;`
      > `        transition: color 0.3s ease, text-decoration 0.3s ease;`
      > `        align-self: flex-start;`
      >
      > `        strong {`
      > `           color: #3f51b5;`
      > `           font-size: 2rem;`
      > `        }`
      > `    }`
      > `
      > `    ul {`
      > `      list-style: none;`
      > `      display: flex;`
      > `      gap: 1.5rem; /* Odstęp między linkami */`
      > `      margin: 0;`
      > `      padding: 0;`
      > `    }`
      > 
      > `    li {`
      > `      a {`
      > `        text-decoration: none;`
      > `        color: #333;`
      > `        font-size: 1.1rem;`
      > `        transition: color 0.3s ease, text-decoration 0.3s ease;`
      > 
      > `        &:hover {`
      > `          cursor: pointer;`
      > `          text-decoration: underline; /* Podkreślenie na hover */`
      > `          color: #007bff; /* Akcentowany kolor na hover */`
      > `        }`
      > `      }`
      > `    }`
      > `  }`
      > 
      > `  /* Styl głównej sekcji (main) */`
      > `  main {`
      > `    flex: 1; /* Wypełnia całą dostępną przestrzeń pionową */`
      > `    padding: 2rem;`
      > `  }`
      > 
      > `  /* Styl stopki */`
      > `footer {`
      > `  margin-top: auto;`
      > `  padding: 1rem 0;`
      > `  text-align: center;`
      > `  font-size: 0.9rem;`
      > `  color: #666;`
      > `}`


        **Pozbądź się też zaimportowanych, nie używanych zależności z listy imports oraz dodaj RouterOutlet**

**Tworzenie Widoków dla Każdej Ścieżki**
_Teraz utworzymy widoki, które użytkownik zobaczy korzystająć z nawigacji po aplikacji_

3. Widok Listy Przepisów (RecipeListComponent)
  * Otwórz `recipe-list.component.html` i upewnij się, że każdy przepis ma link, który prowadzi do widoku szczegółowego. Dodajmy przycisk "Zobacz szczegóły".
    > `<div class="container">`
    > `  <mat-card class="recipe-card" *ngFor="let recipe of recipes">`
    > `    <mat-card-title>{{ recipe.title }}</mat-card-title>`
    > `    <mat-card-content>`
    > `      <p><strong>Składniki:</strong> {{ recipe.ingredients.join(', ') }}</p>`
    > `    </mat-card-content>`
    > `    <mat-card-actions>`
    > `      <button mat-button color="primary"`
    > `        [routerLink]="['/recipe', recipe.id]">Zobacz szczegóły</button>`
    > `      <button mat-button color="accent"`
    > `        [routerLink]="['/recipe/edit', recipe.id]">Edytuj</button>`
    > `      <button mat-button color="warn"`
    > `        (click)="onDeleteRecipe(recipe.id)">Usuń</button>`
    > `    </mat-card-actions>`
    > `  </mat-card>`
    > `</div `

  * Przejdź do `recipe-list.component.ts` i: 
    * pozbądź się metody `onRecipeClick()` gdyż nie jest już potrzebna
    * dodaj `MatButtonModule` do listy import 

  * Przejdź do `recipe-list.component.scss` i dodaj style:
    > `/* Styl głównego kontenera dla kart przepisów */`
    > `:host {`
    > `  display: block;`
    > `  padding: 1rem;`
    > `}`
    > 
    > `/* Stylizujemy kontener kart jako siatkę */`
    > `.container {`
    > `  display: grid;`
    > `  grid-template-columns: repeat(3, 1fr); /* 3 kolumny o równych szerokościach */`
    > `  gap: 1.5rem; /* Odstęp między kartami */`
    > `}`
    > 
    > `/* Styl karty przepisu */`
    > `.recipe-card {`
    > `  text-align: center;`
    > `  transition: box-shadow 0.3s ease, transform 0.3s ease;`
    > `  min-height: 350px;`
    > 
    > `  /* Efekt hover: cień wokół karty */`
    > `  &:hover {`
    > `    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);`
    > `    transform: translateY(-2px); /* Uniesienie karty na hover */`
    > `  }`
    > `}`
    > 
    > `/* Stylizacja tytułu karty */`
    > `mat-card-title {`
    > `  font-size: 1.5rem;`
    > `  font-weight: bold;`
    > `  text-align: center;`
    > `  color: #3f51b5;`
    > `  margin: 1rem 1rem;`
    > `}`
    > 
    > `/* Stylizacja treści (składników) */`
    > `mat-card-content {`
    > `  p {`
    > `    font-size: 1rem;`
    > `    color: #333;`
    > `    margin: 0.75rem 0;`
    > `    line-height: 1.6;`
    > `  }`
    > 
    > `  strong {`
    > `    color: #3f51b5;`
    > `  }`
    > `}`
    > 
    > `/* Stylizacja przycisków */`
    > `mat-card-actions {`
    > `  margin: 10px;`
    > `  display: flex;`
    > `  justify-content: space-between;`
    > 
    > `  button {`
    > `    font-size: 1rem;`
    > `  }`
    > 
    > `  /* Stylowanie przycisków edycji i powrotu */`
    > `  button[color="accent"] {`
    > `    background-color: #ff4081;`
    > `    color: #ffffff;`
    > `  }`
    > 
    > `  button[color="primary"] {`
    > `    background-color: #3f51b5;`
    > `    color: #ffffff;`
    > `  }`
    > 
    > `  button[color="primary"]:hover, button[color="accent"]:hover {`
    > `    filter: brightness(0.9); /* Przyciemnia kolor przycisku na hover */`
    > `  }`
    > `}`

4. Widok Szczegółów Przepisu (RecipeDetailComponent)
   * Przejdź do `recipe-details-component.ts`. Musimy zadbać by ten komponent sam zdobył sobie przepis. Podanie go przez Input'a już nie wchodzi w grę. To czego będziemy potrzebowali to id przepisu, weźmiemy go sobie z adresu URL, oraz serwisu `RecipeService`

   Podmień klase komponentu na:
    > `export class RecipeDetailComponent implements OnInit {`
    > `  recipe: RecipeModel | undefined;`
    > 
    > `  constructor(`
    > `    private route: ActivatedRoute,`
    > `    private recipeService: RecipeService`
    > `  ) {}`
    > 
    > `  ngOnInit(): void {`
    > `    const id = this.route.snapshot.paramMap.get('id');`
    > `    if (id) {`
    > `      this.recipe = this.recipeService.getRecipeById(+id);`
    > `    }`
    > `  }`
    > `}`

Podmień `CommonModule, RouterLink, MatCardModule, MatButtonModule` w liście importów.

Zadanie do wykonania:
  * Kompilator po skopiowaniu wcześniejszego kodu, na pewno krzyczy, że brakuje mu implementacji metody `getRecipeById`, napisz ją.


Gdy już implementacja jest gotowa, przejdźmy do `recipe-details-component.html`, musimy go trochę dostosować.
Podmień kod na:
  > `<mat-card *ngIf="recipe">`
  > `  <mat-card-title>{{ recipe.title }}</mat-card-title>`
  > `  <mat-card-content>`
  > `    <p><strong>Składniki:</strong> {{ recipe.ingredients.join(', ') }}</p>`
  > `    <p><strong>Opis:</strong> {{ recipe.description }}</p>`
  > `  </mat-card-content>`
  > `  <mat-card-actions>`
  > `    <button mat-button color="accent" [routerLink]="['/recipe/edit', recipe.id]">Edytuj</button>`
  > `    <button mat-button color="primary" routerLink="/recipes">Powrót do listy</button>`
  > `  </mat-card-actions>`
  > `</mat-card>`

Następnie przejdź do `recipe-details-component.scss` i podmień style na:
  > `/* Kontener główny karty, ustawiony na pełną szerokość i wysokość */`
  > `:host {`
  > `  display: flex;`
  > `  justify-content: center; /* Wycentrowanie karty na środku */`
  > `  align-items: center;`
  > `}`
  > 
  > `/* Karta z przepisem */`
  > `mat-card {`
  > `  max-width: 600px; /* Maksymalna szerokość karty */`
  > `  width: 90%; /* Ustawia szerokość karty do 90% ekranu */`
  > `  padding: 2rem;`
  > `  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Dodanie cienia */`
  > `  border-radius: 8px;`
  > `  background-color: #ffffff;`
  > `  transition: transform 0.3s ease; /* Animacja dla efektu hover */`
  > 
  > `  &:hover {`
  > `    transform: scale(1.02); /* Delikatne powiększenie na hover */`
  > `  }`
  > `}`
  > 
  > `/* Tytuł przepisu */`
  > `mat-card-title {`
  > `  font-size: 1.5rem;`
  > `  font-weight: bold;`
  > `  text-align: center;`
  > `  color: #3f51b5; /* Kolor akcentu */`
  > `  margin-bottom: 1rem;`
  > `}`
  > 
  > `/* Sekcja treści - stylizowanie składników i opisu */`
  > `mat-card-content {`
  > `  font-size: 1rem;`
  > `  color: #333;`
  > 
  > `  p {`
  > `    margin: 0.75rem 0;`
  > `    line-height: 1.6;`
  > `  }`
  > 
  > `  strong {`
  > `    color: #3f51b5;`
  > `  }`
  > `}`
  > 
  > `/* Stylizacja przycisków akcji */`
  > `mat-card-actions {`
  > `  display: flex;`
  > `  justify-content: space-between;`
  > `  margin-top: 1.5rem;`
  > 
  > `  button {`
  > `    font-size: 1rem;`
  > `    padding: 0.5rem 1.5rem;`
  > `  }`
  > 
  > `  /* Stylowanie przycisków edycji i powrotu */`
  > `  button[color="accent"] {`
  > `    background-color: #ff4081;`
  > `    color: #ffffff;`
  > `  }`
  > 
  > `  button[color="primary"] {`
  > `    background-color: #3f51b5;`
  > `    color: #ffffff;`
  > `  }`
  > 
  > `  button[color="primary"]:hover, button[color="accent"]:hover {`
  > `    filter: brightness(0.9); /* Przyciemnia kolor przycisku na hover */`
  > `  }`
  > `}`


Zadanie do wykonania
  * Kontrolka składników jest obsługiwana przez texarea, fajnie byłoby gdyby urzytkownik nie musiał wpisywać ich z palca a mógł wybrać z listy wielokrotnego wyboru. Zaimplementuj to w oparciu o `https://material.angular.io/components/select/overview#multiple-selection`
  Dorzućmy też wyświetlanie składników po wyborze przepisu.
  Podpowiedź: Potrzebna będzie lista składników by móc po niej iterować, przykładową znajdziesz w `component-code.ts`

Zadanie dodatkowe
    * Przerób komponent `recipe-template-form` tak by używał Angular Material komponentów UI
    * Przerób reszte komponentów, tak by używały Angular Material komponentów UI

##### Podsumowanie Modułu:
W tym module:

Mieliśmy okazję poznać oba sposoby na tworzenie formularzy w Angularze.
* Template-Driven Forms są prostsze do wdrożenia, ale mniej elastyczne. Świetnie sprawdzają się w małych formularzach.
* Reactive Forms dają większą kontrolę nad logiką formularza, są bardziej złożone, ale umożliwiają skomplikowaną walidację i łatwą integrację z innymi częściami aplikacji.
* Dowiedzieliśmy się czym są biblioteki komponentów UI i jak ich użyć w projekcie na przykładzie Angular Material
