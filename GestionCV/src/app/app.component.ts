import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestionCV';
  constructor(private auth : AuthService){}
  ngOnInit(){
    console.log(this.auth.logIn("info@abccorp.com","abc@123"))
  } 
}
