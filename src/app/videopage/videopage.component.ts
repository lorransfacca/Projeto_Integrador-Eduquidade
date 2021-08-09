
import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {
  
  tema:Tema = new Tema
  idMateria: number 
  video = ''
  titulo = 'Bem-vindo!'
  descricao = 'Bem vindo'
  idPostagem =0
  fotoUserLogado = environment.foto
  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]
  user: User = new User
  postagem : Postagem = new Postagem

  @Input()
  url: string = this.video;
  urlSafe: SafeResourceUrl;

  
  constructor(
    public sanitizer: DomSanitizer,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService,
    private comentarioService: ComentarioService,
    private alertas:AlertService
  
    ) { }

  ngOnInit() {

    if (environment.token == '')
    {
      this.alertas.showAlertInfo('Sua sessão expirou. Faça login novamente')
      this.router.navigate(['/login'])
    }

    this.temaService.refreshToken()
    this.postagemService.refreshToken()
    this.comentarioService.refreshToken()
    
    window.scroll(0,0)
    
    this.idMateria = this.route.snapshot.params['id']

    /* Playlist */
    this.temaService.refreshToken()
    this.getMateriaId()
    this.findAllComentarios()

    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  troca(link:string){
    this.video=link
    this.url = this.video;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  /* Playlist */
  getMateriaId(){
    this.temaService.getByIdTema(this.idMateria).subscribe((resp:Tema)=>{
      this.tema=resp
      let postagens = this.tema.postagem
      this.trocarAula(postagens[0].link_video, postagens[0].titulo,postagens[0].descricao, postagens[0].id, postagens[0])
    })
  }

  trocarAula(linkVideo:string, titulo:string, descricao: string, id:number, video:Postagem){

    this.video=linkVideo
    this.titulo = titulo
    this.descricao = descricao
    this.idPostagem= id;
    this.postagem=video;
    this.url = this.video;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

  }

  findAllComentarios()
  {
    this.comentarioService.getAllComentarios().subscribe((resposta: Comentario[])=>
    {
      this.listaComentarios = resposta
    })
  }

  comentar(id:number)
  {
    this.user.id= environment.id
    this.comentario.usuario = this.user
    this.postagem.id = id
    this.comentario.postagem = this.postagem
    this.comentarioService.postComentario(this.comentario).subscribe((resposta: Comentario)=>
    {
      this.comentario = resposta
      this.comentario = new Comentario
      this.router.navigate(['/plataforma'])
      setTimeout(() => {
        this.router.navigate([`/videopage/${this.idMateria}`])
      }, 20);
    })
  }

  ano1(){
    let ok: boolean = false

    if(this.tema.anoConteudo == '1º ano'){
      ok = true
    }

    return ok 
  }

  ano2(){
    let ok: boolean = false

    if(this.tema.anoConteudo == '2º ano'){
      ok = true
    }

    return ok 
  }

  ano3(){
    let ok: boolean = false

    if(this.tema.anoConteudo == '3º ano'){
      ok = true
    }

    return ok 
  }
}
