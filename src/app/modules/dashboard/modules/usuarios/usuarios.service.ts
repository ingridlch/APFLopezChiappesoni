import { Injectable } from '@angular/core';
import { User, UserForm } from './../../../../core/models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private http: HttpClient) {}
  get$(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }
  create(user: UserForm): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users`, user);
  }
  delete(id: string): Observable<User> {
    return this.http
      .delete<User>(`http://localhost:3000/users/${id}`);
      //.pipe(concatMap(() => this.get$()));
  }
  update(id: string, user: User): Observable<User> {
    return this.http.patch<User>(`http://localhost:3000/users/${id}`, user);
      //.pipe(concatMap(() => this.get$()));
  }
}