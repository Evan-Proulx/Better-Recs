import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendService} from "../../backend-api/backend.service";
import {NgIf} from "@angular/common";

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

  constructor(private formBuilder: FormBuilder, private backend: BackendService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const credentials = this.registerForm.value;
      this.createUser(credentials);
    }
  }


  createUser(credentials: any) {
    this.backend.createUser(credentials).subscribe({
      next: (data) => {
        console.log(data)
        const token = data.data.token
        console.log(token);
      }, error: error => {
        console.error('Error registering user:', error);
      }
    });
  }

}
