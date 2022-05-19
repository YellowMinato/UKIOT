import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs/internal/observable/of';
import { CommonService } from './commonfunc.service';
import { WindowRef } from './WindowRef';
import { tap } from 'rxjs/internal/operators/tap';
@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  WebApi = environment.serviceUrl;
  rzpay: any;
  constructor(
    public CF: CommonService,
    private winRef: WindowRef,
    public ngZone: NgZone,
    public Http: HttpClient
  ) {
    if (this.CF.isBrowser) {
      const URL = window.location.href;
      URL.includes('beta') ? this.WebApi = environment.betaserviceUrl : environment.serviceUrl
    }
  }


  public async Token(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const body = {
          "username": "mqtt_uk",
          "password": "mqtt_uk123"
        }
        const url = `${this.WebApi}/Token`;
        return this.Http.post<any>(url, body).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async Get_Datareadings(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.WebApi}/Datareadings?page=1&itemsPerPage=100`;
        return this.Http.get<any>(url).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async Get_Farmers(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.WebApi}/Datareadings/FarmId?page=1&itemsPerPage=100`;
        return this.Http.get<any>(url).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async Get_DeviceID(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.WebApi}/Datareadings/DeviceID?page=1&itemsPerPage=100`;
        return this.Http.get<any>(url).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async Get_ReadingTypes(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.WebApi}/Datareadings/ReadingType?page=1&itemsPerPage=100`;
        return this.Http.get<any>(url).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async Date_Time_Filter(body:any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.WebApi}/SP/DateTimeFiltering`;
        return this.Http.post<any>(url, body).pipe(
          tap(d=> console.log(d)),
          map((d: any) => (d.code === 1) ? d.document : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public Login(Email: any, Password: any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const body = { Condition: "FarmDelBoyUser_Login", Email, Password }
        const url = `${this.WebApi}/DeliveryTracker/farmDelBoy_Login`;
        return this.Http.post<any>(url, body).pipe(
          map((d: any) => (d.Status_cd === '1') ? { status: true, data: d.ds.Table[0] } : (d.Status_cd === '0') ? { status: false, data: d.ds.Table[0].OUTPUT } : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public CheckGst(gst: any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `https://dev.urbankisaan.com/api/checkgst.php`;
        return this.Http.post<any>(url, { gst }).pipe(
          map((d: any) => (d.Status_cd === '1') ? { addr: d.Address, name: d.Name } : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }


}
