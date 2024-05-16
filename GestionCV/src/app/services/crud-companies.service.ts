import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Companies } from '../interfaces/companies';

@Injectable({
  providedIn: 'root'
})
export class CrudCompaniesService {
  private apiUrl: string;
  constructor(private http: HttpClient, private authservice: AuthService) {
    this.apiUrl = 'http://localhost:3000/companies';
  }

  getAllCompanies(): Observable<Companies>{
    return this.http.get<Companies>(`${this.apiUrl}`);
  }
  getCompaniesById(id: string): Observable<Companies> {
    return this.http.get<Companies>(`${this.apiUrl}/${id}`);
  }

}
