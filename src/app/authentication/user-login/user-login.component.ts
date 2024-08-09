import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendService} from "../../backend-api/backend.service";
import {Router} from "@angular/router";

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
  constructor(private formBuilder: FormBuilder, private backend: BackendService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      //create object with credentials
      const credentials = this.registerForm.value;
      this.loginUser(credentials);
    }
  }

  toRegister(){
    this.router.navigate(['register']);
  }

  //authenticate user and returns auth token
  loginUser(credentials: any) {
    this.backend.loginUser(credentials).subscribe({
      next: (data) => {
        console.log(data)
        //extract api-token and store in local storage
        const token = data.data.token
        localStorage.setItem('access_token', token);
        // Navigate to the main route
        this.router.navigate(['']);
      }, error: error => {
        console.error('Error authenticating user:', error);
      }
    });
  }
}
