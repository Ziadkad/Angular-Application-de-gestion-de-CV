import { Component } from '@angular/core';
import { Skills } from '../../enums/skills';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    public dropdown: boolean = false;

    ngOnInit() : void{
      
    }
    skillsEnums = Object.keys(Skills).filter(k => typeof Skills[k as any] === "number");
    
    dropdownFunc(){
      this.dropdown = !this.dropdown;
    }
}
