import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { QuestionControlService } from '../services/question-control.service';

import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
} from '@angular/material';
import DynamicFormComponents from '../dynamic-form';
import { GiversRoutingModule } from './givers-routing.module';
import GiversComponents from './components';

@NgModule({
  declarations: [
    ...GiversComponents, ...DynamicFormComponents
  ],
  imports: [
    CommonModule,
    GiversRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    QuestionControlService,
    QuestionService,
  ]
})
export class GiversModule { }
