import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterngComponent } from './registerng.component';

describe('RegisterngComponent', () => {
  let component: RegisterngComponent;
  let fixture: ComponentFixture<RegisterngComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterngComponent]
    });
    fixture = TestBed.createComponent(RegisterngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
