// ################ db.json - krok 1 ################

{
    "recipes": [
        {
            "id": 1,
            "title": "Spaghetti Carbonara",
            "description": "Klasyczne włoskie danie.",
            "ingredients": [
                "Pasta",
                "Eggs",
                "Pork",
                "Cheese",
                "Pepper"
            ],
            "preparationTime": 30,
            "difficulty": "easy"
        },
        {
            "id": 2,
            "title": "Pancakes",
            "description": "Puszyste naleśniki z syropem klonowym.",
            "ingredients": [
                "Flour",
                "Milk",
                "Eggs",
                "Honey"
            ],
            "preparationTime": 20,
            "difficulty": "medium"
        },
        {
            "id": 3,
            "title": "Tacos",
            "description": "Meksykańskie tacos z wołowiną i salsą.",
            "ingredients": [
                "Flour",
                "Milk",
                "Eggs",
                "Beef",
                "Salt"
            ],
            "preparationTime": 60,
            "difficulty": "hard"
        },
        {
            "id": "3",
            "title": "Tacos",
            "description": "Meksykańskie tacos z wołowiną i salsą.",
            "ingredients": [
                "Flour",
                "Milk",
                "Eggs",
                "Beef",
                "Salt"
            ],
            "preparationTime": 60,
            "difficulty": "hard"
        }
    ],
  }

// ################ ################





// ################ recipe.service.ts - krok 2 ################
//...

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    popularIngredients: string[] = [
        'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
        'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
        'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
        'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
        'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
        'Corn', 'Chili powder'
    ];

    baseUrl = `http://localhost:3000`

    constructor(private httpClient: HttpClient) { }

    // Metoda pobierająca wszystkie przepisy asynchronicznie
    // W tym celu używa HttpClient, bazuje na strumieniach
    getRecipes(): Observable<RecipeModel[]> {
        // w db.json sprawdzisz, że path do danych to właśnie /recipes
        return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`)
    }

    // ...
}

// ################ ################





// ################ recipe-list.component.ts - krok 3 ################


//...
ngOnInit(): void {
    // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"
    this.recipeService.getRecipes().pipe(
        // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model
        tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
            //przypisanie modelu do zmiennej
            this.recipes = recipesFromGetRecipesMethod;
        })
        // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne
    ).subscribe();
}
//...


// ################ ################





// ################ recipe.service.ts - krok 4 ################

// Metoda usuwająca przepis
deleteRecipe(id: number): Observable < void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`)
}

// ################ ################





// ################ recipe-list.component.ts - krok 5 ################

//...
export class RecipeListComponent implements OnInit {
    selectedRecipeTitle: string | null = '';
    recipes: RecipeModel[] = [];

    @Output() recipeSelected = new EventEmitter<RecipeModel | null>();

    constructor(private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        this.getRecipes();
    }

    onDeleteRecipe(id: number | undefined): void {
        if (id) {
            this.recipeService.deleteRecipe(id).subscribe();  // Usuwanie przepisu
            this.getRecipes();  // Odśwież listę
        }
    }

    private getRecipes(): void {
        // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"
        this.recipeService.getRecipes().pipe(
            // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model
            tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
                //przypisanie modelu do zmiennej
                this.recipes = recipesFromGetRecipesMethod;
            })
            // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne
        ).subscribe();
    }
}

// ################ ################





// ################ db.json - krok 6 ################

{
    "recipes": [
        {
            "id": "1",
            "title": "Spaghetti Carbonara",
            "description": "Klasyczne włoskie danie.",
            "ingredients": [
                "Pasta",
                "Eggs",
                "Pork",
                "Cheese",
                "Pepper"
            ],
            "preparationTime": 30,
            "difficulty": "easy"
        },
        {
            "id": "2",
            "title": "Pancakes",
            "description": "Puszyste naleśniki z syropem klonowym.",
            "ingredients": [
                "Flour",
                "Milk",
                "Eggs",
                "Honey"
            ],
            "preparationTime": 20,
            "difficulty": "medium"
        },
        {
            "id": "3",
            "title": "Tacos",
            "description": "Meksykańskie tacos z wołowiną i salsą.",
            "ingredients": [
                "Flour",
                "Milk",
                "Eggs",
                "Beef",
                "Salt"
            ],
            "preparationTime": 60,
            "difficulty": "hard"
        }
    ],
        "ingredients": {
        "popularIngredients": [
            "Tomatoes",
            "Onions",
            "Garlic",
            "Potatoes",
            "Carrots",
            "Olive oil",
            "Butter",
            "Chicken",
            "Beef",
            "Pork",
            "Salt",
            "Pepper",
            "Paprika",
            "Basil",
            "Parsley",
            "Oregano",
            "Lemon",
            "Sugar",
            "Flour",
            "Eggs",
            "Milk",
            "Cheese",
            "Cream",
            "Bread",
            "Rice",
            "Pasta",
            "Beans",
            "Lettuce",
            "Spinach",
            "Broccoli",
            "Mushrooms",
            "Fish",
            "Shrimp",
            "Soy sauce",
            "Vinegar",
            "Honey",
            "Peppers",
            "Zucchini",
            "Cucumber",
            "Corn",
            "Chili powder"
        ]
    }
}

// ################ ################





// ################ recipe.service.ts - krok 6 ################

//...
export class RecipeService {
    baseUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    // Metoda pobierająca wszystkie przepisy asynchronicznie
    // W tym celu używa HttpClient, bazuje na strumieniach
    getRecipes(): Observable<RecipeModel[]> {
        // w db.json sprawdzisz, że path do danych to właśnie /recipes
        return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`);
    }

    // Metoda pobierająca przepis po id asynchronicznie
    // W tym celu używa HttpClient, bazuje na strumieniach
    getRecipeById(id: number): Observable<RecipeModel | undefined> {
        return this.httpClient.get<RecipeModel>(`${this.baseUrl}/recipes/${id}`);
    }

    // Metoda usuwająca przepis asynchronicznie
    deleteRecipe(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`);
    }

    // Metoda dodająca nowy przepis asynchronicznie
    // Jako zwrotkę, otrzymamy nowo dodany element
    addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
        return this.httpClient.post<RecipeModel>(`${this.baseUrl}/recipes`, recipe);
    }

    // Metoda edytująca istniejący przepis asynchronicznie
    // Jako zwrotkę, otrzymamy edytowany element
    editRecipe(updatedRecipe: RecipeModel): Observable<RecipeModel> {
        return this.httpClient.put<RecipeModel>(`${this.baseUrl}/recipes/${updatedRecipe.id}`, updatedRecipe);
    }

    // Metoda pobierająca wszystkie popularne składniki
    getPopularIngredients(): Observable<string[]> {
        return this.httpClient.get<{ popularIngredients: string[] }>(`${this.baseUrl}/ingredients`).pipe(map(result => result.popularIngredients));
    }
}

// ################ ################





// ################ recipe-details.component.ts - krok 6 ################

//...
export class RecipeDetailComponent implements OnInit {
    recipe: RecipeModel | undefined;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.recipeService.getRecipeById(+id).subscribe(result => {
                this.recipe = result;
            });
        }
    }
}

// ################ ################





// ################ recipe-list.component.ts - krok 6 ################

//...
export class RecipeListComponent implements OnInit {
    selectedRecipeTitle: string | null = '';
    recipes: RecipeModel[] = [];

    @Output() recipeSelected = new EventEmitter<RecipeModel | null>();

    constructor(private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        this.getRecipes();
    }

    onDeleteRecipe(id: number | undefined): void {
        if (id) {
            this.recipeService.deleteRecipe(id).subscribe(() => {
                this.getRecipes();  // Odśwież listę

            });  // Usuwanie przepisu
        }
    }

    private getRecipes(): void {
        // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"
        this.recipeService.getRecipes().pipe(
            // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model
            tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
                //przypisanie modelu do zmiennej
                this.recipes = recipesFromGetRecipesMethod;
            })
            // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne
        ).subscribe();
    }
}

// ################ ################





// ################ recipe-reactive-form.component.ts - krok 6 ################

//...
export class RecipeReactiveFormComponent implements OnInit {
    isEditMode = false;
    currentRecipe: RecipeModel | undefined;
    recipeFormGroup!: FormGroup;
    popularIngredients: string[] = [];

    constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.recipeFormGroup = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', Validators.required],
            ingredients: [[], Validators.required],
            preparationTime: ['', Validators.required],
            difficulty: ['', Validators.required]
        });

        this.recipeService.getPopularIngredients().subscribe(result => {
            this.popularIngredients = result;
        });

        // jeżeli istnieje przepis to go ustawiamy - tryb edycji
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            // ustawiamy edit mode
            this.isEditMode = true;
            // pobieramy edytowany przepis
            this.recipeService.getRecipeById(+id).subscribe(result => {
                this.currentRecipe = result;
                // jeżeli jest przepis, ustawiamy obecne wartości w formularzu
                if (this.currentRecipe) {
                    this.currentRecipe.id = +id;
                    // zadziała dla niemal wszystkich typów kontrolek, nie zadziała dla formArray
                    this.recipeFormGroup.patchValue(this.currentRecipe);
                }
            });
        }
    }

    onSubmit(): void {
        if (this.recipeFormGroup.valid) {
            const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza
            if (this.isEditMode) {
                if (this.currentRecipe) {
                    recipe.id = this.currentRecipe?.id;
                }
                this.recipeService.editRecipe(recipe).subscribe() // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu
            } else {
                this.recipeService.addRecipe(recipe).subscribe(); // Wysyłanie danych do serwisu w postaci nowego przepisu
            }

            this.router.navigate(['/recipes']); // Powrót do listy przepisów
        }
    }
}

// ################ ################





// ################ recipe-template-form.component.ts - krok 6 ################

//...
export class RecipeTemplateFormComponent implements OnInit {
    isEditMode = false;
    popularIngredients: string[] = [];
    currentRecipe: RecipeModel | undefined;
    recipe: RecipeModel = {
        id: undefined,
        title: '',
        description: '',
        ingredients: [''],
        preparationTime: undefined,
        difficulty: undefined
    };

    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.recipeService.getPopularIngredients().subscribe(result => {
            this.popularIngredients = result;
        });

        // jeżeli istnieje przepis to go ustawiamy - tryb edycji
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            // ustawiamy edit mode
            this.isEditMode = true;
            // pobieramy edytowany przepis
            this.recipeService.getRecipeById(+id).subscribe(result => {
                this.currentRecipe = result;
            });

            // jeżeli jest przepis, ustawiamy obecne wartości w formularzu
            if (this.currentRecipe) {
                this.currentRecipe.id = +id;
                this.recipe = this.currentRecipe;
            }
        }


    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.isEditMode) {
                this.recipeService.editRecipe(this.recipe); // Wysyłanie danych do serwisu w postaci edycji istniejącego
            } else {
                this.recipeService.addRecipe(this.recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu
            }
            this.router.navigate(['/recipes']); // Powrót do listy przepisów
        }
    }
}

// ################ ################
