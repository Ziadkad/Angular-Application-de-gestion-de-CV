import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidates } from '../interfaces/candidates';
import { Companies } from '../interfaces/companies';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'userSession';
  private apiUrl ='http://localhost:3000'
  constructor(private http: HttpClient) {
    this.loadSessionFromLocalStorage(); 
  }
  getAllCandidates(): Observable<any>{
    return this.http.get(`${this.apiUrl}/candidates`);
  }
  getAllCompanies(): Observable<any>{
    return this.http.get(`${this.apiUrl}/companies`);
  }
  private candidates : Candidates[] = []
  private companies : Companies[] = []

  public userinfos: any;
  public isAuthenticated: boolean = false;
  public roles: string = "";

  logIn(email:string,password:string):boolean{
    this.getAllCandidates().subscribe(data =>{
      this.candidates=data;
      
    })
    this.getAllCompanies().subscribe(data =>{
      this.companies=data;
    })
    console.log(this.candidates,this.companies)
    for (const item of this.candidates) {
      if ((email === item.email) && (password === item.password)) {
        this.changeVariables(item);
        this.saveSessionToLocalStorage();
        return true;
      }
    }
    for (const item of this.companies) {
      if ((email === item.email) && (password === item.password)) {
        this.changeVariables(item);
        this.saveSessionToLocalStorage();
        return true;
      }
    }
    return false;
  }

  logOut():void{
    this.userinfos = null;
    this.isAuthenticated = false;
    this.roles ="";
    localStorage.removeItem(this.USER_KEY);
  }

  // SignUpAsCompany(company : Companies){
  //   return this.http.post(`${this.apiUrl}/companies`,{
  //     id: company.id,
  //     nom: company.nom,
  //     email: company.email,
  //     password: company.password,
  //     capital: company.capital,
  //     role : company,
  //   });
  // }

  // SignUpAsCandidate(candidates : Candidates){
  //   return this.http.post(`${this.apiUrl}/candidates`,{
  //     id: candidates.id,
  //     nom: candidates.nom,
  //     email: candidates.email,
  //     password: candidates.password,
  //     role : candidates,
  //   });
  // }

  private changeVariables(item : any):void{
    this.userinfos = item;
    this.isAuthenticated = true;
    this.roles = item.role;
  }
  private loadSessionFromLocalStorage(): void {
    const sessionData = localStorage.getItem(this.USER_KEY);
    if (sessionData) {
      const { userSession, isAuthenticated, roles } = JSON.parse(sessionData);
      this.userinfos = userSession;
      this.isAuthenticated = isAuthenticated;
      this.roles = roles;
    }
  }
  private saveSessionToLocalStorage(): void {
    const sessionData = {
      userSession: this.userinfos,
      isAuthenticated: this.isAuthenticated,
      roles: this.roles
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(sessionData));
  }
}
