import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { colabService } from '../../services/colabs.service';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  //Importante poner el provider con el servicio que creamos
  providers:[colabService],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  /*Variables para almacenar el json proveniente del servicio y el localstorage*/
  query:any;
  id:any
  /*Utilizaremos el servicio y el router para navegacion*/
  constructor(public colabService: colabService, public router:Router){}
  
  ngOnInit(){
    /*Cuando cargue la pagina se ejecutara el servicio get*/
    this.colabService.getAllColabs().subscribe((res:any)=>{
      this.query=JSON.parse(JSON.stringify(res.Respuesta))
    },(err)=>{
      console.log("Error al traer la información",err)
    })
  }
  /*Esta es para almacenar el id del mapeado de la tabla en el localstorage*/
  fnCapId(id:string){
    this.id=id
    localStorage.setItem("Id",this.id)
    this.router.navigate(['/skills'])
  }
}
