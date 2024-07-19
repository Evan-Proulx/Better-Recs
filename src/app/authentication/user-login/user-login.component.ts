import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendService} from "../../backend-api/backend.service";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private backend: BackendService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const credentials = this.registerForm.value;
      this.loginUser(credentials);
    }
  }

  loginUser(credentials: any) {
    this.backend.loginUser(credentials).subscribe({
      next: (data) => {
        console.log(data)
        const token = data.data.token
        console.log(token);
      }, error: error => {
        console.error('Error authenticating user:', error);
      }
    });
  }
}
