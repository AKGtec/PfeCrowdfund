import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginngComponent } from './loginng.component';

describe('LoginngComponent', () => {
  let component: LoginngComponent;
  let fixture: ComponentFixture<LoginngComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginngComponent]
    });
    fixture = TestBed.createComponent(LoginngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
