import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../Dto/register-request';
import { UrlService } from '../../Service/url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationForm!: FormGroup; // Declare registrationForm as a FormGroup
  submitted = false;
  regiterRequest:RegisterRequest=new RegisterRequest();
  subscription: Subscription = new Subscription;

  constructor(private fb: FormBuilder, private service:UrlService, private router:Router) { } 

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required], // Username is required
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email format
      password: ['', [Validators.required, Validators.minLength(6)]] // Password is required and must be at least 6 characters
    });
  }

  onSubmit(){
    
    this.regiterRequest.username = this.registrationForm.value.username;
    this.regiterRequest.email = this.registrationForm.value.email;
    this.regiterRequest.password = this.registrationForm.value.password;
    this.subscription =this.service.registerUser(this.regiterRequest).subscribe(data=>{
      this.registrationForm.reset(); 
      alert('User Registered Successfully!')
      this.router.navigate(['/login']); 
    },error=>{
      console.log(error);
    })
    
  }

  ngOnDestroy(): void {
     // 
     this.subscription.unsubscribe(); 
  }
}
