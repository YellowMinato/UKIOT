import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CommonService } from '../services/commonfunc.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, AfterViewInit, OnDestroy {
  private UnsubscribeAll = new Subject();
  @ViewChild("Fullscreen", { static: false }) Fullscreen: ElementRef;
  FS: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    public CF: CommonService) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    // if (this.CF.isBrowser) {
    //   this.CF.FULLSCREEN
    //     .pipe(takeUntil(this.UnsubscribeAll))
    //     .subscribe(r => (r) ? this.openFullscreen() : this.closeFullscreen())
    // }
  }
  openFullscreen() {
    this.FS = true;
    const elem = this.Fullscreen.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  closeFullscreen() {
    if (this.FS) {
      this.FS = false;
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }

  }

  // @HostListener('document:fullscreenchange', ['$event'])
  // @HostListener('document:webkitfullscreenchange', ['$event'])
  // @HostListener('document:mozfullscreenchange', ['$event'])
  // @HostListener('document:MSFullscreenChange', ['$event'])
  // fullscreenmode(evt: Event) {
  //   // this.FS = (document.fullscreenElement) ? true : false; 
  // }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.CF.fixedHeader = window.scrollY > 100;
  }
  closeMenu() {
    this.CF.showMenu = false;
    this.CF.toggleOverflow();
  }

  ngOnDestroy(): void {
    this.UnsubscribeAll.next();
    this.UnsubscribeAll.complete();
  }
}
