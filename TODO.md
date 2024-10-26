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
  * Spraw by składniki były wyświetlane... może?



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

3,5. Dodałeś nowy import czy podmieniłeś na nowy? Jest to bardzo istotne, nie importujmy rzeczy których nie używamy.
                                    ###########  dopisz coś mądrego   ###########






                                                                    ###########  czy na pewno?   ###########
4. Teraz dodajmy formularz
    * Do listy importów w `app-recipe-reactive-form.component.ts` dorzuć FormModule oraz ReactiveFormModule, te moduły są potrzebne do pełnej obsługi formularzy Angular opartych na reaktywności.
    * W pliku `template-code.html` znajdziesz kod potrzebny do stworzenia widoku. Komentarze zawierają opis potrzebny do zrozumienia wykorzystanych mechanizmów. W razie niezrozumienia, śmiało pytaj trenera :)
    * Gdy dodasz kod szablonu, kompilator poimformuje Cię o blądach, rozwiążesz je dodając logikę komponentu, znajdziesz ją w `component-code.ts` Komentarze zawierają wyjaśnienia użytych mechanizmów.

Teraz w przeglądarce zobaczysz przycisk dodaj nowy przepis, a po kliknięciu zobaczysz komponent odpowiedzialny za dodanie przepisu!  🎉

Zadanie do wykonania
  * Dodaj kontrolki do obsługi poziomu trudności wykonania oraz czas przygotowania dania z przepisu.
  * Spraw by składniki były wyświetlane... może?

##### Podsumowanie Modułu:
W tym module:

Mieliśmy okazję poznać oba sposoby na tworzenie formularzy w Angularze.
* Template-Driven Forms są prostsze do wdrożenia, ale mniej elastyczne. Świetnie sprawdzają się w małych formularzach.
* Reactive Forms dają większą kontrolę nad logiką formularza, są bardziej złożone, ale umożliwiają skomplikowaną walidację i łatwą integrację z innymi częściami aplikacji.


Zadanie dla chętnych