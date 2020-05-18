import { Component, OnChanges } from '@angular/core';
import {CardInfo} from './_models/card-info';
import { CardService } from './_service/card.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  title = 'admin-app';

  constructor(public cardService: CardService){

  }
  ngOnChanges(){
    console.log('changes in app.component');
  
  }
}
