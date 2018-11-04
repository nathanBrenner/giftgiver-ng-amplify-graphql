import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { Giver } from '../../../models';

@Component({
  selector: 'gg-giver-group-form',
  templateUrl: './giver-group-form.component.html',
  styleUrls: ['./giver-group-form.component.scss']
})
export class GiverGroupFormComponent implements OnChanges {
  @Input()
  givers: Giver[] = [];

  @Output()
  saveGroup = new EventEmitter();

  questions: any[];

  constructor(private questionService: QuestionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.givers.length > 0) {
      this.questions = this.questionService.getQuestions(this.givers);
    }
  }

  save(payload) {
    payload.preventDefault
      ? payload.preventDefault()
      : this.saveGroup.emit(Object.keys(payload).filter(id => Boolean(payload[id])));
  }

}
