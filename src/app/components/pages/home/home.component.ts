import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { report } from 'process';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayPalabras = [ 'sofware', 'frank', 'sistemas','angular','springboot'];
  palabraBuscada: any ;
  palabrasConGuiones = "";
  cantidadErrores = 0;
  estadoFallos= false;
  botonReset = false;
  letra = "";
  nombreImage = "No inicia la prueba";

  constructor(private us: UsuarioService) { }

  ngOnInit(): void {
    this.getPalabra();
    // this.getImage(0);
  }

  evaluar(letra: String){
    let estadoFallos = false;
    if(letra == ''){
      alert("ingrese una letra");
      return;
    }
    console.log("palaba a buscar " + this.palabraBuscada)
    // console.log(this.palabraBuscada)
    // console.log(letra);
// console.log("this.palabraBuscada.length: " +this.palabraBuscada.length)
    for(let i= 0;  i < this.palabraBuscada.length; i++){
      // console.log("letra========" + letra )
      // console.log("....." +this.palabraBuscada[i])
      if(letra === this.palabraBuscada[i]){
        console.log("coincidieron")
        estadoFallos = true;
        // console.log(estadoFallos)
        // console.log("palabra buscada " +this.palabraBuscada[i])
        // console.log(letra)
        this.convertPalabra( letra, i*2);

      }
      // if(letra != this.palabraBuscada[i]){
      //   estadoFallos = false;
      // }
      // if(letra === this.palabraBuscada[i]){

        // }
        // else {
          //   console.log("entro aqui")
          //   this.estadoFallos = true;a

          // }

        }
        // estadoFallos = false;
        this.validarFallos(estadoFallos)




    this.letra = "";
    // console.log(this.palabrasConGuiones)


  }
  getFotoFromApi(intentos: number){
    this.us.findByIntentos(intentos).subscribe((response: any) =>{
      this.nombreImage = response.usuario.imagen;
    })
  }
  validarFallos(estadoFallos: boolean){
    console.log(estadoFallos)
    if(!estadoFallos){
      console.log("fallaste")
     //  console.log(this.estadoFallos)
       this.cantidadErrores ++;

        // this.getFotoFromApi(this.cantidadErrores);
     this.getImage(this.cantidadErrores);
       if(this.cantidadErrores == 7){
         this.botonReset = true;
         Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Perdiste el juego',
          showConfirmButton: false,
          toast:true,
          timer: 2500
        })
        //  alert("perdiste el juego");
       }
    }else{
       console.log("no fallaste");
      if(this.palabrasConGuiones.indexOf('_') < 0){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ganaste el juego',
          showConfirmButton: false,
          toast:true,
          timer: 2500
        })
        // alert('Has ganado')
        this.botonReset = true;
      }

    }

  }
  getPalabra(){
    this.palabraBuscada =  this.arrayPalabras[Math.floor(Math.random()* this.arrayPalabras.length)];
    this.palabrasConGuiones = this.palabraBuscada.replace(/./g, "_ ");
  }
  convertPalabra(letra: any, idx: any){
    // console.log(this.palabrasConGuiones)
    this.palabrasConGuiones = this.palabrasConGuiones.substring(0, idx) + letra + this.palabrasConGuiones.substring(idx+letra.length);
  }
   getImage(fallos: number){
      console.log(fallos)
     switch (fallos) {
       case 1:
           this.nombreImage = 'ahorcado-1.png'

         break;
       case 2:
             this.nombreImage = 'ahorcado-2.png'
       break;
       case 3:
             this.nombreImage = 'ahorcado-3.png'
       break;
       case 4:
             this.nombreImage = 'ahorcado-4.png'
       break;
       case 5:
             this.nombreImage = 'ahorcado-5.png'
       break;
       case 6:
             this.nombreImage = 'ahorcado-6.png'
       break;
       case 7:
             this.nombreImage = 'ahorcado-7.png'
       break;

       default:
          this.nombreImage = "No inicia la prueba"
         break;
     }
   }
  reset(){
    console.log("perdiste")
   this.getImage(0);
    this.getPalabra();
    this.cantidadErrores = 0;
    this.botonReset = false
    // this.estadoFallos= true;
  }

}
