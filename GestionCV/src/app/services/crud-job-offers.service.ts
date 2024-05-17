import { Injectable } from '@angular/core';
import { JobOffers } from '../interfaces/job-offers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skills } from '../enums/skills';

@Injectable({
  providedIn: 'root'
})
export class CrudJobOffersService {
  private apiUrl: string;
  private limit: string;


  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/jobOffers';
    this.limit = '5';
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  createJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    // convert skills numbers to string
    const skillsStringArray = jobOffer.skills_required.map(skill => Skills[skill]);
    return this.http.post<JobOffers>(this.apiUrl,{
        id: this.generateRandomNumber(1, 200000).toString,
        "company_id": jobOffer.company_id,
        "title": jobOffer.title,
        "description": jobOffer.description,
        "skills_required": skillsStringArray
    });
  }

  getAllJobOffers(): Observable<JobOffers[]> {
    return this.http.get<JobOffers[]>(this.apiUrl);
  }

  getJobOfferById(id: string): Observable<JobOffers> {
    return this.http.get<JobOffers>(`${this.apiUrl}/${id}`);
  }
  getJobOfferByCompanyId(id: string): Observable<JobOffers> {
    return this.http.get<JobOffers>(`${this.apiUrl}?company_id=${id}`);
  }

  updateJobOffer(jobOffer: JobOffers): Observable<JobOffers> {
    return this.http.put<JobOffers>(`${this.apiUrl}/${jobOffer.id}`, jobOffer);
  }

  deleteJobOffer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }



}
