import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Candidates } from '../../interfaces/candidates';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

  constructor(private authservice: AuthService){}

  candidates!:Candidates[]

  ngOnInit():void{
     this.authservice.getAllCandidates().subscribe(data=>{
          this.candidates= data;
    })
  }

}
