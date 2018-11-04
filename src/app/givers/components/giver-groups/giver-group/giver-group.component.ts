import { Giver } from './../../../models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gg-giver-group',
  templateUrl: './giver-group.component.html',
  styleUrls: ['./giver-group.component.scss']
})
export class GiverGroupComponent implements OnInit {
  @Input()
  group: Giver[];

  constructor() { }

  ngOnInit() {
  }

}
