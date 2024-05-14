import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCandidatesComponent } from './signup-candidates.component';

describe('SignupCandidatesComponent', () => {
  let component: SignupCandidatesComponent;
  let fixture: ComponentFixture<SignupCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
