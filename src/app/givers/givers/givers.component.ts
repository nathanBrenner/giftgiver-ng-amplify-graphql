import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Giver } from '../../models';

@Component({
  selector: 'gg-givers',
  templateUrl: './givers.component.html',
  styleUrls: ['./givers.component.scss']
})
export class GiversComponent implements OnInit {
  @Input()
  givers: Giver[];

  @Input()
  showGiverList: boolean;

  @Output()
  saveGiver: EventEmitter<Giver> = new EventEmitter();

  @Output()
  toggleGiverList: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
