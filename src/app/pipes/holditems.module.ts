import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolditemsPipe, HoldTimePipe } from './holditems.pipe';
import { PricePipe } from './price.pipe';



@NgModule({
  declarations: [HolditemsPipe, HoldTimePipe],
  imports: [
    CommonModule
  ],
  exports: [HolditemsPipe, HoldTimePipe],
  providers:[PricePipe, HoldTimePipe]
})
export class HolditemsModule { }
