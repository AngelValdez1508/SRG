import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidePasswordComponent } from './olvide-password.component';

describe('OlvidePasswordComponent', () => {
  let component: OlvidePasswordComponent;
  let fixture: ComponentFixture<OlvidePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlvidePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvidePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});