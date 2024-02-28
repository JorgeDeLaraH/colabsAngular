/*Tenemos nuestros imports*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { colabService } from '../../services/colabs.service';
/*Es necesario agregar al provider nuestro servicio de colaboradores*/
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  providers:[colabService],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit{

  id:any
  query:any
  //Variables para llevar el post
  skills:any
  level:any
  time:number=0
  /*Variables para obtener información de la fila en específico*/
  skillMod:any
  levelMod:any
  yearMod:Number=0
  /*El constructor solo usa el servicio de colabs*/
  constructor(public colabService: colabService){}
  /*On init funcion que se ejecuta al inicio de carga de la pagina*/
  ngOnInit() {
    /*Nos traemos del localstorage la variable que mandamos desde el componente principal*/
    this.id=localStorage.getItem('Id')
    this.colabService.getColab(this.id).subscribe((res:any)=>{
    /*Guardamos todos los datos del colaborador*/
    this.query=JSON.parse(JSON.stringify(res.Respuesta[0]))
    /*Skills contiene el array especifico de todos los skills*/
    this.skills=this.query.arraExperience
    },(err:any)=>{
      console.log("No se pudo realizar la operacion: ",err)
    })
  }
  /*Funcion para capturar el valor de skill en el select*/
  fnGetSkill(event:Event){
    /*Sobre escribimos la variable skills para ahorrar espacio*/
    this.skills=(event.target as HTMLInputElement).value
    console.log(this.skills)
  }
  /*Obtenemos el level del select*/
  fnGetLevel(event:Event){
    this.level=(event.target as HTMLInputElement).value
    console.log(this.level)
  }
  /*Obtenemos los años de experiencia*/
  fnGetTime(event:Event){
  this.time=parseInt((event.target as HTMLInputElement).value)
  console.log(this.time)
  }
  /*Construimos el json para pasarlo a la funcion post*/
  fnPost(){
    let data={
      "id":this.query._id,
      "skill":this.skills,
      "level":this.level,
      "numYear":this.time
    }
    /*Posteamos el objeto data*/
    this.colabService.postColab(data).subscribe((res:any)=>{
      console.log("Subida exitosa",res)
      /*Refresca la pagina una vez terminado*/
      window.location.reload()
    },(err)=>{
      console.log("No se pudo enviar la informacion",err)
    })
  }
  /*Obtenemos los parametros que se ven en la fila seleccionada para modificar posteriormente*/
  fnDibujado(skill:string,level:string,year:any){
    this.skillMod=skill
    this.levelMod=level
    this.yearMod=year
  }
  /*Creamos los datos a enviar por el metodo delete*/
  fnDelete(){
    let data={
      "id":this.query._id,
      "skill":this.skillMod
    }
    this.colabService.deleteColab(data).subscribe((res:any)=>{
      console.log("Exitoso",res)
      window.location.reload()
    },(error:any)=>{
      console.log("Error al guardar los datos",error)
    })
  }
  /*Mandamos los datos para realizar el put*/
  fnPut(){
    let data={
      "id":this.query._id,
      "skillf":this.skillMod,
      "skilln":this.skills,
      "level":this.level,
      "numYear":this.time
    }
    this.colabService.putColab(data).subscribe((res:any)=>{
      console.log("Actualizacion realizada",res)
      window.location.reload()
    },(err)=>{
      console.log("No se logro actualizar:",err)
    })
  }
  
}