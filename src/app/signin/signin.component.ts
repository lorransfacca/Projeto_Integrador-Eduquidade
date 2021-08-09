import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user : User = new User()
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas:AlertService
  ) { }

  ngOnInit() {
    this.tipoUsuario = 'aluno'
  }

  confirmeSenha(event:any)
  {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event:any)
  {
    /* this.tipoUsuario = event.target.value */

    this.tipoUsuario = 'adm'
  }

  cadastrar()
  {
    this.user.tipoUsuario= this.tipoUsuario

    if(this.user.senha != this.confirmarSenha)
    {
      this.alertas.showAlertDanger('As senhas estão divergentes!')
    }
    else
    {
      this.auth.cadastrar(this.user).subscribe((resposta:User)=>{
        this.user=resposta
        this.alertas.showAlertSuccess(`${this.user.nomeCompleto} cadastrado com sucesso`)
        this.router.navigate(['/login'])
      })
    }
  }

}
