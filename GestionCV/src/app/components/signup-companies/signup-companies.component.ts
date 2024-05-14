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

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.myForm = this.formBuilder.group(
      {
        companyName: [
          null,
          {
            Validators: [Validators.required, Validators.minLength(5)],
          },
        ],
        companyCapital: [
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
            // asyncValidators: [uniqueEmailValidator(this.authservice)],
            // updateOn: 'blur',
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
        role: Roles.COMPANY,
      },
      {
        updateOn: 'blur',
      }
    );
    // this.watchingFormChange$ = this.myForm.valueChanges.pipe(
    //   map((formValue) => ({
    //     ...formValue,
    //     createdDate: new Date(),
    //   }))
    // );
    // this.watchingFormChange$.subscribe((data) => {
    //   console.log(data);
    // });
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
        setInterval(() => {
          console.log('redirecting ...');
        }, 1000);
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong credintials' });
      });
    }
  }
}
