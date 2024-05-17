import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable, tap } from 'rxjs';
import { Candidates } from '../interfaces/candidates';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudCandidatesService {

  private apiUrl: string;

  constructor(private http: HttpClient, private authservice: AuthService) {
    this.apiUrl = 'http://localhost:3000/candidates';
  }

  updateCandidateAndSession(candidate: Candidates): Observable<Candidates> {
    return this.updateCandidate(candidate).pipe(
      concatMap(updatedCandidate => this.authservice.updateCandidateSession(updatedCandidate))
    );
  }
  
  updateCandidate(candidate: Candidates): Observable<Candidates> {
    return this.http.put<Candidates>(`${this.apiUrl}/${candidate.id}`, candidate);
  }

  deleteCandidate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 
}
