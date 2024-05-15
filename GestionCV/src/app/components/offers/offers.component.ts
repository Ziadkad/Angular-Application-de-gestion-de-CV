import { Component } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';
import { AuthService } from '../../services/auth.service';
import { CrdPostulationsService } from '../../services/crd-postulations.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  constructor( 
    private crudJobOffersService : CrudJobOffersService,
    private authService: AuthService,
    private crdPostulationsService : CrdPostulationsService,
  ){
  }
  offers!: JobOffers[];
  isAuthenticated : boolean = false;
  ngOnInit(){
    this.crudJobOffersService.getAllJobOffers().subscribe(data=>this.offers=data);
    this.isAuthenticated=this.authService.isAuthenticated;
  }
  apply(id : string){
    this.crdPostulationsService.createPostulation({
      id: "0",
      jobOffers_id: id,
      candidate_id: this.authService.userinfos.id,
      Date: new Date(),
    }).subscribe(data=>console.log(data));
  }
}
