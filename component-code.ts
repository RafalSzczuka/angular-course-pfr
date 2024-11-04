// ######################## CZĘŚĆ Template Driven Forms ########################

// ############ recipe-template-form-component.ts - krok 4 ############

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
  constructor(private recipeService: RecipeService) { }

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

// ############ ############
// ######################## ########################




// ######################## CZĘŚĆ Reactive Forms  ########################

// ############ recipe-template-form-component.ts - krok 4 ############

// ...
export class RecipeFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;

  showForm = false;
  recipeFormGroup!: FormGroup;

  // wstrzykujemy FormBuildera, to dzięki niemu będziemy w stanie zbudować reactive forms
  constructor(private fb: FormBuilder, private recipeService: RecipeService) { }

  // definiujemy nasza formGroup dzięki FormBuilder'owi, zauważ że na tym poziomie defiuniujesz strukturę, wartośc początkową, walidatory i tak dalej.
  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      ingredients: ['', Validators.required]
    });

    // metoda patchValue inteligętnie podmienia wartości kontrolek podanych jako wartość wejściowa funkcji
    if (this.currentRecipe) {
      this.recipeFormGroup.patchValue(this.currentRecipe);
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(),
        ...this.recipeFormGroup.value, // ta linijka tworzy 'shadow copy' obecnych wartości formularza i je tu wrzuca, dzięki temu nie musimy ich deklarować ręcznie jeżeli się nie zmianiają, nie są mapowane, parsowane itp.
        ingredients: this.recipeFormGroup.value.ingredients.split(','), // metoda pomocnicza split(',') znajduje w ciągu znaków ',' i na tej podstawie rozdziela ciąg na części
        preparationTime: 30,
        difficulty: 'easy'
      };

      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      this.recipeFormGroup.reset();
      this.showForm = false;
    }
  }
}

// ############ ############
// ######################## ########################


// ######################## CZĘŚĆ Angular Material ########################

// Lista popularnych składników
popularIngredients: string[] = [
  'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
  'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
  'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
  'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
  'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
  'Corn', 'Chili powder'
];

// ######################## ########################