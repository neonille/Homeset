import { Component, OnInit } from '@angular/core';
import { MeService, UserInfo } from '../me.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private meService: MeService) {}

  ngOnInit(): void {
    this.meService.getUserInfo();
  }

  get user(): UserInfo | null {
    return this.meService.userInfo;
  }
}
