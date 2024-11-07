import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { RegistroUsuarioComponent } from "../registro-usuario/registro-usuario.component";
import { OlvidePasswordComponent } from "../olvide-password/olvide-password.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RegistroUsuarioComponent, OlvidePasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginData = {
    NombreUsuario: '',
    Password: ''
  }

  errorMessage: String = ''
  
  constructor(private authService: AuthService, private router: Router){}

  //este metodo sera para enviar los datos a laAPI 
  onSubmit(){
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log('Login exitoso', response)
        //se deberia de redireccionar a la pagina al home del sistema
        this.router.navigate(['/home']) //se cambia el home a la ruta que necesite

      }, 
      //manejo de errores de la API 
      error => {
        console.error('Error en el login', error)
        this.errorMessage = 'Credenciales incorrectas. Intente de nuevo'
      }

    )
  }
  cambiaRegistro(){
    this.router.navigate(['/registro'])
    console.log('entra')
  }

   
   cambiaOlvidarPassword(){
    this.router.navigate(['/olvide'])
    console.log('entra')
  }

}
