import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas:AlertService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

      
    if (environment.token == '')
    {
      this.alertas.showAlertInfo('Sua sessão expirou. Faça login novamente.')
      this.router.navigate(['/login'])
    }
      
      this.authService.refreshToken()
      this.idUser = this.route.snapshot.params['id']
      this.findByIdUser(this.idUser)
    }

  confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
    }

  tipoUser(event: any) {
      this.tipoUsuario = event.target.value
    }
  
  atualizar(){
     this.user.tipoUsuario = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha) 
     {
      this.alertas.showAlertDanger('As senhas estão divergentes!')
    }
    else
    {
      this.authService.atualizar(this.user).subscribe((resp:User)=>{
        this.user=resp
        this.router.navigate(['/plataforma'])
        this.alertas.showAlertSuccess(`${this.user.nomeCompleto} atualizado com sucesso! Faça o login novamente.`)
        environment.token = ''
        environment.nomeCompleto = ''
        environment.email = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/login'])     
      })
  }

}

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
      this.user.senha = ''
    })
  }

}














