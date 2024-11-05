import { ResolveFn } from '@angular/router';
import { delay, map, of } from 'rxjs';

export const recipePageResolver: ResolveFn<boolean> = () => {
  return of(null).pipe( // of() tworzy strumień
    delay(5000), // opóźni zwrotkę o 5 sekund
    map(() => true) // zmapuje zwrotkę do wartości true
  );
};
