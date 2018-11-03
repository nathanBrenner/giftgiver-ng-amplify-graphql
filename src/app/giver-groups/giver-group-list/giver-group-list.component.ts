import { Component, OnInit, Input } from '@angular/core';
import { Giver } from './../../models';

@Component({
  selector: 'gg-giver-group-list',
  templateUrl: './giver-group-list.component.html',
  styleUrls: ['./giver-group-list.component.scss']
})
export class GiverGroupListComponent implements OnInit {
  @Input()
  groups: Giver[];

  constructor() { }

  ngOnInit() {
  }

}
