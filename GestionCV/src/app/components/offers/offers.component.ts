import { Component } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';
import { AuthService } from '../../services/auth.service';
import { CrdPostulationsService } from '../../services/crd-postulations.service';
import { Postulations } from '../../interfaces/postulations';

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
  offers!: any[];
  isAuthenticated : boolean = false;
  ngOnInit(){
    this.fetchJobOffersAndCheckApplied();
    this.isAuthenticated=this.authService.isAuthenticated;
  }
  fetchJobOffersAndCheckApplied(): void {
    this.crudJobOffersService.getAllJobOffers().subscribe(offers => {
      this.offers = offers.map(offer => ({ ...offer, type: 'not applied' }));
      this.crdPostulationsService.getAllPostulations().subscribe(postulations => {
        // Check if each job offer is applied
        for (const offer of this.offers) {
          const applied = postulations.some((postulation: Postulations) => {
            if(this.isAuthenticated){
            return postulation.jobOffers_id === offer.id && postulation.candidate_id === this.authService.userinfos.id;
            }
            else return null
          });
          if (applied) {
            offer.type = 'applied';
          }
        }
      });
    });
  }

  apply(id : string){
    this.crdPostulationsService.createPostulation({
      id: "0",
      jobOffers_id: id,
      candidate_id: this.authService.userinfos.id,
      Date: new Date(),
    }).subscribe(data=>{
      this.fetchJobOffersAndCheckApplied();
    });
  }
    delete(id: string) {
      this.crdPostulationsService.deletePostulationByOffersAndCandidate(id,this.authService.userinfos.id).subscribe(data=>{
        this.fetchJobOffersAndCheckApplied();
      });
    }


}

