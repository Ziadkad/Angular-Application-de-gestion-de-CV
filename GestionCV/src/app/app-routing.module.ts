import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupCandidatesComponent } from './components/signup-candidates/signup-candidates.component';

import { SignupCompaniesComponent } from './components/signup-companies/signup-companies.component';
import { SignupChooseComponent } from './components/signup-choose/signup-choose.component';

const routes: Routes = [
  // {path : "", component: },
  { path:'signin', component: SigninComponent},
  { path:'signup', component: SignupComponent, children: [
    { path:'',component: SignupChooseComponent},
    { path:'candidates', component: SignupCandidatesComponent},
    { path:'companies', component: SignupCompaniesComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
