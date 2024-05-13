import { Injectable } from '@angular/core';
import { JobOffers } from '../interfaces/job-offers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudJobOffersService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/jobOffers';
  }

  createJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    return this.http.post<JobOffers>(this.apiUrl, jobOffer);
  }

  getAllJobOffers(): Observable<JobOffers[]> {
    return this.http.get<JobOffers[]>(this.apiUrl);
  }

  getJobOfferById(id: number): Observable<JobOffers> {
    return this.http.get<JobOffers>(`${this.apiUrl}/${id}`);
  }

  updateJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    return this.http.put<JobOffers>(`${this.apiUrl}/${jobOffer.id}`, jobOffer);
  }

  deleteJobOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
