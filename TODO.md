##### Moduł 1: Wprowadzenie do Angulara

1. **Instalacja Angular CLI.**
     * `npm install -g @angular/cli`
    **Wyjaśnienie:** Komenda npm install -g instaluje pakiet globalnie, co oznacza, że Angular CLI będzie dostępny z każdego katalogu na twoim komputerze. CLI to skrót od "Command Line Interface".

    >Aby sprawdzić czy instalacja się powiodła, możesz wpisać `ng version`
    Jeśli zobaczysz wersję Angular CLI, oznacza to, że narzędzie zostało zainstalowane prawidłowo.

2. **Stworzenie projektu**
    * `ng new recipe-manager` 
    **Wyjaśnienie:** Komenda ng new tworzy nowy projekt Angulara o nazwie recipe-manager.
    
  
    > Angular CLI poprosi o kilka konfiguracji
    > * wybierz SCSS jako preprocesor CSS 
    > * potwierdź dodanie Routingu.


3. **Instalacja zależności**

   _Po stworzeniu projektu, przejdźmy do jego lokalizacji w terminalu:_
   * `cd recipe-manager`
  
   _Następnie zainstalujmy zależności:_
   * `npm install`
   **Wyjaśnienie:** Komenda npm install pobiera wszystkie wymagane paczki, które są zapisane w pliku package.json – są to biblioteki i narzędzia potrzebne do działania projektu.

4. **Uruchom serwer deweloperski**
   _W terminalu, będąc w lokalizacji projektu wykonaj:_
     * `ng serve`
     **Wyjaśnienie:** Komenda ng serve uruchamia serwer lokalny, dzięki czemu możesz testować aplikację na swoim komputerze.

    *Otwórz przeglądarkę i przejdź do adresu: `http://localhost:4200`
    **Wyjaśnienie:** Aplikacja będzie działać lokalnie na twoim komputerze pod domyślnym adresem localhost na porcie 4200. Teraz zobaczysz domyślną stronę startową Angulara.

    > Projekt defaultowo będzie dostępny pod adresem http://localhost:4200.
    
    > package.json zawiera sekcje scripts, ng serve jest tam zdefiniowany jako **start**
    > 
    > Żeby użyć takiego skryptu wykonaj polecenie
    > * **npm run start**
    >
    > Możesz dowolnie definiować własne skrypty, skrypty mogą zawierać flagi


5. Teraz omówimy strukturę plików, które zostały wygenerowane po utworzeniu projektu. W edytorze kodu, takim jak VS Code, otwórz folder projektu.
    * **angular.json** - _Jest to główny plik konfiguracyjny Angulara. Zawiera ustawienia dotyczące budowania, testowania oraz uruchamiania aplikacji._
    * **package.json** - _Zawiera listę zależności projektu oraz skrypty do zarządzania aplikacją. Znajdziesz tu m.in. informację o tym, jaką wersję Angulara i innych bibliotek używasz._
    * **package-lock.json** - _Zabezpiecza konkretne wersje zależności, które zostały zainstalowane przez npm. Dzięki temu wszyscy deweloperzy pracujący nad projektem będą używać tych samych wersji bibliotek._
    * **tsconfig.*.json** - _Plik konfiguracyjny dla TypeScript. Angular opiera się na TypeScript, więc tutaj znajdziesz ustawienia dotyczące kompilacji kodu TypeScript._
    * **src/index.html** - _To główny plik HTML aplikacji. Angular wstawia tutaj wygenerowane widoki._
    * **src/main.ts** - _Punkt wejścia dla aplikacji Angular. Tutaj Angular inicjalizuje moduły i uruchamia aplikację._
    * **src/styles.scss** - _Główny plik stylów dla aplikacji, w formacie SCSS. Możesz tutaj dodać globalne style._
    * **src/app/** - _To najważniejszy folder, ponieważ tutaj będą znajdować się moduły, komponenty i serwisy twojej aplikacji._


6. Dlaczego projekt nie zawiera żadnego modułu?

Kiedyś podczas tworzenia projektu, Angular automatycznie wygenerowałby podstawowy moduł o nazwie AppModule. Znalazłbyś go w pliku:
**src/app/app.module.ts.**
Dzisiaj jest to standalone komponent **src/app/app.component.ts.**
Taki komponent w gruncie rzeczy pełni obie funkcje na raz, Angular pod spodem i tak stworzy sobie moduł dla takiego komponentu.
Więcej o standalone komponentach powiemy sobie w dalszej części materiału.

7. Tworzenie pierwszego komponentu: wyświetlanie listy przepisów kulinarnych.

    * Na początek chciałbym żebyśmy trochę posprzątali, usuń zawartość szablonu w komponencie app.component oraz wyczyść tablice importowanych zależności komponentu. Znajdziesz ją wewnątrz dekoratora @Component. (metadane)
    Usuń też test `should render title` z app.component.spec.ts
    Do tematu testów wrócimy w dalszej części materiału.
    * Będąc w folderze projektu, w terminalu wpisz `ng generate component recipe-list`
    **Wyjaśnienie:** Komenda ng generate component automatycznie wygeneruje strukturę nowego komponentu w folderze `src/app/recipe-list/`.
    * Otwórz plik `src/app/recipe-list/recipe-list.component.ts`. Znajdziesz tam domyślną klasę komponentu. Dodaj zmienną recipes, przypisz do zmiennej tablice, która zawiera 3 obiekty, kazdy obiekt powinien zawierać dwie "propercje"
    **title** oraz **description**.
    Każda jest typu string i zawiera przykładowy tekst.
    
  * Otwórz plik `src/app/recipe-list/recipe-list.component.html` i dodaj kod HTML do wyświetlania listy przepisów.
  W znaczniku H2 zawrzyj tekst "Lista Przepisów"
  Użyj znaczników UL oraz LI do wyświetlenia listy.
  Przeiteruj się po tablicy za pomocą dyrektywy *ngFor. Za pomocą znacznika H3 wyświetl tytuł a za pomocą znacznika P wyświetl opis produktu.
  By iteracja po tablicy była możliwa musisz zaimportować dyrektywę ngFor, możesz to zrobić poprzez import CommonModule lub ngFor.
  * Otwórz plik `src/app/app.component.ts`, zaimporuj stworzony komponent poprzez dodanie **RecipeListComponent** do listy importów.
  * Teraz otwórz plik `src/app/app.component.html` i dodaj tag (selector) komponentu recipe-list, aby wyświetlić go na stronie głównej. `<app-recipe-list></app-recipe-list>`
  * Zapisz wszystkie zmiany i uruchom ponownie serwer, jeśli został zatrzymany `ng serve`

  Teraz w przeglądarce zobaczysz listę przepisów kulinarnych! 🎉

##### Podsumowanie Modułu 1:
W tym module:

* Nauczyliśmy się jak zainstalować Angular CLI i stworzyć projekt.
* Zrozumieliśmy strukturę projektu Angular.
* Stworzyliśmy pierwszy komponent, który wyświetla listę przepisów kulinarnych.
