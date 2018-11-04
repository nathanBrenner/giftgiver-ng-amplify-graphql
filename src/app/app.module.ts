import { QuestionService } from './services/question.service';
import { QuestionControlService } from './services/question-control.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

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

import { AppComponent } from './app.component';

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
    MatIconModule,
    AmplifyAngularModule,
  ],
  providers: [
    QuestionControlService,
    QuestionService,
    AmplifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
