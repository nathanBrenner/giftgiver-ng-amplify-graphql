import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GiverFormComponent } from './giver-form/giver-form.component';
import { GiverListComponent } from './giver-list/giver-list.component';
import { GiversComponent } from './givers/givers.component';
import { GiverGroupsComponent } from './giver-groups/giver-groups.component';
import { GiverGroupListComponent } from './giver-group-list/giver-group-list.component';
import { GiverGroupComponent } from './giver-group/giver-group.component';
import { GiverGroupFormComponent } from './giver-group-form/giver-group-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GiverFormComponent,
    GiverListComponent,
    GiversComponent,
    GiverGroupsComponent,
    GiverGroupListComponent,
    GiverGroupComponent,
    GiverGroupFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
