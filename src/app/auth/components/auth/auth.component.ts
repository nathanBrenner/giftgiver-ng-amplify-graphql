import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'gg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public amplifyService: AmplifyService, private router: Router) { }

  ngOnInit() {
    this.amplifyService.authStateChange$
        .subscribe(authState => {
          if (authState.state === 'signedIn') {
            this.router.navigate(['/givers']);
          }
        });
  }

}
