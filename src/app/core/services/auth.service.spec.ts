import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockProvider } from 'ng-mocks';
import { User } from '../models';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let httpMock: HttpTestingController;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, MockProvider(Router), { provide: Router, useValue: routerSpy } ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  const usuarioMockeado: User = {
    id: "1",
    name: "Test",
    email : "user@mail.com",
    password : "123456",
    role: "admin",
    token: "tokentest",
  };

  it('debe hacer login correctamente', () => {
    service.login('user@mail.com', '123456');

    httpMock.expectOne('http://localhost:3000/users?email=user@mail.com&password=123456').flush([usuarioMockeado]);

    expect(localStorage.getItem('token')).toBe(usuarioMockeado.token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });  

  it('debe hacer logout correctamente', () => {
    localStorage.setItem('token', 'abc123');
    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);

    service.authUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  it('debe verificar token correctamente',()=>{
    localStorage.setItem('token', 'tokentest');

    service.verifyToken().subscribe(result => {
      expect(result).toEqual(usuarioMockeado);
    });
    const req = httpMock.expectOne('http://localhost:3000/users?token=tokentest').flush([usuarioMockeado]);
    expect(localStorage.getItem('token')).toBe('tokentest');
  });

});
