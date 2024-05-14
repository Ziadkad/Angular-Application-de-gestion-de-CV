import { Component, OnInit } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';
import { JobOffers } from '../../interfaces/job-offers';
import { FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'] // Note the correct property name
})
export class SigninComponent {
onSubmitForm() {
// throw new Error('Method not implemented.');
}
  myForm!: FormGroup;
  watchingFormChange$!: Observable<any>;
  emailRegex!: RegExp;
  formBuilder: any;

  constructor(private crudJOService : CrudJobOffersService){}

  ngOnInit(): void {
  this.emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  this.myForm = this.formBuilder.group(
    {
      email: [null, {validators: [Validators.required, Validators.pattern(this.emailRegex)],updateOn: 'blur'}],
      password: [null, [Validators.required,Validators.minLength(5)]],
    },
    {
      updateOn: 'blur',
    }
  );
  this.watchingFormChange$ = this.myForm.valueChanges.pipe(
    map((formValue) => ({
      ...formValue,
      createdDate: new Date(),
    }  
  ))
  );
  this.watchingFormChange$.subscribe((data)=>{
    console.log(data);
  })
  }



    // jobOffers: JobOffers[] = [];
    // jobOffer : JobOffers = {
    //   id:3,
    //   company_id:3,
    //   description:"",
    //   title:"",
    //   skills_required: []
    // };
    // constructor(private crudJOService : CrudJobOffersService){}
    // ngOnInit(): void{
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.createJobOffer(this.jobOffer).subscribe(data => {
    //     console.log("********************************");
    //     console.log("createJobOffer")
    //     console.log(data);
    //   });
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("********************************");
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.deleteJobOffer(3).subscribe(data => {
    //     console.log("********************************");
    //     console.log("deleteJobOffer")
    //     console.log(data);
    //   });
    //   this.crudJOService.getAllJobOffers().subscribe((data: JobOffers[]) => {
    //     this.jobOffers = data;
    //     console.log("********************************");
    //     console.log("getAllJobOffers")
    //     console.log(this.jobOffers);
    //   });
    //   this.crudJOService.getJobOfferById(3).subscribe(data=>{
    //     console.log("********************************");
    //     console.log("getJobOfferById")
    //     console.log(data);
    //   })  

    // }
}  

function uniqueEmailValidator(authService: any) {
  // throw new Error('Function not implemented.');
}

