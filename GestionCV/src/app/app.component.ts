import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Roles } from './enums/roles';
import { Companies } from './interfaces/companies';
import { Postulations } from './interfaces/postulations';
import { CrdPostulationsService } from './services/crd-postulations.service';
import { JobOffers } from './interfaces/job-offers';
import { Skills } from './enums/skills';
import { CrudJobOffersService } from './services/crud-job-offers.service';
import { CrudCandidatesService } from './services/crud-candidates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {


  constructor(private crudJobOffersService : CrudJobOffersService, private authservice: AuthService){}


ngOnInit(): void {
}


}






















  // title = 'GestionCV';
  // company:Companies = {
  //   id: 1,
  //   nom: "string",
  //   email: "string",
  //   password: "string",
  //   capital: 100000000,
  //   role : Roles.COMPANY,
  // }
  // constructor(private auth : AuthService){}
  // ngOnInit(){
  //   // console.log("sahdsadasd")

  //   // this.auth.signUpAsCandidate(
  //   //   {
  //   //     id: 0,
  //   //     nom: "Doe",
  //   //     prenom: "John",
  //   //     datenaissance: new Date(1990, 5, 15),
  //   //     email: "john.doe@example.com",
  //   //     password: "password123",
  //   //     cv: "",
  //   //     skills: [],
  //   //     role: Roles.CANDIDATE
  //   // })
  //   // this.auth.signUpAsCompany(this.company).subscribe(data=>{
  //   //   console.log(data);
  //   // })
  // }

