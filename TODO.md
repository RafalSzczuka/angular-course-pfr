**Moduł 5.1: Refaktoryzacja**
Do tej pory tworzyliśmy aplikacje częściowo w nowym standardzie (standalone) ale mimo to nie używaliśmy wszystkich najnowszych konstrukcji języka.
Wszystko specjalnie po to, żebyśmy mieli okazje poznać możliwie szeroki zakres konstrukcji frameworka.
W tym module zrobimy mały refactor powstałego do tej pory kodu oraz dodamy linter.
EsLint to narzędzie któremu podaje się reguły w jakimi chcemy się kierować budując projekt, a ono tego będzie pilnować. (np. nie używane importy)

1. Instalacja i inicjalizacja lintera.
   * W terminalu, będąć w projekcie wykonaj polecenie `ng lint`. W projekcie nie ma skonfigurowanego linta, więc kompilator powinien zasugerować ESLinta i użycie `@angular-eslint/schematics` na oba zadane pytania odpowiadamy **yes**

    > Ważne: Problemy w pliku recipe-list-element.component.ts pomiń, gdyż dotyczą one zagadnień, których nie będziemy teraz omawiać.
    > Jeśli chcesz zgłębić temat, warto zapoznać się z narzędziem Husky.
    > Husky pozwala na konfigurację hooków, np. preCommit czy prePush.
    > Dzięki czemu można uruchamiać lintera automatycznie przed każdym commitem lub pushowaniem zmian do repozytorium.

2. Użycie lintera
  * W terminalu, będąc w projekcie, wykonaj ponownie polecenie `ng lint` lub jak wolisz `npm run lint`
  * Jako efekt, powinniśmy zobaczyć ścieżki do plików w których są problemy, ich dokładną lokalizację, typ oraz opisany problem - napraw problemy :)
    
    > Problemy w `recipe-list-element.component.ts` zostaw jak są, dotyczą zagadnień w które nie będziemy wchodzić.
    > Gdybyśmy chcieli teraz głębiej wejść w temat, moglibyśmy dorzucić `husky` do projektu i skonfigurować tzw hooki jak preCommit czy prePush.
    > Tam moglibyśmy skonfigurować wszystko to co chcielibyśmy żeby odpalało się przed commit'em lub przed git push'em, m.in. linter.

3. Lazy loading - bo wielkość inicjalnej paczki ma znaczenie
  W celu optymalizacji aplikacji powinniśmy wczytywać części aplikacji na żądanie, czyli dopiero, gdy są potrzebne.

  * dodajmy folder `src/app/features`.
  * przenieśmy do tego folderu całe foldery komponentów `RecipeDetailComponent`, `RecipeReactiveFormComponent`, `RecipeListComponent`, oraz `RecipeTemplateFormComponent`
  * Nie chcemy by nasze features były importowane przez inne moduły. Nie będziemy wchodzić w szczegóły co moglibyśmy zrobić by tego pilnować automatycznie, to co chciałbym żebyśmy teraz zrobili, to usuńmy pliki `index.ts` z folderów z komponentami które dopiero przenieśliśmy.
  * Trochę nam to namieszało w importach, ale to co chciałbym, żebyśmy teraz poznali to sekcja `path` w `tsconfig.json`
  Przejdźmy tam i dodajmy do obiektu `compilerOptions` kolejną sekcje:
  > `"paths": {`
  > `   "@core/*": ["./src/app/core/*"],`
  > `   "@ui/*": ["./src/app/ui/*"],`
  > `}`
  > więcej info: https://www.typescriptlang.org/tsconfig/#paths

  * Poprawmy importy stosując się do nowo dodanych ścieżek
    `app.component.ts` zawiera importy komponentów których nie używamy w jego ramach, usuń je.
  * Przejdźmy teraz do `app.routes.ts` i zastąp zawartość kodem z pliku `component-code.ts`.
    Brakuje plików konfiguracyjnych routingu dodanych feature. Dodajmy je:
      * Przejdź do folderu `recipe-detail` i dodaj plik `recipe-detail.routes.ts`. W jego wnętrzu dodaj kod:
        > `export const RECIPE_DETAILS_ROUTES: Routes = [`
        > `    { path: '', component: RecipeDetailComponent },`
        > `];`
      * Analogicznie zrób dla reszty komponentów, pilnuj nazwy zmiennej oraz nazwy komponentu.
  * Gdy już to zrobimy wszystko w kontekście loadingu części naszej aplikacji mamy gotowe.


4. Angular w ostatnim czasie przechodzi liczne zmiany. Refaktoryzacja kodu pod kątem najnowszych aktualizacji wymaga bardziej zaawansowanej wiedzy o frameworku, dlatego obecnie tego nie będziemy omawiać. Jeśli chcesz dowiedzieć się więcej, odwiedź stronę: https://angular.dev/reference/migrations.


Podsumowanie:
* W tym module dodaliśmy lintera do projektu, co pozwoli nam kontrolować jakość kodu na bieżąco.
* Zapoznaliśmy się z komendą ng lint i nauczyliśmy się, jak konfigurować lintera z domyślnymi ustawieniami dla Angulara.
* Omówiliśmy także lazy loading, dzięki czemu aplikacja ładuje komponenty tylko wtedy, gdy są potrzebne, co zwiększa jej wydajność.
* Na koniec dowiedzieliśmy się, że Angular jest w fazie dynamicznych zmian, co wymaga czasem dostosowania kodu.