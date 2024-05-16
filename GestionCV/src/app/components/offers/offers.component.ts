import { Component } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';
import { AuthService } from '../../services/auth.service';
import { CrdPostulationsService } from '../../services/crd-postulations.service';
import { Postulations } from '../../interfaces/postulations';
import { forkJoin, map, switchMap } from 'rxjs';
import { CrudCompaniesService } from '../../services/crud-companies.service';

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
    private crudCompaniesService: CrudCompaniesService,
  ){
  }
  offers!: any[];
  isAuthenticated : boolean = false;
  ngOnInit(){
    this.fetchJobOffersAndCheckApplied();
    this.isAuthenticated=this.authService.isAuthenticated;
  }
  fetchJobOffersAndCheckApplied(): void {
    this.crudJobOffersService.getAllJobOffers().pipe(
      switchMap(offers => {
        // For each offer, add a 'type' property indicating whether it's applied or not
        return forkJoin(
          offers.map(offer => {
            return this.crdPostulationsService.getAllPostulations().pipe(
              map(postulations => ({
                ...offer,
                type: postulations.some((postulation: Postulations) =>
                  this.isAuthenticated &&
                  postulation.jobOffers_id === offer.id &&
                  postulation.candidate_id === this.authService.userinfos.id
                ) ? 'applied' : 'not applied'
              }))
            );
          })
        );
      })
    ).subscribe(
      offers => {
        this.offers = offers;
      },
      error => {
        // Handle error
        console.error('Error fetching job offers:', error);
      }
    );
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

