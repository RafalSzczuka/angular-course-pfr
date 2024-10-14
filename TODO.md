##### Moduł 2: Komponenty - style, cykl życia komunikacja między komponentami (Data Binding)

1. Otwórz plik `src/styles.scss`, który zawiera style globalne.
   * Dodaj style z pliku `globalne-style.scss`, które wpłyną na całą aplikację

2. Otwórz plik `src/app/recipe-list/recipe-list.component.scss`
   * Dodaj style z pliku `component-style.scss`

3. Teraz stworzymy drugi komponent, który będzie wyświetlał szczegóły wybranego przepisu.
   * Otwórz terminal, będąc w swoim projekcie, wpisz `ng generate component recipe-detail`
    > **Wyjaśnienie:** Komenda ng generate component tworzy komponent o nazwie recipe-detail.
    > Zostaną wygenerowane cztery pliki:
    >
    > * recipe-detail.component.ts (logika komponentu),
    > * recipe-detail.component.html (szablon HTML),
    > * recipe-detail.component.scss (style),
    > * recipe-detail.component.spec.ts (testy jednostkowe).

4. Otwórz plik `src/app/recipe-detail/recipe-detail.component.ts` i dodaj poniższą logikę:
    * `@Input() selectedRecipe: { title: string, description: string } | null = null;`
    >**Wyjaśnienie:** Używamy dekoratora @Input(), który pozwala przekazać dane z komponentu
    >nadrzędnego (recipe-list) do komponentu podrzędnego (recipe-detail).
    >By zadziałał, trzeba go zaimportować `import { Input } from '@angular/core';`

5. Aktualizacja widoku `recipe-detail`
    * Otwórz plik `src/app/recipe-detail/recipe-detail.component.html` i podmień kod na ten z pliku `template-code.html`, który wyświetli szczegóły przepisu. (Krok 5)
    > **Wyjaśnienie:** Używamy dyrektywy *ngIf, aby pokazać szczegóły przepisu, jeśli został wybrany. Jeśli nie, wyświetlamy komunikat z prośbą o wybór przepisu.

    * Otwórz plik `src/app/recipe-detail/recipe-detail.component.scss` i dodaj style z pliku `component-style.scss`

6. Aktualizacja komponentu recipe-list (interpolation i event binding). Teraz musimy zaktualizować komponent recipe-list, aby użytkownik mógł kliknąć na przepis i wyświetlić jego szczegóły.
   * Otwórz plik `src/app/recipe-list/recipe-list.component.ts` i dodaj kod z pliku `component-code.ts` (step 6)
    > **Wyjaśnienie:** W powyższym kodzie użyliśmy EventEmitter i dekoratora @Output().
    > Wszystko po to żeby móc emitować zdarzenie, gdy użytkownik kliknie na przepis.
    > Funkcja onRecipeClick wysyła dane o przepisie do komponentu nadrzędnego.

    * Otwórz plik `src/app/recipe-list/recipe-list.component.html` i dodaj możliwość kliknięcia na przepis. Kod znajdziesz w `template-code.html`. (krok 6)
    > **Wyjaśnienie:** Użyliśmy event bindingu (click), aby nasłuchiwać na kliknięcia na elementy listy i wywołać funkcję onRecipeClick().

7. Aktualizacja komponentu głównego AppComponent (property binding)
    * Otwórz plik `src/app/app.component.ts` i dodaj kod z pliu `component-code` (step 7)
    > Wyjaśnienie: Kiedy użytkownik wybierze przepis w komponencie recipe-list, dane o wybranym przepisie są przekazywane do AppComponent za pomocą event bindingu.

    * Otwórz plik `src/app/app.component.html` i zaktualizuj go o kod z pliku `template-code.html` (step 7) Nie zapomnij o importach.
    
    >**Wyjaśnienie:** Tutaj mamy zarówno event binding (kiedy recipeSelected emituje zdarzenie) oraz property binding (kiedy selectedRecipe jest przekazywany do recipe-detail).


Teraz w przeglądarce zobaczysz listę przepisów kulinarnych oraz będziesz mógł podejrzeć ich szczegóły! 🎉

##### Podsumowanie Modułu 1:
W tym module:

* Nauczyliśmy się jak stylizować komponenty w Angularze, zarówno lokalnie, jak i globalnie.
* Utworzyliśmy drugi komponent wyświetlający szczegóły przepisu i wprowadziliśmy mechanizmy komunikacji między komponentami (Data Binding).
* Poznaliśmy 'interpolation', 'event binding', 'property binding' oraz jak przekazywać dane między komponentami w Angularze.


Zadanie dla chętnych
* Spraw by pozycja wybrana z listy przepisów odróżniała się od tych nie wybranych (selected vs not selected).