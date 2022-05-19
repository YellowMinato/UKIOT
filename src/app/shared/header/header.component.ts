import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonfunc.service';
@Component({
  selector: 'com-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links = [
    { name: "Dashboard", url: '/dashboard' },
    // { name: "Sales", url: '/sales' },
    // { name: "Orders", url: '/orders' },
    // { name: "Stock", url: '/stock' },
    // { name: "Settlement", url: '/settlement' }
  ]
  clock: number;
  constructor(
    public CF: CommonService
  ) {
    setInterval(() => this.clock = Date.now(), 1);
  }
  ngOnInit(): void {  }
  toggleMenu() {
    this.CF.showMenu = !this.CF.showMenu;
    this.CF.toggleOverflow();
  }
  logout() {
    sessionStorage.removeItem('Farm');
    localStorage.removeItem(this.CF.Token);
    this.CF.GotoURL('/')
  }
}
