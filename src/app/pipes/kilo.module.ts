import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KiloPipe } from './kilo.pipe';



@NgModule({
  declarations: [KiloPipe],
  exports: [KiloPipe],
  providers: [KiloPipe],
  imports: [
    CommonModule
  ]
})
export class KiloModule { }
