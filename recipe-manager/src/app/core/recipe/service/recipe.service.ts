import { Injectable } from '@angular/core';
import { RecipeModel } from '../model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
