import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  
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

  getAllPostagem():Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${environment.uri}/postagens`, this.token)
  }

  getByIdPostagem(id:number):Observable<Postagem>{
    return this.http.get<Postagem>(`${environment.uri}/postagens/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string):Observable<Postagem[]>
  {
    return this.http.get<Postagem[]>(`${environment.uri}/postagens/titulo/${titulo}`, this.token)
  }

  postPostagem(postagem:Postagem):Observable<Postagem>{
    return this.http.post<Postagem>(`${environment.uri}/postagens`, postagem, this.token)
  }

  putPostagem(postagem:Postagem):Observable<Postagem>{
    return this.http.put<Postagem>(`${environment.uri}/postagens`, postagem, this.token)
  }
  
	deletePostagem(id:number){
    return this.http.delete(`${environment.uri}/postagens/${id}`,this.token)
  }

}