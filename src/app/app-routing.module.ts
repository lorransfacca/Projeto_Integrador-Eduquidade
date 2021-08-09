import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriaEditComponent } from './edit/materia-edit/materia-edit.component';
import { MateriaDeleteComponent } from './delete/materia-delete/materia-delete.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MateriasComponent } from './materias/materias.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { PostagensComponent } from './postagens/postagens.component';
import { VideopageComponent } from './videopage/videopage.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';

const routes: Routes = [
  {path:'', redirectTo: 'homepage', pathMatch: 'full'},
  {path:'homepage',component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'plataforma', component: PlataformaComponent},
  {path: 'materias', component: MateriasComponent},
  {path: 'materia-edit/:id', component: MateriaEditComponent},
  {path: 'materia-delete/:id', component:MateriaDeleteComponent},
  {path: 'postagem-edit/:id', component:PostagemEditComponent},
  {path: 'postagem-delete/:id',component:PostagemDeleteComponent},
  {path: 'postagens', component: PostagensComponent},
  {path: 'videopage/:id', component: VideopageComponent},
  {path: 'user-edit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
