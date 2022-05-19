import { Component, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common'; 
import { CommonService } from '../services/commonfunc.service';
@Component({
  selector: 'app-spinner',
  template: `<div class="loader" *ngIf="CF.isSpinnerVisible">  <div><i class="Favicon"></i></div></div>`,
  encapsulation: ViewEncapsulation.None
})
export class PreloaderComponent implements OnDestroy {
  constructor(
    private router: Router,
    public CF: CommonService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.CF.isSpinnerVisible =  true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.CF.isSpinnerVisible = false;
      }
    }, () => { this.CF.isSpinnerVisible = false; });
  }
  ngOnDestroy(): void { this.CF.isSpinnerVisible = false; }
}
