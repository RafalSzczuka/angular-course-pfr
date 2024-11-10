**Moduł 7: Dyrektywy i Pipes**
Tworzenie własnej dyrektywy i pipe.
Dyrektywa: podkreślająca przepis na hover
Pipes: wyświetlanie przepisów w estetyczny sposób, np. formatowanie czasu gotowania (np. "45 minut" zamiast "45").


1. Generowanie dyrektywy `HighlightOnHoverDirective`
   * W terminalu, będąc w projekcie wpisz i wykonaj `ng generate directive core/recipe/directives/highlightOnHover`
   > Ta komenda wygeneruje pliki highlight-on-hover.directive.ts oraz zaktualizuje app.module.ts, jeśli aplikacja jest modułowa.
   > Jeśli pracujemy na komponentach standalone, dodamy dyrektywę ręcznie do odpowiednich komponentów.

   * Przejdźmy do nowo utworzonej dyrektywy i dodajmy w jej konstruktorze:
    > `console.log('to ja dyrektywa');`

   * Następnie uruchommy aplikacje, nie zapomnij o serwerze fake-api.
   > w terminalu będąc w projekcie `npm run start` w kolejnym terminalu `npm run fake-api`

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
   > ` transform(value: number | undefined, ...args: unknown[]): string | undefined { `
   >    return value != null ? `${value} minut` : value;
   >  `}`

   * Następnie przejdźmy do `recipe-detail.component.ts` i dodajmy `PreparationTimePipe` do listy importów.
   * Gdy już to mamy, dodajmy użycie w template, przejdźmy do `recipe-detail.component.html` i edytujmy linijkę odpowiedzialną za wyświetlenie czasu przygotowania:
   > `<p><strong>Czas przygotowania:</strong> {{ recipe.preparationTime | preparationTime }}</p>`

6. Pipe `DifficultyPipe`
   * W terminalu, będąc w projekcie wpisz i wykonaj `ng generate pipe core/recipe/pipes/difficulty`
   > Ta komenda wygeneruje pliki `difficulty.pipe.ts` oraz zaktualizuje app.module.ts, jeśli aplikacja jest modułowa.
   > Jeśli pracujemy na komponentach standalone, dodamy dyrektywę ręcznie do odpowiednich komponentów.