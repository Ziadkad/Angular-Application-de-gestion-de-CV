import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {
  constructor(private route : ActivatedRoute){

  }

  id! : string;
  add : boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.id = params['id'];
        this.add = false;
      }
    });
  }
}
