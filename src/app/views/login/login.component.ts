import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public router:Router){}
/*Esta funcion solo da una direccion url cuando se ejecuta el submit*/
  fnLogin(event: Event){
    event.preventDefault
    this.router.navigate(['/principal'])
  }
}
