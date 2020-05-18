import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardInfo } from '../_models/card-info';
import { EventEmitter } from '@angular/core';
import { CardService } from '../_service/card.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public cardService: CardService){}
  cardList: CardInfo[] ;
breakpoint;
onResize(event) {
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
}

ngOnInit()  {
  this.cardList = this.cardService.getCardList();
  this.cardService.setTitle(this.cardList[0].title);
  this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
 }

navigate(index: number){
  console.log(index);
  this.cardService.setSelectedIndex(index);
  this.cardService.setTitle(this.cardList[index].title);
}
}
