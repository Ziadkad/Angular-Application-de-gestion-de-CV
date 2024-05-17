  import { Component } from '@angular/core';
  import {
    FormBuilder,
    FormGroup,
    MinLengthValidator,
    Validators,
  } from '@angular/forms';
  import { map, Observable } from 'rxjs';
  import { AuthService } from '../../services/auth.service';
  import { MessageService } from 'primeng/api';
  import { uniqueEmailValidator } from '../validators/uniqueEmailValidator';
  import { Roles } from '../../enums/roles';
  import {  Router } from '@angular/router';

  @Component({
    selector: 'app-signup-companies',
    templateUrl: './signup-companies.component.html',
    styleUrl: './signup-companies.component.css',
  })
  export class SignupCompaniesComponent {
    myForm!: FormGroup;
    watchingFormChange$!: Observable<any>;
    emailRegex!: RegExp;
    passwordRegex!: RegExp;
    RoleEnumString!:string[]

    submitted: boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      private authservice: AuthService,
      private messageService: MessageService,
      private router: Router
    ) {}
   
    ngOnInit(): void {
      this.RoleEnumString = Object.keys(Roles).filter(
        (k) => typeof Roles[k as any] === 'number'
      );
      this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
      this.myForm = this.formBuilder.group(
        {
          nom: [
            null,
            {
              Validators: [Validators.required, Validators.minLength(5)],
            },
          ],
          capital: [
            null,
            {
              Validators: [Validators.required, Validators.minLength(5)],
            },
          ],
          email: [
            null,
            {
              validators: [
                Validators.required,
                Validators.pattern(this.emailRegex)
              ],
              asyncValidators: [uniqueEmailValidator(this.authservice)],
              updateOn: 'blur',
            },
          ],
          password: [
            null,
            [
              Validators.required,
              Validators.pattern(this.passwordRegex)
            ],
          ],
          id: 0,
          role: this.RoleEnumString[1],
        },
        {
          updateOn: 'blur',
        }
      );    
    }

  

  onSubmitForm() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.authservice.signUpAsCompany(this.myForm.value).subscribe((data) => {
        console.log(data);
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
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong credintials' });
      });
    }
  }
}
