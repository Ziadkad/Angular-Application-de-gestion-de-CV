import { Component } from '@angular/core';
import { CrudJobOffersService } from '../../services/crud-job-offers.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
    constructor(private crudJOService : CrudJobOffersService){

    }
    
}
