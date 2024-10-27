**Moduł 4 - Formularze i walidacja - Dodawanie oraz edytowanie przepisów:**
W tym module uczestnicy nauczą się, jak tworzyć formularze w Angularze z użyciem dwóch podejść:
  * Template-driven Forms (formularze oparte na szablonach)
  * Reactive Forms (formularze reaktywne)
Zbudujemy formularz umożliwiający dodawanie i edytowanie przepisów kulinarnych, z walidacją pól. Na głównej stronie umieścimy przycisk, który będzie pokazywał i ukrywał formularz. Na koniec omówimy walidację formularzy, np. wymagana nazwa przepisu i minimalna liczba składników.

**CZĘŚĆ Template-driven Forms**
1. Zacznijmy od utworzenia komponentu, który będzie odpowiedzialny za formularz dodawania i edytowania przepisu.
    * W terminalu w katalogu projektu utwórz nowy komponent za pomocą `ng generate component ui/recipe-template-form`

    >To polecenie utworzy pliki:
    >
    >    `recipe-template-form.component.ts`
    >    `recipe-template-form.component.html`
    >    `recipe-template-form.component.scss`

2. Do komponentu zaimporujmy CommonModule. Następnie przejdźmy do implementacji logiki która pozwoli nam na pokazanie oraz ukrycie komponentu.
    * Przejdź do `recipe-template-form.component.ts`, dodaj tam zmienną showForm: boolean = false
        zmienna posłuży jako swojego rodzaju stan, odniesienie do tego czy widzimy komponent czy nie.
    * W komponencie zdefiniuj metodę toggleForm(): void - ta ma manipulować stanem showForm
        {
            this.showForm = !this.showForm;
        }
    * Przejdźmy do `recipe-template-form.component.html`, Dodajmy tam początkową formę kodu widoku naszego komponentu
        `<div *ngIf="showForm">`
        `<h2>Dodaj nowy przepis</h2>`
        `</div>`

3. Przejdzmy do komponentu głownego (w naszym wypadku `app.component`) i dodajmy nasz nowo utworzony komponent.
    * Zaimportujmy `RecipeTemplateFormComponent`
    * dodajmy następujący kod do `recipe-template-form.component.html`

    `<button (click)="recipeTemplateForm.toggleForm()">`
    `{{ recipeTemplateForm.showForm ? 'Ukryj formularz' : 'Dodaj nowy przepis' }}`
    `</button>`

    `<!-- Dodaj formularz do komponentu -->`
    `<app-recipe-template-form #recipeTemplateForm></app-recipe-template-form>`

    > #recipeTemplateForm to zmienna (template variable) dzięki niej możemy się dostać do instancji klasy komponentu.
    > Użycie jest widoczne w (click) naszego buttona.
    > Dzięki template variable bezpośrednio możemy się odwołać do metody zdefiniowanej w ramach komponentu.


4. Mamy już mechanikę ukrywania i odkrywania komponentu z formularzem którego użyjemy przy dodawaniu nowych przepisów.
Teraz dodajmy formularz
    * Do listy importów w `app-recipe-template-form.component.ts` dorzuć FormModule, to moduł który zawiera wszystkie podstawowe zasoby potrzebne do obsługi formularza opartego na szablonach.
    * W pliku `template-code.html` znajdziesz kod potrzebny do stworzenia widoku. Komentarze zawierają opis potrzebny do zrozumienia wykorzystanych mechanizmów. W razie niezrozumienia, śmiało pytaj trenera :)
    * Gdy dodasz kod szablonu, kompilator poimformuje Cię o blądach, rozwiążesz je dodając logikę komponentu, znajdziesz ją w `component-code.ts` Komentarze zawierają wyjaśnienia użytych mechanizmów.

Teraz w przeglądarce zobaczysz przycisk dodaj nowy przepis, a po kliknięciu zobaczysz komponent odpowiedzialny za dodanie przepisu!  🎉

Zadanie do wykonania
  * Dodaj kontrolki do obsługi poziomu trudności wykonania oraz czas przygotowania dania z przepisu.



**CZĘŚĆ Reactive Forms**

1. Zacznijmy od utworzenia komponentu, który będzie odpowiedzialny za formularz dodawania i edytowania przepisu.
    * W terminalu w katalogu projektu utwórz nowy komponent za pomocą `ng generate component ui/recipe-reactive-form`

    >To polecenie utworzy pliki:
    >
    >    `recipe-reactive-form.component.ts`
    >    `recipe-reactive-form.component.html`
    >    `recipe-reactive-form.component.scss`

2. Przejdź do `recipe-template-form.component.ts`
    * Zaimporuj CommonModule
    * Dodaj zmienną `showForm: boolean = false`
    * Zdefiniuj metodę
        toggleForm(): void
            {
                this.showForm = !this.showForm;
            }
    * Przejdźmy do `recipe-template-form.component.html`, Dodajmy tam początkową formę kodu widoku naszego komponentu
        `<div *ngIf="showForm">`
        `<h2>Dodaj nowy przepis</h2>`
        `</div>`

3. Logikę odpowiedzialną za wyświetlenie oraz ukrycie już mamy.
Przejdźmy do `app.component.html` i podmieńmy tagi komponentów by zacząć używać `<app-recipe-reactive-form #recipeReactiveForm></app-recipe-reactive-form>`
Następnie przejdźmy do `app.component.ts` i zaimportujmy nasz nowy komponent

4. Teraz dodajmy formularz
    * Do listy importów w `app-recipe-reactive-form.component.ts` dorzuć ReactiveFormModule, moduł potrzebny do pełnej obsługi formularzy Angular opartych na modelu.
    * W pliku `template-code.html` znajdziesz kod potrzebny do stworzenia widoku. Komentarze zawierają opis potrzebny do zrozumienia wykorzystanych mechanizmów. W razie niezrozumienia, śmiało pytaj trenera :)
    * Gdy dodasz kod szablonu, kompilator poimformuje Cię o blądach, rozwiążesz je dodając logikę komponentu, znajdziesz ją w `component-code.ts` Komentarze zawierają wyjaśnienia użytych mechanizmów.

Teraz w przeglądarce zobaczysz przycisk dodaj nowy przepis, a po kliknięciu zobaczysz komponent odpowiedzialny za dodanie przepisu!  🎉

Zadanie do wykonania
  * Dodaj kontrolki do obsługi poziomu trudności wykonania oraz czas przygotowania dania z przepisu.




**CZĘŚĆ Angular Material**

1. Instalacja Angular Material, Angular CDK oraz Angular Animations
    * W terminalu przejdź do lokalizacji swojego projektu i uruchom polecenie: `ng add @angular/material`
    > Konfiguracja stylów Angular Material:
    > Po wykonaniu powyższego polecenia, Angular Material poprosi o wybór opcji, które zainstalują style, czcionki i animacje dla projektu:
    > * Theme: Wybierz Azure/Blue.
    > * Global Typography Styles: Wybierz Yes.
    > * Animations: Wybierz Yes (dzięki temu animacje Angular Material będą działały poprawnie).

    * Po wykonaniu tego polecenia część plików została edytowana....

2. Użycie komponentów UI pochodzących z biblioteki Angular Material
   * Po instalacji zaszły pewne zmiany w projekcie, m.in dostaliśmy predefiniowany zestaw styli globalnych, przejdźmy teraz do pliku `global-styles.scss` i skopiujmy temte style i podmieńmy w pliku `styles.scss`

   * Dodając bibliotekę zaznaczyliśmy że chcemy korzystać z animacji, a więc przejdźmy do ustawień głównych aplikacji `app.config.ts` i upewnijmy się że na liście provide jest `provideAnimationsAsync()`

   * Przejdźmy teraz do obecnie używanego komponentu dodawania i edytowania przepisów `app-recipe-reactive-form.component.ts` i dodajmy do listy importów `MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule`
   * Gdy już importy mamy ograne, czas na edycje widoku. Przejdź do `template-code.html` znajdź tam część dotyczącą Angular Material, krok drugi i skopiuj kod a następnie podmień na ten znajdujący się w `app-recipe-reactive-form.component.ts`
   * Dorzućmy style z `component.style.scss` do `app-recipe-reactive-form.component.scss` by trochę wyrównać nasze kontenery na kontrolki jak i sam formularz
   Gdybyś się zastanawiał co to jest @if, @for to są to alternatywy dla dyrektyw *ngIf *ngFor pochodzące z nowego "control flow" - dopytaj trenera

Zadanie do wykonania
  * Kontrolka składników jest obsługiwana przez texarea, fajnie byłoby gdyby urzytkownik nie musiał wpisywać ich z palca a mógł wybrać z listy wielokrotnego wyboru. Zaimplementuj to w oparciu o `https://material.angular.io/components/select/overview#multiple-selection`
  Dorzućmy też wyświetlanie składników po wyborze przepisu.
  Podpowiedź: Potrzebna będzie lista składników by móc po niej iterować, przykładową znajdziesz w `component-code.ts`

Zadanie dodatkowe
    * Przerób komponent `recipe-template-form` tak by używał Angular Material komponentów UI
    * Przerób reszte komponentów, tak by używały Angular Material komponentów UI

##### Podsumowanie Modułu:
W tym module:

Mieliśmy okazję poznać oba sposoby na tworzenie formularzy w Angularze.
* Template-Driven Forms są prostsze do wdrożenia, ale mniej elastyczne. Świetnie sprawdzają się w małych formularzach.
* Reactive Forms dają większą kontrolę nad logiką formularza, są bardziej złożone, ale umożliwiają skomplikowaną walidację i łatwą integrację z innymi częściami aplikacji.
* Dowiedzieliśmy się czym są biblioteki komponentów UI i jak ich użyć w projekcie na przykładzie Angular Material
