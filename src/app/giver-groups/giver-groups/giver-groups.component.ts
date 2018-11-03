import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Giver } from '../../models';

@Component({
  selector: 'gg-giver-groups',
  templateUrl: './giver-groups.component.html',
  styleUrls: ['./giver-groups.component.scss']
})
export class GiverGroupsComponent implements OnInit {
  @Input()
  givers: Giver[];

  @Input()
  groups: any[];

  @Input()
  showGiverList: boolean;

  @Output()
  saveGroup = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
