import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertService } from '../service/alert.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  materiaPost: string

  constructor(
    private router: Router,
    private temaService: TemaService,
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
    this.findAllTemas()
  }

  findAllTemas()
  {
    this.temaService.getAllTema().subscribe((resposta: Tema[])=>
    {
      this.listaTemas=resposta
    })
  }

  cadastrar()
  {
    this.temaService.postTema(this.tema).subscribe((resposta: Tema)=>
    {
      this.tema = resposta
      alert('Matéria cadastrada com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

  finByTituloTema()
  {
    if(this.materiaPost=='')
    {
      this.findAllTemas()
    }
    else
    {
      this.temaService.getByNomeTema(this.materiaPost).subscribe((resposta: Tema[])=>
    {
      this.listaTemas=resposta

    })
    }
  }

}
