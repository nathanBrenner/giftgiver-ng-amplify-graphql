import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { Giver, GiverGroup } from '../../../models';

@Component({
  selector: 'gg-giver-group-form',
  templateUrl: './giver-group-form.component.html',
  styleUrls: ['./giver-group-form.component.scss']
})
export class GiverGroupFormComponent implements OnChanges {
  @Input()
  givers: Giver[] = [];

  @Input()
  selectedGiverGroup: GiverGroup;

  @Output()
  saveGroup: EventEmitter<{name: string, givers: string[]}> = new EventEmitter();

  @Output()
  updateGiverGroup: EventEmitter<{name: string, id: string, givers: string[]}> = new EventEmitter();

  questions: any[];

  constructor(private questionService: QuestionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.givers.length > 0) {
      this.questions = this.questionService.getGiverGroupQuestions(this.givers);
    }
    if (this.selectedGiverGroup) {
      this.questions = this.questionService.getGiverGroupQuestions(this.selectedGiverGroup);
    }
  }

  save(payload): void {
    if (payload.preventDefault) {
      payload.preventDefault();
    } else {
      const givers = Object.keys(payload).filter(prop => prop !== 'name').filter(id => Boolean(payload[id]));
      this.selectedGiverGroup
        ? this.updateGiverGroup.emit({ id: this.selectedGiverGroup.id, name: payload.name, givers})
        : this.saveGroup.emit({ name: payload.name, givers });
    }
    this.questions = undefined;
  }

}
