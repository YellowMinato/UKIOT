import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonfunc.service';
import { WebapiService } from 'src/app/services/webapi.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  GSTForm: FormGroup;
  GSTsubmitted: boolean;
  GSTsuccess: boolean;
  ValidGst: boolean = false;
  RegisterForm: FormGroup;
  Registersubmitted: boolean;
  Registersuccess: boolean;
  hide: boolean = true;
  chide: boolean = true;
  address:any;
  constructor(
    private fb: FormBuilder,
    private API: WebapiService,
    public CF: CommonService
  ) {
    this.CF.generateTags({
      title: 'Urban Kisaan - Produce | Register',
      description: '',
      keywords: '',
      image: '',
      path: 'register'
    });
  }
  ngOnInit(): void {
    this.GSTForm = this.fb.group({
      gst: ['', [Validators.required, Validators.minLength(15)]],
    });
    this.RegisterForm = this.fb.group({
      name: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('cpassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }
  get GSTNumber() {
    return this.GSTForm.get('gst').value
  }
  OnGstSubmit() {
    this.GSTsubmitted = true;
    if (!this.GSTForm.invalid) {
      this.GSTsuccess = true;
      this.API.CheckGst(this.GSTNumber).then(r => {
        this.address = r;
        this.RegisterForm.patchValue({name: r.name})
        this.GSTsuccess = false;
        (r) ? this.ValidGst = true : this.CF.SwalError('Error', 'Invalid GSTIN / UID');
      })
    }
  }
  OnSubmit() {
    const D = this.RegisterForm.value;
    this.Registersubmitted = true;
    if (!this.RegisterForm.invalid) {
      this.Registersuccess = true;
      // this.API.Register(D.name, D.email, D.mobile, this.GSTNumber, D.password, JSON.stringify(this.address.addr)).then((r) => {
      //   this.Registersuccess = false;
      //   if(r){
      //     if(r.status){
      //       this.CF.LocalStorageSet(this.CF.Token, r.data);
      //       this.CF.GotoURL('/dashboard')
      //     } else {
      //       this.CF.SwalError("Error", r.data)
      //     }
      //   } else {
      //     this.CF.SwalError("Error", "Invalid credentials")
      //   }
      // });
    }
  }
}
