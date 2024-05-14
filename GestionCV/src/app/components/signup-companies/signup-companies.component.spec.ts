import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCompaniesComponent } from './signup-companies.component';

describe('SignupCompaniesComponent', () => {
  let component: SignupCompaniesComponent;
  let fixture: ComponentFixture<SignupCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
