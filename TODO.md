##### Moduł 2: Komponenty - style, cykl życia komunikacja między komponentami (Data Binding)
_W tym module stworzymy nowy komponent do wyświetlania szczegółów przepisu i nauczymy się przekazywać dane między komponentami._
_Omówimy także interpolację oraz binding (wiązanie) danych – kluczowe pojęcia w Angularze._

1. Na początek dodamy kilka stylów globalnych, które wpłyną na wygląd całej aplikacji. Otwórz plik `src/styles.scss`, który zawiera style globalne.
   * Dodaj style z pliku `globalne-style.scss`, które wpłyną na całą aplikację
  **Wyjaśnienie:** Definiujemy tutaj podstawowe style, które będą miały wpływ na wygląd całej aplikacji, ustawiając m.in. kolor tła i czcionkę.
2. Teraz dodamy style do naszego komponentu `RecipeListComponent`, który wyświetla listę przepisów. Otwórz plik `src/app/recipe-list/recipe-list.component.scss`
   * Dodaj style z pliku `component-style.scss`
    **Wyjaśnienie:** Ustawiliśmy kolor nagłówka, stylizację listy i elementów listy, które będą reagować na najechanie kursorem (hover).

3. W tym kroku stworzymy nowy komponent RecipeDetailComponent, który będzie odpowiedzialny za wyświetlanie szczegółów wybranego przepisu.
   * Otwórz terminal, będąc w swoim projekcie, wpisz `ng generate component recipe-detail`
  
    > **Wyjaśnienie:** Komenda `ng generate component` tworzy komponent o nazwie `recipe-detail`.
    > Zostaną wygenerowane cztery pliki:
    >
    > * recipe-detail.component.ts (logika komponentu),
    > * recipe-detail.component.html (szablon HTML),
    > * recipe-detail.component.scss (style),
    > * recipe-detail.component.spec.ts (testy jednostkowe).

4. Teraz dodamy do RecipeDetailComponent właściwość, która pozwoli wyświetlić szczegóły wybranego przepisu.
Otwórz plik `src/app/recipe-detail/recipe-detail.component.ts`. W kodzie komponentu znajdź klasę `RecipeDetailComponent` i dodaj do niej następującą linię kodu:
  > `export class RecipeDetailComponent {`
  > `  @Input() selectedRecipe: { title: string; description: string } | null = null;`
  > `}`

  **Wyjaśnienie:** Używamy dekoratora `@Input()`, który pozwala przekazać dane z komponentu
  nadrzędnego `RecipeListComponent` do komponentu podrzędnego `RecipeDetailComponent`.
  By zadziałał, trzeba go zaimportować `import { Input } from '@angular/core';`

5. Aktualizacja widoku `RecipeDetailComponent`
  * Otwórz plik `src/app/recipe-detail/recipe-detail.component.html` i podmień kod na ten z pliku `template-code.html`, który wyświetli szczegóły przepisu. (krok 5)
  **Wyjaśnienie:** Używamy dyrektywy `*ngIf`, aby pokazać szczegóły przepisu, jeśli został wybrany. Jeśli nie, wyświetlamy komunikat z prośbą o wybór przepisu.

  * Otwórz plik `src/app/recipe-detail/recipe-detail.component.scss` i dodaj style z pliku `component-style.scss`

6. Aktualizacja `RecipeListComponent` (interpolation i event binding), aby umożliwić użytkownikowi kliknięcie na przepis i wyświetlenie jego szczegółów.
   * Otwórz plik `src/app/recipe-list/recipe-list.component.ts` i dodaj kod z pliku `component-code.ts` (krok 6)
    **Wyjaśnienie:** W powyższym kodzie użyliśmy `EventEmitter` i dekoratora `@Output()`.
    Wszystko po to żeby móc emitować zdarzenie, gdy użytkownik kliknie na przepis.
    Funkcja `onRecipeClick()` wysyła dane o przepisie do komponentu nadrzędnego.

    * Otwórz plik `src/app/recipe-list/recipe-list.component.html` i dodaj możliwość kliknięcia na przepis. Kod znajdziesz w `template-code.html`. (krok 6)
    **Wyjaśnienie:** Używamy `event binding (click)`, aby wywołać funkcję `onRecipeClick()` w momencie kliknięcia na przepis.
    Dzięki temu możemy przechwycić kliknięcie i przekazać dane wybranego przepisu.

7. Aktualizacja komponentu głównego AppComponent (property binding)
   Teraz w AppComponent odbierzemy dane o wybranym przepisie i przekażemy je do RecipeDetailComponent.

    * Otwórz plik `src/app/app.component.ts`, a następnie:
      * dodaj kod z pliu `component-code` (krok 7)
    **Wyjaśnienie:** Kiedy użytkownik wybierze przepis w `RecipeListComponent`, dane o wybranym przepisie są przekazywane do `AppComponent` za pomocą event bindingu.

    * Otwórz plik `src/app/app.component.html`, a następnie:
      * zaktualizuj go o kod z pliku `template-code.html` (krok 7)
      * Nie zapomnij o importach w pliku `app.component.ts`.
    
    **Wyjaśnienie:** Tutaj mamy zarówno event binding - kiedy recipeSelected emituje zdarzenie
    oraz property binding - kiedy selectedRecipe jest przekazywany do `RecipeDetailComponent`.


Teraz w przeglądarce zobaczysz listę przepisów kulinarnych oraz będziesz mógł podejrzeć ich szczegóły! 🎉

##### Podsumowanie Modułu:
W tym module:

* Nauczyliśmy się jak stylizować komponenty w Angularze, zarówno lokalnie, jak i globalnie.
* Utworzyliśmy drugi komponent wyświetlający szczegóły przepisu i wprowadziliśmy mechanizmy komunikacji między komponentami (Data Binding) - @Input() i @Output()
* Poznaliśmy 'interpolation', 'event binding', 'property binding' oraz jak przekazywać dane między komponentami w Angularze.


Zadanie dla chętnych
* Spraw by pozycja wybrana z listy przepisów odróżniała się od tych nie wybranych (selected vs not selected).
    >Podpowiedź: Użyj dyrektywy ngClass
