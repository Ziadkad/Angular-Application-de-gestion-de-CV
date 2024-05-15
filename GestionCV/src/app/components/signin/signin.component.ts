import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private authservice: AuthService,
    private messageService: MessageService,
    private router: Router
    ) {}

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
    console.log(this.myForm.value.email, this.myForm.value.password);
    this.submitted = true; 
    if (this.myForm.valid) {
      this.authservice.logIn(this.myForm.value.email, this.myForm.value.password).subscribe(data=>{
        if(!data){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong credintials' });
        }else{
          this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Welcome' });
          setInterval(() => {
            this.router.navigate([''])
          }, 1000);
        }
      });

    }else{
      console.log("error form inexcpected !");
    }
    
  }
  }

