import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'com-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  Year = new Date().getFullYear();
  clock: number;
  links = [
    { name: 'Dashboard', link: '/dashboard', class: 'dashboard' },
    { name: 'shop', link: '/shop', class: 'assessement' },
    { name: 'About', link: '/about', class: 'result' },
    { name: 'Contact', link: '/contact', class: 'message' },
  ]
  constructor() { 
    // setInterval(() => this.clock = Date.now(), 1);
   }

  ngOnInit(): void {
  }

}
