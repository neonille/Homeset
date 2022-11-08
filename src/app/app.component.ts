import { Component } from '@angular/core';
import { MeService, UserInfo } from './me.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Homeset';
  mm: boolean = this.showMainMenu;
  constructor(private meService: MeService) {}

  get showMainMenu() {
    return !!this.meService.userInfo;
  }
}
