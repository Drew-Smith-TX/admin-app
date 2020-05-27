import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_service/header.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private head: HeaderService) {
    this.head.setNextTitle('User Management');
   }

  ngOnInit(): void {
    this.head.setNextTitle('User Management');
  }

}
