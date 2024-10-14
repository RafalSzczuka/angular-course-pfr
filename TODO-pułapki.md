@Input() selectedRecipe: { title: string, description: string } | null = null;

NG1: Object is possibly 'null'.
src/app/recipe-detail/recipe-detail.component.html:2:26

1. ?.
2. ngIf
3. resolver

recipe-detail.component.html:1 NG0303: Can't bind to 'ngIf' since it isn't a known property of 'div' (used in the '_RecipeDetailComponent' component template).

import Common module albo ngIf