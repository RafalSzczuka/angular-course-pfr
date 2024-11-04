**Moduł 3: Serwisy i zarządzanie danymi**
_W tym module stworzymy serwis RecipeService, który będzie przechowywał i zarządzał danymi przepisów. Skonfigurujemy model danych RecipeModel, a także nauczymy się, jak wstrzykiwać serwis do komponentu, aby umożliwić pobieranie i usuwanie przepisów._

_Serwisy w Angularze pozwalają oddzielić logikę biznesową od warstwy prezentacji. Dzięki temu komponenty są bardziej przejrzyste, a kod jest łatwiejszy do zarządzania i testowania._

1. Stwórzmy folder src/app/ui, a natępnie:
    * przenieśmy tam stworzone przez nas komponenty (recipe-detail, recipe-list, recipe-list-element) Poprawi to trochę naszą strukturę.
    * do folderów z komponentami dorzuć plik `index.ts` w którym eksportujemy stworzone wcześniej komponenty. Analogicznie jak przy `/core/recipe`
    * upewnij się, że importy w całym projekcie są zgodne z nową strukturą.
  
2. Przejdźmy od stworzenia/aktualizacji modelu danych `RecipeModel`
    * przejdź do `src/app/core/recipe`, stwórz lub zaktualizuj stworzony wcześniej model tak by zawierał:
        > `export interface RecipeModel {`
        > `  id: number;                   // Unikalny identyfikator przepisu`
        > `  title: string;                // Tytuł przepisu`
        > `  description: string;          // Krótki opis przepisu`
        > `  ingredients: string[];        // Tablica składników`
        > `  preparationTime: number;      // Czas przygotowania w minutach`
        > `  difficulty: 'easy' | 'medium' | 'hard'; // Poziom trudności`
        > `}`
    * W miejscach w których deklarujemy zmienne typu `RecipeModel` kompilator zwórci uwagę, że brakuje pełnej definicji modelu.
        Na razie by go zadowolić, moglibyśmy użyjemy utility type pochodzącego z TypeScrip `Partial<RecipeModel>` który sprawy, że wszystkie właściwości takiego modelu staną się opcjonalne.
        Możemy także ręcznie pokazać kompilatorowi które pola są opcjonalne poprzed dodanie `?` po nazwie właściwości jak
        `id?: number;`
        I tak właśnie zróbmy, z biegiem czasu zaczniemy usuwać opcjonalności.

3. Następnie stwórzmy serwis RecipeService
    * W terminalu, będąc w folderze projektu utwórz serwis za pomocą Angular CLI:
    `ng generate service core/recipe/services/recipe`
    
    >To polecenie stworzy pliki:
    >src/app/core/recipe/services/recipe.service.ts
    >src/app/core/recipe/services/recipe.service.spec.ts (testy, na razie ich nie ruszamy).

    * Dorzućmy index.ts do folderu ze stworzonym serwisem i go wyeksportujmy.
    * Na początek przenieśmy do serwisu `recipe-service.ts`  przepisy z komponentu `recipe-list`. Uzupełnijmy brakujące pola modelu wg uznania. (ingredients, preparationTime, difficulty)
    * Teraz dodajmy metodę `getRecipes(): RecipeModel[]` którą pobierzemy nasz przepisy w przyszłości.
    * Gdy metoda jest już gotowa, a przepisy są przeniesione do ciała serwisu, wstrzyknijmy serwis `RecipeService` do komponentu `RecipeListComponent` i sprawmy by nasza aplikacja zaczęła działać z wykorzystaniem serwisu.
      * By wstrzyknąć serwis do komponentu będzie potrzebny nam konstruktor `constructor() {}` w ciele klasy komponentu. Dodajmy go.
      * Następnie jako parametr podajmy nasz serwis `private recipeService: RecipeService`
      * W komponencie `RecipeListComponent` dodajmy zmienną `recipes: RecipeModel[]  = []`.
      * Następnie zaciągnijmy dane z serwisu i przypiszmy je do naszej zmiennej. Żeby zrobić to w odpowiednim momencie, musimy dodać `ngOnInit` life cycle hook.
        Zrobimy to poprzez implementacje interfejsu OnInit i spełnienie jego kontraktu, czyli stworzenie metody `ngOnInit(): void {}`
      * W ciele ngOnInit przypisz wywołanie funkcji getRecipes z serwisu, o tak
        > `ngOnInit(): void {`
        > `    this.recipes =  this.recipeService.getRecipes();`
        > `}`
    * Cały kod znajdziesz w `component-code.ts`, jednak chciałbym żebyście najpierw spróbowali sami.

    Akcja przypisania wartości do zmiennej recipe dzieje się w metodzie ngOnInit, bo to pierwszy moment w którym wszystko potrzebne jest gotowe, komponent jest wyrenderowany i mamy dostępn do jego zależności, serwis jest stworzony a jego instancja jest dostępna w scope komponentu.
    Jest to bardzo istotne, w momencie w którym przejdziemy do programowania reaktywnego, zrozumienie cyków życia jest niezbędne.
    Po wykonaniu wszystkich kroków aplikacja powinna wrócić do stanu sprzed dodania serwisu.
    Możesz mieć problem z importami, wyrównaj je.

4. Rozszerzyliśmy model o dodatkowe właściwości, zróbmy to samo z widokiem komponentów wyświetlających nasze przepisy
    *  Przejdzmy do `recipe-list-element.component.html` dostosujmy widok do modelu analogiczne do tego co już jest tam robione. Dorzućmy linijki które wyświtlą nam poziom trudności oraz czas przygotowania. Gotowy kod znajdziesz w `template-code.html`, najpierw spróbuj wykonać wszystko sam.
    *  To samo zróbmy z komponentem `recipe-detail.component`
    
    > Wszystkie modele inline zamień na `RecipeModel` lub `RecipeModel & { selectedRecipeTitle: string }` w zależności od potrzeby (ten drugi jest potrzebny przy przyciskach)
    > Podczas podmienianie modeli, zauważ ile to pracy, dlatego bardzo ważna jest chociaż podstawowa znajomość TS'a oraz prawidłowe modelowanie najlepiej od samego początku powstawania projektu.
    > Możesz potrzebować mapowania, np przy emitowaniu wartości, możesz to zrobić poprzez stworzenie nowego obiektu i przypsanie do niego ręcznie pól jakie Cię interesuje, przykład:
    const toEmit = {
      id: listElement.id,
      title: listElement.title,
      description: listElement.description,
      ingredients: listElement.ingredients,
      preparationTime: listElement.preparationTime,
      difficulty: listElement.difficulty
    }
    

5. Dodajmy teraz przycisk który pozwoli nam usunąć przepis.
    * Zacznijmy od widoku, przejdzmy do `recipe-list-element.html` i dodajmy `<button (click)="onDeleteRecipe(recipe.id)">Usuń</button>` pod  `<p>Czas przygotowania: {{ recipe.preparationTime }} minut</p>`
    * Przejdzmy do `recipe-list-element.component.ts` i dodajmy implementacje metody `onDeleteRecipe(id: number)` Powinna emitować `id` do komponentu nadrzędnego.
    * Następnie przejdzmy do komponentu `recipe-list.component.html` i dodajmy obsługę zdarzenia. `(recipeRemoved)="onDeleteRecipe($event)"`
    * W tym samym komponencie, w jego .ts zaimplementuje metodę `onDeleteRecipe(id: number)`. Teraz brakuje nam już tylko logiki która obsłuży usuwanie przepisu.
    * Przejdzmy do serwisu `recipe-service.ts` i dodajmy metode `deleteRecipe(id: number): void` w jej ciale usuń przekazany przepis. Kod znajdziesz w `component-code.ts` jednak spróbuj najpierw sam.
    * Gdy już mamy gotową metodę, wywołajmy ja w metodzie `onDeleteRecipe` w komponencie `recipe-listcomponent.ts`, przekazując id jako parametr.
    Nie zapomnij przy akcji usunięcia o odświeżeniu modelu danych. ` this.recipes = this.recipeService.getRecipes();`

6. Na sam koniec powinieneś zobaczyć błędy w konsoli, dotyczą one typów. Usuń opcjonalność z właściwości modelu RecipeModel.ts. Upewnij się, że wszędzie używasz tego modelu danych.




Teraz w przeglądarce zobaczysz listę przepisów kulinarnych, będziesz mógł podejrzeć ich szczegóły oraz usunąć wybrane pozycje! 🎉

##### Podsumowanie Modułu:
W tym module:

* Utworzyliśmy i skonfigurowaliśmy serwis RecipeService.
* Nauczyliśmy się, jak zarządzać danymi przy użyciu serwisów.
* Rozszerzyliśmy RecipeModel i przystosowaliśmy komponenty do pracy z nowymi właściwościami.
* Zaimplementowaliśmy funkcję usuwania przepisów z listy.


Zadanie dla chętnych
* Spraw by naciśnięciu przycisku usunięcia przepis nie był jednocześnie zaznaczany.
* Spraw by usunięcie zaznaczonego przepisu powodowało jego "odznaczenie".
