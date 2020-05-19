import { Component,OnChanges, ViewChild, AfterViewChecked, OnInit, AfterContentInit} from '@angular/core';

import { CardService } from '../_service/card.service';
import {ChangeDetectorRef} from '@angular/core';
import { AppComponent } from '../app.component';
import { HeaderService } from '../_service/header.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterContentInit, OnChanges, OnInit, AfterViewChecked{
  // public title: Observable<string>;
  // other: string;
  // subscription: Subscription;
  @ViewChild(AppComponent) root: AppComponent;
  monitorTitle: string;
  constructor(public cardService: CardService,
              private headService: HeaderService,
              public cdr: ChangeDetectorRef) { 
                this.monitorTitle = this.headService.title;
  }
  ngOnInit(){
    this.monitorTitle = this.headService.title;
  }
  ngAfterViewChecked(): void {
    //this.monitorTitle = this.headService.title;
   }
   ngAfterViewInit(){
     this.monitorTitle = this.headService.title;
     this.cdr.detectChanges();
   }
   ngOnChanges(){
     this.monitorTitle = this.headService.title;
     this.cdr.detectChanges();
   }
   ngAfterContentInit() {
     this.monitorTitle = this.headService.title;
     this.cdr.detectChanges();
   }
  


}
