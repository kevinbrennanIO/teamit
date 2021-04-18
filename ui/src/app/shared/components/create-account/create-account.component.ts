import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {IUser, User} from '../../models/IUser';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  registrationForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  onSubmit(form: FormGroup) {
    // triggers loading spinner
    this.loading = true;

    // check if username is available
    const user = new User(form.value.email);
    const responseCode = dathis.userService.isUsernameAvailable(user);
    if (responseCode === 200) {
      console.log('USER IS AVAILABLE');
      // create firestore user
      //   this.us.createUser(
      //     form.value.firstname,
      //     form.value.lastname,
      //     form.value.email
      //   );
    } else {
      console.log('NOT AVAILABLE');
    }
  }


  // console.log('Valid?', form.valid); // true or false
  // console.log('Firstname', form.value.firstname);
  // console.log('Lastname', form.value.lastname);
  // console.log('Email', form.value.email);
  // console.log('Password', form.value.password);


  public createAccount() {

  }
}
