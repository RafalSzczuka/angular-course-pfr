**Moduł 3: Serwisy i zarządzanie danymi**
_W tym module skupimy się na stworzeniu serwisu, który będzie przechowywał dane o przepisach oraz pozwalał na ich pobieranie oraz usuwanie. Dodawanie i edytowaniem zajmiemy się w kolejnych modułach. Serwis zostanie wstrzyknięty do komponentu RecipeListComponent, co oddzieli logikę biznesową od warstwy prezentacji._

_Będziemy pracować na modelu danych RecipeModel (Został stworzony podczas rozwiązywania zadania z gwiazdką), który rozszerzymy o dodatkowe właściwości, takie jak np. ID i składniki, aby był bardziej funkcjonalny._

1. Na poziomie /core stwórzmy folder ui. Natępnie przenieśmy tam stworzone przez nas komponenty. Poprawi to trochę naszą strukturę.
    * dorzućmy do folderów z komponentami plik index.ts w którym eksportujemy stworzone wcześniej komponenty. Analogicznie jak przy `/core/recipe`
    * poprawmy importy
2. Przejdźmy od stworzenia/aktualizacji modelu danych `RecipeModel`
    * przejdź do `src/app/core/recipe` i stórz tam folder models.
    * przejdź do `src/app/core/recipe/models`, stwórz lub zaktualizuj stworzony wcześniej model tak by zawierał:
        * id – unikalny identyfikator przepisu.
        * title – tytuł przepisu.
        * description – krótki opis przepisu.
        * ingredients – tablica składników.
        * preparationTime – czas przygotowania w minutach.
        * difficulty – poziom trudności (easy, medium, hard).
    * Do folderu models, dodaj index.ts i wyeksportuj model.
    * W miejscach w których deklarujemy zmienne typu `RecipeModel` kompilator zwórci uwagę, że brakuje pełnej definicji modelu.
        Na razie by go zadowolić, użyjemy utility type pochodzącego z TypeScrip `Partial<>` który sprawy, że wszystkie właściwości takiego modelu staną się opcjonalne. Później dopełnimy model.

3. Następnie stwórzmy serwis RecipeService
    * W terminalu, w folderze projektu utwórz serwis za pomocą Angular CLI:
    `ng generate service core/recipe/services/recipe`
    
    >To polecenie stworzy pliki:
    >src/app/core/recipe/services/recipe.service.ts
    >src/app/core/recipe/services/recipe.service.spec.ts (testy, na razie ich nie ruszamy).

    * Cały kod znajdziesz w `component-code.ts`, jednak chciałbym żebyście najpierw spróbowali sami.
  
    * Na początek przenieśmy do serwisu `recipe-service.ts`  przepisy z komponentu `recipe-list`. Uzupełnijmy brakujące pola modelu wg uznania. (ingredients, preparationTime, difficulty)

    * Teraz dodajmy metodę `getRecipes(): RecipeModel[]` którą pobierzemy nasz przepisy w przyszłości.

    * Gdy metoda jest już gotowa, a przepisy są przeniesione do ciała serwisu, wstrzyknijmy sobie serwis do komponentu i sprawmy by nasza aplikacja zaczęła znowu działać.
      * By wstrzyknąć serwis do komponentu `RecipeListComponent` będzie potrzebny nam konstruktor `constructor() {}` w ciele klasy komponentu. Dodajmy go.
      * Następnie jako parametr podajmy nasz serwis `private recipeService: RecipeService`
      * W komponencie `RecipeListComponent` dodajmy zmienną `recipes: RecipeModel[]  = []`.
      * Następnie zaciągnijmy dane z serwisu i przypiszmy je do naszej zmiennej. Żeby zrobić to w odpowiednim momencie, musimy dodać `ngOnInit` life cycle hook.
        Zrobimy to poprzez implementacje interfejsu OnInit i spełnienie jego kontraktu, czyli stworzenie metody `ngOnInit(): void {}`
      * W ciele ngOnInit przypisz wywołanie funkcji getRecipes z serwisu, o tak
        ngOnInit(): void {
            this.recipes =  this.recipeService.getRecipes();
        }

    Robimy to w tym momencie, bo to pierwszy moment w którym wszystki jest gotowe, komponent, serwis.. Jest to bardzo istotne, w momencie w którym przechodzimy do programowania reaktywnego, zrozumienie cyków życia jest istotne.
    Po wykonaniu wszystkich kroków aplikacja powinna wrócić do stanu sprzed dodania serwisu.
    Możesz mieć problem z importami, wyrównaj je.

4. Rozszerzyliśmy model o dodatkowe właściwości, zróbmy to samo z widokiem komponentów wyświetlających nasze przepisy
    *  Przejdzmy do `recipe-list-element.component.html` dostosujmy widok do modelu analogiczne do tego co już jest tam robione. Dorzućmy linijki które wyświtlą nam poziom trudności oraz czas przygotowania. Gotowy kod znajdziesz w `template-code.html`, najpierw spróbuj wykonać wszystko sam.
    *  To samo zróbmy z komponentem `recipe-detail.component`
    
    > Wszystkie modele inline zamień na `Partial<RecipeModel>` lub `Partial<RecipeModel> & { selectedRecipeTitle: string }` w zależności od potrzeby
    > Podczas podmienianie modeli, zauważ ile to pracy, dlatego bardzo ważna jest chociaż podstawowa znajomość TS'a ora prawidłowe modelowanie najlepiej od samego początku powstawania projektu.
    

5. Dodajmy teraz przycisk który pozwoli nam usunąć przepis.
    * Zacznijmy od widoku, przejdzmy do `recipe-list-element.html` i dodajmy `<button (click)="onDeleteRecipe(recipe.id)">Usuń</button>` pod  `<p>Czas przygotowania: {{ recipe.preparationTime }} minut</p>`
    * Przejdzmy do `recipe-list-element.ts` i dodajmy implementacje metody `onDeleteRecipe(id: number)` Powinna emitować id do komponentu nadrzędnego.
    * Następnie przejdzmy do komponentu `recipe-list.html` i dodajmy obsługę zdarzenia. `(recipeRemoved)="onDeleteRecipe($event)"`
    * W tym samym komponencie, w jego .ts zaimplementuje metodę `onDeleteRecipe(id: number)`. Teraz brakuje nam już tylko logiki która obsłuży usuwanie przepisu.
    * Przejdzmy do serwisu `recipe-service.ts` i dodajmy metode `deleteRecipe(id: number): void` w jej ciale usuń przekazany przepis. Kod znajdziesz w `component-code.ts` jednak spróbuj najpierw sam.
    * Gdy już mamy gotową metodę, wywołajmy ja w metodzie `onDeleteRecipe` w komponencie `recipe-list.ts`, przekazując id jako parametr.




Teraz w przeglądarce zobaczysz listę przepisów kulinarnych, będziesz mógł podejrzeć ich szczegóły oraz usunąć wybrane pozycje! 🎉

##### Podsumowanie Modułu:
W tym module:

* Nauczyliśmy się jak tworzy się serwisy oraz jak się ich używa
* Zobaczyliśmy jak pracuje się z modelami danych, oraz przypomnieliśmy sobie Data Binding


Zadanie dla chętnych
* Spraw by naciśnięciu przycisku usunięcia przepis nie był jednocześnie zaznaczany.
* Spraw by usunięcie zaznaczonego przepisu powodowało jego "odznaczenie".