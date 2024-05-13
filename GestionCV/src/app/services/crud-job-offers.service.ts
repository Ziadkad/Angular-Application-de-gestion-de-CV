import { Injectable } from '@angular/core';
import { JobOffers } from '../interfaces/job-offers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudJobOffersService {

  constructor(private http: HttpClient) { }

  createJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    return this.http.post<JobOffers>('http://localhost:3000/jobOffers', jobOffer);
  }

  getAllJobOffers(): Observable<JobOffers[]> {
    return this.http.get<JobOffers[]>('http://localhost:3000/jobOffers');
  }

  getJobOfferById(id: string): Observable<JobOffers> {
    return this.http.get<JobOffers>('http://localhost:3000/jobOffers/' + id);
  }

  updateJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    return this.http.put<JobOffers>('http://localhost:3000/jobOffers/' + jobOffer.id, jobOffer);
  }

  deleteJobOffer(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/jobOffers/' + id);
  }
}
