import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonfunc.service';
import { WebapiService } from 'src/app/services/webapi.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  Loginsubmitted: boolean;
  loginsuccess: boolean;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private API: WebapiService,
    public CF: CommonService
  ) {
    this.CF.generateTags({
      title: 'Urban Kisaan | Login',
      description: '',
      keywords: '',
      image: '',
      path: ''
    });
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginid: ['', [Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.CF.isBrowser) {
      const Host = window.location.hostname;
      if (Host === 'localhost') {
        const betalogin = { loginid: 'Praveen@sales', password: 'praveen@567' };
        const Sbetalogin = { loginid: 'store@begumpet', password: 'store@123' };
        const D = (environment.serviceUrl.includes('betaapi')) ? betalogin : { loginid: 'premgoud@ukstore', password: 'prem@909' };
        this.loginForm.patchValue(D)
      }
    }
  }
  OnSubmit() {
    this.Loginsubmitted = true;
    if (!this.loginForm.invalid) {
      this.loginsuccess = true;
      const D = this.loginForm.value;
      this.API.Login(D.loginid.toLowerCase(), D.password.toLowerCase()).then((r) => {
        this.loginsuccess = false;
        if (r) {
          if (r.status) {
            r.data.phonecall = (r.data.Producestoreid) ? false : true;            
            this.CF.LocalStorageSet(this.CF.Token, r.data);
            this.CF.GotoURL('/dashboard')
          } else {
            this.CF.SwalError("Error", r.data)
          }
        } else {
          this.CF.SwalError("Error", "Invalid credentials")
        }
      });
    }
  }

}
