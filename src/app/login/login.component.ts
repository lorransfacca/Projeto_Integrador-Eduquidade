import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
  private auth: AuthService,
  private router: Router,
  private alertas:AlertService
) { }

ngOnInit() {
  window.scroll(0,0)
}

entrar(){
  this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
    this.userLogin = resp

    environment.token = this.userLogin.token
    environment.nomeCompleto = this.userLogin.nomeCompleto
    environment.foto = this.userLogin.foto
    environment.id = this.userLogin.id
    environment.tipoUsuario = this.userLogin.tipoUsuario
    environment.email = this.userLogin.email

   // console.log(environment.email)
   // console.log(environment.nomeCompleto)
   // console.log(environment.token)
   // console.log(environment.tipoUsuario)
    
    this.router.navigate(['/plataforma'])
  }, erro =>{
    if(erro.status == 401){

      this.alertas.showAlertDanger('Usuário e/ou senha incorreto(s)!')
    }
  })
}

}