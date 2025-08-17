import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)]],
    });
  }
  onRegister(): void {
  if (this.signupForm.invalid) {
    alert('Please fill all fields.');
    return;
  }

  const payload = {
    name: this.signupForm.value.name,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password
  };

  this.authService.registerWithImage(payload).subscribe({
    next: res => console.log(res),
    error: err => console.error(err)
  });
}

  // onRegister(): void {
  //   if (this.signupForm.invalid) {
  //     alert('Please fill all fields and select a profile image.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('name',this.signupForm.value.name);
  //   formData.append('email',this.signupForm.value.email);
  //   formData.append('password',this.signupForm.value.password);
  //   console.log(formData);

  //   this.authService.registerWithImage(formData).subscribe(data=>{
  //     console.log(data.message);
  //     alert('Registration successful!');
  //     this.router.navigate(['/login']);},
  //     (err:any) => {
  //       alert(err?.error?.message || 'Registration failed');
  //     })
  // }
}
