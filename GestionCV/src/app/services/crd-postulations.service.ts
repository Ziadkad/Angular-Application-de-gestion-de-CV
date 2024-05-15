import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postulations } from '../interfaces/postulations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrdPostulationsService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/postulations';
  }

  //getBycandidate_ID


  getByCandidateId(index:string):Observable<Postulations>{
        return this.http.get<Postulations>(`${this.apiUrl}?candidate_id=${index}`);
  }


  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createPostulation(postulation: Postulations): Observable<Postulations> {
    return this.http.post<Postulations>(
      this.apiUrl,
      {
        id: this.generateRandomNumber(1, 200000).toString,
        jobOffers_id: postulation.jobOffers_id,
        candidate_id: postulation.candidate_id,
        Date: postulation.Date,
      }
    );
  }

  getAllPostulations(): Observable<Postulations[]> {
    return this.http.get<Postulations[]>(this.apiUrl);
  }

  getPostulationById(id: string): Observable<Postulations> {
    return this.http.get<Postulations>(`${this.apiUrl}/${id}`);
  }

  deletePostulation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
