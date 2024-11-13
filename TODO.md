**Moduł 9: Obsługa plików i zdjęć**
Dodawanie możliwości wgrania zdjęcia do przepisu.
Podgląd zdjęć dla każdego przepisu w szczegółowym widoku przepisu.


1. Dodanie pola image do modelu `RecipeModel`
   Zakładamy, że chcielibyśmy, by zdjęcia były częścią formularza, dlatego:
   * przejdź do `recipe.model.ts`
   * dodaj pole `image?: string; // URL lub ścieżka do zdjęcia przepisu`

2. Aktualizacja formularza przepisu
   * przejdź do `recipe-reactive-form.ts`
   * dodaj pole do modelu formularza;
      > `imageBase64: [''] // nowe pole na obraz`
   * dodaj metodę do obsługi wczytywania pliku
   > `   // Obsługa wczytania pliku`
   > `onFileSelected(event: Event): void {`
   > `  const file = (event.target as HTMLInputElement).files?.[0];`
   > `  if (file) {`
   > `    const reader = new FileReader();`
   > `    reader.onload = () => {`
   > `      this.recipeFormGroup.patchValue({ imageBase64: reader.result as string });`
   > `    };`
   > `    reader.readAsDataURL(file);`
   > `  }`
   > `}`

   * następnie przejdź do `recipe-reactive-form.html` i dodaj jako ostatnie pole formularza:
   > ` <!-- Image -->`
   > ` <div class="file-upload-field">`
   > `     <label for="image">Zdjęcie przepisu</label>`
   > `     <input type="file" id="image" (change)="onFileSelected($event)" />`
   > ` </div>`

   * przydałoby się jeszcze trochę ostylować nasze nowe pole, dlatego przejdź do `recipe-reactive-form.scss` i dodaj
   > `.file-upload-field {`
   > `  display: flex;`
   > `  flex-direction: column;`
   > `  margin-bottom: 16px;`
   > 
   > `  label {`
   > `    font-size: 14px;`
   > `    color: #616161;`
   > `    margin-bottom: 8px;`
   > `  }`
   > 
   > `  input[type="file"] {`
   > `    cursor: pointer;`
   > `    padding: 8px;`
   > `    border: 1px solid #ccc;`
   > `    border-radius: 4px;`
   > `  }`
   > `}`

   Pięknie, jesteśmy w stanie dodać i przyjąć zdjęcie. Pora je wyświetlić.

3. Modyfikacja komponentu `recipe-detail.component`
   * przejdź do widoku komponentu i dodaj na jako pierwszy element taga `<mat-card-content>`
   > ` <div *ngIf="recipe.imageBase64" class="recipe-image">`
   > `   <img [src]="recipe.imageBase64" alt="Zdjęcie przepisu" />`
   > ` </div>`

   * następnie przejdź do pliku ze stylami i dodaj
   > `.recipe-image {`
   > `  place-self: center;`
   > 
   > `  img {`
   > `    width: 100%;`
   > `    max-width: 300px;`
   > `    border-radius: 8px;`
   > `    margin-bottom: 16px;`
   > `  }`
   > `}`

   Dzięki temu, przechodząc do szczegółów przepisu, jesteśmy w stanie zobaczyć opis i zdjęcie dania.
   Dobrze byłoby widzieć zdjęcia też jako elementy strony głownej, z listą przepisów, może tylko w delikatnie mniejszym wydaniu.

4. Modyfikacja komponentu `recipe-list.component`
   * przejdź do widoku komponentu i dodaj jako pierwszy element taga `<mat-card-content>`
   > `<div *ngIf="recipe.imageBase64" class="recipe-image">`
   > `  <img [src]="recipe.imageBase64" alt="Zdjęcie przepisu" />`
   > `</div>`

   * następnie przejdź do pliku ze stylami i dodaj
   > `.recipe-image {`
   > `  place-self: center;`
   > 
   > `  img {`
   > `    width: 100%;`
   > `    max-width: 150px;`
   > `    border-radius: 8px;`
   > `    margin-bottom: 16px;`
   > `  }`
   > `}`


Teraz w przeglądarce zobaczysz listę przepisów kulinarnych oraz będziesz mógł podejrzeć ich szczegóły a wszystkiemu będą towarzyszyć zdjęcia jakie możesz dodać! 🎉


Dla chętnych:
   * Dodaj obsługę zdjęć przez komponent `RecipeTemplateFormComponent`

##### Podsumowanie Modułu:
W tym module:
   * Dodaliśmy funkcjonalność obsługi zdjęć przez nasz formularz
   * Dodaliśmy wyświetlanie dodanych zdjęć