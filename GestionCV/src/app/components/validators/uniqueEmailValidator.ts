import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { forkJoin, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";

export function uniqueEmailValidator(authService: AuthService): AsyncValidatorFn {
  console.log("Unique email invoked !");
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    const candidates$ = authService.getAllCandidates();
    const companies$ = authService.getAllCompanies();

    return forkJoin([candidates$, companies$]).pipe(
      map(([candidates, companies]) => {
        let emailTaken = false;

        for (const item of candidates) {
          if (email === item.email) {
            emailTaken = true;
            break;
          }
        }

        if (!emailTaken) {
          for (const item of companies) {
            if (email === item.email) {
              emailTaken = true;
              break;
            }
          }
        }

        return emailTaken ? { emailTaken: true } : null;
      }),
      catchError(error => {
        console.error("Error fetching data:", error);
        return of(null); // In case of error, returning null as no error.
      })
    );
  };
}
