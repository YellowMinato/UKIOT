import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonService } from './services/commonfunc.service';
import { WebapiService } from './services/webapi.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public CF: CommonService,
    private API: WebapiService
  ) {
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.CF.showMenu = false;
        this.CF.toggleOverflow();
      }
    }, () => { this.CF.showMenu = false; });
    this.token();
  }

  ngOnInit() {
    window.addEventListener("keyup", disableF11);
    window.addEventListener("keydown", disableF11);
    window.addEventListener("keypress", disableF11);
    function disableF11(e: any) {
      if ((e.which || e.keyCode) == 122 || (e.which || e.keyCode) == 27) {
        e.preventDefault();
        return false;
      };
    };
  }

  token() {
    this.API.Token().then((r:any)=>{
     localStorage.setItem('Access_Token', r.accessToken)
    })
  }

}
