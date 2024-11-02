import { ResolveFn } from '@angular/router';
import { debounceTime, delay, map, of, tap } from 'rxjs';

export const recipePageResolver: ResolveFn<boolean> = (route, state) => {
  return of(null).pipe( // of() tworzy strumień
    delay(5000), // opóźni zwrotkę o 5 sekund
    map(() => true) // zmapuje zwrotkę do wartości true
  );
};
