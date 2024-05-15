import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
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

  public userinfos: any;
  public isAuthenticated: boolean = false;
  public roles: string = "";

  // logIn(email: string, password: string): boolean {
  //   let loggedIn = false
  //   forkJoin([
  //     this.getAllCandidates(),
  //     this.getAllCompanies()
  //   ]).subscribe(([candidates, companies]) => {
  //     for (const item of candidates) {
  //       if (email === item.email && password === item.password) {
  //         this.changeVariables(item);
  //         this.saveSessionToLocalStorage();
  //         loggedIn = true;
  //         break;
  //       }
  //     }
  //     if (!loggedIn) {
  //       for (const item of companies) {
  //         if (email === item.email && password === item.password) {
  //           this.changeVariables(item);
  //           this.saveSessionToLocalStorage();
  //           loggedIn = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (!loggedIn) {
  //       console.log("Login failed");
  //     }
  //   }, error => {
  //     console.error("Error fetching data:", error)
  //   });
  //     return loggedIn;
  // }
  
  logIn(email: string, password: string): Observable<boolean> {
    return forkJoin([
      this.getAllCandidates(),
      this.getAllCompanies()
    ]).pipe(
      map(([candidates, companies]) => {
        let loggedIn = false;
        for (const item of candidates) {
          if (email === item.email && password === item.password) {
            this.changeVariables(item);
            this.saveSessionToLocalStorage();
            loggedIn = true;
            break;
          }
        }
        if (!loggedIn) {
          for (const item of companies) {
            if (email === item.email && password === item.password) {
              this.changeVariables(item);
              this.saveSessionToLocalStorage();
              loggedIn = true;
              break;
            }
          }
        }
        return loggedIn;
      }),
      catchError(error => {
        console.error("Error fetching data:", error);
        return of(false); // Returning Observable<boolean> with false if there's an error
      })
    );
  }


  logOut():void{
    this.userinfos = null;
    this.isAuthenticated = false;
    this.roles ="";
    localStorage.removeItem(this.USER_KEY);
  }

  signUpAsCompany(company : Companies){
    this.changeVariables(company);
    this.saveSessionToLocalStorage();
    return this.http.post(`${this.apiUrl}/companies`,{
      id: this.generateRandomNumber(1, 200000).toString,
      nom: company.nom,
      email: company.email,
      password: company.password,
      capital: company.capital,
      role : company.role,
    });
  }

  signUpAsCandidate(candidates : Candidates){
    return this.http.post(`${this.apiUrl}/candidates`,{
      id: this.generateRandomNumber(1, 200000).toString,
      nom: candidates.nom,
      prenom: candidates.prenom,
      datenaissance: candidates.datenaissance,
      email: candidates.email,
      password: candidates.password,
      cv: "",
      skills:[],
      role : candidates.role,
    });
  }


   generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
