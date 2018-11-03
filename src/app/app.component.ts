import { Component } from '@angular/core';
import { Giver } from './models';

@Component({
  selector: 'gg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  givers: Giver[] = [];
  groups: any[] = [];
  showGiverList = false;

  addGiver(giver: Giver) {
    this.givers = [...this.givers, giver];
  }

  saveGroup(data) {
    console.log(data);
  }

  toggleGiverList(isVisible: boolean) {
    this.showGiverList = !isVisible;
  }
}
