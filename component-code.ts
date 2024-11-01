// ######################### app.routes.ts - krok 1 #########################

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // domyślna ścieżka, która przekierowuje na /recipes jeśli nie ma podanej innej ścieżki.
  { path: 'recipes', component: RecipeListComponent }, // ścieżka do widoku listy przepisów.
  { path: 'recipe/add', component: RecipeReactiveFormComponent }, // ścieżka do formularza dodawania nowego przepisu.
  { path: 'recipe/edit/:id', component: RecipeReactiveFormComponent }, // ścieżka do formularza edycji przepisu, gdzie :id jest dynamicznym parametrem.
  { path: 'recipe/:id', component: RecipeDetailComponent } //  ścieżka do szczegółów wybranego przepisu.
];

// ######################### #########################



// ######################### recipe-details-component.ts #########################

export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipe = this.recipeService.getRecipeById(+id);
    }
  }
}

// ######################### #########################



// ######################### recipe-reactive-form-component.ts #########################

@Component({
  selector: 'app-recipe-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './recipe-reactive-form.component.html',
  styleUrl: './recipe-reactive-form.component.scss'
})
export class RecipeReactiveFormComponent {
  isEditMode = false;
  currentRecipe: RecipeModel | undefined;
  recipeFormGroup!: FormGroup;
  popularIngredients: string[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      ingredients: [[], Validators.required],
      preparationTime: ['', Validators.required],
      difficulty: ['', Validators.required]
    });

    this.popularIngredients = this.recipeService.getPopularIngredients();

    // jeżeli istnieje przepis to go ustawiamy - tryb edycji
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // ustawiamy edit mode
      this.isEditMode = true;
      this.currentRecipe = this.recipeService.getRecipeById(+id);
      if (this.currentRecipe) {
        this.currentRecipe.id = +id;
      }
    }

    // jeżeli jest przepis, ustawiamy obecne wartości w formularzu
    if (this.currentRecipe) {
      // zadziała dla niemal wszystkich typów kontrolek, nie zadziała dla formArray
      this.recipeFormGroup.patchValue(this.currentRecipe);
    }
  }

  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza
      if (this.isEditMode) {
        if (this.currentRecipe) {
          recipe.id = this.currentRecipe?.id;
        }
        this.recipeService.editRecipe(recipe) // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu
      } else {
      this.recipeService.addRecipe(recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu
      }

      this.router.navigate(['/recipes']); // Powrót do listy przepisów
    }
  }
}

// ######################### #########################