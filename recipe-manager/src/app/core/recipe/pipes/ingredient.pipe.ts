import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredient',
  standalone: true
})
export class IngredientPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string {
    return value.join(', ')
  }

}
