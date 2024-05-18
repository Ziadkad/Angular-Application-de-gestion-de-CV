import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from '../../enums/skills';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {
  constructor(
    private route : ActivatedRoute ,
    private router : Router,
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private crudJobOffersService : CrudJobOffersService,
    private messageService: MessageService,
  ){
  }
  
  add : boolean = true;
  dropdown: boolean = false;
  offerForm! : FormGroup;
  id! : string;
  title! : string;
  description! : string;
  skillsAdded: any[] = [];
  submitted: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.id = params['id'];
        this.add = false;
        this.crudJobOffersService.getJobOfferById(this.id).subscribe(data=>{
          if (data.company_id!=this.authservice.userinfos.id){
            this.router.navigate(['/myoffers']);
          }
          this.title=data.title;
          this.description=data.description;
          this.skillsAdded=data.skills_required;
          this.patchFormBeforeUserRealize();
        })
      }
      else{
        this.id = this.authservice.generateRandomNumber(1, 200000).toString();
      }
    })

    this.offerForm = this.formBuilder.group(
      {
        id: this.id,
        company_id: this.authservice.userinfos.id,
        title: [
          null,
          {
            validators: [Validators.required, Validators.minLength(5)],
          },
        ],
        description: [
         null,
          {
            validators: [Validators.required, Validators.minLength(20)],
          },
        ],
        skills_required: [
          this.skillsAdded
        ],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  patchFormBeforeUserRealize(){
    this.offerForm.patchValue({
      id: this.id,
      company_id: this.authservice.userinfos.id,
      title: this.title,
      description: this.description,
      skills_required: this.skillsAdded
    });
  }

  skillsEnums = Object.keys(Skills).filter(
    (k) => typeof Skills[k as any] === 'number'
  );
  pushSkillsToAdded(updatedSkill: any) {
    if (!this.skillsAdded.includes(updatedSkill)) {
      this.skillsAdded.push(updatedSkill);
    }
  }
  dropdownFunc() {
    this.dropdown = !this.dropdown;
  }
  popSkillsToAdded(updatedSkill: any) {
    const index = this.skillsAdded.indexOf(updatedSkill);
    this.skillsAdded.splice(index, 1);
  }


  onSubmitOffer(){
    this.submitted=true;
    if(this.offerForm.valid){
        if(this.add){
          this.crudJobOffersService.createJobOffer(this.offerForm.value).subscribe(data=>{
                this.messageService.add({
                  severity: 'Success',
                  summary: 'Success',
                  detail: 'updated succesfully',
                });
                setTimeout(() => {
                  this.router.navigate(['/myoffers']);
                }, 1000);
          })
          }
        else if (!this.add){
          this.crudJobOffersService.updateJobOffer(this.offerForm.value).subscribe(data=>{
                this.messageService.add({
                  severity: 'Success',
                  summary: 'Success',
                  detail: 'updated succesfully',
                });
                setTimeout(() => {
                  this.router.navigate(['/myoffers']);
                }, 1000);
          })
        }
      }

  }


}


