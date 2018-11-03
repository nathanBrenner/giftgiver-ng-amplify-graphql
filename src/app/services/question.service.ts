import { Giver } from './../models';
import { Injectable } from '@angular/core';
import { QuestionBase, CheckboxQuestion } from './question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() {}

  getQuestions(givers: Giver[]) {
    let order = 0;
    const giverQuestions: QuestionBase<any>[] = givers.map(giver => {
      order++;
      return new CheckboxQuestion({
        key: giver.id,
        label: giver.name,
        order: order,
        value: giver.id,
      });
    });

    return giverQuestions.sort((a, b) => a.order - b.order);
  }
}
