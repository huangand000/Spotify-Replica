import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service'
import { ActivatedRoute , Router, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  loginfo;
  errors;
  regErrors;
  random;
  constructor(private _reviewerService: ReviewerService, private router: Router) { 
    this.user = {first_name: '', last_name: '', email: '', password: '', passwordConfirm: ''}
    this.loginfo = {email: '', password: ''}
  }

  ngOnInit() {
  }

  login() {
    let observable = this._reviewerService.loginUser(this.loginfo);
    observable.subscribe(data => {
      if (data['error'] == undefined) {
        console.log(data)
        this.router.navigate(['/dashboard'])
      } else {
        console.log(data)
        this.errors = "Invalid Credentials"
        // this.errors = data['error']
        // for (var error in data['error']['errors']) {
        //   console.log(data['error']['errors'][error]['message']);
        // }
      }
    })
  }

  register() {
    let observable = this._reviewerService.registerUser(this.user);
    observable.subscribe(data => {
      if (data['error'] == undefined) {
        console.log(data)
        this.router.navigate(['/dashboard'])
      } else {
        this.regErrors = data['error']
        if(typeof data['error'] == "object") {
          for (var error in data['error']['errors']) {
            this.regErrors = data['error']['errors'][error]['message'];
          }
        }
      }
    })
  }
}
