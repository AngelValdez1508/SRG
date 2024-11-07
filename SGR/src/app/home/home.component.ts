import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(private authservice: AuthService){}

  logout(){
    this.authservice.logout(); //llama al metodo de cierre de sesion
  }

}
