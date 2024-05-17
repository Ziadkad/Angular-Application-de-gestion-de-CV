import { Component } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrl: './my-offers.component.css'
})
export class MyOffersComponent {
  offers!: any;
  constructor(
    private crudJobOffersService : CrudJobOffersService,
    private authService : AuthService
  ){ }

  ngOnInit(){
    this.fetchJobOffersByCompany();
  }

  fetchJobOffersByCompany(){
    this.crudJobOffersService.getJobOfferByCompanyId(this.authService.userinfos.id).subscribe(data=>{
      this.offers = data;
    })
  }

  deleteOffer(id : string){
    this.crudJobOffersService.deleteJobOffer(id).subscribe(()=>{
      this.fetchJobOffersByCompany();
    });
  }

}
