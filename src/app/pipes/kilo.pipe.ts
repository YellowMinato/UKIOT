import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'kilo'
})
export class KiloPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return value / 1000
  }
}
