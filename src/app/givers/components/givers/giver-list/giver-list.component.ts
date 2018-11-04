import { Component, OnInit, Input } from '@angular/core';
import { Giver } from '../../../models';

@Component({
  selector: 'gg-giver-list',
  templateUrl: './giver-list.component.html',
  styleUrls: ['./giver-list.component.scss']
})
export class GiverListComponent implements OnInit {
  @Input()
  givers: Giver[];

  constructor() { }

  ngOnInit() {
  }

}
