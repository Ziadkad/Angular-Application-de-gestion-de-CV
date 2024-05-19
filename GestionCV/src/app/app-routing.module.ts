import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupCandidatesComponent } from './components/signup-candidates/signup-candidates.component';
import { SignupCompaniesComponent } from './components/signup-companies/signup-companies.component';
import { SignupChooseComponent } from './components/signup-choose/signup-choose.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { roleGuard } from './guards/role.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OffersComponent } from './components/offers/offers.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'profile', component: ProfileComponent, canActivate:[authGuard,roleGuard], data:{roles: ['CANDIDATE']}},
  { path:'offers', component: OffersComponent},
  { path:'candidates', component: CandidatesComponent, canActivate:[authGuard,roleGuard], data:{roles: ['COMPANY']}},
  { path:'signin', component: SigninComponent,canActivate:[notAuthGuard]},
  { path:'signup', component: SignupComponent,canActivate:[notAuthGuard], children: [
    { path:'',component: SignupChooseComponent},
    { path:'candidates', component: SignupCandidatesComponent},
    { path:'companies', component: SignupCompaniesComponent},
  ]},
  { path:'addoffer', component: AddOfferComponent, canActivate:[authGuard,roleGuard], data:{roles: ['COMPANY']}},
  { path:'updateoffer/:id', component: AddOfferComponent, canActivate:[authGuard,roleGuard], data:{roles: ['COMPANY']}},
  { path:'application/:id', component: ApplicationsComponent, canActivate:[authGuard,roleGuard], data:{roles: ['COMPANY']}},
  { path:'myoffers', component: MyOffersComponent, canActivate:[authGuard,roleGuard], data:{roles: ['COMPANY']}},
  { path:'faq',component: FaqComponent},
  { path:'contact',component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
