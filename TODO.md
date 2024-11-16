> [!TIP]
> Taka uwaga - widzę, że nigdzie się nie odsubowujesz z subskrypcji w ts. Celowo? Gdy np. subujesz sie do paramsów z routingu, wtedy takie suby sie nawarstwiają gdy wchodzisz i wychodzisz z komponentów

**Moduł 5: Routing i nawigacja**
* Routing: tworzenie wielostronicowej aplikacji.
* Dodanie widoków dla różnych części aplikacji, takich jak: lista przepisów, szczegóły przepisu, formularz dodawania/edycji przepisu.
* Widok szczegółowy przepisu: wyświetlanie składników i instrukcji po kliknięciu na dany przepis.
  
_Moduł 5 jest ważnym krokiem w zrozumieniu, jak organizować wielostronicową aplikację w Angularze za pomocą routingu, co pozwala użytkownikom przemieszczać się między różnymi sekcjami aplikacji._
_W ramach tego modułu dowiemy się, jak ustawić routing dla listy przepisów, widoku szczegółowego oraz formularza dodawania/edycji przepisów._


1. Konfiguracja Angular Router
  Angular Router umożliwia nawigację między widokami w aplikacji. Najpierw zainstalujemy podstawową konfigurację routingu w głównym module aplikacji.

   * Przejdź do `app.config.ts` i upewnij się że masz `provideRouter(routes)` w liście providers.
   * Przejdź do `app.routes.ts` i zdefiuniuj tablice routingu tak by zawierała:
     * trasy do widoków listy przepisów,
     * szczegółów przepisu,
     * widoku dodania / edycji przepisu. 
     * Powinna też zawierać przekierowanie do komponentu listy dla pustych tras.
   Widok edycji i szczegółów przepisu powinna zawierać parametr **id** by móc określić o jaki przepis chodzi.
   Kod znajdziesz w `component-code.ts` - krok 1.


   brakuje importu - pułapka?



2. Tworzenie Linków do Nawigacji Między Widokami
   Teraz utworzymy header naszej aplikacji a w nim menu z linkami, które umożliwią użytkownikowi nawigację po aplikacji.

    * Przejdź do `app.component.html` i zastąp obecny kod tym z `template-code.html` - krok 1
    * Następnie przejdź do `app.component.ts` i pozbądź się niepotrzebnego kodu:
        > `selectedRecipe: RecipeModel | null = null;`
        >
        > `onRecipeSelected(recipe: RecipeModel | null) {`
        > `  this.selectedRecipe = recipe;`
        > `}`
    * Przejdź teraz do `app.component.scss` i podmień zawartość na style z pliku `component-style.scss` krok 2.
    * Pozbądź się też zaimportowanych, nie używanych zależności z listy imports oraz dodaj `RouterOutlet`


**Tworzenie Widoków dla Każdej Ścieżki**
Teraz utworzymy widoki, które użytkownik zobaczy korzystająć z nawigacji po aplikacji

1. Widok Listy Przepisów (RecipeListComponent)
  * Otwórz `recipe-list.component.html` i upewnij się, że każdy przepis ma link, który prowadzi do widoku szczegółowego.
    * Dodajmy przycisk "Zobacz szczegóły".
      Kod znajdziesz w pliku `template-code.html` - krok 3.
  * Przejdź do `recipe-list.component.ts`, a następnie:
    * pozbądź się metody `onRecipeClick()` gdyż nie jest już potrzebna
    * dodaj `MatButtonModule` do listy import 
  * Przejdź do `recipe-list.component.scss`, a następnie:
    * dodaj style z pliku `component-style.scss` - krok 3

2. Widok Szczegółów Przepisu (RecipeDetailComponent)
   * Przejdź do `recipe-details-component.ts`, gdzie musimy:
    * zadbać by ten komponent sam zdobył sobie przepis. 
        Podanie go przez Input'a już nie wchodzi w grę.
        To czego będziemy potrzebowali to:
          * **id** przepisu, weźmiemy go sobie z adresu URL,
          * serwis `RecipeService`, który dostarczy nam przpis na podstawie **id**
    * Podmień klase komponentu na tę z pliku `component-code.ts` - krok 4
    * Podmień listę importów komponentu na `CommonModule, RouterLink, MatCardModule, MatButtonModule`.

**Zadanie do wykonania:**
  * Kompilator po skopiowaniu wcześniejszego kodu, na pewno krzyknie, że brakuje mu implementacji metody `getRecipeById` - napisz ją.

  Gdy implementacja `getRecipeById` jest już gotowa:
   * przejdźmy do `recipe-details-component.html` a następnie:
     * musimy go trochę dostosować. Podmień kod na ten z `template-code.html` krok 4
   * Następnie przejdź do `recipe-details-component.scss` i:
     * podmień style na te z `component-style.scss` - krok 4

5. Widok edycji/dodania przepisu (RecipeReactiveFormComponent)
  Musimy zadbać by nasz komponent obsługiwał zerówno dodawanie przepisu jak i edycje.
  Logikę oprzemy o parametr id pochodzący ze ścieżki (route).

  * Przejdź do `recipe-reactive-form-component.ts`.
    * Wstrzyknijmy do konstruktora zależnośc  `Router` oraz `ActivatedRoute`
    * Następnie edytujmy ngOnInit tak by pobierał i ustawiał sobie przepis na podstawie **id** pochodzącego ze ścieżki route.
    * Zostaje metoda `onSubmit()`, która posłuży nam do zapisania zmian i powrotu do listy przepisów.
    > `onSubmit(): void {`
    > `  if (this.recipeFormGroup.valid) {`
    > `    const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza`
    > `    if (this.isEditMode) {`
    > `      this.recipeService.editRecipe(recipe) // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu`
    > `    } else {`
    > `    this.recipeService.addRecipe(recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu`
    > `    }`
    > 
    > `    this.router.navigate(['/recipes']); // Powrót do listy przepisów`
    > `  }`
    > `}`


**Zadanie do wykonania:**
  * Brakuje nam **id** w modelu który przesyłamy do serwisu.
  * Gdy już mamy gotową implementacje `recipe-reactive-form.component.ts` podmień w głównej tablicy routingu
    `app.routes.ts` gotowy komponent na `recipe-template-form.component` i samodzielnie doprowadź go do analogicznego stanu.



6. Możesz się zastanawiać co gdy widoki są bardziej skomplikowane, może potrzebują dodatkowych danych co spowodowałoby opóźnienie w wyświetleniu strony. W takiej sytuacji warto mieć komponent który wyświetli w tym czasie loader.
  * ...

7. Lazy loading widoków
  * ...

##### Podsumowanie Modułu:
W tym module:

Mieliśmy okazję poznać czym jest Angular Router oraz podstawowe zasady działania.
* Utworzyliśmy RecipeReactiveFormComponent, który obsługuje widok dodawania i edytowania przepisów za pomocą Reactive Forms.
* Dodaliśmy logikę umożliwiającą dynamiczne zarządzanie listą składników.
* Stworzyliśmy przyjazny dla użytkownika widok formularza z intuicyjną walidacją pól.
* Użyliśmy Angular Material do stylizacji formularzy, co wzmacnia spójność i wygląd aplikacji.
