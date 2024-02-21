import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test invalid login form', () => {
    const formData = {
      username: '',
      password: '',
    };
    component.form.setValue(formData);
    expect(component.form.invalid).toEqual(true);
  });

  it('test valid login form', () => {
    const formData = {
      username: 'examplere',
      password: '12345678',
    };
    component.form.setValue(formData);
    expect(component.form.valid).toEqual(true);
  });
});
