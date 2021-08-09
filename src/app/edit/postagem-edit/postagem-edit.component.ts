import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { User } from 'src/app/model/User';
import { AlertService } from 'src/app/service/alert.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  user: User = new User()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas:AlertService
  ) { }

  ngOnInit() {

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
    let id = this.route.snapshot.params['id']
    this.postagemService.refreshToken()
    this.findByIdPostagem(id)
    this.user.id = environment.id
/*     this.findAllTemas() */
  }
  getTemaAno(event:any){
    return this.temaService.getByAnoConteudo(event.target.value).subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
  }


  findByIdPostagem(id: number)
  {
    this.postagemService.getByIdPostagem(id).subscribe((resposta: Postagem)=>
    {
      this.postagem=resposta
    })
  }

  findByIdTema()
  {
    this.temaService.getByIdTema(this.idTema).subscribe((resposta: Tema)=>
    {
      this.tema=resposta
    })
  }

/*   findAllTemas()
  {
    this.temaService.getAllTema().subscribe((resposta: Tema[])=>
    {
      this.listaTemas = resposta
    })
  } */

  atualizar()
  {
/*     this.postagem.tema.id=this.idTema */
    this.postagem.tema=this.tema
    this.postagem.usuario= this.user
    this.postagem.link_video = this.postagem.link_video.replace("watch?v=", "embed/")
    this.postagemService.putPostagem(this.postagem).subscribe((resposta: Postagem)=>
    {
      this.postagem = resposta
      this.alertas.showAlertSuccess('Aula atualizada com sucesso!')
      this.router.navigate(['/postagens'])
    })
  }

}
