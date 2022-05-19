import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(item: any, ...args: unknown[]): unknown {
   // const rate: any = ((item.minimumvalue / 1000) * item.price);
    const rate: any = (item.units == 'u') ? (item.minimumvalue * item.price) : ((item.minimumvalue / 1000) * item.price);
    return Math.round((rate + Number.EPSILON) * 100) / 100
  }
}
