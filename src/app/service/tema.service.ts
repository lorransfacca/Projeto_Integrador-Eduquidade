import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

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

  getByIdTema(id:number):Observable<Tema>{
    return this.http.get<Tema>(`${environment.uri}/temas/${id}`,this.token)
  }

  getAllTema():Observable<Tema[]>{
    return this.http.get<Tema[]>(`${environment.uri}/temas`,this.token)
  }

  getByNomeTema(materia: string):Observable<Tema[]>
  {
    return this.http.get<Tema[]>(`${environment.uri}/temas/materia/${materia}`, this.token)
  }

  postTema(tema:Tema):Observable<Tema>{
    return this.http.post<Tema>(`${environment.uri}/temas`,tema,this.token)
  }

  putTema(tema:Tema):Observable<Tema>{
    return this.http.put<Tema>(`${environment.uri}/temas`,tema,this.token)
  }

  deleteTema(id:number){
    return this.http.delete(`${environment.uri}/temas/${id}`,this.token)
  }

  getByAnoConteudo(ano: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`${environment.uri}/temas/ano/${ano}`,this.token)
  }


}