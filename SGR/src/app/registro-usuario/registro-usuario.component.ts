import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { RegisterData } from '../auth.service';
@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.scss'
})
export class RegistroUsuarioComponent {

  constructor(private authservice: AuthService){}
  
  registroData = {
    NombreUsuario: '',
    Email: '',
    Password: '',
    confirmarPassword: ''
  }

  registroError: String = ''


  onSubmit(){

    //se verifica si las contraseñas coinciden 
    if(this.registroData.Password !== this.registroData.confirmarPassword){
      this.registroError = "Las contraseñas deben ser iguales"
      return;
    }


    //validad que todos los campos requeridos tengan valores por que no me anda jalando la propiedad required xd
    if(!this.registroData.NombreUsuario || !this.registroData.Email || !this.registroData.Password){
      this.registroError = "Todos los campos son obligatorios"
    }

    //se crea un objetop con los datos correctos que seran enviados a la api y guardados
    const dataRegistro: RegisterData = {
      NombreUsuario: this.registroData.NombreUsuario,
      Password: this.registroData.Password,
      Email: this.registroData.Email
    }

    //llamr al servicio de registro y manejar la respuesta
    this.authservice.register(dataRegistro).subscribe({
      next: () => {
        console.log("Usuario registrado exitosamente")
        this.registroError = '' //se limpia el mensaje de error en caso de exito 
      },
      /*30/10/2024 10:36 PM PENDIENTE falta el manejo de errores y comprobacion cuado el usuario o el email
      ya existen en la base de datos, el mensaje de error esta echo en la api pero no lo mando para aca
        si ya lo hiciste agrega cuando y a que hora aqui 
        ---------->          <-------------
      */
      error: (error) => {
        console.log("Error en el registro", error)
        this.registroError = 'Hubo un error al regisrar el usuario.'
      }
    })
    
  }



}
