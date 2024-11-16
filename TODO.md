##### Moduł 1: Wprowadzenie do Angulara

1. **Instalacja <mark>Angular CLI.<mark/>**
     * `npm install -g @angular/cli`

    **Wyjaśnienie:** Komenda npm install -g instaluje pakiet globalnie, co oznacza, że Angular CLI będzie dostępny z każdego katalogu na twoim komputerze. CLI to skrót od "Command Line Interface".

    > Aby sprawdzić czy instalacja się powiodła, możesz wpisać **`ng version`**
    > Jeśli zobaczysz wersję Angular CLI, oznacza to, że narzędzie zostało zainstalowane prawidłowo.
    
> [!TIP]
> Jeżeli zależy nam na konkretnej wersji angulara warto wtedy wspomnieć że należy zainstalować odpowiednią wersję CLI.
> Np jeżeli chcemy zainstalować kokretnie wersję 14, wtedy najpierw: npm install -g @angular/cli@14.
> Lub zamiast instalować paczkę globalnie można skorzystać z polecenia npx i zrobić to jednorazowo (tymczasowe zaciągnięcie odpowiednich paczek).
> Przykład: `npx @angular/cli@14 new angular-v14-app`

3. **Stworzenie projektu**
    * `ng new recipe-manager` 
    **Wyjaśnienie:** Komenda ng new tworzy nowy projekt Angulara o nazwie recipe-manager.
    
  
    > Angular CLI poprosi o kilka konfiguracji
    > * <mark>wybierz SCSS jako preprocesor CSS<mark/>
    > * potwierdź dodanie Routingu.
    
> [!TIP]
> SCSS czy CSS - może prościej byłoby z CSS? Pytanie co kto wie na temat SCSS i preprocesorów i czy warto to rozgrzebywać. Z CSS może być prościej.


4. **Instalacja zależności**

   _Po stworzeniu projektu, przejdźmy do jego lokalizacji w terminalu:_
   * `cd recipe-manager`
> [!TIP]
> Zdaje się nie jest potrzebny podczas tworzenia nowego projektu. Korzystając z CLI i `ng new` node modulsy są instalowane od razu


  <mark>_Następnie zainstalujmy zależności:_<mark/>
   
   * `npm install`
   **Wyjaśnienie:** Komenda npm install pobiera wszystkie wymagane paczki, które są zapisane w pliku package.json – są to biblioteki i narzędzia potrzebne do działania projektu.

6. **Uruchom serwer deweloperski**
   _W terminalu, będąc w lokalizacji projektu wykonaj:_
     * `ng serve`
     **Wyjaśnienie:** Komenda ng serve uruchamia serwer lokalny, dzięki czemu możesz testować aplikację na swoim komputerze.

    *Otwórz przeglądarkę i przejdź do adresu: `http://localhost:4200`
    **Wyjaśnienie:** Aplikacja będzie działać lokalnie na twoim komputerze pod domyślnym adresem localhost na porcie 4200. Teraz zobaczysz domyślną stronę startową Angulara.

    > Projekt defaultowo będzie dostępny pod adresem http://localhost:4200.
    >
    > package.json zawiera sekcje scripts, ng serve jest tam zdefiniowany jako **start**
    > 
    > Żeby użyć takiego skryptu wykonaj polecenie
    > * **npm run start**
    >
    > Możesz dowolnie definiować własne skrypty, skrypty mogą zawierać flagi


7. Teraz omówimy strukturę plików, które zostały wygenerowane po utworzeniu projektu. W edytorze kodu, takim jak VS Code, otwórz folder projektu.
    * **angular.json** - _Jest to główny plik konfiguracyjny Angulara. Zawiera ustawienia dotyczące budowania, testowania oraz uruchamiania aplikacji._
    * **package.json** - _Zawiera listę zależności projektu oraz skrypty do zarządzania aplikacją. Znajdziesz tu m.in. informację o tym, jaką wersję Angulara i innych bibliotek używasz._
    * **package-lock.json** - _Zabezpiecza konkretne wersje zależności, które zostały zainstalowane przez npm. Dzięki temu wszyscy deweloperzy pracujący nad projektem będą używać tych samych wersji bibliotek._
    * **tsconfig.*.json** - _Plik konfiguracyjny dla TypeScript. Angular opiera się na TypeScript, więc tutaj znajdziesz ustawienia dotyczące kompilacji kodu TypeScript._
    * **src/index.html** - _To główny plik HTML aplikacji. Angular wstawia tutaj wygenerowane widoki._
    * **src/main.ts** - _Punkt wejścia dla aplikacji Angular. Tutaj Angular inicjalizuje moduły i uruchamia aplikację._
    * **src/styles.scss** - _Główny plik stylów dla aplikacji, w formacie SCSS. Możesz tutaj dodać globalne style._
    * **src/app/** - _To najważniejszy folder, ponieważ tutaj będą znajdować się moduły, komponenty i serwisy twojej aplikacji._


8. Dlaczego projekt nie zawiera żadnego modułu?

Kiedyś podczas tworzenia projektu, Angular automatycznie wygenerowałby podstawowy moduł o nazwie AppModule. Znalazłbyś go w pliku:
**src/app/app.module.ts.**
Dzisiaj jest to standalone komponent **src/app/app.component.ts.**
Taki komponent w gruncie rzeczy pełni obie funkcje na raz, Angular pod spodem i tak stworzy sobie moduł dla takiego komponentu.
Więcej o standalone komponentach powiemy sobie w dalszej części materiału.

7. Tworzenie pierwszego komponentu: wyświetlanie listy przepisów kulinarnych.

    * Na początek chciałbym żebyśmy trochę posprzątali:
      * usuń zawartość szablonu w komponencie app.component
      * wyczyść tablice importowanych zależności komponentu. Znajdziesz ją wewnątrz dekoratora @Component. (metadane)
      * Usuń też test `should render title` z app.component.spec.ts
        Do tematu testów wrócimy w dalszej części materiału.

    * Będąc w folderze projektu, w terminalu wpisz `ng generate component recipe-list`
    **Wyjaśnienie:** Komenda ng generate component automatycznie wygeneruje strukturę nowego komponentu w folderze `src/app/recipe-list/`.
    * Otwórz plik `src/app/recipe-list/recipe-list.component.ts`. Znajdziesz tam domyślną klasę komponentu:
      * Dodaj zmienną recipes, przypisz do zmiennej tablice, która zawiera 3 obiekty, kazdy obiekt powinien zawierać dwie "propercje" **title** oraz **description**. Każda jest typu string i zawiera przykładowy tekst.
        > `recipes = [`
        > `   { title: 'Spaghetti Carbonara', description: 'Klasyczne włoskie danie.' },`
        > `   { title: 'Pancakes', description: 'Puszyste naleśniki z miodem.' },`
        > `   { title: 'Tacos', description: 'Meksykańskie tacos z wołowiną i pieprzem.' }`
        > ` ];`
    
   * Otwórz plik `src/app/recipe-list/recipe-list.component.html` a następnie, dodaj kod HTML do wyświetlania listy przepisów:
      * W znaczniku `<h2>` zawrzyj tekst `"Lista Przepisów"`
      * Użyj znaczników `<ul>` oraz `<li>` do wyświetlenia listy.
      * Przeiteruj się po tablicy za pomocą dyrektywy `*ngFor`
      * Za pomocą znacznika `<h3>` wyświetl tytuł a za pomocą znacznika `<p>` wyświetl opis produktu.
        > `<h2>Lista Przepisów</h2>`
        > `<ul>`
        > `  <li *ngFor="let recipe of recipes">`
        > `    <h3>{{ recipe.title }}</h3>`
        > `    <p>{{ recipe.description }}</p>`
        > `  </li>`
        > `</ul>`
        
> [!TIP]
> Celowo *ngFor? Osobiście chyba bym zrobił odwrotnie - szedł w nowy sytnax i pokazał że jest możliwość (i projekty tak będą często miały) z starym syntaxem. Ten nowy jest prostszy do ogarnięcia.> 

**Wyjaśnienie**: Użyliśmy dyrektywy *ngFor, która iteruje po tablicy recipes i generuje elementy listy na podstawie danych. W Angularze {{ recipe.title }} i {{ recipe.description }} to przykład tzw. interpolacji.

* By iteracja po tablicy była możliwa musisz zaimportować dyrektywę ngFor. Przejdź do `src/app/recipe-list/recipe-list.component.ts` i dodaj do listy importów `ngFor`
> `@Component({`
> `  selector: 'app-recipe-list',`
> `  standalone: true,`
> `  imports: [NgFor],`
> `  templateUrl: './recipe-list.component.html',`
> `  styleUrl: './recipe-list.component.scss'`
> `})`
  * Otwórz plik `src/app/app.component.ts` a następnie: 
    * zaimporuj stworzony komponent poprzez dodanie `RecipeListComponent` do listy importów.
  * Teraz otwórz plik `src/app/app.component.html`, a następnie:
    * dodaj tag (selector) komponentu recipe-list, aby wyświetlić go na stronie głównej
        > `<app-recipe-list></app-recipe-list>`

    **Wyjaśnienie**: Angular identyfikuje komponent RecipeListComponent dzięki jego selectorowi: `<app-recipe-list>`. Możemy go używać jako tagu HTML, aby wyświetlić zawartość komponentu.

  * Zapisz wszystkie zmiany i uruchom ponownie serwer, jeśli został zatrzymany `ng serve`

Teraz w przeglądarce zobaczysz listę przepisów kulinarnych! 🎉

##### Podsumowanie Modułu 1:
W tym module:

* Zainstalowaliśmy Angular CLI i stworzyliśmy projekt.
* Zrozumieliśmy strukturę projektu Angular.
* Stworzyliśmy pierwszy komponent wyświetlający listę przepisów.
