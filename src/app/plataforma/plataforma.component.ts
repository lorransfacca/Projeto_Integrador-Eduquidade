import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private alertas:AlertService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '')
    {
      this.alertas.showAlertInfo('Sua sessão expirou. Faça login novamente')
      this.router.navigate(['/login'])
    }

    this.temaService.refreshToken()
    this.postagemService.refreshToken()
  }

}
