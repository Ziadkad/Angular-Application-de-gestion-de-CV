import { Component, OnInit } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'], // Note the correct property name
})
export class SigninComponent {
  myForm!: FormGroup;
  watchingFormChange$!: Observable<any>;
  emailRegex!: RegExp;
  passwordRegex!: RegExp;

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService
  ) {} // Inject FormBuilder

  ngOnInit(): void {
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.myForm = this.formBuilder.group(
      {
        email: [
          null,
          {
            validators: [
              Validators.required,
              // Validators.pattern(this.emailRegex),
            ],
            updateOn: 'blur',
          },
        ],
        password: [null, [Validators.required,
          //  Validators.pattern(this.passwordRegex)
          ]
          ],
      },
      {
        updateOn: 'blur',
      }
    );
    this.watchingFormChange$ = this.myForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        createdDate: new Date(),
      }))
    );
    this.watchingFormChange$.subscribe((data) => {
      console.log(data);
    });
  }

  onSubmitForm() {
    console.log(this.myForm.value.email, this.myForm.value.password);
    this.submitted = true; 
    if (this.myForm.valid) {
      this.authservice.logIn(this.myForm.value.email, this.myForm.value.password);
      if(!this.authservice.isAuthenticated){
        alert("Wrong credintials !");
      }
    }
    
  }
  }

