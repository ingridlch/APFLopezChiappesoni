import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el email no puede ser vacío', () => {
    component.loginForm.setValue({
      email: '',
      password: '123456',
    });
    expect(component.loginForm.valid).toBeFalsy();
  });
  
  it('la password no puede ser vacía', () => {
    component.loginForm.setValue({
      email: 'mail.com',
      password: '',
    });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('el email y la password no deben ser vacíos', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('el email y password deben ser completos', () => {
    component.loginForm.setValue({
      email: 'mail.com',
      password: '123456',
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('si el formulario es inválido debe mostrar cartel de alerta', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    const alertSpy = spyOn(window, 'alert');
    component.login();
    expect(alertSpy).toHaveBeenCalledWith('Por favor complete nombre de usuario y contraseña para iniciar sesión');
  });

  it('si el formulario es válido se debe hacer login', () => {
    component.loginForm.setValue({
      email: 'mail.com',
      password: '123456',
    });
    const authService = TestBed.inject(AuthService);
    const loginSpy = spyOn(authService, 'login');
    component.login();
    expect(loginSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalledWith('mail.com', '123456');
  });

});
