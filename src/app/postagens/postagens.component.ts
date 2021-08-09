import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})
export class PostagensComponent implements OnInit {

  tema: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  constructor(
    private router: Router,
    private PostagemService: PostagemService,
    private alertas:AlertService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '')
    {
      this.alertas.showAlertInfo('Sua sessão expirou. Faça login novamente.')
      this.router.navigate(['/login'])
    }

    if(environment.tipoUsuario != 'adm' && environment.token != ''){
      this.alertas.showAlertDanger('Você não tem permissão para acessar essa página')
      this.router.navigate(['/plataforma'])
    }
    
    this.findAllPostagens()
  }

  findAllPostagens() {
    this.PostagemService.getAllPostagem().subscribe((resp: Postagem[])=> {
      this.listaPostagens = resp
    })
  }

  findByTituloPostagem()
  {
    if (this.tituloPost=='')
    {
      this.findAllPostagens()
    }
    else
    {
      this.PostagemService.getByTituloPostagem(this.tituloPost).subscribe((resposta: Postagem[])=>
      {
        this.listaPostagens = resposta
      })
    }

  }

}
