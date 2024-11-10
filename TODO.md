**Moduł 7: Dyrektywy i Pipes**
W tym module nauczymy się tworzyć własne dyrektywy i pipes. Naszym celem będzie:
  * Dyrektywa: Utworzenie dyrektywy HighlightOnHoverDirective, która podkreśli przepis po najechaniu kursorem.
  * Pipes: Stworzenie pipe’ów formatujących, takich jak przekształcanie czasu gotowania na czytelny format (np. "45 minut" zamiast "45")
    oraz tłumaczenie poziomu trudności przepisu na język polski.

1. Tworzenie Dyrektywy `HighlightOnHoverDirective`
   * Wygenerowanie dyrektywy:
     * W terminalu, będąc w projekcie, wpisz: `ng generate directive core/recipe/directives/highlightOnHover`
      > Komenda wygeneruje pliki `highlight-on-hover.directive.ts` oraz doda dyrektywę do app.module.ts (dla aplikacji modułowej)
      > W przypadku komponentów standalone, musimy dodać ją sami.

   * Testowanie konstrukcji: 
     * Dodajmy w konstruktorze dyrektywy: `console.log('Dyrektywa załadowana');`
     * Uruchom aplikację i serwer fake-api: `npm run start` oraz `npm run fake-api`
     * Zauważ, że na razie niczego to nie zmieniło w naszej aplikacji. Możesz sprawdzić w dev-tools przeglądarki, że nie widzimy log'a z konstruktora.

2. Dodanie dyrektywy do komponentu
   * przejdź do `recipe-list.component.ts` i dodaj do tablicy importów naszą nowo utworzną dyrektywę `HighlightOnHoverDirective`
   * przejdź do `recipe-list.component.html` i dodaj użycie dyrektywy. Docelowo chcemy by dyrektywa działała na hover elementu listy.
     Dodajmy więc selektor dyrektywy `appHighlightOnHover` do taga `<mat-card>` o tak:
     > `<mat-card class="recipe-card" *ngFor="let recipe of recipes" appHighlightOnHover>`

   * przejdźmy do konsoli w dev-tools przeglądarki - zobaczysz log'a którego wywołujemy z konstruktora dyrektywy.

3. Implementacja dyrektywy `HighlightOnHoverDirective`
   * przejdź do `highlight-on-hover.directive.ts`, dodamy tam logikę kóra sprawi, komponent listy podświetli się na niebiesko przy akcji hover'a.
     Wszystko zdefiniujemy w ramach naszej syrektywy, tak by dyrektywa była w pełni odizolowana i jedyne czego będziemy potrzebować do jej użycia to import i selektor.
   * usuńmy log'a z konstruktora. Następnie wstrzyknijmy ElementRef oraz Renderer2.
   > `constructor(private el: ElementRef, private renderer: Renderer2) {}`
   Wyjaśnienie czym są te dwie rzeczy znajdziemy w prezentacji.

   * Mamy już niemal wszystko potrzebne do uzyskania oczekiwanego efektu. Potrzebujemy jeszcze jakoś podpiąć się do akcji `mouseenter` i `mouseleave`. To da nam kontrole nad czasem zmiany stanu efektu.
   W tym celu użyjemy `@HostListener`.

   * zdefiniuj na górze klasy dyrektywy zmieną:
    > `hoverColor: string = 'dodgerblue';`

   * natępnie na dole klasy zdefiniuj
      > `  // Obsługuje zdarzenie 'mouseenter' - zmienia styl, gdy użytkownik najedzie myszką na element`
      > `@HostListener('mouseenter') onMouseEnter() {`
      > `  this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.hoverColor);`
      > `  this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');`
      > `}`

   * w tym momencie po najechaniu kursorem na element listy przepisów zmienia się kolor jego tła.
      Gdy jednak zabierzesz kursor, stan zostaje zachowany. Naprawmy to:
      Będąć w dyrektywnie, dodaj poniżej kolejne listenere:
      > `  // Obsługuje zdarzenie 'mouseleave' - przywraca pierwotny styl, gdy myszka opuszcza element`
      > `@HostListener('mouseleave') onMouseLeave() {`
      > `  this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');`
      > `}`

   * Teraz po najechaniu na element zmieni się jego tło a po zjechaniu styl zostanie usunięty,
      w efekcie czego powrócimy do stanu sprzed najechania.

   * Zastanawiasz się pewnie czy możemy parametryzować dyrektywy. Odpowiedź brzmi tak, dyrektywa może przyjmować wartości w formie inputa. Dodajmy jeden.
   * Zmień `hoverColor: string = 'dodgerblue';` na ` @Input() hoverColor: string = 'dodgerblue';`
      Teraz nasza zmienna to input do którego możemy podać kolor z zewnątrz dynamicznie.
   * Przejdź do `recipe-list.component.html` i po selektorze `appHighlightOnHover` dodaj `[hoverColor]="'#e0f7fa'"`
   > `<mat-card class="recipe-card" *ngFor="let recipe of recipes" appHighlightOnHover [hoverColor]="'#e0f7fa'" >`

4. Rozszerzmy widok uzyskiwany po przejściu w szczegóły przepisu.
   * przjdź do `recipe-details.html`
   * wewnątrz taga `<mat-card-content>` definiujemy zawartość naszej karty przepisów. Rozszerzmy ten widok o kolejne wartościu modelu recipe.
   > `<mat-card-content>`
   >  `     <p><strong>Składniki:</strong> {{ recipe.ingredients.join(', ') }}</p>`
   >  `     <p><strong>Opis:</strong> {{ recipe.description }}</p>`
   >  `     <p><strong>Czas przygotowania:</strong> {{ recipe.preparationTime }}</p>`
   >  `     <p><strong>Trudność wykonania:</strong> {{ recipe.difficulty }}</p>`
   >  `</mat-card-content>`

   Widzimy tu 3 problemy:
      * preparationTime - wyrażane w liczbach, bez minut
      * difficulty - jest po angielsku
      * ingredient - wywoływane jest wraz z funckją .join(', '), używanie funkcji w template jest nikorzystnę z punktu widzenia performance aplikacji.

   Rozwiążemy te problemy poprzez użycie Pipe.

5. Pipe `PreparationTimePipe`
   * W terminalu, będąc w projekcie wpisz i wykonaj `ng generate pipe core/recipe/pipes/preparationTime`
   > Ta komenda wygeneruje pliki `preparation-time.pipe.ts` oraz zaktualizuje app.module.ts, jeśli aplikacja jest modułowa.
   > Jeśli pracujemy na komponentach standalone, dodamy dyrektywę ręcznie do odpowiednich komponentów.

   * przejdźmy do `preparation-time.pipe.ts` i edytujmy metodę transform tak by zwracała czas w minutach. Nie zapomnijmy o odpowiednich typach.
   > ` transform(value: number, ...args: unknown[]): string { `
   >    return `${value} minut`
   >  `}`

   * Następnie przejdźmy do `recipe-detail.component.ts` i dodajmy `PreparationTimePipe` do listy importów.
   * Gdy już to mamy, dodajmy użycie w template, przejdźmy do `recipe-detail.component.html` i edytujmy linijkę odpowiedzialną za wyświetlenie czasu przygotowania:
   > `<p><strong>Czas przygotowania:</strong> {{ recipe.preparationTime! | preparationTime }}</p>`
   dodajemy `!` na końcu parametru, mówiąc kompilatorowi że nie wpadnie tam null albo undefined.
   Nie wpadnie, bo zadbaliśmy o to na górze dyrektywą *ngIf

6. Pipe `DifficultyPipe`
   * W terminalu, będąc w projekcie wpisz i wykonaj `ng generate pipe core/recipe/pipes/difficulty`
   > Ta komenda wygeneruje pliki `difficulty.pipe.ts` oraz zaktualizuje app.module.ts, jeśli aplikacja jest modułowa.
   > Jeśli pracujemy na komponentach standalone, dodamy dyrektywę ręcznie do odpowiednich komponentów.

   * przejdźmy do `difficulty.pipe.ts` i edytujmy metodę transform tak by poziom trudności w języku polskim. Nie zapomnijmy o odpowiednich typach.
   > `   transform(value: 'easy' | 'medium' | 'hard', ...args: unknown[]): string {`
   > `  switch (value) {`
   > `    case 'easy':`
   > `      return 'łatwy';`
   > `    case 'medium':`
   > `      return 'średnio trudny';`
   > `    case 'hard':`
   > `      return 'trudny'`
   > `  }`
   > `}`

   * Następnie przejdźmy do `recipe-detail.component.ts` i dodajmy `DifficultyPipe` do listy importów.
   * Gdy już to mamy, dodajmy użycie w template, przejdźmy do `recipe-detail.component.html` i edytujmy linijkę odpowiedzialną za wyświetlenie czasu przygotowania:
   > `<p><strong>Trudność wykonania:</strong> {{ recipe.difficulty! | difficulty }}</p>`
   dodajemy `!` na końcu parametru, mówiąc kompilatorowi że nie wpadnie tam null albo undefined.
   Nie wpadnie, bo zadbaliśmy o to na górze dyrektywą *ngIf

   **Nie tak się podchodzi do tematu wielu języków w aplikacji. Jednak temat ten wybiega poza ten kurs, jeżeli jesteś ciekaw: https://v17.angular.io/guide/i18n-overview**


Zadanie do wykonania:
   * Utwórz pipe dla przypadku ingredient. Przenieś wywołanie funkcji .join do ciała pipe i zwróć gotowy ciąg.
   * W komponencie `recipe-list.component` zamiast składników, chcemy widzieć opis, czas wykonania i poziom trudności. Użyj stworzonych pipe.
   Gdy to zrobisz, test może się trochę rozjeźdżać, dorzuć `text-align: start;` w stylach dla `mat-card-content > p`


Podsumowanie:
W tym kroku utworzyliśmy niestandardową dyrektywę `HighlightOnHoverDirective`, która dodaje interaktywne podświetlenie kart przepisów po najechaniu na nie kursorem. Dyrektywa zwiększa estetykę i użyteczność interfejsu, ułatwiając użytkownikom przeglądanie przepisów.

Podstawowe elementy w `HighlightOnHoverDirective`:
   * `Renderer2` do dynamicznego ustawiania styli na elemencie.
   * `HostListener` do nasłuchiwania zdarzeń mouseenter i mouseleave, aby kontrolować interakcje użytkownika.

Utorzyliśmyu też niestandardowe Pipe's, którę formatują nam wartości bezpośrednio w template komponentu. Pozwala to na dużą elastyczność i enkapsulacje logiki.