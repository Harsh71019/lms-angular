import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { AuthenticationService } from '../_service/authentication.service';
import IUser from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthenticationService) {}
  inSubmission = false;

  name = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  dob = new FormControl('', Validators.required);
  dateOfJoining = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  designation = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      mobile: this.mobile,
      dob: this.dob,
      dateOfJoining: this.dateOfJoining,
      location: this.location,
      designation: this.designation,
      department: this.department,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  register() {
    console.log(this.registerForm.value);
    this.auth.register(this.registerForm.value as IUser);
  }
}
