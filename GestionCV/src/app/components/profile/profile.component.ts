import { Component } from '@angular/core';
import { Skills } from '../../enums/skills';
import { AuthService } from '../../services/auth.service';
import { CrudCandidatesService } from '../../services/crud-candidates.service';
import { Candidates } from '../../interfaces/candidates';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { uniqueEmailValidator } from '../validators/uniqueEmailValidator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  fileName!: string;

  myForm!: FormGroup;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  submitted: boolean = false;

  public dropdown: boolean = false;

  public isEdit: boolean = false;

  skillsAdded: any[] = [];

  newUser!: Candidates;

  constructor(
    private authservice: AuthService,
    private crudCandidate: CrudCandidatesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(
      {
        id: this.authservice.userinfos.id,
        nom: [
          this.authservice.userinfos.nom,
          {
            validators: [Validators.required, Validators.minLength(3)],
          },
        ],
        prenom: [
          this.authservice.userinfos.prenom,
          {
            validators: [Validators.required, Validators.minLength(3)],
          },
        ],
        datenaissance: [
          this.authservice.userinfos.datenaissance,
          {
            validators: [Validators.required],
          },
        ],
        email: [
          this.authservice.userinfos.email,
          {
            validators: [
              Validators.required,
              // Validators.pattern(this.emailRegex),
            ],
            // asyncValidators: [uniqueEmailValidator(this.authservice)],
          },
        ],
        password: [
          this.authservice.userinfos.password,
          [
            Validators.required,
            // Validators.pattern(this.passwordRegex)
          ],
        ],
        cv: this.fileName,
        skills: [
          this.skillsAdded,
          [
            // Validators.required,
            // Validators.pattern(this.passwordRegex)
          ],
        ],
        role: Roles.CANDIDATE,
      },
      {
        updateOn: 'blur',
      }
    );
  }
  ngDoCheck(): void {
    this.skillsAdded = this.authservice.userinfos.skills;
  }

  userInfos = this.authservice.userinfos;

  skillsEnums = Object.keys(Skills).filter(
    (k) => typeof Skills[k as any] === 'number'
  );

  dropdownFunc() {
    this.dropdown = !this.dropdown;
  }

  editFunc() {
    this.isEdit = !this.isEdit;
  }

  pushSkillsToAdded(updatedSkill: any) {
    if (!this.skillsAdded.includes(updatedSkill)) {
      this.skillsAdded.push(updatedSkill);
    }
  }
  popSkillsToAdded(updatedSkill: any) {
    const index = this.skillsAdded.indexOf(updatedSkill);
    this.skillsAdded.splice(index, 1);
  }

  onSubmitForm() {
    console.log('invoked');
    console.log(this.myForm.value.cv);
    console.log(this.fileName);
    // if (this.file) {
    //   // const formData = new FormData();
    //   this.fileName = "assets/images/"+this.file.name;

    //   console.log(this.myForm.value)

    //   // formData.append('file', this.file, this.file.name);

    //   // const upload$ = this.http.post("https://httpbin.org/post", formData);

    //   this.status = 'uploading';

    //   // upload$.subscribe({
    //   //   next: () => {
    //   //     this.status = 'success';
    //   //   },
    //   //   error: (error: any) => {
    //   //     this.status = 'fail';
    //   //     return throwError(() => error);
    //   //   },
    //   // });

    //   this.myForm.value.skills = this.skillsAdded
    //   this.submitted = true;
    //   if (this.myForm.valid) {
    //     this.crudCandidate
    //       .updateCandidateAndSession(this.myForm.value)
    //       .subscribe((data) => {
    //         this.messageService.add({
    //           severity: 'Success',
    //           summary: 'Success',
    //           detail: 'updated succesfully',
    //         });
    //         this.isEdit=false;
    //         setTimeout(() => {
    //           this.router.navigate(['profile']);
    //         }, 1000);
    //       });
    //   }else{
    //     alert("hhhhhhhhh");
    //   }

    // }else{
    //   alert("no file found");
    // }
  }
  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = 'initial';
      this.file = file;
      this.fileName = file.name;
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete your account') == true) {
      this.crudCandidate
        .deleteCandidate(this.authservice.userinfos.id)
        .subscribe((data) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: 'Sad to see you leave 🥲',
          });
          setTimeout(() => {
            this.authservice.logOut();
            this.router.navigate(['']);
          }, 1000);
        });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'info',
        detail: "You won't regret it",
      });
    }
  }
}
