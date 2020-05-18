import { Component, OnInit , Input, OnChanges, OnDestroy, AfterViewInit} from '@angular/core';
import { CardInfo } from '../_models/card-info';
import { CardService } from '../_service/card.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,  OnDestroy{
  public title: Observable<string>;
  other: string;
  subscription: Subscription;
  
  constructor(public cardService: CardService) { 
    console.log('inside constructor fo navbar foo')
    this.subscription = this.cardService.selectedTitle.subscribe(change=> {
      this.other = change;
      console.log('inside subscription');
      console.log(this.other);
     });
  }

  ngOnInit(): void {
   this.subscription = this.cardService.selectedTitle.subscribe(change=> {
    this.other = change;
    console.log(this.other);
   });

   this.title = this.cardService.getSelectedTitle();
  }


  ngOnDestroy() {
    console.log('Clsing subscription')
    this.subscription.unsubscribe();
  }
}
