**Moduł 6: HTTP Client – komunikacja z serwerem**
Pobieranie przepisów z API: wprowadzenie do komunikacji z backendem.
Wysyłanie żądań HTTP do serwera (np. zapisywanie, aktualizowanie i usuwanie przepisów).
Użycie JSON-server jako lokalnego backendu do symulacji rzeczywistej bazy danych.

1. Instalacja JSON-server
Zaczniemy od stworzenia swojego lokalnego serwera, który posłuży za nasz backend.
W prawdziwych projektach używa się tego typu rozwiązać by uniknąć problemów gdy API jest niedostępne.

> [!TIP]
> brakuje mi tu flagi `--save-dev`. Widzę, że json-server wylądował w dependencies, a powinien imo byc w dev.

   * W terminalu, będąc w projekcie wykonaj `npm install json-server` - https://www.npmjs.com/package/json-server
   * następne stwórzmy folder a w nim plik `fake-api/db.json`
   * z pliku `component-code.ts` - krok 1 - przekopiuj kod do `fake-api/db.json`.
   * przejdź do `package.json` i dodaj w sekcji `scripts` skrypt `"fake-api": "json-server --watch fake-api/db.json --port 3000"`
   * serwer uruchomisz poleceniem `npm run fake-api`

1. Dostosowanie metody GET w serwisie RecipeService
  Zastosowanie HttpClient'a pozwala aplikacjom Angular na efektywną wymianę danych z serwerem, co jest kluczowe w przypadku aplikacji typu SPA (Single Page Application).

  * Zacznijmy od podania `provideHttpClient()` w pliku głównym konfiguracji naszej aplikacji `app.config.ts`.
  * Natępnie przejdźmy do `recipe-service.ts`
  * Będąc w serwisie wstrzyknijmy `HttpClient`. To on dostarczy nam metody CRUD których użyjemy do komunikacji z backendem.
  > `constructor(private httpClient: HttpClient) {}`

  * Będziemy potrzebowali url pod który mamy uderzać po dane.
    Normalnie w projekcie mielibyśmy plik konfiguracyjny, ale na potrzeby naszego projektu zdefiniujmy zmienną
    > `baseUrl = 'http://localhost:3000';`
    Zmienna zawiera defaultowy url dla json-server'a.

  * Następnie edytujmy kod naszej metody `getRecipes()`
    Obecnie moteda wygląd tak:
    > ` getRecipes(): RecipeModel[] {`
    > `  return this.recipes;`
    > `}`
    By wykonać zapytanie o dane do backendu użyjemy wcześniej podanego do pliku konfiguracyjnego a nastepnie wstrzykniętego do serwisu HttpClient'a.
    > `// Metoda pobierająca wszystkie przepisy asynchronicznie`
    > `// W tym celu używa HttpClient, bazuje na strumieniach`
    > `getRecipes(): Observable<RecipeModel[]> {`
    > `  // w db.json sprawdzisz, że path do danych to właśnie /recipes`
    > `  return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`)`
    > `}`

1. Dostosowanie komponentów używających metody GET z serwisu RecipeService
  * przejdź do `recipe-list.component`
  * w ngOnInit zachodzi inicjalne pobranie i przypisanie przepsiów. Kod wygląda tak
    > `ngOnInit(): void {`
    > `  this.recipes = this.recipeService.getRecipes();`
    > `}`
  * Metoda `getRecipes` zwraca strumień danych. By pobrać z niego dane, musimy się do niego zasubskrybować.
    Przypisanie metody jak dotąd nie wchodzi w grę, musimy użyć operatora `pipe`, a nastepnie `tap` pochądzących z biblioteki RxJS.
    Wewnątrz operatora `tap` dokonamy przypisania wartości do zmiennej `recipes`.
    > `   ngOnInit(): void {`
    > `  // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"`
    > `  this.recipeService.getRecipes().pipe(`
    > `    // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model`
    > `    tap((recipesFromGetRecipesMethod: RecipeModel[]) => {`
    > `      //przypisanie modelu do zmiennej`
    > `      this.recipes = recipesFromGetRecipesMethod;`
    > `    })`
    > `    // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne`
    > `  ).subscribe();`
    > `}`
  * Gdy już inicjalne przypisanie modelu danych mamy za sobą pora dostosować metodę `onDeleteRecipe`, ta też korzysta z serwisu.
    Jednak zanim do tego przejdziemy, wcześniej musimy dostosować metodę w serwisie.

2. Dostosowanie metody DELETE w serwisie RecipeService
    * Przejdźmy do `RecipeService` a następnie odnajdźmy metodę `deleteRecipe`. Obecnie kod wygląda tak:
    > ` // Metoda usuwająca przepis`
    > `deleteRecipe(id: number): void {`
    > `  this.recipes = this.recipes.filter(r => r.id !== id);`
    > `}`

    * By pobrać dane z serwera, musimy użyć instancji HttpClient. Model zwracanych danych też się zmieni, domyślasz się już pewnie,
    że będzie to strumień.
    > ` // Metoda usuwająca przepis`
    > `deleteRecipe(id: number): Observable<void> {`
    > `  return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`)`
    > `}`

3. Dostosowanie komponentów używających metody DELETE z serwisu RecipeService
    * przejdź do `recipe-list.component`
    * następnie odnajdź metodę `onDeleteRecipe(id: number | undefined)`, na ten moment kod wygląda tak:
    > `onDeleteRecipe(id: number | undefined): void {`
    > ` if (id) {`
    > `   this.recipeService.deleteRecipe(id);  // Usuwanie przepisu`
    > `   this.recipes = this.recipeService.getRecipes();  // Odśwież listę`
    > `}`

    * Domyślasz się już pewnie że, samo wywołanie metody teraz nic nie da, gdyż metoda z serwisu zwraca teraz strumień.
      Musimy się zasubskrybować.
      Po usunięciu musimy odświeżyć model przepisów dla komponentów. Mamy już gotową logikę w `ngOnInit`
      Warto byłoby wynieść ją do osobnej metody którą wywołamy tu i w `ngOnInit`
    * Stwórzmy metodę `private getRecipes(): void` do niej przenieśmy logikę z `ngOnInit`.
    * W metodzie `ngOnInit` wywołajmy świeżo utworzoną metodę `getRecipes`.
    * Następnie po subskrybcji do `deleteRecipe` wywołajmy metodę `getRecipes` by odświeżyć model zawierający przepisy.

6 Przerób resztę metod serwisu RecipeService, tak by dane były pobierane z naszego fake-api poprzez HttpClient.
  Gotowy kod znajdziesz w `component-code.ts` - spróbuj jednak zrobić wszystko sam, nie krepuj się zadawać pytania,
  gdy coś jest niezrozumiałe.

W tym module:
  * Zainstalowaliśmy i skonfigurowaliśmy JSON-server jako lokalny backend do symulacji rzeczywistej bazy danych.
  * Skonfigurowaliśmy HttpClient i przelobiliśmy serwis RecipeService, który teraz umożliwia wysyłanie żądań HTTP do serwera.
  * Wykorzystaliśmy metody get, post, put oraz delete z HttpClient do pobierania, dodawania, aktualizowania i usuwania przepisów.
