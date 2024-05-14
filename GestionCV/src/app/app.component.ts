import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Roles } from './enums/roles';
import { Companies } from './interfaces/companies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestionCV';
  company:Companies = {
    id: 1,
    nom: "string",
    email: "string",
    password: "string",
    capital: 100000000,
    role : Roles.COMPANY,
  }
  constructor(private auth : AuthService){}
  ngOnInit(){
    console.log("sahdsadasd")

    // this.auth.signUpAsCandidate(
    //   {
    //     id: 0,
    //     nom: "Doe",
    //     prenom: "John",
    //     datenaissance: new Date(1990, 5, 15),
    //     email: "john.doe@example.com",
    //     password: "password123",
    //     cv: "",
    //     skills: [],
    //     role: Roles.CANDIDATE
    // })
    this.auth.signUpAsCompany(this.company).subscribe(data=>{
      console.log(data);
    })
  }
}
