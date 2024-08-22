import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendService} from "../../backend-api/backend.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  @Input() isNewUser?: boolean;

  emailUsed: boolean = false;

  constructor(private formBuilder: FormBuilder, private backend: BackendService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get password_confirmation(){
    return this.registerForm.get('password_confirmation');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      //create object with credentials
      const credentials = this.registerForm.value;
      this.createUser(credentials);
    }
  }

  toLogin() {
    this.router.navigate(['login']);
  }

  //register a new user and returns auth token
  createUser(credentials: any) {
    this.backend.createUser(credentials).subscribe({
      next: (data) => {
        console.log(data)
        //extract api-token and store in local storage
        const token = data.data.token
        localStorage.setItem('access_token', token);
        // Navigate to the main route
        this.router.navigate(['']);
      }, error: error => {
        console.error('Error registering user:', error);
        //sets error message on the email field
        this.emailUsed = true;
      }
    });
  }

}
