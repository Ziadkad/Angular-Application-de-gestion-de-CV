import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  public isAuthenticated: boolean = false;
  public mobile: boolean = false;
  public infos:any;
  public roles!:string;
  ngDoCheck(){
    this.infos=this.authService.userinfos;
    this.roles=this.authService.roles;
    this.isAuthenticated=this.authService.isAuthenticated;
    if(!this.isAuthenticated){
    this.mobile=false;
  }
  }
  signOut() {
    this.authService.logOut();
    this.router.navigate([''])
  }
  mobileFunc(){
    this.mobile = !this.mobile;
  }

}
