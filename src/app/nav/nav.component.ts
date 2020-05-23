import { Component,OnChanges, ViewChild, AfterViewChecked, OnInit, AfterContentInit} from '@angular/core';

import { CardService } from '../_service/card.service';
import {ChangeDetectorRef} from '@angular/core';
import { AppComponent } from '../app.component';
import { HeaderService } from '../_service/header.service';
import { Observable } from 'rxjs/internal/Observable';

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
  titleObservable: Observable<string>;
  constructor(public cardService: CardService,
              private headService: HeaderService,
              public cdr: ChangeDetectorRef) { 
               
  }
  ngOnInit(){
   this.titleObservable = this.headService.titleSubject.asObservable();
   this.titleObservable.subscribe((title) =>{
     this.monitorTitle = title;
     console.log('Title set')
     console.log(this.monitorTitle);
   })
  }
  ngAfterViewChecked(): void {
    
   }
   ngAfterViewInit(){
     
   }
   ngOnChanges(){
    
   }
   ngAfterContentInit() {
     
   }
  


}
