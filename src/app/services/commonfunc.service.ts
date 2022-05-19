import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Meta, Title } from '@angular/platform-browser';
import * as moment from "moment";
import Swal from "sweetalert2";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public sitepath = 'https://ukmqtt.meanhost.in'
  public isSpinnerVisible: boolean;
  public Token = 'urbankisaanPos';
  public isBrowser: boolean;
  public fixedHeader: boolean = false;
  public showMenu: boolean = false;
  private renderer: Renderer2;
  modalReference: any;
  public btnsuccess: boolean = false;


  public dtOptions = {
    scrollY: '45vh',
    scrollX: true,
    scrollCollapse: true,
    ordering: true,
    displayLength: 25,
    // dom: 'Bfrtip',
    dom: 'liBfrtp',
    buttons: ['copy', 'print', 'excel'],
    responsive: true,
    language: {
      search: '',
      searchPlaceholder: 'Search here',
    },
  }

  public SDDL_A = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  public FULLSCREEN = new BehaviorSubject<any>(false);
  isConnected = true;

  constructor(
    private meta: Meta,
    private title: Title,
    public router: Router,
    public rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: string,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastr: ToastrService,
    private connectionService: ConnectionService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
    config.backdrop = "static";
    config.keyboard = false;
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      this.toastr.clear();
      (isConnected) ? this.toastr.success('You are online', 'Hurray') : ''
    })
  }
  public generateTags(tags: any) {
    tags = {
      title: 'urbankisaan',
      description: 'urbankisaan',
      keywords: 'urbankisaan',
      image: 'http://business.urbankisaan.com/assets/images/png/logo.png',
      path: '',
      ...tags
    };
    this.title.setTitle(tags.title);
    this.meta.updateTag({ name: 'Description', content: tags.description });
    this.meta.updateTag({ name: 'Keywords', content: tags.keywords });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@urbankisaan' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });
    // this.meta.updateTag({ property: 'fb:app_id', content: '182752693091917' });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'og:site_name', content: 'urbankisaan' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:url', content: this.sitepath + '/' + tags.path });
  }
  public get user() {
    const TKN: any = localStorage.getItem(this.Token);
    return (TKN) ? JSON.parse(this.Decrypt(TKN, this.Token)) : '';
  }
  public get isLoggedin(): any {
    const TKN = localStorage.getItem(this.Token);
    return (TKN && TKN !== null) ? true : false;
  }
  public get isActivated(): any {
    const TKN = localStorage.getItem(this.Token);
    return (TKN && TKN !== null) ? (JSON.parse(this.Decrypt(TKN, this.Token)).ActiveStatus.toLowerCase() === 'no') ? false : true : false;
  }
  OpenPopup(content: any, selclass = "My_Popup", size = 'lg') {
    this.modalReference = this.modalService.open(content, { centered: true, windowClass: selclass, size });
  }
  CloseModal() {
    this.modalReference ? this.modalReference.close() : "";
  }
  public toggleOverflow() {
    if (this.isBrowser) {
      (this.showMenu) ? this.renderer.addClass(window.document.body, 'overflowx') : this.renderer.removeClass(window.document.body, 'overflowx');
      (this.showMenu) ? this.renderer.addClass(window.document.documentElement, 'overflowx') : this.renderer.removeClass(window.document.documentElement, 'overflowx');
    }
  }
  public NoSpace(event: any) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  public AlphabetsOnly(event: any) {
    const charCode = event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode === 8 ||
      charCode === 32
    ) {
      event.target.value = event.target.value.replace(
        /[^A-Za-z0-9-,.;'&/.() ]|^ /g,
        ""
      );
      return true;
    } else {
      return false;
    }
  }
  public numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  public numberWithDecimal(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
  public GotoURL(url: string) {
    this.router.navigate([url]);
  }
  public GotoURLParam(url: string) {
    this.router.navigateByUrl(url);
  }
  public Encrypt(o: any, salt: any) {
    o = JSON.stringify(o).split("");
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === "{") {
        o[i] = "}";
      } else if (o[i] === "}") {
        o[i] = "{";
      }
    }
    return btoa(encodeURI(salt + o.join("")));
  }
  public Decrypt(o: any, salt: any) {
    o = decodeURI(atob(o));
    if (salt && o.indexOf(salt) !== 0) {
      throw new Error("object cannot be decrypted");
    }
    o = o.substring(salt.length).split("");
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === "{") {
        o[i] = "}";
      } else if (o[i] === "}") {
        o[i] = "{";
      }
    }
    return JSON.parse(o.join(""));
  }
  public roundNumber(rnum: any, rlength: any = 0) {
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
  }
  public SwalSuccess(msg: string, heading = "Success!") {
    Swal.fire({
      title: heading,
      text: msg,
      icon: "success",
      confirmButtonColor: "#7e3f97",
    });
  }
  public SwalWarning(msg: any, heading = "Warning") {
    Swal.fire(msg, heading, "warning");
  }
  public SwalError(msg: any, heading = "Error") {
    Swal.fire(msg, heading, "error");
  }
  public Swalhtml(Heading: any, msg: any) {
    Swal.fire({
      title: Heading,
      html: msg,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
    });
  }
  ToastClear() {
    this.toastr.clear();
  }
  ToastSuccess(msg: any, heading = "Success") {
    this.toastr.success(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  ToastWarning(msg: any, heading = "Warning") {
    this.toastr.warning(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  ToastError(msg: any, heading = "Error") {
    this.toastr.error(msg, heading, {
      enableHtml: true,
      closeButton: true,
    });
  }
  public async LocalSgGet(name: string): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const user = JSON.parse(this.Decrypt(localStorage.getItem(name), name));
        resolve(user), reject
      });
    } catch (error) {
      console.log(error);
    }
  }
  public LocalStorageSet(name: string, data: any) {
    return localStorage.setItem(
      name,
      this.Encrypt(JSON.stringify(data), name)
    );
  }
  public LocalStorageGet(name: string) {
    return JSON.parse(this.Decrypt(localStorage.getItem(name), name));
  }
  public SessionStorageSet(name: string, data: any) {
    return sessionStorage.setItem(
      name,
      this.Encrypt(JSON.stringify(data), name)
    );
  }
  public SessionStorageGet(name: string) {
    const Data = sessionStorage.getItem(name);
    if (Data && Data !== null) {
      return JSON.parse(this.Decrypt(Data, name));
    }
  }
  public lastweek(date: any) {
    return moment(new Date(date)).add(-7, 'days').format('M-DD-YYYY');
  }
  public Day(date: any) {
    return moment(new Date(date)).format('DD');
  }
  public Month(date: any) {
    return moment(new Date(date)).format('MM');
  }
  public Year(date: any) {
    return moment(new Date(date)).format('YYYY');
  }
  public Time(date: any) {
    return moment(new Date(date)).format('hh:mm:ss');
  }
  public DashboardDate(date: any) {
    return moment(new Date(date)).format('DD-MMM-YYYY');
  }
  public OrdersDate(date: any) {
    return moment(new Date(date)).format('MM/DD/YYYY');
  }
  public loadRAutocomplete(file: any) {
    const node = document.createElement("script");
    node.src = `${file}`;
    node.type = "text/javascript";
    node.async = true;
    node.defer = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
}
