import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Roles } from '../../enums/roles';
import { Router } from '@angular/router';
import { uniqueEmailValidator } from '../validators/uniqueEmailValidator';

@Component({
  selector: 'app-signup-candidates',
  templateUrl: './signup-candidates.component.html',
  styleUrl: './signup-candidates.component.css'
})
export class SignupCandidatesComponent {
  myForm!: FormGroup;
  // watchingFormChange$!: Observable<any>;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: RegExp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  RoleEnumString!:string[]

  submitted: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private messageService: MessageService,
    private router:Router
    ) {}

    ngOnInit(){
      this.RoleEnumString = Object.keys(Roles).filter(
        (k) => typeof Roles[k as any] === 'number'
      );
      this.myForm = this.formBuilder.group(
        {
          nom: [
            null,
            {
              validators: [
                Validators.required,
                Validators.minLength(3)
              ],
            },
          ],
          prenom: [
            null,
            {
              validators: [
                Validators.required,
                Validators.minLength(3),
              ],
            },
          ],
          datenaissance: [
            null,
            {
              validators: [
                Validators.required,
              ],
            },
          ],
          email: [
            null,
            {
              validators: [
                Validators.required,
                Validators.pattern(this.emailRegex),
              ],
              asyncValidators: [uniqueEmailValidator(this.authservice)],
              updateOn: 'blur',
            },
          ],
          password: [null, [Validators.required,
             Validators.pattern(this.passwordRegex)
            ]
            ],
          id: 0,
          cv: "",
          skills:[],
          role : this.RoleEnumString[1],
        },
        {
          updateOn: 'blur',
        }
      );
    }

    onSubmitForm() {
      this.submitted = true; 
      if (this.myForm.valid) {
        this.authservice.signUpAsCandidate(this.myForm.value).subscribe(data=>
          {
            this.messageService.add({
                      severity: 'Success',
                      summary: 'Success',
                      detail: 'You have registred succesfully',
                    });
                    setTimeout(() => {
                      this.authservice.changeVariables(this.myForm.value)
                      this.authservice.saveSessionToLocalStorage();
                      this.router.navigate(['']);
                  }, 1000);
          }
          )
      }
    }
}
