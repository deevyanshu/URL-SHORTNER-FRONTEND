import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UrlService } from '../../Service/url.service';
import { LoginRequest } from '../../Dto/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!: FormGroup; 
loginRequest:LoginRequest=new LoginRequest();

constructor(private fb:FormBuilder, private service:UrlService, private router:Router){}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    username: ['', Validators.required], // Username is required
    password: ['', [Validators.required, Validators.minLength(6)]] // Password is required and must be at least 6 characters
  });
}

onSubmit(){
  this.loginRequest.username = this.loginForm.value.username;
  this.loginRequest.password = this.loginForm.value.password;
  this.service.loginUser(this.loginRequest).subscribe(data=>{
    this.loginForm.reset();
    localStorage.setItem('token',data.token);
    this.service.loggedinSub.next(true); 
    this.router.navigate(['/dashboard']);
    console.log(data.token);
  },error=>{
    console.log(error);
  });
}

}
