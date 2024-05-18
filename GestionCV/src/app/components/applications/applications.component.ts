import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { CrdPostulationsService } from '../../services/crd-postulations.service';
import { CrudCandidatesService } from '../../services/crud-candidates.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { Postulations } from '../../interfaces/postulations';
import { Candidates } from '../../interfaces/candidates';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  constructor(
    private route : ActivatedRoute ,
    private router : Router,
    private authservice: AuthService,
    private crudJobOffersService : CrudJobOffersService,
    private crdPostulationsService : CrdPostulationsService,
    private crudCandidatesService : CrudCandidatesService,
  ){
  }

  id! : string;
  applications : any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id = params['id'];
        this.crudJobOffersService.getJobOfferById(this.id).subscribe(data=>{
          if (data.company_id!=this.authservice.userinfos.id){
            this.router.navigate(['/myoffers']);
          }
          else{
            this.getApplications()
          }
        })
    });
  }

  getApplications() {
    this.crdPostulationsService.getPostulationByOfferId(this.id).pipe(
      switchMap(postulations => {
        const candidateRequests = postulations.map((postulation: Postulations) =>
          this.crudCandidatesService.getCandidate(postulation.candidate_id).pipe(
            map(candidate => this.mergePostulationAndCandidate(postulation, candidate)),
          )
        );
        return forkJoin(candidateRequests)
      })
      
    ).subscribe(
      data => {
        this.applications = data;
      },
      error => {
        console.error('Error fetching postulation data:', error);
      }
    );
  }



  mergePostulationAndCandidate(postulation: Postulations, candidate: Candidates) {
    return {
      ...postulation,
      candidateFirstName: candidate.prenom,
      candidateLastName: candidate.nom,
      email: candidate.email,
      skills: candidate.skills
    };
  }



}
