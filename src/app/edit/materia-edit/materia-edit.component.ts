import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertService } from 'src/app/service/alert.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-materia-edit',
  templateUrl: './materia-edit.component.html',
  styleUrls: ['./materia-edit.component.css']
})
export class MateriaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas:AlertService
  ){ }

  ngOnInit() {

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
    this.findByIdTema(id)
    this.temaService.refreshToken()
  }

  findByIdTema(id: number){

    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Matéria atualizada com sucesso!')
      this.router.navigate(['/materias'])
    })
  }
}
