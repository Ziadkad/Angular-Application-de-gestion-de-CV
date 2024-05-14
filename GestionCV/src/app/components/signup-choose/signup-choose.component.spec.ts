import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupChooseComponent } from './signup-choose.component';

describe('SignupChooseComponent', () => {
  let component: SignupChooseComponent;
  let fixture: ComponentFixture<SignupChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupChooseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
