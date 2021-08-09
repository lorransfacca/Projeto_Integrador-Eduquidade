import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  listaTemas1: Tema[]
  listaTemas2: Tema[]
  listaTemas3: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    this.findAllTema1Ano()
    this.findAllTema2Ano()
    this.findAllTema3Ano()

  }

  findAllTema1Ano(){
    this.temaService.getByAnoConteudo('1º ano').subscribe((resp: Tema[]) =>{
      this.listaTemas1 = resp
    })
  }

  findAllTema2Ano(){
    this.temaService.getByAnoConteudo('2º ano').subscribe((resp: Tema[]) =>{
      this.listaTemas2 = resp
    })
  }

  findAllTema3Ano(){
    this.temaService.getByAnoConteudo('3º ano').subscribe((resp: Tema[]) =>{
      this.listaTemas3 = resp
    })
  }

}
