import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonfunc.service';
import { WebapiService } from 'src/app/services/webapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  wish = 'Good Morning';
  date = new Date();

  form: FormGroup;
  Submitted: boolean;

  bsRangeValue: Date;
  bsValue = new Date();
  Btnsuccess: boolean = false;
  Main_data: any=[];
  header: any;

  Farmer_IDS:any;
  Reading_Types: any;
  Device_IDS: any;
  farm_id: any;
  device_id: any;
  reading_type: any;
  from_Date: Date;
  To_Date: Date;
  NoOrders: boolean = false;
  NoData: boolean = false;

  constructor(
    public CF: CommonService,
    private fb: FormBuilder,
    private API: WebapiService
  ) {
    this.CF.generateTags({
      title: 'UrbanKisaan | Dashboard',
      description: '',
      keywords: '',
      image: '',
      path: 'dashboard',
    });
    if (this.CF.isBrowser) {
      const curHr = this.date.getHours();
      curHr < 12 ? (this.wish = 'Good Morning') : curHr < 16 ? (this.wish = 'Good Afternoon')  : (this.wish = 'Good Evening');
    }

      this.API.Token().then((r:any)=>{
       localStorage.setItem('Access_Token', r.accessToken)
       if(r) {
        this.Get_farmeId();
        this.Get_deviceId();
        this.Get_readingtypes();
       }
      })

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fromdate: [''],
      todate: [''],
      farmid: ['', Validators.required],
      deviceid: [''],
      readingtype: ['', Validators.required],
    });

    // this.API.Token().then((r: any) => {
    //   console.log(r.accessToken);
    //   localStorage.setItem('Access_Token', r.accessToken);
    //   if (r.accessToken) {
          // this.API.Get_Datareadings().then((r: any) => {
          //   console.log(r);
          //   if(r) {
          //     this.NoOrders = false;
          //     this.header = r.records[0] ? Object.keys(r.records[0]) : [];
          //     this.header=this.header.filter((o: any) =>  o !== 'sno');
          //     console.log(this.header)
          //       this.Main_data = r.records;
          //       console.log(this.Main_data)
          //   }
          // });
      // }
    // });
    // this.Get_TableData();
  }

  Get_TableData() {
    this.NoOrders = true;
    this.API.Get_Datareadings().then((r: any) => {
      console.log(r);
      if(r) {
        this.NoOrders = false;
        this.header = r.records[0] ? Object.keys(r.records[0]) : [];
        this.header=this.header.filter((o: any) =>  o !== 'sno');
        console.log(this.header)
          this.Main_data = r.records;
          console.log(this.Main_data)
      }
    });
  }

  Get_farmeId() {
    this.API.Get_Farmers().then((r: any) => {
      console.log(r);
      this.Farmer_IDS = r.records;
      this.Farmer_IDS.map((r: any) => { r.item_id = r.farmid, r.item_text = r.farmid });
    });
  }

  Get_deviceId() {
    this.API.Get_DeviceID().then((r: any) => {
      console.log(r);
      this.Device_IDS = r.records;
      this.Device_IDS.map((r: any) => { r.item_id = r.deviceid, r.item_text = r.deviceid });
    });
  }

  Get_readingtypes() {
    this.API.Get_ReadingTypes().then((r: any) => {
      console.log(r);
      this.Reading_Types = r.records;
      this.Reading_Types.map((r: any) => { r.item_id = r.readingtype, r.item_text = r.readingtype });
    });
  }

  onDateChange(e: Date) {
    console.log(e);
    this.from_Date = e;
  }

  onDateChange_to(e: Date) {
    console.log(e);
    this.To_Date = e;
  }

  onItemSelect(item: any) {
    console.log(item);
    this.farm_id = item.item_id;
  }

  onItemDeSelect(item: any) {
    console.log(item);
    console.log(this.farm_id);
    this.farm_id = ""
    console.log(this.farm_id);
  }

  onItemSelect_device(item: any) {
    console.log(item);
    this.device_id = item.item_id;
  }
  onItemDeSelect_device(item: any) {
    console.log(item);
    this.device_id = "";
  }

  onItemSelect_reading(item: any) {
    console.log(item);
    this.reading_type = item.item_id;
  }

  onItemDeSelect_reading(item: any) {
    console.log(item);
    this.reading_type = "";
  }

  Submit() {
    this.Submitted = true;
    if (!this.form.invalid) {
      this.Main_data = [];
      this.NoOrders = true;
      this.Btnsuccess = true;
      const body = {
        fromDate: this.from_Date,
        toDate: this.To_Date,
        deviceid: this.device_id,
        readingtype: this.reading_type,
        farmid: this.farm_id.toString(),
        limitRows: "999",
      };
      console.log(body);
      // return
      this.API.Date_Time_Filter(body).then((r: any) => {
        console.log(r);
        this.Btnsuccess = false;
        this.NoOrders = false;
        this.header = r.resultTable1[0] ? Object.keys(r.resultTable1[0]) : [];
        this.header=this.header.filter((o: any) =>  o !== 'sno');
          console.log(this.header)
          this.Main_data = r.resultTable1;
          console.log(this.Main_data)
          if(this.Main_data.length === 0) {
            this.NoData = true;
          }
      });
    }
  }

}
