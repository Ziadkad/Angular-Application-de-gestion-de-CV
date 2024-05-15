import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { forkJoin, Observable, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

export function uniqueEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    const candidates = authService.getAllCandidates();
    const companies = authService.getAllCompanies();
    let loggedIn = false;
    const isEmailTaken = forkJoin([candidates,companies]).subscribe(([candidates, companies]) => {
    for (const item of candidates) {
      if (email === item.email) {
        loggedIn = true;
        break;
      }
    }
    if (!loggedIn) {
      for (const item of companies) {
        if (email === item.email) {
          loggedIn = true;
          break;
        }
      }
    }
    if (!loggedIn) {
      console.log("Login failed");
    }
  }, error => {
    console.error("Error fetching data:", error)
  });
    return of(isEmailTaken ? { emailTaken: true } : null); // Convert synchronous result to Observable
  };
}