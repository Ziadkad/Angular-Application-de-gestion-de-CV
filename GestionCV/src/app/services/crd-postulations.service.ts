import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postulations } from '../interfaces/postulations';
import { catchError, concatMap, map, Observable } from 'rxjs';

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
    // Check if postulation already exists
    return this.http.get<Postulations[]>(`${this.apiUrl}?jobOffers_id=${postulation.jobOffers_id}&candidate_id=${postulation.candidate_id}`).pipe(
      map(postulations => {
        if (postulations.length > 0) {
          throw new Error('Postulation already exists');
        }
        // If postulation does not exist, proceed to create it
        return postulation;
      }),
      catchError(error => {
        throw error; // Rethrow error
      }),
      // If postulation does not exist, proceed to create it
      concatMap(() => {
        return this.http.post<Postulations>(
          this.apiUrl,
          {
            id: this.generateRandomNumber(1, 200000).toString(),
            jobOffers_id: postulation.jobOffers_id,
            candidate_id: postulation.candidate_id,
            Date: postulation.Date,
          }
        );
      })
    );
  }

  getAllPostulations(): Observable<Postulations[]> {
    return this.http.get<Postulations[]>(this.apiUrl);
  }

  getPostulationById(id: string): Observable<Postulations> {
    return this.http.get<Postulations>(`${this.apiUrl}/${id}`);
  }
  getPostulationByOffersAndCandidate(idOffer: String, idCandidate: string): Observable<Postulations> {
    return this.http.get<Postulations>(`${this.apiUrl}?jobOffers_id=${idOffer}&candidate_id=${idCandidate}`);
  }
  deletePostulation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  deletePostulationByOffersAndCandidate(idOffer: string, idCandidate: string): Observable<void> {

    return this.getPostulationByOffersAndCandidate(idOffer, idCandidate).pipe(
      concatMap((data: any) => this.deletePostulation(data[0].id))
    );
  }
}
