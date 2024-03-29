import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {MessageService} from 'primeng/api';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [MessageService]
})
export class CreateAccountComponent implements OnInit {

  registrationForm: FormGroup;
  userResponseCode: number;
  loading = false;
  isAuthenticated: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    public oktaAuth: OktaAuthService
  ) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      teamname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(form: FormGroup) {
    // triggers loading spinner
    this.loading = true;
    const req = form.value;

    // check username availability
    await this.userService.isUsernameAvailable(req.email).then(code => {
        this.userResponseCode = code;
      }
    ).catch(err => {
      console.log(err);
    });

    const teamResponseCode = await this.userService.isTeamnameAvailable(req.teamname);

    if (this.userResponseCode === 200 && teamResponseCode === 200) {
    } else if (this.userResponseCode !== 200) {
      this.showError('user');
    } else if (teamResponseCode !== 200) {
      this.showError('team');
    }
  }

  showError(type: string) {
    let err = 'none';
    switch (type) {
      case 'user':
        err = 'Specified username is unavailable';
        break;
      case 'team':
        err = 'Specified teamname is unavailable';
        break;
      case 'multiple':
        err = 'Username and teamname unavailable';
        break;
    }
    this.messageService.add({severity: 'error', summary: 'Invalid Selection', detail: err});
  }

  public createAccount() {
  }

  login() {
    this.oktaAuth.signInWithRedirect({
      originalUri: '/home'
    }).then(r => {
    });
  }
}

