import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonfunc.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public CF: CommonService
  ) { }

  ngOnInit(): void {
    this.CF.generateTags({
      title: 'Urban Kisaan | Page not found',
      description: '',
      keywords: '',
      image: '',
      path: '404'
    });
  }

}
