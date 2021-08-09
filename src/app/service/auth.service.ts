import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(
    private http: HttpClient
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshToken(){
    this.token={
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getByIdUser(id:number):Observable<User>{
    return this.http.get<User>(`${environment.uri}/usuarios/${id}`, this.token)
  }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${environment.uri}/usuarios/login`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.uri}/usuarios/signin`, user)
  }

  atualizar(user: User): Observable<User>{
    return this.http.put<User>(`${environment.uri}/usuarios`, user, this.token)
  }

  logado()
  {
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok 
  }

  adm(){
    let ok: boolean = false

    if(environment.tipoUsuario == 'adm'){
      ok = true
    }

    return ok 
  }
  notAdm(){
    let ok: boolean = false

    if(environment.tipoUsuario != 'adm'){
      ok = true
    }

    return ok 
  }

} 