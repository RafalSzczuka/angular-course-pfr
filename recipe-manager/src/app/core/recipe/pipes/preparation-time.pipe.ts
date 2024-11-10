import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true,
})
export class PreparationTimePipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): string | undefined {
    return value != null ? `${value} minut` : value;
  }

}
