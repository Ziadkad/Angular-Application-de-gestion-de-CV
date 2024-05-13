import { Component, OnInit } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'] // Note the correct property name
})
export class SigninComponent {
    jobOffers: JobOffers[] = [];
    jobOffer : JobOffers = {
      id:3,
      company_id:3,
      description:"",
      title:"",
      skills_required: []
    };
    constructor(private crudJOService : CrudJobOffersService){}
    // ngOnInit(): void{
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.createJobOffer(this.jobOffer).subscribe(data => {
    //     console.log("********************************");
    //     console.log("createJobOffer")
    //     console.log(data);
    //   });
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("********************************");
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.deleteJobOffer(3).subscribe(data => {
    //     console.log("********************************");
    //     console.log("deleteJobOffer")
    //     console.log(data);
    //   });
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("********************************");
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.getJobOfferById(3).subscribe(data=>{
    //     console.log("********************************");
    //     console.log("getJobOfferById")
    //     console.log(data);
    //   })  

    // }
}  
