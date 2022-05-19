import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holditems'
})
export class HolditemsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return JSON.parse(value).items.length
  } 
}

@Pipe({
  name: 'holdTime'
})
export class HoldTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return JSON.parse(value).date
  } 
}
