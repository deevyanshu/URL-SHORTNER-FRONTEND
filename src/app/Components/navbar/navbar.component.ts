import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UrlService } from '../../Service/url.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
isOpen: boolean = true;
session:boolean=true;
isLoggedOut!:boolean;
loggedIn!:boolean;

constructor(private router:Router,private service:UrlService) { 

}

ngOnInit(): void {
  this.isLoggedOut = !this.service.isUserLoggedIn();
  this.service.loggedinSub.subscribe((data:boolean) => {
    this.isLoggedOut = !data;
    this.loggedIn = data;
  });
  this.loggedIn=this.service.isUserLoggedIn();
}

ngAfterViewInit(): void {
  
}


  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.session = !this.session;
  }

  registerPage(){
    this.router.navigate(['/register']);
  }

  logout(){
    this.service.logout();
    this.router.navigate(['/landingpage']);
  }

}
