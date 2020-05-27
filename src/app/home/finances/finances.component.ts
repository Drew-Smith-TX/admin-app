import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_service/header.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  constructor(private head: HeaderService) {
    this.head.setNextTitle('Finance Management');
   }

  ngOnInit(): void {
  }

}
