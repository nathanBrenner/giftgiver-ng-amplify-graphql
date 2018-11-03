import { QuestionService } from './services/question.service';
import { QuestionControlService } from './services/question-control.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import DynamicFormComponents from './dynamic-form';
import GiverGroupsComponents from './giver-groups';
import GiversComponents from './givers';

@NgModule({
  declarations: [
    AppComponent,
    ...DynamicFormComponents,
    ...GiverGroupsComponents,
    ...GiversComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [
    QuestionControlService,
    QuestionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
