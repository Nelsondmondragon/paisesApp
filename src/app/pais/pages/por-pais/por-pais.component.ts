import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent  {
  termino:string = '';
  hayError: boolean = false;
  paises: Country [] =[];
  paisesSugeridos: Country [] =[];
  mostrarSugerencias: Boolean = false;
  constructor(private paisService:PaisService) { }


  buscar(termino:string){
    this.mostrarSugerencias=false;
    this.hayError=false;
    this.termino=termino;
    this.paisService.buscarPais(this.termino)
    .subscribe(
      {
      next: (paises) => {
                        console.log(paises);
                        this.paises=paises},
      error: () => {
      this.hayError=true
      this.paises =[]
      }
    }

    );
  }

  sugerencias(termino:string){
    this.hayError=false;

    this.termino= termino;
    this.mostrarSugerencias=true;

    this.paisService.buscarPais(termino)
      .subscribe(

        {
      next: (paises) =>{
        if(paises.length){
        this.paisesSugeridos=paises.splice(0,5)}
      }
        ,
      error: (e) =>{
        this.paisesSugeridos=[]
      }

    }


    );


  }
}
