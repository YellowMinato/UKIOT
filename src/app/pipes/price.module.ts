import { NgModule } from "@angular/core";
import { PricePipe } from "./price.pipe";
 
@NgModule({
    declarations: [PricePipe],
    exports: [PricePipe],
    providers:[PricePipe]
  })
export class PricePipeModule { }