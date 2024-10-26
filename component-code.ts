// KROK 4 - LOGIKA KOMPONENTU RecipeTemplateFormComponent
// ...
export class RecipeTemplateFormComponent implements OnInit {
  // Normalnie moglibyśmy nie pisać tutaj typu bo po co
  // Robimy to explicite  w celach dydaktycznych
  showForm: boolean = false;

  // wartość wejściowa komponentu która odpowie na pytanie czy dodajemy nowy przepis czy edytujemy już istniejący.
  @Input() isEditMode = false;
  // Jeżeli edytujemy, to potrzebujemy przepis, po to jest ta wartość wejściowa (opcjonalna)
  @Input() currentRecipe: RecipeModel | null = null;

  // Dzięki konstruktorowi wstzrzykniemy zależność (zasób) RecipeService
  constructor(private recipeService: RecipeService) {}

  // onInit life cycle hook przyda się gdy będziemy przygotowywać logikę edycji przepisu
  ngOnInit(): void {
    if (this.currentRecipe) {
      // Jeśli edytujemy, wypełnij formularz danymi przepisu
    }
  }

  // Metoda do pokazania/ukrycia formularza
  toggleForm(): void {
      this.showForm = !this.showForm;
  }

  // Metoda do zatwierdzenia zmian (submit) formularza
  onSubmit(form: NgForm): void {
    // chcemy zmienić / dodać przepis jedynie gdy formularz nie zawiera błędów
    if (form.valid) {
      // tworzymy instancje przepisu (RecipeModel)
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(), //id musi być unikalny
        title: form.value.title,
        description: form.value.description,
        ingredients: form.value.ingredients.split(','),
        preparationTime: 30, // na razie nie mamy kontrolki, dodajemy predefiniowaną wartość
        difficulty: 'easy' // na razie nie mamy kontrolki, dodajemy predefiniowaną wartość
      };

      // Serwis zawiera osobne metody na dodanie i edycje przepisu dlatego
      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      // Gdy już wszystkie czynności wymagane do dodania lub edycji przepisu są wykonane, musimy zresetować formularz i ukryć komponent
      form.reset();
      this.showForm = false;
    }
  }
}
