import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gg-giver-group-list',
  templateUrl: './giver-group-list.component.html',
  styleUrls: ['./giver-group-list.component.scss']
})
export class GiverGroupListComponent implements OnInit {
  @Input()
  groups;

  constructor() { }

  ngOnInit() {
  }

}
