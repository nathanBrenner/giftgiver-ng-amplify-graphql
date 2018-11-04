import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import components from './components';
import { AuthRoutingModule } from './auth-routing.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AmplifyAngularModule,
  ],
  providers: [
    AmplifyService,
  ]
})
export class AuthModule { }
