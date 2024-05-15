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


  constructor(private crudCandidates: CrudCandidatesService, private authservice: AuthService){}


ngOnInit(): void {
  this.crudCandidates.updateCandidateAndSession( {
    "id": 1,
    "nom": "hhhhhhhhhhhh",
    "prenom": "hhhhhhhhhhhhhhhhhhhh",
    "datenaissance": new Date(),
    "email": "hh@hh",
    "password": "hh",
    "cv": "https://example.com/john_smith_cv.pdf",
    "skills": [
      Skills.AI,
      Skills.API_DOCUMENTATION,
      Skills.CLOUD_COMPUTING
    ],
    "role": Roles.CANDIDATE
  },).subscribe(data=>console.log(data))
}

  
  // postulation:Postulations =  {
  //   "jobOffers_id": "1",
  //   "candidate_id": "12345",
  //   "Date": new Date(),
  //   "id": "4a26"
  // };

  // offer:JobOffers = {
  //   "id": "1",
  //   "company_id": "ABC123",
  //   "title": "Software Engineer",
  //   "description": "Join our team to develop cutting-edge software solutions.",
  //   "skills_required": [
  //     Skills.AI, 
  //     Skills.API_DOCUMENTATION,
  //     Skills.BIG_DATA   
  //   ]
  // }

  // constructor(private crdPostulation:CrdPostulationsService, private crudjobOffer : CrudJobOffersService){}


  // ngOnInit(): void {
  //   // this.crdPostulation.getAllPostulations().subscribe(data=>{
  //   //     console.log(data);
  //   // })
  //   // this.crdPostulation.createPostulation(this.postulation).subscribe(data=>{
  //   //   console.log(data)
  //   // });
  //   // this.crdPostulation.getAllPostulations().subscribe(data=>{
  //   //   console.log(data);
  //   // })

  //   // this.crdPostulation.getPostulationById("4eaa").subscribe(data=>console.log(data));
  //   // this.crdPostulation.deletePostulation("4eaa").subscribe(data=>console.log(data));
  //   // this.crdPostulation.getPostulationById("4eaa").subscribe(data=>console.log(data));



  //   this.crudjobOffer.getAllJobOffers().subscribe(data=>{
  //       console.log(data);
  //   })
  //   this.crudjobOffer.createJobOffer(this.offer).subscribe(data=>{
  //     console.log(data)
  //   });
  //   this.crudjobOffer.getAllJobOffers().subscribe(data=>{
  //     console.log(data);
  //   })

  //   // this.crudjobOffer.getJobOfferById("4eaa").subscribe(data=>console.log(data));
  //   // this.crudjobOffer.deleteJobOffer("4eaa").subscribe(data=>console.log(data));
  //   // this.crudjobOffer.getJobOfferById("4eaa").subscribe(data=>console.log(data));

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

